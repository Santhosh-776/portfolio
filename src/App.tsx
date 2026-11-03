import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { CanvasContainer } from './components/3d/CanvasContainer';
import { SectionWrapper } from './components/ui/SectionWrapper';
import type { SectionType } from './hooks/useLaptopScroll';

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  return (
    <div className="min-h-screen text-white relative font-sans">
      {/* Custom White Target Cursor */}
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar />

      {/* Fixed 3D WebGL Canvas Layer with Stars */}
      <CanvasContainer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeProjectIndex={activeProjectIndex}
        setActiveProjectIndex={setActiveProjectIndex}
      />

      {/* Synchronized Scroll Storyline with Click-Through Canvas Layering */}
      <main className="canvas-overlay-mode relative z-20">
        <Hero />
        <Skills />
        <Projects activeProjectIndex={activeProjectIndex} />
        <SectionWrapper>
          <Experience />
        </SectionWrapper>
        <SectionWrapper>
          <Contact />
        </SectionWrapper>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
