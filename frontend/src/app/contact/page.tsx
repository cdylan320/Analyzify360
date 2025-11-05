"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  AnimatedSection,
  StaggeredContainer,
  SmoothSection,
  ProfessionalCard,
  ParallaxText,
  DotsPattern,
  GridBackground,
  Icon,
  Button,
} from "@/components";
import { companyInfo, trustBadges } from "@/data/content";
import { teamMembers } from "@/data/team";

export default function Contact() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();

  // Fix hydration by only rendering random elements on client
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Get client team (account managers)
  const clientTeam = teamMembers.filter((member) => member.role === "client");
  const usTeam = teamMembers.filter((member) => member.country === "US");
  const ukTeam = teamMembers.filter((member) => member.country === "UK");

  // Contact methods
  const contactMethods = [
    {
      icon: "mail",
      title: "Email Us",
      value: companyInfo.email,
      description: "Get a response within 2 hours",
      color: "from-blue-500 to-cyan-600",
      action: `https://mail.google.com/mail/?view=cm&fs=1&to=${companyInfo.email}&su=New Project Inquiry&body=Hi Analyzify360 Team,%0D%0A%0D%0AI'm interested in discussing a project with you.%0D%0A%0D%0AProject details:%0D%0A-%0D%0A-%0D%0A-%0D%0A%0D%0ABest regards`,
    },
    {
      icon: "phone",
      title: "Call Us",
      value: companyInfo.phone,
      description: "Mon-Fri, 9AM-6PM EST",
      color: "from-emerald-500 to-teal-600",
      action: `tel:${companyInfo.phone}`,
    },
    {
      icon: "chat",
      title: "Live Chat",
      value: "Start Chat",
      description: "Instant support available",
      color: "from-purple-500 to-violet-600",
      action: "#",
    },
    {
      icon: "calendar",
      title: "Book Meeting",
      value: "Schedule Call",
      description: "15-min consultation",
      color: "from-orange-500 to-red-600",
      action: "https://calendly.com/brian-logan94727/30min",
    },
  ];

  // Office locations
  const offices = [
    {
      city: "Chicago",
      country: "United States",
      flag: "🇺🇸",
      address: "123 West Loop St, Suite 500",
      phone: "+1 (312) 555-0123",
      timezone: "CST",
      manager: "Michael Thompson",
      managerRole: "US Account Manager",
    },
    {
      city: "Austin",
      country: "United States",
      flag: "🇺🇸",
      address: "456 Congress Ave, Floor 12",
      phone: "+1 (512) 555-0456",
      timezone: "CST",
      manager: "Jessica Carter",
      managerRole: "Client Success Lead",
    },
    {
      city: "San Francisco",
      country: "United States",
      flag: "🇺🇸",
      address: "789 Market St, Suite 200",
      phone: "+1 (415) 555-0789",
      timezone: "PST",
      manager: "Brandon Lee",
      managerRole: "US Partner",
    },
    {
      city: "London",
      country: "United Kingdom",
      flag: "🇬🇧",
      address: "10 Downing Ct, Canary Wharf",
      phone: "+44 20 7555 0101",
      timezone: "GMT",
      manager: "David Wright",
      managerRole: "UK Account Manager",
    },
    {
      city: "Manchester",
      country: "United Kingdom",
      flag: "🇬🇧",
      address: "25 King St, City Centre",
      phone: "+44 161 555 0202",
      timezone: "GMT",
      manager: "Rachel Evans",
      managerRole: "UK Partner",
    },
  ];

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });
    }, 5000);
  };

  return (
    <div className="pt-16">
      {/* Ultra Modern Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Advanced Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"></div>

        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.4),transparent_50%)] animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(139,92,246,0.3),transparent_50%)] animate-pulse delay-1000"></div>
        </div>

        {/* Floating Particles */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        )}

        {/* Communication Network Background */}
        {isClient && (
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1000 1000">
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {[...Array(12)].map((_, i) => (
                <g key={i}>
                  <motion.line
                    x1={Math.random() * 1000}
                    y1={Math.random() * 1000}
                    x2={Math.random() * 1000}
                    y2={Math.random() * 1000}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.3,
                    }}
                  />
                  <motion.circle
                    cx={Math.random() * 1000}
                    cy={Math.random() * 1000}
                    r="3"
                    fill="#3b82f6"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                </g>
              ))}
            </svg>
          </div>
        )}

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="text-center">
            {/* Ultra Modern Typography */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mb-12"
            >
              <h1 className="text-6xl lg:text-9xl font-black mb-6 leading-none tracking-tight">
                <span className="block text-white drop-shadow-2xl">
                  Let's Build the Future
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                  Together
                </span>
              </h1>
            </motion.div>

            {/* Glassmorphism Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-4xl mx-auto mb-16"
            >
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                <p className="text-xl lg:text-2xl leading-relaxed text-white/80 font-medium mb-4">
                  Whether you're a business looking to accelerate digital transformation or a talent ready to grow through our training program, we're here to make innovation happen — side by side.
                </p>
                <p className="text-lg text-white/60 font-medium">
                  Global delivery. Local collaboration. Continuous innovation.
                </p>
              </div>
            </motion.div>

            {/* Modern CTA Buttons */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <span className="relative flex items-center justify-center space-x-3">
                  <span>Start Your Project</span>
                  <Icon name="arrow-right" size="md" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.location.href = "/team"
                }
                className="group relative px-12 py-6 bg-white/10 backdrop-blur-xl rounded-2xl font-bold text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>Meet Your Team</span>
                  <Icon name="users" size="md" />
                </span>
              </motion.button>
            </motion.div> */}
          </div>
        </div>


      </motion.section>

      {/* Contact Methods Section */}
      <SmoothSection className="relative py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200"
            >
              <Icon name="support" size="sm" className="mr-2 text-blue-600" />
              <span className="text-blue-800">Get In Touch</span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">Choose Your</span>
              <span className="block bg-gradient-to-r from-blue-700 via-cyan-700 to-indigo-700 bg-clip-text text-transparent">
                Preferred Method
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Multiple ways to connect with our team. We're here to help you
              succeed.
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => window.open(method.action, "_blank")}
              >
                <ProfessionalCard
                  delay={index * 0.1}
                  hoverEffect="lift"
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[280px] flex flex-col"
                >
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${method.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon
                      name={method.icon as any}
                      size="xl"
                      className="text-white"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-lg font-semibold text-blue-700 mb-3">
                      {method.value}
                    </p>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {method.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-center space-x-2 text-blue-700 font-semibold">
                      <span>Connect Now</span>
                      <Icon name="arrow-right" size="sm" />
                    </div>
                  </div>
                </ProfessionalCard>
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection>

      {/* Contact Form & Office Locations */}
      <SmoothSection className="relative py-24 bg-white" id="contact-form">
        <GridBackground className="opacity-5" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Contact Form */}
            <div>
              <AnimatedSection>
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 lg:p-12">
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                      Start Your
                      <span className="block bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                        Project Today
                      </span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                      Tell us about your vision and we'll get back to you within
                      2 hours with a detailed proposal.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Icon name="check" size="xl" className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-600 mb-4">
                        Thank You!
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        Your message has been sent successfully. Our team will
                        review your requirements and get back to you within 2
                        hours.
                      </p>
                      <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-sm text-green-700 font-semibold">
                          Expected Response: Within 2 hours • Priority: High
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-bold text-slate-800 mb-3"
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-slate-900 font-medium placeholder-slate-400"
                            placeholder="John Smith"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-bold text-slate-800 mb-3"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-slate-900 font-medium placeholder-slate-400"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      {/* Company & Role Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-bold text-slate-800 mb-3"
                          >
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-slate-900 font-medium placeholder-slate-400"
                            placeholder="Your Company"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="role"
                            className="block text-sm font-bold text-slate-800 mb-3"
                          >
                            Your Role
                          </label>
                          <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-slate-900 font-medium"
                          >
                            <option value="">Select your role</option>
                            <option value="ceo">CEO/Founder</option>
                            <option value="cto">CTO/Technical Lead</option>
                            <option value="product">Product Manager</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="marketing">Marketing</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Project Type & Budget Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="projectType"
                            className="block text-sm font-bold text-slate-800 mb-3"
                          >
                            Project Type
                          </label>
                          <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-slate-900 font-medium"
                          >
                            <option value="">Select project type</option>
                            <option value="web-app">Web Application</option>
                            <option value="mobile-app">
                              Mobile Application
                            </option>
                            <option value="ai-ml">AI/ML Solution</option>
                            <option value="blockchain">Blockchain/DeFi</option>
                            <option value="ecommerce">
                              E-commerce Platform
                            </option>
                            <option value="enterprise">
                              Enterprise Software
                            </option>
                            <option value="consulting">
                              Technical Consulting
                            </option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="budget"
                            className="block text-sm font-bold text-slate-800 mb-3"
                          >
                            Project Budget
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-slate-900 font-medium"
                          >
                            <option value="">Select budget range</option>
                            <option value="10k-25k">$10K - $25K</option>
                            <option value="25k-50k">$25K - $50K</option>
                            <option value="50k-100k">$50K - $100K</option>
                            <option value="100k-250k">$100K - $250K</option>
                            <option value="250k+">$250K+</option>
                            <option value="discuss">Let's Discuss</option>
                          </select>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-sm font-bold text-slate-800 mb-3"
                        >
                          Preferred Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-slate-900 font-medium"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP (Rush Project)</option>
                          <option value="1-3months">1-3 Months</option>
                          <option value="3-6months">3-6 Months</option>
                          <option value="6months+">6+ Months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-bold text-slate-800 mb-3"
                        >
                          Project Details *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 resize-none text-slate-900 font-medium placeholder-slate-400"
                          placeholder="Tell us about your project vision, key features, target audience, and any specific requirements or challenges you're facing..."
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-6 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-300 ${isSubmitting
                          ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-3xl"
                          }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Sending Your Message...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-3">
                            <span>Send Project Details</span>
                            <Icon name="arrow-right" size="md" />
                          </div>
                        )}
                      </motion.button>

                      {/* Form Footer */}
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-2 text-blue-700">
                          <Icon name="shield-check" size="sm" />
                          <span className="text-sm font-semibold">
                            100% Secure • 2-Hour Response • Free Consultation
                          </span>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </SmoothSection>


      {/* Trust Indicators Section */}
      {/* <SmoothSection className="relative py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
              <span className="text-slate-900">Why Businesses</span>
              <span className="block bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
                Trust Us
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Enterprise-grade security, transparent communication, and proven
              results that speak for themselves.
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, index) => (
              <ProfessionalCard
                key={badge.id}
                delay={index * 0.1}
                hoverEffect="glow"
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[280px] flex flex-col"
              >

                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon
                    name={badge.icon as any}
                    size="xl"
                    className="text-white"
                  />
                </div>


                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-green-700 transition-colors">
                    {badge.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {badge.description}
                  </p>
                </div>
              </ProfessionalCard>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection> */}

    </div>
  );
}
