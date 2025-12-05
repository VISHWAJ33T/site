import { sleep, createHook } from 'workflow'
import { probeVideo, generateThumbnail, extractAudioSnippet } from './steps/media'

interface WebMetadata {
  url?: string
  title?: string
  description?: string
}

export const mediaProcessorWorkflow = async (inputPath: string, approvalToken: string) => {
  'use workflow'

  const metadata = (await probeVideo(inputPath)) as WebMetadata

  // // HITL: Wait for user approval before extracting audio
  // const hook = createHook<boolean>({
  //   token: approvalToken, metadata: {
  //     url: metadata?.url,
  //     title: metadata?.title,
  //     description: metadata?.description,
  //     message: "Extract media?"
  //   }
  // });
  // const approved = await hook;

  // if (!approved) {
  //   return {
  //     metadata,
  //     status: "rejected"
  //   };
  // }

  const thumbnail = await generateThumbnail(inputPath)
  await sleep('1s')
  const audioSnippet = await extractAudioSnippet(inputPath)

  return {
    metadata,
    thumbnail,
    audioSnippet,
    status: 'processed',
  }
}
