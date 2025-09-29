import { NextResponse } from 'next/server'

import { allAuthors } from 'contentlayer/generated'
import experienceData from 'data/experienceData'
import projectsData from 'data/projectsData'
import siteMetadata from 'data/siteMetadata'
import skillsData from 'data/skillsData'

import type { Author, Experience, PortfolioData, Project, Site } from '@/lib/portfolio-types'

export async function GET() {
  try {
    const authorDetails = allAuthors[0]
    const { name, avatar, occupation, company, email, twitter, linkedin, github, body } =
      authorDetails

    const siteUrl = siteMetadata.siteUrl ?? ''

    const author: Author = {
      name,
      avatar: `${siteUrl}${avatar}`,
      occupation: occupation ?? '',
      company: company ?? '',
      email: email ?? '',
      twitter: twitter ?? '',
      linkedin: linkedin ?? '',
      github: github ?? '',
      bio: body.raw ?? '',
    }

    const experience: Experience[] = experienceData.map((exp) => ({
      ...exp,
      logoUrl: `${siteUrl}${exp.logoUrl}`,
    }))

    const projects: Project[] = projectsData.map((proj) => ({
      ...proj,
      imgSrc: proj.imgSrc ? `${siteUrl}${proj.imgSrc}` : undefined,
    }))

    const site: Site = {
      title: siteMetadata.title ?? '',
      author: siteMetadata.author ?? '',
      headerTitle: siteMetadata.headerTitle ?? '',
      description: siteMetadata.description ?? '',
      heroTitle: siteMetadata.heroTitle ?? '',
      heroSubtitle: siteMetadata.heroSubtitle ?? '',
      language: siteMetadata.language ?? 'en-us',
      theme: siteMetadata.theme ?? 'system',
      siteUrl: siteUrl,
      siteRepo: siteMetadata.siteRepo ?? '',
      keywords: siteMetadata.keywords ?? [],
      locale: siteMetadata.locale ?? 'en-US',
    }

    const data: PortfolioData = {
      author,
      experience,
      projects,
      skills: skillsData,
      site,
    }

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
