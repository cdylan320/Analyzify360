"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../ui";
import { TeamMember } from "@/data/team";

interface TeamMemberCardProps {
  member: TeamMember;
  variant?: "tech" | "client";
  delay?: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  variant = "tech",
  delay = 0,
}) => {
  const isTechMember = variant === "tech";
  const cardHeight = isTechMember ? "h-[580px]" : "h-[450px]";
  const avatarGradient = isTechMember
    ? "from-blue-500 to-indigo-600"
    : "from-cyan-500 to-blue-600";

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -2, scale: 1.005 }}
      className="group"
    >
      <div
        className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-blue-300 ${cardHeight} flex flex-col overflow-hidden`}
      >
        {/* Avatar Section */}
        <div className="relative mb-6 flex-shrink-0">
          <div
            className={`w-20 h-20 mx-auto bg-gradient-to-br ${avatarGradient} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}
          >
            {member.avatar}
          </div>

          {/* Status Indicator */}
          {isTechMember ? (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          ) : (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg text-white text-xs font-bold">
              {member.flag}
            </div>
          )}
        </div>

        {/* Member Info Section */}
        <div className="text-center mb-6 flex-grow min-h-0">
          <h4 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">
            {member.name}
          </h4>
          <p
            className={`${
              isTechMember ? "text-blue-600" : "text-cyan-600"
            } font-semibold text-base mb-4 line-clamp-1`}
          >
            {member.title}
          </p>

          {/* Location for client members */}
          {!isTechMember && (
            <p className="text-slate-500 text-sm mb-3 line-clamp-1">
              {member.location}, {member.country}
            </p>
          )}

          {/* Bio - Fixed height container with proper overflow handling */}
          <div className={isTechMember ? "h-12 mb-6" : "h-20 mb-4"}>
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 overflow-hidden">
              {member.bio}
            </p>
          </div>
        </div>

        {/* Skills Section (Tech members only) - Professional Design */}
        {isTechMember && member.skills && (
          <div className="mb-5 flex-shrink-0 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
            <div className="space-y-1">
              <div className="flex flex-wrap gap-1.5 justify-center">
                {member.skills.slice(0, 3).map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 text-blue-700 text-xs font-medium rounded-md hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-300 cursor-default shadow-sm hover:shadow-md">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 group-hover:bg-blue-600 transition-colors duration-300"></span>
                      {skill}
                    </span>
                  </motion.span>
                ))}
              </div>
              {member.skills.length > 3 && (
                <div className="text-center">
                  <span className="text-xs text-slate-400 font-medium">
                    +{member.skills.length - 3} more skills
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quote Section (Client members only) */}
        {!isTechMember && member.quote && (
          <div className="mb-4 flex-shrink-0">
            <div className="p-3 bg-slate-50 rounded-lg h-16 overflow-hidden">
              <p className="text-slate-700 text-sm italic line-clamp-2 overflow-hidden">
                "{member.quote}"
              </p>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="flex justify-center space-x-6 mb-6 text-base flex-shrink-0">
          <div className="text-center">
            <div className="font-bold text-slate-900 text-lg">
              {member.experience}
            </div>
            <div className="text-slate-500 text-sm">Experience</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-slate-900 text-lg">
              {member.projects}+
            </div>
            <div className="text-slate-500 text-sm">Projects</div>
          </div>
        </div>

        {/* Social Links Section - Always at bottom */}
        <div className="flex justify-center space-x-2 mt-auto flex-shrink-0">
          {member.social?.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <Icon name="linkedin" size="sm" />
            </a>
          )}
          {member.social?.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
              title="GitHub"
            >
              <Icon name="github" size="sm" />
            </a>
          )}
          {member.social?.twitter && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
              title="Twitter"
            >
              <Icon name="twitter" size="sm" />
            </a>
          )}
          {member.social?.email && (
            <a
              href={`mailto:${member.social.email}`}
              className="w-7 h-7 bg-slate-600 hover:bg-slate-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
              title="Email"
            >
              <Icon name="mail" size="sm" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
