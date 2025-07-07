import React from "react";
import Button from "./Button";
import Icon from "./Icon";
import { companyInfo } from "@/data/content";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Announcement Bar */}
      <div className="absolute top-0 left-0 right-0 bg-accent text-white text-center py-3 z-10">
        <p className="text-sm font-medium">{companyInfo.announcement}</p>
      </div>

      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-full lg:w-1/2 bg-primary"></div>
        <div className="hidden lg:block w-1/2 bg-background"></div>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white lg:text-left text-center">
            <h1 className="text-4xl lg:text-6xl font-bold uppercase leading-tight mb-6">
              {companyInfo.tagline}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="xl"
                pill
                rightIcon={<Icon name="arrow-right" size="md" />}
                className="animate-pulse-accent"
              >
                Let's Build Together
              </Button>
              <Button
                variant="outline"
                size="xl"
                pill
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right Content - Animated Network */}
          <div className="hidden lg:block">
            <div className="relative w-full h-96">
              {/* Animated Network Visualization */}
              <svg
                className="w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Network Nodes */}
                <circle
                  cx="100"
                  cy="100"
                  r="8"
                  fill="#1976d2"
                  className="animate-pulse"
                />
                <circle
                  cx="300"
                  cy="120"
                  r="6"
                  fill="#1976d2"
                  className="animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <circle
                  cx="200"
                  cy="200"
                  r="10"
                  fill="#1976d2"
                  className="animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <circle
                  cx="80"
                  cy="280"
                  r="6"
                  fill="#1976d2"
                  className="animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                />
                <circle
                  cx="320"
                  cy="300"
                  r="8"
                  fill="#1976d2"
                  className="animate-pulse"
                  style={{ animationDelay: "2s" }}
                />

                {/* Network Connections */}
                <path
                  d="M100 100 L300 120"
                  stroke="#1976d2"
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-pulse"
                />
                <path
                  d="M100 100 L200 200"
                  stroke="#1976d2"
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                />
                <path
                  d="M300 120 L200 200"
                  stroke="#1976d2"
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                />
                <path
                  d="M200 200 L80 280"
                  stroke="#1976d2"
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-pulse"
                  style={{ animationDelay: "0.9s" }}
                />
                <path
                  d="M200 200 L320 300"
                  stroke="#1976d2"
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-pulse"
                  style={{ animationDelay: "1.2s" }}
                />
                <path
                  d="M80 280 L320 300"
                  stroke="#1976d2"
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                />
              </svg>

              {/* Floating Elements */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-accent rounded-full flex items-center justify-center animate-bounce">
                <Icon name="chip" size="lg" className="text-white" />
              </div>
              <div
                className="absolute bottom-20 left-10 w-12 h-12 bg-accent rounded-full flex items-center justify-center animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <Icon name="code" size="md" className="text-white" />
              </div>
              <div
                className="absolute top-1/2 right-20 w-14 h-14 bg-accent rounded-full flex items-center justify-center animate-bounce"
                style={{ animationDelay: "2s" }}
              >
                <Icon name="rocket" size="lg" className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
