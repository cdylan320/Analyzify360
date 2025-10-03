"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Floating Particles Component
const FloatingParticles: React.FC<{ count?: number }> = ({ count = 2000 }) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

// Animated Spheres Component
const AnimatedSpheres: React.FC = () => {
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);

  const sphereData = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.5,
      color: ["#3b82f6", "#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444"][i],
    }));
  }, []);

  useFrame((state) => {
    sphereRefs.current.forEach((sphere, i) => {
      if (sphere) {
        sphere.position.y =
          sphereData[i].position[1] +
          Math.sin(state.clock.elapsedTime + i) * 0.5;
        sphere.rotation.x = state.clock.elapsedTime * 0.5;
        sphere.rotation.y = state.clock.elapsedTime * 0.3;
      }
    });
  });

  return (
    <>
      {sphereData.map((sphere, i) => (
        <mesh
          key={i}
          ref={(el) => (sphereRefs.current[i] = el)}
          position={sphere.position}
          scale={sphere.scale}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={sphere.color}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </>
  );
};

// Geometric Shapes Component
const GeometricShapes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Torus */}
      <mesh position={[-3, 2, -2]}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Octahedron */}
      <mesh position={[3, -2, -1]}>
        <octahedronGeometry args={[1.5]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Dodecahedron */}
      <mesh position={[0, 0, -3]}>
        <dodecahedronGeometry args={[1]} />
        <meshStandardMaterial
          color="#f59e0b"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

// Main 3D Background Component
interface ThreeBackgroundProps {
  variant?: "particles" | "spheres" | "geometric" | "minimal";
  className?: string;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  variant = "particles",
  className = "",
}) => {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {variant === "particles" && <FloatingParticles />}
        {variant === "spheres" && <AnimatedSpheres />}
        {variant === "geometric" && <GeometricShapes />}
        {variant === "minimal" && (
          <>
            <FloatingParticles count={500} />
            <AnimatedSpheres />
          </>
        )}
      </Canvas>
    </div>
  );
};

// Professional Grid Background
export const GridBackground: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "10px 10px",
        }}
      />
    </div>
  );
};

// Animated Gradient Background
export const AnimatedGradientBackground: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)
          `,
          animation: "gradientShift 10s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          33% {
            transform: translateX(30px) translateY(-30px) rotate(120deg);
          }
          66% {
            transform: translateX(-20px) translateY(20px) rotate(240deg);
          }
        }
      `}</style>
    </div>
  );
};

// Professional Dots Pattern
export const DotsPattern: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.4) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(6, 182, 212, 0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          backgroundPosition: "30px 30px",
        }}
      />
    </div>
  );
};
