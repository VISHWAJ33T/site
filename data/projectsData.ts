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
  //   title: 'vishwaj33t',
  //   description: `My own digital home on the internet.`,
  //   imgSrc: '/static/images/projects/vishwaj33t.png',
  //   href: 'https://vishwaj33t.com/',
  // },
] as const

export default projectsData
