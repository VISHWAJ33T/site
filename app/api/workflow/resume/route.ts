import { NextResponse } from 'next/server'
// @ts-ignore
import { resumeHook } from 'workflow/api'

export async function POST(request: Request) {
  try {
    const { token, data } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'token is required' }, { status: 400 })
    }

    await resumeHook(token, data)

    return NextResponse.json({ message: 'Hook resumed' })
  } catch (e) {
    console.error('Resume error:', e)
    return NextResponse.json({ error: 'Failed to resume workflow' }, { status: 500 })
  }
}
