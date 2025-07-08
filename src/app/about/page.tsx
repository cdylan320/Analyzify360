"use client";

import React, { useState, useRef, useEffect } from "react";
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
import { companyInfo, companyValues, timeline } from "@/data/content";
import { teamMembers } from "@/data/team";

export default function About() {
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Pre-computed values for consistent SSR/CSR
  const particlePositions = useRef<Array<{ left: number, top: number, x: number, duration: number, delay: number }>>([]);
  const networkElements = useRef<Array<{ x1: number, y1: number, x2: number, y2: number, cx: number, cy: number }>>([]);

  useEffect(() => {
    setIsClient(true);

    // Generate particle positions once on client side
    particlePositions.current = Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      x: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));

    // Generate network element positions once on client side
    networkElements.current = Array.from({ length: 8 }, () => ({
      x1: Math.random() * 1000,
      y1: Math.random() * 1000,
      x2: Math.random() * 1000,
      y2: Math.random() * 1000,
      cx: Math.random() * 1000,
      cy: Math.random() * 1000,
    }));
  }, []);

  const leadership = teamMembers.filter(
    (member) =>
      member.role === "client" &&
      (member.title.includes("Partner") || member.title.includes("Lead"))
  );

  const stats = [
    { value: "150+", label: "Projects Delivered", icon: "briefcase" },
    { value: "50+", label: "Happy Clients", icon: "users" },
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
      description: "98% client retention rate with measurable business impact",
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

  const handleMouseMove = (e: React.MouseEvent) => {
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

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isClient && particlePositions.current.map((position, index) => (
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
            {isClient && networkElements.current.map((element, index) => (
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
                Shaping Digital Excellence Since 2018
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
                  Today
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
                  {companyInfo.mission}
                </p>
              </div>
            </motion.div>

            {/* Modern CTA Buttons */}
            <motion.div
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
            </motion.div>
          </div>
        </div>

      </motion.section>

      {/* Statistics Section */}
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
      </SmoothSection>

      {/* Company Values */}
      <SmoothSection className="relative py-24 bg-white">
        <GridBackground className="opacity-5" />

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-6 py-3 mb-6 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200/80 shadow-lg"
            >
              <Icon name="heart" size="sm" className="mr-2 text-blue-600" />
              <span className="text-blue-800">Our Values</span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">What Drives</span>
              <span className="block bg-gradient-to-r from-blue-700 via-cyan-700 to-indigo-700 bg-clip-text text-transparent">
                Everything We Do
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              The principles that guide everything we do and define who we are
              as a company
            </p>
          </AnimatedSection>

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

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-8 py-4 mt-8 mb-6 text-sm font-bold text-white bg-slate-800/80 rounded-full border border-white/60 backdrop-blur-2xl shadow-2xl"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse drop-shadow-sm"></div>
              <span style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}>Our Evolution • 2018-2024</span>
            </motion.div>

            <h2 className="text-5xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="text-white" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)" }}>Business</span>
              <span className="block text-white" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)" }}>
                Roadmap
              </span>
            </h2>

            <p className="text-white text-xl leading-relaxed max-w-4xl mx-auto font-semibold" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)" }}>
              Navigate through our 7-year serpentine journey of innovation and
              growth
            </p>
          </AnimatedSection>

          {/* Serpentine Timeline Container */}
          <div className="relative h-[1200px] w-full max-w-7xl mx-auto">
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

            {/* Year Icons Positioned ABOVE the Serpentine Road Path */}
            {timeline.map((item, index) => {
              // Calculate positions ABOVE the serpentine road curve (following red arrows)
              const roadPoints = [
                { x: 10, y: 78 }, // 2018 - ABOVE start of road
                { x: 22, y: 68 }, // 2019 - ABOVE first curve  
                { x: 31, y: 60 }, // 2020 - ABOVE continuing curve
                { x: 30, y: 45 }, // 2021 - ABOVE curve back
                { x: 47, y: 30 }, // 2022 - ABOVE middle curve
                { x: 60, y: 13 }, // 2023 - ABOVE upper curve
                { x: 75, y: 11 },  // 2024 - ABOVE end of road
              ];

              const position = roadPoints[index];
              const isActive = index === currentTimelineIndex;
              const isPast = index < currentTimelineIndex;

              return (
                <div key={index}>
                  {/* Year Icon - Positioned ABOVE the Road */}
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
                        className={`w-20 h-20 rounded-full border-4 transition-all duration-500 flex items-center justify-center relative overflow-hidden ${isActive
                          ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 border-white shadow-2xl scale-110 ring-4 ring-yellow-300/50"
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
                        <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-inner">
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
                            size="lg"
                            className={`transition-all duration-300 ${isActive
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
                        className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${isActive ? "scale-110" : ""
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
                          className={`px-4 py-2 rounded-xl font-bold text-sm shadow-xl transition-all duration-500 ${isActive
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
                      className="absolute z-40"
                      style={{
                        left: `${position.x + (index % 2 === 0 ? -22 : 22)}%`,
                        top: `${position.y - 5}%`,
                        transform: "translateX(-50%)",
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
                      <div className="w-80 bg-white/98 backdrop-blur-xl rounded-2xl border-2 border-yellow-300 ring-2 ring-yellow-400/30 shadow-2xl p-6 relative">
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
            <div className="absolute top-108 left-8 z-50">
              <motion.button
                onClick={() => handleTimelineNavigation("prev")}
                disabled={currentTimelineIndex === -1}
                className="w-14 h-14 bg-white/95 backdrop-blur-xl rounded-xl border border-white/50 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:shadow-xl transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="arrow-right" size="lg" className="rotate-180" />
              </motion.button>
            </div>

            <div className="absolute top-108 right-8 z-50">
              <motion.button
                onClick={() => handleTimelineNavigation("next")}
                disabled={currentTimelineIndex === timeline.length - 1}
                className="w-14 h-14 bg-white/95 backdrop-blur-xl rounded-xl border border-white/50 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:shadow-xl transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="arrow-right" size="lg" />
              </motion.button>
            </div>
          </div>


        </div>
      </SmoothSection>

      {/* Achievements Section */}
      <SmoothSection className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
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
                {/* Icon */}
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${achievement.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon
                    name={achievement.icon as any}
                    size="xl"
                    className="text-white"
                  />
                </div>

                {/* Content */}
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
      </SmoothSection>

      {/* Leadership Section */}
      <SmoothSection className="relative py-24 bg-white">
        <GridBackground className="opacity-5" />

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-6 py-3 mb-6 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200/80 shadow-lg"
            >
              <Icon name="users" size="sm" className="mr-2 text-emerald-600" />
              <span className="text-emerald-800">Leadership Team</span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">Visionary</span>
              <span className="block bg-gradient-to-r from-emerald-700 via-cyan-700 to-blue-700 bg-clip-text text-transparent">
                Leadership
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Meet the experienced leaders driving our vision forward with
              passion and expertise
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <ProfessionalCard
                key={leader.id}
                delay={index * 0.1}
                hoverEffect="lift"
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[420px] flex flex-col"
              >
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                    {leader.avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg text-white text-sm font-bold">
                    {leader.flag}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-blue-700 font-semibold mb-2">
                    {leader.title}
                  </p>
                  <p className="text-sm text-slate-500 mb-4 flex items-center justify-center space-x-1 font-medium">
                    <span>{leader.location}</span>
                  </p>

                  <p className="text-slate-600 leading-relaxed mb-4 flex-1 font-medium">
                    {leader.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {leader.skills?.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200"
                      >
                        {skill}
                      </span>
                    )) || null}
                  </div>
                </div>
              </ProfessionalCard>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection>
    </div>
  );
}
