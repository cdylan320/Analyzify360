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
    description: 'Bringing together global talent and local expertise to serve our clients better',
    icon: 'users'
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Pushing the boundaries of technology to create solutions that matter',
    icon: 'light-bulb'
  },
  {
    id: 'transparency',
    title: 'Transparency',
    description: 'Open communication, honest pricing, and clear project timelines',
    icon: 'eye'
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Enterprise-grade security in every line of code and every deployment',
    icon: 'lock-closed'
  }
];

export const timeline: TimelineItem[] = [
  {
    year: '2018',
    title: 'Company Founded',
    description: 'Analyzify360 was established with a vision to bridge global tech expertise with local trust, starting as a boutique development agency'
  },
  {
    year: '2019',
    title: 'Team Expansion',
    description: 'Grew from 3 to 15 talented developers and established our core development methodologies and quality standards'
  },
  {
    year: '2020',
    title: 'Remote-First Transition',
    description: 'Successfully transitioned to a fully remote-first culture, enabling us to tap into global talent while maintaining exceptional quality'
  },
  {
    year: '2021',
    title: 'First Major Enterprise Client',
    description: 'Secured our first Fortune 500 client and launched our enterprise-grade security protocols and compliance standards'
  },
  {
    year: '2022',
    title: 'International Expansion',
    description: 'Opened operations in the UK and established dedicated account management teams for better client communication'
  },
  {
    year: '2023',
    title: 'US Market Entry',
    description: 'Launched US operations with local account managers in Chicago, Austin, and San Francisco to serve the American market'
  },
  {
    year: '2024',
    title: 'AI & Innovation Hub',
    description: 'Established our specialized AI and machine learning division with custom LLM capabilities and cutting-edge blockchain solutions'
  }
];

export const blogCategories: BlogCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Latest trends in artificial intelligence and machine learning',
    color: 'from-purple-500 to-blue-600',
    icon: 'cpu',
    count: 5
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    description: 'Blockchain technology, DeFi, and smart contracts',
    color: 'from-orange-500 to-red-600',
    icon: 'shield-check',
    count: 4
  },
  {
    id: 'design',
    name: 'Design',
    description: 'UX/UI design principles and best practices',
    color: 'from-pink-500 to-purple-600',
    icon: 'lightbulb',
    count: 3
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Full-stack development and programming tutorials',
    color: 'from-emerald-500 to-teal-600',
    icon: 'code',
    count: 6
  },
  {
    id: 'industry',
    name: 'Industry Insights',
    description: 'Market trends and industry analysis',
    color: 'from-blue-500 to-cyan-600',
    icon: 'briefcase',
    count: 3
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
  description: 'Analyzify360 unites top engineers and US partners to deliver secure, seamless digital solutions.',
  mission: 'To bridge the gap between global technical excellence and local business understanding, creating technology solutions that drive real business value.',
  announcement: 'Now serving US & UK clients—ask about our launch offer.',
  email: 'jam.joyce320@gmail.com',
  phone: '+1 (555) 123-4567',
  address: 'Global Remote Team with Local Presence',
  social: {
    twitter: 'https://twitter.com/analyzify360',
    linkedin: 'https://linkedin.com/company/analyzify360',
    github: 'https://github.com/analyzify360',
    discord: 'https://discord.gg/analyzify360',
    instagram: 'https://instagram.com/analyzify360',
    youtube: 'https://youtube.com/@analyzify360',
    facebook: 'https://facebook.com/analyzify360'
  }
}; 