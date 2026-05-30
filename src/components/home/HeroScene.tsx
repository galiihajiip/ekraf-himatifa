"use client";

/**
 * HeroScene Component
 *
 * 3D floating objects related to IT & Ekonomi Kreatif:
 * - Laptop/monitor shape (IT)
 * - Coin/currency (ekonomi)
 * - Gear (kreativitas/teknologi)
 */

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/** 3D Laptop/Monitor - represents IT */
function Monitor3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={[3, 0.5, 0]} scale={0.7}>
        {/* Screen */}
        <RoundedBox args={[2.4, 1.6, 0.1]} radius={0.05}>
          <meshStandardMaterial color="#1A3A5C" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.1, 1.3]} />
          <meshStandardMaterial color="#3AAFE0" emissive="#3AAFE0" emissiveIntensity={0.3} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -1.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
          <meshStandardMaterial color="#1A3A5C" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Base */}
        <mesh position={[0, -1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.05, 16]} />
          <meshStandardMaterial color="#1A3A5C" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

/** 3D Coin - represents ekonomi/uang */
function Coin3D() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1}>
      <mesh ref={meshRef} position={[-2.8, -0.3, 0.5]} scale={0.9}>
        <cylinderGeometry args={[0.8, 0.8, 0.12, 32]} />
        <meshStandardMaterial
          color="#F5D000"
          metalness={0.95}
          roughness={0.05}
          emissive="#F5D000"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

/** Second smaller coin */
function CoinSmall() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[-1.5, 1.2, -0.5]} scale={0.5}>
        <cylinderGeometry args={[0.8, 0.8, 0.12, 32]} />
        <meshStandardMaterial
          color="#F5D000"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

/** 3D Gear - represents teknologi/kreativitas */
function Gear3D() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[1, -1.8, -1]} scale={0.6}>
        <torusGeometry args={[0.8, 0.25, 8, 6]} />
        <meshStandardMaterial
          color="#3AAFE0"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 4]} intensity={0.5} color="#F5D000" />
        <pointLight position={[3, -2, 3]} intensity={0.3} color="#3AAFE0" />
        <Monitor3D />
        <Coin3D />
        <CoinSmall />
        <Gear3D />
      </Canvas>
    </div>
  );
}
