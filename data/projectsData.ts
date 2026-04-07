interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  links?: { text: string; href: string }[]
  badges?: string[]
  contribution?: string[]
}

const projectsData: Project[] = [
  {
    title: 'Microfox — AI Agent Framework',
    description:
      'A comprehensive suite of tools for building AI agents that integrate with platforms like Slack, Reddit, and Google Sheets. Following the philosophy of "code that writes code," Microfox enables AI to create and deploy complex workflows while giving developers robust controls to monitor and verify AI-generated processes.',
    imgSrc: '/static/images/projects/microfox.png',
    links: [
      { text: 'Live', href: 'https://microfox.app' },
      { text: 'Docs', href: 'https://docs.microfox.app' },
      { text: 'GitHub', href: 'https://github.com/microfox-ai/microfox' },
    ],
    badges: ['AI', 'Automation', 'DevTools', 'Serverless'],
    contribution: [
      'Architected an end-to-end AI workflow that translates natural language prompts into fully deployed agents using a multi-model approach (Claude, RAG, Gemini).',
      'Automated the entire agent lifecycle, from AI-driven code generation to deployment, using Octokit and Serverless AWS infrastructure.',
      'Built a scalable ecosystem of 50+ platform integration packages, supported by an automated, Gemini-powered documentation pipeline with RAG support.',
      'Engineered a two-step wrapper to convert packages into secure AI tools and developed CLI tools to streamline the development workflow.',
      'Developed a comprehensive deployment and monitoring console (CLI, Dashboard, GitHub Actions) with real-time SSE log streaming for full visibility.',
      'Optimized infrastructure by reducing deployment times by ~40% with a custom cache and enabling long-running asynchronous agents with AWS SQS and Redis.',
    ],
  },
  {
    title: 'Ratnawn Ai',
    description:
      'A multi-agent platform for fashion e-commerce featuring a suite of specialized AI tools. Anchored by a "Smart Model" agent that generates high-fidelity on-model imagery and videos, the ecosystem extends to include utilities for image manipulation, upscaling, speech translation, and product catalog generation.',
    imgSrc: '/static/images/projects/ratnawn-ai.png',
    links: [{ text: 'Live', href: 'https://ratnawnai.com/' }],
    badges: ['Multi-Agent', 'Real-Time AI', 'Generative AI', 'E-commerce', 'Serverless'],
    contribution: [
      'Developed a real-time 1:1 virtual video sales agent using Tavus AI, Sarvam, and Gemini, orchestrated through LiveKit with capabilities for turn detection, noise cancellation, and RAG-driven product querying.',
      'Architected a responsive system using AWS Lambda and SQS for background processing, coupled with a self-hosted Next.js BFF that consumes webhooks and streams real-time updates to the client via SSE.',
      'Developed the "Smart Model" agent capable of generating consistent 4K model imagery (front/back/side) and videos from garment photos with >95% design accuracy.',
      'Implemented a RAG-based retrieval system to dynamically select tailored, internally maintained models and backgrounds (indoor/outdoor) based on product style.',
      'Engineered an AI analysis pipeline that extracts product features to auto-generate SEO-rich Excel catalogs.',
      'Integrated a diverse stack of generative tools (Nanobanana, Fal.ai, Flux Kontext, Seeddreams, Recraft Crisp, KlingAI, Replicate) to power specialized image manipulation tasks.',
    ],
  },
  {
    title: 'Writepad — AI Creative Writing IDE',
    description:
      'A flagship Microfox product. A professional AI-powered creative writing IDE for novelists, screenwriters, and storytellers. Built entirely on the @microfox/ai-router and @microfox/ai-worker infrastructure — combining a rich writing environment, multi-agent AI assistance, WriteGit version control, and real-time collaboration. Think: Cursor for writers.',
    imgSrc: '/static/images/projects/writepad.png',
    badges: ['AI', 'Writing', 'Web IDE', 'Collaboration', 'Version Control'],
    contribution: [
      'Built a project-based writing environment on CodeMirror 6 with ghost-text AI autocomplete, a per-project .writepad rules file for consistent style/voice enforcement, and a file/folder tree for chapters, scenes, and notes.',
      'Engineered a multi-agent AI system via @microfox/ai-router — Editor, Continuity, Outliner, Dialogue, Research, Critique, and Synopsis agents powered by Gemini 2.5 Pro — with a chat panel that proposes all changes as structured diff blocks (accept/reject per hunk).',
      'Designed WriteGit — a version control system purpose-built for prose — supporting commits, branches, prose-aware side-by-side diffs, three-way merge with AI-assisted conflict resolution, and full project history rollback per branch.',
      'Implemented real-time collaborative editing with operational transformation (no conflicts, no last-save-wins), shared AI chat visible to all collaborators, color-coded cursor presence, and a branch-protection permission model.',
      'Built 6 background Lambda workers via @microfox/ai-worker (Manuscript Analyzer, Style Consistency Pass, Chapter Summarizer, World Bible Builder, Continuity Tracker, Batch Rewriter) chained into multi-step workflows with HITL approval gates.',
    ],
  },
  {
    title: 'MediaMake — AI Video Production Platform',
    description:
      'A flagship Microfox product. An AI-powered video production platform that transforms creative briefs into fully rendered professional videos with no manual editing. Built entirely on the @microfox/ai-router and @microfox/ai-worker infrastructure, it automates every stage of the production pipeline from concept to delivery.',
    imgSrc: '/static/images/projects/mediamake.png',
    badges: ['AI', 'Video Editor', 'Remotion', 'Multi-Agent'],
    contribution: [
      'Architected a type-safe JSON → Remotion → Video pipeline where all AI outputs are structured data driving a component system that renders frame-by-frame into professional video.',
      'Built 13+ specialized AI agents via @microfox/ai-router — including a Video Agent (central orchestrator), Preset Agent (typed component registry interface), Midjourney Agent (video-optimized prompt crafting), Script Agent, Concept Generation Agent, Audio Analysis Agent, and an Autofix Agent for self-healing JSON compositions when rendering fails.',
      'Engineered 4 background Lambda workers via @microfox/ai-worker (FFprobe media analysis, Puppeteer scraper, Results aggregator, Remotion render worker) dispatched via SQS with a full job store and webhook-on-completion pattern.',
      'Implemented multi-step production workflows with chain, resume, and loop functions, including human-in-the-loop approval gates that pause execution for creative review before committing to render.',
      'Shipped a suite of browser extensions (Midjourney, Pinterest, Suno) that automate asset sourcing — programmatically submitting generation prompts, scraping outputs, running audio analysis, and piping results directly into the media pipeline.',
      'Integrated a usage tracking middleware layer capturing token counts, model costs, image generation credits, and render minutes per account for billing.',
    ],
  },
  {
    title: 'Sense Ai',
    description:
      'An AI platform for personalized learning, featuring AI-generated quizzes and dynamic learning feeds. It uses a multi-model approach (Gemini, FireGenKit) for content creation, RAG for real-time data enrichment, and a secure chatbot for an interactive experience.',
    imgSrc: '/static/images/projects/sense-ai.png',
    links: [
      {
        text: 'Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.themoondevs.sense&hl=en_IN',
      },
    ],
    badges: ['AI', 'Learning', 'Chatbot', 'React Native'],
    contribution: [
      'Engineered a multi-model AI pipeline (Gemini, FireGenKit) to generate highly personalized quizzes and learning feeds tailored to individual user progress.',
      'Utilized Pinecone vector embeddings to create a sophisticated content matching system for relevant, personalized learning materials.',
      'Developed a secure, real-time chatbot capable of learning from and adopting different custom personalities for a more engaging and interactive experience.',
      'Engineered the real-time communication layer using Socket.IO to power seamless, interactive features within the application.',
      'Implemented a custom authentication system with secure access and refresh tokens for the Expo React Native app.',
      'Managed backend infrastructure on a VPS, establishing an automated deployment workflow with distinct development, staging, and production environments.',
    ],
  },
  {
    title: 'Enterprise HR Automation & Sync',
    description:
      'A mission-critical automation infrastructure designed to synchronize employee data across disparate management platforms (Acumatica, HCSS, Payworks) for an organization of over 500 employees, migrating legacy workflows from Zapier to n8n.',
    imgSrc: '/static/images/projects/enterprise-automation.png',
    links: [],
    badges: ['n8n', 'Automation', 'Zapier Migration', 'Enterprise'],
    contribution: [
      'Migrated and optimized complex enterprise workflows from Zapier to n8n, significantly reducing operational costs while increasing flexibility.',
      'Architected a robust synchronization engine using Webhooks and Cron jobs to ensure data consistency for 500+ employees across HR, payroll, and construction management systems.',
      'Developed custom JavaScript nodes for secure payload parsing and implemented OAuth 2.0 authentication flows to handle sensitive employee data updates.',
      'Designed a resilient error handling and logging architecture to guarantee reliability for critical HR operations.',
    ],
  },
  {
    title: 'Stellary AI',
    description:
      'A decentralized application (dApp) that provides generative AI solutions for creating images, audio, and video with support for multiple models, alongside social media features for sharing the generated content.',
    imgSrc: '/static/images/projects/stellary-ai.png',
    links: [{ text: 'Live', href: 'https://app.stellaryai.com' }],
    badges: ['dApp', 'Generative AI', 'Social Media'],
    contribution: [
      'Developed AI features for image and audio generation using Model Labs APIs.',
      'Implemented real-time creation and prompt debouncing.',
      'Built scalable social media features (follow, upvotes) with an optimized database structure.',
    ],
  },
  {
    title: 'Minimatch',
    description:
      'A Web3 "spot-the-ball" game featuring dynamic contracts with randomness secured by Supra dVRF, hosting weekly competitions for over 3000 players.',
    imgSrc: '/static/images/projects/minimatch.png',
    links: [{ text: 'Live', href: 'https://minimatch.gg' }],
    badges: ['Web3', 'Gaming', 'Competition'],
    contribution: [
      'Engineered a high-performance leaderboard with dynamic points calculation and pagination using Firestore.',
      'Integrated the Coinbase SDK to enable gasless payments with a Paymaster and provide flexible authentication on the Base Chain (Web3 wallet or social OAuth).',
      'Embedded a Discord chat widget for real-time customer support.',
    ],
  },
  {
    title: 'IMVT (Media Catalog & Streaming Website)',
    description: `A media streaming app built with Next.js and TypeScript to explore and stream movies, TV shows, Live TV, and anime, featuring a UI built with Shadcn.`,
    imgSrc: '/static/images/projects/imvt.png',
    href: 'https://imvt.vercel.app/',
    links: [
      { text: 'Live', href: 'https://imvt.vercel.app/' },
      { text: 'GitHub', href: 'https://github.com/vishwaj33t/imvt' },
    ],
    badges: ['Streaming', 'Next.js', 'GraphQL'],
    contribution: [
      'Integrated over 10 APIs to fetch media data, combining their responses with custom GraphQL resolvers to ensure only necessary data is sent to the frontend.',
      'Managed frontend state using Zustand and utilized Prisma with PostgreSQL to efficiently store and retrieve data.',
      'Integrated Supabase for real-time data synchronization across clients.',
    ],
  },
  {
    title: 'Gupta Crockery: Shop Management System',
    description: `An internal shop management system built as a Progressive Web App (PWA) with an admin dashboard for inventory and order management.`,
    imgSrc: '/static/images/projects/gupta-crockery.png',
    href: 'https://gupta-crockery.vercel.app/',
    links: [
      { text: 'Live', href: 'https://gupta-crockery.vercel.app/' },
      { text: 'GitHub', href: 'https://github.com/vishwaj33t/gupta-crockery' },
    ],
    badges: ['CMS', 'PWA', 'Admin Dashboard'],
    contribution: [
      'Developed key features including an admin panel, product search with filters/sorting, a Redux-managed cart, and multilingual support via Google Translate.',
      'Optimized technical SEO to achieve a top 3 rank on Google search through structured data, meta tags, and image optimization.',
      'Ensured high performance and accessibility across all devices by implementing mobile-first design and Next.js optimizations.',
    ],
  },
  // {
  //  title: 'vishwaj33t',
  //  description: `My own digital home on the internet.`,
  //  imgSrc: '/static/images/projects/vishwaj33t.png',
  //  href: 'https://vishwaj33t.com/',
  // },
] as const

export default projectsData
