import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  FileText,
  Send,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../utils/resumeData';

export const Hero: React.FC = () => {


  return (
    <section
      id="hero"
      className="relative h-screen min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 bg-transparent text-white font-sans overflow-hidden"
    >
      {/* Main Container - 2 Column Layout on Desktop */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">


          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            <h2 className="text-base md:text-lg font-sans text-neutral-400 font-medium tracking-wide">
              Hello, World! I'm
            </h2>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-extrabold text-white tracking-tight leading-[1.08]">
              {personalInfo.name}
            </h1>


          </motion.div>



          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto"
          >
            <a
              href="#contact"
              className="px-6 py-3.5 bg-white hover:bg-neutral-200 text-black font-sans text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send size={16} /> Contact Me
            </a>

            <a
              href="mailto:santhoshnadarajan.work@gmail.com"
              className="px-6 py-3.5 bg-neutral-950 hover:bg-neutral-900 text-white border border-neutral-800 font-sans text-sm rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText size={16} /> View Résumé
            </a>
          </motion.div>

          {/* Social Links & Direct Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-4 pt-2 pointer-events-auto"
          >
            <span className="text-xs font-sans text-neutral-400 tracking-wider">CONNECT:</span>
            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-lg bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-all"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-lg bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-all"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={personalInfo.links.email}
              aria-label="Email Address"
              className="p-2.5 rounded-lg bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-all"
            >
              <Mail size={18} />
            </a>
            <a
              href={personalInfo.links.phone}
              aria-label="Phone Number"
              className="p-2.5 rounded-lg bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-all"
            >
              <Phone size={18} />
            </a>
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
