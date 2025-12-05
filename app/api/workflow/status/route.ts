import { NextResponse } from 'next/server'
import { getRun } from 'workflow/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const runId = searchParams.get('runId')

  if (!runId) {
    return NextResponse.json({ error: 'runId is required' }, { status: 400 })
  }

  try {
    const run = getRun(runId)
    const status = await run.status
    let result: unknown

    if (status === 'completed') {
      result = await run.returnValue
    }

    return NextResponse.json({
      status,
      result,
      workflowName: await run.workflowName,
      runId: run.runId,
    })
  } catch (e) {
    console.error('Status error:', e)
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 })
  }
}
