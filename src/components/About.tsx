import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const text = textRef.current;
    
    if (!text) return;
    
    gsap.fromTo(
      text.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-20 lg:px-32 bg-deep-navy text-pale-blue relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-vibrant-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div ref={textRef} className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="flex items-center mb-20">
          <span className="text-vibrant-blue font-mono text-2xl mr-4 font-bold">01.</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-pale-blue">About Me</h2>
          <div className="h-[2px] bg-gradient-to-r from-vibrant-blue/50 to-transparent flex-grow ml-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-pale-blue/90">
              Hi! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-blue to-sky-blue font-bold">Santhosh</span>, a developer who loves turning complex problems into elegant solutions.
            </p>
            <p className="text-lg leading-relaxed text-pale-blue/70">
              I build full-stack web applications with a focus on <span className="text-vibrant-blue font-semibold">clean architecture</span>, <span className="text-vibrant-blue font-semibold">responsive design</span>, and <span className="text-vibrant-blue font-semibold">seamless user experiences</span>. Whether it's crafting intuitive interfaces or designing robust backend systems, I enjoy every part of the development process.
            </p>
            <p className="text-lg leading-relaxed text-pale-blue/70">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or experimenting with creative ways to solve everyday challenges through code.
            </p>
            
            {/* Call to action with glow effect */}
            <div className="relative inline-block group mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-vibrant-blue to-sky-blue opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-300"></div>
              <p className="relative text-xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-vibrant-blue to-sky-blue">
                Let's build something amazing together.
              </p>
            </div>
          </div>
          
          {/* Visual Element - Animated Code-like Display */}
          <div className="relative">
            {/* Main container with perspective */}
            <div className="relative" style={{ perspective: '1000px' }}>
              {/* Floating code blocks */}
              <div className="space-y-4">
                {[
                  { text: 'const passion = "problem-solving";', delay: '0s' },
                  { text: 'const focus = ["frontend", "backend"];', delay: '0.2s' },
                  { text: 'const goal = "elegant solutions";', delay: '0.4s' },
                  { text: 'return <Innovation />;', delay: '0.6s' }
                ].map((line, idx) => (
                  <div
                    key={idx}
                    className="group/line relative bg-gradient-to-r from-vibrant-blue/5 to-transparent border-l-4 border-vibrant-blue/30 pl-6 py-4 hover:border-vibrant-blue hover:from-vibrant-blue/10 transition-all duration-300"
                    style={{ 
                      animationDelay: line.delay,
                      transform: 'translateZ(0)'
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-vibrant-blue/0 group-hover/line:bg-vibrant-blue/5 transition-colors duration-300"></div>
                    
                    <code className="relative font-mono text-sm md:text-base text-pale-blue/80 group-hover/line:text-vibrant-blue transition-colors duration-300">
                      {line.text}
                    </code>
                    
                    {/* Animated cursor */}
                    <span className="inline-block w-2 h-5 bg-vibrant-blue ml-1 animate-pulse"></span>
                  </div>
                ))}
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 border-2 border-vibrant-blue/20 rounded-lg rotate-12 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 border-2 border-sky-blue/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
