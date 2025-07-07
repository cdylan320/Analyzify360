import React from "react";
import Link from "next/link";
import Icon from "./Icon";
import { companyInfo } from "@/data/content";

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Twitter", href: companyInfo.social.twitter, icon: "🐦" },
    { name: "LinkedIn", href: companyInfo.social.linkedin, icon: "💼" },
    { name: "GitHub", href: companyInfo.social.github, icon: "🐱" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-screen-xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl">{companyInfo.name}</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="envelope" size="sm" className="text-accent" />
                <span className="text-gray-300">{companyInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="phone" size="sm" className="text-accent" />
                <span className="text-gray-300">{companyInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="map-pin" size="sm" className="text-accent" />
                <span className="text-gray-300">{companyInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              <p className="text-gray-300 text-sm">
                Your trust is our priority.
              </p>
              <p className="text-gray-400 text-sm">
                © 2024 {companyInfo.name}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
