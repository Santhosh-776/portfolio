import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../utils/resumeData';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans pointer-events-none py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-end items-center">
        {/* Adjusted & Enlarged Social Profiles */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <a
            href={personalInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-3 rounded-xl bg-neutral-950/90 text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-600 shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <FaGithub size={26} />
          </a>
          <a
            href={personalInfo.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-3 rounded-xl bg-neutral-950/90 text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-600 shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <FaLinkedin size={26} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
