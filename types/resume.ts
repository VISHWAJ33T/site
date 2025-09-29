export interface ResumeFormat {
  id: string
  name: string
  description: string
  prompt: string
  preview: string
  features: string[]
  latexTemplate?: LaTeXTemplate
}

export interface EditableResumeData {
  personalInfo: {
    name: string
    email: string
    phone?: string
    location?: string
    linkedin?: string
    github?: string
    website?: string
  }
  summary: string
  experience: Array<{
    id: string
    role: string
    company: string
    period: string
    location: string
    description: string[]
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    technologies: string[]
    achievements: string[]
  }>
  skills: {
    technical: string[]
    soft: string[]
  }
  education?: Array<{
    id: string
    degree: string
    institution: string
    period: string
    gpa?: string
  }>
}

export interface LaTeXTemplate {
  id: string
  name: string
  description: string
  template: string
  packages: string[]
  features: string[]
}

export interface PDFGenerationOptions {
  format: string
  pageLimit: number
  includeIcons: boolean
  includeLinks: boolean
  theme: 'classic' | 'modern' | 'colorful' | 'minimal'
}
