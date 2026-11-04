import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSkillVisual, SKILL_DESCRIPTIONS } from '../utils/skillsData';
import { skillsCategories } from '../utils/resumeData';

interface SkillsProps {
  activeSkill?: string;
  setActiveSkill?: (skill: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({
  activeSkill = 'LangGraph',
}) => {
  const activeSkillName = activeSkill || 'LangGraph';
  const activeVisual = getSkillVisual(activeSkillName);
  const activeDesc =
    SKILL_DESCRIPTIONS[activeSkillName] ||
    'Modern production technology powering high-performance distributed architectures.';
  const activeCategory =
    skillsCategories.find((cat) => cat.skills.includes(activeSkillName))?.name || 'Specialized Technology';

  return (
    <section
      id="skills"
      className="relative h-screen min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 bg-transparent text-white font-sans overflow-hidden z-20 pointer-events-none"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Pure Typography Details (NO CARDS, 100% Crisp Native Text) */}
        <div className="lg:col-span-5 pr-4 lg:pr-8 flex flex-col justify-center space-y-6 pointer-events-auto">

          {/* Section Main Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
            Skills & Capabilities
          </h2>

          {/* Dynamic Active Skill Details (Borderless, pure typography) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkillName}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-4 pt-2"
            >
              {/* Skill Name & Category Tag */}
              <div className="flex flex-wrap items-baseline gap-4">
                <span
                  className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-md"
                  style={{ color: activeVisual.color }}
                >
                  {activeSkillName}
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-neutral-300 border border-white/10">
                  {activeCategory}
                </span>
              </div>

              {/* Dynamic Description Paragraph */}
              <p className="text-lg sm:text-xl text-neutral-200 font-sans font-light leading-relaxed italic max-w-xl">
                &ldquo;{activeDesc}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Right Column: Clear viewport area for the tilted 3D laptop */}
        <div className="lg:col-span-7 hidden lg:block" />
      </div>
    </section>
  );
};

export default Skills;
