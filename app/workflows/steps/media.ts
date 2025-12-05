const setupFfmpeg = async () => {
  const ffmpeg = (await import('fluent-ffmpeg')).default
  const fs = (await import('fs')).default
  const path = (await import('path')).default

  try {
    // Dynamic import with try-catch to handle missing binaries in serverless
    const ffmpegInstaller = (await import('@ffmpeg-installer/ffmpeg')).default
    const ffprobeInstaller = (await import('@ffprobe-installer/ffprobe')).default

    // Verify and set ffmpeg path
    if (ffmpegInstaller?.path) {
      const ffmpegPath = ffmpegInstaller.path
      if (fs.existsSync(ffmpegPath)) {
        ffmpeg.setFfmpegPath(ffmpegPath)
      }
    }

    // Verify and set ffprobe path with multiple fallback strategies
    let ffprobePathSet = false

    if (ffprobeInstaller?.path) {
      const ffprobePath = ffprobeInstaller.path
      if (fs.existsSync(ffprobePath)) {
        ffmpeg.setFfprobePath(ffprobePath)
        ffprobePathSet = true
      }
    }

    // Try alternative path resolution if primary failed
    if (!ffprobePathSet) {
      const alternativePaths = [
        // Try direct node_modules path
        path.resolve(
          process.cwd(),
          'node_modules',
          '@ffprobe-installer',
          'win32-x64',
          'ffprobe.exe'
        ),
        path.resolve(process.cwd(), 'node_modules', '@ffprobe-installer', 'linux-x64', 'ffprobe'),
      ].filter(Boolean) as string[]

      for (const altPath of alternativePaths) {
        if (altPath && fs.existsSync(altPath)) {
          ffmpeg.setFfprobePath(altPath)
          ffprobePathSet = true
          break
        }
      }
    }
  } catch (error) {
    console.warn(
      'ffmpeg/ffprobe installers not available, using system binaries if available:',
      error
    )
  }

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
