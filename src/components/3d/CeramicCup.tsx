import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CeramicCupProps {
  pointerPos?: { x: number; y: number };
  scrollYProgress?: number;
}

export const CeramicCup: React.FC<CeramicCupProps> = ({
  pointerPos = { x: 0, y: 0 },
  scrollYProgress = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  // 1. Procedural Lathe Geometry for the artisanal ceramic cup profile
  const { cupGeometry, liquidGeometry, saucerGeometry } = useMemo(() => {
    // Cup cross-section profile points (lathe around Y axis)
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.0, 0.0)); // bottom center
    points.push(new THREE.Vector2(0.95, 0.05)); // base rim
    points.push(new THREE.Vector2(1.05, 0.2)); // lower curve
    points.push(new THREE.Vector2(1.35, 1.0)); // mid waist
    points.push(new THREE.Vector2(1.5, 1.9)); // upper rim exterior
    points.push(new THREE.Vector2(1.48, 1.95)); // rim top curve
    points.push(new THREE.Vector2(1.4, 1.9)); // rim top interior
    points.push(new THREE.Vector2(1.28, 1.0)); // interior mid
    points.push(new THREE.Vector2(0.95, 0.25)); // interior base
    points.push(new THREE.Vector2(0.0, 0.25)); // interior center bottom

    const cupGeo = new THREE.LatheGeometry(points, 48);
    cupGeo.computeVertexNormals();

    // Coffee liquid surface disc
    const liquidGeo = new THREE.CircleGeometry(1.36, 48);
    liquidGeo.rotateX(-Math.PI / 2);

    // Saucer lathe points with cup seating depression
    const saucerPoints: THREE.Vector2[] = [];
    saucerPoints.push(new THREE.Vector2(0.0, -0.05));
    saucerPoints.push(new THREE.Vector2(1.0, -0.05)); // flat base
    saucerPoints.push(new THREE.Vector2(1.15, -0.02)); // cup rim indention
    saucerPoints.push(new THREE.Vector2(1.35, 0.04));
    saucerPoints.push(new THREE.Vector2(1.9, 0.14));
    saucerPoints.push(new THREE.Vector2(2.35, 0.38));
    saucerPoints.push(new THREE.Vector2(2.3, 0.41));
    saucerPoints.push(new THREE.Vector2(1.8, 0.16));
    saucerPoints.push(new THREE.Vector2(1.2, 0.04));
    saucerPoints.push(new THREE.Vector2(0.95, 0.01));
    saucerPoints.push(new THREE.Vector2(0.0, 0.01));
    const saucerGeo = new THREE.LatheGeometry(saucerPoints, 48);
    saucerGeo.computeVertexNormals();

    return {
      cupGeometry: cupGeo,
      liquidGeometry: liquidGeo,
      saucerGeometry: saucerGeo,
    };
  }, []);

  // 2. Procedural Curved Handle with CatmullRomCurve3
  const handleGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(1.35, 1.62, 0),
      new THREE.Vector3(2.15, 1.45, 0),
      new THREE.Vector3(2.15, 0.72, 0),
      new THREE.Vector3(1.24, 0.55, 0),
    ];
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
    return new THREE.TubeGeometry(curve, 32, 0.125, 16, false);
  }, []);

  // 3. Artisanal Ceramic Stoneware Speckle Bump Texture
  const ceramicTextures = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Soft warm stoneware base
    ctx.fillStyle = '#f8f4ec';
    ctx.fillRect(0, 0, 256, 256);

    // Subtle natural earth speckles
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const radius = Math.random() * 1.5 + 0.3;
      ctx.fillStyle = Math.random() > 0.6 ? 'rgba(70, 50, 40, 0.18)' : 'rgba(180, 160, 140, 0.22)';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // 4. Procedural Crema Texture with Rosetta Latte Art
  const cremaTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Rich espresso dark roast base gradient
    const grad = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
    grad.addColorStop(0, '#603818'); // Golden crema center
    grad.addColorStop(0.35, '#3c1f0d'); // Roasted espresso transition
    grad.addColorStop(0.82, '#1c0f06'); // Deep perimeter
    grad.addColorStop(1, '#100804');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Soft latte art heart/tulip center
    ctx.save();
    ctx.translate(128, 128);
    ctx.fillStyle = 'rgba(235, 215, 190, 0.42)';

    // Central heart / rosetta petals
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.ellipse(0, i * 11, 25 - Math.abs(i) * 4.5, 7, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Top heart bulb
    ctx.beginPath();
    ctx.arc(-7, -40, 8, 0, Math.PI * 2);
    ctx.arc(7, -40, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Crema micro-foam marbling swirls
    ctx.strokeStyle = 'rgba(215, 175, 130, 0.22)';
    ctx.lineWidth = 2;
    for (let r = 15; r < 120; r += 14) {
      ctx.beginPath();
      ctx.arc(128, 128, r + (Math.random() * 4 - 2), 0, Math.PI * 2);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // 5. Procedural Ground Contact Shadow Texture
  const shadowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, 'rgba(8, 4, 2, 0.85)');
    grad.addColorStop(0.4, 'rgba(8, 4, 2, 0.45)');
    grad.addColorStop(0.7, 'rgba(8, 4, 2, 0.15)');
    grad.addColorStop(1, 'rgba(8, 4, 2, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    // Gentle physical idle oscillation
    const idleY = Math.sin(t * 1.1) * 0.04;
    const idleRotY = Math.sin(t * 0.35) * 0.06;

    // Pointer response + scroll progress rotation
    const scrollRotY = scrollYProgress * Math.PI * 1.2;
    const targetRotX = 0.22 - pointerPos.y * 0.28;
    const targetRotY = -0.35 + pointerPos.x * 0.38 + idleRotY + scrollRotY;

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, idleY, 4, delta);

    if (liquidRef.current) {
      liquidRef.current.rotation.z = t * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.42, 0]}>
      {/* Ceramic Cup Body */}
      <mesh geometry={cupGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={ceramicTextures}
          color="#fdfbf7"
          roughness={0.16}
          metalness={0.04}
        />
      </mesh>

      {/* Ceramic Cup Handle */}
      <mesh geometry={handleGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={ceramicTextures}
          color="#fdfbf7"
          roughness={0.16}
          metalness={0.04}
        />
      </mesh>

      {/* Ceramic Saucer Plate */}
      <mesh geometry={saucerGeometry} position={[0, -0.06, 0]} receiveShadow>
        <meshStandardMaterial
          map={ceramicTextures}
          color="#f4eee4"
          roughness={0.2}
          metalness={0.03}
        />
      </mesh>

      {/* Fresh Espresso Liquid Surface with Crema Art */}
      <mesh ref={liquidRef} geometry={liquidGeometry} position={[0, 1.72, 0]}>
        <meshStandardMaterial
          map={cremaTexture}
          roughness={0.12}
          metalness={0.06}
        />
      </mesh>

      {/* Ground Contact Shadow Disc (Instant, zero z-fighting, zero network overhead) */}
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 5.2]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          depthWrite={false}
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};
