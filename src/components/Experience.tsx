import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../utils/resumeData';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    // Animate timeline line
    if (lineRef.current && section) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );
    }

    // Animate experience items
    if (section) {
      const items = section.querySelectorAll('.experience-item');
      items.forEach((item: Element) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-deep-navy relative">
      <div className="container mx-auto px-6 md:px-20 lg:px-32">
        <div className="flex items-center mb-16">
          <h2 className="text-3xl font-display font-bold text-pale-blue">
            <span className="text-vibrant-blue mr-2">03.</span> Where I've Worked
          </h2>
          <div className="h-px bg-slate-dark flex-grow ml-6 max-w-xs"></div>
        </div>

        <div className="relative border-l border-slate-dark/30 ml-3 md:ml-6 space-y-12">
          {/* Animated Timeline Line */}
          <div ref={lineRef} className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-vibrant-blue origin-top"></div>

          {experience.map((exp, index) => (
            <div key={index} className="experience-item relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-deep-navy border-2 border-vibrant-blue z-10 box-content"></div>

              <div className="glass-card p-6 md:p-8 rounded-lg hover:bg-slate-dark/10 transition-colors duration-300">
                <h3 className="text-xl md:text-2xl font-display font-medium text-pale-blue">
                  {exp.role} <span className="text-vibrant-blue">@ {exp.company}</span>
                </h3>
                <p className="font-mono text-sm text-slate-light mt-2 mb-4">{exp.duration} | {exp.location}</p>
                <p className="text-pale-blue/80 mb-4 italic">{exp.overview}</p>
                <ul className="list-none space-y-3">
                  {exp.highlights.map((desc, i) => (
                    <li key={i} className="relative pl-6 text-slate-light text-base leading-relaxed">
                      <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-vibrant-blue/50"></span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
