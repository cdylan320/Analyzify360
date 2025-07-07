"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggeredContainer } from "./ScrollAnimations";
import { GridBackground } from "./ThreeBackground";
import Icon from "./Icon";
import { teamMembers, getTechTeam, getClientTeam } from "@/data/team";

const TeamPreview: React.FC = () => {
  const techTeam = getTechTeam();
  const clientTeam = getClientTeam();

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      <GridBackground className="opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
          >
            <Icon name="users" size="sm" className="mr-2" />
            Meet Our Team
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Global Talent,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Local Trust
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our diverse team combines technical excellence with local market
            understanding
          </p>
        </AnimatedSection>

        {/* Tech Team */}
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
            {techTeam.map((member) => (
              <motion.div
                key={member.id}
                variants={{
                  initial: { opacity: 0, y: 60 },
                  animate: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-blue-300">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {member.avatar}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-blue-600 font-semibold text-sm mb-2">
                      {member.title}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.skills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center space-x-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-slate-900">
                        {member.experience}
                      </div>
                      <div className="text-slate-500 text-xs">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-slate-900">
                        {member.projects}+
                      </div>
                      <div className="text-slate-500 text-xs">Projects</div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    {member.social?.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                      >
                        <Icon name="linkedin" size="sm" />
                      </a>
                    )}
                    {member.social?.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                      >
                        <Icon name="github" size="sm" />
                      </a>
                    )}
                    {member.social?.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                      >
                        <Icon name="twitter" size="sm" />
                      </a>
                    )}
                    {member.social?.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                      >
                        <Icon name="mail" size="sm" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggeredContainer>
        </AnimatedSection>

        {/* Client Team */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Local Partnership
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Dedicated account managers in the US and UK ensuring your success
            </p>
          </div>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientTeam.map((member) => (
              <motion.div
                key={member.id}
                variants={{
                  initial: { opacity: 0, y: 60 },
                  animate: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-blue-300">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {member.avatar}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg text-white text-xs font-bold">
                      {member.flag}
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-cyan-600 font-semibold text-sm mb-2">
                      {member.title}
                    </p>
                    <p className="text-slate-500 text-sm mb-2">
                      {member.location}, {member.country}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  {/* Quote */}
                  {member.quote && (
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-slate-700 text-sm italic">
                        "{member.quote}"
                      </p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex justify-center space-x-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-slate-900">
                        {member.experience}
                      </div>
                      <div className="text-slate-500 text-xs">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-slate-900">
                        {member.projects}+
                      </div>
                      <div className="text-slate-500 text-xs">Projects</div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    {member.social?.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                      >
                        <Icon name="linkedin" size="sm" />
                      </a>
                    )}
                    {member.social?.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                      >
                        <Icon name="twitter" size="sm" />
                      </a>
                    )}
                    {member.social?.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                      >
                        <Icon name="mail" size="sm" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggeredContainer>
        </AnimatedSection>

        {/* Team Stats */}
        <AnimatedSection className="mt-16">
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Team Excellence
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Combined expertise and proven track record
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">50+</div>
                <div className="text-slate-400 text-sm">
                  Years Combined Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">800+</div>
                <div className="text-slate-400 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">15+</div>
                <div className="text-slate-400 text-sm">
                  Technologies Mastered
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">100%</div>
                <div className="text-slate-400 text-sm">
                  Client Satisfaction
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
