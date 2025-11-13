import React from "react";
import Link from "next/link";
import Image from "next/image";
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Company Info & Contact - 5 columns */}
            <div className="lg:col-span-5 space-y-8">
              {/* Company Branding */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/logo2.png"
                      alt="Analyzify360 Logo"
                      width={48}
                      height={48}
                      className="h-12 w-auto object-contain"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        ANALYZIFY<span className="text-blue-400">360</span>
                      </h3>
                      <p className="text-blue-400 text-sm font-medium">
                        Stronger Together, Further Forever
                      </p>
                    </div>
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
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${companyInfo.email}&su=New Project Inquiry&body=Hi Analyzify360 Team,%0D%0A%0D%0AI'm interested in discussing a project with you.%0D%0A%0D%0AProject details:%0D%0A-%0D%0A-%0D%0A-%0D%0A%0D%0ABest regards`}
                        className="text-white font-medium hover:text-blue-400 transition-colors"
                        target="_blank"
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
                  {/* <div className="group flex items-center space-x-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/50 hover:border-blue-600/50">
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
                  </div> */}
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



            {/* Google Maps & Location - RIGHT CORNER - 5 columns */}
            <div className="lg:col-span-5 space-y-6">
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

              {/* Google Maps Embed - RIGHT CORNER */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-800/30">
                <div className="aspect-[4/3] bg-slate-800/50 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975307693877!2d-46.65827948502115!3d-23.561414184678655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b7dbf2f7b1%3A0xa2c9b785e18431b!2sS%C3%A3o%20Paulo%2C%20SP%2C%20Brazil!5e0!3m2!1sen!2sus!4v1635959229142!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                    title="Analyzify360 Location - São Paulo, Brazil"
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl"></div>
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  📍 São Paulo, Brazil
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h5 className="text-white font-semibold">Follow Us</h5>
                <div className="grid grid-cols-5 gap-2">
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
                    // {
                    //   name: "Instagram",
                    //   icon: "instagram",
                    //   href: companyInfo.social?.instagram || "#",
                    //   color: "from-pink-500 to-purple-600",
                    // },
                    // {
                    //   name: "YouTube",
                    //   icon: "youtube",
                    //   href: companyInfo.social?.youtube || "#",
                    //   color: "from-red-500 to-red-600",
                    // },
                    // {
                    //   name: "Facebook",
                    //   icon: "facebook",
                    //   href: companyInfo.social?.facebook || "#",
                    //   color: "from-blue-500 to-blue-600",
                    // },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group`}
                      aria-label={social.name}
                    >
                      <Icon
                        name={social.icon as any}
                        size="sm"
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
