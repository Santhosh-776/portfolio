import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { experience, education } from '../utils/resumeData';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-transparent text-white font-sans z-20 flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl mx-auto relative z-20 w-full">
        {/* Section Header */}
        <div className="mb-8 md:mb-10">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-sans font-bold text-white"
          >
            Experience &amp; Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-300 text-sm md:text-base mt-2 max-w-2xl font-sans"
          >
            Proven industry internship impact alongside academic rigor in computer science and distributed engineering.
          </motion.p>
        </div>

        {/* 2-Column Layout: Left for Details (Experience + Education), Right for 3D Laptop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Work Experience & Education (Col 7) */}
          <div className="lg:col-span-7 space-y-10 pointer-events-auto">
            {/* 1. Work Experience Block */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-800">
                <div className="p-2 rounded-lg bg-neutral-900 text-white border border-neutral-800">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-sans text-white">Work Experience</h3>
                  <span className="text-xs font-sans text-neutral-400">Industry Software Engineering</span>
                </div>
              </div>

              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#0c0c0c] border border-neutral-800 rounded-2xl p-7 md:p-8 shadow-xl hover:border-neutral-700 transition-all duration-300 relative group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-2xl font-bold font-sans text-white">
                        {exp.role}
                      </h4>
                      <span className="text-lg font-sans text-emerald-400 font-semibold block mt-0.5">
                        @ {exp.company}
                      </span>
                    </div>
                    <div className="flex flex-col items-end text-xs font-sans text-neutral-400">
                      <span className="flex items-center gap-1.5 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800 text-neutral-300">
                        <Calendar size={13} /> {exp.duration}
                      </span>
                      <span className="flex items-center gap-1 mt-1 text-neutral-400">
                        <MapPin size={12} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-300 mb-6 italic border-l-2 border-neutral-700 pl-3 font-sans">
                    "{exp.overview}"
                  </p>

                  {/* Bullet Points from Resume */}
                  <div className="space-y-3">
                    <span className="text-xs font-sans text-neutral-400 uppercase tracking-wider block">
                      Core Accomplishments:
                    </span>
                    {exp.highlights.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-sm text-neutral-200 font-sans">
                        <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 2. Education Block */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-800">
                <div className="p-2 rounded-lg bg-neutral-900 text-white border border-neutral-800">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-sans text-white">Education</h3>
                  <span className="text-xs font-sans text-neutral-400">Academic Foundations</span>
                </div>
              </div>

              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#0c0c0c] border border-neutral-800 rounded-2xl p-7 md:p-8 shadow-xl hover:border-neutral-700 transition-all duration-300 relative group space-y-5"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-emerald-400 font-sans text-xs mb-3 font-semibold">
                      <Award size={13} />
                      <span>CGPA: {edu.cgpa} / 10.0</span>
                    </div>
                    <h4 className="text-xl font-bold font-sans text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-sans text-neutral-300 mt-1 font-semibold">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-sans text-neutral-400 py-2 border-y border-neutral-800">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {edu.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {edu.location}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {edu.details}
                  </p>

                  {/* Key Coursework Tags */}
                  <div>
                    <span className="text-[11px] font-sans text-neutral-400 block mb-2 uppercase tracking-wider">
                      Core Engineering Focus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Distributed Systems',
                        'Data Structures & Algorithms',
                        'Operating Systems',
                        'Database Management Systems',
                        'Artificial Intelligence & ML',
                        'Cloud Computing',
                      ].map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-xs font-sans text-neutral-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Clear viewport area for docked 3D Laptop */}
          <div className="lg:col-span-5 hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
