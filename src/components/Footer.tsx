import React from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../utils/resumeData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-md border-t border-neutral-900 py-10 text-center text-neutral-400 text-xs font-sans relative z-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-neutral-300">
          <span>Engineered with React, Three.js, R3F &amp; GSAP ScrollTrigger</span>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href={personalInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FaGithub size={16} /> GitHub
          </a>
          <a
            href={personalInfo.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FaLinkedin size={16} /> LinkedIn
          </a>
          <a
            href={personalInfo.links.email}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Mail size={16} /> Email
          </a>
        </div>

        <p className="text-neutral-500 font-sans">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
