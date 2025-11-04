"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, Box } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { useWeb3Account } from "@/hooks/useWeb3";

// Parallax Layer Component
const ParallaxLayer: React.FC<{
  depth: number;
  scrollProgress: number;
  children: React.ReactNode;
}> = ({ depth, scrollProgress, children }) => {
  const { camera } = useThree();
  const layerRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (layerRef.current) {
      // Move layer based on scroll and depth
      layerRef.current.position.z = depth * scrollProgress * 10;
    }
  });

  return <group ref={layerRef}>{children}</group>;
};

// Unlockable Asset
const UnlockableAsset: React.FC<{
  position: [number, number, number];
  isUnlocked: boolean;
  requirement: string;
}> = ({ position, isUnlocked, requirement }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      if (!isUnlocked) {
        meshRef.current.rotation.y = state.clock.elapsedTime;
        meshRef.current.material.opacity = 0.3;
      } else {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        meshRef.current.material.opacity = 1;
      }
    }
  });

  return (
    <Float speed={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={isUnlocked ? "#8b5cf6" : "#6b7280"}
          metalness={0.8}
          roughness={0.2}
          transparent
          emissive={isUnlocked ? "#8b5cf6" : "#6b7280"}
          emissiveIntensity={isUnlocked ? 0.5 : 0.1}
        />
      </mesh>
    </Float>
  );
};

interface ParallaxScrolling3DProps {
  className?: string;
}

export const ParallaxScrolling3D: React.FC<ParallaxScrolling3DProps> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { isConnected, address } = useWeb3Account();
  const [unlockedAssets, setUnlockedAssets] = useState<string[]>([]);

  // Unlock assets based on wallet connection
  useEffect(() => {
    if (isConnected && address) {
      setUnlockedAssets(["wallet-connected", "signup-complete"]);
    }
  }, [isConnected, address]);

  const scrollZ = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div ref={containerRef} className={`relative min-h-[200vh] ${className}`}>
      {/* Background Layers */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, -10, -10]} color="#8b5cf6" />

          {/* Deep Background Layer */}
          <ParallaxLayer depth={-3} scrollProgress={scrollYProgress.get()}>
            <Sphere args={[5, 32, 32]} position={[-5, 0, -10]}>
              <meshStandardMaterial
                color="#1e3a8a"
                wireframe
                transparent
                opacity={0.1}
              />
            </Sphere>
          </ParallaxLayer>

          {/* Mid Layer */}
          <ParallaxLayer depth={-1} scrollProgress={scrollYProgress.get()}>
            <Box args={[3, 3, 3]} position={[3, 2, -5]}>
              <meshStandardMaterial
                color="#3b82f6"
                wireframe
                transparent
                opacity={0.2}
              />
            </Box>
          </ParallaxLayer>

          {/* Foreground Unlockable Assets */}
          <UnlockableAsset
            position={[-3, 1, 0]}
            isUnlocked={unlockedAssets.includes("wallet-connected")}
            requirement="Connect Wallet"
          />
          <UnlockableAsset
            position={[3, -1, 0]}
            isUnlocked={unlockedAssets.includes("signup-complete")}
            requirement="Complete Signup"
          />
        </Canvas>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 space-y-96">
        <section className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <h2 className="text-5xl font-black text-white mb-6">
              Unlock Special Assets
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Connect your wallet to unlock exclusive 3D assets and features
            </p>
          </motion.div>
        </section>

        <section className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <h2 className="text-5xl font-black text-white mb-6">
              Explore the Layers
            </h2>
            <p className="text-xl text-white/80">
              Scroll to see 3D elements move at different speeds
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default ParallaxScrolling3D;

