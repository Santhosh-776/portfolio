import React from 'react';
import { ExternalLink, CheckCircle2, ArrowRight, Activity } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProjects } from '../utils/resumeData';

interface ProjectsProps {
  activeProjectIndex: number;
}

export const Projects: React.FC<ProjectsProps> = ({ activeProjectIndex }) => {
  // Clamp index safely to range
  const safeIndex = Math.max(0, Math.min(activeProjectIndex, featuredProjects.length - 1));
  const currentProject = featuredProjects[safeIndex];

  // Helper to jump to a specific project when clicking its indicator tab
  const handleSelectProject = (index: number) => {
    const pinTrigger = ScrollTrigger.getById('projects-pin');
    if (pinTrigger) {
      const scrollRange = pinTrigger.end - pinTrigger.start;
      const targetScroll = pinTrigger.start + (index / featuredProjects.length) * scrollRange + 25;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="relative min-h-screen bg-transparent text-white font-sans overflow-hidden">
      {/* ================= DESKTOP PINNED 50/50 SPLIT CONTAINER (div | div) ================= */}
      <div
        id="projects-pin-container"
        className="hidden md:grid md:grid-cols-2 h-screen w-full relative bg-transparent"
      >
        {/* FIRST HALF (LEFT 50%): Dedicated Unobstructed Space for Docked 3D Laptop */}
        <div className="relative h-full flex flex-col justify-between p-8 lg:p-14 pointer-events-none z-20">
          {/* Header */}
          <div className="pointer-events-auto space-y-1">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
              &bull; FEATURED WORK
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Projects
            </h2>
          </div>

          {/* Center area is intentionally transparent: Docked 3D laptop sits here displaying the website preview */}
          <div className="flex-1" />

          {/* Bottom Project Pagination & Navigation */}
          <div className="pointer-events-auto space-y-3 font-mono text-xs">
            {/* Real-time active progress bar */}
            <div className="w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-300 ease-out rounded-full"
                style={{
                  width: `${((safeIndex + 1) / featuredProjects.length) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center gap-2.5">
              {featuredProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectProject(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    safeIndex === idx
                      ? 'bg-white text-black border-white font-bold shadow-lg scale-105'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${safeIndex === idx ? 'bg-black' : 'bg-neutral-500'}`} />
                  <span>0{idx + 1} {p.title}</span>
                </button>
              ))}
            </div>
            <span className="text-neutral-500 text-[11px] block font-sans">
              &bull; Scroll down to smoothly transition projects
            </span>
          </div>
        </div>

        {/* SECOND HALF (RIGHT 50%): Single Active Project Description */}
        <div className="relative h-full flex items-center justify-center p-8 lg:p-12 z-20 pointer-events-auto">
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#070a12]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                {/* Project Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-sans font-extrabold text-white">
                        0{safeIndex + 1}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-300 font-sans text-xs border border-neutral-800">
                        {currentProject.status}
                      </span>
                    </div>

                    {/* Social & Live Links */}
                    <div className="flex items-center gap-2.5">
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-all cursor-pointer"
                        aria-label={`${currentProject.title} GitHub repository`}
                      >
                        <FaGithub size={18} />
                      </a>
                      {currentProject.live && (
                        <a
                          href={currentProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-all cursor-pointer"
                          aria-label={`${currentProject.title} live demo`}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-1 tracking-tight">
                    {currentProject.title}
                  </h3>
                  <h4 className="text-sm font-sans text-emerald-400 mb-4 font-mono">
                    {currentProject.subtitle}
                  </h4>

                  {/* Metrics Banner */}
                  <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs font-sans text-neutral-200 mb-5 flex items-center gap-2.5 shadow-inner">
                    <Activity size={14} className="text-emerald-400 flex-shrink-0" />
                    <span className="font-medium">{currentProject.metrics}</span>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-sans">
                    {currentProject.description}
                  </p>

                  {/* Key Engineering Highlights */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                      Key Engineering Contributions:
                    </span>
                    {currentProject.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-200 font-sans leading-relaxed">
                        <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Tech tags + Repo CTA */}
                <div className="pt-4 border-t border-neutral-800/80 flex flex-col space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs font-sans pt-1 text-neutral-400">
                    <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-400">
                      &larr; Previewing on 3D laptop screen
                    </span>
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 font-bold flex items-center gap-1 font-sans transition-colors cursor-pointer"
                    >
                      Explore Codebase <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================= MOBILE VERTICAL STACK (< 768px) ================= */}
      <div className="md:hidden px-6 py-20 space-y-12 bg-black">
        <div className="text-center">
          <span className="text-xs font-sans text-neutral-400 uppercase tracking-wider">
            03 // PRODUCTION SYSTEMS
          </span>
          <h2 className="text-3xl font-sans font-bold text-white mt-1">
            Featured Projects
          </h2>
          <p className="text-neutral-400 text-xs mt-2 font-sans">
            Scroll vertically to inspect each project.
          </p>
        </div>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bg-[#0c0c0c] border border-neutral-800 rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-sans font-bold text-white">
                  0{index + 1}
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 text-[10px] font-sans border border-neutral-800">
                  {project.status}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-sans">
                  {project.title}
                </h3>
                <p className="text-xs font-sans text-neutral-400">
                  {project.subtitle}
                </p>
              </div>

              {project.image && (
                <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10 bg-[#080b12]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              <div className="bg-neutral-900 border border-neutral-800 rounded p-2 text-[11px] font-sans text-neutral-200">
                {project.metrics}
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {project.description}
              </p>

              <div className="space-y-1.5">
                {project.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-200 font-sans">
                    <CheckCircle2 size={12} className="text-white mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-sans text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded bg-white hover:bg-neutral-200 text-black font-bold font-sans text-xs text-center flex items-center justify-center gap-1.5"
                >
                  <FaGithub size={14} /> View Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
