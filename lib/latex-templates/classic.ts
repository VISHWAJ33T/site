import type { LaTeXTemplate } from '@/types/resume'

const classicLatexTemplate: LaTeXTemplate = {
  id: 'classic',
  name: 'Classic Traditional',
  description: 'Traditional LaTeX resume template with serif fonts',
  packages: ['geometry', 'hyperref', 'enumitem', 'titlesec'],
  features: ['Traditional Layout', 'Serif Fonts', 'Clean Structure'],
  template: `\\documentclass[11pt,letterpaper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage[hidelinks]{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}

% Section formatting
\\titleformat{\\section}{\\Large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{12pt}{6pt}

% Remove page numbers
\\pagestyle{empty}

\\begin{document}

% Header
\\begin{center}
    {\\Large \\textbf{{{NAME}}}} \\\\
    \\vspace{2pt}
    {{EMAIL}} {{#if PHONE}}$|$ {{PHONE}}{{/if}} {{#if LINKEDIN}}$|$ {{LINKEDIN}}{{/if}}
\\end{center}

% Objective
\\section{Objective}
{{SUMMARY}}

% Experience
\\section{Experience}
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

% Projects
\\section{Projects}
{{#each PROJECTS}}
\\textbf{{{this.title}}} \\\\
{{this.description}} \\\\
\\textit{Technologies: {{#each this.technologies}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}} \\\\
\\begin{itemize}[leftmargin=0.2in]
{{#each this.achievements}}
\\item {{this}}
{{/each}}
\\end{itemize}
\\vspace{6pt}
{{/each}}

% Skills
\\section{Skills}
{{#each SKILLS.technical}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

\\end{document}`,
}

export default classicLatexTemplate
