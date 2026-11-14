import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SIGNATURE_DRINK } from '../../data/coffeeContent';
import { soundManager } from '../../audio/soundManager';

interface SignatureCupProps {
  pointerPos: { x: number; y: number };
}

const GlassTumbler: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [activeIngredient, setActiveIngredient] = useState<number | null>(null);

  // Lathe geometry for modern fluted glass
  const { glassGeo, milkGeo, espressoGeo, garnishGeo } = useMemo(() => {
    // Glass exterior and interior points
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.0, 0.0));
    points.push(new THREE.Vector2(1.0, 0.08));
    points.push(new THREE.Vector2(1.15, 0.4));
    points.push(new THREE.Vector2(1.35, 2.6));
    points.push(new THREE.Vector2(1.32, 2.65));
    points.push(new THREE.Vector2(1.22, 2.6));
    points.push(new THREE.Vector2(1.05, 0.45));
    points.push(new THREE.Vector2(0.85, 0.2));
    points.push(new THREE.Vector2(0.0, 0.2));

    const gGeo = new THREE.LatheGeometry(points, 48);
    gGeo.computeVertexNormals();

    // Bottom milk layer (cylinder inside glass)
    const mGeo = new THREE.CylinderGeometry(1.1, 0.95, 1.2, 36);
    mGeo.translate(0, 0.8, 0);

    // Top espresso float layer
    const eGeo = new THREE.CylinderGeometry(1.25, 1.1, 1.1, 36);
    eGeo.translate(0, 1.95, 0);

    // Dehydrated orange slice garnish wheel resting on glass rim
    const garnish = new THREE.CylinderGeometry(0.7, 0.7, 0.05, 32);
    garnish.rotateX(Math.PI / 3);
    garnish.rotateZ(0.2);

    return { glassGeo: gGeo, milkGeo: mGeo, espressoGeo: eGeo, garnishGeo: garnish };
  }, []);

  // Subtle slow rotation
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.1;
  });

  // Ingredient marker coordinates around the glass
  const ingredientPins = [
    { name: 'ESPRESSO', desc: 'Guji Double Shot (22g in / 44g out)', pos: [1.6, 2.2, 0.3] as [number, number, number], idx: 0 },
    { name: 'MILK', desc: 'Jersey Farm Microfoam Steamed to 58°C', pos: [-1.5, 0.9, 0.4] as [number, number, number], idx: 3 },
    { name: 'VANILLA', desc: 'In-house Cured Madagascar Pods', pos: [1.4, 1.4, -0.4] as [number, number, number], idx: 1 },
    { name: 'SEA SALT', desc: 'Maldon Flakes Smoked over Oak', pos: [-1.4, 2.65, -0.2] as [number, number, number], idx: 2 },
  ];

  return (
    <group ref={meshRef} position={[0, -1.2, 0]}>
      {/* Heavy bottom glass tumbler with frosty physical appearance */}
      <mesh geometry={glassGeo}>
        <meshPhysicalMaterial
          roughness={0.16}
          transmission={0.65}
          thickness={0.8}
          ior={1.46}
          color="#f4f8fb"
          transparent
          opacity={0.85}
          clearcoat={0.6}
        />
      </mesh>

      {/* Ground contact shadow */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 32]} />
        <meshBasicMaterial color="#080402" transparent opacity={0.55} depthWrite={false} />
      </mesh>

      {/* Layer 1: Milk Base */}
      <mesh geometry={milkGeo}>
        <meshStandardMaterial
          color="#f5ede2"
          roughness={0.35}
          metalness={0.02}
        />
      </mesh>

      {/* Layer 2: Espresso Float */}
      <mesh geometry={espressoGeo}>
        <meshPhysicalMaterial
          color="#381d0c"
          roughness={0.16}
          transmission={0.45}
          thickness={0.85}
        />
      </mesh>

      {/* Garnish on rim */}
      <mesh geometry={garnishGeo} position={[0.9, 2.65, 0.3]}>
        <meshStandardMaterial
          color="#c86d2a"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Ice Cubes floating inside */}
      <group position={[0, 1.6, 0]} rotation={[0.4, 0.3, 0.2]}>
        <mesh position={[0.2, 0.2, 0]}>
          <boxGeometry args={[0.65, 0.65, 0.65]} />
          <meshPhysicalMaterial
            roughness={0.08}
            transmission={0.96}
            thickness={0.8}
            ior={1.31}
            color="#ffffff"
          />
        </mesh>
        <mesh position={[-0.3, -0.2, 0.2]} rotation={[0.5, 0.7, 0.2]}>
          <boxGeometry args={[0.55, 0.55, 0.55]} />
          <meshPhysicalMaterial
            roughness={0.08}
            transmission={0.96}
            thickness={0.8}
            ior={1.31}
            color="#ffffff"
          />
        </mesh>
      </group>

      {/* Floating Ingredient Labels */}
      {ingredientPins.map((pin) => (
        <group key={pin.name} position={pin.pos}>
          <Html distanceFactor={10} center>
            <div
              className="relative group/pin cursor-pointer select-none"
              onMouseEnter={() => {
                soundManager.playClick(680);
                setActiveIngredient(pin.idx);
              }}
              onMouseLeave={() => setActiveIngredient(null)}
              onClick={() => {
                soundManager.playClick(680);
                setActiveIngredient(activeIngredient === pin.idx ? null : pin.idx);
              }}
            >
              <div className="flex items-center gap-2">
                {/* Pulsing copper halo marker */}
                <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-copper opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-copper" />
                </div>

                {/* Badge Tag */}
                <div className="glass-panel px-2.5 py-1 rounded-full border border-amber-copper/40 text-cream-100 whitespace-nowrap shadow-lg hover:border-amber-copper hover:bg-espresso-950/90 transition-all">
                  <span className="text-[10px] uppercase font-semibold tracking-widest-luxury text-amber-copper">
                    {pin.name}
                  </span>
                </div>
              </div>

              {/* Tooltip detail on hover */}
              {activeIngredient === pin.idx && (
                <div className="absolute left-0 bottom-full mb-2 w-52 rounded-xl bg-espresso-950/95 border border-amber-copper/40 p-3 shadow-2xl backdrop-blur-md z-50 pointer-events-none">
                  <div className="text-[9px] uppercase tracking-wider text-amber-copper font-semibold">
                    {pin.name} Spec
                  </div>
                  <div className="text-xs text-cream-200 mt-1 leading-snug">
                    {pin.desc}
                  </div>
                </div>
              )}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

export const SignatureCupScene: React.FC<SignatureCupProps> = ({ pointerPos }) => {
  return (
    <div className="w-full h-full relative" data-cursor="drag" data-cursor-label="ROTATE">
      <Canvas
        camera={{ position: [0, 1.2, 5.8], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.95} color="#fff6ea" />
        <directionalLight position={[4, 6, 3]} intensity={2.8} color="#ffedd5" />
        <directionalLight position={[-4, 3, -3]} intensity={1.5} color="#c68449" />
        <pointLight position={[0, -2, 2]} intensity={0.8} color="#d4a373" />

        <GlassTumbler />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.15}
          minPolarAngle={Math.PI / 3}
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
};
