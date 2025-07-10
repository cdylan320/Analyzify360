"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  Variants,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  Float,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";

// Professional Motion Variants
export const professionalMotions: { [key: string]: Variants } = {
  // Smooth section transitions
  sectionTransition: {
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        staggerChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  },

  // Floating elements
  floatingElement: {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Scale in with bounce
  scaleInBounce: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        duration: 0.8,
      },
    },
  },

  // Slide in from sides
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  },

  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  },

  // Text reveal animation
  textReveal: {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  },

  // Stagger container
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
};

// Smooth Section Wrapper Component
interface SmoothSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  backgroundType?: "gradient" | "pattern" | "solid" | "mesh";
  overlayOpacity?: number;
}

export const SmoothSection: React.FC<SmoothSectionProps> = ({
  children,
  className = "",
  id,
  backgroundType = "gradient",
  overlayOpacity = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const backgroundVariants = {
    gradient: "bg-gradient-to-br from-white via-slate-50 to-blue-50",
    pattern: "bg-white",
    solid: "bg-slate-50",
    mesh: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative overflow-hidden smooth-section-transition ${backgroundVariants[backgroundType]} ${className}`}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={professionalMotions.sectionTransition}
      style={{ opacity }}
    >
      {/* Smooth Background Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/5"
        style={{ y, opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
};

// Advanced 3D Background Component
const AdvancedParticleSystem: React.FC<{ count?: number }> = ({
  count = 3000,
}) => {
  const ref = useRef<THREE.Points>(null);
  const [positions, colors] = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Create spiral galaxy pattern
      const radius = Math.random() * 15;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 10;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Color based on distance from center
      const distance = Math.sqrt(
        positions[i * 3] ** 2 + positions[i * 3 + 2] ** 2
      );
      const colorIntensity = 1 - distance / 15;

      colors[i * 3] = 0.3 + colorIntensity * 0.7; // R
      colors[i * 3 + 1] = 0.5 + colorIntensity * 0.5; // G
      colors[i * 3 + 2] = 0.8 + colorIntensity * 0.2; // B
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Points
      ref={ref}
      positions={positions}
      colors={colors}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        opacity={0.8}
      />
    </Points>
  );
};

// Floating Geometric Shapes
const FloatingGeometry: React.FC = () => {
  const shapes = [
    { position: [-4, 2, -5], geometry: "sphere", color: "#3b82f6" },
    { position: [4, -2, -3], geometry: "box", color: "#06b6d4" },
    { position: [-2, -3, -4], geometry: "octahedron", color: "#8b5cf6" },
    { position: [3, 3, -6], geometry: "torus", color: "#f59e0b" },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <Float
          key={index}
          speed={1 + index * 0.5}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={shape.position as [number, number, number]}
        >
          <mesh>
            {shape.geometry === "sphere" && (
              <sphereGeometry args={[0.8, 32, 32]} />
            )}
            {shape.geometry === "box" && <boxGeometry args={[1, 1, 1]} />}
            {shape.geometry === "octahedron" && (
              <octahedronGeometry args={[1]} />
            )}
            {shape.geometry === "torus" && (
              <torusGeometry args={[1, 0.3, 16, 100]} />
            )}
            <MeshDistortMaterial
              color={shape.color}
              transparent
              opacity={0.3}
              distort={0.3}
              speed={2}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

// Professional 3D Background
export const Professional3DBackground: React.FC<{
  variant?: "particles" | "geometric" | "mixed";
}> = ({ variant = "mixed" }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#8b5cf6"
        />

        {(variant === "particles" || variant === "mixed") && (
          <AdvancedParticleSystem />
        )}
        {(variant === "geometric" || variant === "mixed") && (
          <FloatingGeometry />
        )}
      </Canvas>
    </div>
  );
};

// Morphing Background Component
export const MorphingBackground: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Parallax Text Component
interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  speed = 0.5,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// Professional Card with Advanced Animations
interface ProfessionalCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "rotate" | "scale";
  delay?: number;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  children,
  className = "",
  hoverEffect = "lift",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const hoverVariants = {
    lift: {
      whileHover: { y: -8, scale: 1.02, transition: { duration: 0.3 } },
    },
    glow: {
      whileHover: {
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
        transition: { duration: 0.3 },
      },
    },
    rotate: {
      whileHover: {
        rotateY: 5,
        rotateX: 2,
        transition: { duration: 0.3 },
      },
    },
    scale: {
      whileHover: { scale: 1.05, transition: { duration: 0.3 } },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`professional-card professional-hover ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      {...hoverVariants[hoverEffect]}
    >
      {children}
    </motion.div>
  );
};

// Smooth Scroll Progress Indicator
export const ScrollProgressIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// Professional Loading Animation
export const ProfessionalLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
