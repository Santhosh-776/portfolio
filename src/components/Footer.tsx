import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-deep-navy py-8 text-center text-pale-blue/50 text-sm font-mono relative z-10">
      <div className="flex justify-center space-x-6 mb-4 md:hidden">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-vibrant-blue transition-colors">
            <FaGithub size={20} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-vibrant-blue transition-colors">
            <FaLinkedin size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-vibrant-blue transition-colors">
            <FaTwitter size={20} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-vibrant-blue transition-colors">
            <FaInstagram size={20} />
        </a>
      </div>
      <p className="hover:text-sky-blue transition-colors cursor-default">
        Designed & Built by Santhosh
      </p>
    </footer>
  );
};

export default Footer;
