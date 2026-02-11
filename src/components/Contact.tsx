import { motion } from 'framer-motion';
import { personalInfo } from '../utils/resumeData';

const Contact = () => {
    return (
        <section id="contact" className="py-32 px-6 md:px-20 lg:px-32 bg-deep-navy text-pale-blue relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-vibrant-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-sky-blue font-mono mb-6"
                >
                    04. What's Next?
                </motion.p>

                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-display font-bold mb-8"
                >
                    Get In Touch
                </motion.h2>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-pale-blue/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
                >
                    I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </motion.p>

                <motion.a 
                    href={`mailto:${personalInfo.email}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="inline-block border-2 border-vibrant-blue text-vibrant-blue font-mono px-10 py-4 rounded hover:bg-vibrant-blue/10 transition-colors duration-300"
                >
                    Say Hello
                </motion.a>
            </div>
        </section>
    );
};

export default Contact;
