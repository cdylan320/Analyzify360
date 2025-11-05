import React from "react";
import {
  UserIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  CpuChipIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  EyeIcon,
  LockClosedIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowRightIcon,
  Bars3Icon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  HeartIcon,
  BriefcaseIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Import Lucide icons for better social media support
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  MessageCircle, // Discord alternative
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  User,
  Users,
  Search,
  Code,
  Zap,
  Shield,
  DollarSign,
  BarChart,
  Eye,
  Lock,
  CheckCircle,
  X,
  ArrowRight,
  Menu,
  Heart,
  Briefcase,
  Globe,
  Lightbulb,
  Cpu,
  Monitor,
  Star,
  Cloud,
  Settings,
  Handshake,
  GraduationCap,
  HelpCircle,
  Sparkles,
  Wallet,
} from "lucide-react";

const iconMap = {
  // Heroicons (keeping for compatibility)
  users: UserIcon,
  search: MagnifyingGlassIcon,
  link: LinkIcon,
  chip: CpuChipIcon,
  "desktop-computer": ComputerDesktopIcon,
  "light-bulb": LightBulbIcon,
  globe: GlobeAltIcon,
  "shield-check": ShieldCheckIcon,
  "currency-dollar": CurrencyDollarIcon,
  "chart-bar": ChartBarIcon,
  eye: EyeIcon,
  "lock-closed": LockClosedIcon,
  code: CodeBracketIcon,
  "check-circle": CheckCircleIcon,
  "x-mark": XMarkIcon,
  "arrow-right": ArrowRightIcon,
  menu: Bars3Icon,
  phone: PhoneIcon,
  envelope: EnvelopeIcon,
  "map-pin": MapPinIcon,
  mail: EnvelopeIcon,
  location: MapPinIcon,
  heart: HeartIcon,
  briefcase: BriefcaseIcon,
  clock: ClockIcon,

  // Lucide icons (better quality and more options)
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  discord: MessageCircle,
  "external-link": ExternalLink,

  // Alternative names for better consistency
  user: User,
  "users-alt": Users,
  "search-alt": Search,
  "code-alt": Code,
  zap: Zap,
  shield: Shield,
  dollar: DollarSign,
  "bar-chart": BarChart,
  "eye-alt": Eye,
  lock: Lock,
  check: CheckCircle,
  close: X,
  arrow: ArrowRight,
  "menu-alt": Menu,
  "heart-alt": Heart,
  "briefcase-alt": Briefcase,
  "globe-alt": Globe,
  lightbulb: Lightbulb,
  cpu: Cpu,
  monitor: Monitor,
  "mail-alt": Mail,
  "phone-alt": Phone,
  map: MapPin,
  calendar: Calendar,
  "clock-alt": Clock,

  // Missing icons - using proper Lucide icons
  rocket: Zap, // Using Zap as rocket alternative
  support: HelpCircle, // Using HelpCircle as support icon
  chat: MessageCircle, // Chat/messaging icon
  star: Star, // Star icon
  cloud: Cloud, // Cloud icon
  cog: Settings, // Settings/Cog icon
  "academic-cap": GraduationCap, // Graduation cap icon
  handshake: Handshake, // Handshake icon
  sparkles: Sparkles, // Sparkles icon
  wallet: Wallet, // Wallet icon
};

export interface IconProps {
  name: keyof typeof iconMap;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  className = "",
  strokeWidth = 2,
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
    "2xl": "h-16 w-16",
  };

  // Check if it's a Lucide icon (has strokeWidth prop)
  const isLucideIcon = [
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Youtube,
    Facebook,
    MessageCircle,
    ExternalLink,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    User,
    Users,
    Search,
    Code,
    Zap,
    Shield,
    DollarSign,
    BarChart,
    Eye,
    Lock,
    CheckCircle,
    X,
    ArrowRight,
    Menu,
    Heart,
    Briefcase,
    Globe,
    Lightbulb,
    Cpu,
    Monitor,
    Star,
    Cloud,
    Settings,
    Handshake,
    GraduationCap,
    HelpCircle,
    Sparkles,
    Wallet,
  ].includes(IconComponent as any);

  if (isLucideIcon) {
    return (
      <IconComponent
        className={`${sizeClasses[size]} ${className}`}
        strokeWidth={strokeWidth}
      />
    );
  }

  // Heroicons don't support strokeWidth
  return <IconComponent className={`${sizeClasses[size]} ${className}`} />;
};

export default Icon;
