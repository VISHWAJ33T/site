export interface Author {
  name: string
  avatar: string
  occupation: string
  company: string
  email: string
  twitter: string
  linkedin: string
  github: string
  bio: string
}

export interface Experience {
  role: string
  company: string
  companyUrl: string
  logoUrl: string
  period: string
  location: string
  description: string[]
  skills: string[]
}

export interface ProjectLink {
  text: string
  href: string
}

export interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  links?: ProjectLink[]
  badges?: string[]
  contribution?: string[]
}

export interface Site {
  title: string
  author: string
  headerTitle: string
  description: string
  heroTitle: string
  heroSubtitle: string
  language: string
  theme: string
  siteUrl: string
  siteRepo: string
  keywords: string[]
  locale: string
}

export interface PortfolioData {
  author: Author
  experience: Experience[]
  projects: Project[]
  skills: string[]
  site: Site
}
