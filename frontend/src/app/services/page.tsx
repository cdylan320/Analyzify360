"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  AnimatedSection,
  StaggeredContainer,
  SmoothSection,
  ProfessionalCard,
  GridBackground,
  Icon,
  Button,
} from "@/components";
import { serviceCategories, workflowSteps, type Service } from "@/data/services";

export default function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const openServiceModal = (service: any) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "unset";
  };

  const getServiceColor = (service: Service) => {
    const colorMap: Record<string, { 
      gradient: string; 
      bg: string; 
      accent: string;
      iconGradient: string;
      iconShadow: string;
    }> = {
      core: {
        gradient: "from-blue-600 to-cyan-600",
        bg: "bg-blue-500/10",
        accent: "text-blue-700",
        iconGradient: "from-blue-600 via-blue-500 to-cyan-500",
        iconShadow: "shadow-blue-500/50",
      },
      ai: {
        gradient: "from-purple-600 to-pink-600",
        bg: "bg-purple-500/10",
        accent: "text-purple-700",
        iconGradient: "from-purple-600 via-purple-500 to-pink-500",
        iconShadow: "shadow-purple-500/50",
      },
      training: {
        gradient: "from-emerald-600 to-teal-600",
        bg: "bg-emerald-500/10",
        accent: "text-emerald-700",
        iconGradient: "from-emerald-600 via-emerald-500 to-teal-500",
        iconShadow: "shadow-emerald-500/50",
      },
      innovation: {
        gradient: "from-amber-600 to-orange-600",
        bg: "bg-amber-500/10",
        accent: "text-amber-700",
        iconGradient: "from-amber-600 via-amber-500 to-orange-500",
        iconShadow: "shadow-amber-500/50",
      },
      managed: {
        gradient: "from-indigo-600 to-blue-600",
        bg: "bg-indigo-500/10",
        accent: "text-indigo-700",
        iconGradient: "from-indigo-600 via-indigo-500 to-blue-500",
        iconShadow: "shadow-indigo-500/50",
      },
    };
    return colorMap[service.category || 'core'] || colorMap.core;
  };

  return (
    <div className="pt-16 overflow-hidden bg-white">
      {/* Artistic Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Layered Abstract Background */}
        <div className="absolute inset-0">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950"></div>
          
          {/* Animated Mesh Gradients */}
          {mounted && (
            <>
              <motion.div
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[150px]"
                animate={{
                  x: [0, -80, 0],
                  y: [0, -60, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}

          {/* Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-white/10 rounded-full"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  left: `${10 + i * 8}%`,
                  top: `${5 + i * 7}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                  duration: 20 + i * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 w-[95%] mx-auto px-4 lg:px-8 py-20">
          <div className="text-center max-w-7xl mx-auto">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="inline-flex items-center justify-center px-6 py-3 mb-12 text-xs font-semibold text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-2xl shadow-2xl tracking-wide"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent uppercase tracking-wider">
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
                <span className="block text-white drop-shadow-2xl">Comprehensive Hybrid</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
                  Technology Services
                </span>
              </h1>
              <p className="text-lg lg:text-xl font-normal text-white/80 mb-6 leading-relaxed max-w-3xl mx-auto">
                From concept to code — we deliver end-to-end digital solutions through our unique Technology-as-a-Service (TaaS) model, combining global technical excellence with local collaboration.
              </p>
            </motion.div>

            {/* Glassmorphism Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 lg:p-8 shadow-2xl">
                <p className="text-base lg:text-lg leading-relaxed text-white/75 font-normal">
                  Our Hybrid TaaS + Innovation Pipeline combines delivery, R&D, and talent growth — delivering comprehensive technology solutions that evolve with your business.
                </p>
              </div>
            </motion.div>

            {/* Services Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="grid grid-cols-3 gap-4 lg:gap-6 mb-16 max-w-4xl mx-auto"
            >
              {[
                { value: "5", label: "Service Categories", icon: "briefcase" },
                { value: "18+", label: "Services", icon: "chart-bar" },
                { value: "24/7", label: "Support", icon: "shield" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5 lg:p-6 text-center group hover:bg-white/15 transition-all duration-300"
                >
                  <motion.div
                    className="relative group/statIcon mb-3"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Outer Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-lg opacity-0 group-hover/statIcon:opacity-50 transition-opacity duration-300"></div>
                    
                    {/* Icon Container */}
                    <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/50 group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Inner Shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-xl"></div>
                      
                      <Icon
                        name={stat.icon as any}
                        size="md"
                        className="text-white relative z-10 drop-shadow-md"
                        strokeWidth={2.5}
                      />
                    </div>
                  </motion.div>
                  <div className="text-3xl lg:text-4xl font-black text-white mb-1.5 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-xs lg:text-sm font-medium leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Service Categories */}
      {serviceCategories.map((category, categoryIndex) => {
        const colors = getServiceColor(category.services[0] || { category: category.id } as Service);

        return (
          <SmoothSection
            key={category.id}
            className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white"
          >
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
              {/* Section Header */}
              <AnimatedSection className="text-center mb-20">
                <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
                  <Icon 
                    name={
                      category.id === 'core' ? 'briefcase' :
                      category.id === 'ai' ? 'chip' :
                      category.id === 'training' ? 'academic-cap' :
                      category.id === 'innovation' ? 'light-bulb' :
                      'handshake'
                    } 
                    size="sm" 
                    className="mr-2" 
                    strokeWidth={2}
                  />
                  {category.title}
                </div>

                <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                  {category.title.split(" (")[0]}
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>

                <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
                  {category.tagline}
                </p>
              </AnimatedSection>

              {/* Services Grid */}
              <StaggeredContainer className={`grid grid-cols-1 md:grid-cols-2 ${category.services.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
                {category.services.map((service, index) => {
                  const serviceColors = getServiceColor(service);

                  return (
                    <div
                      key={service.id}
                      onMouseEnter={() => setHoveredService(service.id)}
                      onMouseLeave={() => setHoveredService(null)}
                      onClick={() => openServiceModal(service)}
                    >
                      <ProfessionalCard
                        delay={index * 0.15}
                        hoverEffect="lift"
                        className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 p-8 cursor-pointer relative overflow-hidden h-full flex flex-col"
                      >
                        {/* Card Background Gradient */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${serviceColors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                        ></div>

                        {/* Card Content */}
                        <div className="relative z-10 flex-1 flex flex-col">
                          {/* Professional Icon */}
                          <div className="flex items-center justify-between mb-6">
                            <motion.div
                              className="relative group/icon"
                              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Outer Glow */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${serviceColors.iconGradient} rounded-2xl blur-xl opacity-0 group-hover/icon:opacity-60 transition-opacity duration-300`}></div>
                              
                              {/* Icon Container */}
                              <div className={`relative w-20 h-20 bg-gradient-to-br ${serviceColors.iconGradient} rounded-2xl flex items-center justify-center shadow-xl ${serviceColors.iconShadow} group-hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                                {/* Inner Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-2xl"></div>
                                
                                {/* Subtle Pattern */}
                                <div className="absolute inset-0 opacity-20">
                                  <div className="absolute inset-0" style={{
                                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                    backgroundSize: '4px 4px'
                                  }}></div>
                                </div>
                                
                                {/* Icon */}
                                <Icon
                                  name={service.icon as any}
                                  size="xl"
                                  className="text-white relative z-10 drop-shadow-lg"
                                  strokeWidth={2.5}
                                />
                              </div>
                            </motion.div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className="text-slate-600 leading-relaxed mb-6 text-sm flex-1">
                            {service.description}
                          </p>

                          {/* Technologies/Tags */}
                          {service.technologies && service.technologies.length > 0 && (
                            <div className="mt-auto">
                              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center">
                                <Icon name="code" size="sm" className="mr-2 text-slate-400" strokeWidth={2} />
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {service.technologies.slice(0, 3).map((tech, techIndex) => {
                                  const getBorderColor = () => {
                                    switch(service.category) {
                                      case 'core': return 'border-blue-200 hover:border-blue-400';
                                      case 'ai': return 'border-purple-200 hover:border-purple-400';
                                      case 'training': return 'border-emerald-200 hover:border-emerald-400';
                                      case 'innovation': return 'border-amber-200 hover:border-amber-400';
                                      case 'managed': return 'border-indigo-200 hover:border-indigo-400';
                                      default: return 'border-blue-200 hover:border-blue-400';
                                    }
                                  };
                                  return (
                                    <motion.span
                                      key={techIndex}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: techIndex * 0.05 }}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border-2 ${getBorderColor()} transition-all duration-200 shadow-sm hover:shadow-md`}
                                    >
                                      {tech}
                                    </motion.span>
                                  );
                                })}
                                {service.technologies.length > 3 && (
                                  <span className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-50 border-2 border-slate-200 hover:border-slate-300 transition-colors duration-200">
                                    +{service.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* CTA */}
                          <div className="mt-6 pt-4 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                              <span className={`${serviceColors.accent} font-bold group-hover:opacity-80 transition-opacity text-sm`}>
                                Learn More
                              </span>
                              <motion.div
                                animate={{ x: hoveredService === service.id ? 5 : 0 }}
                                transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                                className={`${serviceColors.accent}`}
                              >
                                <Icon name="arrow-right" size="md" strokeWidth={2.5} />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </ProfessionalCard>
                    </div>
                  );
                })}
              </StaggeredContainer>
            </div>
          </SmoothSection>
        );
      })}

      {/* How We Deliver Innovation Section */}
      <SmoothSection className="relative py-24 lg:py-32 bg-white">
        {/* Light Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              <Icon name="zap" size="sm" className="mr-2" />
              Our Process
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              How We Deliver
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Our 6-stage hybrid delivery framework fuses technology, agility, and learning — ensuring every project evolves from concept to continuous intelligence.
            </p>
          </AnimatedSection>

          {/* Enhanced Workflow Timeline */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full transform -translate-y-1/2 z-0"></div>

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
                      <motion.div
                        className="relative group/badge"
                        whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Outer Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover/badge:opacity-50 transition-opacity duration-300"></div>
                        
                        {/* Badge Container */}
                        <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/50 group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                          {/* Inner Shine */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-3xl"></div>
                          
                          <span className="text-white font-black text-2xl relative z-10 drop-shadow-lg">
                            {step.number}
                          </span>
                        </div>
                      </motion.div>
                      {/* Connection Dot for Timeline */}
                      <div className="hidden lg:block absolute -right-4 top-1/2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transform -translate-y-1/2 shadow-lg border-2 border-white"></div>
                    </div>

                    {/* Step Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-slate-600 leading-relaxed font-medium mb-3">
                        {step.description}
                      </p>
                      
                      {step.subtext && (
                        <p className="text-slate-600 leading-relaxed text-sm mb-4">
                          {step.subtext}
                        </p>
                      )}

                      {/* Outcome */}
                      <div className="mt-auto pt-4 border-t border-slate-200">
                        <div className="flex items-start space-x-2">
                          <Icon name="check-circle" size="sm" className="text-emerald-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-slate-700 font-semibold">
                            {step.outcome}
                          </p>
                        </div>
                      </div>

                      {/* Step Icon */}
                      <div className="mt-4">
                        <motion.div
                          className="relative group/stepIcon"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-purple-100 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 shadow-lg group-hover:shadow-xl">
                            <Icon
                              name={step.icon as any}
                              size="xl"
                              className="text-slate-700 group-hover:text-blue-700 transition-colors duration-300"
                              strokeWidth={2.5}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Optional Tagline */}
          <div className="text-center mt-16 mb-16">
            <p className="text-2xl lg:text-3xl font-bold text-slate-900 leading-relaxed max-w-4xl mx-auto">
              We don't just deliver products — we build living systems that learn, adapt, and scale.
            </p>
          </div>
        </div>
      </SmoothSection>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeServiceModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 lg:p-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-200">
                  <div className="flex items-start gap-5 flex-1">
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Outer Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${getServiceColor(selectedService).iconGradient} rounded-2xl blur-2xl opacity-50`}></div>
                      
                      {/* Icon Container */}
                      <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${getServiceColor(selectedService).iconGradient} flex items-center justify-center shadow-xl ${getServiceColor(selectedService).iconShadow} overflow-hidden`}>
                        {/* Inner Shine */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-2xl"></div>
                        
                        {/* Subtle Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                            backgroundSize: '6px 6px'
                          }}></div>
                        </div>
                        
                        <Icon 
                          name={selectedService.icon as any} 
                          size="xl" 
                          className="text-white relative z-10 drop-shadow-lg"
                          strokeWidth={2.5}
                        />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3 leading-tight">{selectedService.title}</h2>
                      <p className="text-base lg:text-lg text-slate-600 leading-relaxed">{selectedService.description}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeServiceModal}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0 ml-4 transition-colors"
                  >
                    <Icon name="close" size="md" strokeWidth={2} />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="space-y-8">
                  {selectedService.technologies && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Icon name="code" size="sm" className="mr-2 text-slate-400" strokeWidth={2} />
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.technologies.map((tech: string, i: number) => {
                          const getBorderColor = () => {
                            switch(selectedService.category) {
                              case 'core': return 'border-blue-200 hover:border-blue-400';
                              case 'ai': return 'border-purple-200 hover:border-purple-400';
                              case 'training': return 'border-emerald-200 hover:border-emerald-400';
                              case 'innovation': return 'border-amber-200 hover:border-amber-400';
                              case 'managed': return 'border-indigo-200 hover:border-indigo-400';
                              default: return 'border-blue-200 hover:border-blue-400';
                            }
                          };
                          return (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border-2 ${getBorderColor()} transition-all duration-200 shadow-sm hover:shadow-md`}
                            >
                              {tech}
                            </motion.span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {selectedService.capabilities && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Icon name="check-circle" size="sm" className="mr-2 text-slate-400" strokeWidth={2} />
                        Capabilities
                      </h3>
                      <div className="space-y-3">
                        {selectedService.capabilities.map((cap: string, i: number) => (
                          <motion.div 
                            key={i} 
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getServiceColor(selectedService).iconGradient} flex items-center justify-center shadow-md flex-shrink-0`}
                            >
                              <Icon name="check" size="sm" className="text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-slate-700 font-medium text-sm lg:text-base">{cap}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedService.focusAreas && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Icon name="light-bulb" size="sm" className="mr-2 text-slate-400" strokeWidth={2} />
                        Focus Areas
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.focusAreas.map((area: string, i: number) => {
                          const getBorderColor = () => {
                            switch(selectedService.category) {
                              case 'core': return 'border-blue-200 hover:border-blue-400';
                              case 'ai': return 'border-purple-200 hover:border-purple-400';
                              case 'training': return 'border-emerald-200 hover:border-emerald-400';
                              case 'innovation': return 'border-amber-200 hover:border-amber-400';
                              case 'managed': return 'border-indigo-200 hover:border-indigo-400';
                              default: return 'border-blue-200 hover:border-blue-400';
                            }
                          };
                          return (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border-2 ${getBorderColor()} transition-all duration-200 shadow-sm hover:shadow-md`}
                            >
                              {area}
                            </motion.span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
