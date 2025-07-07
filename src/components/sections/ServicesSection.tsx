import React from "react";
import { motion } from "framer-motion";
import {
  ProfessionalCard,
  ParallaxText,
  professionalMotions,
} from "../animations";
import { Button, Icon } from "../ui";

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: "code",
      title: "Web Development",
      description:
        "Custom web applications built with modern technologies and best practices for optimal performance and user experience.",
      features: [
        "React/Next.js",
        "Node.js/Express",
        "TypeScript",
        "API Integration",
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/5",
      borderColor: "border-blue-500/20",
    },
    {
      icon: "phone",
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications that deliver seamless user experiences across all devices.",
      features: [
        "React Native",
        "iOS/Android",
        "Flutter",
        "Progressive Web Apps",
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/5",
      borderColor: "border-green-500/20",
    },
    {
      icon: "globe",
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and deployment solutions that grow with your business needs.",
      features: ["AWS/Azure", "Docker", "Kubernetes", "CI/CD Pipelines"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/5",
      borderColor: "border-purple-500/20",
    },
    {
      icon: "chip",
      title: "AI Integration",
      description:
        "Intelligent solutions powered by machine learning and artificial intelligence to automate and optimize your processes.",
      features: [
        "Machine Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Data Analytics",
      ],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/5",
      borderColor: "border-orange-500/20",
    },
    {
      icon: "shield-check",
      title: "Cybersecurity",
      description:
        "Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Compliance",
        "Risk Assessment",
      ],
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-500/5",
      borderColor: "border-red-500/20",
    },
    {
      icon: "support",
      title: "Technical Consulting",
      description:
        "Expert guidance and strategic planning to help you make informed technology decisions and optimize your systems.",
      features: [
        "Architecture Design",
        "Performance Optimization",
        "Technology Strategy",
        "Code Review",
      ],
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-500/5",
      borderColor: "border-cyan-500/20",
    },
  ];

  return (
    <div className="relative py-24 lg:py-32">
      {/* Remove background since it's handled by SmoothSection wrapper */}

      <div className="relative z-10 w-[95%] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
            <Icon name="code" size="sm" className="mr-2" />
            Our Services
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Comprehensive
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Digital Solutions
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We deliver cutting-edge technology solutions that drive business
            growth and digital transformation.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={professionalMotions.staggerContainer}
          initial="initial"
          animate="animate"
        >
          {services.map((service, index) => (
            <ProfessionalCard
              key={index}
              delay={index * 0.1}
              hoverEffect="lift"
              className={`group relative bg-white rounded-2xl border ${service.borderColor} shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-[420px] flex flex-col`}
            >
              {/* Card Background Gradient */}
              <div
                className={`absolute inset-0 ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Card Content */}
              <div className="relative z-10 p-8 flex-1 flex flex-col">
                {/* Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      name={service.icon as any}
                      size="lg"
                      className="text-white"
                    />
                  </div>
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <Icon
                      name="arrow-right"
                      size="sm"
                      className="text-slate-600"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors overflow-hidden">
                  <span className="block truncate">{service.title}</span>
                </h3>

                {/* Description */}
                <p
                  className="text-slate-600 leading-relaxed mb-6 text-sm flex-1 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <div className="mt-auto">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Key Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 group-hover:bg-white group-hover:text-slate-800 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 4 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-500">
                        +{service.features.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-slate-200 transition-colors duration-300"></div>
            </ProfessionalCard>
          ))}
        </motion.div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              rightIcon={<Icon name="arrow-right" size="md" />}
            >
              Get Started Today
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-bold px-8 py-4 rounded-2xl transition-all duration-300"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
