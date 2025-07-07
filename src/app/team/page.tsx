"use client";

import React, { useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { teamMembers, getTechTeam, getClientTeam } from "@/data/team";

export default function Team() {
  const [activeTab, setActiveTab] = useState<"tech" | "client">("tech");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const techTeam = getTechTeam();
  const clientTeam = getClientTeam();
  const currentTeam = activeTab === "tech" ? techTeam : clientTeam;

  const openModal = (member: any) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-screen-xl mx-auto px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Global expertise with local understanding - our team bridges
            continents to serve you better
          </p>
        </div>
      </section>

      {/* Team Tabs */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-screen-xl mx-auto px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              <button
                onClick={() => setActiveTab("tech")}
                className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === "tech"
                    ? "bg-accent text-white shadow-lg"
                    : "text-primary hover:bg-section"
                }`}
              >
                Tech Team
              </button>
              <button
                onClick={() => setActiveTab("client")}
                className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === "client"
                    ? "bg-accent text-white shadow-lg"
                    : "text-primary hover:bg-section"
                }`}
              >
                US/UK Team
              </button>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTeam.map((member) => (
              <Card
                key={member.id}
                hover
                background="white"
                className="group text-center cursor-pointer"
                onClick={() => openModal(member)}
              >
                <div className="space-y-4">
                  {/* Avatar */}
                  <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-2xl">
                      {member.avatar}
                    </span>
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {member.name}
                    </h3>
                    <p className="text-accent font-medium">{member.title}</p>
                    {member.location && (
                      <p className="text-sm text-gray-600 flex items-center justify-center space-x-1 mt-1">
                        <span>{member.flag}</span>
                        <span>{member.location}</span>
                      </p>
                    )}
                  </div>

                  {/* Skills or Quote */}
                  {member.skills ? (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-section text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 italic">
                      "{member.quote}"
                    </p>
                  )}

                  {/* Bio */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.bio.length > 120
                      ? `${member.bio.substring(0, 120)}...`
                      : member.bio}
                  </p>

                  {/* View Details Button */}
                  <div className="pt-2">
                    <span className="text-accent font-medium group-hover:underline">
                      View Details
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-primary">
                  Team Member Details
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Avatar & Basic Info */}
                <div className="text-center">
                  <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-4xl">
                      {selectedMember.avatar}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    {selectedMember.name}
                  </h3>
                  <p className="text-accent font-medium text-lg">
                    {selectedMember.title}
                  </p>
                  {selectedMember.location && (
                    <p className="text-gray-600 flex items-center justify-center space-x-1 mt-2">
                      <span className="text-xl">{selectedMember.flag}</span>
                      <span>{selectedMember.location}</span>
                    </p>
                  )}
                </div>

                {/* Skills */}
                {selectedMember.skills && (
                  <div>
                    <h4 className="font-bold text-primary mb-3">
                      Skills & Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map(
                        (skill: string, index: number) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-section text-primary text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Bio */}
                <div>
                  <h4 className="font-bold text-primary mb-3">About</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Quote */}
                {selectedMember.quote && (
                  <div>
                    <h4 className="font-bold text-primary mb-3">Quote</h4>
                    <p className="text-accent italic font-medium text-lg">
                      "{selectedMember.quote}"
                    </p>
                  </div>
                )}

                {/* Close Button */}
                <div className="pt-4">
                  <Button
                    onClick={closeModal}
                    variant="primary"
                    size="lg"
                    fullWidth
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
