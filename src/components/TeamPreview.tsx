import React from "react";
import Link from "next/link";
import Card from "./Card";
import Button from "./Button";
import Icon from "./Icon";
import { teamMembers } from "@/data/team";

const TeamPreview: React.FC = () => {
  // Show first 6 team members (3 tech, 3 client)
  const techTeam = teamMembers
    .filter((member) => member.role === "tech")
    .slice(0, 3);
  const clientTeam = teamMembers
    .filter((member) => member.role === "client")
    .slice(0, 3);
  const previewTeam = [...techTeam, ...clientTeam];

  return (
    <section className="py-16 lg:py-24 bg-section">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Global expertise with local understanding - our team bridges
            continents to serve you better
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {previewTeam.map((member) => (
            <Card
              key={member.id}
              hover
              background="white"
              className="group text-center"
            >
              <div className="space-y-4">
                {/* Avatar */}
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">
                    {member.avatar}
                  </span>
                </div>

                {/* Name & Title */}
                <div>
                  <h3 className="text-lg font-bold text-primary">
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
                    {member.skills.slice(0, 3).map((skill, index) => (
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
                  {member.bio.length > 100
                    ? `${member.bio.substring(0, 100)}...`
                    : member.bio}
                </p>

                {/* View Details Button */}
                <button className="text-accent font-medium hover:text-blue-600 transition-colors duration-200 group-hover:underline">
                  View Details
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/team">
            <Button
              variant="primary"
              size="lg"
              pill
              rightIcon={<Icon name="arrow-right" size="md" />}
            >
              See Full Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
