import type { ResumeFormat } from '@/types/resume'

const modernFormat: ResumeFormat = {
  id: 'modern',
  name: 'Modern Professional',
  description: 'Clean, contemporary design with emphasis on skills and achievements',
  features: ['ATS-Friendly', 'Skills Focus', 'Quantified Results', 'Clean Layout'],
  preview: `JOHN DOE
john.doe@email.com | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Results-driven Software Engineer with 5+ years...

TECHNICAL SKILLS
JavaScript • React • Node.js • AWS • Docker

PROFESSIONAL EXPERIENCE
Senior Software Engineer | TechCorp | 2022-Present
• Increased system performance by 40%
• Led team of 5 developers...`,
  prompt: `Create a modern, professional resume with clean formatting. Focus on:
- Quantifiable achievements and metrics
- Clear section headers with consistent spacing
- Bullet points for easy scanning
- Skills prominently displayed
- Professional summary at the top
- ATS-friendly formatting
- Use action verbs and impact-focused language
- Emphasize technical skills and modern technologies
- Include metrics and percentages where possible`,
  latexTemplate: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, contemporary LaTeX template with modern typography',
    packages: [
      'geometry',
      'fontspec',
      'xcolor',
      'hyperref',
      'fontawesome5',
      'enumitem',
      'titlesec',
      'fancyhdr',
    ],
    features: ['Icons', 'Hyperlinks', 'Custom Colors', 'Modern Fonts'],
    template: `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{fontspec}
\\usepackage{xcolor}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fontawesome5}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{fancyhdr}

% Define colors
\\definecolor{primary}{RGB}{0, 102, 204}
\\definecolor{secondary}{RGB}{64, 64, 64}
\\definecolor{accent}{RGB}{102, 102, 102}

% Set fonts
\\setmainfont{Arial}

% Custom section formatting
\\titleformat{\\section}{\\color{primary}\\Large\\bfseries}{}{0em}{}[\\color{primary}\\titlerule]
\\titlespacing*{\\section}{0pt}{12pt}{6pt}

% Remove page numbers
\\pagestyle{empty}

% Custom commands
\\newcommand{\\resumeItem}[1]{\\item\\small{#1}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-5pt}
}

\\begin{document}

% Header
\\begin{center}
    {\\Huge \\textbf{{{NAME}}}} \\\\
    \\vspace{2pt}
    {{#if PHONE}}\\faPhone\\ {{PHONE}} $|$ {{/if}}
    \\faEnvelope\\ \\href{mailto:{{EMAIL}}}{{{EMAIL}}} $|$
    {{#if LINKEDIN}}\\faLinkedin\\ \\href{{{LINKEDIN}}}{LinkedIn} $|$ {{/if}}
    {{#if GITHUB}}\\faGithub\\ \\href{{{GITHUB}}}{GitHub} {{/if}}
    {{#if WEBSITE}}$|$ \\faGlobe\\ \\href{{{WEBSITE}}}{Website}{{/if}}
\\end{center}

% Professional Summary
\\section{Professional Summary}
{{SUMMARY}}

% Experience
\\section{Experience}
\\begin{itemize}[leftmargin=0.15in, label={}]
{{#each EXPERIENCE}}
\\resumeSubheading
  {{{this.role}}}{{{this.period}}}
  {{{this.company}}}{{{this.location}}}
  \\resumeItemListStart
  {{#each this.description}}
    \\resumeItem{{{this}}}
  {{/each}}
  \\resumeItemListEnd
{{/each}}
\\end{itemize}

% Projects
\\section{Projects}
\\begin{itemize}[leftmargin=0.15in, label={}]
{{#each PROJECTS}}
\\item
  \\textbf{{{this.title}}} \\\\
  {{this.description}} \\\\
  \\textit{Technologies: {{#each this.technologies}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}} \\\\
  \\begin{itemize}[leftmargin=0.3in]
  {{#each this.achievements}}
    \\item {{this}}
  {{/each}}
  \\end{itemize}
{{/each}}
\\end{itemize}

% Skills
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
\\item \\textbf{Programming Languages:} {{#each SKILLS.technical}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
\\end{itemize}

\\end{document}`,
  },
}

export default modernFormat
