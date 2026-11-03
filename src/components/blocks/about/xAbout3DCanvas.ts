"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import type * as THREE from "three";

export type MorphPillar = "academic" | "stem" | "eco";

function MorphicCore({ activePillar, wireframe }: { activePillar: MorphPillar; wireframe: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.28;
    meshRef.current.rotation.y += delta * 0.38;
  });

  if (activePillar === "academic") {
    return (
      <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh ref={meshRef} scale={1.35}>
          <icosahedronGeometry args={[1.45, 1]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.25} roughness={0.15} metalness={0.85} wireframe={wireframe} />
        </mesh>
      </Float>
    );
  }

  if (activePillar === "stem") {
    return (
      <Float speed={3.0} rotationIntensity={1.6} floatIntensity={1.7}>
        <mesh ref={meshRef} scale={1.15}>
          <torusKnotGeometry args={[1.15, 0.36, 128, 32]} />
          <MeshDistortMaterial color="#2dd4bf" emissive="#0d9488" emissiveIntensity={0.3} roughness={0.2} metalness={0.75} distort={0.35} speed={2.8} wireframe={wireframe} />
        </mesh>
      </Float>
    );
  }

  return (
    <Float speed={2.0} rotationIntensity={0.9} floatIntensity={1.3}>
      <mesh ref={meshRef} scale={1.3}>
        <sphereGeometry args={[1.38, 36, 36]} />
        <MeshWobbleMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.25} roughness={0.25} metalness={0.65} factor={0.45} speed={2.2} wireframe={wireframe} />
      </mesh>
    </Float>
  );
}

export function About3DCanvas({ activePillar = "academic", onPillarSelect }: { activePillar?: MorphPillar; onPillarSelect?: (p: MorphPillar) => void }) {
  const [pillar, setPillar] = useState<MorphPillar>(activePillar);
  const [wireframe, setWireframe] = useState(true);
  const current = onPillarSelect ? activePillar : pillar;
  const select = (p: MorphPillar) => { setPillar(p); onPillarSelect?.(p); };

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden bg-slate-950/80 border border-slate-800/90 shadow-2xl">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5.0]} fov={45} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[10, 10, 5]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.9} color="#10b981" />
        <Stars radius={50} depth={35} count={600} factor={4} saturation={0} fade speed={1} />
        <MorphicCore activePillar={current} wireframe={wireframe} />
        <OrbitControls enableZoom={true} minDistance={2.5} maxDistance={6.8} enablePan={false} />
      </Canvas>
      <div className="absolute top-4 left-4 z-10 max-w-[240px] bg-slate-900/80 backdrop-blur-md p-2.5 rounded-2xl border border-emerald-500/30">
        <div className="flex items-center space-x-2.5">
          <img src="/api/images/resolve/FrontView1_alaabu.jpg" alt="MSNS Campus" className="w-11 h-11 rounded-xl object-cover border border-emerald-400/30" />
          <div>
            <p className="text-[10px] uppercase font-bold text-emerald-400">Campus View</p>
            <p className="text-xs font-semibold text-white">Main Academic Wing</p>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <button type="button" onClick={() => setWireframe(!wireframe)} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/85 text-emerald-400 border border-slate-700">
          Wireframe: {wireframe ? "ON" : "OFF"}
        </button>
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between bg-slate-900/85 backdrop-blur-md p-2.5 px-4 rounded-2xl border border-slate-700/70 text-xs">
        <span className="font-mono text-[11px] text-slate-300">3D Morphic Core: {current.toUpperCase()}</span>
        <div className="flex space-x-1.5">
          <button type="button" onClick={() => select("academic")} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${current === "academic" ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-300"}`}>Academic</button>
          <button type="button" onClick={() => select("stem")} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${current === "stem" ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-300"}`}>AI Lab</button>
          <button type="button" onClick={() => select("eco")} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${current === "eco" ? "bg-amber-500 text-white" : "bg-slate-800 text-slate-300"}`}>Solar</button>
        </div>
      </div>
    </div>
  );
            }
