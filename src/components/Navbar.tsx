"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import Icon from "./Icon";
import { companyInfo } from "@/data/content";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-black/95 via-slate-900/95 to-black/95 backdrop-blur-xl shadow-2xl border-b border-yellow-400/30"
          : "bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-white/30">
              <span className="text-black font-black text-xl drop-shadow-lg">
                S
              </span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
              Super
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg hover:drop-shadow-lg"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg hover:drop-shadow-lg"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg hover:drop-shadow-lg"
            >
              About
            </Link>
            <Link
              href="/team"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg hover:drop-shadow-lg"
            >
              Team
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg hover:drop-shadow-lg"
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/careers">
              <Button
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Careers
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-black font-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-yellow-300 transition-colors duration-300 p-2 rounded-lg bg-gradient-to-r from-yellow-400/20 to-purple-600/20 hover:from-yellow-400/30 hover:to-purple-600/30 border border-yellow-400/30"
            >
              <Icon name={isOpen ? "close" : "menu"} size="lg" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-b from-black/95 via-slate-900/95 to-black/95 backdrop-blur-xl border-b border-yellow-400/30 shadow-2xl">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg py-2 hover:drop-shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg py-2 hover:drop-shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="block text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg py-2 hover:drop-shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/team"
                className="block text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg py-2 hover:drop-shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/contact"
                className="block text-white hover:text-yellow-300 transition-colors duration-300 font-bold text-lg py-2 hover:drop-shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 space-y-3 border-t border-yellow-400/30">
                <Link href="/careers" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold shadow-lg"
                  >
                    Careers
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-black font-black shadow-lg border-2 border-white/30">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
