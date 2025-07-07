import React from "react";
import { Button, Icon } from "../ui";

const ProjectShowcase: React.FC = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Full-Stack Development",
      image: "/images/1.jpg",
      description:
        "A comprehensive e-commerce solution with advanced inventory management, payment processing, and analytics dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      metrics: {
        users: "50K+",
        transactions: "$2M+",
        uptime: "99.9%",
      },
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      status: "Live",
      timeline: "6 months",
    },
    {
      title: "Healthcare Mobile App",
      category: "Mobile Development",
      image: "/api/placeholder/600/400",
      description:
        "HIPAA-compliant mobile application for patient management, appointment scheduling, and telehealth consultations.",
      technologies: ["React Native", "Firebase", "WebRTC", "Stripe"],
      metrics: {
        downloads: "25K+",
        rating: "4.8/5",
        doctors: "500+",
      },
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      status: "Live",
      timeline: "8 months",
    },
    {
      title: "AI Analytics Dashboard",
      category: "Machine Learning",
      image: "/api/placeholder/600/400",
      description:
        "Advanced analytics platform with machine learning algorithms for predictive insights and automated reporting.",
      technologies: ["Python", "TensorFlow", "React", "Docker"],
      metrics: {
        accuracy: "94%",
        processing: "1M+ records",
        insights: "Real-time",
      },
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      status: "Live",
      timeline: "10 months",
    },
    {
      title: "Cloud Infrastructure",
      category: "DevOps & Cloud",
      image: "/api/placeholder/600/400",
      description:
        "Scalable cloud infrastructure with auto-scaling, monitoring, and CI/CD pipelines for enterprise applications.",
      technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins"],
      metrics: {
        servers: "100+",
        availability: "99.99%",
        deployments: "500+/month",
      },
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      status: "Live",
      timeline: "4 months",
    },
  ];

  const portfolioStats = [
    {
      value: "150+",
      label: "Projects Completed",
      description: "Successfully delivered projects across various industries",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      description:
        "Consistently exceeding client expectations and requirements",
      color: "from-green-500 to-teal-500",
    },
    {
      value: "24/7",
      label: "Support Available",
      description: "Round-the-clock support and maintenance services",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "5+",
      label: "Years Experience",
      description: "Proven track record in delivering quality solutions",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
            <Icon name="briefcase" size="sm" className="mr-2" />
            Our Portfolio
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Featured
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Discover our latest work and see how we've helped businesses
            transform their digital presence with innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-[600px] flex flex-col"
            >
              {/* Card Background */}
              <div
                className={`absolute inset-0 ${project.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Project Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-[16/10] h-[280px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    {project.status}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${project.color}`}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-6 flex-1 flex flex-col">
                {/* Title & Description */}
                <div className="mb-4 flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors overflow-hidden">
                    <span className="block truncate">{project.title}</span>
                  </h3>
                  <p
                    className="text-slate-600 leading-relaxed overflow-hidden text-sm"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 group-hover:bg-white group-hover:text-slate-800 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-4 flex-shrink-0">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Key Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(project.metrics).map(
                      ([key, value], idx) => (
                        <div
                          key={idx}
                          className="text-center p-2 rounded-lg bg-slate-50 group-hover:bg-white transition-colors"
                        >
                          <div
                            className={`text-sm font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                          >
                            {value}
                          </div>
                          <div className="text-xs text-slate-500 capitalize font-medium truncate">
                            {key}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 mt-auto">
                  <div className="flex items-center space-x-2">
                    <Icon name="clock" size="sm" className="text-slate-400" />
                    <span className="text-xs text-slate-500 font-medium">
                      {project.timeline}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 text-xs px-3 py-1"
                    rightIcon={<Icon name="arrow-right" size="sm" />}
                  >
                    Details
                  </Button>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-slate-200 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Portfolio Statistics */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 lg:p-16 shadow-2xl mb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
              Our Track Record
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Numbers that showcase our commitment to excellence and client
              success across all projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioStats.map((stat, index) => (
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              rightIcon={<Icon name="arrow-right" size="md" />}
            >
              Start Your Project
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-bold px-8 py-4 rounded-2xl transition-all duration-300"
            >
              View Full Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
