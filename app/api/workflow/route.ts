import { start } from 'workflow/api'
import { webScraperWorkflow } from '@/app/workflows/web-scraper'
import { mediaProcessorWorkflow } from '@/app/workflows/media-processor'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { type, url, inputPath } = body

  const approvalToken = crypto.randomUUID()

  if (type === 'scraper') {
    if (!url) {
      return NextResponse.json({ error: 'URL is required for scraper' }, { status: 400 })
    }
    const run = await start(webScraperWorkflow, [url, approvalToken])
    return NextResponse.json({
      message: 'Web scraper workflow started',
      runId: run.runId,
      approvalToken,
    })
  }

  if (type === 'media') {
    if (!inputPath) {
      return NextResponse.json(
        { error: 'Input path is required for media processor' },
        { status: 400 }
      )
    }
    const run = await start(mediaProcessorWorkflow, [inputPath, approvalToken])
    const status = await run.status
    let result
    if (status === 'completed') {
      result = await run.returnValue
    }
    return NextResponse.json({
      message: 'Media processor workflow started',
      status,
      result,
      workflowName: await run.workflowName,
      runId: run.runId,
      approvalToken,
    })
  }

  return NextResponse.json({ error: "Invalid type. Use 'scraper' or 'media'" }, { status: 400 })
}
