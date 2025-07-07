import React from "react";
import Button from "./Button";
import Icon from "./Icon";

const TeamPreview: React.FC = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Lead Full-Stack Developer",
      avatar: "/api/placeholder/120/120",
      expertise: ["React", "Node.js", "TypeScript", "AWS"],
      experience: "8+ years",
      specialization: "Enterprise Web Applications",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Michael Ch",
      role: "Senior Mobile Developer",
      avatar: "/api/placeholder/120/120",
      expertise: ["React Native", "Swift", "Kotlin", "Flutter"],
      experience: "6+ years",
      specialization: "Cross-Platform Mobile Apps",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Emily Rodriguez",
      role: "Cloud Solutions Architect",
      avatar: "/api/placeholder/120/120",
      expertise: ["AWS", "Docker", "Kubernetes", "Terraform"],
      experience: "10+ years",
      specialization: "Scalable Cloud Infrastructure",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "David",
      role: "AI/ML Engineer",
      avatar: "/api/placeholder/120/120",
      expertise: ["Python", "TensorFlow", "PyTorch", "MLOps"],
      experience: "7+ years",
      specialization: "Machine Learning Solutions",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const teamStats = [
    {
      value: "50+",
      label: "Team Members",
      description: "Experienced professionals across multiple disciplines",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "15+",
      label: "Years Experience",
      description: "Average experience level of our senior team members",
      color: "from-green-500 to-teal-500",
    },
    {
      value: "25+",
      label: "Certifications",
      description: "Industry certifications and professional qualifications",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "12+",
      label: "Technologies",
      description: "Cutting-edge technologies and frameworks we master",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
                           radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.04) 0%, transparent 50%),
                           radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-green-600 bg-green-50 rounded-full border border-green-200">
            <Icon name="users" size="sm" className="mr-2" />
            Meet Our Team
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Expert
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Professionals
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-6"></div>

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Our diverse team of skilled professionals brings together decades of
            experience and expertise to deliver exceptional results.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Card Background */}
              <div
                className={`absolute inset-0 ${member.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Card Content */}
              <div className="relative z-10 p-8 text-center">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-slate-800 transition-colors">
                  {member.name}
                </h3>
                <p className="text-slate-600 text-sm font-medium mb-4">
                  {member.role}
                </p>

                {/* Experience & Specialization */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <div
                      className={`w-2 h-2 bg-gradient-to-r ${member.color} rounded-full`}
                    ></div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {member.experience}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">
                    {member.specialization}
                  </p>
                </div>

                {/* Expertise Tags */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 group-hover:bg-white group-hover:text-slate-800 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-slate-200 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Team Statistics */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 lg:p-16 shadow-2xl mb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
              Our Team by Numbers
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
              A diverse team of experts committed to delivering exceptional
              results and driving innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
              >
                <div
                  className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.value}
                </div>
                <div className="text-white font-bold text-lg mb-2">
                  {stat.label}
                </div>
                <div className="text-slate-400 text-sm leading-relaxed">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              rightIcon={<Icon name="arrow-right" size="md" />}
            >
              Join Our Team
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-bold px-8 py-4 rounded-2xl transition-all duration-300"
            >
              View All Members
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
