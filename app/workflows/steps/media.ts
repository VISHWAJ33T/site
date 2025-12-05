const setupFfmpeg = async () => {
  const ffmpeg = (await import('fluent-ffmpeg')).default
  const fs = (await import('fs')).default
  const path = (await import('path')).default

  try {
    // Dynamic import with try-catch to handle missing binaries in serverless
    // @ts-ignore
    const ffmpegInstaller = (await import('@ffmpeg-installer/ffmpeg')).default
    // @ts-ignore
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
      // Construct paths relative to the project root (process.cwd())
      // Vercel / Next.js output standalone often nests everything
      const projectRoot = process.cwd()

      const possiblePaths = [
        // Standard node_modules layout
        path.join(projectRoot, 'node_modules', '@ffprobe-installer', 'win32-x64', 'ffprobe.exe'),
        path.join(projectRoot, 'node_modules', '@ffprobe-installer', 'linux-x64', 'ffprobe'),
        path.join(projectRoot, 'node_modules', '@ffprobe-installer', 'darwin-x64', 'ffprobe'),
        // Nested node_modules in standalone builds
        path.join(
          projectRoot,
          'server',
          'node_modules',
          '@ffprobe-installer',
          'linux-x64',
          'ffprobe'
        ),
        // Fallback to searching by package name if possible (not reliable in bundled envs, but worth a try)
      ]

      // Also try resolving via require.resolve if not bundled away
      try {
        const ffprobePackagePath = require.resolve('@ffprobe-installer/ffprobe/package.json')
        const packageDir = path.dirname(ffprobePackagePath)
        // Assuming default structure based on platform
        const platform = process.platform
        const arch = process.arch
        // Map simple platform/arch to known paths if needed or just search subdirs
        // For now, let's just check the known subfolders in that package dir
        possiblePaths.push(path.join(packageDir, 'win32-x64', 'ffprobe.exe'))
        possiblePaths.push(path.join(packageDir, 'linux-x64', 'ffprobe'))
      } catch (e) {
        /* ignore */
      }

      for (const altPath of possiblePaths) {
        if (altPath && fs.existsSync(altPath)) {
          console.log(`Found ffprobe at: ${altPath}`)
          ffmpeg.setFfprobePath(altPath)
          ffprobePathSet = true
          break
        }
      }
    }

    if (!ffprobePathSet) {
      console.warn(
        'Could not find ffprobe binary in any expected location. Listing node_modules/@ffprobe-installer if possible:'
      )
      try {
        const debugPath = path.join(process.cwd(), 'node_modules', '@ffprobe-installer')
        if (fs.existsSync(debugPath)) {
          const contents = fs.readdirSync(debugPath)
          console.warn('Contents of @ffprobe-installer:', contents)
          // If platform folders exist, check inside
          contents.forEach((item) => {
            const subPath = path.join(debugPath, item)
            if (fs.statSync(subPath).isDirectory()) {
              console.warn(`Contents of ${item}:`, fs.readdirSync(subPath))
            }
          })
        } else {
          console.warn('@ffprobe-installer directory not found in node_modules')
        }
      } catch (e) {
        console.warn('Error debugging paths:', e)
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
