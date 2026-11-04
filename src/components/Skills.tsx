import React from 'react';

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative h-screen min-h-screen flex flex-col justify-start items-center px-6 md:px-12 lg:px-20 bg-transparent text-white font-sans overflow-hidden z-20 pointer-events-none"
    >
      {/* Section Header */}
      <div id="skills-header-container" className="text-center pt-16 md:pt-20 space-y-2 pointer-events-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase">
          EXPLORE MY SKILLS
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 font-sans tracking-wide">
          click or hover any skill bubble inside the screen
        </p>
      </div>
    </section>
  );
};

export default Skills;
