import React from "react";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { companyInfo, companyValues, timeline } from "@/data/content";
import { teamMembers } from "@/data/team";

export default function About() {
  const leadership = teamMembers.filter(
    (member) =>
      member.role === "client" &&
      (member.title.includes("Partner") || member.title.includes("Lead"))
  );

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-screen-xl mx-auto px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {companyInfo.mission}
          </p>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card
                key={value.id}
                hover
                background="white"
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      name={value.icon as any}
                      size="xl"
                      className="text-white"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to bridge global expertise with
              local trust
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent hidden lg:block"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col lg:space-x-12 space-y-8 lg:space-y-0`}
                >
                  <div className="flex-1">
                    <Card
                      background="section"
                      className={`${
                        index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      } text-center`}
                    >
                      <div className="space-y-4">
                        <div className="text-accent font-bold text-2xl">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-bold text-primary">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-6 h-6 bg-accent rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 lg:py-24 bg-section">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the leaders driving our vision forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader) => (
              <Card
                key={leader.id}
                hover
                background="white"
                className="text-center group"
              >
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-2xl">
                      {leader.avatar}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {leader.name}
                    </h3>
                    <p className="text-accent font-medium">{leader.title}</p>
                    <p className="text-sm text-gray-600 flex items-center justify-center space-x-1 mt-1">
                      <span>{leader.flag}</span>
                      <span>{leader.location}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {leader.bio}
                  </p>
                  {leader.quote && (
                    <p className="text-sm text-accent italic font-medium">
                      "{leader.quote}"
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              What Makes Us Unique
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">
                    Global Talent, Local Presence
                  </h3>
                  <p className="text-gray-600">
                    Access to world-class developers with dedicated account
                    managers in your timezone
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">
                    Enterprise-Grade Security
                  </h3>
                  <p className="text-gray-600">
                    Bank-level security protocols and compliance standards for
                    every project
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">
                    Transparent Communication
                  </h3>
                  <p className="text-gray-600">
                    Clear pricing, regular updates, and direct access to your
                    project team
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">
                    Cutting-Edge Technology
                  </h3>
                  <p className="text-gray-600">
                    Latest AI, blockchain, and web technologies to keep you
                    ahead of the curve
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">
                    Proven Track Record
                  </h3>
                  <p className="text-gray-600">
                    Successful projects across industries with measurable
                    business impact
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">Ongoing Support</h3>
                  <p className="text-gray-600">
                    Continuous maintenance, updates, and optimization after
                    launch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
