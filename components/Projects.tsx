
import React, { useState, useEffect, useRef } from 'react';
import { ProjectItem } from '../types';
import { ListIcon } from './IconComponents';

interface ProjectsProps {
  data: {
      projects: ProjectItem[];
      publications: ProjectItem[];
  }
}

const SectionTitle: React.FC<{ title: string, subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-12">
        <h2 className="text-5xl md:text-6xl font-anton uppercase gradient-text tracking-wider">{title}</h2>
        {subtitle && <p className="text-xl text-gray-400 mt-2">{subtitle}</p>}
    </div>
);

const ProjectCard: React.FC<{ item: ProjectItem }> = ({ item }) => (
    <div className="bg-blue-900/50 p-6 rounded-lg shadow-lg border border-blue-800 h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300 hover:border-amber-400">
        <h3 className="text-xl font-bold text-amber-400">{item.title}</h3>
        {item.period && <p className="text-sm text-gray-400 my-2">{item.period}</p>}
        <ul className="mt-4 space-y-2 text-gray-200 flex-grow">
            {item.description.map((desc, i) => (
                <li key={i} className="flex items-start">
                    <span className="text-amber-400 mr-2 mt-1 flex-shrink-0"><ListIcon /></span>
                    <span>{desc}</span>
                </li>
            ))}
        </ul>
    </div>
);


const Projects: React.FC<ProjectsProps> = ({ data }) => {
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
      id="projects" 
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <SectionTitle title="Projects & Publications" />
      <div className="grid md:grid-cols-2 gap-8">
        {data.projects.map((item, index) => (
          <ProjectCard key={index} item={item} />
        ))}
        {data.publications.map((item, index) => (
          <ProjectCard key={`pub-${index}`} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
