import React from "react";
import Icon from "./Icon";

const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: "shield-check",
      title: "Security First",
      description:
        "Enterprise-grade security protocols and compliance standards to protect your data and business operations.",
      metric: "99.9%",
      metricLabel: "Uptime SLA",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: "users",
      title: "Expert Team",
      description:
        "Certified professionals with decades of combined experience in cutting-edge technologies and industry best practices.",
      metric: "50+",
      metricLabel: "Experts",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: "chart-bar",
      title: "Proven Results",
      description:
        "Consistent delivery of high-quality solutions that exceed client expectations and drive measurable business growth.",
      metric: "200+",
      metricLabel: "Projects",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: "support",
      title: "24/7 Support",
      description:
        "Round-the-clock technical support and maintenance services to ensure your systems run smoothly at all times.",
      metric: "<2hrs",
      metricLabel: "Response Time",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  const stats = [
    {
      value: "98%",
      label: "Client Retention Rate",
      description:
        "Long-term partnerships built on trust and exceptional service delivery",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "24/7",
      label: "Support Coverage",
      description: "Round-the-clock technical support and monitoring services",
      color: "from-green-500 to-teal-500",
    },
    {
      value: "150+",
      label: "Projects Delivered",
      description:
        "Successfully completed projects across various industries and scales",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "4.9/5",
      label: "Average Rating",
      description:
        "Consistently high ratings from satisfied clients and partners",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-purple-600 bg-purple-50 rounded-full border border-purple-200">
            <Icon name="shield-check" size="sm" className="mr-2" />
            Why Choose Us
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Trusted by
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6"></div>

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We've earned the trust of businesses worldwide through our
            commitment to excellence, innovation, and results.
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl border ${badge.borderColor} shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden`}
            >
              {/* Card Background */}
              <div
                className={`absolute inset-0 ${badge.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Card Content */}
              <div className="relative z-10 p-8 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${badge.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      name={badge.icon as any}
                      size="lg"
                      className="text-white"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                  {badge.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  {badge.description}
                </p>

                {/* Metric */}
                <div className="pt-4 border-t border-slate-200">
                  <div
                    className={`text-2xl font-black bg-gradient-to-r ${badge.color} bg-clip-text text-transparent mb-1`}
                  >
                    {badge.metric}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {badge.metricLabel}
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-slate-200 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 lg:p-16 shadow-2xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
              Our Track Record
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Numbers that speak to our commitment to excellence and client
              satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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
      </div>
    </section>
  );
};

export default TrustBadges;
