"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Icon } from "../ui";
import { useWeb3Account } from "@/hooks/useWeb3";

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  locked?: boolean;
  requiredNFT?: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", path: "/", icon: "home" },
  { id: "services", label: "Services", path: "/services", icon: "briefcase" },
  { id: "about", label: "About", path: "/about", icon: "users" },
  { id: "team", label: "Team", path: "/team", icon: "users" },
  { id: "blog", label: "Blog", path: "/blog", icon: "lightbulb" },
  { id: "careers", label: "Careers", path: "/careers", icon: "briefcase" },
  { id: "contact", label: "Contact", path: "/contact", icon: "mail" },
];

// 3D Navigation Item
const NavItem3D: React.FC<{
  item: NavItem;
  position: [number, number, number];
  isHovered: boolean;
  isLocked: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
}> = ({ item, position, isHovered, isLocked, onHover, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isConnected } = useAccount();

  useFrame((state) => {
    if (meshRef.current) {
      if (isHovered) {
        meshRef.current.scale.setScalar(1.2);
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.1;
      } else {
        meshRef.current.scale.setScalar(1);
        meshRef.current.position.y = position[1];
      }
      
      if (isLocked && !isConnected) {
        meshRef.current.rotation.y = state.clock.elapsedTime;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3}>
      <Center position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => onHover(item.id)}
          onPointerOut={() => onHover(null)}
          onClick={onClick}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={isLocked && !isConnected ? "#6b7280" : isHovered ? "#8b5cf6" : "#3b82f6"}
            metalness={0.8}
            roughness={0.2}
            emissive={isHovered ? "#8b5cf6" : "#3b82f6"}
            emissiveIntensity={isHovered ? 0.5 : 0.2}
          />
        </mesh>
      </Center>
    </Float>
  );
};

interface Navigation3DProps {
  className?: string;
}

export const Navigation3D: React.FC<Navigation3DProps> = ({
  className = "",
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { isConnected } = useWeb3Account();

  const handleItemClick = (path: string, locked: boolean) => {
    if (!locked || isConnected) {
      window.location.href = path;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" />

        {navItems.map((item, index) => {
          const angle = (index / navItems.length) * Math.PI * 2;
          const radius = 4;
          const position: [number, number, number] = [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0,
          ];
          const isLocked = item.locked || false;
          const isHovered = hoveredItem === item.id;

          return (
            <NavItem3D
              key={item.id}
              item={item}
              position={position}
              isHovered={isHovered}
              isLocked={isLocked}
              onHover={setHoveredItem}
              onClick={() => handleItemClick(item.path, isLocked)}
            />
          );
        })}
      </Canvas>

      {/* 2D Labels Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="pointer-events-auto"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-2xl border border-slate-200">
                <p className="text-slate-900 font-bold text-lg">
                  {navItems.find((item) => item.id === hoveredItem)?.label}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navigation3D;

