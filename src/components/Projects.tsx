import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../utils/resumeData';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;
    
    // Horizontal Scroll Animation
    const scrollTween = gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${container.scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      scrollTween.kill();
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="h-screen bg-deep-navy overflow-hidden relative">
      <div 
        ref={containerRef} 
        className="flex h-full items-center pl-20"
        style={{ width: `${(projects.length + 1) * 100}vw` }} 
      >
        {/* Intro Slide */}
        <div className="w-[80vw] md:w-[40vw] flex-shrink-0 pr-20">
          <h2 className="text-6xl md:text-8xl font-display font-bold text-pale-blue mb-8">
            Selected <br/> <span className="text-vibrant-blue">Works</span>
          </h2>
          <p className="text-xl text-pale-blue/70 max-w-md">
            A collection of projects that define my journey as a developer. Scroll to explore.
          </p>
          <div className="mt-12 flex items-center space-x-4 animate-bounce">
            <span className="text-sky-blue font-mono">SCROLL</span>
            <span className="text-sky-blue text-2xl">→</span>
          </div>
        </div>

        {/* Project Slides */}
        {projects.map((project, index) => (
          <div key={index} className="w-[85vw] md:w-[60vw] h-[70vh] flex-shrink-0 flex flex-col md:flex-row bg-[#112240]/50 border border-vibrant-blue/20 backdrop-blur-sm mr-20 relative group overflow-hidden rounded-xl hover:border-vibrant-blue/50 transition-colors duration-300">
             
             {/* Text Content */}
             <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center z-10 relative">
                <span className="text-vibrant-blue font-mono mb-4 text-sm">0{index + 1}</span>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-pale-blue mb-6 group-hover:text-sky-blue transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-pale-blue/80 text-lg mb-8 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  {project.tech.map(t => (
                    <span key={t} className="text-sky-blue font-mono text-sm border border-sky-blue/30 px-3 py-1 rounded-full bg-sky-blue/5">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-6">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-pale-blue hover:text-vibrant-blue transition-colors">
                      <FaGithub size={24} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-pale-blue hover:text-vibrant-blue transition-colors">
                      <FaExternalLinkAlt size={22} />
                    </a>
                  )}
                </div>
             </div>

             {/* Visual Side (Gradient placeholder since no images yet) */}
             <div className="absolute inset-0 md:static md:w-1/2 h-full opacity-20 md:opacity-100 transition-opacity duration-500">
                <div 
                  className="w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${index % 2 === 0 ? '#06283D' : '#1363DF'} 0%, ${index % 2 === 0 ? '#1363DF' : '#06283D'} 100%)` 
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <span className="text-9xl font-bold text-white/10 select-none">{index + 1}</span>
                  </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
