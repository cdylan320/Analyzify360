"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggeredContainer,
  GridBackground,
} from "../animations";
import { TeamMemberCard } from "../sections";
import { teamMembers, getTechTeam, getClientTeam } from "@/data/team";

// Tech Team Section Component
const TechTeamSection: React.FC = () => {
  const techTeam = getTechTeam();

  return (
    <AnimatedSection className="mb-16">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Technical Excellence
        </h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          World-class engineers specializing in cutting-edge technologies
        </p>
      </div>

      <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {techTeam.map((member, index) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            variant="tech"
            delay={index * 0.1}
          />
        ))}
      </StaggeredContainer>
    </AnimatedSection>
  );
};

// Local Team Section Component
const LocalTeamSection: React.FC = () => {
  const clientTeam = getClientTeam();

  return (
    <AnimatedSection className="mt-48">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Local Partnership
        </h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Dedicated account managers in the US and UK ensuring your success
        </p>
      </div>

      <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clientTeam.map((member, index) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            variant="client"
            delay={index * 0.1}
          />
        ))}
      </StaggeredContainer>
    </AnimatedSection>
  );
};

// Main TeamPreview Component
const TeamPreview: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      <GridBackground className="opacity-20" />

      <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Our Team
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Meet Our
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6"></div>

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            A perfect blend of global technical expertise and local partnership
            to ensure your project's success
          </p>
        </AnimatedSection>

        {/* Tech Team Section */}
        <TechTeamSection />

        {/* Local Team Section */}
        <LocalTeamSection />

        {/* Team Stats */}
        <AnimatedSection className="mt-12">
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Team Excellence
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Our diverse, experienced team delivers outstanding results
                across all projects
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">
                  15+
                </div>
                <div className="text-slate-300 font-medium">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">
                  8+
                </div>
                <div className="text-slate-300 font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-teal-400 mb-2">
                  150+
                </div>
                <div className="text-slate-300 font-medium">
                  Projects Delivered
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-indigo-400 mb-2">
                  24/7
                </div>
                <div className="text-slate-300 font-medium">
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TeamPreview;
