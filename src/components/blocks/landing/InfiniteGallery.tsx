"use client";

import type React from "react";
import { useRef, useMemo, useCallback, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
  fadeIn: { start: number; end: number };
  fadeOut: { start: number; end: number };
}

interface BlurSettings {
  blurIn: { start: number; end: number };
  blurOut: { start: number; end: number };
  maxBlur: number;
}

interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
}

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 12;
const MAX_VERTICAL_OFFSET = 10;

// Custom shader material for blur, opacity, and cloth folding effects
const createClothMaterial = () => {
  return new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Create smooth curving based on scroll force
        float curveIntensity = scrollForce * 0.3;
        
        // Base curve across the plane based on distance from center
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        // Add gentle cloth-like ripples
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        // Flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          // Create flag-like wave from left to right
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          // Damping effect - stronger wave on the right side (free edge)
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          
          // Add secondary smaller waves for more realistic flag motion
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        // Apply Z displacement for curving effect (inverted) with cloth ripples and flag wave
        pos.z -= (curve + clothEffect + flagWave);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Simple blur approximation
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        // Add subtle lighting effect based on curving
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

function ImagePlane({
  planeIndex,
  textures,
  textureAspects,
  planesDataRef,
  depthRange,
  material,
  baseSize,
}: {
  planeIndex: number;
  textures: THREE.Texture[];
  textureAspects: number[];
  planesDataRef: React.MutableRefObject<PlaneData[]>;
  depthRange: number;
  material: THREE.ShaderMaterial;
  baseSize: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (material?.uniforms) {
      material.uniforms.isHovered!.value = isHovered ? 1.0 : 0.0;
    }
  }, [material, isHovered]);

  useFrame(() => {
    if (!meshRef.current) return;
    const plane = planesDataRef.current[planeIndex];
    if (!plane) return;

    // Dynamically assign correct texture
    const currentTexture = textures[plane.imageIndex];
    if (currentTexture && material.uniforms.map && material.uniforms.map.value !== currentTexture) {
      material.uniforms.map.value = currentTexture;
    }

    // Update position directly
    const worldZ = plane.z - depthRange / 2;
    meshRef.current.position.set(plane.x, plane.y, worldZ);

    // Update scale directly based on aspect ratio
    const aspect = textureAspects[plane.imageIndex] ?? 1;
    const scaleX = aspect > 1 ? baseSize * aspect : baseSize;
    const scaleY = aspect > 1 ? baseSize : baseSize / aspect;
    meshRef.current.scale.set(scaleX, scaleY, 1);
  });

  return (
    <mesh
      ref={meshRef}
      material={material}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}

function GalleryScene({
  images,
  speed = 1,
  visibleCount = 8,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.15 },
    fadeOut: { start: 0.85, end: 0.95 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 3.0,
  },
}: Omit<InfiniteGalleryProps, "className" | "style">) {
  const scrollVelocityRef = useRef(0.8 * speed);

  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === "string" ? { src: img, alt: "" } : img
      ),
    [images]
  );

  const textures = useTexture(normalizedImages.map((img) => img.src));
  const textureArray = useMemo(() => (Array.isArray(textures) ? textures : [textures]), [textures]);

  useEffect(() => {
    textureArray.forEach((t) => {
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
    });
  }, [textureArray]);

  const textureAspects = useMemo(() => {
    return textureArray.map((t) => {
      const img = t?.image as { width?: number; height?: number } | null | undefined;
      return img?.width && img?.height ? img.width / img.height : 1;
    });
  }, [textureArray]);

  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createClothMaterial()),
    [visibleCount]
  );

  useEffect(() => {
    return () => {
      materials.forEach((m) => m.dispose());
    };
  }, [materials]);

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number }[] = [];
    const maxHorizontalOffset = MAX_HORIZONTAL_OFFSET;
    const maxVerticalOffset = MAX_VERTICAL_OFFSET;

    for (let i = 0; i < visibleCount; i++) {
      const horizontalAngle = (i * 2.618) % (Math.PI * 2);
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

      const horizontalRadius = (i % 3) * 1.2;
      const verticalRadius = ((i + 1) % 4) * 0.8;

      const x =
        (Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset) /
        3;
      const y =
        (Math.cos(verticalAngle) * verticalRadius * maxVerticalOffset) / 4;

      positions.push({ x, y });
    }

    return positions;
  }, [visibleCount]);

  const totalImages = normalizedImages.length;
  const depthRange = DEFAULT_DEPTH_RANGE;

  const planesData = useRef<PlaneData[]>(
    Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z: visibleCount > 0 ? ((depthRange / visibleCount) * i) % depthRange : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }))
  );

  useEffect(() => {
    planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z:
        visibleCount > 0
          ? ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange
          : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }));
  }, [depthRange, spatialPositions, totalImages, visibleCount]);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      // Do NOT preventDefault, so the page can scroll normally.
      // Increase scroll velocity (mutating ref directly to prevent React re-renders)
      scrollVelocityRef.current += event.deltaY * 0.005 * speed;
    },
    [speed]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        scrollVelocityRef.current -= 1 * speed;
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        scrollVelocityRef.current += 1 * speed;
      }
    },
    [speed]
  );

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      // Note: passive must be true since we don't call preventDefault,
      // which is also better for scroll performance!
      canvas.addEventListener("wheel", handleWheel, { passive: true });
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        canvas.removeEventListener("wheel", handleWheel);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleWheel, handleKeyDown]);

  useFrame((state, delta) => {
    // Smoothly decay/interpolate back to baseline speed
    const baseTargetSpeed = 0.8 * speed;
    scrollVelocityRef.current += (baseTargetSpeed - scrollVelocityRef.current) * 0.05;

    // Clamping: ensure it always zooms in at a minimum speed
    const minZoomSpeed = 0.3 * speed;
    if (scrollVelocityRef.current < minZoomSpeed) {
      scrollVelocityRef.current += (minZoomSpeed - scrollVelocityRef.current) * 0.1;
    }

    const time = state.clock.getElapsedTime();
    materials.forEach((material) => {
      if (material?.uniforms) {
        material.uniforms.time!.value = time;
        material.uniforms.scrollForce!.value = scrollVelocityRef.current;
      }
    });

    const imageAdvance =
      totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
    const totalRange = depthRange;

    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVelocityRef.current * delta * 10;
      let wrapsForward = 0;
      let wrapsBackward = 0;

      if (newZ >= totalRange) {
        wrapsForward = Math.floor(newZ / totalRange);
        newZ -= totalRange * wrapsForward;
      } else if (newZ < 0) {
        wrapsBackward = Math.ceil(-newZ / totalRange);
        newZ += totalRange * wrapsBackward;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
        plane.imageIndex =
          (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      }

      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % totalRange) + totalRange) % totalRange;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;

      const normalizedPosition = plane.z / totalRange;
      let opacity = 1;

      if (
        normalizedPosition >= fadeSettings.fadeIn.start &&
        normalizedPosition <= fadeSettings.fadeIn.end
      ) {
        const fadeInProgress =
          (normalizedPosition - fadeSettings.fadeIn.start) /
          (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
        opacity = fadeInProgress;
      } else if (normalizedPosition < fadeSettings.fadeIn.start) {
        opacity = 0;
      } else if (
        normalizedPosition >= fadeSettings.fadeOut.start &&
        normalizedPosition <= fadeSettings.fadeOut.end
      ) {
        const fadeOutProgress =
          (normalizedPosition - fadeSettings.fadeOut.start) /
          (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
        opacity = 1 - fadeOutProgress;
      } else if (normalizedPosition > fadeSettings.fadeOut.end) {
        opacity = 0;
      }

      opacity = Math.max(0, Math.min(1, opacity));

      let blur = 0;

      if (
        normalizedPosition >= blurSettings.blurIn.start &&
        normalizedPosition <= blurSettings.blurIn.end
      ) {
        const blurInProgress =
          (normalizedPosition - blurSettings.blurIn.start) /
          (blurSettings.blurIn.end - blurSettings.blurIn.start);
        blur = blurSettings.maxBlur * (1 - blurInProgress);
      } else if (normalizedPosition < blurSettings.blurIn.start) {
        blur = blurSettings.maxBlur;
      } else if (
        normalizedPosition >= blurSettings.blurOut.start &&
        normalizedPosition <= blurSettings.blurOut.end
      ) {
        const blurOutProgress =
          (normalizedPosition - blurSettings.blurOut.start) /
          (blurSettings.blurOut.end - blurSettings.blurOut.start);
        blur = blurSettings.maxBlur * blurOutProgress;
      } else if (normalizedPosition > blurSettings.blurOut.end) {
        blur = blurSettings.maxBlur;
      }

      blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

      const material = materials[i];
      if (material?.uniforms) {
        material.uniforms.opacity!.value = opacity;
        material.uniforms.blurAmount!.value = blur;
      }
    });
  });

  if (normalizedImages.length === 0) return null;

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4080ff" />

      {planesData.current.map((plane, i) => {
        const material = materials[i];
        if (!material) return null;

        return (
          <ImagePlane
            key={plane.index}
            planeIndex={i}
            textures={textureArray}
            textureAspects={textureAspects}
            planesDataRef={planesData}
            depthRange={depthRange}
            material={material}
            baseSize={4.5}
          />
        );
      })}
    </>
  );
}

function GalleryLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-400" />
        </div>
        <p className="text-sm text-white/40 tracking-wide uppercase">
          Loading Gallery…
        </p>
      </div>
    </div>
  );
}

export default function InfiniteGallery({
  images,
  className = "",
  style,
  speed = 1,
  visibleCount = 10,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.6, end: 0.7 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.6, end: 0.7 },
    maxBlur: 8.0,
  },
}: InfiniteGalleryProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Section header */}
      <div
        className="relative z-10 pt-20 pb-6 md:pt-28 md:pb-10 px-6 md:px-12"
        style={{
          background:
            "linear-gradient(to bottom, #060e1a 0%, transparent 100%)",
        }}
      >
        <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 bg-sky-500/10 border border-sky-500/20">
          Life at MSNS
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
          Campus{" "}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Gallery
          </span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/40 max-w-lg leading-relaxed">
          Explore moments from our campus life.
        </p>
      </div>

      {/* 3D Canvas area */}
      <div className="relative h-[70vh] md:h-screen">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-green-950/10 to-slate-900" />

        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/[0.12] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/[0.12] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/[0.06] rounded-full blur-[150px] pointer-events-none" />

        <div className={`relative w-full h-full ${className}`} style={style}>
          {webglSupported ? (
            <Suspense fallback={<GalleryLoader />}>
              <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
              >
                <GalleryScene
                  images={images}
                  speed={speed}
                  visibleCount={visibleCount}
                  fadeSettings={fadeSettings}
                  blurSettings={blurSettings}
                />
              </Canvas>
            </Suspense>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-white/50 text-base">
                WebGL is not supported on this device.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}