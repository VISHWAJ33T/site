import type { ResumeFormat } from '@/types/resume'

const creativeFormat: ResumeFormat = {
  id: 'creative',
  name: 'Creative Portfolio',
  description: 'Visually appealing format highlighting projects and creativity',
  features: ['Project Focus', 'Creative Language', 'Visual Appeal', 'Innovation'],
  preview: `JOHN DOE → Creative Developer
john@creative.dev | portfolio.com | @johndoe

🚀 CREATIVE VISION
Passionate full-stack developer crafting digital experiences...

💡 FEATURED PROJECTS
→ AI-Powered Art Generator
   Built revolutionary platform using React & TensorFlow
   → 50K+ users, 95% satisfaction rate

🛠 TECH ARSENAL
Frontend: React, Vue, Three.js
Backend: Node.js, Python, GraphQL...`,
  prompt: `Create a visually appealing, creative resume that highlights innovation. Focus on:
- Creative section headers and formatting
- Project-focused layout with visual elements
- Engaging, dynamic language
- Portfolio and creative work emphasis
- Modern technologies and frameworks
- Innovation and problem-solving abilities
- Use of symbols or creative formatting (text-based)
- Emphasis on user experience and design thinking
- Creative achievements and unique contributions
- Personal branding and online presence`,
  latexTemplate: {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Creative LaTeX template with visual elements',
    packages: [
      'geometry',
      'fontspec',
      'xcolor',
      'hyperref',
      'fontawesome5',
      'enumitem',
      'titlesec',
      'tikz',
    ],
    features: ['Creative Design', 'Visual Elements', 'Modern Typography', 'Color Accents'],
    template: `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.7in]{geometry}
\\usepackage{fontspec}
\\usepackage{xcolor}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fontawesome5}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{tikz}

% Define colors
\\definecolor{creative}{RGB}{255, 87, 51}
\\definecolor{accent}{RGB}{51, 51, 51}

% Set fonts
\\setmainfont{Arial}

% Creative section formatting
\\titleformat{\\section}{\\color{creative}\\Large\\bfseries}{}{0em}{}[\\color{creative}\\titlerule[2pt]]
\\titlespacing*{\\section}{0pt}{15pt}{8pt}

\\pagestyle{empty}

\\begin{document}

% Creative Header
\\begin{center}
    {\\Huge \\textbf{\\color{creative}{{NAME}}}} \\\\
    \\vspace{3pt}
    {\\large \\color{accent}Creative Developer} \\\\
    \\vspace{5pt}
    \\faEnvelope\\ \\href{mailto:{{EMAIL}}}{{{EMAIL}}} $|$
    {{#if GITHUB}}\\faGithub\\ \\href{{{GITHUB}}}{Portfolio} $|$ {{/if}}
    {{#if LINKEDIN}}\\faLinkedin\\ \\href{{{LINKEDIN}}}{Connect}{{/if}}
\\end{center}

\\section{\\faRocket\\ Creative Vision}
{{SUMMARY}}

\\section{\\faLightbulb\\ Featured Projects}
{{#each PROJECTS}}
\\textbf{\\color{creative}{{this.title}}} \\\\
{{this.description}} \\\\
\\textit{\\color{accent}Tech Stack: {{#each this.technologies}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}} \\\\
\\begin{itemize}[leftmargin=0.3in]
{{#each this.achievements}}
\\item {{this}}
{{/each}}
\\end{itemize}
\\vspace{8pt}
{{/each}}

\\section{\\faCogs\\ Tech Arsenal}
{{#each SKILLS.technical}}{{this}}{{#unless @last}} $\\bullet$ {{/unless}}{{/each}}

\\end{document}`,
  },
}

export default creativeFormat
