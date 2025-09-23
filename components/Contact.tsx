
import React, { useState, useEffect, useRef } from 'react';
import { MailIcon, PhoneIcon, LinkedinIcon, GithubIcon } from './IconComponents';

interface ContactProps {
    data: {
        phone: string;
        email: string;
        linkedin: string;
        github: string;
    }
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <footer 
      id="contact" 
      ref={sectionRef}
      className={`py-20 text-center border-t border-blue-700/50 mt-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <h2 className="text-4xl md:text-5xl font-anton uppercase gradient-text mb-8 tracking-wider">Get In Touch</h2>
      <p className="max-w-2xl mx-auto text-gray-300 mb-10">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out.
      </p>
      <div className="flex justify-center items-center space-x-6 md:space-x-8">
        <a href={`mailto:${data.email}`} className="text-gray-300 hover:text-amber-400 transition-colors duration-300" aria-label="Email">
          <MailIcon />
        </a>
        <a href={`tel:${data.phone}`} className="text-gray-300 hover:text-amber-400 transition-colors duration-300" aria-label="Phone">
          <PhoneIcon />
        </a>
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors duration-300" aria-label="LinkedIn">
          <LinkedinIcon />
        </a>
        <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors duration-300" aria-label="GitHub">
          <GithubIcon />
        </a>
      </div>
       <div className="mt-16 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Ratna Srikar Duriseti. All Rights Reserved.</p>
        </div>
    </footer>
  );
};

export default Contact;
