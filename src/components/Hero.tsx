import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { personalInfo } from '../utils/resumeData';

const Hero = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations for floating orbs
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        x: 100,
        y: -50,
        scale: 1.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        x: -80,
        y: 60,
        scale: 0.9,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.5,
      });
    }

    if (orb3Ref.current) {
      gsap.to(orb3Ref.current, {
        x: 50,
        y: 80,
        scale: 1.1,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1,
      });
    }
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 80, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 1, 
        ease: [0.6, 0.05, 0.01, 0.9] as const // Custom cubic bezier for smooth effect
      } 
    },
  };

  const nameVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: 1.2, 
        ease: [0.6, 0.05, 0.01, 0.9] as const,
        delay: 0.3
      } 
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 lg:px-32 bg-deep-navy relative overflow-hidden">
      {/* Animated Background Orbs with GSAP */}
      <div 
        ref={orb1Ref}
        className="absolute top-20 right-0 w-[600px] h-[600px] bg-vibrant-blue/20 rounded-full blur-[120px] pointer-events-none"
      />
      <div 
        ref={orb2Ref}
        className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-sky-blue/25 rounded-full blur-[100px] pointer-events-none"
      />
      <div 
        ref={orb3Ref}
        className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-pale-blue/10 rounded-full blur-[90px] pointer-events-none"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 relative"
      >
        <motion.p 
          variants={item} 
          className="text-sky-blue font-mono mb-6 text-base md:text-lg tracking-widest uppercase"
        >
          Hi, my name is
        </motion.p>
        
        <motion.h1 
          variants={nameVariant} 
          className="text-7xl md:text-8xl lg:text-[10rem] font-display font-bold text-pale-blue mb-6 tracking-tight leading-none"
        >
          {personalInfo.name.split(' ')[0]}
          <motion.span 
            className="text-vibrant-blue inline-block"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            .
          </motion.span>
        </motion.h1>
        
        <motion.h2 
          variants={item} 
          className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-slate-light/70 mb-10 leading-tight max-w-4xl"
        >
          {personalInfo.tagline}
        </motion.h2>
        
        <motion.div 
          variants={item} 
          className="flex gap-6"
        >
          <motion.a 
            href="#work" 
            className="group px-8 py-4 bg-transparent border-2 border-sky-blue text-sky-blue font-mono rounded-lg hover:bg-sky-blue/10 transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-sky-blue/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View My Work</span>
          </motion.a>
          
          <motion.a 
            href={personalInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-transparent border-2 border-slate-dark text-slate-light font-mono rounded-lg hover:border-pale-blue hover:text-pale-blue transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
