
import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import { resumeData } from './constants';


const App: React.FC = () => {

  return (
    <div className="text-gray-100 antialiased relative">
      <main className="container mx-auto px-4 md:px-8 lg:px-16">
        <Hero data={resumeData.hero} />
        <About data={resumeData.about} />
        <Skills data={resumeData.skills} />
        <Experience data={resumeData.experience} />
        <Projects data={{projects: resumeData.projects, publications: resumeData.publications}} />
        <Contact data={resumeData.contact} />
      </main>
      <ChatBot />
    </div>
  );
};

export default App;