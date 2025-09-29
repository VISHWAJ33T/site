import type { ResumeFormat } from '@/types/resume'
import modernFormat from '@/lib/resume-formats/modern'
import classicFormat from '@/lib/resume-formats/classic'
import creativeFormat from '@/lib/resume-formats/creative'
import technicalFormat from '@/lib/resume-formats/technical'
import executiveFormat from '@/lib/resume-formats/executive'

export async function getAllResumeFormats(): Promise<ResumeFormat[]> {
  return [modernFormat, classicFormat, creativeFormat, technicalFormat, executiveFormat]
}

export function convertPortfolioToEditableData(portfolioData: any) {
  return {
    personalInfo: {
      name: portfolioData.author.name,
      email: portfolioData.author.email,
      linkedin: portfolioData.author.linkedin,
      github: portfolioData.author.github,
      website: portfolioData.site.siteUrl,
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

export function generateResumeFromData(data: any, format: ResumeFormat): string {
  // Basic template generation for manual mode
  let resume = `${data.personalInfo.name}\n`
  resume += `${data.personalInfo.email}`
  if (data.personalInfo.phone) resume += ` | ${data.personalInfo.phone}`
  if (data.personalInfo.linkedin) resume += ` | ${data.personalInfo.linkedin}`
  if (data.personalInfo.github) resume += ` | ${data.personalInfo.github}`
  resume += `\n\n`

  if (data.summary) {
    resume += `PROFESSIONAL SUMMARY\n`
    resume += `${data.summary}\n\n`
  }

  if (data.experience.length > 0) {
    resume += `PROFESSIONAL EXPERIENCE\n`
    data.experience.forEach((exp: any) => {
      resume += `\n${exp.role} | ${exp.company} | ${exp.period}\n`
      if (exp.location) resume += `${exp.location}\n`
      exp.description.forEach((desc: string) => {
        resume += `• ${desc}\n`
      })
    })
    resume += `\n`
  }

  if (data.projects.length > 0) {
    resume += `KEY PROJECTS\n`
    data.projects.forEach((proj: any) => {
      resume += `\n${proj.title}\n`
      resume += `${proj.description}\n`
      if (proj.technologies.length > 0) {
        resume += `Technologies: ${proj.technologies.join(', ')}\n`
      }
      proj.achievements.forEach((achievement: string) => {
        resume += `• ${achievement}\n`
      })
    })
    resume += `\n`
  }

  if (data.skills.technical.length > 0) {
    resume += `TECHNICAL SKILLS\n`
    resume += `${data.skills.technical.join(' • ')}\n\n`
  }

  return resume
}
