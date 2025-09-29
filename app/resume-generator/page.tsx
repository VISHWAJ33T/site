'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Loader2,
  Download,
  FileText,
  Briefcase,
  User,
  Sparkles,
  Edit3,
  Bot,
  Code,
} from 'lucide-react'
import { toast } from 'sonner'
import { ResumeFormatPreview } from '@/components/resume-generator/resume-format-preview'
import { EditableResumeForm } from '@/components/resume-generator/editable-resume-form'
import { LaTeXEditor } from '@/components/resume-generator/latex-editor'
import {
  getAllResumeFormats,
  convertPortfolioToEditableData,
  generateResumeFromData,
} from '@/lib/resume-utils'
import type {
  ResumeFormat,
  EditableResumeData,
  LaTeXTemplate,
  PDFGenerationOptions,
} from '@/types/resume'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PortfolioData {
  author: {
    name: string
    email: string
    bio: string
    occupation: string
    company: string
    twitter?: string
    linkedin?: string
    github?: string
  }
  experience: Array<{
    role: string
    company: string
    period: string
    location: string
    description: string[]
    skills: string[]
  }>
  projects: Array<{
    title: string
    description: string
    badges: string[]
    contribution: string[]
  }>
  skills: string[]
  site: {
    title: string
    description: string
    siteUrl: string
  }
}

