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
    year: '2024',
    title: 'Founded',
    description: 'Super2025 was founded with a vision to bridge global tech expertise with local trust'
  },
  {
    year: '2024',
    title: 'First UK Client',
    description: 'Successfully launched our first major project for a UK fintech company'
  },
  {
    year: '2024',
    title: 'US Expansion',
    description: 'Opened US operations with dedicated account managers in Chicago, Austin, and San Francisco'
  },
  {
    year: '2024',
    title: 'AI Specialization',
    description: 'Launched specialized AI and machine learning division with custom LLM capabilities'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'future-of-ai',
    title: 'The Future of AI in Enterprise Applications',
    excerpt: 'Exploring how custom LLMs are revolutionizing business processes and decision-making across industries.',
    author: 'Priya Sharma',
    date: '2024-12-15',
    category: 'AI & Machine Learning',
    readTime: '8 min read'
  },
  {
    id: 'blockchain-security',
    title: 'Blockchain Security: Best Practices for Smart Contracts',
    excerpt: 'Essential security measures and audit practices for building secure DeFi protocols and smart contracts.',
    author: 'Sergio Alvarez',
    date: '2024-12-10',
    category: 'Blockchain',
    readTime: '6 min read'
  },
  {
    id: 'ux-conversion',
    title: 'UX Design That Converts: Psychology Meets Technology',
    excerpt: 'How understanding user psychology can dramatically improve conversion rates and user satisfaction.',
    author: 'Design Team',
    date: '2024-12-05',
    category: 'Design',
    readTime: '5 min read'
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
  name: 'Super2025',
  tagline: 'Where GLOBAL TECH EXPERTISE meets LOCAL TRUST',
  description: 'Super2025 unites top engineers and US/UK partners to deliver secure, seamless digital solutions.',
  mission: 'To bridge the gap between global technical excellence and local business understanding, creating technology solutions that drive real business value.',
  announcement: 'Now serving US & UK clients—ask about our launch offer.',
  email: 'hello@super2025.com',
  phone: '+1 (555) 123-4567',
  address: 'Global Remote Team with Local Presence',
  social: {
    twitter: 'https://twitter.com/super2025',
    linkedin: 'https://linkedin.com/company/super2025',
    github: 'https://github.com/super2025',
    discord: 'https://discord.gg/super2025',
    instagram: 'https://instagram.com/super2025',
    youtube: 'https://youtube.com/@super2025',
    facebook: 'https://facebook.com/super2025'
  }
}; 