import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CeramicCup } from './CeramicCup';
import { SteamEffect } from './SteamEffect';

interface HeroCupSceneProps {
  pointerPos: { x: number; y: number };
  scrollYProgress?: number;
}

// Procedural single Coffee Bean Mesh with realistic roasting color options
export const CoffeeBeanMesh: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = '#23160e' }) => {
  const meshRef = useRef<THREE.Group>(null);

  // Bean geometry: ellipsoid with central crease indentation
  const { beanGeometry } = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.32, 28, 28);
    geo.scale(1.0, 1.42, 0.72);

    // Apply vertex deformation for the coffee bean slit
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Crease along the front Z face
      if (z > 0 && Math.abs(x) < 0.13) {
        const indent = (1 - Math.abs(x) / 0.13) * 0.15;
        pos.setZ(i, z - indent);
      }
    }
    geo.computeVertexNormals();
    return { beanGeometry: geo };
  }, []);

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={beanGeometry} castShadow>
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.06}
        />
      </mesh>
    </group>
  );
};

// Sparse floating beans surrounding the hero scene
const SparseHeroBeans: React.FC<{ pointerPos: { x: number; y: number } }> = ({ pointerPos }) => {
  const groupRef = useRef<THREE.Group>(null);

  const beans = useMemo(() => {
    return [
      { pos: [-3.2, 1.8, -1.5] as [number, number, number], rot: [0.4, 0.8, 0.2] as [number, number, number], scale: 0.9, speed: 0.8, color: '#2b1a11' },
      { pos: [3.4, 0.5, -2.0] as [number, number, number], rot: [-0.6, 1.2, 0.5] as [number, number, number], scale: 0.8, speed: 0.9, color: '#1e110a' },
      { pos: [-2.6, -1.6, -1.0] as [number, number, number], rot: [1.1, -0.4, 0.7] as [number, number, number], scale: 0.75, speed: 1.1, color: '#382215' },
      { pos: [2.8, 2.4, -2.2] as [number, number, number], rot: [0.2, -0.9, -0.4] as [number, number, number], scale: 0.85, speed: 0.7, color: '#24150d' },
      { pos: [3.0, -1.8, -1.2] as [number, number, number], rot: [-0.3, 0.5, 1.2] as [number, number, number], scale: 0.7, speed: 1.0, color: '#1d1009' },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Parallax sway
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, pointerPos.x * 0.5, 2, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, pointerPos.y * 0.4, 2, delta);
    groupRef.current.rotation.y = t * 0.04;
  });

  return (
    <group ref={groupRef}>
      {beans.map((b, idx) => (
        <Float key={idx} speed={b.speed * 1.4} rotationIntensity={1.1} floatIntensity={0.7}>
          <CoffeeBeanMesh position={b.pos} rotation={b.rot} scale={b.scale} color={b.color} />
        </Float>
      ))}
    </group>
  );
};

// Scene camera coordinator that responds to scroll and pointer
const CameraRig: React.FC<{
  pointerPos: { x: number; y: number };
  scrollYProgress: number;
}> = ({ pointerPos, scrollYProgress }) => {
  useFrame((state, delta) => {
    // Scroll moves camera subtly and changes depth perception
    const targetX = pointerPos.x * 0.55;
    const targetY = 0.5 + pointerPos.y * 0.35 + scrollYProgress * 1.1;
    const targetZ = 6.2 + scrollYProgress * 1.4;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 3, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 3, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3, delta);
    state.camera.lookAt(0, 0.38, 0);
  });

  return null;
};

export const HeroCupScene: React.FC<HeroCupSceneProps> = ({
  pointerPos,
  scrollYProgress = 0,
}) => {
  return (
    <div className="w-full h-full relative" data-cursor="drag" data-cursor-label="TILT">
      <Canvas
        camera={{ position: [0, 0.5, 6.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        className="w-full h-full"
      >
        <CameraRig pointerPos={pointerPos} scrollYProgress={scrollYProgress} />

        {/* Fast, zero-network warm studio lighting */}
        <ambientLight intensity={0.9} color="#fff8ee" />
        <hemisphereLight intensity={0.65} color="#fff8ee" groundColor="#23160e" />
        
        {/* Key Light: warm directional sunlight */}
        <directionalLight
          position={[4.8, 6.8, 4.2]}
          intensity={2.8}
          color="#ffeed8"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-bias={-0.0001}
        />

        {/* Subtle Rim / Counter-Light for ceramic glaze edge highlights */}
        <directionalLight
          position={[-5.2, 3.8, -3.2]}
          intensity={1.5}
          color="#c8a582"
        />

        {/* Soft fill bounce light */}
        <pointLight position={[0, -2.5, 2.5]} intensity={0.65} color="#d4a373" />

        <Suspense fallback={null}>
          <CeramicCup pointerPos={pointerPos} scrollYProgress={scrollYProgress} />
          <SteamEffect pointerPos={pointerPos} />
          <SparseHeroBeans pointerPos={pointerPos} />

          {/* Optimized static ground contact shadow (renders once, zero per-frame cost) */}
          <ContactShadows
            position={[0, -0.48, 0]}
            opacity={0.7}
            scale={7}
            blur={2.2}
            far={3.5}
            resolution={256}
            frames={1}
            color="#080402"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
