"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload, Line, Sphere, Torus, Float } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { Group, Mesh } from "three";

function AICore() {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !ring1Ref.current || !ring2Ref.current) return;
    
    // Complex AI Gyroscope rotation
    coreRef.current.rotation.x += delta * 0.2;
    coreRef.current.rotation.y += delta * 0.3;
    
    ring1Ref.current.rotation.x -= delta * 0.5;
    ring1Ref.current.rotation.y += delta * 0.1;
    
    ring2Ref.current.rotation.x += delta * 0.1;
    ring2Ref.current.rotation.y -= delta * 0.4;
    
    // Tie core expansion to scroll
    const scrollY = window.scrollY;
    const scale = 1 + (scrollY / 2000);
    groupRef.current.scale.set(scale, scale, scale);
    
    // Core moves up slightly as you scroll down
    groupRef.current.position.y = (scrollY / 500);
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Inner AI Brain (Wireframe Icosahedron) */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#10b981" wireframe={true} transparent opacity={0.6} />
        </mesh>
        
        {/* Inner Data Ring */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.4} />
        </mesh>
        
        {/* Outer Data Ring */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.02, 16, 100]} />
          <meshBasicMaterial color="#059669" transparent opacity={0.3} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function StarField() {
  const ref = useRef<Group>(null);
  
  const sphere = random.inSphere(new Float32Array(3000 * 3), { radius: 15 });

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 30;
    
    const scrollY = window.scrollY;
    ref.current.position.z = (scrollY / 100); 
  });

  return (
    <group ref={ref}>
      <Points positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6" // blue-500 to match the new theme
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2}
        />
      </Points>
    </group>
  );
}

export function ImmersiveBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#020202]">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <StarField />
                <Preload all />
            </Canvas>
            
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020202_100%)] pointer-events-none opacity-90" />
        </div>
    );
}
