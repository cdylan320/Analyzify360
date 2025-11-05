"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button, Icon } from "../ui";
import { companyInfo } from "@/data/content";
import { professionalMotions, ParallaxText } from "../animations";

const Hero: React.FC = () => {
  const particlesRef = useRef<SVGSVGElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!particlesRef.current || !isClient) return;

    const svg = particlesRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Clear previous content
    svg.innerHTML = "";

    // Create elegant floating particles
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      color: ["#ffffff", "#e0f2fe", "#bae6fd"][Math.floor(Math.random() * 3)],
      velocity: {
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
      },
    }));

    // Create SVG elements
    particles.forEach((particle, i) => {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", particle.x.toString());
      circle.setAttribute("cy", particle.y.toString());
      circle.setAttribute("r", particle.r.toString());
      circle.setAttribute("fill", particle.color);
      circle.setAttribute("opacity", particle.opacity.toString());
      circle.setAttribute("class", "floating-particle");
      circle.setAttribute("data-index", i.toString());
      svg.appendChild(circle);
    });

    // Smooth particle animation
    const animate = () => {
      particles.forEach((particle, i) => {
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        const circle = svg.querySelector(
          `[data-index="${i}"]`
        ) as SVGCircleElement;
        if (circle) {
          circle.setAttribute("cx", particle.x.toString());
          circle.setAttribute("cy", particle.y.toString());
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional Background with Enhanced Integration */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* Enhanced Professional Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-slate-900/80 to-indigo-900/85"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

      {/* Subtle Geometric Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Floating Particles Background */}
      {isClient && (
        <svg
          ref={particlesRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ opacity: 0.6 }}
        />
      )}

      {/* Main Content */}
      <div className="relative z-20 w-[95%] max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="flex items-center justify-center min-h-[85vh]">
          {/* Main Content - Centered */}
          <div className="max-w-5xl mx-auto text-center space-y-12">
            {/* Main Heading with Enhanced Animations */}
            <div className="space-y-8">
              <ParallaxText speed={0.3}>
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight"
                  variants={professionalMotions.fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <motion.span
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white block mt-30 mb-7"
                    style={{
                      textShadow:
                        "0 4px 20px rgba(0, 0, 0, 0.8), 0 8px 40px rgba(0, 0, 0, 0.6)",
                    }}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      textShadow: [
                        "0 4px 20px rgba(0, 0, 0, 0.8), 0 8px 40px rgba(0, 0, 0, 0.6)",
                        "0 6px 30px rgba(255, 255, 255, 0.3), 0 10px 50px rgba(0, 0, 0, 0.8)",
                        "0 4px 20px rgba(0, 0, 0, 0.8), 0 8px 40px rgba(0, 0, 0, 0.6)",
                      ],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3,
                      textShadow: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    Stronger Together
                  </motion.span>
                  <motion.span
                    className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent block"
                    style={{
                      textShadow: "0 4px 20px rgba(34, 211, 238, 0.4)",
                      backgroundSize: "200% 200%",
                    }}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.6,
                      backgroundPosition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  >
                    Further &nbsp; Forever
                  </motion.span>
                </motion.h1>
              </ParallaxText>

              {/* Animated Subtitle */}
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-slate-200 leading-relaxed font-medium max-w-5xl mx-auto"
                variants={professionalMotions.fadeInUp}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  textShadow: [
                    "0 2px 10px rgba(0, 0, 0, 0.8)",
                    "0 4px 20px rgba(34, 211, 238, 0.3)",
                    "0 2px 10px rgba(0, 0, 0, 0.8)",
                  ],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.9,
                  textShadow: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                }}
              >
                <span className="text-4xl font-bold">Analyzify360 Global</span>
                <br />
                <span>{companyInfo.description}</span>
              </motion.p>

              {/* Animated Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center pt-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -50, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 60px rgba(34, 211, 238, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="primary"
                    size="xl"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-12 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 border border-cyan-400/30"
                    rightIcon={<Icon name="arrow-right" size="md" />}
                    onClick={() => {
                      window.location.href = "/careers#contact";
                    }}
                  >
                    Start Your Project
                  </Button>
                </motion.div>
                {/* <motion.div
                  initial={{ opacity: 0, x: 50, rotateY: 15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 60px rgba(255, 255, 255, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-2 border-white/60 text-white hover:bg-white/10 hover:border-white/80 hover:text-white font-bold px-12 py-6 text-lg rounded-2xl backdrop-blur-md shadow-2xl transition-all duration-300"
                    rightIcon={<Icon name="users" size="md" />}
                    onClick={() => {
                      window.location.href = "/team";
                    }}
                  >
                    Meet Our Team
                  </Button>
                </motion.div> */}
              </motion.div>
            </div>

            {/* Animated Key Features Grid */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-16 max-w-8xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {[
                {
                  icon: "globe",
                  text: "Global Network",
                  desc: "Local talent connected with engineers across 10+ countries",
                  color: "from-cyan-400 to-blue-500",
                },
                {
                  icon: "shield",
                  text: "Trusted Collaboration",
                  desc: "Transparent TaaS workflow with enterprise-grade security",
                  color: "from-emerald-400 to-teal-500",
                },
                {
                  icon: "zap",
                  text: "Rapid Delivery",
                  desc: "Agile hybrid teams deliver results twice as fast",
                  color: "from-orange-400 to-amber-500",
                },
                {
                  icon: "users",
                  text: "Mentored Experts",
                  desc: "Senior engineers guide every project to success",
                  color: "from-purple-400 to-indigo-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="group h-full"
                  initial={{
                    opacity: 0,
                    y: 60,
                    rotateX: -20,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 2.0 + index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(34, 211, 238, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="flex flex-col items-center space-y-4 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl hover:shadow-cyan-500/10 hover:bg-white/15 transition-all duration-300 h-full"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        rotate: 360,
                        transition: { duration: 0.6 },
                      }}
                    >
                      <Icon
                        name={feature.icon as any}
                        size="lg"
                        className="text-white"
                      />
                    </motion.div>
                    <div className="text-center">
                      <motion.h3
                        className="text-white font-bold text-lg mb-1"
                        style={{ textShadow: "0 1px 5px rgba(0, 0, 0, 0.8)" }}
                        animate={{
                          textShadow: [
                            "0 1px 5px rgba(0, 0, 0, 0.8)",
                            "0 2px 10px rgba(34, 211, 238, 0.4)",
                            "0 1px 5px rgba(0, 0, 0, 0.8)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {feature.text}
                      </motion.h3>
                      <p
                        className="text-slate-300 text-sm"
                        style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.8)" }}
                      >
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated Trust Indicators */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-8 pt-12 opacity-80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: 0.8, delay: 2.8 }}
            >
              {[
                {
                  number: "12+",
                  label: "Projects Delivered",
                  color: "text-cyan-300",
                },
                {
                  number: "99%",
                  label: "Client Satisfaction",
                  color: "text-emerald-300",
                },
                {
                  number: "24/7",
                  label: "Support Available",
                  color: "text-purple-300",
                },
              ].map((stat, index) => (
                <React.Fragment key={stat.label}>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 3.0 + index * 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.div
                      className={`text-3xl font-black ${stat.color} mb-1`}
                      style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
                      animate={{
                        scale: [1, 1.05, 1],
                        textShadow: [
                          "0 2px 10px rgba(0, 0, 0, 0.8)",
                          "0 4px 20px rgba(34, 211, 238, 0.5)",
                          "0 2px 10px rgba(0, 0, 0, 0.8)",
                        ],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div
                      className="text-slate-300 text-sm font-medium"
                      style={{ textShadow: "0 1px 5px rgba(0, 0, 0, 0.8)" }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                  {index < 2 && (
                    <motion.div
                      className="w-px h-8 bg-white/20"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 3.2 + index * 0.2 }}
                    />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.01);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
