"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
import { services, workflowSteps } from "@/data/services";

export default function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const workflowRef = useRef<HTMLDivElement>(null);
  const workflowInView = useInView(workflowRef, { once: true });

  // Ensure client-side only rendering for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Predefined positions to avoid Math.random() hydration issues
  const floatingIconPositions = [
    { left: 10, top: 20 },
    { left: 80, top: 15 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 25, top: 45 },
    { left: 70, top: 80 },
    { left: 45, top: 25 },
    { left: 60, top: 55 },
    { left: 30, top: 85 },
    { left: 85, top: 35 },
    { left: 5, top: 50 },
    { left: 95, top: 75 },
    { left: 40, top: 10 },
    { left: 75, top: 30 },
    { left: 20, top: 90 },
    { left: 55, top: 65 },
    { left: 35, top: 5 },
    { left: 65, top: 40 },
    { left: 50, top: 95 },
    { left: 12, top: 35 },
  ];

  const networkNodes = [
    { x: 200, y: 150, x2: 800, y2: 300 },
    { x: 150, y: 400, x2: 750, y2: 200 },
    { x: 300, y: 600, x2: 600, y2: 100 },
    { x: 700, y: 700, x2: 200, y2: 400 },
    { x: 500, y: 200, x2: 900, y2: 500 },
    { x: 100, y: 300, x2: 400, y2: 800 },
    { x: 800, y: 100, x2: 300, y2: 600 },
    { x: 400, y: 500, x2: 700, y2: 900 },
    { x: 600, y: 800, x2: 100, y2: 200 },
    { x: 900, y: 400, x2: 500, y2: 700 },
    { x: 250, y: 750, x2: 650, y2: 350 },
    { x: 750, y: 250, x2: 350, y2: 650 },
  ];

  const circlePositions = [
    { cx: 150, cy: 200 },
    { cx: 300, cy: 400 },
    { cx: 500, cy: 150 },
    { cx: 700, cy: 600 },
    { cx: 200, cy: 700 },
    { cx: 800, cy: 300 },
    { cx: 400, cy: 800 },
    { cx: 600, cy: 100 },
    { cx: 100, cy: 500 },
    { cx: 900, cy: 450 },
    { cx: 350, cy: 250 },
    { cx: 650, cy: 750 },
  ];

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const openServiceModal = (service: any) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "unset";
  };

  const serviceColors = {
    ai: "from-purple-600 to-blue-600",
    blockchain: "from-amber-500 to-orange-600",
    fullstack: "from-emerald-500 to-teal-600",
    design: "from-rose-500 to-pink-600",
  };

  const serviceIcons = {
    ai: "cpu",
    blockchain: "shield-check",
    fullstack: "desktop-computer",
    design: "light-bulb",
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Ultra Modern Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Advanced Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"></div>

        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.4),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(16,185,129,0.3),transparent_50%)] animate-pulse delay-1000"></div>
        </div>

        {/* Floating Tech Icons - Client-side only */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingIconPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  x: [0, i % 2 === 0 ? 15 : -15, 0],
                  rotate: [0, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 15 + i * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Icon
                  name={
                    ["cpu", "shield-check", "desktop-computer", "light-bulb"][
                    i % 4
                    ] as any
                  }
                  size="lg"
                  className="text-blue-400/20"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Neural Network Background - Client-side only */}
        {mounted && (
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1000 1000">
              <defs>
                <linearGradient
                  id="networkGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {networkNodes.map((node, i) => (
                <g key={i}>
                  <motion.line
                    x1={node.x}
                    y1={node.y}
                    x2={node.x2}
                    y2={node.y2}
                    stroke="url(#networkGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.3,
                    }}
                  />
                  <motion.circle
                    cx={circlePositions[i]?.cx || 500}
                    cy={circlePositions[i]?.cy || 500}
                    r="4"
                    fill="#3b82f6"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                </g>
              ))}
            </svg>
          </div>
        )}

        <div className="relative z-20 w-[95%] mx-auto px-4 lg:px-8 py-20">
          <div className="text-center max-w-7xl mx-auto">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="inline-flex items-center justify-center px-8 py-4 mb-12 text-sm font-bold text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-2xl shadow-2xl"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Cutting-Edge Solutions • Modern Technology
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
                <span className="block text-white drop-shadow-2xl">Our</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
                  Services
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl font-light text-white/70 mb-8">
                Excellence in Every Solution
              </p>
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
                  We deliver cutting-edge solutions across AI, blockchain,
                  full-stack development, and design. From concept to
                  deployment, we transform your vision into reality with proven
                  expertise and innovative technology.
                </p>
              </div>
            </motion.div>

            {/* Services Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            >
              {[
                { value: "4", label: "Core Services", icon: "briefcase" },
                { value: "12+", label: "Projects", icon: "chart-bar" },
                { value: "24/7", label: "Support", icon: "shield" },
                { value: "100%", label: "Satisfaction", icon: "heart" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center group hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      name={stat.icon as any}
                      size="md"
                      className="text-white"
                    />
                  </div>
                  <div className="text-2xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>


          </div>
        </div>


      </motion.section>

      {/* Premium Services Grid */}
      <SmoothSection className="relative py-32 bg-gradient-to-b from-white to-slate-50">
        <GridBackground className="opacity-5" />

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-6 py-3 mb-6 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200/80 shadow-lg"
            >
              <Icon name="briefcase" size="sm" className="mr-2 text-blue-600" />
              <span className="text-blue-800">Our Expertise</span>
            </motion.div>

            <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-slate-900">Premium</span>
              <span className="block bg-gradient-to-r from-blue-700 via-purple-700 to-emerald-700 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-8"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-medium">
              From AI-powered innovations to blockchain solutions, we deliver
              enterprise-grade services that drive measurable business results
              and competitive advantage.
            </p>
          </AnimatedSection>

          {/* Services Grid */}
          <StaggeredContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => openServiceModal(service)}
              >
                <ProfessionalCard
                  delay={index * 0.2}
                  hoverEffect="lift"
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 cursor-pointer relative overflow-hidden min-h-[600px]"
                >
                  {/* Background Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${serviceColors[service.id as keyof typeof serviceColors]
                      } opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${serviceColors[
                          service.id as keyof typeof serviceColors
                        ]
                          } rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon
                          name={
                            serviceIcons[
                            service.id as keyof typeof serviceIcons
                            ] as any
                          }
                          size="xl"
                          className="text-white"
                        />
                      </div>
                      <motion.div
                        className="text-slate-400 group-hover:text-blue-600 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon name="external-link" size="lg" />
                      </motion.div>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-8">
                      <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-lg text-slate-600 font-medium leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Core Capabilities */}
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        Core Capabilities
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {service.capabilities
                          .slice(0, 4)
                          .map((capability, capIndex) => (
                            <motion.div
                              key={capIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: capIndex * 0.1 }}
                              className="flex items-center space-x-3 group/item"
                            >
                              <div
                                className={`w-6 h-6 bg-gradient-to-br ${serviceColors[
                                  service.id as keyof typeof serviceColors
                                ]
                                  } rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200`}
                              >
                                <Icon
                                  name="check"
                                  size="sm"
                                  className="text-white"
                                />
                              </div>
                              <span className="text-slate-700 font-medium group-hover/item:text-slate-900 transition-colors">
                                {capability}
                              </span>
                            </motion.div>
                          ))}
                        {service.capabilities.length > 4 && (
                          <div className="flex items-center space-x-3 text-slate-500">
                            <div className="w-6 h-6 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold">+</span>
                            </div>
                            <span className="font-medium">
                              +{service.capabilities.length - 4} more
                              capabilities
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-6 mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-bold group-hover:text-blue-700 transition-colors">
                          Learn More & View Details
                        </span>
                        <motion.div
                          className="text-blue-600"
                          animate={{ x: hoveredService === service.id ? 5 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon name="arrow-right" size="md" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </ProfessionalCard>
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection>

      {/* Premium Workflow Process Section */}
      <SmoothSection className="relative py-32 bg-white">
        <GridBackground className="opacity-5" />

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-6 py-3 mb-6 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200/80 shadow-lg"
            >
              <Icon name="zap" size="sm" className="mr-2 text-emerald-600" />
              <span className="text-emerald-800">Our Process</span>
            </motion.div>

            <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-slate-900">How We</span>
              <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Deliver Excellence
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mx-auto mb-8"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-medium">
              Our battle-tested 6-step methodology ensures flawless execution
              from initial concept to ongoing success, delivering results that
              exceed expectations every time.
            </p>
          </AnimatedSection>

          {/* Enhanced Workflow Timeline */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-blue-200 to-purple-200 rounded-full transform -translate-y-1/2 z-0"></div>

            {/* Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[380px] flex flex-col relative overflow-hidden group-hover:-translate-y-2">
                    {/* Card Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Step Number Badge */}
                    <div className="relative z-10 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <span className="text-white font-black text-2xl">
                          {step.number}
                        </span>
                      </div>
                      {/* Connection Dot for Timeline */}
                      <div className="hidden lg:block absolute -right-4 top-1/2 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transform -translate-y-1/2 shadow-lg"></div>
                    </div>

                    {/* Step Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-slate-600 leading-relaxed font-medium flex-1 mb-6">
                        {step.description}
                      </p>

                      {/* Step Icon */}
                      <div className="mt-auto">
                        <div className="w-16 h-16 bg-slate-100 group-hover:bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300">
                          <Icon
                            name={step.icon as any}
                            size="xl"
                            className="text-slate-600 group-hover:text-emerald-600 transition-colors duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-24"
          >
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl border border-slate-200/80 p-8 lg:p-12 shadow-xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                  Proven Track Record
                </h3>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Our systematic approach delivers consistent, measurable
                  results across all projects
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "clock",
                    title: "On-Time Delivery",
                    metric: "98%",
                    desc: "Projects completed on schedule",
                    color: "from-emerald-500 to-teal-600",
                  },
                  {
                    icon: "shield-check",
                    title: "Quality Excellence",
                    metric: "100%",
                    desc: "Zero critical bugs in production",
                    color: "from-blue-500 to-indigo-600",
                  },
                  {
                    icon: "heart",
                    title: "Client Satisfaction",
                    metric: "100%",
                    desc: "Client retention and referrals",
                    color: "from-purple-500 to-pink-600",
                  },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${metric.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <Icon
                        name={metric.icon as any}
                        size="xl"
                        className="text-white"
                      />
                    </div>
                    <div className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">
                      {metric.metric}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {metric.title}
                    </h4>
                    <p className="text-slate-600 text-sm font-medium">
                      {metric.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SmoothSection>

      {/* Enhanced Service Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeServiceModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 lg:p-12">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center space-x-6">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${serviceColors[
                      selectedService.id as keyof typeof serviceColors
                    ]
                      } rounded-3xl flex items-center justify-center shadow-xl`}
                  >
                    <Icon
                      name={
                        serviceIcons[
                        selectedService.id as keyof typeof serviceIcons
                        ] as any
                      }
                      size="2xl"
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">
                      {selectedService.title}
                    </h2>
                    <p className="text-xl text-slate-600 font-medium">
                      {selectedService.description}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={closeServiceModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:text-slate-800 transition-all duration-200"
                >
                  <Icon name="close" size="lg" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Core Capabilities */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <div
                      className={`w-3 h-3 bg-gradient-to-r ${serviceColors[
                        selectedService.id as keyof typeof serviceColors
                      ]
                        } rounded-full mr-3`}
                    ></div>
                    Core Capabilities
                  </h3>
                  <div className="space-y-4">
                    {selectedService.capabilities.map(
                      (capability: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4 group"
                        >
                          <div
                            className={`w-8 h-8 bg-gradient-to-br ${serviceColors[
                              selectedService.id as keyof typeof serviceColors
                            ]
                              } rounded-xl flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200`}
                          >
                            <Icon
                              name="check"
                              size="sm"
                              className="text-white"
                            />
                          </div>
                          <span className="text-slate-700 font-medium leading-relaxed">
                            {capability}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <div
                      className={`w-3 h-3 bg-gradient-to-r ${serviceColors[
                        selectedService.id as keyof typeof serviceColors
                      ]
                        } rounded-full mr-3`}
                    ></div>
                    Key Features
                  </h3>
                  <div className="space-y-4">
                    {selectedService.features.map(
                      (feature: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4 group"
                        >
                          <div
                            className={`w-8 h-8 bg-gradient-to-br ${serviceColors[
                              selectedService.id as keyof typeof serviceColors
                            ]
                              } rounded-xl flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200`}
                          >
                            <Icon
                              name="heart"
                              size="sm"
                              className="text-white"
                            />
                          </div>
                          <span className="text-slate-700 font-medium leading-relaxed">
                            {feature}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Modal CTA */}
              {/* <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 bg-gradient-to-r ${serviceColors[
                    selectedService.id as keyof typeof serviceColors
                  ]
                    } rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Start Your Project</span>
                    <Icon name="arrow-right" size="md" />
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-800 transition-all duration-300"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Request Consultation</span>
                    <Icon name="calendar" size="md" />
                  </span>
                </motion.button>
              </div> */}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Premium CTA Section */}
      <SmoothSection className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <GridBackground className="opacity-10" />

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-6 py-3 mb-8 text-sm font-bold text-purple-700 bg-purple-50 rounded-full border border-purple-200/80 shadow-lg"
            >
              <Icon name="rocket" size="sm" className="mr-2 text-purple-600" />
              <span className="text-purple-800">
                Ready to Transform Your Vision?
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-5xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="text-slate-900">Ready to</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Get Started?
                </span>
              </h2>

              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full mx-auto mb-8"></div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 p-8 shadow-xl max-w-4xl mx-auto">
                <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
                  Transform your vision into reality with our expert team. Let's
                  discuss your project and create something{" "}
                  <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold">
                    extraordinary
                  </span>{" "}
                  together.
                </p>
              </div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.button
                onClick={() => {
                  window.location.href = "/careers#contact";
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-white/80 backdrop-blur-xl rounded-3xl font-bold text-slate-800 border-2 border-slate-200 hover:border-purple-300 hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-3 text-lg group-hover:text-purple-700 transition-colors">
                  <Icon name="users" size="lg" />
                  <span>Contact to Us</span>
                  <Icon name="external-link" size="md" />
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                {
                  icon: "shield-check",
                  title: "Enterprise Security",
                  desc: "Bank-grade protection",
                },
                {
                  icon: "clock",
                  title: "Fast Delivery",
                  desc: "Launch in weeks, not months",
                },
                {
                  icon: "heart",
                  title: "Dedicated Support",
                  desc: "24/7 expert assistance",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 p-6 text-center group hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      name={feature.icon as any}
                      size="md"
                      className="text-white"
                    />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </SmoothSection>
    </div>
  );
}