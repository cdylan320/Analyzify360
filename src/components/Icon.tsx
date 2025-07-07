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

const iconMap = {
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
  linkedin: LinkIcon,
  twitter: LinkIcon,
  github: LinkIcon,
  instagram: LinkIcon,
  briefcase: BriefcaseIcon,
  clock: ClockIcon,
};

export interface IconProps {
  name: keyof typeof iconMap;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = "md", className = "" }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return <IconComponent className={`${sizeClasses[size]} ${className}`} />;
};

export default Icon;
