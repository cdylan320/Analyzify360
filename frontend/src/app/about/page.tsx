"use client";

import { useState, useRef, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
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
import { companyInfo, companyValues, timeline } from "@/data/content";
import { teamMembers } from "@/data/team";

interface ParticlePosition {
  left: number;
  top: number;
  x: number;
  duration: number;
  delay: number;
}

interface NetworkElement {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  cx: number;
  cy: number;
}

export default function About() {
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Pre-computed static values for consistent SSR/CSR
  const particlePositions = useRef<ParticlePosition[]>([
    { left: 10, top: 20, x: 25, duration: 15, delay: 0 },
    { left: 80, top: 15, x: -30, duration: 12, delay: 1 },
    { left: 15, top: 70, x: 40, duration: 18, delay: 2 },
    { left: 90, top: 60, x: -25, duration: 14, delay: 3 },
    { left: 25, top: 45, x: 35, duration: 16, delay: 4 },
    { left: 70, top: 80, x: -40, duration: 13, delay: 0.5 },
    { left: 45, top: 25, x: 20, duration: 17, delay: 1.5 },
    { left: 60, top: 55, x: -35, duration: 15, delay: 2.5 },
    { left: 30, top: 85, x: 30, duration: 14, delay: 3.5 },
    { left: 85, top: 35, x: -20, duration: 16, delay: 4.5 },
    { left: 5, top: 50, x: 45, duration: 12, delay: 0.8 },
    { left: 95, top: 75, x: -45, duration: 18, delay: 1.8 },
    { left: 40, top: 10, x: 25, duration: 13, delay: 2.8 },
    { left: 75, top: 30, x: -30, duration: 17, delay: 3.8 },
    { left: 20, top: 90, x: 35, duration: 15, delay: 4.8 },
  ]);

  const networkElements = useRef<NetworkElement[]>([
    { x1: 100, y1: 200, x2: 300, y2: 400, cx: 150, cy: 250 },
    { x1: 500, y1: 100, x2: 700, y2: 300, cx: 600, cy: 200 },
    { x1: 200, y1: 600, x2: 400, y2: 800, cx: 300, cy: 700 },
    { x1: 800, y1: 500, x2: 900, y2: 700, cx: 850, cy: 600 },
    { x1: 300, y1: 300, x2: 600, y2: 600, cx: 450, cy: 450 },
    { x1: 700, y1: 200, x2: 800, y2: 500, cx: 750, cy: 350 },
    { x1: 150, y1: 800, x2: 350, y2: 900, cx: 250, cy: 850 },
    { x1: 900, y1: 100, x2: 950, y2: 400, cx: 925, cy: 250 },
  ]);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const leadership = teamMembers.filter(
    (member) => member.role === "leadership"
  );

  const stats = [
    { value: "12+", label: "Projects Delivered", icon: "briefcase" },
    { value: "3+", label: "Happy Clients", icon: "users" },
    { value: "7+", label: "Years Experience", icon: "calendar" },
    { value: "24/7", label: "Support Available", icon: "shield" },
  ];

  const achievements = [
    {
      icon: "check",
      title: "Industry Recognition",
      description:
        "Top-rated development agency with multiple industry awards and certifications",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: "shield-check",
      title: "Security Excellence",
      description:
        "Enterprise-grade security protocols trusted by Fortune 500 companies",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: "chart-bar",
      title: "Proven Results",
      description: "99% client retention rate with measurable business impact",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: "users",
      title: "Expert Team",
      description:
        "Certified professionals with decades of combined experience",
      color: "from-rose-500 to-pink-600",
    },
  ];

  // Timeline Navigation
  const handleTimelineNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentTimelineIndex > 0) {
        setCurrentTimelineIndex(currentTimelineIndex - 1);
      } else if (currentTimelineIndex === 0) {
        setCurrentTimelineIndex(-1); // Close all cards
      }
    } else if (direction === "next") {
      if (currentTimelineIndex < timeline.length - 1) {
        setCurrentTimelineIndex(currentTimelineIndex + 1);
      }
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = timelineRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newIndex = Math.floor(percentage * timeline.length);
        if (newIndex >= 0 && newIndex < timeline.length) {
          setCurrentTimelineIndex(newIndex);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="pt-16">
      {/* Ultra Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Advanced Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"></div>

        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.4),transparent_50%)] animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(139,92,246,0.3),transparent_50%)] animate-pulse delay-1000"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted && particlePositions.current.map((position, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, position.x, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: position.duration,
                repeat: Infinity,
                delay: position.delay,
              }}
            />
          ))}
        </div>

        {/* Neural Network Background */}
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
            {mounted && networkElements.current.map((element, index) => (
              <g key={index}>
                <motion.line
                  x1={element.x1}
                  y1={element.y1}
                  x2={element.x2}
                  y2={element.y2}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.5,
                  }}
                />
                <motion.circle
                  cx={element.cx}
                  cy={element.cy}
                  r="3"
                  fill="#3b82f6"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="relative z-20 w-[95%] mx-auto px-4 lg:px-8 py-20">
          <div className="text-center max-w-7xl mx-auto">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="inline-flex items-center justify-center px-8 py-4 mb-12 text-sm font-bold text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-2xl shadow-2xl"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Shaping Global Innovation Since 2024
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
                  Building
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                  Tomorrow
                </span>
                <span className="block text-4xl lg:text-6xl font-light text-white/70 mt-4">
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
                <p className="text-xl lg:text-2xl leading-relaxed text-white/80 font-medium">
                  We bridge global engineering excellence with local innovation — empowering hybrid teams, nurturing future talent, and building next-generation technologies that move industries forward.
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
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <span className="relative flex items-center justify-center space-x-3">
                  <span>Explore Our Journey</span>
                  <Icon name="external-link" size="md" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-white/10 backdrop-blur-xl rounded-2xl font-bold text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>Meet Our Team</span>
                  <Icon name="users" size="md" />
                </span>
              </motion.button>
            </motion.div> */}
          </div>
        </div>

      </section>

      {/* Who We Are Section */}
      <SmoothSection className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              <Icon name="light-bulb" size="sm" className="mr-2" />
              Who We Are
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Next-Generation
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Technology-as-a-Service
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium">
              Analyzify360 is a next-generation Technology-as-a-Service (TaaS) company that blends local insight with global technical mastery.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Our hybrid model connects top-tier engineers, emerging developers, and trusted mentors across borders — enabling rapid, scalable, and human-centered technology delivery.
            </p>
            <div className="bg-white rounded-3xl border border-slate-200 p-10 lg:p-12 shadow-lg">
              <p className="text-2xl text-slate-900 leading-relaxed font-bold mb-4">
                We go beyond software.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                We build ecosystems: training, deploying, and empowering talent through real projects — creating measurable impact for clients and opportunities for every team member.
              </p>
            </div>
          </div>
        </div>
      </SmoothSection>

      {/* Mission & Vision Section */}
      <SmoothSection className="relative py-24 lg:py-32 bg-white">
        {/* Light Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              <Icon name="globe" size="sm" className="mr-2" />
              Our Mission & Vision
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mission & Vision
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ProfessionalCard
              delay={0}
              hoverEffect="lift"
              className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Icon name="briefcase" size="lg" className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To accelerate digital transformation by combining world-class technical expertise with locally empowered teams and continuous learning.
              </p>
            </ProfessionalCard>

            <ProfessionalCard
              delay={0.1}
              hoverEffect="lift"
              className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Icon name="eye" size="lg" className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To redefine how technology is built — through a distributed, AI-powered ecosystem where innovation, talent development, and global collaboration coexist seamlessly.
              </p>
            </ProfessionalCard>
          </div>
        </div>
      </SmoothSection>

      {/* What We Do Section */}
      <SmoothSection className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              <Icon name="code" size="sm" className="mr-2" />
              What We Do
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Our Core
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Focus Areas
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Focus Area</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <motion.tr
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                            <Icon name="users" size="md" className="text-white" />
                          </div>
                          <span className="font-bold text-slate-900">Hybrid TaaS Delivery</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 leading-relaxed">
                        We provide flexible, scalable, and secure engineering teams that integrate directly with client operations — combining speed, quality, and cost efficiency.
                      </td>
                    </motion.tr>
                    <motion.tr
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                            <Icon name="light-bulb" size="md" className="text-white" />
                          </div>
                          <span className="font-bold text-slate-900">Training-to-Employment Program</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 leading-relaxed">
                        Our unique program empowers aspiring developers through mentorship, real projects, and guaranteed pathways into hybrid teams.
                      </td>
                    </motion.tr>
                    <motion.tr
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                            <Icon name="chip" size="md" className="text-white" />
                          </div>
                          <span className="font-bold text-slate-900">AI & Cloud Solutions</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 leading-relaxed">
                        From full-stack systems to automation, data analytics, and infrastructure, we deliver enterprise-grade software powered by modern AI.
                      </td>
                    </motion.tr>
                    <motion.tr
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                            <Icon name="light-bulb" size="md" className="text-white" />
                          </div>
                          <span className="font-bold text-slate-900">R&D & Innovation</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 leading-relaxed">
                        Our research arm explores frontier domains like Distributed AI Subnets, Blockchain-based automation, and Agentic Infrastructure — shaping the next era of intelligent systems.
                      </td>
                    </motion.tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SmoothSection>

      {/* Statistics Section
      <SmoothSection className="relative py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="w-[95%] mx-auto px-4 lg:px-8">
          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ProfessionalCard
                key={index}
                delay={index * 0.1}
                hoverEffect="lift"
                className="text-center bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    name={stat.icon as any}
                    size="xl"
                    className="text-white"
                  />
                </div>
                <div className="text-4xl font-black text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 font-semibold text-lg">
                  {stat.label}
                </div>
              </ProfessionalCard>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection> */}

      {/* Company Values */}
      <SmoothSection className="relative py-24 lg:py-32 bg-white">
        {/* Light Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              <Icon name="heart" size="sm" className="mr-2" />
              Our Values
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              What Drives
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Everything We Build
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Our principles define how we innovate, collaborate, and deliver measurable impact for our partners and community.
            </p>
          </div>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <ProfessionalCard
                key={value.id}
                delay={index * 0.1}
                hoverEffect="lift"
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[320px] flex flex-col"
              >
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon
                    name={value.icon as any}
                    size="xl"
                    className="text-white"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {value.description}
                  </p>
                </div>
              </ProfessionalCard>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection>

      {/* Professional Serpentine Roadmap Timeline */}
      <SmoothSection className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_60%)]"></div>
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-8 py-4 mt-8 mb-6 text-sm font-bold text-white bg-slate-800/80 rounded-full border border-white/60 backdrop-blur-2xl shadow-2xl"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse drop-shadow-sm"></div>
              <span style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}>Navigating the Future • 2024-2027+</span>
            </motion.div>

            <h2 className="text-5xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="text-white" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)" }}>Navigating the Future</span>
              <span className="block text-white" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)" }}>
                of Hybrid Technology
              </span>
            </h2>

            <p className="text-white text-xl leading-relaxed max-w-4xl mx-auto font-semibold mb-4" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)" }}>
              Our roadmap combines real growth with R&D-driven vision — expanding from hybrid delivery to frontier innovation.
            </p>
            
            {/* Focus indicators for each year */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {timeline.map((item, idx) => (
                <div key={idx} className="text-white/80 text-sm font-medium px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  {item.year} — {item.title.split('&')[0].trim()}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Serpentine Timeline Container */}
          <div className="relative h-[600px] sm:h-[800px] md:h-[1000px] lg:h-[1200px] w-full max-w-7xl mx-auto">
            {/* Winding Zig-Zag Serpentine Road */}
            <div className="absolute inset-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 1200 1000"
                style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.6))" }}
              >
                <defs>
                  <linearGradient
                    id="roadGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1f2937" stopOpacity="1" />
                    <stop offset="50%" stopColor="#374151" stopOpacity="1" />
                    <stop offset="100%" stopColor="#1f2937" stopOpacity="1" />
                  </linearGradient>
                  <filter id="roadShadow">
                    <feDropShadow
                      dx="0"
                      dy="15"
                      stdDeviation="20"
                      floodColor="#000000"
                      floodOpacity="0.5"
                    />
                  </filter>
                </defs>

                {/* Road Shadow */}
                <motion.path
                  d="M 150 850 Q 250 750 350 700 Q 450 650 400 550 Q 350 450 500 400 Q 650 350 600 250 Q 550 150 700 120 Q 850 90 950 100"
                  stroke="#000000"
                  strokeWidth="110"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                  transform="translate(8, 20)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 0.5 }}
                />

                {/* Main Serpentine Road */}
                <motion.path
                  d="M 150 850 Q 250 750 350 700 Q 450 650 400 550 Q 350 450 500 400 Q 650 350 600 250 Q 550 150 700 120 Q 850 90 950 100"
                  stroke="url(#roadGradient)"
                  strokeWidth="100"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#roadShadow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 0.5 }}
                />

                {/* Road Surface Highlight */}
                <motion.path
                  d="M 150 850 Q 250 750 350 700 Q 450 650 400 550 Q 350 450 500 400 Q 650 350 600 250 Q 550 150 700 120 Q 850 90 950 100"
                  stroke="rgba(75, 85, 99, 0.8)"
                  strokeWidth="105"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 0.5 }}
                />

                {/* Center Lane Markings */}
                <motion.path
                  d="M 150 850 Q 250 750 350 700 Q 450 650 400 550 Q 350 450 500 400 Q 650 350 600 250 Q 550 150 700 120 Q 850 90 950 100"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="30 20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 2 }}
                />
              </svg>
            </div>

            {/* Year Icons Positioned ON the Serpentine Road Path */}
            {timeline.map((item, index) => {
              // Road path: M 150 850 Q 250 750 350 700 Q 450 650 400 550 Q 350 450 500 400 Q 650 350 600 250 Q 550 150 700 120 Q 850 90 950 100
              // SVG viewBox: 0 0 1200 1000 (width=1200px, height=1000px)
              // Container: h-[1200px] w-full max-w-7xl (height=1200px fixed)
              // SVG uses w-full h-full with default preserveAspectRatio="xMidYMid meet"
              // This means SVG scales uniformly to fit, maintaining aspect ratio
              // The SVG will scale to fit the container width, then be centered vertically
              // Since container height (1200) > viewBox height (1000), there will be vertical padding
              // Actual rendered SVG height = (container_width / 1200) * 1000
              // But for positioning icons, we use percentages relative to container
              // The key: SVG coords map to viewBox, then scale to container
              // X percentage = (svg_x / viewBox_width) * 100 = (x / 1200) * 100
              // Y percentage calculation: Since SVG scales by width, we need to account for scaling
              // If container width = W, scale factor = W/1200
              // Rendered SVG height = (W/1200) * 1000 = W * (1000/1200) = W * 0.833
              // Vertical offset = (1200 - rendered_height) / 2 = (1200 - W*0.833) / 2
              // But this is complex. Let's use a simpler approach:
              // Since SVG preserves aspect ratio, y positioning should be: (y / viewBox_height) * container_height
              // But wait, percentages are relative to container, so:
              // Y% = (svg_y / viewBox_height) * 100, then adjust for scaling
              // Actually, let's just use the viewBox directly and see:
              // Calculate positions ON the road path - fine-tuned to sit directly on the road
              // Road path: M 150 850 Q 250 750 350 700 Q 450 650 400 550 Q 350 450 500 400 Q 650 350 600 250 Q 550 150 700 120 Q 850 90 950 100
              // SVG viewBox: 0 0 1200 1000
              // Container: h-[1200px] w-full
              // Adjusting Y positions to account for icon size and ensure they sit ON the road surface
              // Icons are 20px radius (w-20 h-20), so center point needs to be on road center
              const roadPoints = [
                { x: 12.5, y: 82 },       // 2024 - Moved down significantly to sit on road (was 85%)
                { x: 33.33, y: 54 },      // 2025 - Fine-tuned to sit on road
                { x: 50, y: 24 },         // 2026 - Fine-tuned to sit on road
                { x: 79.17, y: 9.5 },     // 2027 - Fine-tuned to sit on road
              ];

              const position = roadPoints[index];
              const isActive = index === currentTimelineIndex;
              const isPast = index < currentTimelineIndex;

              return (
                <div key={index}>
                  {/* Year Icon - Positioned ON the Road */}
                  <motion.div
                    className="absolute cursor-pointer group z-30"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0, y: -50 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -8, 0], // Bouncing effect
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 2 + index * 0.2,
                      type: "spring",
                      stiffness: 100,
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 3 + index * 0.3,
                      }
                    }}
                    whileHover={{
                      scale: 1.3,
                      y: -12,
                      rotateY: 15,
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => setCurrentTimelineIndex(isActive ? -1 : index)}
                  >
                    {/* 3D Drop Shadow with perspective */}
                    <div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-16 w-16 h-8 bg-black/20 rounded-full blur-lg"
                      style={{
                        transform: `translateX(-50%) translateY(64px) scaleX(${isActive ? 1.2 : 1})`,
                      }}
                    ></div>

                    {/* Year Icon Circle - BIGGER SIZE */}
                    <div className="relative" style={{ perspective: "1000px" }}>
                      <motion.div
                        className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 sm:border-3 md:border-4 transition-all duration-500 flex items-center justify-center relative overflow-hidden ${isActive
                          ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 border-white shadow-2xl scale-110 ring-2 sm:ring-4 ring-yellow-300/50"
                          : isPast
                            ? "bg-gradient-to-br from-emerald-500 via-blue-600 to-blue-700 border-white shadow-xl"
                            : "bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700 border-white/80 shadow-lg hover:shadow-xl"
                          }`}
                        style={{
                          boxShadow: isActive
                            ? "0 20px 40px rgba(255, 193, 7, 0.4), 0 0 0 4px rgba(255, 193, 7, 0.3)"
                            : "0 10px 25px rgba(0, 0, 0, 0.2)",
                          transformStyle: "preserve-3d",
                        }}
                        animate={{
                          rotateX: [0, 5, 0],
                          rotateY: [0, 10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      >
                        {/* Inner Icon Circle - BIGGER */}
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full bg-white/95 flex items-center justify-center shadow-inner">
                          <Icon
                            name={
                              index === 0
                                ? "briefcase"
                                : index === 1
                                  ? "users"
                                  : index === 2
                                    ? "globe-alt"
                                    : index === 3
                                      ? "shield"
                                      : index === 4
                                        ? "map"
                                        : index === 5
                                          ? "external-link"
                                          : "cpu"
                            }
                            size="sm"
                            className={`sm:size-md md:size-lg transition-all duration-300 ${isActive
                              ? "text-yellow-700"
                              : isPast
                                ? "text-blue-700"
                                : "text-slate-700"
                              }`}
                          />
                        </div>

                        {/* 3D Highlight Ring */}
                        <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>

                        {/* Active Pulse Animation */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-yellow-300/40 to-orange-400/40 rounded-full"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>

                      {/* Year Label - Positioned above icon */}
                      <motion.div
                        className={`absolute -top-8 sm:-top-10 md:-top-12 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${isActive ? "scale-110" : ""
                          }`}
                        animate={{ y: [0, -2, 0] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      >
                        <div
                          className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all duration-500 ${isActive
                            ? "bg-yellow-400 text-yellow-900 shadow-yellow-400/50"
                            : "bg-white text-slate-800 shadow-slate-500/30"
                            }`}
                          style={{
                            boxShadow: isActive
                              ? "0 8px 25px rgba(255, 193, 7, 0.3)"
                              : "0 4px 15px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {item.year}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Content Card - Only Show When Active */}
                  {isActive && (
                    <motion.div
                      className={`absolute z-40 -translate-x-1/2 ${
                        isMobile 
                          ? 'left-1/2 bottom-5 w-[90%] max-w-[280px]' 
                          : 'w-auto max-w-none'
                      }`}
                      style={isMobile ? {
                        left: '50%',
                        bottom: '20px',
                        transform: 'translateX(-50%)',
                      } : {
                        left: `${position.x + (index % 2 === 0 ? -22 : 22)}%`,
                        top: `${position.y - 5}%`,
                        transform: 'translateX(-50%)',
                      }}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                      }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    >
                      <div className="w-[280px] sm:w-80 bg-white/98 backdrop-blur-xl rounded-xl sm:rounded-2xl border-2 border-yellow-300 ring-2 ring-yellow-400/30 shadow-2xl p-4 sm:p-6 relative max-w-full">
                        {/* Card Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="inline-flex items-center justify-center px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                            {item.year} • Milestone {index + 1}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentTimelineIndex(-1); // Close card
                            }}
                            className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
                          >
                            ×
                          </button>
                        </div>

                        {/* Card Content */}
                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-slate-600 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Card Pointer to Year Icon */}
                        <div
                          className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0
                            ? "right-0 translate-x-full"
                            : "left-0 -translate-x-full"
                            }`}
                        >
                          <div
                            className={`w-0 h-0 ${index % 2 === 0
                              ? "border-l-8 border-l-white/98 border-t-6 border-b-6 border-t-transparent border-b-transparent"
                              : "border-r-8 border-r-white/98 border-t-6 border-b-6 border-t-transparent border-b-transparent"
                              }`}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Navigation Controls */}
            <div className="absolute top-4 sm:top-8 left-2 sm:left-4 md:left-8 z-50">
              <motion.button
                onClick={() => handleTimelineNavigation("prev")}
                disabled={currentTimelineIndex === -1}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/50 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:shadow-xl transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="arrow-right" size="md" className="sm:size-lg rotate-180" />
              </motion.button>
            </div>

            <div className="absolute top-4 sm:top-8 right-2 sm:right-4 md:right-8 z-50">
              <motion.button
                onClick={() => handleTimelineNavigation("next")}
                disabled={currentTimelineIndex === timeline.length - 1}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/50 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:shadow-xl transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="arrow-right" size="md" className="sm:size-lg" />
              </motion.button>
            </div>
          </div>


        </div>
      </SmoothSection>

      {/* Achievements Section */}
      {/* <SmoothSection className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
        <GridBackground className="opacity-5" />

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">Recognition &</span>
              <span className="block bg-gradient-to-r from-blue-700 via-cyan-700 to-indigo-700 bg-clip-text text-transparent">
                Achievements
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Our commitment to excellence has been recognized by industry
              leaders and clients worldwide
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <ProfessionalCard
                key={index}
                delay={index * 0.1}
                hoverEffect="glow"
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[300px] flex flex-col"
              >
                
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${achievement.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon
                    name={achievement.icon as any}
                    size="xl"
                    className="text-white"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {achievement.description}
                  </p>
                </div>
              </ProfessionalCard>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection> */}

      {/* Leadership Section */}
      <SmoothSection className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              <Icon name="users" size="sm" className="mr-2" />
              Leadership Team
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Visionary
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Leadership
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Meet the experienced leaders driving our vision forward with
              passion and expertise
            </p>
            
            {/* Leadership Structure Note */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 max-w-4xl mx-auto mt-8">
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-900">Leadership Structure:</strong> Our leadership includes Head of Innovation & Strategy, Head of Operations & Partnerships, Training & Development Lead, and an Advisory Council providing strategic oversight.
              </p>
            </div>
          </div>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.id}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.005 }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/80 hover:border-emerald-300 min-h-[500px] flex flex-col overflow-hidden">
                  {/* Leadership Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Leadership
                  </div>

                  {/* Avatar Section with Photo */}
                  <div className="relative mb-10 mt-6 flex-shrink-0">
                    <div className="w-full h-60 mx-auto rounded-3xl overflow-hidden shadow-xl ring-4 ring-white group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={leader.photo}
                        alt={`${leader.name} profile photo`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          console.log(`Image failed to load: ${leader.photo}`);
                          // Fallback to avatar if image fails
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    {/* Country Flag */}
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg text-white text-lg">
                      {leader.flag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6 flex-grow min-h-0">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-emerald-700 font-bold text-lg mb-3">
                      {leader.title}
                    </p>
                    <p className="text-slate-500 text-sm mb-4 flex items-center justify-center space-x-2 font-medium">
                      <span>{leader.location}</span>
                      <span>•</span>
                      <span>{leader.country}</span>
                    </p>

                    {/* Bio */}
                    {/* <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                    {leader.bio}
                    </p> */}

                    {/* Quote */}
                    {leader.quote && (
                      <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                        <p className="text-emerald-800 italic text-sm font-medium">
                          "{leader.quote}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  {/* <div className="mb-6 flex-shrink-0">
                  <div className="flex flex-wrap gap-2 justify-center">
                      {leader.skills?.slice(0, 4).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                          className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold hover:from-emerald-100 hover:to-teal-100 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    )) || null}
                  </div>
                  </div> */}

                  {/* Stats */}
                  {/* <div className="flex justify-center space-x-8 mb-6 flex-shrink-0">
                    <div className="text-center">
                      <div className="font-bold text-slate-900 text-lg">
                        {leader.experience}
                </div>
                      <div className="text-slate-500 text-sm">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-slate-900 text-lg">
                        {leader.projects}+
                      </div>
                      <div className="text-slate-500 text-sm">Projects</div>
                    </div>
                  </div> */}

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 mt-auto flex-shrink-0">
                    {leader.social?.linkedin && (
                      <a
                        href={leader.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
                        title="LinkedIn"
                      >
                        <Icon name="linkedin" size="sm" />
                      </a>
                    )}
                    {leader.social?.github && (
                      <a
                        href={leader.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
                        title="GitHub"
                      >
                        <Icon name="github" size="sm" />
                      </a>
                    )}
                    {leader.social?.twitter && (
                      <a
                        href={leader.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-sky-500 hover:bg-sky-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
                        title="Twitter"
                      >
                        <Icon name="twitter" size="sm" />
                      </a>
                    )}
                    {leader.social?.email && (
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${leader.social.email}&su=New Project Inquiry&body=Hi Analyzify360 Team,%0D%0A%0D%0AI'm interested in discussing a project with you.%0D%0A%0D%0AProject details:%0D%0A-%0D%0A-%0D%0A-%0D%0A%0D%0ABest regards`}
                        className="w-8 h-8 bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
                        title="Email"
                        target="_blank"
                      >
                        <Icon name="mail" size="sm" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection>

      {/* Join Our Movement Section */}
      <SmoothSection className="relative py-24 lg:py-32 bg-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              <Icon name="rocket" size="sm" className="mr-2" />
              Join Our Movement
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Let's Build the Future
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                of Work and Technology
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-4 font-medium">
              We're not just building software — we're creating a new model for how talent, training, and technology connect across borders.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12">
              Join us as a partner, mentor, or investor in shaping the next era of hybrid tech innovation.
            </p>
          </div>

          {/* Professional CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Join Our Network Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon name="users" size="xl" className="text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  Join Our Network
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Connect with our global community of engineers, developers, and innovators. Build your career with real projects and mentorship.
                </p>
                
                {/* Button */}
                <motion.button
                  onClick={() => { window.location.href = "/contact"; }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <Icon name="arrow-right" size="sm" />
                </motion.button>
              </div>
            </motion.div>

            {/* Partner With Us Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon name="link" size="xl" className="text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  Partner With Us
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Collaborate with us to deliver cutting-edge solutions. Access our hybrid teams and leverage our expertise for your projects.
                </p>
                
                {/* Button */}
                <motion.button
                  onClick={() => { window.location.href = "/contact"; }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Partner Now</span>
                  <Icon name="arrow-right" size="sm" />
                </motion.button>
              </div>
            </motion.div>

            {/* Invest in Innovation Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon name="chart-bar" size="xl" className="text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                  Invest in Innovation
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Support groundbreaking R&D initiatives. Be part of the next wave of distributed AI, blockchain, and agentic infrastructure.
                </p>
                
                {/* Button */}
                <motion.button
                  onClick={() => { window.location.href = "/contact"; }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Learn More</span>
                  <Icon name="arrow-right" size="sm" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </SmoothSection>

      {/* Quote Block */}
      <SmoothSection className="relative py-24 lg:py-32 bg-white">
        {/* Light Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <div className="bg-white rounded-3xl border border-slate-200 p-12 lg:p-16 shadow-xl">
              <Icon name="chat" size="xl" className="text-blue-600 mx-auto mb-8" />
              <blockquote className="text-2xl lg:text-3xl font-bold text-slate-900 leading-relaxed mb-6">
                "Technology doesn't just connect systems — it connects people.
              </blockquote>
              <p className="text-xl text-slate-700 leading-relaxed font-medium">
                We're building the bridge between potential and progress."
              </p>
            </div>
          </div>
        </div>
      </SmoothSection>
    </div>
  );
}
