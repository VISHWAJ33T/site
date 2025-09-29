'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Code, Palette, Link, icons } from 'lucide-react'
import type { LaTeXTemplate, PDFGenerationOptions } from '@/types/resume'

interface LaTeXEditorProps {
  template: LaTeXTemplate
  initialLatex: string
  onLatexChange: (latex: string) => void
  onOptionsChange: (options: PDFGenerationOptions) => void
  options: PDFGenerationOptions
}

export function LaTeXEditor({
  template,
  initialLatex,
  onLatexChange,
  onOptionsChange,
  options,
}: LaTeXEditorProps) {
  const [latex, setLatex] = useState(initialLatex)
  const [activeTab, setActiveTab] = useState('editor')

  const handleLatexChange = (value: string) => {
    setLatex(value)
    onLatexChange(value)
  }

  const handleOptionChange = (key: keyof PDFGenerationOptions, value: any) => {
    const newOptions = { ...options, [key]: value }
    onOptionsChange(newOptions)
  }

  const insertIcon = (iconName: string) => {
    const iconCode = `\\fa${iconName}\\ `
    const textarea = document.getElementById('latex-editor') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = latex.substring(0, start) + iconCode + latex.substring(end)
      handleLatexChange(newValue)

      // Reset cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + iconCode.length, start + iconCode.length)
      }, 0)
    }
  }

  const insertLink = () => {
    const linkCode = `\\href{URL}{Display Text}`
    const textarea = document.getElementById('latex-editor') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = latex.substring(0, start) + linkCode + latex.substring(end)
      handleLatexChange(newValue)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + 6, start + 9) // Select "URL"
      }, 0)
    }
  }

  const commonIcons: [string, keyof typeof icons][] = [
    ['Phone', 'Phone'],
    ['Envelope', 'Mail'],
    ['Linkedin', 'Linkedin'],
    ['Github', 'Github'],
    ['Globe', 'Globe'],
    ['MapMarker', 'MapPin'],
    ['Calendar', 'Calendar'],
    ['Building', 'Building'],
    ['Code', 'Code'],
    ['Cog', 'Cog'],
    ['Database', 'Database'],
    ['Mobile', 'Smartphone'],
  ]

  return (
    <div className="space-y-6">
      {/* Options Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            PDF Generation Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="page-limit">Page Limit</Label>
              <Input
                id="page-limit"
                type="number"
                min="1"
                max="3"
                value={options.pageLimit}
                onChange={(e) => handleOptionChange('pageLimit', Number.parseInt(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={options.theme}
                onValueChange={(value) => handleOptionChange('theme', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="colorful">Colorful</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="include-icons"
                checked={options.includeIcons}
                onCheckedChange={(checked) => handleOptionChange('includeIcons', checked)}
              />
              <Label htmlFor="include-icons">Include Icons</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="include-links"
                checked={options.includeLinks}
                onCheckedChange={(checked) => handleOptionChange('includeLinks', checked)}
              />
              <Label htmlFor="include-links">Clickable Links</Label>
            </div>
          </div>

          <div>
            <Label>Template Features</Label>
            <div className="mt-1 flex flex-wrap gap-1">
              {template.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LaTeX Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            LaTeX Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-4">
              <Textarea
                id="latex-editor"
                value={latex}
                onChange={(e) => handleLatexChange(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
                placeholder="Your LaTeX code will appear here..."
              />
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label className="mb-2 block text-sm font-medium">Quick Insert Icons</Label>
                  <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                    {commonIcons.map(([displayName, lucideName]) => {
                      const Icon = icons[lucideName]
                      return (
                        <Button
                          key={displayName}
                          variant="outline"
                          size="sm"
                          onClick={() => insertIcon(displayName)}
                          className="text-xs"
                        >
                          <Icon className="mr-1 h-3 w-3" />
                          {displayName}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block text-sm font-medium">Quick Actions</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={insertLink}>
                      <Link className="mr-1 h-3 w-3" />
                      Insert Link
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block text-sm font-medium">Available Packages</Label>
                  <div className="flex flex-wrap gap-1">
                    {template.packages.map((pkg) => (
                      <Badge key={pkg} variant="outline" className="text-xs">
                        {pkg}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="min-h-[500px] overflow-auto rounded-lg bg-muted/50 p-4">
                <pre className="whitespace-pre-wrap font-mono text-xs">{latex}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
