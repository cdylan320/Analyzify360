"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import Icon from "./Icon";
import { companyInfo } from "@/data/content";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-section">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-primary font-bold text-xl">
              {companyInfo.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-primary hover:text-accent transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="primary"
              size="md"
              pill
              rightIcon={<Icon name="arrow-right" size="sm" />}
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-section transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} size="md" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-section bg-white">
          <div className="px-8 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-primary hover:text-accent transition-colors duration-200 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                fullWidth
                pill
                rightIcon={<Icon name="arrow-right" size="sm" />}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
