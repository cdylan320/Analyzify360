"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/components/ScrollAnimations";
import {
  SmoothSection,
  MorphingBackground,
} from "@/components/ProfessionalMotions";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import TrustBadges from "@/components/TrustBadges";
import TeamPreview from "@/components/TeamPreview";
import ProjectShowcase from "@/components/ProjectShowcase";

export default function Home() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Hero />
      <SmoothSection
        id="services"
        backgroundType="gradient"
        className="relative"
      >
        <MorphingBackground />
        <ServicesSection />
      </SmoothSection>
      <SmoothSection id="trust" backgroundType="pattern" overlayOpacity={0.05}>
        <TrustBadges />
      </SmoothSection>
      <SmoothSection id="team" backgroundType="mesh" overlayOpacity={0.08}>
        <TeamPreview />
      </SmoothSection>
      <SmoothSection
        id="projects"
        backgroundType="gradient"
        overlayOpacity={0.06}
      >
        <ProjectShowcase />
      </SmoothSection>
    </motion.div>
  );
}
