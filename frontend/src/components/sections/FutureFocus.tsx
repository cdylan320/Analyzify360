"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ProfessionalCard,
  professionalMotions,
} from "../animations";
import { Button, Icon } from "../ui";

const FutureFocus: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const futureProjects = [
    {
      icon: "chip",
      title: "Distributed AI Subnet",
      subtitle: "Healthcare Intelligence Network",
      overview:
        "A decentralized AI network that enables secure, privacy-preserving collaboration among hospitals, research labs, and medical startups — without sharing raw patient data.",
      details:
        "By combining federated learning, blockchain validation, and edge compute nodes, this subnet allows healthcare institutions to train powerful diagnostic models collectively, while keeping data fully encrypted and local.",
      vision:
        "To create a global, distributed AI infrastructure that accelerates medical discovery while preserving patient privacy.",
      status: "Prototype Development — 2026 Q1",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/5",
      borderColor: "border-purple-500/20",
    },
    {
      icon: "link",
      title: "Blockchain-Orchestrated AI Marketplace",
      subtitle: "Compute Resource Monetization",
      overview:
        "Creating a compute marketplace where idle GPU/CPU resources can be monetized through smart contracts.",
      goal: "Power AI workloads using shared, verified compute pools.",
      status: "Prototype Development — 2026 Q1",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/5",
      borderColor: "border-amber-500/20",
    },
    {
      icon: "globe",
      title: "Agentic Web Infrastructure",
      subtitle: "Autonomous Web Services",
      overview:
        "Building autonomous web services that integrate reasoning agents, blockchain identity, and secure data exchange.",
      goal: "Enable AI agents to transact and manage web interactions safely.",
      status: "Design Sprint — 2026 Q2",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/5",
      borderColor: "border-blue-500/20",
    },
    {
      icon: "zap",
      title: "AI + DevOps Automation Suite",
      subtitle: "Intelligent DevOps Platform",
      overview:
        "An AI-driven DevOps platform that automates deployment, monitoring, and scaling across hybrid cloud environments.",
      goal: "Reduce release cycles and infra costs by >50%.",
      status: "Alpha Build — 2025 Q3",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/20",
    },
    {
      icon: "light-bulb",
      title: "AI-Assisted Product Design Lab",
      subtitle: "Generative Design & Architecture",
      overview:
        "Using generative AI + ML data modeling to co-design interfaces, architectures, and workflows with human experts.",
      goal: "Accelerate product iteration speed for enterprise TaaS clients.",
      status: "MVP Internal Pilot — 2025 Q4",
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-500/5",
      borderColor: "border-indigo-500/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <div ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.04) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200"
          >
            <Icon name="light-bulb" size="sm" className="mr-2" />
            Future Focus
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight"
          >
            Building the Next Wave
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              of Technology
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"
          />

          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-4 px-4"
          >
            We're not just building software — we're shaping the future.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto px-4"
          >
            Our R&D teams are developing next-generation MVPs that blend AI,
            blockchain, and distributed computing under our hybrid TaaS model.
          </motion.p>
        </motion.div>

        {/* Upcoming MVP Directions Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4">
            Upcoming MVP Directions
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </motion.div>

        {/* Future Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={professionalMotions.staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {futureProjects.map((project, index) => (
            <ProfessionalCard
              key={index}
              delay={index * 0.1}
              hoverEffect="lift"
              className={`group relative bg-white rounded-2xl border ${project.borderColor} shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden min-h-[400px] md:min-h-[480px] flex flex-col`}
            >
              {/* Card Background Gradient */}
              <div
                className={`absolute inset-0 ${project.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Card Content */}
              <div className="relative z-10 p-4 md:p-8 flex-1 flex flex-col">
                {/* Icon & Status */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      name={project.icon as any}
                      size="lg"
                      className="text-white"
                    />
                  </div>
                  <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600 group-hover:bg-slate-200 transition-colors">
                    {project.status}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <h4 className="text-sm font-semibold text-slate-500 mb-4">
                  {project.subtitle}
                </h4>

                {/* Overview */}
                <p className="text-slate-600 leading-relaxed mb-4 text-sm flex-1">
                  {project.overview}
                </p>

                {/* Details (if available) */}
                {project.details && (
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm italic">
                    {project.details}
                  </p>
                )}

                {/* Goal/Vision */}
                {(project.goal || project.vision) && (
                  <div className="mt-auto pt-4 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      {project.vision ? "Core Vision" : "Goal"}
                    </p>
                    <p className="text-sm text-slate-700 font-medium">
                      {project.vision || project.goal}
                    </p>
                  </div>
                )}
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-slate-200 transition-colors duration-300"></div>
            </ProfessionalCard>
          ))}
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-xl">
            <p className="text-xl text-slate-800 leading-relaxed font-medium">
              Our future roadmap blends innovation and execution.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mt-4">
              With a strong hybrid engineering foundation, we're not just
              responding to change — we're engineering it.
            </p>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                window.location.href = "/services";
              }}
              rightIcon={<Icon name="arrow-right" size="md" />}
            >
              Explore Our R&D Pipeline
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FutureFocus;

