"use client";
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { type Mesh, type Texture, ShaderMaterial, DoubleSide } from 'three';

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

const createGlassMaterial = (): ShaderMaterial => {
  return new ShaderMaterial({
    transparent: true,
    side: DoubleSide,
    uniforms: {
      map: { value: null as Texture | null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
      glassIntensity: { value: 0.3 },
    },
    vertexShader: `
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
        float wave = sin(pos.x * 1.5 + time * 1.2) * 0.02;
        wave += cos(pos.y * 2.0 + time * 0.8) * 0.015;
        
        // Hover effect - lifting and expanding
        if (isHovered > 0.5) {
          float hoverWave = sin(pos.x * 4.0 + time * 6.0) * 0.08;
          hoverWave += sin(pos.y * 3.0 + time * 5.0) * 0.05;
          pos.z += hoverWave + 0.3;
          pos *= 1.05; // Slight scale up
        }
        
        pos.z += wave;
        
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      uniform float glassIntensity;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Blur effect
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -3.0; x <= 3.0; x += 1.0) {
            for (float y = -3.0; y <= 3.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        // Glassmorphism effect
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
        vec3 glassHighlight = vec3(1.0) * fresnel * glassIntensity;
        
        // Edge glow
        float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x) *
                     smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
        vec3 edgeGlow = vec3(0.4, 0.6, 1.0) * (1.0 - edge) * 0.2;
        
        // Hover glow
        float hoverGlow = isHovered * 0.15;
        vec3 hoverColor = vec3(0.5, 0.8, 1.0) * hoverGlow;
        
        // Combine effects
        color.rgb += glassHighlight + edgeGlow + hoverColor;
        color.rgb = mix(color.rgb, color.rgb * 1.1, fresnel * 0.3);
        
        // Slight brightness boost
        color.rgb *= 1.05;
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (material?.uniforms?.map && texture) {
      material.uniforms.map.value = texture;
    }
  }, [material, texture]);

  useEffect(() => {
    if (material?.uniforms?.isHovered) {
      material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
    }
  }, [material, isHovered]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation}
      material={material}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[1, 1, 40, 40]} />
    </mesh>
  );
}

function GalleryScene({
  images,
  speed = 1,
  visibleCount = 10,
}: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const lastInteraction = useRef(Date.now());

  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === 'string' ? { src: img, alt: '' } : img
      ),
    [images]
  );

  const textures = useTexture(normalizedImages.map((img) => img.src));

  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createGlassMaterial()),
    [visibleCount]
  );

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number; rotationY: number }[] = [];
    const maxHorizontalOffset = MAX_HORIZONTAL_OFFSET;
    const maxVerticalOffset = MAX_VERTICAL_OFFSET;

    for (let i = 0; i < visibleCount; i++) {
      const horizontalAngle = (i * 2.618) % (Math.PI * 2);
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      const horizontalRadius = (i % 3) * 1.5;
      const verticalRadius = ((i + 1) % 4) * 1.0;
      
      const x = (Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset) / 3;
      const y = (Math.cos(verticalAngle) * verticalRadius * maxVerticalOffset) / 4;
      const rotationY = (Math.sin(i * 0.5) * Math.PI) / 12;
      
      positions.push({ x, y, rotationY });
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
      rotationY: spatialPositions[i]?.rotationY ?? 0,
    }))
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      setScrollVelocity((prev) => prev + event.deltaY * 0.012 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    },
    [speed]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        setScrollVelocity((prev) => prev - 2.5 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        setScrollVelocity((prev) => prev + 2.5 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      }
    },
    [speed]
  );

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        canvas.removeEventListener('wheel', handleWheel);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
    return undefined;
  }, [handleWheel, handleKeyDown]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastInteraction.current > 3000) {
        setAutoPlay(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (autoPlay) {
      setScrollVelocity((prev) => prev + 0.4 * delta);
    }

    setScrollVelocity((prev) => prev * 0.94);

    const time = state.clock.getElapsedTime();
    materials.forEach((material) => {
      if (material?.uniforms) {
        if (material.uniforms.time) material.uniforms.time.value = time;
        if (material.uniforms.scrollForce) {
          material.uniforms.scrollForce.value = scrollVelocity;
        }
      }
    });

    const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;

    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVelocity * delta * 12;
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
        plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      }

      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % depthRange) + depthRange) % depthRange;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;
      plane.rotationY = spatialPositions[i]?.rotationY ?? 0;

      const normalizedPosition = plane.z / depthRange;
      
      // Smoother fade transitions
      let opacity = 1;
      const fadeInStart = 0.0;
      const fadeInEnd = 0.2;
      const fadeOutStart = 0.75;
      const fadeOutEnd = 1.0;

      if (normalizedPosition < fadeInEnd) {
        opacity = normalizedPosition < fadeInStart ? 0 : 
                  (normalizedPosition - fadeInStart) / (fadeInEnd - fadeInStart);
      } else if (normalizedPosition > fadeOutStart) {
        opacity = normalizedPosition > fadeOutEnd ? 0 :
                  1 - (normalizedPosition - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      }

      opacity = Math.max(0, Math.min(1, opacity));

      // Blur effect
      let blur = 0;
      const blurInEnd = 0.15;
      const blurOutStart = 0.8;

      if (normalizedPosition < blurInEnd) {
        blur = 5.0 * (1 - normalizedPosition / blurInEnd);
      } else if (normalizedPosition > blurOutStart) {
        blur = 5.0 * ((normalizedPosition - blurOutStart) / (1 - blurOutStart));
      }

      blur = Math.max(0, Math.min(5.0, blur));

      const material = materials[i];
      if (material?.uniforms) {
        if (material.uniforms.opacity) material.uniforms.opacity.value = opacity;
        if (material.uniforms.blurAmount) material.uniforms.blurAmount.value = blur;
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
        const texture = textures[plane.imageIndex];
        const material = materials[i];

        if (!texture || !material) return null;

        const img = texture.image as HTMLImageElement | ImageBitmap | undefined;
        const aspect = img?.width && img?.height ? img.width / img.height : 1;
        
        // Bigger images
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

export default function InfiniteGallery({
  images,
  className = '',
  style,
  speed = 1,
  visibleCount = 10,
}: InfiniteGalleryProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-green-950/10 to-slate-900" />
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Main canvas */}
      <div className={`relative w-full h-full ${className}`} style={style}>
        {webglSupported ? (
          <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: 'high-performance'
            }}
          >
            <GalleryScene
              images={images}
              speed={speed}
              visibleCount={visibleCount}
            />
          </Canvas>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white text-lg">WebGL not supported</p>
          </div>
        )}
      </div>
    </div>
  );
}