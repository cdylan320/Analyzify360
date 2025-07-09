export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: 'tech' | 'client';
  location?: string;
  country?: string;
  flag?: string;
  skills?: string[];
  bio: string;
  quote?: string;
  avatar?: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
  experience?: string;
  projects?: number;
}

export const teamMembers: TeamMember[] = [
  // Tech Team
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    title: 'Lead AI Engineer',
    role: 'tech',
    skills: ['Python', 'TensorFlow', 'Llama 3', 'NLP', 'Computer Vision'],
    bio: 'Leading AI innovation with 8+ years in machine learning and deep learning. Specialized in custom LLMs and generative AI solutions.',
    avatar: 'PS',
    experience: '8+ years',
    projects: 25,
    social: {
      // linkedin: 'https://linkedin.com/in/priya-sharma-ai',
      // github: 'https://github.com/priya-ai',
      // twitter: 'https://twitter.com/priya_ai_dev',
      // email: 'priya@analyzify360.com'
    }
  },
  {
    id: 'sergio-alvarez',
    name: 'Sergio Alvarez',
    title: 'Blockchain Developer',
    role: 'tech',
    skills: ['Solidity', 'Rust', 'ZetaChain', 'Smart Contracts', 'DeFi'],
    bio: 'Blockchain architect with expertise in cross-chain solutions and DeFi protocols. Security-first approach to smart contract development.',
    avatar: 'SA',
    experience: '6+ years',
    projects: 17,
    social: {
      // linkedin: 'https://linkedin.com/in/sergio-alvarez-blockchain',
      // github: 'https://github.com/sergio-blockchain',
      // twitter: 'https://twitter.com/sergio_defi',
      // email: 'sergio@analyzify360.com'
    }
  },
  {
    id: 'yuki-tanaka',
    name: 'Yuki Tanaka',
    title: 'Fullstack Developer',
    role: 'tech',
    skills: ['Node.js', 'React', 'AWS', 'TypeScript', 'GraphQL'],
    bio: 'Full-stack engineer creating seamless user experiences with modern web technologies and cloud infrastructure.',
    avatar: 'YT',
    experience: '5+ years',
    projects: 20,
    social: {
      // linkedin: 'https://linkedin.com/in/yuki-tanaka-fullstack',
      // github: 'https://github.com/yuki-dev',
      // twitter: 'https://twitter.com/yuki_fullstack',
      // email: 'yuki@analyzify360.com'
    }
  },
  {
    id: 'fatima-ali',
    name: 'Fatima Ali',
    title: 'Cloud Architect',
    role: 'tech',
    skills: ['GCP', 'AWS', 'Docker', 'Kubernetes', 'DevOps'],
    bio: 'Cloud infrastructure specialist ensuring scalable, secure, and efficient deployments across multiple cloud platforms.',
    avatar: 'FA',
    experience: '7+ years',
    projects: 11,
    social: {
      // linkedin: 'https://linkedin.com/in/fatima-ali-cloud',
      // github: 'https://github.com/fatima-cloud',
      // twitter: 'https://twitter.com/fatima_devops',
      // email: 'fatima@analyzify360.com'
    }
  },
  // US/UK Client Team
  {
    id: 'michael-thompson',
    name: 'Michael Thompson',
    title: 'US Account Manager',
    role: 'client',
    location: 'Chicago',
    country: 'US',
    flag: '🇺🇸',
    bio: 'Dedicated to understanding your business needs and ensuring project success.',
    quote: 'Your success is our mission. We\'re here to make technology work for you.',
    avatar: 'MT',
    experience: '5+ years',
    projects: 22,
    social: {
      // linkedin: 'https://linkedin.com/in/michael-thompson-chicago',
      // twitter: 'https://twitter.com/michael_super25',
      // email: 'michael@analyzify360.com'
    }
  },
  {
    id: 'jessica-carter',
    name: 'Jessica Carter',
    title: 'Client Success Lead',
    role: 'client',
    location: 'Austin',
    country: 'US',
    flag: '🇺🇸',
    bio: 'Ensuring every client relationship thrives through clear communication and exceptional service.',
    quote: 'Building lasting partnerships through trust and transparency.',
    avatar: 'JC',
    experience: '4+ years',
    projects: 18,
    social: {
      // linkedin: 'https://linkedin.com/in/jessica-carter-austin',
      // twitter: 'https://twitter.com/jessica_success',
      // email: 'jessica@analyzify360.com'
    }
  },
  {
    id: 'brandon-thompson',
    name: 'Brandon Thompson',
    title: 'US Partner',
    role: 'client',
    location: 'San Francisco',
    country: 'US',
    flag: '🇺🇸',
    bio: 'Strategic partner focused on scaling innovative solutions for US market growth.',
    quote: 'Innovation meets execution - that\'s where we excel.',
    avatar: 'BL',
    experience: '1+ years',
    projects: 4,
    social: {
      // linkedin: 'https://linkedin.com/in/brandon-lee-sf',
      // twitter: 'https://twitter.com/brandon_partner',
      // email: 'brandon@analyzify360.com'
    }
  },
  {
    id: 'david-wright',
    name: 'David Wright',
    title: 'US Partner',
    role: 'client',
    location: 'New York',
    country: 'US',
    flag: 'US',
    bio: 'Bridging global expertise with local understanding for US businesses.',
    quote: 'Bringing world-class tech solutions to the US market.',
    avatar: 'DW',
    experience: '3+ years',
    projects: 13,
    social: {
      // linkedin: 'https://linkedin.com/in/david-wright-london',
      // twitter: 'https://twitter.com/david_uk_tech',
      // email: 'david@analyzify360.com'
    }
  },
  {
    id: 'rachel-evans',
    name: 'Rachel Evans',
    title: 'US Partner',
    role: 'client',
    location: 'Miami',
    country: 'US',
    flag: 'US',
    bio: 'Partnering with UK businesses to drive digital transformation and growth.',
    quote: 'Your vision, our expertise - together we build the future.',
    avatar: 'RE',
    experience: '3+ years',
    projects: 18,
    social: {
      // linkedin: 'https://linkedin.com/in/rachel-evans-manchester',
      // twitter: 'https://twitter.com/rachel_uk_partner',
      // email: 'rachel@analyzify360.com'
    }
  }
];

export const getTechTeam = () => teamMembers.filter(member => member.role === 'tech');
export const getClientTeam = () => teamMembers.filter(member => member.role === 'client');
export const getUSTeam = () => teamMembers.filter(member => member.country === 'US');
export const getUKTeam = () => teamMembers.filter(member => member.country === 'UK'); 