
import React, { useState, useEffect, useRef } from 'react';
import { ExperienceItem } from '../types';
import { BriefcaseIcon, CalendarIcon, LocationIcon, ListIcon } from './IconComponents';

interface ExperienceProps {
  data: ExperienceItem[];
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-5xl md:text-6xl font-anton uppercase gradient-text mb-12 tracking-wider">{children}</h2>
);

const Experience: React.FC<ExperienceProps> = ({ data }) => {
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
      id="experience" 
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <SectionTitle>Experience</SectionTitle>
      <div className="relative border-l-2 border-amber-400/30 ml-4 md:ml-0">
        {data.map((item, index) => (
          <div key={index} className="mb-12 pl-10 relative">
            <div className="absolute -left-4 top-1 w-7 h-7 bg-blue-950 border-2 border-amber-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            </div>
            
            <div className="bg-blue-900/50 p-6 rounded-lg shadow-lg border border-blue-800 hover:border-amber-400 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-amber-400">{item.role}</h3>
              <div className="flex items-center text-gray-300 font-semibold my-2">
                <BriefcaseIcon />
                <span className="ml-2">{item.company}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-300 space-y-1 md:space-y-0 md:space-x-4 mb-4">
                  <div className="flex items-center">
                      <CalendarIcon />
                      <span className="ml-2">{item.period}</span>
                  </div>
                  <div className="flex items-center">
                      <LocationIcon />
                      <span className="ml-2">{item.location}</span>
                  </div>
              </div>
              <ul className="mt-4 space-y-2">
                {item.description.map((desc, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-amber-400 mr-2 mt-1 flex-shrink-0"><ListIcon /></span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
