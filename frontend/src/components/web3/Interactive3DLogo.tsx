"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Center, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useWeb3Account } from "@/hooks/useWeb3";

// 3D Logo Component that responds to cursor
const Logo3D: React.FC<{ mousePosition: [number, number] }> = ({
  mousePosition,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isConnected } = useWeb3Account();

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate based on mouse position
      meshRef.current.rotation.y = mousePosition[0] * 0.5;
      meshRef.current.rotation.x = mousePosition[1] * 0.3;
      
      // Add subtle animation
      meshRef.current.rotation.y += state.clock.elapsedTime * 0.1;
      
      // Pulse effect when wallet is connected
      if (isConnected) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial
            color={isConnected ? "#8b5cf6" : "#3b82f6"}
            metalness={0.8}
            roughness={0.2}
            emissive={isConnected ? "#8b5cf6" : "#3b82f6"}
            emissiveIntensity={0.3}
          />
        </mesh>
      </Center>
    </Float>
  );
};

// Floating Particles
const Particles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 1000;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#3b82f6" transparent opacity={0.6} />
    </points>
  );
};

interface Interactive3DLogoProps {
  className?: string;
}

export const Interactive3DLogo: React.FC<Interactive3DLogoProps> = ({
  className = "",
}) => {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition([x, y]);
  };

  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" />
        
        <Logo3D mousePosition={mousePosition} />
        <Particles />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </motion.div>
  );
};

export default Interactive3DLogo;

