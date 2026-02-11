import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiCplusplus,
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiNetlify
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { FaCode } from 'react-icons/fa';
import { skills } from '../utils/resumeData';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

// Map skills to their icons
const skillIcons: Record<string, React.ReactElement> = {
  'JavaScript': <SiJavascript className="text-yellow-400" />,
  'TypeScript': <SiTypescript className="text-blue-500" />,
  'Python': <SiPython className="text-blue-400" />,
  'Java': <DiJava className="text-red-500" />,
  'C/C++': <SiCplusplus className="text-blue-600" />,
  'React.js': <SiReact className="text-cyan-400" />,
  'Next.js': <SiNextdotjs className="text-white" />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-400" />,
  'Responsive Interface Design': <FaCode className="text-vibrant-blue" />,
  'Node.js': <SiNodedotjs className="text-green-500" />,
  'Express.js': <SiExpress className="text-gray-400" />,
  'REST API Design': <FaCode className="text-vibrant-blue" />,
  'Authentication Systems': <FaCode className="text-vibrant-blue" />,
  'PostgreSQL': <SiPostgresql className="text-blue-400" />,
  'MongoDB': <SiMongodb className="text-green-500" />,
  'Firestore': <SiFirebase className="text-yellow-500" />,
  'Git': <SiGit className="text-orange-500" />,
  'GitHub': <SiGithub className="text-white" />,
  'Postman': <SiPostman className="text-orange-500" />,
  'Vercel': <SiVercel className="text-white" />,
  'Netlify': <SiNetlify className="text-cyan-400" />,
};

const skillsData = [
  {
    category: 'Languages',
    skills: skills.languages,
    color: 'from-vibrant-blue to-sky-blue',
  },
  {
    category: 'Frontend',
    skills: skills.frontend,
    color: 'from-sky-blue to-vibrant-blue',
  },
  {
    category: 'Backend',
    skills: skills.backend,
    color: 'from-vibrant-blue to-purple-400',
  },
  {
    category: 'Database',
    skills: skills.databases,
    color: 'from-purple-400 to-vibrant-blue',
  },
  {
    category: 'Tools',
    skills: skills.tools,
    color: 'from-vibrant-blue to-sky-blue',
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    
    if (!section || !title) return;

    // Animate title
    gsap.fromTo(
      title,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate cards with stagger
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8,
          rotateX: -15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation on hover
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-32 px-6 md:px-20 lg:px-32 bg-deep-navy relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vibrant-blue/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="flex items-center mb-20">
          <span className="text-vibrant-blue font-mono text-2xl mr-4 font-bold">02.</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-pale-blue">
            Skills & Technologies
          </h2>
          <div className="h-[2px] bg-gradient-to-r from-vibrant-blue/50 to-transparent flex-grow ml-8"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Card */}
              <div className="relative bg-slate-dark/50 backdrop-blur-sm border-2 border-vibrant-blue/20 rounded-2xl p-8 hover:border-vibrant-blue/50 transition-all duration-300 h-full">
                {/* Category Title */}
                <h3 className="text-2xl font-display font-bold text-pale-blue mb-6 group-hover:text-vibrant-blue transition-colors duration-300">
                  {category.category}
                </h3>

                {/* Skills with Icons */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="group/tag relative flex items-center gap-2 px-4 py-2.5 text-sm font-mono text-pale-blue bg-vibrant-blue/5 rounded-lg border border-vibrant-blue/20 hover:border-vibrant-blue hover:bg-vibrant-blue/10 hover:text-vibrant-blue transition-all duration-300 cursor-default overflow-hidden"
                    >
                      {/* Shine effect on hover */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/tag:translate-x-[100%] transition-transform duration-700"></span>
                      
                      {/* Icon */}
                      <span className="relative z-10 text-lg flex-shrink-0">
                        {skillIcons[skill] || <FaCode className="text-vibrant-blue" />}
                      </span>
                      
                      {/* Skill Name */}
                      <span className="relative z-10">{skill}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative text */}
        <div className="mt-20 text-center">
          <p className="text-pale-blue/40 font-mono text-sm">
            Continuously learning and expanding my technical toolkit
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
