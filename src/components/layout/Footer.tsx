import React from "react";
import Link from "next/link";
import { Icon } from "../ui";
import { companyInfo } from "@/data/content";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="w-[95%] mx-auto px-4 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Company Info & Contact - 4 columns */}
            <div className="lg:col-span-4 space-y-8">
              {/* Company Branding */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <Icon name="code" size="lg" className="text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      {companyInfo.name}
                    </h3>
                    <p className="text-blue-400 text-sm font-medium">
                      Digital Innovation Partner
                    </p>
                  </div>
                </div>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-full"></div>

                <p className="text-slate-300 leading-relaxed text-base max-w-sm">
                  {companyInfo.description}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-white mb-4">
                  Get In Touch
                </h4>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="group flex items-center space-x-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all">
                      <Icon name="mail" size="md" className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                        Email Us
                      </p>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-white font-medium hover:text-blue-400 transition-colors"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group flex items-center space-x-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                      <Icon name="phone" size="md" className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                        Call Us
                      </p>
                      <a
                        href={`tel:${companyInfo.phone}`}
                        className="text-white font-medium hover:text-cyan-400 transition-colors"
                      >
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="group flex items-center space-x-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/50 hover:border-blue-600/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-600/25 transition-all">
                      <Icon name="linkedin" size="md" className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                        Connect
                      </p>
                      <a
                        href={companyInfo.social?.linkedin || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium hover:text-blue-400 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-lg font-bold text-white mb-6 pb-3 border-b border-slate-700/50">
                Quick Links
              </h4>
              <nav className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Services", href: "/services" },
                  { name: "Portfolio", href: "/portfolio" },
                  { name: "Case Studies", href: "/case-studies" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center space-x-2 text-slate-300 hover:text-blue-400 transition-all duration-300 font-medium"
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-lg font-bold text-white mb-6 pb-3 border-b border-slate-700/50">
                Our Services
              </h4>
              <nav className="space-y-3">
                {[
                  { name: "Web Development", href: "/services/web" },
                  { name: "Mobile Apps", href: "/services/mobile" },
                  { name: "Cloud Solutions", href: "/services/cloud" },
                  { name: "AI Integration", href: "/services/ai" },
                  { name: "DevOps", href: "/services/devops" },
                  { name: "Consulting", href: "/services/consulting" },
                ].map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="group flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-all duration-300 font-medium"
                  >
                    <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Google Maps & Location - 4 columns */}
            <div className="lg:col-span-4 space-y-6">
              <h4 className="text-lg font-bold text-white mb-6 pb-3 border-b border-slate-700/50">
                Visit Our Office
              </h4>

              {/* Address */}
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg mt-1">
                  <Icon name="location" size="md" className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">
                    Our Location
                  </p>
                  <p className="text-white font-medium leading-relaxed">
                    {companyInfo.address}
                  </p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                <div className="aspect-video bg-slate-800/50 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.00425878459418!3d40.74844097932764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959229142!5m2!1sen!2sus"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h5 className="text-white font-semibold">Follow Us</h5>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    {
                      name: "LinkedIn",
                      icon: "linkedin",
                      href: companyInfo.social?.linkedin || "#",
                      color: "from-blue-600 to-blue-700",
                    },
                    {
                      name: "Twitter",
                      icon: "twitter",
                      href: companyInfo.social?.twitter || "#",
                      color: "from-sky-500 to-sky-600",
                    },
                    {
                      name: "GitHub",
                      icon: "github",
                      href: companyInfo.social?.github || "#",
                      color: "from-gray-700 to-gray-800",
                    },
                    {
                      name: "Discord",
                      icon: "discord",
                      href: companyInfo.social?.discord || "#",
                      color: "from-indigo-500 to-purple-600",
                    },
                    {
                      name: "Instagram",
                      icon: "instagram",
                      href: companyInfo.social?.instagram || "#",
                      color: "from-pink-500 to-purple-600",
                    },
                    {
                      name: "YouTube",
                      icon: "youtube",
                      href: companyInfo.social?.youtube || "#",
                      color: "from-red-500 to-red-600",
                    },
                    {
                      name: "Facebook",
                      icon: "facebook",
                      href: companyInfo.social?.facebook || "#",
                      color: "from-blue-500 to-blue-600",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group`}
                      aria-label={social.name}
                    >
                      <Icon
                        name={social.icon as any}
                        size="md"
                        className="group-hover:scale-110 transition-transform"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
          <div className="w-[95%] mx-auto px-4 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-8">
                <p className="text-slate-400 text-sm font-medium">
                  © {new Date().getFullYear()} {companyInfo.name}. All rights
                  reserved.
                </p>
                <div className="flex space-x-6">
                  <Link
                    href="/privacy"
                    className="text-slate-400 hover:text-white text-sm transition-colors font-medium"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-slate-400 hover:text-white text-sm transition-colors font-medium"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/cookies"
                    className="text-slate-400 hover:text-white text-sm transition-colors font-medium"
                  >
                    Cookie Policy
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <span>Crafted with</span>
                <Icon
                  name="heart"
                  size="sm"
                  className="text-red-400 animate-pulse"
                />
                <span>by {companyInfo.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
