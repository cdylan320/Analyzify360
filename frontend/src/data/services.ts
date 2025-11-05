export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies?: string[];
  capabilities?: string[];
  features?: string[];
  focusAreas?: string[];
  category?: 'core' | 'ai' | 'training' | 'innovation' | 'managed';
}

export interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  services: Service[];
}

// Core TaaS Delivery Services
export const coreTaaSServices: Service[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description: 'Full-cycle web and mobile app development — from architecture to deployment — built by hybrid teams specialized in scalability and performance.',
    icon: 'code',
    technologies: ['React', 'Next.js', 'Node.js', 'Go', 'PostgreSQL'],
    category: 'core'
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud & Infrastructure Engineering',
    description: 'Building secure, efficient, and automated cloud ecosystems. We design infrastructure that scales with your business.',
    icon: 'cloud',
    technologies: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes'],
    category: 'core'
  },
  {
    id: 'devops-automation',
    title: 'DevOps & Automation',
    description: 'CI/CD, monitoring, and automation pipelines that reduce delivery times and ensure continuous deployment efficiency.',
    icon: 'cog',
    technologies: ['Jenkins', 'Terraform', 'GitHub Actions'],
    category: 'core'
  },
  {
    id: 'api-integration',
    title: 'API Integration & Data Systems',
    description: 'Seamless system integration and high-performance data pipelines for interoperability and analytics.',
    icon: 'link',
    technologies: ['Python', 'FastAPI', 'GraphQL', 'Redis'],
    category: 'core'
  }
];

// AI, Data & Emerging Tech Solutions
export const aiDataServices: Service[] = [
  {
    id: 'ai-ml',
    title: 'AI Integration & Machine Learning',
    description: 'Intelligent solutions that automate processes, enhance decisions, and optimize performance.',
    icon: 'chip',
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn'],
    category: 'ai'
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Predictive Insights',
    description: 'End-to-end data collection, processing, and insight generation using modern data stacks.',
    icon: 'chart-bar',
    technologies: ['Pandas', 'PowerBI', 'Airflow'],
    category: 'ai'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Solutions',
    description: 'Building secure, transparent systems with smart contracts and decentralized ledgers.',
    icon: 'shield-check',
    technologies: ['Solidity', 'Node.js', 'IPFS'],
    category: 'ai'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Compliance',
    description: 'Protecting digital assets through advanced audits, monitoring, and threat mitigation.',
    icon: 'lock-closed',
    technologies: ['OWASP', 'Cloudflare', 'Security Audits'],
    category: 'ai'
  }
];

// Training-to-Employment Program
export const trainingServices: Service[] = [
  {
    id: 'tech-talent-training',
    title: 'Tech Talent Training',
    description: 'Paid professional training for developers in AI, full-stack, and cloud technologies. Trainees work on real projects under mentorship.',
    icon: 'academic-cap',
    category: 'training'
  },
  {
    id: 'mentorship',
    title: 'Mentorship & Skill Acceleration',
    description: 'Senior engineers mentor global trainees, ensuring readiness for client and R&D teams.',
    icon: 'users',
    category: 'training'
  },
  {
    id: 'job-placement',
    title: 'Job Placement & TaaS Integration',
    description: 'Graduates are placed directly into hybrid teams across ongoing projects, ensuring immediate productivity.',
    icon: 'briefcase',
    category: 'training'
  }
];

// Innovation & R&D Services
export const innovationServices: Service[] = [
  {
    id: 'distributed-ai',
    title: 'Distributed AI Subnet Development',
    description: 'Research and MVP development of decentralized AI systems for federated healthcare and data sharing.',
    icon: 'cpu',
    focusAreas: ['Healthcare', 'Federated Learning'],
    category: 'innovation'
  },
  {
    id: 'smart-infrastructure',
    title: 'Smart Infrastructure Automation',
    description: 'R&D in AI-driven resource allocation and team optimization.',
    icon: 'cog',
    focusAreas: ['SmartOps', 'Cloud Optimization'],
    category: 'innovation'
  },
  {
    id: 'blockchain-ai',
    title: 'Blockchain-AI Convergence',
    description: 'Exploring interoperability between blockchain and AI for transparency and traceability.',
    icon: 'link',
    focusAreas: ['Distributed AI', 'Smart Contracts'],
    category: 'innovation'
  },
  {
    id: 'product-incubation',
    title: 'Product Incubation & MVP Prototyping',
    description: 'Helping clients co-develop early-stage products from concept to market validation.',
    icon: 'light-bulb',
    focusAreas: ['MVP Labs'],
    category: 'innovation'
  }
];

