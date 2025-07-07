"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as d3 from "d3";
import Button from "./Button";
import Icon from "./Icon";
import { companyInfo } from "@/data/content";
import { professionalMotions, ParallaxText } from "./ProfessionalMotions";

const Hero: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 1200;
    const height = 600;

    // Clear previous content
    svg.selectAll("*").remove();

    // Create simple network visualization
    const nodes = [
      { id: "center", x: width / 2, y: height / 2, r: 25, color: "#0ea5e9" },
      {
        id: "web",
        x: width / 2 - 200,
        y: height / 2 - 100,
        r: 20,
        color: "#f59e0b",
      },
      {
        id: "mobile",
        x: width / 2 + 200,
        y: height / 2 - 100,
        r: 20,
        color: "#10b981",
      },
      {
        id: "cloud",
        x: width / 2 - 150,
        y: height / 2 + 120,
        r: 18,
        color: "#8b5cf6",
      },
      {
        id: "ai",
        x: width / 2 + 150,
        y: height / 2 + 120,
        r: 18,
        color: "#ef4444",
      },
      {
        id: "data",
        x: width / 2,
        y: height / 2 - 180,
        r: 16,
        color: "#06b6d4",
      },
      {
        id: "security",
        x: width / 2,
        y: height / 2 + 200,
        r: 16,
        color: "#f97316",
      },
    ];

    const links = [
      { source: "center", target: "web" },
      { source: "center", target: "mobile" },
      { source: "center", target: "cloud" },
      { source: "center", target: "ai" },
      { source: "center", target: "data" },
      { source: "center", target: "security" },
    ];

    // Create gradients
    const defs = svg.append("defs");

    // Link gradient
    const linkGradient = defs
      .append("linearGradient")
      .attr("id", "link-gradient")
      .attr("gradientUnits", "userSpaceOnUse");

    linkGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#0ea5e9")
      .attr("stop-opacity", 0.8);

    linkGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#8b5cf6")
      .attr("stop-opacity", 0.8);

    // Create links
    links.forEach((link) => {
      const sourceNode = nodes.find((n) => n.id === link.source);
      const targetNode = nodes.find((n) => n.id === link.target);

      if (sourceNode && targetNode) {
        svg
          .append("line")
          .attr("x1", sourceNode.x)
          .attr("y1", sourceNode.y)
          .attr("x2", targetNode.x)
          .attr("y2", targetNode.y)
          .attr("stroke", "url(#link-gradient)")
          .attr("stroke-width", 3)
          .attr("opacity", 0.7)
          .attr("class", "network-link");
      }
    });

    // Create nodes
    nodes.forEach((node, i) => {
      const nodeGroup = svg
        .append("g")
        .attr("transform", `translate(${node.x}, ${node.y})`)
        .attr("class", "network-node");

      // Add gradient for node
      const nodeGradient = defs
        .append("radialGradient")
        .attr("id", `node-gradient-${i}`)
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");

      nodeGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", node.color)
        .attr("stop-opacity", 1);

      nodeGradient
        .append("stop")
        .attr("offset", "100%")
        .attr(
          "stop-color",
          d3.color(node.color)?.darker(1)?.toString() || node.color
        )
        .attr("stop-opacity", 0.8);

      nodeGroup
        .append("circle")
        .attr("r", node.r)
        .attr("fill", `url(#node-gradient-${i})`)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2)
        .attr("filter", "drop-shadow(0 0 10px rgba(0,0,0,0.3))");
    });

    // Add simple CSS animations via classes
    const style = document.createElement("style");
    style.textContent = `
      .network-node {
        animation: pulse 2s ease-in-out infinite;
      }
      .network-link {
        animation: flow 3s linear infinite;
        stroke-dasharray: 10, 5;
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      @keyframes flow {
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (!particlesRef.current) return;

    const svg = d3.select(particlesRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.selectAll("*").remove();

    // Create simple floating particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      color: ["#0ea5e9", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"][
        Math.floor(Math.random() * 5)
      ],
    }));

    particles.forEach((particle) => {
      svg
        .append("circle")
        .attr("cx", particle.x)
        .attr("cy", particle.y)
        .attr("r", particle.r)
        .attr("fill", particle.color)
        .attr("opacity", particle.opacity)
        .attr("class", "floating-particle");
    });

    // Add particle animation CSS
    const particleStyle = document.createElement("style");
    particleStyle.textContent = `
      .floating-particle {
        animation: float 8s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
    `;
    document.head.appendChild(particleStyle);
  }, []);

  return (
    <motion.section
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          rgba(15, 23, 42, 0.95) 0%, 
          rgba(30, 58, 138, 0.9) 35%, 
          rgba(67, 56, 202, 0.85) 70%, 
          rgba(15, 23, 42, 0.9) 100%)`,
      }}
      initial="initial"
      animate="animate"
      variants={professionalMotions.sectionTransition}
    >
      {/* Floating Particles Background */}
      <svg
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Professional Announcement Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-xl border-b border-blue-400/30 z-20">
        <div className="max-w-none px-8 py-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <p className="text-blue-100 font-semibold tracking-wide text-sm uppercase">
              {companyInfo.announcement}
            </p>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width Professional Layout */}
      <div className="relative z-10 pt-20">
        <div className="max-w-none px-8 lg:px-16 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center min-h-[80vh]">
            {/* Left Content - 7 columns */}
            <motion.div
              className="lg:col-span-7 space-y-12"
              variants={professionalMotions.staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Main Heading */}
              <div className="space-y-8">
                <ParallaxText speed={0.3}>
                  <motion.h1
                    className="text-5xl lg:text-8xl font-black leading-tight"
                    variants={professionalMotions.textReveal}
                  >
                    <motion.span
                      className="block text-white mb-4"
                      variants={professionalMotions.slideInLeft}
                    >
                      Transform Your
                    </motion.span>
                    <motion.span
                      className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4"
                      variants={professionalMotions.scaleInBounce}
                    >
                      Digital Vision
                    </motion.span>
                    <motion.span
                      className="block text-white"
                      variants={professionalMotions.slideInRight}
                    >
                      Into Reality
                    </motion.span>
                  </motion.h1>
                </ParallaxText>

                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>

                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-4xl font-light">
                  {companyInfo.description}
                </p>
              </div>

              {/* Professional CTA Section */}
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <Button
                  variant="primary"
                  size="xl"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 border border-blue-400/30"
                  rightIcon={<Icon name="arrow-right" size="md" />}
                >
                  Start Your Project
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="border-2 border-slate-400 text-slate-300 hover:bg-slate-800 hover:text-white font-bold px-12 py-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-slate-300"
                >
                  View Portfolio
                </Button>
              </div>

              {/* Professional Stats Grid */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-700">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-blue-400 mb-2">
                    150+
                  </div>
                  <div className="text-slate-400 font-medium text-sm uppercase tracking-wide">
                    Projects Delivered
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-cyan-400 mb-2">
                    24/7
                  </div>
                  <div className="text-slate-400 font-medium text-sm uppercase tracking-wide">
                    Expert Support
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-teal-400 mb-2">
                    99%
                  </div>
                  <div className="text-slate-400 font-medium text-sm uppercase tracking-wide">
                    Client Satisfaction
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - 5 columns - D3.js Visualization */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
                {/* D3.js Network Visualization */}
                <svg
                  ref={svgRef}
                  viewBox="0 0 1200 600"
                  className="w-full h-auto max-h-[500px]"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
                  }}
                />

                {/* Technology Labels */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-700">
                    <span className="text-blue-400 font-bold text-sm">
                      Web Development
                    </span>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-700">
                    <span className="text-cyan-400 font-bold text-sm">
                      Cloud Solutions
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-700">
                    <span className="text-teal-400 font-bold text-sm">
                      Mobile Apps
                    </span>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-700">
                    <span className="text-purple-400 font-bold text-sm">
                      AI Integration
                    </span>
                  </div>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center animate-bounce shadow-lg">
                  <Icon name="code" size="lg" className="text-white" />
                </div>

                <div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-bounce shadow-lg"
                  style={{ animationDelay: "1s" }}
                >
                  <Icon name="rocket" size="lg" className="text-white" />
                </div>

                <div
                  className="absolute top-1/2 -right-8 w-14 h-14 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center animate-bounce shadow-lg"
                  style={{ animationDelay: "2s" }}
                >
                  <Icon name="chip" size="md" className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>
    </motion.section>
  );
};

export default Hero;
