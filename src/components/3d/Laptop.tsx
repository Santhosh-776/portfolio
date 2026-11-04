import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LaptopProps {
  screenContent: React.ReactNode;
  laptopRef: React.RefObject<THREE.Group | null>;
  lidRef?: React.RefObject<THREE.Group | null>;
  portalRef?: React.RefObject<HTMLElement | null>;
  onReady?: () => void;
}

export function Laptop({ screenContent, laptopRef, lidRef, portalRef, onReady }: LaptopProps) {
  const [screenPowered, setScreenPowered] = useState(false);

  // Monitor lid angle: when closed (rotation.x > 1.0 rad), screen is off.
  // As lid swings open, screen powers on!
  useFrame(() => {
    if (lidRef?.current) {
      const isOpen = lidRef.current.rotation.x < 1.0;
      if (isOpen !== screenPowered) {
        setScreenPowered(isOpen);
      }
    }
  });

  useEffect(() => {
    // Failsafe: ensures screen is powered on after initial entrance
    const timer = setTimeout(() => {
      setScreenPowered(true);
    }, 600);
    if (onReady) {
      onReady();
    }
    return () => clearTimeout(timer);
  }, [onReady]);

  // Apple Space Gray / Silver Anodized Aluminum
  const appleSilverColor = '#a1a4aa';
  const appleSilverDark = '#8a8d94';
  const appleSilverLight = '#b8bbc2';

  return (
    <group ref={laptopRef as any} dispose={null}>
      {/* ================= MACBOOK BASE UNIBODY CHASSIS ================= */}
      {/* Main Aluminum Base Chassis */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.24, 0.09, 2.22]} />
        <meshStandardMaterial
          color={appleSilverColor}
          metalness={0.72}
          roughness={0.32}
        />
      </mesh>

      {/* Front Display Thumb Opening Lip / Notch */}
      <mesh position={[0, -0.012, 1.11]}>
        <boxGeometry args={[0.48, 0.02, 0.02]} />
        <meshStandardMaterial color={appleSilverDark} metalness={0.8} roughness={0.35} />
      </mesh>

      {/* Side Edge Bevel Highlights */}
      <mesh position={[-1.61, -0.05, 0]}>
        <boxGeometry args={[0.02, 0.088, 2.2]} />
        <meshStandardMaterial color={appleSilverLight} metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh position={[1.61, -0.05, 0]}>
        <boxGeometry args={[0.02, 0.088, 2.2]} />
        <meshStandardMaterial color={appleSilverLight} metalness={0.75} roughness={0.28} />
      </mesh>

      {/* Side Ports (Thunderbolt 4 / USB-C & MagSafe) */}
      {[-0.4, -0.15].map((zPos, idx) => (
        <mesh key={idx} position={[-1.621, -0.045, zPos]}>
          <boxGeometry args={[0.005, 0.022, 0.065]} />
          <meshStandardMaterial color="#1a1b1e" metalness={0.3} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[1.621, -0.045, -0.4]}>
        <boxGeometry args={[0.005, 0.022, 0.065]} />
        <meshStandardMaterial color="#1a1b1e" metalness={0.3} roughness={0.8} />
      </mesh>
      <mesh position={[-1.621, -0.045, -0.65]}>
        <boxGeometry args={[0.005, 0.026, 0.095]} />
        <meshStandardMaterial color="#1a1b1e" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Force Touch Trackpad (Large smooth glass trackpad matching reference) */}
      <mesh position={[0, 0.006, 0.48]}>
        <boxGeometry args={[1.28, 0.004, 0.84]} />
        <meshStandardMaterial
          color="#9da0a6"
          metalness={0.68}
          roughness={0.35}
        />
      </mesh>
      {/* Trackpad Chamfered Border */}
      <mesh position={[0, 0.005, 0.48]}>
        <boxGeometry args={[1.3, 0.002, 0.86]} />
        <meshStandardMaterial color="#888b92" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* MacBook Magic Keyboard Recessed Well */}
      <mesh position={[0, 0.005, -0.32]}>
        <boxGeometry args={[2.76, 0.006, 1.14]} />
        <meshStandardMaterial
          color="#222328"
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>

      {/* Left & Right Speaker Grilles beside Keyboard */}
      <mesh position={[-1.48, 0.006, -0.32]}>
        <boxGeometry args={[0.14, 0.002, 1.1]} />
        <meshStandardMaterial color="#82858d" roughness={0.85} />
      </mesh>
      <mesh position={[1.48, 0.006, -0.32]}>
        <boxGeometry args={[0.14, 0.002, 1.1]} />
        <meshStandardMaterial color="#82858d" roughness={0.85} />
      </mesh>

      {/* Individual Matte Black Key Rows */}
      {[-0.74, -0.54, -0.34, -0.14, 0.06].map((zRow, rowIndex) => (
        <mesh key={rowIndex} position={[0, 0.013, zRow]}>
          <boxGeometry args={[2.7, 0.008, 0.165]} />
          <meshStandardMaterial
            color="#141416"
            metalness={0.2}
            roughness={0.55}
          />
        </mesh>
      ))}

      {/* Touch ID Sensor Button */}
      <mesh position={[1.27, 0.014, -0.74]}>
        <boxGeometry args={[0.16, 0.009, 0.16]} />
        <meshStandardMaterial color="#0b0b0c" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Spacebar Key */}
      <mesh position={[0, 0.014, 0.16]}>
        <boxGeometry args={[1.08, 0.009, 0.14]} />
        <meshStandardMaterial
          color="#161618"
          metalness={0.2}
          roughness={0.55}
        />
      </mesh>

      {/* Bottom Rubber Feet */}
      {[
        [-1.42, -0.098, -0.92],
        [1.42, -0.098, -0.92],
        [-1.42, -0.098, 0.92],
        [1.42, -0.098, 0.92],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.075, 0.075, 0.015, 16]} />
          <meshStandardMaterial color="#1f2024" roughness={0.95} />
        </mesh>
      ))}

      {/* ================= HINGE & ROTATING DISPLAY LID ================= */}
      {/* Starts initially closed at rotation.x = 1.54 (flat on keys), animates open to -0.28 (upright ~106°) */}
      <group
        ref={lidRef as any}
        position={[0, 0, -1.06]}
        rotation={[1.54, 0, 0]}
      >
        {/* Cylindrical Aluminum Hinge Bar */}
        <mesh position={[0, 0.025, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 2.92, 20]} />
          <meshStandardMaterial
            color={appleSilverDark}
            metalness={0.78}
            roughness={0.28}
          />
        </mesh>

        {/* Outer Aluminum Display Lid Cover (Space Gray / Silver) */}
        <mesh position={[0, 1.06, 0]} castShadow>
          <boxGeometry args={[3.24, 2.12, 0.065]} />
          <meshStandardMaterial
            color={appleSilverColor}
            metalness={0.72}
            roughness={0.32}
          />
        </mesh>

        {/* Polished White Apple Logo on Back Cover (prominently visible when closed as in reference image) */}
        <mesh position={[0, 1.06, -0.034]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.16, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.96}
            roughness={0.06}
            emissive="#ffffff"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Black Glass Display Bezel */}
        <mesh position={[0, 1.05, 0.034]}>
          <boxGeometry args={[3.12, 2.02, 0.002]} />
          <meshStandardMaterial color="#08080a" roughness={0.7} />
        </mesh>

        {/* Camera Notch at Top of Screen */}
        <mesh position={[0, 2.0, 0.036]}>
          <boxGeometry args={[0.24, 0.065, 0.003]} />
          <meshStandardMaterial color="#050507" roughness={0.9} />
        </mesh>

        {/* 1080p FaceTime Camera Lens & Green Indicator LED */}
        <mesh position={[0, 2.01, 0.038]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.004, 16]} />
          <meshStandardMaterial color="#020203" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0.035, 2.01, 0.038]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.004, 8]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
        </mesh>

        {/* Obsidian Glass Display Panel (Realistic High-Gloss Metallic Screen) */}
        <mesh position={[0, 1.04, 0.038]}>
          <boxGeometry args={[3.04, 1.94, 0.003]} />
          <meshStandardMaterial
            color="#080a10"
            metalness={0.92}
            roughness={0.12}
          />
        </mesh>

        {/* High-DPI Razor-Sharp Screen Display (Retina Resolution, Zero Blur) */}
        <Html
          transform
          portal={portalRef as any}
          position={[0, 1.04, 0.039]}
          distanceFactor={0.76}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            opacity: screenPowered ? 1 : 0,
            visibility: screenPowered ? 'visible' : 'hidden',
            pointerEvents: screenPowered ? 'auto' : 'none',
            transition: 'opacity 0.4s ease-out',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
          }}
          className="laptop-screen-display w-[1680px] h-[1092px] bg-[#050608] rounded-sm overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] pointer-events-auto [backface-visibility:hidden]"
        >
          <div
            style={{
              width: '840px',
              height: '546px',
              zoom: 2,
              transformStyle: 'flat',
            }}
            className="w-full h-full"
          >
            {screenContent}
          </div>
        </Html>
      </group>
    </group>
  );
}

export default Laptop;
