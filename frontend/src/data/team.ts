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
  avatar?: string; // Keep for fallback initials
  photo?: string; // New field for profile photos
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
    photo: '/images/team/priya-sharma.jpg', // Add your team photos to public/images/team/
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
    photo: '/images/team/sergio-alvarez.jpg',
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
    photo: '/images/team/yuki-tanaka.jpg',
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
    photo: '/images/team/fatima-ali.jpg',
    experience: '7+ years',
    projects: 11,
    social: {
      // linkedin: 'https://linkedin.com/in/fatima-ali-cloud',
      // github: 'https://github.com/fatima-cloud',
      // twitter: 'https://twitter.com/fatima_devops',
      // email: 'fatima@analyzify360.com'
    }
  },
  {
    id: 'alex-rodriguez',
    name: 'Alex Rodriguez',
    title: 'Senior Backend Engineer',
    role: 'tech',
    skills: ['Go', 'PostgreSQL', 'Redis', 'Microservices', 'Docker'],
    bio: 'Backend systems architect with expertise in high-performance APIs and distributed systems. Passionate about clean code and scalable architecture.',
    avatar: 'AR',
    photo: '/images/team/alex-rodriguez.jpg',
    experience: '6+ years',
    projects: 32,
    quote: 'Great software is built on solid foundations and clean architecture.',
    social: {
      // linkedin: 'https://linkedin.com/in/alex-rodriguez-backend',
      // github: 'https://github.com/alex-backend',
      // twitter: 'https://twitter.com/alex_gopher',
      // email: 'alex@super2025.com'
    }
  },
  {
    id: 'sophia-chen',
    name: 'Sophia Chen',
    title: 'Frontend Developer',
    role: 'tech',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    bio: 'Frontend specialist crafting beautiful, responsive user interfaces with modern frameworks. Expert in performance optimization and user experience.',
    avatar: 'SC',
    photo: '/images/team/sophia-chen.jpg',
    experience: '4+ years',
    projects: 28,
    quote: 'Every pixel matters when creating exceptional user experiences.',
    social: {
      // linkedin: 'https://linkedin.com/in/sophia-chen-frontend',
      // github: 'https://github.com/sophia-ui',
      // twitter: 'https://twitter.com/sophia_react',
      // email: 'sophia@super2025.com'
    }
  },
  {
    id: 'marcus-johnson',
    name: 'Marcus Johnson',
    title: 'DevOps Engineer',
    role: 'tech',
    skills: ['Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Monitoring'],
    bio: 'DevOps engineer focused on automation, CI/CD pipelines, and infrastructure as code. Ensuring reliable deployments and system monitoring.',
    avatar: 'MJ',
    photo: '/images/team/marcus-johnson.jpg',
    experience: '5+ years',
    projects: 24,
    quote: 'Automation is the key to reliable and scalable systems.',
    social: {
      // linkedin: 'https://linkedin.com/in/marcus-johnson-devops',
      // github: 'https://github.com/marcus-ops',
      // twitter: 'https://twitter.com/marcus_k8s',
      // email: 'marcus@super2025.com'
    }
  },
  // {
  //   id: 'matheus-da-silva',
  //   name: 'Matheus da Silva',
  //   title: 'Mobile Developer',
  //   role: 'tech',
  //   skills: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Mobile UI/UX'],
  //   bio: 'Mobile development expert creating native and cross-platform applications. Specialized in performance optimization and intuitive mobile experiences.',
  //   avatar: 'LK',
  //   photo: '/images/team/matheus-da-silva.jpg',
  //   experience: '4+ years',
  //   projects: 19,
  //   quote: 'Mobile-first thinking creates better experiences for everyone.',
  //   social: {
  //     // linkedin: 'https://linkedin.com/in/luna-kim-mobile',
  //     // github: 'https://github.com/luna-mobile',
  //     // twitter: 'https://twitter.com/luna_native',
  //     // email: 'luna@super2025.com'
  //   }
  // },
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
    photo: '/images/team/michael-thompson.jpg',
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
    photo: '/images/team/jessica-carter.jpg',
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
    photo: '/images/team/brandon-thompson.jpg',
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
    photo: '/images/team/david-wright.jpg',
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
    photo: '/images/team/rachel-evans.jpg',
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