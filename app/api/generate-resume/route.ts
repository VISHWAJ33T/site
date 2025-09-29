import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { NextResponse } from 'next/server'

interface ResumeRequest {
  portfolioData: any
  format: string
  jobDescription?: string
  companyDescription?: string
}

export async function POST(req: Request) {
  try {
    const { portfolioData, format, jobDescription, companyDescription }: ResumeRequest =
      await req.json()

    if (!portfolioData) {
      return NextResponse.json({ error: 'Portfolio data is required' }, { status: 400 })
    }

    // Import the specific format module
    const formatModule = await import(`@/lib/resume-formats/${format}`)
    const formatConfig = formatModule.default

    let tailoringContext = ''
    if (jobDescription) {
      tailoringContext += `\n\nJob Description to tailor for:\n${jobDescription}`
    }
    if (companyDescription) {
      tailoringContext += `\n\nCompany Information:\n${companyDescription}`
    }

    const prompt = `You are an expert resume writer. Create a professional resume based on the following portfolio data.

${formatConfig.prompt}

Portfolio Data:
${JSON.stringify(portfolioData, null, 2)}

${tailoringContext}

Instructions:
1. Create a well-structured resume with clear sections
2. Use professional formatting with consistent spacing
3. Highlight the most relevant experience and skills
4. Quantify achievements where possible
5. Keep it concise but comprehensive (1-2 pages worth of content)
6. If job/company descriptions are provided, tailor the resume to match those requirements
7. Use action verbs and focus on impact and results
8. Include contact information, professional summary, experience, projects, and skills
9. Format as plain text with clear section headers and bullet points
10. Follow the specific formatting style described above

Generate the complete resume now:`

    const { text } = await generateText({
      model: google('gemini-2.5-pro'),
      prompt,
      maxOutputTokens: 4000,
      temperature: 0.3,
    })

    return NextResponse.json({ resume: text })
  } catch (error) {
    console.error('Resume generation error:', error)
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 })
  }
}
