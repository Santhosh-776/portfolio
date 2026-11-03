import React from 'react';
import { ExternalLink, CheckCircle2, ArrowRight, Activity } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { featuredProjects } from '../utils/resumeData';

interface ProjectsProps {
  activeProjectIndex: number;
}

export const Projects: React.FC<ProjectsProps> = ({ activeProjectIndex }) => {
  return (
    <section id="projects" className="relative min-h-screen bg-transparent text-white font-sans overflow-hidden">
      {/* ================= DESKTOP PINNED HORIZONTAL CONTAINER ================= */}
      <div
        id="projects-pin-container"
        className="hidden md:flex h-screen w-full overflow-hidden relative items-center bg-transparent"
      >
        {/* Left Column Spacer / Context Bar for Docked Laptop */}
        <div className="w-[42vw] lg:w-[40vw] flex-shrink-0 h-full p-12 lg:p-16 flex flex-col justify-between pointer-events-auto z-20">
          <div>

            <h2 className="text-4xl lg:text-5xl font-sans font-extrabold text-white leading-tight">
              Projects
            </h2>

          </div>

          {/* Active Project Pagination Indicators */}
          <div className="space-y-3 font-sans text-xs">
            <span className="text-neutral-500 text-[11px] block uppercase tracking-wider">
              Active Dashboard Screen
            </span>
            <div className="flex items-center gap-3">
              {featuredProjects.map((p, idx) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${activeProjectIndex === idx
                    ? 'bg-neutral-900 border-white text-white font-bold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeProjectIndex === idx ? 'bg-white' : 'bg-neutral-600'}`} />
                  <span>0{idx + 1} {p.title}</span>
                </div>
              ))}
            </div>
            <span className="text-neutral-500 text-[11px] block">
              &bull; Vertical scroll scrubs horizontal project slides
            </span>
          </div>
        </div>

        {/* Right Horizontal Sliding Cards Track */}
        <div className="flex h-full items-center pl-4 pr-32 space-x-12 z-20 pointer-events-auto">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-slide w-[54vw] max-w-[850px] h-[78vh] flex-shrink-0 bg-[#0c0c0c] border border-neutral-800 rounded-2xl p-8 lg:p-10 flex flex-col justify-between shadow-2xl hover:border-neutral-700 transition-colors duration-300"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-sans font-extrabold text-white">
                      0{index + 1}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-300 font-sans text-xs border border-neutral-800">
                      {project.status}
                    </span>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-all"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <FaGithub size={18} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-all"
                        aria-label={`${project.title} live demo`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-1">
                  {project.title}
                </h3>
                <h4 className="text-sm font-sans text-neutral-400 mb-4">
                  {project.subtitle}
                </h4>

                {/* Metrics Highlight Pill */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs font-sans text-neutral-200 mb-5 flex items-center gap-2">
                  <Activity size={14} className="text-white flex-shrink-0" />
                  <span>{project.metrics}</span>
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                {/* Key Architectural Bullets */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-sans text-neutral-400 uppercase tracking-wider block">
                    Key Engineering Contributions:
                  </span>
                  {project.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-200 font-sans">
                      <CheckCircle2 size={14} className="text-white mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech tags + Repo CTA */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-xs font-sans text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs font-sans pt-1 text-neutral-400">
                  <span>Preview live on 3D laptop display &larr;</span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-neutral-300 font-bold flex items-center gap-1 font-sans"
                  >
                    Explore Codebase <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
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
