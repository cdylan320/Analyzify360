"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggeredContainer,
} from "@/components/ScrollAnimations";
import {
  SmoothSection,
  ProfessionalCard,
  ParallaxText,
} from "@/components/ProfessionalMotions";
import { DotsPattern, GridBackground } from "@/components/ThreeBackground";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { companyInfo, companyValues, timeline } from "@/data/content";
import { teamMembers } from "@/data/team";

export default function About() {
  const leadership = teamMembers.filter(
    (member) =>
      member.role === "client" &&
      (member.title.includes("Partner") || member.title.includes("Lead"))
  );

  const stats = [
    { value: "150+", label: "Projects Delivered", icon: "briefcase" },
    { value: "50+", label: "Happy Clients", icon: "users" },
    { value: "8+", label: "Years Experience", icon: "calendar" },
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

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <SmoothSection className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <DotsPattern className="opacity-10" />

        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95 backdrop-blur-sm"></div>

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center justify-center px-6 py-3 mb-8 text-sm font-semibold text-slate-100 bg-slate-800/80 rounded-full border border-slate-600/50 backdrop-blur-md shadow-xl"
            >
              <Icon
                name="lightbulb"
                size="sm"
                className="mr-2 text-slate-300"
              />
              <span className="text-slate-200">Our Story</span>
            </motion.div>

            <ParallaxText speed={0.3}>
              <motion.h1
                className="text-5xl lg:text-8xl font-black mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{
                  textShadow:
                    "0 4px 20px rgba(0, 0, 0, 0.8), 0 8px 40px rgba(0, 0, 0, 0.6)",
                }}
              >
                <span className="text-white drop-shadow-2xl">Building the</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">
                  Future Together
                </span>
              </motion.h1>
            </ParallaxText>

            <motion.p
              className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto mb-12 text-slate-200 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              {companyInfo.mission}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button
                variant="primary"
                size="xl"
                className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-bold px-12 py-6 rounded-2xl shadow-2xl border border-cyan-500/30"
                rightIcon={<Icon name="users" size="md" />}
              >
                Meet Our Team
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-2 border-slate-400/80 text-slate-200 hover:bg-slate-700/80 hover:text-white hover:border-slate-300 font-bold px-12 py-6 rounded-2xl backdrop-blur-md shadow-xl"
                rightIcon={<Icon name="external-link" size="md" />}
              >
                Company Profile
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Professional Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"></div>
        </div>
      </SmoothSection>

      {/* Statistics Section */}
      <SmoothSection className="relative py-20 bg-slate-50">
        <div className="w-[95%] mx-auto px-4 lg:px-8">
          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ProfessionalCard
                key={index}
                delay={index * 0.1}
                hoverEffect="lift"
                className="text-center bg-white rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Icon
                    name={stat.icon as any}
                    size="lg"
                    className="text-white"
                  />
                </div>
                <div className="text-4xl font-black text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-700 font-semibold">{stat.label}</div>
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
              className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-cyan-700 bg-cyan-50 rounded-full border border-cyan-200/80 shadow-sm"
            >
              <Icon name="heart" size="sm" className="mr-2 text-cyan-600" />
              <span className="text-cyan-800">Our Values</span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">What Drives</span>
              <span className="block bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Everything We Do
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-medium">
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
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[300px] flex flex-col"
              >
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon
                    name={value.icon as any}
                    size="xl"
                    className="text-white"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-cyan-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {value.description}
                  </p>
                </div>
              </ProfessionalCard>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection>

      {/* Timeline Section */}
      <SmoothSection className="relative py-24 bg-slate-50">
        <div className="w-[95%] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200/80 shadow-sm"
            >
              <Icon name="clock" size="sm" className="mr-2 text-indigo-600" />
              <span className="text-indigo-800">Our Journey</span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-slate-900">Building Excellence</span>
              <span className="block bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Over Time
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-medium">
              Key milestones in our mission to bridge global expertise with
              local trust
            </p>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-600 to-indigo-600 hidden lg:block shadow-sm"></div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col lg:space-x-12 space-y-8 lg:space-y-0`}
                >
                  <div className="flex-1">
                    <div
                      className={`${
                        index % 2 === 0
                          ? "lg:text-right lg:pr-8"
                          : "lg:text-left lg:pl-8"
                      } text-center`}
                    >
                      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 group">
                        <div className="text-3xl font-black bg-gradient-to-r from-cyan-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-cyan-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-700 leading-relaxed text-lg font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-full border-4 border-white shadow-xl z-10 hidden lg:block"></div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SmoothSection>

      {/* Achievements Section */}
      <SmoothSection className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <DotsPattern className="opacity-10" />

        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95"></div>

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2
              className="text-4xl lg:text-6xl font-black mb-6 leading-tight"
              style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)" }}
            >
              <span className="text-white">Recognition &</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Achievements
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mb-6"></div>

            <p
              className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto font-medium"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
            >
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
                className="group bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-600/50 hover:border-slate-500/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[280px] flex flex-col"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon
                    name={achievement.icon as any}
                    size="lg"
                    className="text-white"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-200 leading-relaxed font-medium">
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
              className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200/80 shadow-sm"
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

            <p className="text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-medium">
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
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center min-h-[400px] flex flex-col"
              >
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                    {leader.avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg text-white text-xs font-bold">
                    {leader.flag}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-cyan-700 font-semibold mb-2">
                    {leader.title}
                  </p>
                  <p className="text-sm text-slate-600 mb-4 flex items-center justify-center space-x-1 font-medium">
                    <span>{leader.location}</span>
                  </p>

                  <p className="text-slate-700 leading-relaxed mb-4 flex-1 font-medium">
                    {leader.bio}
                  </p>

                  {leader.quote && (
                    <div className="mt-auto p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                      <p className="text-sm text-slate-800 italic font-medium">
                        "{leader.quote}"
                      </p>
                    </div>
                  )}
                </div>
              </ProfessionalCard>
            ))}
          </StaggeredContainer>
        </div>
      </SmoothSection>

      {/* Call to Action */}
      <SmoothSection className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <DotsPattern className="opacity-10" />

        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95"></div>

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8 text-center">
          <AnimatedSection>
            <h2
              className="text-4xl lg:text-6xl font-black mb-8 leading-tight"
              style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)" }}
            >
              <span className="text-white">Ready to</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Work Together?
              </span>
            </h2>

            <p
              className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-12 font-medium"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
            >
              Let's discuss how we can help transform your vision into reality
              with our expertise and passion
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="primary"
                size="xl"
                className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-bold px-12 py-6 rounded-2xl shadow-2xl border border-cyan-500/30"
                rightIcon={<Icon name="arrow-right" size="md" />}
              >
                Start Your Project
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-2 border-slate-400/80 text-slate-200 hover:bg-slate-700/80 hover:text-white hover:border-slate-300 font-bold px-12 py-6 rounded-2xl backdrop-blur-md shadow-xl"
                rightIcon={<Icon name="phone" size="md" />}
              >
                Schedule a Call
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </SmoothSection>
    </div>
  );
}
