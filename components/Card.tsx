import Image from './Image'
import Link from './Link'
import { LinkIcon } from './LinkIcon'
import { buttonVariants } from './ui/button'

export function Card({ title, description, imgSrc, href, badges, links, contribution }) {
  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div className={`${imgSrc && 'h-full'}  overflow-hidden rounded-md border-2 border-border`}>
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="aspect-[calc(1200/630)] object-cover object-center "
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          ))}
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {badges?.map((badge) => (
              <span
                key={badge}
                className="mb-2 rounded-md bg-primary/20 px-2 py-1 text-xs font-semibold uppercase text-primary"
              >
                {badge}
              </span>
            ))}
          </div>
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3  max-w-none text-muted-foreground dark:prose-invert">
            {description}
          </p>
          {contribution && contribution.length > 0 && (
            <div className="prose mb-3 max-w-none text-muted-foreground dark:prose-invert">
              <h4 className="font-semibold">My Contribution:</h4>
              <ul className="list-disc pl-5">
                {contribution.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {links?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
                aria-label={`Link to ${link.text}`}
              >
                <LinkIcon kind={link.text.toLowerCase()} className="mr-2 h-4 w-4" />
                {link.text}
              </Link>
            ))}
            {href && !links?.length && (
              <Link
                href={href}
                className="text-base font-medium leading-6 text-primary hover:text-primary/90"
                aria-label={`Link to ${title}`}
              >
                Learn more &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
