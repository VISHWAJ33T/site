'use client'

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Globe,
  Clapperboard,
  Loader2,
  AlertCircle,
  Upload,
  Download,
  FileAudio,
} from 'lucide-react'
import Image from 'next/image'

type WorkflowRun = {
  runId: string
  type: 'scraper' | 'media'
  workflowName: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused' | 'cancelled'
  result?: any
  approvalToken?: string
}

export default function WorkflowPage() {
  const [url, setUrl] = useState('https://example.com')
  const [mediaPath, setMediaPath] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const [runs, setRuns] = useState<WorkflowRun[]>([])
  const [activeRunId, setActiveRunId] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load runs from local storage
  useEffect(() => {
    const saved = localStorage.getItem('workflow-runs')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setRuns(parsed)
        const active = parsed.find(
          (r: WorkflowRun) => r.status === 'running' || r.status === 'pending'
        )
        if (active) setActiveRunId(active.runId)
      } catch (e) {
        console.error('Failed to load runs', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save runs to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('workflow-runs', JSON.stringify(runs))
    }
  }, [runs, isLoaded])

  // Polling for active run
  useEffect(() => {
    if (!activeRunId) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/workflow/status?runId=${activeRunId}`)
        const data = await res.json()

        if (data.error) return

        setRuns((prev) =>
          prev.map((run) =>
            run.runId === activeRunId ? { ...run, status: data.status, result: data.result } : run
          )
        )

        if (data.status === 'completed' || data.status === 'failed') {
          setActiveRunId(null)
        }
      } catch (e) {
        console.error('Polling error', e)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [activeRunId])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadedFile(file)
      setIsUploading(true)

      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.path) {
          setMediaPath(data.path)
        }
      } catch (err) {
        console.error('Upload failed', err)
      } finally {
        setIsUploading(false)
      }
    }
  }

  const startWorkflow = async (type: 'scraper' | 'media') => {
    try {
      const payload = type === 'scraper' ? { type, url } : { type, inputPath: mediaPath }
      const res = await fetch('/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.runId) {
        const newRun: WorkflowRun = {
          runId: data.runId,
          type: type,
          approvalToken: data.approvalToken,
          status: data.status,
          result: data.result,
          workflowName: data.workflowName,
        }
        setRuns((prev) => [...prev, newRun])
        setActiveRunId(data.runId)
      } else if (data.error) {
        alert(`Error: ${data.error}`)
      }
    } catch (err) {
      console.error('Failed to start workflow', err)
      alert('Failed to start workflow. Check console for details.')
    }
  }

  const resumeWorkflow = async (token: string, approved: boolean) => {
    try {
      const res = await fetch('/api/workflow/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          data: approved,
        }),
      })
      const data = await res.json()
      if (data.error) {
        alert(`Error resuming workflow: ${data.error}`)
      }
    } catch (err) {
      console.error('Failed to resume', err)
      alert('Failed to resume workflow. Check console for details.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 font-sans text-white selection:bg-purple-500/30">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="space-y-6 py-8 text-center">
          <h1 className="animate-gradient-x bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-6xl font-black tracking-tighter text-transparent">
            Workflow Engine
          </h1>
          <p className="mx-auto max-w-2xl text-xl font-light text-gray-400">
            Orchestrate complex background jobs with{' '}
            <span className="font-medium text-white">Human-in-the-Loop</span> control.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Web Scraper Card */}
          <div className="group relative rounded-3xl border border-white/10 bg-gray-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-blue-500/10 p-4 text-blue-400 ring-1 ring-blue-500/20 transition-transform duration-500 group-hover:scale-110">
                  <Globe size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Web Scraper</h2>
                  <p className="text-sm text-gray-400">Extract metadata & screenshots</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="url-input"
                    className="text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Target URL
                  </label>
                  <input
                    id="url-input"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-transparent focus:ring-2 focus:ring-blue-500/50"
                    placeholder="https://example.com"
                  />
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    startWorkflow('scraper')
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-900/40"
                >
                  Start Scraper Workflow <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Media Processor Card */}
          <div className="group relative rounded-3xl border border-white/10 bg-gray-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/30">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-purple-500/10 p-4 text-purple-400 ring-1 ring-purple-500/20 transition-transform duration-500 group-hover:scale-110">
                  <Clapperboard size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Media Processor</h2>
                  <p className="text-sm text-gray-400">Process video & extract audio</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="media-url-input"
                      className="text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                      Media URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="media-url-input"
                        type="text"
                        value={mediaPath}
                        onChange={(e) => setMediaPath(e.target.value)}
                        className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-transparent focus:ring-2 focus:ring-purple-500/50"
                        placeholder="https://example.com/video.mp4"
                      />
                      <label
                        htmlFor="file-upload"
                        className={`flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-gray-800 px-4 transition-colors hover:bg-gray-700 ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        {isUploading ? (
                          <Loader2 size={20} className="animate-spin text-purple-400" />
                        ) : (
                          <Upload size={20} className="text-gray-400" />
                        )}
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleUpload}
                          accept="video/*,image/*"
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    {isUploading && (
                      <p className="animate-pulse text-xs text-purple-400">Uploading file...</p>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      startWorkflow('media')
                    }}
                    disabled={!mediaPath}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-4 font-bold text-white shadow-lg shadow-purple-900/20 transition-all hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-purple-900/40 ${!mediaPath ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    Start Media Workflow <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Workflow Runs List */}
        <div className="space-y-6">
          <h3 className="px-2 text-2xl font-bold text-white/90">Recent Runs</h3>
          <div className="grid gap-4">
            {runs?.map((run) => (
              <div
                key={run?.runId || run?.approvalToken}
                className="rounded-2xl border border-white/5 bg-gray-900/60 p-6 transition-all hover:border-white/10"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-lg p-2 ${run?.type === 'scraper' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}
                    >
                      {run?.type === 'scraper' ? <Globe size={20} /> : <Clapperboard size={20} />}
                    </div>
                    <div>
                      <div className="mb-1 font-mono text-xs text-gray-500">
                        {String(run?.runId)}
                      </div>
                      <div className="font-medium capitalize text-white">
                        {String(run?.type)} Workflow
                      </div>
                      <div className="font-medium capitalize text-white">
                        {String(run?.workflowName?.split(/\//).pop())}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        run?.status === 'completed'
                          ? 'border-green-500/20 bg-green-500/10 text-green-400'
                          : run?.status === 'running'
                            ? 'animate-pulse border-blue-500/20 bg-blue-500/10 text-blue-400'
                            : run?.status === 'failed'
                              ? 'border-red-500/20 bg-red-500/10 text-red-400'
                              : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {String(run?.status)}
                    </span>
                  </div>
                </div>

                {/* HITL Controls */}
                {run?.status === 'paused' && (
                  <div className="mb-4 flex items-center justify-between rounded-xl border border-yellow-500/10 bg-yellow-500/5 p-4">
                    <div className="flex items-center gap-3 text-yellow-200/80">
                      <AlertCircle size={18} />
                      <span className="text-sm">Waiting for approval to proceed...</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          run?.approvalToken && resumeWorkflow(run?.approvalToken, false)
                        }
                        className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          run?.approvalToken && resumeWorkflow(run?.approvalToken, true)
                        }
                        className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/20"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                )}

                {/* Results */}
                {run?.result && (
                  <div className="mt-4 space-y-4 border-t border-white/5 pt-4">
                    {run?.result?.metadata && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="rounded-lg bg-black/20 p-3">
                          <span className="mb-1 block text-gray-500">Title/Format</span>
                          <span
                            className="block truncate text-gray-300"
                            title={JSON.stringify(run?.result?.metadata)}
                          >
                            {typeof run?.result?.metadata === 'string'
                              ? run?.result?.metadata
                              : String(
                                  (run?.result?.metadata as any)?.title ||
                                    (run?.result?.metadata as any)?.format_name ||
                                    'N/A'
                                )}
                          </span>
                        </div>
                        <div className="rounded-lg bg-black/20 p-3">
                          <span className="mb-1 block text-gray-500">Description/Duration</span>
                          <span className="block truncate text-gray-300">
                            {String(
                              (run?.result?.metadata as any)?.description ||
                                (run?.result?.metadata as any)?.duration ||
                                'N/A'
                            )}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      {run?.result?.thumbnail && (
                        <div className="group relative overflow-hidden rounded-lg border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={(run?.result?.thumbnail as string)
                              .replace('public', '')
                              .replace('\\', '/')}
                            alt="Thumbnail"
                            className="h-32 w-auto object-cover"
                          />
                          <a
                            href={(run?.result?.thumbnail as string)
                              .replace('public', '')
                              .replace('\\', '/')}
                            download="screenshot.png"
                            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <Download size={20} className="text-white" />
                          </a>
                        </div>
                      )}

                      {run?.result?.audioSnippet && (
                        <div className="group relative flex items-center gap-3 overflow-hidden rounded-lg rounded-xl border border-white/5 bg-gray-800/50 p-4">
                          <div className="rounded-lg bg-purple-500/20 p-2 text-purple-400">
                            <FileAudio size={24} />
                          </div>
                          <div>
                            <div className="mb-1 text-sm text-gray-400">Audio Snippet</div>
                            <audio
                              controls
                              src={(run?.result?.audioSnippet as string)
                                .replace('public', '')
                                .replace('\\', '/')}
                              className="h-8 w-32"
                            >
                              <track kind="captions" />
                            </audio>
                          </div>
                          <a
                            href={(run?.result?.audioSnippet as string)
                              .replace('public', '')
                              .replace('\\', '/')}
                            download="snippet.mp3"
                            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <Download size={20} className="text-white" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
