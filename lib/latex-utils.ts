import type { EditableResumeData, LaTeXTemplate, PDFGenerationOptions } from '@/types/resume'

export function compileLatexTemplate(
  template: LaTeXTemplate,
  data: EditableResumeData,
  options: PDFGenerationOptions
): string {
  let latex = template.template

  // Replace basic placeholders
  latex = latex.replace(/{{NAME}}/g, data.personalInfo.name)
  latex = latex.replace(/{{EMAIL}}/g, data.personalInfo.email)
  latex = latex.replace(/{{PHONE}}/g, data.personalInfo.phone || '')
  latex = latex.replace(/{{LINKEDIN}}/g, data.personalInfo.linkedin || '')
  latex = latex.replace(/{{GITHUB}}/g, data.personalInfo.github || '')
  latex = latex.replace(/{{WEBSITE}}/g, data.personalInfo.website || '')
  latex = latex.replace(/{{SUMMARY}}/g, data.summary)

  // Handle conditional sections
  latex = handleConditionals(latex, data)

  // Handle loops for experience, projects, etc.
  latex = handleExperienceLoop(latex, data.experience)
  latex = handleProjectsLoop(latex, data.projects)
  latex = handleSkillsLoop(latex, data.skills)

  // Apply theme-specific modifications
  latex = applyTheme(latex, options.theme)

  return latex
}

function handleConditionals(latex: string, data: EditableResumeData): string {
  // Handle {{#if PHONE}} conditionals
  latex = latex.replace(/{{#if PHONE}}(.*?){{\/if}}/gs, data.personalInfo.phone ? '$1' : '')

  latex = latex.replace(/{{#if LINKEDIN}}(.*?){{\/if}}/gs, data.personalInfo.linkedin ? '$1' : '')

  latex = latex.replace(/{{#if GITHUB}}(.*?){{\/if}}/gs, data.personalInfo.github ? '$1' : '')

  latex = latex.replace(/{{#if WEBSITE}}(.*?){{\/if}}/gs, data.personalInfo.website ? '$1' : '')

  return latex
}

function handleExperienceLoop(latex: string, experience: EditableResumeData['experience']): string {
  const experiencePattern = /{{#each EXPERIENCE}}(.*?){{\/each}}/gs
  const match = latex.match(experiencePattern)

  if (!match) return latex

  const template = match[0].replace(/{{#each EXPERIENCE}}|{{\/each}}/g, '')
  let experienceHtml = ''

  experience.forEach((exp) => {
    let expSection = template
    expSection = expSection.replace(/{{this\.role}}/g, exp.role)
    expSection = expSection.replace(/{{this\.company}}/g, exp.company)
    expSection = expSection.replace(/{{this\.period}}/g, exp.period)
    expSection = expSection.replace(/{{this\.location}}/g, exp.location)

    // Handle description loop
    const descPattern = /{{#each this\.description}}(.*?){{\/each}}/gs
    const descMatch = expSection.match(descPattern)
    if (descMatch) {
      const descTemplate = descMatch[0].replace(/{{#each this\.description}}|{{\/each}}/g, '')
      let descriptions = ''
      exp.description.forEach((desc) => {
        descriptions += descTemplate.replace(/{{this}}/g, desc)
      })
      expSection = expSection.replace(descPattern, descriptions)
    }

    experienceHtml += expSection
  })

  return latex.replace(experiencePattern, experienceHtml)
}

function handleProjectsLoop(latex: string, projects: EditableResumeData['projects']): string {
  const projectsPattern = /{{#each PROJECTS}}(.*?){{\/each}}/gs
  const match = latex.match(projectsPattern)

  if (!match) return latex

  const template = match[0].replace(/{{#each PROJECTS}}|{{\/each}}/g, '')
  let projectsHtml = ''

  projects.forEach((project) => {
    let projSection = template
    projSection = projSection.replace(/{{this\.title}}/g, project.title)
    projSection = projSection.replace(/{{this\.description}}/g, project.description)

    // Handle technologies loop
    const techPattern = /{{#each this\.technologies}}(.*?){{\/each}}/gs
    const techMatch = projSection.match(techPattern)
    if (techMatch) {
      const techTemplate = techMatch[0].replace(/{{#each this\.technologies}}|{{\/each}}/g, '')
      let technologies = ''
      project.technologies.forEach((tech, index) => {
        let techItem = techTemplate.replace(/{{this}}/g, tech)
        techItem = techItem.replace(
          /{{#unless @last}}/g,
          index < project.technologies.length - 1 ? '' : ''
        )
        techItem = techItem.replace(/{{\/unless}}/g, '')
        technologies += techItem
      })
      projSection = projSection.replace(techPattern, technologies)
    }

    // Handle achievements loop
    const achPattern = /{{#each this\.achievements}}(.*?){{\/each}}/gs
    const achMatch = projSection.match(achPattern)
    if (achMatch) {
      const achTemplate = achMatch[0].replace(/{{#each this\.achievements}}|{{\/each}}/g, '')
      let achievements = ''
      project.achievements.forEach((ach) => {
        achievements += achTemplate.replace(/{{this}}/g, ach)
      })
      projSection = projSection.replace(achPattern, achievements)
    }

    projectsHtml += projSection
  })

  return latex.replace(projectsPattern, projectsHtml)
}

function handleSkillsLoop(latex: string, skills: EditableResumeData['skills']): string {
  const skillsPattern = /{{#each SKILLS\.technical}}(.*?){{\/each}}/gs
  const match = latex.match(skillsPattern)

  if (!match) return latex

  const template = match[0].replace(/{{#each SKILLS\.technical}}|{{\/each}}/g, '')
  let skillsHtml = ''

  skills.technical.forEach((skill, index) => {
    let skillItem = template.replace(/{{this}}/g, skill)
    skillItem = skillItem.replace(
      /{{#unless @last}}/g,
      index < skills.technical.length - 1 ? '' : ''
    )
    skillItem = skillItem.replace(/{{\/unless}}/g, '')
    skillsHtml += skillItem
  })

  return latex.replace(skillsPattern, skillsHtml)
}

function applyTheme(latex: string, theme: PDFGenerationOptions['theme']): string {
  switch (theme) {
    case 'colorful':
      return latex.replace(
        /\\definecolor{primary}{RGB}{0, 102, 204}/,
        '\\definecolor{primary}{RGB}{220, 20, 60}'
      )
    case 'minimal':
      return latex.replace(/\\usepackage{fontawesome5}/, '').replace(/\\fa\w+\\/g, '')
    default:
      return latex
  }
}

export async function generatePDF(latex: string): Promise<Blob> {
  // This would typically use a LaTeX compilation service
  // For now, we'll return the LaTeX as a text file
  return new Blob([latex], { type: 'text/plain' })
}

export function getAllLatexTemplates() {
  return [
    import('@/lib/latex-templates/classic').then((m) => m.default),
    import('@/lib/latex-templates/modern').then((m) => m.default),
  ]
}
