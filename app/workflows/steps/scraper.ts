import { openPage, takeSnapShot } from '@microfox/puppeteer-sls'

export const scrapeMetadata = async (url: string) => {
  'use step'

  const { browser, page } = await openPage({
    url,
    isLocal: process.env.NODE_ENV !== 'production',
    headless: true,
  })

  try {
    const title = await page.title()
    const description = await page
      .$eval('meta[name="description"]', (element: any) => element.content)
      .catch(() => 'No description')

    return { title, description }
  } finally {
    if (browser) await browser.close()
  }
}

export const captureScreenshot = async (url: string) => {
  'use step'

  const { browser, page } = await openPage({
    url,
    isLocal: process.env.NODE_ENV !== 'production',
    headless: true,
    defaultViewport: { width: 1280, height: 800 },
  })

  try {
    // Capture screenshot as base64 string
    const base64 = await page.screenshot({ encoding: 'base64' })

    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
      }
    })

    return { base64: `data:image/png;base64,${base64}`, dimensions }
  } finally {
    if (browser) await browser.close()
  }
}
