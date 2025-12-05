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
  const { ffmpeg, path, fs } = await setupFfmpeg()

  let inputPath = filePath
  let tempInputPath: string | null = null

  // Handle Data URL input by writing to /tmp
  if (filePath.startsWith('data:')) {
    const matches = filePath.match(/^data:(.+?);base64,(.+)$/)
    if (matches) {
      const ext = matches[1].split('/')[1] || 'mp4'
      const buffer = Buffer.from(matches[2], 'base64')
      tempInputPath = path.join('/tmp', `input-${Date.now()}.${ext}`)
      fs.writeFileSync(tempInputPath, buffer)
      inputPath = tempInputPath
    }
  } else if (filePath.startsWith('/') && !filePath.startsWith('http')) {
    // Handle legacy local path (if any remain) by resolving to public
    // But we should deprecate this path preferably
    inputPath = path.join(process.cwd(), 'public', filePath)
  }

  try {
    return await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputPath, (err, metadata) => {
        if (err) reject(err)
        else resolve(metadata.format)
      })
    })
  } finally {
    // Clean up temp file
    if (tempInputPath && fs.existsSync(tempInputPath)) {
      try {
        fs.unlinkSync(tempInputPath)
      } catch (e) {
        console.error('Failed to delete temp file:', e)
      }
    }
  }
}

export const generateThumbnail = async (filePath: string) => {
  'use step'
  const { ffmpeg, fs, path } = await setupFfmpeg()

  let inputPath = filePath
  let tempInputPath: string | null = null

  if (filePath.startsWith('data:')) {
    const matches = filePath.match(/^data:(.+?);base64,(.+)$/)
    if (matches) {
      const ext = matches[1].split('/')[1] || 'mp4'
      const buffer = Buffer.from(matches[2], 'base64')
      tempInputPath = path.join('/tmp', `input-${Date.now()}.${ext}`)
      fs.writeFileSync(tempInputPath, buffer)
      inputPath = tempInputPath
    }
  } else if (filePath.startsWith('/') && !filePath.startsWith('http')) {
    inputPath = path.join(process.cwd(), 'public', filePath)
  }

  // Output to /tmp
  const outputDir = '/tmp' // Vercel writable
  if (!fs.existsSync(outputDir)) {
    // /tmp always exists in lambda, but good practice locally
    try {
      fs.mkdirSync(outputDir, { recursive: true })
    } catch (e) {
      console.error('Failed to create output directory:', e)
    }
  }

  const filename = `thumb-${Date.now()}.png`
  const outputPath = path.join(outputDir, filename)

  try {
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .screenshots({
          timestamps: ['50%'],
          filename: filename,
          folder: outputDir,
          size: '320x240',
        })
        .on('end', resolve)
        .on('error', reject)
    })

    // Read result and return as Data URL
    const imageBuffer = fs.readFileSync(outputPath)
    const base64 = imageBuffer.toString('base64')
    return `data:image/png;base64,${base64}`
  } finally {
    // Cleanup
    if (tempInputPath && fs.existsSync(tempInputPath))
      try {
        fs.unlinkSync(tempInputPath)
      } catch (e) {
        console.error('Failed to delete temp file:', e)
      }
    if (fs.existsSync(outputPath))
      try {
        fs.unlinkSync(outputPath)
      } catch (e) {
        console.error('Failed to delete output file:', e)
      }
  }
}

export const extractAudioSnippet = async (filePath: string) => {
  'use step'
  const { ffmpeg, fs, path } = await setupFfmpeg()

  let inputPath = filePath
  let tempInputPath: string | null = null

  if (filePath.startsWith('data:')) {
    const matches = filePath.match(/^data:(.+?);base64,(.+)$/)
    if (matches) {
      const ext = matches[1].split('/')[1] || 'mp4'
      const buffer = Buffer.from(matches[2], 'base64')
      tempInputPath = path.join('/tmp', `input-${Date.now()}.${ext}`)
      fs.writeFileSync(tempInputPath, buffer)
      inputPath = tempInputPath
    }
  } else if (filePath.startsWith('/') && !filePath.startsWith('http')) {
    inputPath = path.join(process.cwd(), 'public', filePath)
  }

  const outputDir = '/tmp'
  const outputPath = path.join(outputDir, `snippet-${Date.now()}.mp3`)

  try {
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .setStartTime(0)
        .setDuration(30)
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run()
    })

    // Read result and return as Data URL
    const audioBuffer = fs.readFileSync(outputPath)
    const base64 = audioBuffer.toString('base64')
    return `data:audio/mp3;base64,${base64}`
  } finally {
    if (tempInputPath && fs.existsSync(tempInputPath))
      try {
        fs.unlinkSync(tempInputPath)
      } catch (e) {
        console.error('Failed to delete temp file:', e)
      }
    if (fs.existsSync(outputPath))
      try {
        fs.unlinkSync(outputPath)
      } catch (e) {
        console.error('Failed to delete output file:', e)
      }
  }
}
