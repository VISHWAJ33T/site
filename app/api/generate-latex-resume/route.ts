import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { NextResponse } from 'next/server'
import { compileLatexTemplate } from '@/lib/latex-utils'
import type { EditableResumeData, PDFGenerationOptions } from '@/types/resume'

interface LaTeXResumeRequest {
  portfolioData: any
  editableData?: EditableResumeData
  options: PDFGenerationOptions
  jobDescription?: string
  companyDescription?: string
}

export async function POST(req: Request) {
  try {
    const {
      portfolioData,
      editableData,
      options,
      jobDescription,
      companyDescription,
    }: LaTeXResumeRequest = await req.json()

    if (!portfolioData && !editableData) {
      return NextResponse.json({ error: 'Portfolio or editable data is required' }, { status: 400 })
    }

    // Import the specific LaTeX template
    const templateModule = await import(`@/lib/latex-templates/${options.format}`)
    const latexTemplate = templateModule.default

    let tailoringContext = ''
    if (jobDescription) {
      tailoringContext += `\n\nJob Description to tailor for:\n${jobDescription}`
    }
    if (companyDescription) {
      tailoringContext += `\n\nCompany Information:\n${companyDescription}`
    }

    const prompt = `You are an expert resume writer and LaTeX specialist. Create a professional resume that will be compiled to PDF.

LaTeX Template Information:
- Template: ${latexTemplate?.name}
- Features: ${latexTemplate?.features?.join(', ')}
- Available packages: ${latexTemplate?.packages?.join(', ')}

Page Limit: ${options.pageLimit} page(s) - STRICTLY adhere to this limit by adjusting content density and prioritizing most relevant information.

Portfolio Data:
${JSON.stringify(portfolioData || editableData, null, 2)}

${tailoringContext}

Instructions:
1. Create content that fits EXACTLY within ${options?.pageLimit} page(s) when compiled
2. Use professional LaTeX formatting with consistent spacing
3. Prioritize most relevant experience and skills for the target role
4. Quantify achievements with specific metrics and percentages
5. Use action verbs and focus on measurable impact
6. ${options?.includeIcons ? 'Include FontAwesome icons where appropriate' : 'Use text-only formatting without icons'}
7. ${options?.includeLinks ? 'Make all URLs and emails clickable hyperlinks' : 'Display URLs as plain text'}
8. Optimize content density to maximize information within page limit
9. If job/company descriptions provided, heavily tailor content to match requirements
10. Use the ${options?.theme} theme styling approach

Generate the complete resume content that will populate the LaTeX template variables. Focus on content that will compile to exactly ${options?.pageLimit} page(s).`

    const { text } = await generateText({
      model: google('gemini-2.5-pro'),
      prompt,
      maxOutputTokens: 6000,
      temperature: 0.3,
    })

    // If we have editable data, use it directly; otherwise parse AI response
    const finalData = editableData || parseAIResponseToEditableData(text, portfolioData)

    // Compile LaTeX template with data
    const compiledLatex = compileLatexTemplate(latexTemplate, finalData, options)

    return NextResponse.json({
      latex: compiledLatex,
      aiContent: text,
      template: latexTemplate.name,
    })
  } catch (error) {
    console.error('LaTeX resume generation error:', error)
    return NextResponse.json({ error: 'Failed to generate LaTeX resume' }, { status: 500 })
  }
}

function parseAIResponseToEditableData(aiResponse: string, portfolioData: any): EditableResumeData {
  // This would parse the AI response and convert it to EditableResumeData format
  // For now, we'll use the portfolio data as a fallback
  return {
    personalInfo: {
      name: portfolioData.author.name,
      email: portfolioData.author.email,
      linkedin: portfolioData.author.linkedin,
      github: portfolioData.author.github,
    },
    summary: portfolioData.author.bio,
    experience: portfolioData.experience.map((exp: any, index: number) => ({
      id: `exp-${index}`,
      role: exp.role,
      company: exp.company,
      period: exp.period,
      location: exp.location,
      description: exp.description,
    })),
    projects: portfolioData.projects.map((proj: any, index: number) => ({
      id: `proj-${index}`,
      title: proj.title,
      description: proj.description,
      technologies: proj.badges,
      achievements: proj.contribution,
    })),
    skills: {
      technical: portfolioData.skills,
      soft: [],
    },
  }
}
