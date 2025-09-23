
import React, { useState, useEffect, useRef } from 'react';
import { SkillCategory } from '../types';

interface SkillsProps {
  data: SkillCategory[];
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-5xl md:text-6xl font-anton uppercase gradient-text mb-12 tracking-wider">{children}</h2>
);

const colors = [
    'bg-amber-400/20 text-amber-300 border-amber-400/50',
    'bg-sky-400/20 text-sky-300 border-sky-400/50',
    'bg-yellow-400/20 text-yellow-300 border-yellow-400/50',
    'bg-cyan-400/20 text-cyan-300 border-cyan-400/50',
    'bg-amber-500/20 text-amber-400 border-amber-500/50',
    'bg-blue-400/20 text-blue-300 border-blue-400/50',
]

const Skills: React.FC<SkillsProps> = ({ data }) => {
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
      id="skills" 
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <SectionTitle>Technical Skills</SectionTitle>
      <div className="space-y-10">
        {data.map((category, catIndex) => (
          <div key={catIndex} className="bg-blue-900/50 p-6 rounded-lg shadow-lg border border-blue-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-100">{category.category}</h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <span 
                  key={skillIndex} 
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${colors[catIndex % colors.length]}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
