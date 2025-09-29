import type { ResumeFormat } from '@/types/resume'

const executiveFormat: ResumeFormat = {
  id: 'executive',
  name: 'Executive Summary',
  description: 'Leadership-focused format for senior positions',
  features: ['Leadership', 'Strategy', 'Business Impact', 'Team Management'],
  preview: `JOHN DOE
Chief Technology Officer

john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe

EXECUTIVE SUMMARY
Visionary technology leader with 15+ years driving digital transformation...

LEADERSHIP EXPERIENCE

Chief Technology Officer | TechCorp Inc. | 2020-Present
Strategic Leadership & Business Impact:
• Led organization of 150+ engineers across 12 teams
• Drove $50M revenue growth through platform modernization
• Reduced operational costs by 35% through cloud migration...`,
  prompt: `Create an executive-level resume emphasizing leadership and business impact. Focus on:
- Executive summary highlighting strategic vision
- Leadership experience and team management
- Business outcomes and revenue impact
- Strategic initiatives and transformations
- Board-level communication and stakeholder management
- P&L responsibility and budget management
- Organizational development and culture building
- Industry recognition and thought leadership
- High-level achievements with significant business impact
- Executive presence and strategic thinking
- Use formal, authoritative language appropriate for C-level positions`,
  latexTemplate: {
    id: 'executive',
    name: 'Executive Summary',
    description: 'Executive LaTeX template for leadership positions',
    packages: ['geometry', 'fontspec', 'xcolor', 'hyperref', 'enumitem', 'titlesec'],
    features: [
      'Executive Layout',
      'Leadership Focus',
      'Business Impact',
      'Professional Typography',
    ],
    template: `\\documentclass[11pt,letterpaper]{article}
\\usepackage[margin=0.9in]{geometry}
\\usepackage{fontspec}
\\usepackage{xcolor}
\\usepackage[hidelinks]{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}

% Define colors
\\definecolor{executive}{RGB}{25, 25, 112}
\\definecolor{gold}{RGB}{184, 134, 11}

% Set fonts
\\setmainfont{Times New Roman}

% Executive section formatting
\\titleformat{\\section}{\\color{executive}\\Large\\bfseries}{}{0em}{}[\\color{gold}\\titlerule[1.5pt]]
\\titlespacing*{\\section}{0pt}{15pt}{8pt}

\\pagestyle{empty}

\\begin{document}

% Executive Header
\\begin{center}
    {\\Huge \\textbf{\\color{executive}{{NAME}}}} \\\\
    \\vspace{3pt}
    {\\large Chief Technology Officer} \\\\
    \\vspace{5pt}
    \\href{mailto:{{EMAIL}}}{{{EMAIL}}} $|$ {{#if PHONE}}{{PHONE}} $|$ {{/if}}
    {{#if LINKEDIN}}\\href{{{LINKEDIN}}}{LinkedIn Profile}{{/if}}
\\end{center}

\\section{Executive Summary}
{{SUMMARY}}

\\section{Leadership Experience}
{{#each EXPERIENCE}}
\\textbf{\\color{executive}{{this.role}}} \\hfill {{this.period}} \\\\
\\textit{{{this.company}}, {{this.location}}} \\\\
\\textbf{Strategic Leadership \\& Business Impact:} \\\\
\\begin{itemize}[leftmargin=0.2in]
{{#each this.description}}
\\item {{this}}
{{/each}}
\\end{itemize}
\\vspace{8pt}
{{/each}}

\\section{Key Initiatives \\& Projects}
{{#each PROJECTS}}
\\textbf{\\color{executive}{{this.title}}} \\\\
{{this.description}} \\\\
\\textit{Strategic Impact:} \\\\
\\begin{itemize}[leftmargin=0.2in]
{{#each this.achievements}}
\\item {{this}}
{{/each}}
\\end{itemize}
\\vspace{6pt}
{{/each}}

\\section{Core Competencies}
{{#each SKILLS.technical}}{{this}}{{#unless @last}} $\\bullet$ {{/unless}}{{/each}}

\\end{document}`,
  },
}

export default executiveFormat
