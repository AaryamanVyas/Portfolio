"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Mesh } from "three";

function AbstractObject() {
  const meshRef = useRef<Mesh | null>(null);

  const color = useMemo(() => ({ emissive: "#a78bfa", base: "#0ea5e9" }), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.14;
    meshRef.current.rotation.y += delta * 0.18;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.45} floatIntensity={0.9}>
      <mesh ref={meshRef} position={[0.8, -0.1, 0]}>
        <torusKnotGeometry args={[0.8, 0.22, 220, 28]} />
        <meshStandardMaterial
          color={color.base}
          metalness={0.5}
          roughness={0.18}
          emissive={color.emissive}
          emissiveIntensity={0.22}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 3.3], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 2, 2]} intensity={1.15} color="#c7d2fe" />
        <pointLight position={[-3, -1, 3]} intensity={0.9} color="#67e8f9" />

        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>

        <Suspense fallback={null}>
          <AbstractObject />
        </Suspense>
      </Canvas>
    </div>
  );
}