export default function ResumeGenerator() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [resumeFormats, setResumeFormats] = useState<ResumeFormat[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [generatedResume, setGeneratedResume] = useState('')
  const [selectedFormat, setSelectedFormat] = useState('modern')
  const [jobDescription, setJobDescription] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [activeTab, setActiveTab] = useState('ai')
  const [editableData, setEditableData] = useState<EditableResumeData | null>(null)
  const [showLatexEditor, setShowLatexEditor] = useState(false)
  const [generatedLatex, setGeneratedLatex] = useState('')
  const [latexTemplate, setLatexTemplate] = useState<LaTeXTemplate | null>(null)
  const [pdfOptions, setPdfOptions] = useState<PDFGenerationOptions>({
    format: 'modern',
    pageLimit: 1,
    includeIcons: true,
    includeLinks: true,
    theme: 'modern',
  })

  useEffect(() => {
    Promise.all([fetchPortfolioData(), loadResumeFormats()])
  }, [])

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio')
      if (!response.ok) throw new Error('Failed to fetch portfolio data')
      const data = await response.json()
      setPortfolioData(data)

      const editableData = convertPortfolioToEditableData(data)
      setEditableData(editableData)
    } catch (error) {
      toast.error('Failed to load portfolio data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadResumeFormats = async () => {
    try {
      const formats = await getAllResumeFormats()
      setResumeFormats(formats)
    } catch (error) {
      toast.error('Failed to load resume formats:', error)
    }
  }

  const generateAIResume = async () => {
    if (!portfolioData) return

    setGenerating(true)
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portfolioData,
          format: selectedFormat,
          jobDescription: jobDescription.trim(),
          companyDescription: companyDescription.trim(),
        }),
      })

      if (!response.ok) throw new Error('Failed to generate resume')

      const { resume } = await response.json()
      setGeneratedResume(resume)

      toast.success('Your AI-tailored resume has been generated.')
    } catch (error) {
      toast.error('Failed to generate resume. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const generateManualResume = () => {
    if (!editableData) return

    const selectedFormatConfig = resumeFormats.find((f) => f.id === selectedFormat)
    if (!selectedFormatConfig) return

    const resume = generateResumeFromData(editableData, selectedFormatConfig)
    setGeneratedResume(resume)

    toast.success('Your manual resume has been generated.')
  }

  const generateLatexResume = async () => {
    if (!portfolioData && !editableData) return

    setGenerating(true)
    try {
      const response = await fetch('/api/generate-latex-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portfolioData: activeTab === 'ai' ? portfolioData : null,
          editableData: activeTab === 'manual' ? editableData : null,
          options: { ...pdfOptions, format: selectedFormat },
          jobDescription: jobDescription.trim(),
          companyDescription: companyDescription.trim(),
        }),
      })

      if (!response.ok) throw new Error('Failed to generate LaTeX resume')

      const { latex, template } = await response.json()
      setGeneratedLatex(latex)
      setShowLatexEditor(true)

      // Load the template for the editor
      const templateModule = await import(`@/lib/latex-templates/${selectedFormat}`)
      setLatexTemplate(templateModule.default)

      toast.success('Your LaTeX resume has been generated and is ready for editing.')
    } catch (error) {
      toast.error('Failed to generate LaTeX resume. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const downloadResume = () => {
    if (!generatedResume) return

    const blob = new Blob([generatedResume], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${portfolioData?.author.name.replace(/\s+/g, '_')}_Resume_${selectedFormat}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadPDF = async () => {
    if (!generatedLatex) return

    try {
      // In a real implementation, this would compile LaTeX to PDF
      const blob = new Blob([generatedLatex], { type: 'application/x-latex' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${portfolioData?.author.name.replace(/\s+/g, '_')}_Resume_${selectedFormat}.tex`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success('LaTeX file downloaded. Compile with pdflatex to generate PDF.')
    } catch (error) {
      toast.error('Failed to download LaTeX file.')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading portfolio data...</span>
        </div>
      </div>
    )
  }

  if (!portfolioData || !editableData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>Failed to load portfolio data</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchPortfolioData} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-balance text-4xl font-bold">AI Resume Generator</h1>
          <p className="text-pretty text-lg text-muted-foreground">
            Generate tailored resumes from your portfolio data using AI or create them manually
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="space-y-6 lg:col-span-1">
            {/* Portfolio Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Portfolio Data
                </CardTitle>
                <CardDescription>Data loaded from your portfolio API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{portfolioData.author.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {portfolioData.author.occupation} at {portfolioData.author.company}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Experience: {portfolioData.experience.length} positions
                  </p>
                  <p className="mb-2 text-sm font-medium">
                    Projects: {portfolioData.projects.length} projects
                  </p>
                  <p className="mb-2 text-sm font-medium">
                    Skills: {portfolioData.skills.length} skills
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {portfolioData.skills.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {portfolioData.skills.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{portfolioData.skills.length - 6} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Resume Format Selection with Previews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resume Formats
                </CardTitle>
                <CardDescription>Choose the style that best fits your target role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {resumeFormats.map((format) => (
                    <ResumeFormatPreview
                      key={format.id}
                      format={format}
                      isSelected={selectedFormat === format.id}
                      onSelect={() => setSelectedFormat(format.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ai" className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI Generation
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  Manual Editing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="space-y-6">
                {/* Job Tailoring */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Job Tailoring (Optional)
                    </CardTitle>
                    <CardDescription>
                      Provide job details to create a more targeted resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="job-description">Job Description</Label>
                      <Textarea
                        id="job-description"
                        placeholder="Paste the job description here to tailor your resume to specific requirements..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company-description">Company Description</Label>
                      <Textarea
                        id="company-description"
                        placeholder="Describe the company culture, values, or specific information to customize your resume..."
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Generation Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Generation Options</CardTitle>
                    <CardDescription>Configure your resume generation preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="page-limit-ai">Page Limit</Label>
                        <Input
                          id="page-limit-ai"
                          type="number"
                          min="1"
                          max="3"
                          value={pdfOptions.pageLimit}
                          onChange={(e) =>
                            setPdfOptions((prev) => ({
                              ...prev,
                              pageLimit: Number.parseInt(e.target.value),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="output-format">Output Format</Label>
                        <Select
                          value={showLatexEditor ? 'latex' : 'text'}
                          onValueChange={(value) => setShowLatexEditor(value === 'latex')}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Plain Text</SelectItem>
                            <SelectItem value="latex">LaTeX (PDF Ready)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Generate Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={generateAIResume} disabled={generating} size="lg">
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Text Resume
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={generateLatexResume}
                    disabled={generating}
                    size="lg"
                    variant="outline"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate LaTeX Resume
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="manual" className="space-y-6">
                <EditableResumeForm data={editableData} onChange={setEditableData} />

                <Button onClick={generateManualResume} size="lg" className="w-full">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Generate Manual Resume
                </Button>
              </TabsContent>
            </Tabs>

            {showLatexEditor && latexTemplate && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      LaTeX Editor
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button onClick={downloadPDF} variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download .tex
                      </Button>
                      <Button onClick={() => setShowLatexEditor(false)} variant="ghost" size="sm">
                        Close Editor
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <LaTeXEditor
                    template={latexTemplate}
                    initialLatex={generatedLatex}
                    onLatexChange={setGeneratedLatex}
                    onOptionsChange={setPdfOptions}
                    options={pdfOptions}
                  />
                </CardContent>
              </Card>
            )}

            {/* Generated Resume Display */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Generated Resume
                  </CardTitle>
                  {generatedResume && (
                    <Button onClick={downloadResume} variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}
                </div>
                <CardDescription>
                  {generatedResume
                    ? `${resumeFormats.find((f) => f.id === selectedFormat)?.name} format`
                    : 'Your generated resume will appear here'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedResume ? (
                  <div className="h-[600px] overflow-y-auto rounded-lg bg-muted/50 p-4">
                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {generatedResume}
                    </pre>
                  </div>
                ) : (
                  <div className="flex h-[600px] items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
                      <p>Generate a resume using AI or manual editing to see it here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
