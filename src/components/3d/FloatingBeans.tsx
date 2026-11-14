import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CoffeeBeanMesh } from './HeroCupScene';

interface InteractiveBeanData {
  basePos: [number, number, number];
  baseRot: [number, number, number];
  scale: number;
  speed: number;
  rotSpeed: number;
  color: string;
}

const SingleInteractiveBean: React.FC<{
  data: InteractiveBeanData;
  pointer: { x: number; y: number };
}> = ({ data, pointer }) => {
  const groupRef = useRef<THREE.Group>(null);
  const currentOffset = useRef(new THREE.Vector3(0, 0, 0));
  const currentRotOffset = useRef(new THREE.Euler(0, 0, 0));
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Convert normalized pointer (-1 to 1) to world viewport coordinates
    const pointerWorldX = (pointer.x * viewport.width) / 2;
    const pointerWorldY = (pointer.y * viewport.height) / 2;

    const beanWorldX = data.basePos[0] + currentOffset.current.x;
    const beanWorldY = data.basePos[1] + currentOffset.current.y;

    const dx = beanWorldX - pointerWorldX;
    const dy = beanWorldY - pointerWorldY;
    const distSq = dx * dx + dy * dy;
    const threshold = 4.5; // Interaction proximity radius

    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let targetRotZ = 0;

    if (distSq < threshold * threshold && distSq > 0.01) {
      const dist = Math.sqrt(distSq);
      const force = (1.0 - dist / threshold) * 1.1;
      targetOffsetX = (dx / dist) * force;
      targetOffsetY = (dy / dist) * force;
      targetRotZ = force * 1.1;
    }

    // Smooth spring damping return
    currentOffset.current.x = THREE.MathUtils.damp(currentOffset.current.x, targetOffsetX, 3.8, delta);
    currentOffset.current.y = THREE.MathUtils.damp(currentOffset.current.y, targetOffsetY, 3.8, delta);

    currentRotOffset.current.z = THREE.MathUtils.damp(currentRotOffset.current.z, targetRotZ, 3.2, delta);

    const t = state.clock.getElapsedTime();
    groupRef.current.position.x = data.basePos[0] + currentOffset.current.x;
    groupRef.current.position.y = data.basePos[1] + currentOffset.current.y + Math.sin(t * data.speed) * 0.09;
    groupRef.current.position.z = data.basePos[2];

    groupRef.current.rotation.x = data.baseRot[0] + Math.sin(t * data.rotSpeed) * 0.22;
    groupRef.current.rotation.y = data.baseRot[1] + t * data.rotSpeed * 0.35;
    groupRef.current.rotation.z = data.baseRot[2] + currentRotOffset.current.z;
  });

  return (
    <group ref={groupRef} scale={data.scale}>
      <CoffeeBeanMesh color={data.color} />
    </group>
  );
};

export const FloatingBeans: React.FC<{ pointerPos: { x: number; y: number } }> = ({ pointerPos }) => {
  const beans: InteractiveBeanData[] = useMemo(() => {
    return [
      { basePos: [-4.2, 1.8, -0.5], baseRot: [0.3, 0.5, 0.2], scale: 1.4, speed: 0.9, rotSpeed: 0.6, color: '#2b1a11' },
      { basePos: [-2.1, 2.8, -1.0], baseRot: [-0.4, 1.2, 0.4], scale: 1.1, speed: 1.2, rotSpeed: 0.8, color: '#3d2518' },
      { basePos: [-3.5, -1.4, -0.8], baseRot: [0.6, -0.7, 0.5], scale: 1.25, speed: 0.8, rotSpeed: 0.5, color: '#1c0f08' },
      { basePos: [-1.2, -2.4, -1.2], baseRot: [1.0, 0.4, -0.3], scale: 0.95, speed: 1.4, rotSpeed: 0.9, color: '#452a1b' },
      { basePos: [0.3, 2.2, -1.5], baseRot: [-0.8, -0.6, 0.7], scale: 1.05, speed: 1.1, rotSpeed: 0.7, color: '#2a1910' },
      { basePos: [2.2, 2.7, -0.7], baseRot: [0.5, 0.9, -0.5], scale: 1.3, speed: 0.7, rotSpeed: 0.6, color: '#351f14' },
      { basePos: [4.4, 1.5, -0.6], baseRot: [-0.3, -1.1, 0.2], scale: 1.45, speed: 1.0, rotSpeed: 0.8, color: '#1a0d07' },
      { basePos: [1.8, -1.8, -0.9], baseRot: [0.8, -0.5, 0.4], scale: 1.15, speed: 1.3, rotSpeed: 0.7, color: '#3f2719' },
      { basePos: [3.8, -2.0, -1.1], baseRot: [-0.5, 0.8, -0.6], scale: 1.35, speed: 0.85, rotSpeed: 0.65, color: '#22140d' },
      { basePos: [-0.2, -0.3, -2.0], baseRot: [0.2, 0.3, 0.1], scale: 0.85, speed: 0.6, rotSpeed: 0.4, color: '#4a2f1e' },
    ];
  }, []);

  return (
    <div className="w-full h-full relative" data-cursor="hover" data-cursor-label="REPEL">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio, 1.75)]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.75} color="#fbf8f3" />
        <directionalLight position={[5, 6, 4]} intensity={2.2} color="#ffe8d1" />
        <directionalLight position={[-5, -2, -2]} intensity={0.9} color="#c68449" />

        {beans.map((bean, idx) => (
          <SingleInteractiveBean key={idx} data={bean} pointer={pointerPos} />
        ))}
      </Canvas>
    </div>
  );
};
