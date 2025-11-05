"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { useWeb3Account } from "@/hooks/useWeb3";

interface ChartData {
  label: string;
  value: number;
  color: string;
}

// 3D Bar Chart Component
const Bar3D: React.FC<{
  data: ChartData;
  position: [number, number, number];
  isHovered: boolean;
  onHover: (label: string | null) => void;
}> = ({ data, position, isHovered, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const targetHeight = data.value / 10;
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        targetHeight,
        0.1
      );

      if (isHovered) {
        meshRef.current.scale.x = 1.2;
        meshRef.current.scale.z = 1.2;
      } else {
        meshRef.current.scale.x = 1;
        meshRef.current.scale.z = 1;
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(data.label)}
        onPointerOut={() => onHover(null)}
      >
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial
          color={isHovered ? "#8b5cf6" : data.color}
          metalness={0.7}
          roughness={0.3}
          emissive={data.color}
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {data.label}
      </Text>
    </group>
  );
};

interface Charts3DProps {
  blockchainData?: {
    ethPrice?: number;
    btcPrice?: number;
    nftVolume?: number;
    activeWallets?: number;
  };
  className?: string;
}

export const Charts3D: React.FC<Charts3DProps> = ({
  blockchainData = {
    ethPrice: 3000,
    btcPrice: 50000,
    nftVolume: 1000000,
    activeWallets: 5000000,
  },
  className = "",
}) => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const { isConnected } = useWeb3Account();

  // Normalize data for visualization
  const chartData: ChartData[] = [
    {
      label: "ETH",
      value: (blockchainData.ethPrice || 0) / 100,
      color: "#627EEA",
    },
    {
      label: "BTC",
      value: (blockchainData.btcPrice || 0) / 1000,
      color: "#F7931A",
    },
    {
      label: "NFT Vol",
      value: (blockchainData.nftVolume || 0) / 100000,
      color: "#8b5cf6",
    },
    {
      label: "Wallets",
      value: (blockchainData.activeWallets || 0) / 100000,
      color: "#06b6d4",
    },
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-black text-white mb-2">
            Blockchain Data Visualization
          </h3>
          <p className="text-slate-400">
            Real-time 3D visualization of blockchain metrics
            {isConnected && (
              <span className="ml-2 text-green-400">• Wallet Connected</span>
            )}
          </p>
        </div>

        <div className="h-[400px] bg-slate-950/50 rounded-xl overflow-hidden">
          <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <pointLight position={[-10, 10, -10]} color="#8b5cf6" />

            {chartData.map((data, index) => {
              const spacing = 2.5;
              const startX = -(chartData.length - 1) * spacing * 0.5;
              const position: [number, number, number] = [
                startX + index * spacing,
                0,
                0,
              ];

              return (
                <Bar3D
                  key={data.label}
                  data={data}
                  position={position}
                  isHovered={hoveredLabel === data.label}
                  onHover={setHoveredLabel}
                />
              );
            })}

            {/* Grid Floor */}
            <gridHelper args={[10, 10, "#3b82f6", "#1e3a8a"]} />
          </Canvas>
        </div>

        {/* Data Table */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartData.map((data) => (
            <div
              key={data.label}
              className={`p-4 rounded-xl border-2 transition-all ${
                hoveredLabel === data.label
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-700 bg-slate-800/50"
              }`}
            >
              <div className="text-sm text-slate-400 mb-1">{data.label}</div>
              <div className="text-2xl font-black text-white">
                {data.value.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charts3D;

