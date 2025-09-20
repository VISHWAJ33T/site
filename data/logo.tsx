import { cn } from '../components/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="500"
      viewBox="0 0 375 375"
      className={cn('h-8 w-8 stroke-foreground', className)}
    >
      <defs>
        <clipPath id="a">
          <path d="M20.78 20.53h333.44v333.47H20.78z" />
        </clipPath>
        <clipPath id="b">
          <path d="M187.5 20.53C95.42 20.53 20.78 95.29 20.78 187.5c0 92.22 74.64 166.97 166.72 166.97s166.72-74.75 166.72-166.97S279.58 20.53 187.5 20.53z" />
        </clipPath>
        <clipPath id="c">
          <path d="M47 47h281v281H47z" />
        </clipPath>
        <clipPath id="d">
          <path d="m181.3 32.2 161.27 144.84-148.1 166.3L31.94 198.5z" />
        </clipPath>
        <clipPath id="e">
          <path d="m209.2 57.26 105.47 94.72a39.8 39.8 0 0 1 7.85 25.9c.53 9.93-2.9 19.67-9.55 27.07l-98.75 110c-6.65 7.4-15.96 11.85-25.9 12.38-9.93.54-19.67-2.9-27.07-9.55L60.33 223.02a39.8 39.8 0 0 1-8.33-25.9c-.53-9.93 2.9-19.67 9.55-27.07L156.25 60.1c6.64-7.4 15.96-11.86 25.89-12.39 9.93-.53 19.67 2.9 27.06 9.55z" />
        </clipPath>
        <clipPath id="f">
          <path d="M125 104.18h59v57.82h-59z" />
        </clipPath>
        <clipPath id="g">
          <path d="M191 104.18h59.23v57.82H191z" />
        </clipPath>
        <clipPath id="h">
          <path d="M164 170h49v144.93h-49z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <g clipPath="url(#b)">
          <path fill="#000" d="M20.78 20.53h333.44v333.45H20.78z" />
        </g>
      </g>
      <g clipPath="url(#c)">
        <g clipPath="url(#d)">
          <g clipPath="url(#e)">
            <path fill="#fff" d="m181.3 32.2 161.27 144.84-148.79 165.67-148.76-145.17z" />
          </g>
        </g>
      </g>
      <path
        fill="#000"
        d="M178.17 165.92h20.22l4.18-17.82-14.97-17.83-2.87 3.42-12.1 14.4z"
      />
      <g clipPath="url(#f)">
        <path fill="#000" d="m136.9 104.7-1.99 3.45-9.9 17L156.42 161.74l27.52-32.78z" />
      </g>
      <g clipPath="url(#g)">
        <path fill="#000" d="m238.35 104.7-47.02 24.26 27.53 32.78 31.37-36.59z" />
      </g>
      <g clipPath="url(#h)">
        <path
          fill="#000"
          d="M192.52 170.44h-14.35L164.02 281.77l20.71 28.8 2.87 4L212.54 281.58l-14.15-111.14z"
        />
      </g>
    </svg>
  )
}
