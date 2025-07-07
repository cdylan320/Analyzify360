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
    avatar: 'PS'
  },
  {
    id: 'sergio-alvarez',
    name: 'Sergio Alvarez',
    title: 'Blockchain Developer',
    role: 'tech',
    skills: ['Solidity', 'Rust', 'ZetaChain', 'Smart Contracts', 'DeFi'],
    bio: 'Blockchain architect with expertise in cross-chain solutions and DeFi protocols. Security-first approach to smart contract development.',
    avatar: 'SA'
  },
  {
    id: 'yuki-tanaka',
    name: 'Yuki Tanaka',
    title: 'Fullstack Developer',
    role: 'tech',
    skills: ['Node.js', 'React', 'AWS', 'TypeScript', 'GraphQL'],
    bio: 'Full-stack engineer creating seamless user experiences with modern web technologies and cloud infrastructure.',
    avatar: 'YT'
  },
  {
    id: 'fatima-ali',
    name: 'Fatima Ali',
    title: 'Cloud Architect',
    role: 'tech',
    skills: ['GCP', 'AWS', 'Docker', 'Kubernetes', 'DevOps'],
    bio: 'Cloud infrastructure specialist ensuring scalable, secure, and efficient deployments across multiple cloud platforms.',
    avatar: 'FA'
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
    avatar: 'MT'
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
    avatar: 'JC'
  },
  {
    id: 'brandon-lee',
    name: 'Brandon Lee',
    title: 'US Partner',
    role: 'client',
    location: 'San Francisco',
    country: 'US',
    flag: '🇺🇸',
    bio: 'Strategic partner focused on scaling innovative solutions for US market growth.',
    quote: 'Innovation meets execution - that\'s where we excel.',
    avatar: 'BL'
  },
  {
    id: 'david-wright',
    name: 'David Wright',
    title: 'UK Account Manager',
    role: 'client',
    location: 'London',
    country: 'UK',
    flag: '🇬🇧',
    bio: 'Bridging global expertise with local understanding for UK businesses.',
    quote: 'Bringing world-class tech solutions to the UK market.',
    avatar: 'DW'
  },
  {
    id: 'rachel-evans',
    name: 'Rachel Evans',
    title: 'UK Partner',
    role: 'client',
    location: 'Manchester',
    country: 'UK',
    flag: '🇬🇧',
    bio: 'Partnering with UK businesses to drive digital transformation and growth.',
    quote: 'Your vision, our expertise - together we build the future.',
    avatar: 'RE'
  }
];

export const getTechTeam = () => teamMembers.filter(member => member.role === 'tech');
export const getClientTeam = () => teamMembers.filter(member => member.role === 'client');
export const getUSTeam = () => teamMembers.filter(member => member.country === 'US');
export const getUKTeam = () => teamMembers.filter(member => member.country === 'UK'); 