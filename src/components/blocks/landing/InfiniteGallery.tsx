"use client";
import { useRef, useMemo, useCallback, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  type Mesh,
  type Texture,
  ShaderMaterial,
  DoubleSide,
  LinearFilter,
} from "three";

type ImageItem = string | { src: string; alt?: string };

interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  visibleCount?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
  rotationY: number;
}

const DEFAULT_DEPTH_RANGE = 60;
const MAX_HORIZONTAL_OFFSET = 12;
const MAX_VERTICAL_OFFSET = 10;

// ---------- Optimized shader material ----------
// Removed the expensive 7×7 blur loop, replaced with a lighter
// 5-tap cross-sample blur that achieves a similar aesthetic at ~14×
// fewer texture reads.
const createGlassMaterial = (): ShaderMaterial => {
  return new ShaderMaterial({
    transparent: true,
    side: DoubleSide,
    uniforms: {
      map: { value: null as Texture | null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 5.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
      glassIntensity: { value: 0.3 },
    },
    vertexShader: /* glsl */ `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        
        vec3 pos = position;
        
        // Gentle wave effect
        float wave = sin(pos.x * 1.5 + time * 1.2) * 0.02
                   + cos(pos.y * 2.0 + time * 0.8) * 0.015;
        
        // Hover effect — lift + subtle scale
        float hoverMix = step(0.5, isHovered);
        float hoverWave = hoverMix * (
          sin(pos.x * 4.0 + time * 6.0) * 0.08 +
          sin(pos.y * 3.0 + time * 5.0) * 0.05
        );
        pos.z += wave + hoverWave + hoverMix * 0.3;
        pos *= 1.0 + hoverMix * 0.05;
        
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float glassIntensity;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        // 5-tap cross blur (much cheaper than 7×7 grid)
        vec2 texel = 1.0 / vec2(textureSize(map, 0));
        vec2 spread = texel * blurAmount;
        
        vec4 color = texture2D(map, vUv) * 0.4;
        color += texture2D(map, vUv + vec2( spread.x, 0.0)) * 0.15;
        color += texture2D(map, vUv + vec2(-spread.x, 0.0)) * 0.15;
        color += texture2D(map, vUv + vec2(0.0,  spread.y)) * 0.15;
        color += texture2D(map, vUv + vec2(0.0, -spread.y)) * 0.15;
        
        // Glassmorphism — fresnel highlight
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
        vec3 glassHL = vec3(1.0) * fresnel * glassIntensity;
        
        // Edge glow
        float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x) *
                     smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
        vec3 edgeGlow = vec3(0.4, 0.6, 1.0) * (1.0 - edge) * 0.2;
        
        // Hover glow
        vec3 hoverColor = vec3(0.5, 0.8, 1.0) * isHovered * 0.15;
        
        color.rgb += glassHL + edgeGlow + hoverColor;
        color.rgb = mix(color.rgb, color.rgb * 1.1, fresnel * 0.3);
        color.rgb *= 1.05;
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

// ---------- Image plane ----------
function ImagePlane({
  texture,
  position,
  scale,
  material,
  rotation,
}: {
  texture: Texture;
  position: [number, number, number];
  scale: [number, number, number];
  material: ShaderMaterial;
  rotation: [number, number, number];
}) {
  const meshRef = useRef<Mesh>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (material?.uniforms?.map && texture) {
      material.uniforms.map.value = texture;
    }
  }, [material, texture]);

  const onPointerEnter = useCallback(() => {
    hoveredRef.current = true;
    if (material?.uniforms?.isHovered) {
      material.uniforms.isHovered.value = 1.0;
    }
  }, [material]);

  const onPointerLeave = useCallback(() => {
    hoveredRef.current = false;
    if (material?.uniforms?.isHovered) {
      material.uniforms.isHovered.value = 0.0;
    }
  }, [material]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation}
      material={material}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {/* Reduced from 40×40 segments to 8×8 — still smooth waves, ~25× fewer vertices */}
      <planeGeometry args={[1, 1, 8, 8]} />
    </mesh>
  );
}

// ---------- Gallery scene ----------
function GalleryScene({
  images,
  speed = 1,
  visibleCount = 10,
}: Omit<InfiniteGalleryProps, "className" | "style">) {
  // Constant auto-play speed (units per second along the z-axis)
  const AUTO_SPEED = 4.5;

  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === "string" ? { src: img, alt: "MSNS" } : img
      ),
    [images]
  );

  const textures = useTexture(normalizedImages.map((img) => img.src));

  // Apply texture filtering for sharper rendering at distance
  useEffect(() => {
    const texArr = Array.isArray(textures) ? textures : [textures];
    texArr.forEach((t) => {
      t.minFilter = LinearFilter;
      t.magFilter = LinearFilter;
    });
  }, [textures]);

  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createGlassMaterial()),
    [visibleCount]
  );

  // Dispose materials on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      materials.forEach((m) => m.dispose());
    };
  }, [materials]);

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number; rotationY: number }[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const hAngle = (i * 2.618) % (Math.PI * 2);
      const vAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      const hRadius = (i % 3) * 1.5;
      const vRadius = ((i + 1) % 4) * 1.0;

      positions.push({
        x: (Math.sin(hAngle) * hRadius * MAX_HORIZONTAL_OFFSET) / 3,
        y: (Math.cos(vAngle) * vRadius * MAX_VERTICAL_OFFSET) / 4,
        rotationY: (Math.sin(i * 0.5) * Math.PI) / 12,
      });
    }
    return positions;
  }, [visibleCount]);

  const totalImages = normalizedImages.length;
  const depthRange = DEFAULT_DEPTH_RANGE;

  const planesData = useRef<PlaneData[]>(
    Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z:
        visibleCount > 0
          ? ((depthRange / visibleCount) * i) % depthRange
          : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
      rotationY: spatialPositions[i]?.rotationY ?? 0,
    }))
  );



  // Force a single re-render per ~16 frames so React can reconcile image indices
  const frameCount = useRef(0);
  const [, forceRender] = useState(0);

  useFrame((state, delta) => {
    // Per-frame displacement: AUTO_SPEED * speed * delta gives consistent
    // movement regardless of frame rate (delta is already in seconds).
    const displacement = AUTO_SPEED * speed * delta;
    const time = state.clock.getElapsedTime();

    // Update material uniforms
    for (const mat of materials) {
      mat.uniforms.time!.value = time;
      mat.uniforms.scrollForce!.value = AUTO_SPEED * speed;
    }

    const imageAdvance =
      totalImages > 0 ? visibleCount % totalImages || totalImages : 0;

    let needsRerender = false;

    for (let i = 0; i < planesData.current.length; i++) {
      const plane = planesData.current[i]!;

      let newZ = plane.z + displacement;
      let wrapsForward = 0;
      let wrapsBackward = 0;

      if (newZ >= depthRange) {
        wrapsForward = Math.floor(newZ / depthRange);
        newZ -= depthRange * wrapsForward;
      } else if (newZ < 0) {
        wrapsBackward = Math.ceil(-newZ / depthRange);
        newZ += depthRange * wrapsBackward;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
        plane.imageIndex =
          (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
        needsRerender = true;
      }
      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
        needsRerender = true;
      }

      plane.z = ((newZ % depthRange) + depthRange) % depthRange;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;
      plane.rotationY = spatialPositions[i]?.rotationY ?? 0;

      const t = plane.z / depthRange;

      // Opacity fade
      let opacity: number;
      if (t < 0.2) opacity = t / 0.2;
      else if (t > 0.75) opacity = 1 - (t - 0.75) / 0.25;
      else opacity = 1;
      opacity = Math.max(0, Math.min(1, opacity));

      // Blur at edges
      let blur: number;
      if (t < 0.15) blur = 5.0 * (1 - t / 0.15);
      else if (t > 0.8) blur = 5.0 * ((t - 0.8) / 0.2);
      else blur = 0;
      blur = Math.max(0, Math.min(5.0, blur));

      const mat = materials[i];
      if (mat?.uniforms) {
        mat.uniforms.opacity!.value = opacity;
        mat.uniforms.blurAmount!.value = blur;
      }
    }

    // Batch React reconciliation — only trigger re-render when image indices change
    frameCount.current++;
    if (needsRerender && frameCount.current % 16 === 0) {
      forceRender((n) => n + 1);
    }
  });

  if (normalizedImages.length === 0) return null;

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4080ff" />

      {planesData.current.map((plane, i) => {
        const texture = Array.isArray(textures)
          ? textures[plane.imageIndex]
          : textures;
        const material = materials[i];
        if (!texture || !material) return null;

        const img = texture.image as
          | HTMLImageElement
          | ImageBitmap
          | undefined;
        const aspect =
          img?.width && img?.height ? img.width / img.height : 1;

        const baseSize = 4.5;
        const scale: [number, number, number] =
          aspect > 1
            ? [baseSize * aspect, baseSize, 1]
            : [baseSize, baseSize / aspect, 1];

        return (
          <ImagePlane
            key={plane.index}
            texture={texture}
            position={[plane.x, plane.y, plane.z - depthRange / 2]}
            scale={scale}
            rotation={[0, plane.rotationY, 0]}
            material={material}
          />
        );
      })}
    </>
  );
}

// ---------- Loading fallback ----------
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

// ---------- Main export ----------
export default function InfiniteGallery({
  images,
  className = "",
  style,
  speed = 1,
  visibleCount = 10,
}: InfiniteGalleryProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl2") ??
        c.getContext("webgl") ??
        c.getContext("experimental-webgl");
      setWebglSupported(!!gl);
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