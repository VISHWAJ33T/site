export const scrapeMetadata = async (url: string) => {
  'use step'
  const puppeteer = (await import('puppeteer')).default

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })

  const title = await page.title()
  const description = await page
    .$eval('meta[name="description"]', (element) => element.content)
    .catch(() => 'No description')

  await browser.close()
  return { title, description }
}

export const captureScreenshot = async (url: string) => {
  'use step'
  const puppeteer = (await import('puppeteer')).default

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(url, { waitUntil: 'networkidle2' })

  // Capture screenshot as base64 string
  const base64 = await page.screenshot({ encoding: 'base64' })

  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    }
  })

  await browser.close()
  return { base64: `data:image/png;base64,${base64}`, dimensions }
}
