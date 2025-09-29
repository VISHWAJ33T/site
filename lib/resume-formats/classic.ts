import type { ResumeFormat } from '@/types/resume'

const classicFormat: ResumeFormat = {
  id: 'classic',
  name: 'Classic Traditional',
  description: 'Traditional format preferred by conservative industries',
  features: ['Conservative', 'Formal Language', 'Chronological', 'Traditional'],
  preview: `John Doe
123 Main Street, City, State 12345
(555) 123-4567 | john.doe@email.com

OBJECTIVE
Seeking a challenging position in software development...

PROFESSIONAL EXPERIENCE
Software Engineer
ABC Corporation, City, State
January 2020 - Present
- Developed and maintained web applications
- Collaborated with cross-functional teams...`,
  prompt: `Create a traditional, conservative resume format. Focus on:
- Formal, professional language
- Chronological work history
- Complete contact information including address
- Objective statement (if appropriate)
- Full company names and locations
- Detailed job descriptions
- Educational background prominently featured
- Conservative formatting with standard fonts
- Proper business letter formatting
- Emphasis on stability and career progression`,
  latexTemplate: {
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
  },
}

export default classicFormat
