"use client";

/**
 * HeroScene Component
 *
 * 3D floating shapes using Three.js / React Three Fiber.
 * Renders animated geometric shapes (torus/gear-like, icosahedron, box)
 * as decorative background elements.
 */

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function GearShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[2.5, 0.5, 0]} scale={1.2}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <MeshDistortMaterial
          color="#3AAFE0"
          roughness={0.2}
          metalness={0.8}
          distort={0.1}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-2.5, -0.5, -1]} scale={0.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#F5D000"
          roughness={0.3}
          metalness={0.6}
          distort={0.2}
          speed={3}
        />
      </mesh>
    </Float>
  );
}

function SmallSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[0.5, -1.5, 0.5]} scale={0.5}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#1B7A4E"
          roughness={0.4}
          metalness={0.7}
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#F5D000" />
        <GearShape />
        <FloatingBox />
        <SmallSphere />
      </Canvas>
    </div>
  );
}
