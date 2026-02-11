import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// A simple smooth scroll wrapper or just native handling for now
// Since we used native scroll in Hero and pinned scroll in Projects,
// we rely on the browser's native behavior + CSS smooth scroll.

function App() {
  return (
    <div className="bg-deep-navy min-h-screen text-pale-blue selection:bg-vibrant-blue selection:text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
