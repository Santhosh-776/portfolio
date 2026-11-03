import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Laptop } from './Laptop';
import { ScreenContent } from './ScreenContent';
import { useLaptopScroll } from '../../hooks/useLaptopScroll';
import type { SectionType } from '../../hooks/useLaptopScroll';

interface CanvasContainerProps {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  activeProjectIndex: number;
  setActiveProjectIndex: (index: number) => void;
  portalRef?: React.RefObject<HTMLDivElement | null>;
}

function Scene({
  activeSection,
  setActiveSection,
  activeProjectIndex,
  setActiveProjectIndex,
  portalRef,
}: CanvasContainerProps) {
  const laptopRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  // Hook handles all scroll synchronization between GSAP ScrollTrigger and the 3D Laptop
  useLaptopScroll(laptopRef, lidRef, setActiveProjectIndex, setActiveSection);

  return (
    <>
      {/* 3D Cosmic Starfield matching reference image */}
      <Stars
        radius={90}
        depth={60}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1.0}
      />

      {/* Studio Lighting Setup for Metallic Space-Gray finish */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[6, 9, 6]} intensity={2.2} color="#ffffff" castShadow />
      <directionalLight position={[-6, 5, -2]} intensity={1.8} color="#ffffff" />
      <pointLight position={[0, -2, 3]} intensity={1.0} color="#ffffff" />
      <pointLight position={[3, 2, -2]} intensity={0.6} color="#ffffff" />

      {/* 3D Laptop */}
      <Suspense fallback={null}>
        <Laptop
          laptopRef={laptopRef}
          lidRef={lidRef}
          portalRef={portalRef}
          screenContent={
            <ScreenContent
              activeSection={activeSection}
              activeProjectIndex={activeProjectIndex}
            />
          }
        />
      </Suspense>
    </>
  );
}

export const CanvasContainer: React.FC<CanvasContainerProps> = (props) => {
  const portalRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={portalRef}
      id="canvas-webgl-wrapper"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Scene {...props} portalRef={portalRef} />
      </Canvas>
    </div>
  );
};
