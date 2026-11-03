import React from 'react';
import { skillsCategories } from '../utils/resumeData';

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative h-screen min-h-screen flex flex-col justify-start items-center px-6 md:px-16 lg:px-24 bg-transparent text-white font-sans overflow-hidden"
    >
      <div className="pt-30 text-6xl font-bold text-white text-center">
        Explore My Skills
      </div>
      {/* Mobile-Friendly Companion Quick List (visible on small screens where 3D zoom is scaled) */}
      <div className="w-full max-w-6xl mx-auto relative z-20 md:hidden mt-6 space-y-4">
        <h3 className="text-lg font-sans font-bold text-white text-center uppercase tracking-wider">
          Quick Tech Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillsCategories.map((category) => (
            <div
              key={category.name}
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-4"
            >
              <h4 className="text-sm font-sans font-bold text-white mb-2 flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-[10px] text-neutral-400 font-sans">{category.skills.length} skills</span>
              </h4>
              <p className="text-xs text-neutral-400 mb-3">{category.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-sans text-neutral-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
