export interface TrustBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  authorAvatar?: string;
  authorRole?: string;
  views?: number;
  likes?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  count: number;
}

export interface CareerPosition {
  id: string;
  title: string;
  location: string;
  type: 'tech' | 'client';
  description: string;
  requirements: string[];
  benefits: string[];
}

export const trustBadges: TrustBadge[] = [
  {
    id: 'us-uk-managers',
    title: 'US/UK Account Managers',
    description: 'Direct communication with local account managers who understand your market',
    icon: 'globe'
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise Security',
    description: 'Bank-level security protocols and compliance standards for all projects',
    icon: 'shield-check'
  },
  {
    id: 'transparent-pricing',
    title: 'Transparent Pricing',
    description: 'Clear, upfront pricing with no hidden fees or surprise charges',
    icon: 'currency-dollar'
  },
  {
    id: 'proven-results',
    title: 'Proven Results',
    description: 'Track record of successful projects and satisfied clients worldwide',
    icon: 'chart-bar'
  }
];

export const companyValues: CompanyValue[] = [
  {
    id: 'unity',
    title: 'Unity',
    description: 'Bringing together global talent and local expertise to build solutions that make a difference.',
    icon: 'users'
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Constantly pushing boundaries — from AI integration to distributed system design.',
    icon: 'light-bulb'
  },
  {
    id: 'transparency',
    title: 'Transparency',
    description: 'Operating with honesty, clarity, and open communication at every stage.',
    icon: 'eye'
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Engineering with enterprise-grade security and reliability — every line, every layer.',
    icon: 'lock-closed'
  }
];

export const timeline: TimelineItem[] = [
  {
    year: '2024',
    title: 'Foundation & Training Launch',
    description: 'Established hybrid TaaS operations and infrastructure. Launched the Paid Training-to-Employment Program for emerging developers. Built our internal TalentOS Platform to connect mentors, trainees, and clients. Delivered full-stack and AI-driven solutions for early enterprise clients.'
  },
  {
    year: '2025',
    title: 'Growth & Integration',
    description: 'Scaled operations into FinTech, AI, and Cloud Infrastructure projects. Expanded training modules with AI automation, DevOps, and ML engineering. Initiated R&D in Healthcare Distributed AI Subnets (federated learning + blockchain). Built partnerships with universities and innovation hubs globally.'
  },
  {
    year: '2026',
    title: 'Innovation & MVP Launch',
    description: 'Release of Healthcare AI Subnet MVP — enabling secure, distributed AI model training. Introduced blockchain-based validation for transparency and compliance. Integrated trainees into R&D testing pipelines. Developed SmartOps — AI-driven team and resource allocation engine.'
  },
  {
    year: '2027',
    title: 'Scale & Globalization',
    description: 'Launch Analyzify360 Cloud Hub — a platform to manage hybrid global teams. Monetize Healthcare Subnet and expand into FinTech & EdTech. Create Innovation Fellowship Program — graduates lead internal R&D labs. Open regional innovation hubs and secure Series A investment.'
  }
];

