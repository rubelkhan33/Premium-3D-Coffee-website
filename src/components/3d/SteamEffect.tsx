import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface SteamEffectProps {
  pointerPos?: { x: number; y: number };
}

export const SteamEffect: React.FC<SteamEffectProps> = ({ pointerPos = { x: 0, y: 0 } }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 55; // Refined, sparse, lightweight count for elegance

  // Generate particle positions, velocities, phases and lifetimes
  const { positions, initialData, steamTexture } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const data: Array<{
      age: number;
      life: number;
      baseX: number;
      baseZ: number;
      speed: number;
      driftPhase: number;
      curlFreq: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      // Radius distribution across the coffee surface
      const radius = Math.random() * 0.9;
      const angle = Math.random() * Math.PI * 2;
      const bx = Math.cos(angle) * radius;
      const bz = Math.sin(angle) * radius;

      pos[i * 3] = bx;
      pos[i * 3 + 1] = 1.8 + Math.random() * 2.2; // Y elevation
      pos[i * 3 + 2] = bz;

      data.push({
        age: Math.random(),
        life: 2.5 + Math.random() * 1.8,
        baseX: bx,
        baseZ: bz,
        speed: 0.35 + Math.random() * 0.3,
        driftPhase: Math.random() * Math.PI * 2,
        curlFreq: 1.2 + Math.random() * 1.5,
      });
    }

    // Soft procedural steam puff alpha texture
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    grad.addColorStop(0.35, 'rgba(240, 235, 225, 0.22)');
    grad.addColorStop(0.7, 'rgba(220, 210, 195, 0.06)');
    grad.addColorStop(1, 'rgba(200, 190, 180, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const tex = new THREE.CanvasTexture(canvas);

    return {
      positions: pos,
      initialData: data,
      steamTexture: tex,
    };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    // Wind influence from mouse movement
    const windX = pointerPos.x * 0.4;

    for (let i = 0; i < count; i++) {
      const d = initialData[i];
      d.age += delta / d.life;

      if (d.age >= 1.0) {
        d.age = 0;
        const radius = Math.random() * 0.85;
        const angle = Math.random() * Math.PI * 2;
        d.baseX = Math.cos(angle) * radius;
        d.baseZ = Math.sin(angle) * radius;
      }

      // Height advances upward from coffee rim (Y: 1.8) to ~4.5
      const currentY = 1.75 + d.age * 2.8;

      // Natural curling and expanding as steam rises
      const expansion = 1.0 + d.age * 1.6;
      const curlOffset = Math.sin(time * d.curlFreq + d.driftPhase + currentY * 2.0) * 0.18 * expansion;
      const driftZ = Math.cos(time * 0.8 + d.driftPhase) * 0.12 * expansion;

      array[i * 3] = d.baseX * expansion + curlOffset + windX * d.age * 0.8;
      array[i * 3 + 1] = currentY;
      array[i * 3 + 2] = d.baseZ * expansion + driftZ;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.35}
        map={steamTexture}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
