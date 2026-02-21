import { upsertIncreasePostViews } from '@/app/actions'
// force-static required for static export; view-count API won't run on static hosts (e.g. Cloudflare Pages)
export const dynamic = 'force-static'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return []
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const result = await upsertIncreasePostViews({ slug })
    return new Response(JSON.stringify({ views: result }))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