export const blogCategories: BlogCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Latest trends in artificial intelligence and machine learning',
    color: 'from-purple-500 to-blue-600',
    icon: 'cpu',
    count: 2
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    description: 'Blockchain technology, DeFi, and smart contracts',
    color: 'from-orange-500 to-red-600',
    icon: 'shield-check',
    count: 2
  },
  {
    id: 'design',
    name: 'Design',
    description: 'UX/UI design principles and best practices',
    color: 'from-pink-500 to-purple-600',
    icon: 'lightbulb',
    count: 2
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Full-stack development and programming tutorials',
    color: 'from-emerald-500 to-teal-600',
    icon: 'code',
    count: 3
  },
  {
    id: 'industry',
    name: 'Industry Insights',
    description: 'Market trends and industry analysis',
    color: 'from-blue-500 to-cyan-600',
    icon: 'briefcase',
    count: 1
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'future-of-ai',
    title: 'The Future of AI in Enterprise Applications',
    excerpt: 'Exploring how custom LLMs are revolutionizing business processes and decision-making across industries, from automated customer service to predictive analytics.',
    author: 'Priya Sharma',
    authorAvatar: 'PS',
    authorRole: 'Lead AI Engineer',
    date: '2024-12-15',
    category: 'AI & Machine Learning',
    readTime: '8 min read',
    image: '/images/blog/ai-enterprise.jpg',
    featured: true,
    tags: ['AI', 'LLM', 'Enterprise', 'Automation'],
    views: 2847,
    likes: 156
  },
  {
    id: 'blockchain-security',
    title: 'Blockchain Security: Best Practices for Smart Contracts',
    excerpt: 'Essential security measures and audit practices for building secure DeFi protocols and smart contracts that protect user assets.',
    author: 'Sergio Alvarez',
    authorAvatar: 'SA',
    authorRole: 'Blockchain Developer',
    date: '2024-12-10',
    category: 'Blockchain',
    readTime: '6 min read',
    image: '/images/blog/blockchain-security.jpg',
    featured: true,
    tags: ['Blockchain', 'Security', 'DeFi', 'Smart Contracts'],
    views: 1932,
    likes: 89
  },
  {
    id: 'ux-conversion',
    title: 'UX Design That Converts: Psychology Meets Technology',
    excerpt: 'How understanding user psychology can dramatically improve conversion rates and user satisfaction in digital products.',
    author: 'Design Team',
    authorAvatar: 'DT',
    authorRole: 'UX Design Lead',
    date: '2024-12-05',
    category: 'Design',
    readTime: '5 min read',
    image: '/images/blog/ux-psychology.jpg',
    featured: false,
    tags: ['UX', 'Psychology', 'Conversion', 'Design'],
    views: 1567,
    likes: 73
  },
  {
    id: 'nextjs-performance',
    title: 'Next.js 14 Performance Optimization: A Deep Dive',
    excerpt: 'Advanced techniques for optimizing Next.js applications including App Router, Server Components, and streaming strategies.',
    author: 'Yuki Tanaka',
    authorAvatar: 'YT',
    authorRole: 'Fullstack Developer',
    date: '2024-11-28',
    category: 'Development',
    readTime: '12 min read',
    image: '/images/blog/nextjs-performance.jpg',
    featured: false,
    tags: ['Next.js', 'Performance', 'React', 'Web Development'],
    views: 3241,
    likes: 198
  },
  {
    id: 'cloud-architecture',
    title: 'Modern Cloud Architecture Patterns for Scalable Applications',
    excerpt: 'Exploring microservices, serverless, and container orchestration patterns for building scalable cloud-native applications.',
    author: 'Fatima Ali',
    authorAvatar: 'FA',
    authorRole: 'Cloud Architect',
    date: '2024-11-20',
    category: 'Development',
    readTime: '10 min read',
    image: '/images/blog/cloud-architecture.jpg',
    featured: false,
    tags: ['Cloud', 'Architecture', 'Microservices', 'DevOps'],
    views: 2156,
    likes: 134
  },
  {
    id: 'web3-trends-2025',
    title: 'Web3 Trends to Watch in 2025: Beyond the Hype',
    excerpt: 'A practical look at emerging Web3 technologies that will actually impact businesses, from RWA tokenization to zkEVMs.',
    author: 'Michael Thompson',
    authorAvatar: 'MT',
    authorRole: 'US Account Manager',
    date: '2024-11-15',
    category: 'Industry Insights',
    readTime: '7 min read',
    image: '/images/blog/web3-trends.jpg',
    featured: false,
    tags: ['Web3', 'Trends', 'Blockchain', '2025'],
    views: 1876,
    likes: 92
  },
  {
    id: 'ai-code-review',
    title: 'AI-Powered Code Review: Enhancing Development Workflows',
    excerpt: 'How AI tools are transforming code review processes, improving code quality, and accelerating development cycles.',
    author: 'Priya Sharma',
    authorAvatar: 'PS',
    authorRole: 'Lead AI Engineer',
    date: '2024-11-08',
    category: 'AI & Machine Learning',
    readTime: '9 min read',
    image: '/images/blog/ai-code-review.jpg',
    featured: false,
    tags: ['AI', 'Code Review', 'Development', 'Productivity'],
    views: 2687,
    likes: 147
  },
  {
    id: 'design-systems-2024',
    title: 'Building Design Systems That Scale: Lessons from Enterprise Projects',
    excerpt: 'Key principles and practical strategies for creating design systems that grow with your organization and maintain consistency.',
    author: 'Design Team',
    authorAvatar: 'DT',
    authorRole: 'UX Design Lead',
    date: '2024-10-30',
    category: 'Design',
    readTime: '11 min read',
    image: '/images/blog/design-systems.jpg',
    featured: false,
    tags: ['Design Systems', 'Enterprise', 'Scalability', 'UI'],
    views: 1823,
    likes: 105
  },
  {
    id: 'defi-protocols-guide',
    title: 'DeFi Protocol Development: From Concept to Mainnet',
    excerpt: 'A comprehensive guide to building DeFi protocols, from smart contract development to tokenomics and governance design.',
    author: 'Sergio Alvarez',
    authorAvatar: 'SA',
    authorRole: 'Blockchain Developer',
    date: '2024-10-22',
    category: 'Blockchain',
    readTime: '15 min read',
    image: '/images/blog/defi-protocols.jpg',
    featured: true,
    tags: ['DeFi', 'Protocol', 'Smart Contracts', 'Tokenomics'],
    views: 3542,
    likes: 234
  },
  {
    id: 'typescript-advanced',
    title: 'Advanced TypeScript Patterns for Large-Scale Applications',
    excerpt: 'Master advanced TypeScript patterns including conditional types, template literals, and advanced generics for enterprise development.',
    author: 'Yuki Tanaka',
    authorAvatar: 'YT',
    authorRole: 'Fullstack Developer',
    date: '2024-10-15',
    category: 'Development',
    readTime: '13 min read',
    image: '/images/blog/typescript-advanced.jpg',
    featured: false,
    tags: ['TypeScript', 'Advanced', 'Patterns', 'Enterprise'],
    views: 2945,
    likes: 189
  }
];

