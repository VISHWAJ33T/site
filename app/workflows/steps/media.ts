const setupFfmpeg = async () => {
  const ffmpeg = (await import('fluent-ffmpeg')).default
  const { path: ffprobePath } = await import('ffprobe-static')
  const ffmpegStatic = (await import('ffmpeg-static')).default
  const fs = (await import('fs')).default
  const path = (await import('path')).default

  // Resolve ffprobe
  let resolvedFfprobePath = ffprobePath
  if (!fs.existsSync(resolvedFfprobePath)) {
    const localPath = path.join(
      process.cwd(),
      'node_modules',
      'ffprobe-static',
      'bin',
      'win32',
      'x64',
      'ffprobe.exe'
    )
    if (fs.existsSync(localPath)) resolvedFfprobePath = localPath
  }
  ffmpeg.setFfprobePath(resolvedFfprobePath)

  // Resolve ffmpeg
  let resolvedFfmpegPath = ffmpegStatic
  if (resolvedFfmpegPath && !fs.existsSync(resolvedFfmpegPath)) {
    const localPath = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe')
    if (fs.existsSync(localPath)) resolvedFfmpegPath = localPath
  }
  if (resolvedFfmpegPath) ffmpeg.setFfmpegPath(resolvedFfmpegPath)

  return { ffmpeg, fs, path }
}

export const probeVideo = async (filePath: string) => {
  'use step'
  const { ffmpeg, path } = await setupFfmpeg()

  // Resolve public URL path to absolute file system path
  let absolutePath = filePath
  if (filePath.startsWith('/')) {
    absolutePath = path.join(process.cwd(), 'public', filePath)
  }

  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(absolutePath, (err, metadata) => {
      if (err) reject(err)
      else resolve(metadata.format)
    })
  })
}

export const generateThumbnail = async (filePath: string) => {
  'use step'
  const { ffmpeg, fs, path } = await setupFfmpeg()

  // Resolve public URL path to absolute file system path
  let absolutePath = filePath
  if (filePath.startsWith('/')) {
    absolutePath = path.join(process.cwd(), 'public', filePath)
  }

  // In a real scenario, we'd output to a public dir or upload to cloud storage
  const outputDir = './public/thumbnails'
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  const filename = `thumb-${Date.now()}.png`
  const outputPath = path.join(outputDir, filename)

  return new Promise((resolve, reject) => {
    ffmpeg(absolutePath)
      .screenshots({
        timestamps: ['50%'],
        filename: filename,
        folder: outputDir,
        size: '320x240',
      })
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
  })
}

export const extractAudioSnippet = async (filePath: string) => {
  'use step'
  const { ffmpeg, fs, path } = await setupFfmpeg()

  // Resolve public URL path to absolute file system path
  let absolutePath = filePath
  if (filePath.startsWith('/')) {
    absolutePath = path.join(process.cwd(), 'public', filePath)
  }

  const outputDir = './public/audio'
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  const outputPath = path.join(outputDir, `snippet-${Date.now()}.mp3`)

  return new Promise((resolve, reject) => {
    ffmpeg(absolutePath)
      .setStartTime(0)
      .setDuration(30)
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
      .run()
  })
}
