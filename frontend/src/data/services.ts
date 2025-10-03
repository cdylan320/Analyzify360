export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  features: string[];
}

export const services: Service[] = [
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    description: 'Smarter automation, proven impact',
    icon: 'chip',
    capabilities: [
      'Custom Large Language Models (LLMs)',
      'Natural Language Processing (NLP)',
      'Computer Vision & Image Recognition',
      'Generative AI Solutions',
      'Predictive Analytics',
      'Automated Decision Systems'
    ],
    features: [
      'End-to-end AI development',
      'Model training and optimization',
      'Real-time inference systems',
      'AI ethics and bias mitigation',
      'Scalable ML infrastructure',
      'Custom AI integrations'
    ]
  },
  {
    id: 'blockchain',
    title: 'Blockchain & DeFi',
    description: 'Secure, scalable DeFi solutions',
    icon: 'link',
    capabilities: [
      'Smart Contract Development',
      'Security Audits & Testing',
      'Cross-chain Integration',
      'ZetaChain Expertise',
      'DeFi Protocol Design',
      'Tokenomics & Governance'
    ],
    features: [
      'Solidity & Rust development',
      'Multi-chain compatibility',
      'Gas optimization',
      'Automated testing suites',
      'Decentralized applications',
      'Yield farming protocols'
    ]
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description: 'Seamless frontend-backend integration',
    icon: 'desktop-computer',
    capabilities: [
      'React & Next.js Applications',
      'Node.js Backend Services',
      'RESTful & GraphQL APIs',
      'Database Design & Optimization',
      'Cloud Infrastructure',
      'Real-time Applications'
    ],
    features: [
      'Modern web frameworks',
      'Responsive design',
      'Performance optimization',
      'API development',
      'Database management',
      'CI/CD pipelines'
    ]
  },
  {
    id: 'design',
    title: 'Product Design & UX',
    description: 'User experiences that convert',
    icon: 'light-bulb',
    capabilities: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'UI Design Systems',
      'Usability Testing',
      'Brand Identity Design',
      'Conversion Optimization'
    ],
    features: [
      'Design thinking process',
      'User journey mapping',
      'Interactive prototypes',
      'Accessibility compliance',
      'Mobile-first design',
      'A/B testing strategies'
    ]
  }
];

export const getServiceById = (id: string) => services.find(service => service.id === id);

export const workflowSteps = [
  {
    number: 1,
    title: 'Discovery',
    description: 'Understanding your vision and requirements',
    icon: 'search'
  },
  {
    number: 2,
    title: 'Strategy',
    description: 'Crafting the perfect technical approach',
    icon: 'chart-bar'
  },
  {
    number: 3,
    title: 'Development',
    description: 'Building with precision and expertise',
    icon: 'code'
  },
  {
    number: 4,
    title: 'Testing',
    description: 'Ensuring quality and performance',
    icon: 'check-circle'
  },
  {
    number: 5,
    title: 'Launch',
    description: 'Deploying and monitoring success',
    icon: 'rocket'
  },
  {
    number: 6,
    title: 'Support',
    description: 'Ongoing maintenance and optimization',
    icon: 'support'
  }
]; 