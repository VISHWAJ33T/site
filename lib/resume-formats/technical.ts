import type { ResumeFormat } from '@/types/resume'

const technicalFormat: ResumeFormat = {
  id: 'technical',
  name: 'Technical Focus',
  description: 'Developer-focused format emphasizing technical skills and projects',
  features: ['Tech Stack', 'Architecture', 'Code Quality', 'System Design'],
  preview: `John Doe - Senior Software Engineer
Email: john.doe@email.com | GitHub: github.com/johndoe

TECHNICAL EXPERTISE
Languages: JavaScript, Python, Go, TypeScript
Frameworks: React, Node.js, Django, Express
Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes
Databases: PostgreSQL, MongoDB, Redis

TECHNICAL PROJECTS
Microservices Architecture Platform
• Designed scalable microservices using Go & Docker
• Implemented CI/CD pipeline reducing deployment time by 60%
• Technologies: Go, Docker, Kubernetes, AWS...`,
  prompt: `Create a technical resume focused on software engineering expertise. Focus on:
- Comprehensive technical skills section
- Programming languages and frameworks prominently displayed
- System architecture and design experience
- Technical project details with specific technologies
- Code quality and best practices
- Performance improvements and optimizations
- Cloud platforms and DevOps tools
- Database and infrastructure experience
- Open source contributions
- Technical leadership and mentoring
- Specific metrics for technical achievements`,
  latexTemplate: {
    id: 'technical',
    name: 'Technical Focus',
    description: 'Technical LaTeX template optimized for developers',
    packages: [
      'geometry',
      'fontspec',
      'xcolor',
      'hyperref',
      'fontawesome5',
      'enumitem',
      'titlesec',
      'listings',
    ],
    features: ['Code Highlighting', 'Technical Layout', 'Monospace Fonts', 'System Architecture'],
    template: `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.8in]{geometry}
\\usepackage{fontspec}
\\usepackage{xcolor}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fontawesome5}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{listings}

% Define colors
\\definecolor{techblue}{RGB}{0, 123, 191}
\\definecolor{codegray}{RGB}{64, 64, 64}

% Set fonts
\\setmainfont{Arial}
\\setmonofont{Courier New}

% Technical section formatting
\\titleformat{\\section}{\\color{techblue}\\Large\\bfseries\\sffamily}{}{0em}{}[\\color{techblue}\\titlerule]
\\titlespacing*{\\section}{0pt}{12pt}{6pt}

\\pagestyle{empty}

\\begin{document}

% Technical Header
\\begin{center}
    {\\Huge \\textbf{{{NAME}}}} \\\\
    \\vspace{2pt}
    {\\large Senior Software Engineer} \\\\
    \\vspace{3pt}
    \\faEnvelope\\ \\href{mailto:{{EMAIL}}}{{{EMAIL}}} $|$
    {{#if GITHUB}}\\faGithub\\ \\href{{{GITHUB}}}{github.com/profile} {{/if}}
\\end{center}

\\section{\\faCode\\ Technical Expertise}
\\begin{itemize}[leftmargin=0.15in, label={}]
\\item \\textbf{Languages:} {{#each SKILLS.technical}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
\\end{itemize}

\\section{\\faCogs\\ Technical Projects}
{{#each PROJECTS}}
\\textbf{\\color{techblue}{{this.title}}} \\\\
{{this.description}} \\\\
\\texttt{\\color{codegray}Technologies: {{#each this.technologies}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}} \\\\
\\begin{itemize}[leftmargin=0.3in]
{{#each this.achievements}}
\\item {{this}}
{{/each}}
\\end{itemize}
\\vspace{6pt}
{{/each}}

\\section{\\faBriefcase\\ Professional Experience}
{{#each EXPERIENCE}}
\\textbf{{{this.role}}} \\hfill {{this.period}} \\\\
\\textit{{{this.company}}, {{this.location}}} \\\\
\\begin{itemize}[leftmargin=0.2in]
{{#each this.description}}
\\item {{this}}
{{/each}}
\\end{itemize}
\\vspace{6pt}
{{/each}}

\\end{document}`,
  },
}

export default technicalFormat
