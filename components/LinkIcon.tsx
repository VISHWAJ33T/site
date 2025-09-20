import { Globe, BookOpen } from 'lucide-react'

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const PlayStore = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M2.296 1.322c-.628.34-1.066.959-1.066 1.678v18c0 .719.438 1.338 1.066 1.678l10.25-10.25L2.296 1.322z"
      fill="#00B0FF"
    />
    <path
      d="M19.168 9.528L12.546 2.906c-.53-.53-1.38-.53-1.91 0l-9.218 9.218 10.25 10.25 10.198-10.198a2.126 2.126 0 00-2.698-2.654z"
      fill="#FFC107"
    />
    <path d="M12.546 2.906c-.53-.53-1.38-.53-1.91 0l.955.955L21.86 12l-7.742-3.44z" opacity={0.1} />
    <path d="M3.328 12.125l9.218-9.219-10.25-1.025z" opacity={0.1} />
    <path
      d="M21.86 12l-2.69-2.69-7.002 7.002.955.955 7.742-3.44a2.12 2.12 0 00.995-1.827z"
      fill="#FF3D00"
    />
  </svg>
)
interface Props extends React.SVGProps<SVGSVGElement> {
  kind: string
}
export const LinkIcon = ({ kind, ...rest }: Props) => {
  switch (kind) {
    case 'github':
      return <Github {...rest} />
    case 'live':
      return <Globe {...rest} />
    case 'docs':
      return <BookOpen {...rest} />
    case 'play store':
      return <PlayStore {...rest} />
    default:
      return null
  }
}
