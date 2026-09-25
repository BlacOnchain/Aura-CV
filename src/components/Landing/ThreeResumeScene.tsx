import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, MeshWobbleMaterial, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Interactive Floating 3D Monolith Document that reacts to mouse tracking
function FloatingResumeDocument() {
  const meshRef = useRef<THREE.Group>(null);
  const card1Ref = useRef<THREE.Mesh>(null);
  const card2Ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smoothly tilt document container towards mouse pointer
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, delta * 3);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, delta * 3);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.rotation.x += delta * 0.2;
    }

    if (card1Ref.current) {
      card1Ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.12 + 0.6;
    }

    if (card2Ref.current) {
      card2Ref.current.position.y = Math.cos(state.clock.getElapsedTime() * 1.8) * 0.12 - 0.7;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central 3D Architectural Paper Sheet */}
      <RoundedBox args={[2.4, 3.4, 0.08]} radius={0.06} smoothness={4} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.15}
          metalness={0.05}
          transmission={0.1}
          thickness={0.2}
          clearcoat={0.3}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Embedded 3D Resume Typography Lines */}
      {/* Header Accent Bar */}
      <mesh position={[0, 1.25, 0.05]}>
        <boxGeometry args={[1.9, 0.18, 0.02]} />
        <meshStandardMaterial color="#18181b" roughness={0.2} />
      </mesh>

      {/* Title Subline */}
      <mesh position={[-0.35, 0.95, 0.05]}>
        <boxGeometry args={[1.2, 0.06, 0.02]} />
        <meshStandardMaterial color="#52525b" roughness={0.3} />
      </mesh>

      {/* Decorative Bullet Line 1 */}
      <mesh position={[-0.8, 0.5, 0.05]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
      <mesh position={[0.1, 0.5, 0.05]}>
        <boxGeometry args={[1.6, 0.05, 0.02]} />
        <meshStandardMaterial color="#a1a1aa" />
      </mesh>

      {/* Decorative Bullet Line 2 */}
      <mesh position={[-0.8, 0.2, 0.05]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
      <mesh position={[0.0, 0.2, 0.05]}>
        <boxGeometry args={[1.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#a1a1aa" />
      </mesh>

      {/* Decorative Bullet Line 3 */}
      <mesh position={[-0.8, -0.1, 0.05]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
      <mesh position={[0.2, -0.1, 0.05]}>
        <boxGeometry args={[1.8, 0.05, 0.02]} />
        <meshStandardMaterial color="#a1a1aa" />
      </mesh>

      {/* Divider */}
      <mesh position={[0, -0.4, 0.05]}>
        <boxGeometry args={[1.9, 0.02, 0.01]} />
        <meshStandardMaterial color="#e4e4e7" />
      </mesh>

      {/* Skills Grid Lines */}
      <mesh position={[-0.4, -0.7, 0.05]}>
        <boxGeometry args={[0.9, 0.12, 0.02]} />
        <meshStandardMaterial color="#f4f4f5" />
      </mesh>
      <mesh position={[0.5, -0.7, 0.05]}>
        <boxGeometry args={[0.8, 0.12, 0.02]} />
        <meshStandardMaterial color="#f4f4f5" />
      </mesh>
      <mesh position={[-0.4, -1.0, 0.05]}>
        <boxGeometry args={[0.8, 0.12, 0.02]} />
        <meshStandardMaterial color="#f4f4f5" />
      </mesh>

      {/* Floating 3D Badge 1: 98% Match Score */}
      <mesh ref={card1Ref} position={[1.3, 0.6, 0.4]}>
        <boxGeometry args={[1.1, 0.6, 0.1]} />
        <meshStandardMaterial color="#18181b" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Floating 3D Badge 2: Google XYZ Formula */}
      <mesh ref={card2Ref} position={[-1.3, -0.7, 0.5]}>
        <boxGeometry args={[1.2, 0.5, 0.1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Floating Orbital Metallic Ring */}
      <mesh ref={ringRef} position={[0, 0, -0.2]}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Subtle Floating Geometry Objects */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-1.8, 1.4, -0.5]}>
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial color="#71717a" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh position={[1.8, -1.2, -0.3]}>
          <icosahedronGeometry args={[0.22]} />
          <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export const ThreeResumeScene: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full h-[420px] sm:h-[480px] lg:h-[520px] relative rounded-3xl overflow-hidden border border-zinc-200/80 bg-gradient-to-b from-zinc-100/80 via-white to-zinc-50 shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 text-[10px] font-mono font-semibold text-zinc-700 shadow-xs flex items-center gap-2 select-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Interactive 3D WebGL Motion Canvas</span>
      </div>

      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-zinc-950 text-white text-[10px] font-mono font-medium shadow-xs select-none">
        {isHovered ? 'Pointer Active · Tracking' : 'Move Cursor To Tilt'}
      </div>

      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#e4e4e7" />
        <pointLight position={[0, 0, 3]} intensity={0.8} />

        <FloatingResumeDocument />

        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.4}
          scale={7}
          blur={2.2}
          far={4.5}
        />
      </Canvas>
    </div>
  );
};
