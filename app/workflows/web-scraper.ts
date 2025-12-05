import { sleep, createHook } from 'workflow'
import { scrapeMetadata, captureScreenshot } from './steps/scraper'

export async function webScraperWorkflow(url: string, approvalToken: string) {
  'use workflow'

  // HITL: Wait for user approval before taking screenshot
  // const hook = createHook<boolean>({
  //   token: approvalToken, metadata: {
  //     message: "Approve Scraping?"
  //   }
  // });
  // console.log("Waiting for approval...", approvalToken);
  // const isApproved = await hook;
  // console.log("Approval result:", isApproved);

  // if (!isApproved) {
  //   return {
  //     status: "rejected"
  //   };
  // }

  const metadata = await scrapeMetadata(url)
  await sleep('2s') // Politeness delay
  const screenshotResult = await captureScreenshot(url)
  return {
    metadata,
    thumbnail: screenshotResult.base64,
    screenshot: screenshotResult.base64,
    dimensions: screenshotResult.dimensions,
    status: 'completed',
  }
}
