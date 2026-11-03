import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Send, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Globe 
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo, certifications } from '../utils/resumeData';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-transparent text-white font-sans z-20 flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl mx-auto relative z-20 space-y-12 md:space-y-16 w-full">
        {/* ================= CERTIFICATIONS SECTION ================= */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 font-sans text-xs mb-3">
              <Award size={14} />
              <span>05 // INDUSTRY ACCREDITATION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white">
              Professional Certifications
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#0c0c0c] border border-neutral-800 rounded-2xl p-7 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-neutral-700 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-xl bg-neutral-900 text-white border border-neutral-800 flex-shrink-0">
                    <Sparkles size={28} />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block text-[11px] font-sans text-neutral-400 bg-neutral-900 px-2.5 py-0.5 rounded border border-neutral-800 uppercase tracking-wider">
                      Verified Credential &bull; {cert.issuer}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold font-sans text-white">
                      {cert.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans">
                      {cert.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skillsGained.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-xs font-sans text-white flex items-center gap-1"
                        >
                          <CheckCircle2 size={11} className="text-white" /> {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 text-center md:text-right">
                  <div className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-sans text-white font-semibold">
                    COURSERA VERIFIED
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= CONTACT SECTION ================= */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 font-sans text-xs mb-3">
              <Mail size={13} />
              <span>06 // INITIATE TRANSMISSION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white">
              Get In Touch
            </h2>
            <p className="text-neutral-400 text-sm md:text-base mt-2 max-w-xl mx-auto font-sans">
              Whether you are looking to hire a Full Stack &amp; AI Engineer, collaborate on distributed systems, or discuss a project, my inbox is always open.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0c0c0c] border border-neutral-800 rounded-2xl p-7 space-y-6">
                <h3 className="text-xl font-bold font-sans text-white">
                  Direct Channels
                </h3>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-neutral-900 text-white">
                    <Mail size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-sans text-neutral-400 block uppercase">Email</span>
                    <span className="text-sm font-sans text-white truncate block">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-neutral-900 text-white">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans text-neutral-400 block uppercase">Phone / WhatsApp</span>
                    <span className="text-sm font-sans text-white">
                      {personalInfo.phone}
                    </span>
                  </div>
                </a>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between font-sans">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">CONNECT ONLINE:</span>
                  <div className="flex gap-2">
                    <a
                      href={personalInfo.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <FaGithub size={18} />
                    </a>
                    <a
                      href={personalInfo.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin size={18} />
                    </a>
                    <a
                      href={personalInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      aria-label="Portfolio Website"
                    >
                      <Globe size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="bg-[#0c0c0c] border border-neutral-800 rounded-2xl p-7 md:p-8 space-y-5 font-sans"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans text-neutral-300 mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[#080808] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-neutral-300 mb-2 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-[#080808] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans text-neutral-300 mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hi Santhosh, I'd like to discuss a software engineering opportunity..."
                    className="w-full bg-[#080808] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-white hover:bg-neutral-200 text-black font-sans text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send size={16} /> Send Message via Email
                </button>

                {submitted && (
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs font-sans text-center flex items-center justify-center gap-2">
                    <CheckCircle2 size={14} /> Ready! Email client prompt launched.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
