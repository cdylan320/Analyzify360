"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  AnimatedSection,
  StaggeredContainer,
  SmoothSection,
  ProfessionalCard,
  GridBackground,
  Icon,
  Button,
} from "@/components";
import {
  teamMembers,
  getTechTeam,
  getClientTeam,
  getLeadershipTeam,
  TeamMember,
} from "@/data/team";

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "tech" | "client" | "leadership">(
    "all"
  );
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();
  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true });

  // Ensure client-side only rendering for animations
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get filtered team members
  const getFilteredMembers = () => {
    switch (activeFilter) {
      case "tech":
        return getTechTeam();
      case "client":
        return getClientTeam();
      case "leadership":
        return getLeadershipTeam();
      default:
        return teamMembers;
    }
  };

  const filteredMembers = getFilteredMembers();

  // Predefined positions for floating elements
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
  ];

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const openMemberModal = (member: TeamMember) => {
    setSelectedMember(member);
    document.body.style.overflow = "hidden";
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = "unset";
  };

  const memberColors = {
    tech: "from-blue-600 to-indigo-600",
    client: "from-emerald-600 to-teal-600",
    leadership: "from-purple-600 to-pink-600",
  };

  const memberIcons = {
    tech: "code",
    client: "users",
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.4),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.3),transparent_50%)] animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(16,185,129,0.3),transparent_50%)] animate-pulse delay-1000"></div>
        </div>

        {/* Floating Team Icons - Client-side only */}
        {isClient && (
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
                  y: [0, -40, 0],
                  x: [0, i % 2 === 0 ? 20 : -20, 0],
                  rotate: [0, 360],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Icon
                  name={["users", "user", "heart", "star"][i % 4] as any}
                  size="lg"
                  className="text-blue-400/20"
                />
              </motion.div>
            ))}
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
                Meet Our Experts • Global Talent • Local Partnership
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
                  Team
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl font-light text-white/70 mb-8">
                Excellence Through Expertise
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
                  Meet the brilliant minds behind our success. A perfect blend
                  of global technical expertise and local partnership, dedicated
                  to transforming your vision into reality.
                </p>
              </div>
            </motion.div>

            {/* Team Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            >
              {[
                {
                  value: `${teamMembers.length}+`,
                  label: "Team Members",
                  icon: "users",
                },
                { value: "7+", label: "Years Experience", icon: "star" },
                { value: "150+", label: "Projects", icon: "briefcase" },
                { value: "24/7", label: "Support", icon: "clock" },
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

            {/* Modern CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >

              <motion.button
                onClick={() => {
                  window.location.href = "/careers#contact"
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-white/10 backdrop-blur-xl rounded-2xl font-bold text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>Contact Us</span>
                  <Icon name="mail" size="md" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Premium Team Grid */}
      <SmoothSection className="relative py-12 bg-gradient-to-b from-white to-slate-50">
        <GridBackground className="opacity-5" />

        <div className="relative z-10 w-[95%] mx-auto mb-12 px-4 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { id: "all", label: "All Team", count: teamMembers.length },
                { id: "tech", label: "Tech Team", count: getTechTeam().length },
                {
                  id: "client",
                  label: "Client Team",
                  count: getClientTeam().length,
                },
                {
                  id: "leadership",
                  label: "Leadership",
                  count: getLeadershipTeam().length,
                },
              ].map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${activeFilter === filter.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-lg"
                    }`}
                >
                  {filter.label}
                  <span className="ml-2 text-sm opacity-75">
                    ({filter.count})
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        <div
          className="relative z-10 w-[95%] mx-auto px-4 lg:px-8"
          ref={teamRef}
        >
          {/* Team Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMembers.map((member, index) => (
                  <div
                    key={member.id}
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                    onClick={() => openMemberModal(member)}
                  >
                    <ProfessionalCard
                      delay={index * 0.1}
                      hoverEffect="lift"
                      className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 cursor-pointer relative overflow-hidden h-[580px]"
                    >
                      {/* Background Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${memberColors[member.role as keyof typeof memberColors]
                          } opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      ></div>

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Photo Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <img
                              src={member.photo}
                              alt={`${member.name} profile photo`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                // Fallback to avatar initials if image fails
                                const target = e.currentTarget;
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${memberColors[member.role as keyof typeof memberColors]} rounded-3xl flex items-center justify-center"><span class="text-white font-bold text-xl">${member.avatar}</span></div>`;
                                }
                              }}
                            />
                          </div>
                          <motion.div
                            className="text-slate-400 group-hover:text-blue-600 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Icon name="external-link" size="lg" />
                          </motion.div>
                        </div>

                        {/* Member Info */}
                        <div className="mb-4 text-center">
                          <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                            {member.name}
                          </h3>
                          <p
                            className={`font-bold text-base mb-2 line-clamp-2 ${member.role === "tech"
                              ? "text-blue-600"
                              : member.role === "client"
                                ? "text-emerald-600"
                                : "text-purple-600"
                              }`}
                          >
                            {member.title}
                          </p>
                          {member.location && (
                            <p className="text-slate-500 flex items-center justify-center gap-1 text-sm">
                              <Icon name="map-pin" size="sm" />
                              <span className="line-clamp-1">{member.location}</span>
                            </p>
                          )}
                        </div>

                        {/* Bio */}
                        <div className="mb-4 flex-1">
                          <p className="text-slate-600 leading-relaxed line-clamp-3 text-sm">
                            {member.bio}
                          </p>
                        </div>

                        {/* Skills or Quote */}
                        {member.skills ? (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1.5 justify-center mb-2">
                              {member.skills
                                .slice(0, 3)
                                .map((skill, skillIndex) => (
                                  <span
                                    key={skillIndex}
                                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                                  >
                                    {skill}
                                  </span>
                                ))}
                            </div>
                            {member.skills.length > 3 && (
                              <p className="text-xs text-slate-400 text-center">
                                +{member.skills.length - 3} more skills
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="mb-4">
                            <div className="p-3 bg-slate-50 rounded-2xl">
                              <p className="text-slate-700 italic text-center text-sm line-clamp-2">
                                "{member.quote}"
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Stats */}
                        <div className="flex justify-center gap-6 mb-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Icon name="clock" size="sm" className="text-slate-400" />
                              <div className="font-black text-slate-900 text-base">
                                {member.experience}
                              </div>
                            </div>
                            <div className="text-slate-500 text-xs">
                              Experience
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Icon name="briefcase" size="sm" className="text-slate-400" />
                              <div className="font-black text-slate-900 text-base">
                                {member.projects}+
                              </div>
                            </div>
                            <div className="text-slate-500 text-xs">
                              Projects
                            </div>
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-2 mb-3">
                          {member.social?.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Icon name="linkedin" size="sm" />
                            </a>
                          )}
                          {member.social?.github && (
                            <a
                              href={member.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Icon name="github" size="sm" />
                            </a>
                          )}
                          {member.social?.email && (
                            <a
                              href={`mailto:${member.social.email}`}
                              className="w-8 h-8 bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Icon name="mail" size="sm" />
                            </a>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="pt-3 mt-auto border-t border-slate-100">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-600 font-bold group-hover:text-blue-700 transition-colors text-sm">
                              View Profile
                            </span>
                            <motion.div
                              className="text-blue-600"
                              animate={{
                                x: hoveredMember === member.id ? 5 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <Icon name="arrow-right" size="sm" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </ProfessionalCard>
                  </div>
                ))}
              </StaggeredContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </SmoothSection>

      {/* Enhanced Team Modal */}
      {selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeMemberModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 lg:p-12">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl">
                    <img
                      src={selectedMember.photo}
                      alt={`${selectedMember.name} profile photo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to avatar initials if image fails
                        const target = e.currentTarget;
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${memberColors[selectedMember.role as keyof typeof memberColors]} rounded-3xl flex items-center justify-center shadow-xl"><span class="text-white font-bold text-3xl">${selectedMember.avatar}</span></div>`;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">
                      {selectedMember.name}
                    </h2>
                    <p className="text-xl text-slate-600 font-medium mb-2">
                      {selectedMember.title}
                    </p>
                    {selectedMember.location && (
                      <p className="text-slate-500 flex items-center gap-1">
                        <Icon name="map" size="sm" />
                        {selectedMember.location}
                      </p>
                    )}
                  </div>
                </div>
                <motion.button
                  onClick={closeMemberModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:text-slate-800 transition-all duration-200"
                >
                  <Icon name="close" size="lg" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* About */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <div
                      className={`w-3 h-3 bg-gradient-to-r ${memberColors[
                        selectedMember.role as keyof typeof memberColors
                      ]
                        } rounded-full mr-3`}
                    ></div>
                    About
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    {selectedMember.bio}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-black text-slate-900">
                        {selectedMember.experience}
                      </div>
                      <div className="text-slate-600 text-sm">Experience</div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-black text-slate-900">
                        {selectedMember.projects}+
                      </div>
                      <div className="text-slate-600 text-sm">Projects</div>
                    </div>
                  </div>
                </div>

                {/* Skills or Quote */}
                <div>
                  {selectedMember.skills ? (
                    <>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${memberColors[
                            selectedMember.role as keyof typeof memberColors
                          ]
                            } rounded-full mr-3`}
                        ></div>
                        Skills & Expertise
                      </h3>
                      <div className="space-y-4">
                        {selectedMember.skills.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-4 group"
                          >
                            <div
                              className={`w-8 h-8 bg-gradient-to-br ${memberColors[
                                selectedMember.role as keyof typeof memberColors
                              ]
                                } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                            >
                              <Icon
                                name="check"
                                size="sm"
                                className="text-white"
                              />
                            </div>
                            <span className="text-slate-700 font-medium leading-relaxed">
                              {skill}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${memberColors[
                            selectedMember.role as keyof typeof memberColors
                          ]
                            } rounded-full mr-3`}
                        ></div>
                        Philosophy
                      </h3>
                      <div className="bg-slate-50 rounded-2xl p-6">
                        <p className="text-slate-700 italic text-lg leading-relaxed">
                          "{selectedMember.quote}"
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Connect
                </h3>
                <div className="flex gap-4">
                  {selectedMember.social?.linkedin && (
                    <a
                      href={selectedMember.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Icon name="linkedin" size="md" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {selectedMember.social?.github && (
                    <a
                      href={selectedMember.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Icon name="github" size="md" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {selectedMember.social?.email && (
                    <a
                      target="_blank"
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedMember.social.email}&su=New Project Inquiry&body=Hi Analyzify360 Team,%0D%0A%0D%0AI'm interested in discussing a project with you.%0D%0A%0D%0AProject details:%0D%0A-%0D%0A-%0D%0A-%0D%0A%0D%0ABest regards`}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Icon name="mail" size="md" />
                      <span>Email</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Premium CTA Section */}
      {/* <SmoothSection className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <GridBackground className="opacity-10" />

        <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-6 py-3 mb-8 text-sm font-bold text-purple-700 bg-purple-50 rounded-full border border-purple-200/80 shadow-lg"
            >
              <Icon name="rocket" size="sm" className="mr-2 text-purple-600" />
              <span className="text-purple-800">Ready to Work Together?</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-5xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="text-slate-900">Let's Build</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Something Amazing
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full mx-auto mb-8"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 p-8 shadow-xl max-w-4xl mx-auto">
                <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
                  Ready to work with our expert team? Let's discuss your project
                  and create something extraordinary together.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col lg:flex-row gap-6 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl font-bold text-white overflow-hidden shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <span className="relative flex items-center justify-center space-x-3 text-lg">
                  <Icon name="rocket" size="lg" />
                  <span>Start Your Project</span>
                  <Icon name="arrow-right" size="md" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-white/80 backdrop-blur-xl rounded-3xl font-bold text-slate-800 border-2 border-slate-200 hover:border-purple-300 hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-3 text-lg group-hover:text-purple-700 transition-colors">
                  <Icon name="calendar" size="lg" />
                  <span>Schedule a Call</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </SmoothSection> */}
    </div>
  );
}