export const careerPositions: CareerPosition[] = [
  {
    id: 'junior-developer-us',
    title: 'Junior Developer / Intern / Graduate',
    location: 'Remote (U.S.)',
    type: 'tech',
    description: 'We pay you to learn software development while building real products for U.S. clients. No degree required.',
    requirements: [
      'U.S.-based and work authorized',
      'Clear communication and growth mindset',
      'Willingness to complete a short paid practical task (45–60 mins)',
      'Basic understanding of programming concepts preferred'
    ],
    benefits: [
      'Paid hands-on mentorship and real impact',
      'Path to Junior Developer with promotion tracks',
      'Work-life balance and remote flexibility',
      'Learn modern stacks (React/Node/Python/TypeScript)',
      'Contribute to code reviews, sprints, and updates'
    ]
  },
  {
    id: 'senior-ai-engineer',
    title: 'Senior AI Engineer',
    location: 'Remote',
    type: 'tech',
    description: 'Join our AI team to build cutting-edge machine learning solutions for enterprise clients.',
    requirements: [
      '5+ years in AI/ML development',
      'Experience with TensorFlow, PyTorch',
      'Strong Python programming skills',
      'Experience with LLMs and NLP',
      'PhD or Masters in relevant field preferred'
    ],
    benefits: [
      'Competitive salary + equity',
      'Remote-first culture',
      'Learning & development budget',
      'Top-tier equipment',
      'Flexible working hours'
    ]
  },
  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    location: 'Remote',
    type: 'tech',
    description: 'Build secure, scalable blockchain solutions and smart contracts for DeFi applications.',
    requirements: [
      '3+ years blockchain development',
      'Proficiency in Solidity and Rust',
      'Experience with DeFi protocols',
      'Smart contract security knowledge',
      'Understanding of tokenomics'
    ],
    benefits: [
      'Competitive salary + equity',
      'Remote-first culture',
      'Conference attendance',
      'Crypto bonuses',
      'Flexible working hours'
    ]
  },
  {
    id: 'us-client-manager',
    title: 'US Client Manager',
    location: 'Chicago, Austin, or San Francisco',
    type: 'client',
    description: 'Manage client relationships and ensure project success for our US market expansion.',
    requirements: [
      '3+ years client management',
      'Technical background preferred',
      'Excellent communication skills',
      'US work authorization',
      'Business development experience'
    ],
    benefits: [
      'Competitive salary + commission',
      'Health insurance',
      'Flexible working arrangements',
      'Professional development',
      'Travel opportunities'
    ]
  },
  {
    id: 'uk-client-manager',
    title: 'UK Client Manager',
    location: 'London or Manchester',
    type: 'client',
    description: 'Drive business growth and client satisfaction in the UK market.',
    requirements: [
      '3+ years client management',
      'Technical background preferred',
      'Excellent communication skills',
      'UK work authorization',
      'Business development experience'
    ],
    benefits: [
      'Competitive salary + commission',
      'Health insurance',
      'Flexible working arrangements',
      'Professional development',
      'Travel opportunities'
    ]
  }
];

export const companyInfo = {
  name: 'Analyzify360',
  tagline: 'Stronger Together, Further Forever',
  description: 'A Next-Generation Team-as-a-Service (TaaS) Software Agency',
  mission: 'To accelerate digital transformation by combining world-class technical expertise with locally empowered teams and continuous learning.',
  announcement: 'Now serving US & UK clients—ask about our launch offer.',
  email: 'contact@analyzify360.com',
  phone: '+55 84 92153‑5781',
  address: 'São Paulo, Brazil - Global Remote Team',
  social: {
    twitter: 'https://twitter.com/analyzify360',
    linkedin: 'https://linkedin.com/company/analyzify360-global',
    github: 'https://github.com/analyzify360-global',
    discord: 'https://discord.gg/pehAjnKj',
    instagram: 'https://instagram.com/analyzify360',
    youtube: 'https://youtube.com/@analyzify360',
    facebook: 'https://facebook.com/analyzify360'
  }
}; 