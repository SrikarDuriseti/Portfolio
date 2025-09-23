
import React, { useState, useEffect, useRef } from 'react';
import { ListIcon } from './IconComponents';

interface AboutProps {
  data: {
    summary: string;
    responsibilities: string[];
  };
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-5xl md:text-6xl font-anton uppercase gradient-text mb-8 tracking-wider">{children}</h2>
);

const About: React.FC<AboutProps> = ({ data }) => {
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
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <SectionTitle>About Me</SectionTitle>
      <div className="bg-blue-900/50 p-8 rounded-lg shadow-xl backdrop-blur-sm border border-blue-800">
        <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-200">
          {data.summary}
        </p>
        <h3 className="text-2xl font-bold mb-4 text-amber-400">Roles & Responsibilities</h3>
        <ul className="space-y-3">
          {data.responsibilities.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-amber-400 mr-3 mt-1 flex-shrink-0"><ListIcon /></span>
              <span className="text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
