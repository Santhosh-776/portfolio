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
import type { SectionType } from './hooks/useLaptopScroll';

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [activeSkill, setActiveSkill] = useState<string>('LangGraph');

  return (
    <div className="min-h-screen text-white relative font-sans">
      {/* Custom White Target Cursor */}
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar />

      {/* Fixed 3D WebGL Canvas Layer */}
      <CanvasContainer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeProjectIndex={activeProjectIndex}
        setActiveProjectIndex={setActiveProjectIndex}
        activeSkill={activeSkill}
        setActiveSkill={setActiveSkill}
      />

      {/* Synchronized Scroll Storyline with Click-Through Canvas Layering */}
      <main className="canvas-overlay-mode relative z-20">
        <Hero />
        <Skills activeSkill={activeSkill} setActiveSkill={setActiveSkill} />
        <Projects activeProjectIndex={activeProjectIndex} />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
