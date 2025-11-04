"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Icon } from "../ui";
import { useWeb3Account, useWeb3Balance } from "@/hooks/useWeb3";

interface NFTProduct {
  id: string;
  name: string;
  description: string;
  price: string; // in ETH
  image: string;
  metadata?: {
    rarity: string;
    traits: Array<{ trait_type: string; value: string }>;
  };
}

// 3D Product Model
const Product3D: React.FC<{
  product: NFTProduct;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}> = ({ product, isHovered, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      if (isHovered) {
        meshRef.current.scale.setScalar(1.1);
        meshRef.current.rotation.y = state.clock.elapsedTime;
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(product.id)}
        onPointerOut={() => onHover(null)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={isHovered ? "#8b5cf6" : "#3b82f6"}
          metalness={0.9}
          roughness={0.1}
          emissive={isHovered ? "#8b5cf6" : "#3b82f6"}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

interface ProductShowcase3DProps {
  products: NFTProduct[];
  className?: string;
}

export const ProductShowcase3D: React.FC<ProductShowcase3DProps> = ({
  products,
  className = "",
}) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<NFTProduct | null>(null);
  const { isConnected, address } = useWeb3Account();
  const { data: balance } = useWeb3Balance(address);

  const handleBuyWithCrypto = async (product: NFTProduct) => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    // TODO: Implement actual purchase logic
    console.log("Purchasing:", product, "for", product.price, "ETH");
  };

  const handleMintNFT = async (product: NFTProduct) => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    // TODO: Implement NFT minting logic
    console.log("Minting NFT:", product);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3D Viewport */}
        <div className="relative h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <pointLight position={[-10, -10, -10]} color="#8b5cf6" />
            <Environment preset="city" />

            {products.map((product, index) => {
              const angle = (index / products.length) * Math.PI * 2;
              const radius = 3;
              const position: [number, number, number] = [
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0,
              ];

              return (
                <group key={product.id} position={position}>
                  <Product3D
                    product={product}
                    isHovered={hoveredProduct === product.id}
                    onHover={setHoveredProduct}
                  />
                </group>
              );
            })}

            <OrbitControls enableZoom={true} enablePan={false} />
          </Canvas>

          {/* Hover Info Overlay */}
          <AnimatePresence>
            {hoveredProduct && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-200"
              >
                <h3 className="font-bold text-slate-900 mb-2">
                  {products.find((p) => p.id === hoveredProduct)?.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {products.find((p) => p.id === hoveredProduct)?.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {product.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-600 mb-1">
                    {product.price} ETH
                  </div>
                  {product.metadata && (
                    <div className="text-xs text-slate-500">
                      Rarity: {product.metadata.rarity}
                    </div>
                  )}
                </div>
              </div>

              {product.metadata?.traits && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.metadata.traits.map((trait, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                    >
                      {trait.trait_type}: {trait.value}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={() => handleBuyWithCrypto(product)}
                  className="flex-1"
                  rightIcon={<Icon name="wallet" size="sm" />}
                >
                  Buy with Crypto
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleMintNFT(product)}
                  className="flex-1"
                  rightIcon={<Icon name="sparkles" size="sm" />}
                >
                  Mint NFT
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase3D;

