import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import experienceData from '@/data/experienceData'
import skillsData from '@/data/skillsData'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="divide-y divide-border">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 pb-8 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-muted-foreground">{occupation}</div>
            <div className="text-muted-foreground">{company}</div>
            <div className="flex space-x-3 pt-6">
              {/* <SocialIcon kind="mail" href={`mailto:${email}`} /> */}
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
        <div className="py-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Experience
          </h2>
          <div className="mt-6 space-y-8">
            {experienceData.map((exp, index) => (
              <div key={index} className="flex gap-x-4">
                <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full bg-border">
                  {exp.logoUrl ? (
                    <Image
                      src={exp.logoUrl}
                      alt={`${exp.company} logo`}
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-medium text-muted-foreground">
                      {exp.company.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-auto rounded-md p-4 ring-1 ring-inset ring-border">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.location}</p>
                  {exp.description.length > 0 && (
                    <ul className="list-disc pl-5 pt-2">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Skills</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {skillsData.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
