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
import { careerPositions, companyInfo } from "@/data/content";
import { teamMembers } from "@/data/team";
import { FILE_CONFIG } from "@/lib/config";
import { ApiService, ApiError } from "@/lib/api";

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "tech" | "client"
  >("all");
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();

  // Fix hydration by only rendering random elements on client
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter positions
  const filteredPositions = careerPositions.filter(
    (position) => selectedFilter === "all" || position.type === selectedFilter
  );

  // Company perks and benefits
  const companyPerks = [
    {
      icon: "globe",
      title: "Remote-First Culture",
      description:
        "Work from anywhere in the world with flexible hours and async collaboration",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: "dollar",
      title: "Competitive Compensation",
      description:
        "Industry-leading salaries, equity options, and performance bonuses",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: "lightbulb",
      title: "Learning & Development",
      description:
        "$3,000 annual learning budget, conference attendance, and skill development",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: "shield",
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance, mental health support, and wellness programs",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: "users",
      title: "Collaborative Team",
      description:
        "Work with world-class engineers and designers from diverse backgrounds",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: "rocket",
      title: "Career Growth",
      description:
        "Clear advancement paths, mentorship programs, and leadership opportunities",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  // Company values
  const companyValues = [
    {
      icon: "heart",
      title: "People First",
      description:
        "We prioritize our team's well-being, growth, and happiness above all else",
      stats: "98% Employee Satisfaction",
    },
    {
      icon: "lightbulb",
      title: "Innovation",
      description:
        "We embrace cutting-edge technologies and encourage creative problem-solving",
      stats: "12+ Innovation Projects",
    },
    {
      icon: "globe",
      title: "Global Impact",
      description:
        "Our work affects millions of users across 40+ countries worldwide",
      stats: "20+ Countries Served",
    },
    {
      icon: "shield",
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in code quality, security, and delivery",
      stats: "99.9% Uptime Average",
    },
  ];

  // Direct contact methods - matching contact page structure
  const contactMethods = [
    {
      icon: "mail",
      title: "Email Us",
      value: companyInfo.email,
      description: "Send us your resume and tell us about your interests",
      color: "from-blue-500 to-cyan-600",
      action: `https://mail.google.com/mail/?view=cm&fs=1&to=${companyInfo.email}&su=Career Opportunity Inquiry&body=Hi Analyzify360 Team,%0D%0A%0D%0AI am interested in joining your team.%0D%0A%0D%0ABackground:%0D%0A-%0D%0A-%0D%0A%0D%0ABest regards`,
      step: 1,
    },
    {
      icon: "phone",
      title: "Call Us",
      value: companyInfo.phone,
      description: "Call us directly to discuss opportunities and your background",
      color: "from-emerald-500 to-teal-600",
      action: `tel:${companyInfo.phone}`,
      step: 2,
    },
    {
      icon: "calendar",
      title: "Book Meeting",
      value: "Schedule Call",
      description: "Book a convenient time for a casual conversation about joining our team",
      color: "from-orange-500 to-red-600",
      action: "https://calendly.com/brian-logan94727/30min",
      step: 3,
    },
  ];

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const openPositionModal = (position: any) => {
    setSelectedPosition(position);
  };

  const closePositionModal = () => {
    setSelectedPosition(null);
  };

  const openApplicationModal = (position: any) => {
    setSelectedPosition(position);
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: null,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setApplicationData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!applicationData.resume) {
        throw new ApiError('Please upload your resume');
      }

      // Submit application using API service
      const result = await ApiService.submitApplication({
        name: applicationData.name,
        email: applicationData.email,
        phone: applicationData.phone,
        position: selectedPosition.id,
        coverLetter: applicationData.coverLetter,
        resume: applicationData.resume,
      });

      console.log('Application submitted successfully:', result);

      // Show success message
      alert('Application submitted successfully! You will receive a confirmation email shortly.');
      closeApplicationModal();
    } catch (error) {
      console.error('Application submission error:', error);
      const message = error instanceof ApiError ? error.message : 'An unexpected error occurred. Please try again.';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Ultra Modern Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Advanced Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950"></div>

        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(79,70,229,0.4),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.5),transparent_50%)] animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(168,85,247,0.3),transparent_50%)] animate-pulse delay-1000"></div>
        </div>

        {/* Career Network Background */}
        {isClient && (
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1000 1000">
              <defs>
                <linearGradient
                  id="careerGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {[...Array(15)].map((_, i) => (
                <g key={i}>
                  <motion.line
                    x1={Math.random() * 1000}
                    y1={Math.random() * 1000}
                    x2={Math.random() * 1000}
                    y2={Math.random() * 1000}
                    stroke="url(#careerGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.2,
                    }}
                  />
                  <motion.circle
                    cx={Math.random() * 1000}
                    cy={Math.random() * 1000}
                    r="4"
                    fill="#8b5cf6"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                </g>
              ))}
            </svg>
          </div>
        )}

        {/* Floating Tech Icons */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {["code", "cpu", "lightbulb", "globe", "shield", "users"].map(
              (iconName, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    x: [0, Math.random() * 50 - 25, 0],
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: Math.random() * 15 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Icon
                      name={iconName as any}
                      size="sm"
                      className="text-white/70"
                    />
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="text-center">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="inline-flex items-center justify-center px-6 py-3 mb-12 text-xs font-semibold text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-2xl shadow-2xl tracking-wide"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent uppercase tracking-wider">
                Remote-First • Global Team
              </span>
            </motion.div>

            {/* Ultra Modern Typography */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mb-12"
            >
              <h1 className="text-6xl lg:text-9xl font-black mb-6 leading-none tracking-tight">
                <span className="block text-white drop-shadow-2xl">
                  Build The
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                  Future
                </span>
                <span className="block text-4xl lg:text-6xl font-light text-white/70 mt-4">
                  With Us
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
                <p className="text-xl lg:text-2xl leading-relaxed text-white/80 font-medium">
                  Join a global team of innovators, engineers, and creators building the next wave of intelligent digital solutions.
                </p>
              </div>
            </motion.div>


            {/* Quick Stats */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { number: "5+", label: "Team Members", icon: "users" },
                { number: "3+", label: "Countries", icon: "globe" },
                { number: "98%", label: "Satisfaction", icon: "heart" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name={stat.icon as any}
                      size="lg"
                      className="text-white"
                    />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div> */}
          </div>
        </div>


      </motion.section>

      {/* Company Culture & Values */}
      <SmoothSection
        className="relative py-24 bg-gradient-to-b from-white to-slate-50"
        id="company-culture"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200"
            >
              <Icon name="heart" size="sm" className="mr-2 text-purple-600" />
              <span className="text-purple-800">Our Culture</span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">Why Join</span>
              <span className="block bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Us
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Show your values in a concise, data-driven way.
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <ProfessionalCard
                key={index}
                delay={index * 0.1}
                hoverEffect="lift"
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[350px] flex flex-col"
              >
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon
                    name={value.icon as any}
                    size="xl"
                    className="text-white"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-purple-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1 font-medium">
                    {value.description}
                  </p>

                  {/* Stats */}
                  <div className="mt-auto p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="text-purple-700 font-bold text-lg">
                      {value.stats}
                    </div>
                  </div>
                </div>
              </ProfessionalCard>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection>

      {/* Benefits & Perks */}
      <SmoothSection className="relative py-24 bg-white">
        <GridBackground className="opacity-5" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200"
            >
              <Icon
                name="lightbulb"
                size="sm"
                className="mr-2 text-emerald-600"
              />
              <span className="text-emerald-800">Benefits & Perks</span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">Everything You Need</span>
              <span className="block bg-gradient-to-r from-emerald-700 via-teal-700 to-blue-700 bg-clip-text text-transparent">
                To Thrive
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              We invest in our team's success with comprehensive benefits,
              growth opportunities, and a culture that puts people first.
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyPerks.map((perk, index) => (
              <ProfessionalCard
                key={index}
                delay={index * 0.1}
                hoverEffect="glow"
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 min-h-[280px] flex flex-col"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${perk.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon
                    name={perk.icon as any}
                    size="lg"
                    className="text-white"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {perk.description}
                  </p>
                </div>


              </ProfessionalCard>
            ))}
          </StaggeredContainer>

        </div>
      </SmoothSection>

      {/* Open Positions - Ultra Visual Design */}
      {/* <SmoothSection
        className="relative py-32 bg-slate-700 overflow-hidden"
        id="jobs"
      >
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.2),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.2),transparent_70%)]"></div>
        </div>

        <div className="relative z-10 w-[95%] mx-auto px-4 py-8 lg:px-8">
          <AnimatedSection className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-8 py-4 mb-10 text-sm font-bold text-white bg-slate-600 rounded-full border border-slate-500 shadow-xl"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></div>
              <span className="text-lg">
                {filteredPositions.length} Open Positions • Remote-First •
                Global Team
              </span>
            </motion.div>

            <h2 className="text-6xl lg:text-8xl font-black mb-10 leading-tight">
              <span className="text-white">Your Next</span>
              <span className="block text-blue-300 mt-2">Adventure</span>
              <span className="block text-2xl lg:text-4xl font-light text-slate-200 mt-6">
                Starts Here
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-slate-100 leading-relaxed max-w-4xl mx-auto font-medium">
              Join our mission to create innovative solutions that impact
              millions of users worldwide. Build the future with cutting-edge
              technology and a passionate team.
            </p>
          </AnimatedSection>

          
          <div className="flex justify-center mb-16">
            <div className="bg-slate-600 rounded-2xl border border-slate-500 p-2 shadow-xl">
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  {
                    key: "all",
                    label: "All Positions",
                    count: careerPositions.length,
                    icon: "briefcase",
                  },
                  {
                    key: "tech",
                    label: "Tech Roles",
                    count: careerPositions.filter((p) => p.type === "tech")
                      .length,
                    icon: "code",
                  },
                  {
                    key: "client",
                    label: "Business Roles",
                    count: careerPositions.filter((p) => p.type === "client")
                      .length,
                    icon: "users",
                  },
                ].map((filter) => (
                  <motion.button
                    key={filter.key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFilter(filter.key as any)}
                    className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedFilter === filter.key
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-slate-200 hover:text-white hover:bg-slate-500"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={filter.icon as any} size="sm" />
                      <span>{filter.label}</span>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-bold ${selectedFilter === filter.key
                          ? "bg-blue-400 text-white"
                          : "bg-slate-500 text-slate-200"
                          }`}
                      >
                        {filter.count}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          
          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                className="cursor-pointer group"
                onClick={() => openPositionModal(position)}
              >
                <div className="relative">
                  
                  <div className="bg-white backdrop-blur-xl rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 p-8 min-h-[520px] flex flex-col overflow-hidden group-hover:border-slate-300">
                    
                    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                    
                    <div className="flex items-center justify-between mb-8">
                      <div
                        className={`px-4 py-2 rounded-lg text-sm font-semibold ${position.type === "tech"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-green-50 text-green-700 border border-green-200"
                          }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon
                            name={position.type === "tech" ? "code" : "users"}
                            size="sm"
                          />
                          <span>
                            {position.type === "tech"
                              ? "Technical"
                              : "Business"}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-300 ${position.type === "tech"
                          ? "bg-blue-600"
                          : "bg-green-600"
                          }`}
                      >
                        <Icon
                          name={position.type === "tech" ? "code" : "users"}
                          size="lg"
                          className="text-white"
                        />
                      </div>
                    </div>

                    
                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors leading-tight">
                          {position.title}
                        </h3>

                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center">
                            <Icon name="map" size="sm" className="text-white" />
                          </div>
                          <span className="text-slate-600 font-medium text-lg">
                            {position.location}
                          </span>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-base">
                          {position.description}
                        </p>
                      </div>

                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="lightbulb"
                            size="sm"
                            className="text-amber-600"
                          />
                          <h4 className="text-slate-800 font-semibold">
                            Key Skills:
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {position.requirements.slice(0, 3).map((req, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-2 bg-slate-100 rounded-lg text-slate-700 text-sm font-medium border border-slate-200"
                            >
                              {req.split(" ").slice(0, 2).join(" ")}
                            </div>
                          ))}
                        </div>

                        {position.requirements.length > 3 && (
                          <div className="max-w-fit px-3 py-2 bg-slate-200 rounded-lg text-slate-600 text-sm font-medium border border-slate-300">
                            +{position.requirements.length - 3} more
                          </div>
                        )}
                      </div>

                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="heart"
                            size="sm"
                            className="text-rose-600"
                          />
                          <h4 className="text-slate-800 font-semibold">
                            Top Benefits:
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {position.benefits.slice(0, 2).map((benefit, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                                <Icon
                                  name="check"
                                  size="sm"
                                  className="text-white"
                                />
                              </div>
                              <span className="text-slate-600 text-sm font-medium">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    
                    <div className="mt-8 space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                      >
                        <button className="w-full py-4 bg-slate-700 hover:bg-slate-800 rounded-xl font-semibold text-white text-center shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center justify-center space-x-3">
                            <Icon name="briefcase" size="md" />
                            <span className="text-lg">
                              View Details & Apply
                            </span>
                            <Icon
                              name="arrow-right"
                              size="md"
                              className="transform group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </button>
                      </motion.div>

                      
                      <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-slate-200">
                        <div className="space-y-1">
                          <div className="text-slate-800 font-semibold text-sm">
                            Level
                          </div>
                          <div className="text-slate-500 text-xs">
                            {position.type === "tech" ? "Senior" : "Manager"}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-slate-800 font-semibold text-sm">
                            Team
                          </div>
                          <div className="text-slate-500 text-xs">
                            5-10 people
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-slate-800 font-semibold text-sm">
                            Remote
                          </div>
                          <div className="text-slate-500 text-xs">100%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggeredContainer>

          
          {filteredPositions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <Icon name="briefcase" size="2xl" className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  No Positions Match Your Filter
                </h3>
                <p className="text-slate-200 text-lg mb-10 leading-relaxed">
                  We're always looking for exceptional talent. Try selecting a
                  different category or check back soon for new opportunities.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter("all")}
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="globe" size="md" />
                    <span>Show All Positions</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </SmoothSection> */}

      {/* Position Details Modal */}
      {selectedPosition && !showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary">
                    {selectedPosition.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {selectedPosition.location}
                  </p>
                </div>
                <button
                  onClick={closePositionModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">
                    About This Role
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedPosition.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Requirements */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {selectedPosition.requirements.map(
                        (req: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <span className="text-gray-600">{req}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {selectedPosition.benefits.map(
                        (benefit: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-8 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openApplicationModal(selectedPosition)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Icon name="briefcase" size="md" />
                        <span>Apply Now</span>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closePositionModal}
                      className="px-8 py-4 bg-white border-2 border-slate-300 hover:bg-slate-50 rounded-xl font-bold text-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Apply for {selectedPosition.title}
                  </h2>
                  <p className="text-gray-600">{selectedPosition.location}</p>
                </div>
                <button
                  onClick={closeApplicationModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={applicationData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Resume/CV *
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept={FILE_CONFIG.ALLOWED_TYPES.join(',')}
                    required
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Accepted formats: {FILE_CONFIG.ALLOWED_TYPES.join(', ').toUpperCase()} (max {FILE_CONFIG.MAX_SIZE_MB}MB)
                  </p>
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`flex-1 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={closeApplicationModal}
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`flex-1 px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 ${isSubmitting
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:shadow-xl"
                      }`}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Join Our Team */}
      <SmoothSection id="contact" className="relative py-24 bg-white">
        <GridBackground className="opacity-5" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200"
            >
              <Icon name="users" size="sm" className="mr-2 text-emerald-600" />
              <span className="text-emerald-800">Join Our Team</span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">Ready to</span>
              <span className="block bg-gradient-to-r from-emerald-700 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                Connect?
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Skip the formal application process. We believe in direct, personal
              connections. Reach out to us through any of these methods and let's
              start a conversation about your future with our team.
            </p>
          </AnimatedSection>

          {/* Contact Methods */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-200 via-blue-200 to-purple-200 rounded-full hidden lg:block"></div>

            <div className="space-y-8 lg:space-y-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                >
                  {/* Method Content */}
                  <div className="flex-1 max-w-md">
                    <ProfessionalCard
                      delay={0}
                      hoverEffect="lift"
                      className="bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${method.color}`}
                        >
                          <Icon
                            name={method.icon as any}
                            size="md"
                            className="text-white"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900">
                            {method.title}
                          </h3>
                          <p className="text-slate-500 font-medium">
                            {method.value}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-medium mb-6">
                        {method.description}
                      </p>

                      {/* Contact Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (method.action.startsWith('tel:')) {
                            window.location.href = method.action;
                          } else {
                            window.open(method.action, '_blank');
                          }
                        }}
                        className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-300 bg-gradient-to-r ${method.color} hover:opacity-90`}
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <Icon
                            name={method.icon as any}
                            size="sm"
                            className="text-white"
                          />
                          <span>{method.title}</span>
                        </span>
                      </motion.button>
                    </ProfessionalCard>
                  </div>

                  {/* Method Number */}
                  <div className="relative z-10">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-2xl bg-gradient-to-br ${method.color}`}
                    >
                      {method.step}
                    </div>
                  </div>

                  {/* Placeholder for alignment */}
                  <div className="flex-1 max-w-md lg:block hidden"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl border border-emerald-200 p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                Personal Connection First
              </h3>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                We value authentic conversations over formal processes. Reach out
                through your preferred method and let's discuss how you can contribute
                to our growing team.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">
                    Same Day
                  </div>
                  <div className="text-slate-600 font-medium">
                    Response Time
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    100%
                  </div>
                  <div className="text-slate-600 font-medium">
                    Personal Touch
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    Direct
                  </div>
                  <div className="text-slate-600 font-medium">
                    Communication
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SmoothSection>

      {/* Team Testimonials */}
      {/* <SmoothSection className="relative py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200"
            >
              <Icon name="heart" size="sm" className="mr-2 text-green-600" />
              <span className="text-green-800">Team Stories</span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">What Our Team</span>
              <span className="block bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
                Says About Us
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Hear directly from our team members about their experiences,
              growth, and what makes our company special.
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.slice(0, 3).map((member, index) => (
              <ProfessionalCard
                key={member.id}
                delay={index * 0.1}
                hoverEffect="glow"
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 min-h-[320px] flex flex-col"
              >
              
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          {member.avatar}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {member.name}
          </h3>
          <p className="text-green-700 font-semibold">
            {member.title}
          </p>
          {member.location && (
            <p className="text-slate-500 text-sm">
              {member.location}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1">
        {member.quote && (
          <blockquote className="text-slate-600 italic leading-relaxed font-medium mb-4">
            "{member.quote}"
          </blockquote>
        )}
        <p className="text-slate-600 leading-relaxed font-medium">
          {member.bio.length > 120
            ? member.bio.substring(0, 120) + "..."
            : member.bio}
        </p>
      </div>


      {member.skills && (
        <div className="mt-4 flex flex-wrap gap-2">
          {member.skills.slice(0, 3).map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200"
            >
              {skill}
            </span>
          ))}
          {member.skills.length > 3 && (
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
              +{member.skills.length - 3}
            </span>
          )}
        </div>
      )}
    </ProfessionalCard>
  ))
}
          </StaggeredContainer >
        </div >
      </SmoothSection > */}
    </div >
  );
}
