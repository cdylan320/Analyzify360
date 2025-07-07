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
import { companyInfo, companyValues, timeline } from "@/data/content";
import { teamMembers } from "@/data/team";

export default function About() {
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

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

  // 3D Timeline Navigation
  const handleTimelineNavigation = (direction: "prev" | "next") => {
    if (direction === "prev" && currentTimelineIndex > 0) {
      setCurrentTimelineIndex(currentTimelineIndex - 1);
    } else if (
      direction === "next" &&
      currentTimelineIndex < timeline.length - 1
    ) {
      setCurrentTimelineIndex(currentTimelineIndex + 1);
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
          {[...Array(15)].map((_, i) => (
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
            {[...Array(8)].map((_, i) => (
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
                    delay: i * 0.5,
                  }}
                />
                <motion.circle
                  cx={Math.random() * 1000}
                  cy={Math.random() * 1000}
                  r="3"
                  fill="#3b82f6"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
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

        {/* Modern Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
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
      <SmoothSection className="relative py-32 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.4),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.3),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.2),transparent_60%)]"></div>
        </div>

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-8 py-4 mb-8 text-sm font-bold text-white bg-white/10 rounded-full border border-white/20 backdrop-blur-2xl shadow-2xl"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
              <span>Our Evolution • 2018-2024</span>
            </motion.div>

            <h2 className="text-5xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="text-white">Business</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Roadmap
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto font-medium">
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

            {/* Pins Positioned ALONG the Serpentine Road Path */}
            {timeline.map((item, index) => {
              // Calculate exact positions along the serpentine road curve
              const roadPoints = [
                { x: 15, y: 85, roadX: 15, roadY: 85 }, // 2018 - start of road
                { x: 23, y: 78, roadX: 23, roadY: 78 }, // 2019 - along first curve
                { x: 35, y: 70, roadX: 35, roadY: 70 }, // 2020 - continuing curve
                { x: 42, y: 55, roadX: 42, roadY: 55 }, // 2021 - curve back
                { x: 50, y: 40, roadX: 50, roadY: 40 }, // 2022 - middle curve
                { x: 60, y: 25, roadX: 60, roadY: 25 }, // 2023 - upper curve
                { x: 80, y: 12, roadX: 80, roadY: 12 }, // 2024 - end of road
              ];

              const position = roadPoints[index];
              const isActive = index === currentTimelineIndex;
              const isPast = index < currentTimelineIndex;

              return (
                <div key={index}>
                  {/* Flag Pole - From Road Surface to Pin */}
                  <motion.div
                    className="absolute z-20"
                    style={{
                      left: `${position.roadX}%`,
                      top: `${position.roadY}%`,
                      transform: "translateX(-50%)",
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 1,
                      delay: 1.5 + index * 0.15,
                      type: "spring",
                    }}
                  >
                    {/* Vertical Flag Pole */}
                    <div
                      className={`w-2 bg-gradient-to-t transition-all duration-500 transform-origin-bottom ${
                        isActive
                          ? "from-orange-600 to-yellow-400 h-24 shadow-xl"
                          : isPast
                          ? "from-blue-600 to-cyan-400 h-20 shadow-lg"
                          : "from-slate-600 to-slate-400 h-16 shadow-md"
                      } rounded-full`}
                    ></div>
                  </motion.div>

                  {/* Business Pin - Connected by Flag Pole */}
                  <motion.div
                    className="absolute cursor-pointer group z-30"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y - (isActive ? 12 : isPast ? 10 : 8)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0, y: -100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: 2 + index * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ scale: 1.15, y: -10 }}
                    onClick={() => setCurrentTimelineIndex(index)}
                  >
                    {/* Pin Drop Shadow */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-black/40 rounded-full blur-lg"></div>

                    {/* Professional Business Pin */}
                    <div className="relative">
                      {/* Pin Outer Ring */}
                      <div
                        className={`w-24 h-24 rounded-full border-4 transition-all duration-500 flex items-center justify-center relative overflow-hidden ${
                          isActive
                            ? "bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 border-white shadow-2xl scale-110"
                            : isPast
                            ? "bg-gradient-to-br from-emerald-400 via-blue-500 to-blue-600 border-white/90 shadow-xl"
                            : "bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700 border-white/70 shadow-lg"
                        }`}
                      >
                        {/* Pin Inner Circle */}
                        <div
                          className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? "bg-white border-yellow-200"
                              : "bg-white/95 border-white/50"
                          }`}
                        >
                          {/* Pin Icon */}
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
                            className={`transition-all duration-300 ${
                              isActive
                                ? "text-yellow-600 scale-110"
                                : isPast
                                ? "text-blue-600"
                                : "text-slate-600"
                            }`}
                          />
                        </div>

                        {/* Active Glow */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-orange-300/50 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    {/* Year Label */}
                    <div
                      className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                        isActive ? "scale-110 z-40" : "z-30"
                      }`}
                    >
                      <div
                        className={`px-3 py-2 rounded-xl font-bold text-sm shadow-xl transition-all duration-500 ${
                          isActive
                            ? "bg-yellow-400 text-yellow-900 shadow-yellow-400/50"
                            : "bg-white text-slate-800 shadow-lg"
                        }`}
                      >
                        {item.year}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Cards - Positioned Around the Serpentine Path */}
                  <motion.div
                    className="absolute z-25"
                    style={{
                      left: `${position.x + (index % 2 === 0 ? -25 : 25)}%`,
                      top: `${position.y - 8}%`,
                      transform: "translateX(-50%)",
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      x: index % 2 === 0 ? 50 : -50,
                    }}
                    animate={{
                      opacity: isActive ? 1 : 0.85,
                      scale: isActive ? 1.02 : 0.9,
                      x: 0,
                    }}
                    transition={{ duration: 0.8, delay: 2.5 + index * 0.1 }}
                  >
                    <div
                      className={`w-72 bg-white/95 backdrop-blur-xl rounded-xl border-2 shadow-2xl transition-all duration-500 ${
                        isActive
                          ? "border-yellow-300 ring-2 ring-yellow-400/30"
                          : "border-white/40"
                      } p-5 relative`}
                    >
                      <div
                        className={`inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full text-xs font-bold transition-all duration-500 ${
                          isActive
                            ? "bg-yellow-400 text-yellow-900"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.year} • Milestone {index + 1}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 leading-relaxed text-sm">
                        {item.description}
                      </p>

                      {/* Card Pointer to Pin */}
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 ${
                          index % 2 === 0
                            ? "right-0 translate-x-full"
                            : "left-0 -translate-x-full"
                        }`}
                      >
                        <div
                          className={`w-0 h-0 ${
                            index % 2 === 0
                              ? "border-l-6 border-l-white/95 border-t-4 border-b-4 border-t-transparent border-b-transparent"
                              : "border-r-6 border-r-white/95 border-t-4 border-b-4 border-t-transparent border-b-transparent"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}

            {/* Navigation Controls */}
            <div className="absolute top-8 left-8 z-50">
              <motion.button
                onClick={() => handleTimelineNavigation("prev")}
                disabled={currentTimelineIndex === 0}
                className="w-14 h-14 bg-white/95 backdrop-blur-xl rounded-xl border border-white/50 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:shadow-xl transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="arrow-right" size="lg" className="rotate-180" />
              </motion.button>
            </div>

            <div className="absolute top-8 right-8 z-50">
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

          {/* Progress Indicator */}
          <div className="flex justify-center mt-16 mb-8">
            <div className="flex space-x-3 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/30 shadow-xl">
              {timeline.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTimelineIndex
                      ? "bg-yellow-400 w-8 shadow-lg"
                      : index < currentTimelineIndex
                      ? "bg-emerald-400"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  onClick={() => setCurrentTimelineIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-2xl rounded-xl border border-white/30 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">
                    Follow the serpentine road journey
                  </span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/30"></div>
                <div className="flex items-center space-x-2">
                  <Icon
                    name="arrow-right"
                    size="sm"
                    className="text-blue-400"
                  />
                  <span className="font-medium">Click pins along the path</span>
                </div>
              </div>
            </div>
          </motion.div>
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