// Managed Partnership & Support
export const managedServices: Service[] = [
  {
    id: 'long-term-partnership',
    title: 'Long-Term Technical Partnership',
    description: 'Continuous delivery and maintenance through dedicated hybrid teams.',
    icon: 'handshake',
    category: 'managed'
  },
  {
    id: 'consulting',
    title: 'Consulting & Architecture Review',
    description: 'Strategic advisory for technical decisions, cost optimization, and system architecture.',
    icon: 'chart-bar',
    category: 'managed'
  },
  {
    id: 'post-deployment',
    title: 'Post-Deployment Support',
    description: '24/7 monitoring and iterative improvement for mission-critical systems.',
    icon: 'support',
    category: 'managed'
  }
];

// Service Categories
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'core',
    title: 'Core TaaS Delivery Services',
    tagline: 'Scalable, secure, and delivered by hybrid experts.',
    services: coreTaaSServices
  },
  {
    id: 'ai',
    title: 'AI, Data & Emerging Tech Solutions',
    tagline: 'Innovation meets reliability — powering businesses through intelligent automation.',
    services: aiDataServices
  },
  {
    id: 'training',
    title: 'Training-to-Employment Program (TaaS Talent Pipeline)',
    tagline: 'From learning to earning — building the next generation of global engineers.',
    services: trainingServices
  },
  {
    id: 'innovation',
    title: 'Innovation & R&D Services',
    tagline: 'Turning frontier research into real-world applications.',
    services: innovationServices
  },
  {
    id: 'managed',
    title: 'Managed Partnership & Support',
    tagline: 'Partnership beyond delivery — we evolve with your growth.',
    services: managedServices
  }
];

// Legacy services array for backward compatibility
export const services: Service[] = [
  ...coreTaaSServices,
  ...aiDataServices,
  ...trainingServices,
  ...innovationServices,
  ...managedServices
];

export const getServiceById = (id: string) => services.find(service => service.id === id);

export interface WorkflowStep {
  number: number;
  title: string;
  description: string;
  subtext?: string;
  icon: string;
  outcome: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    number: 1,
    title: 'Discovery & Alignment',
    description: 'Understanding your vision, business model, and technical potential.',
    subtext: 'We analyze objectives, user needs, and data to define the right product scope.',
    icon: 'search',
    outcome: 'A clear roadmap that aligns innovation with business impact.'
  },
  {
    number: 2,
    title: 'Strategy & Architecture',
    description: 'Designing scalable, secure, and future-proof system architecture.',
    subtext: 'Our teams define technical blueprints, data flows, and AI readiness from day one.',
    icon: 'chart-bar',
    outcome: 'Smart architecture ready for integration and AI enablement.'
  },
  {
    number: 3,
    title: 'Development & Collaboration',
    description: 'Hybrid TaaS teams (senior engineers + trained developers) build rapidly and iteratively.',
    subtext: 'Every sprint blends automation, AI-assisted coding, and peer mentorship.',
    icon: 'code',
    outcome: 'High-velocity development with continuous learning built in.'
  },
  {
    number: 4,
    title: 'Testing & Intelligence Assurance',
    description: 'Automated and human-in-the-loop testing to ensure quality, security, and AI behavior integrity.',
    subtext: 'We validate performance, compliance, and ethical data use.',
    icon: 'check-circle',
    outcome: 'Stable, secure, and reliable releases.'
  },
  {
    number: 5,
    title: 'Launch & Scale',
    description: 'Seamless deployment across cloud and on-prem environments with continuous monitoring.',
    subtext: 'We optimize performance and scalability post-launch using SmartOps AI.',
    icon: 'rocket',
    outcome: 'Predictable launches and adaptive scaling.'
  },
  {
    number: 6,
    title: 'Support & Evolution',
    description: 'Post-launch, we provide maintenance, monitoring, and growth optimization.',
    subtext: 'Insights from real use feed back into training programs and product updates.',
    icon: 'support',
    outcome: 'Continuous evolution through feedback and innovation.'
  }
];
