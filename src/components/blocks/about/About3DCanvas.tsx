"use client";

import { useMemo, useRef, useState, type ComponentRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { PillarKey } from "~/content/about";

const PILLAR_STYLE: Record<
  PillarKey,
  { color: string; emissive: string; distort: number }
> = {
  academic: { color: "#10b981", emissive: "#065f46", distort: 0.22 },
  stem: { color: "#2dd4bf", emissive: "#0f766e", distort: 0.38 },
  eco: { color: "#f59e0b", emissive: "#92400e", distort: 0.3 },
};

/**
 * One mesh that "morphs" between pillars: it contracts, swaps geometry and
 * colour at the smallest point, then springs back out with a burst of
 * surface distortion. The whole group leans toward the pointer.
 */
function MorphicCore({ pillar }: { pillar: PillarKey }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const shown = useRef<PillarKey>(pillar);
  const scale = useRef(1);
  const targetColor = useMemo(() => new THREE.Color(), []);
  const targetEmissive = useMemo(() => new THREE.Color(), []);

  const geometries = useMemo(
    () => ({
      academic: new THREE.IcosahedronGeometry(1.35, 4),
      stem: new THREE.TorusKnotGeometry(0.95, 0.32, 180, 24),
      eco: new THREE.SphereGeometry(1.3, 64, 64),
    }),
    [],
  );
  // Props are only the starting point: later pillar changes are animated in
  // useFrame, so geometry and colours must not be swapped by a re-render.
  const [initial] = useState(() => ({
    geometry: geometries[pillar],
    style: PILLAR_STYLE[pillar],
  }));

  useFrame((state, delta) => {
    const g = group.current;
    const m = mesh.current;
    const mat = material.current;
    if (!g || !m || !mat) return;

    const dt = Math.min(delta, 0.05);
    const morphing = shown.current !== pillar;

    // Contract while morphing, expand when settled.
    const targetScale = morphing ? 0.05 : 1;
    scale.current = THREE.MathUtils.damp(scale.current, targetScale, 9, dt);
    m.scale.setScalar(scale.current);

    if (morphing && scale.current < 0.12) {
      shown.current = pillar;
      m.geometry = geometries[pillar];
      mat.distort = 0.7; // burst, then settle below
    }

    const style = PILLAR_STYLE[shown.current];
    mat.distort = THREE.MathUtils.damp(mat.distort, style.distort, 2.5, dt);
    targetColor.set(style.color);
    targetEmissive.set(style.emissive);
    mat.color.lerp(targetColor, 1 - Math.exp(-6 * dt));
    mat.emissive.lerp(targetEmissive, 1 - Math.exp(-6 * dt));

    // Kinetic lean toward the pointer plus a slow idle spin.
    m.rotation.y += dt * 0.35;
    g.rotation.x = THREE.MathUtils.damp(
      g.rotation.x,
      state.pointer.y * -0.35,
      4,
      dt,
    );
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      state.pointer.x * 0.5,
      4,
      dt,
    );
  });

  return (
    <group ref={group} position={[0, 0.45, 0]} scale={0.78}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh ref={mesh} geometry={initial.geometry}>
          <MeshDistortMaterial
            ref={material}
            color={initial.style.color}
            emissive={initial.style.emissive}
            emissiveIntensity={0.35}
            roughness={0.18}
            metalness={0.7}
            distort={initial.style.distort}
            speed={2.2}
          />
        </mesh>
      </Float>
      <Orbiters />
    </group>
  );
}

/** Three small satellites on tilted orbits around the core. */
function Orbiters() {
  const ring = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += Math.min(delta, 0.05) * 0.6;
  });
  return (
    <group ref={ring} rotation={[1.1, 0.2, 0]}>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 2.2, Math.sin(a) * 2.2, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color="#fef3c7"
              emissive="#fbbf24"
              emissiveIntensity={1.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function About3DCanvas({
  pillar,
  active,
}: {
  pillar: PillarKey;
  active: boolean;
}) {
  return (
    <Canvas
      aria-hidden
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 8, 5]} intensity={1.5} />
      <pointLight position={[-6, -4, -4]} intensity={1.1} color="#34d399" />
      <MorphicCore pillar={pillar} />
    </Canvas>
  );
}
