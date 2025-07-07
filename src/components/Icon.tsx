import React from "react";
import {
  CpuChipIcon,
  LinkIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UsersIcon,
  EyeIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  chip: CpuChipIcon,
  link: LinkIcon,
  "desktop-computer": ComputerDesktopIcon,
  "light-bulb": LightBulbIcon,
  globe: GlobeAltIcon,
  "shield-check": ShieldCheckIcon,
  "currency-dollar": CurrencyDollarIcon,
  "chart-bar": ChartBarIcon,
  users: UsersIcon,
  eye: EyeIcon,
  "lock-closed": LockClosedIcon,
  search: MagnifyingGlassIcon,
  code: CodeBracketIcon,
  "check-circle": CheckCircleIcon,
  rocket: RocketLaunchIcon,
  menu: Bars3Icon,
  close: XMarkIcon,
  "arrow-right": ArrowRightIcon,
  envelope: EnvelopeIcon,
  phone: PhoneIcon,
  "map-pin": MapPinIcon,
  support: WrenchScrewdriverIcon,
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
