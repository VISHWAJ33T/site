import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const filePath = path.join(uploadDir, filename)

    // Convert Web ReadableStream to Node.js Readable stream
    // @ts-ignore - stream() exists on File/Blob in modern Node/Bun environments
    const stream = file.stream()
    // @ts-ignore
    await pump(stream, fs.createWriteStream(filePath))

    const publicPath = `/uploads/${filename}`
    return NextResponse.json({ path: publicPath })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
