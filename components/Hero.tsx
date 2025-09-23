import React, { useState, useEffect } from 'react';

interface HeroProps {
  data: {
    name: string;
    title: string;
    image: string;
  };
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // A small threshold to prevent firing on minimal scroll
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run on mount to check initial scroll position
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Offset to account for the fixed header height (h-20 = 5rem = 80px)
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    } else if (href === '#home') {
       window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  return (
    // Use h-screen to reserve space, allowing the sticky header to function without causing content jumps.
    <div id="home" className="h-screen">
      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? 'bg-[#002366]/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div 
          className={`container mx-auto px-4 md:px-8 lg:px-16 flex items-center transition-all duration-500 ease-in-out ${
            isScrolled ? 'justify-between h-20' : 'justify-center h-screen'
          }`}
        >
          {/* Left side: Image and Name */}
          <div 
            className={`flex items-center transition-all duration-500 ease-in-out ${
              isScrolled ? 'gap-4' : 'gap-8 flex-col md:flex-row w-full max-w-7xl'
            }`}
          >
            {/* Image Container */}
            <div className={`relative flex-shrink-0 transition-all duration-500 ease-in-out ${isScrolled ? 'w-12 h-12' : 'w-72 h-72 md:w-96 md:h-96'}`}>
              <div className={`absolute inset-0 bg-amber-500 rounded-full blur-2xl transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-50'}`}></div>
              <img 
                src={data.image} 
                alt={data.name} 
                className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-amber-400/50"
              />
            </div>

            {/* Text Content Container */}
            <div className={`flex flex-col transition-all duration-500 ease-in-out ${isScrolled ? 'items-start' : 'items-center md:items-start'}`}>
              <h1 className={`font-anton uppercase tracking-tighter leading-none transition-all duration-500 ease-in-out ${isScrolled ? 'text-2xl gradient-text' : 'text-6xl md:text-8xl lg:text-9xl text-center md:text-left'}`}>
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>
                  {isScrolled ? data.name : <>{data.name.split(' ').slice(0, 2).join(' ')}<br/>{data.name.split(' ').slice(2).join(' ')}</>}
                </a>
              </h1>
              
              {/* Subtitle and Hero Nav Wrapper for smooth collapse */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isScrolled ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
                }`}
              >
                <p className={`font-semibold gradient-text tracking-wide text-center md:text-left transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'mt-4 text-2xl md:text-3xl'}`}>
                  {data.title}
                </p>
                <nav className={`mt-10 flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'flex'}`}>
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-gray-200 hover:text-amber-400 transition duration-300 font-semibold tracking-wide text-lg"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Right side: Header Navigation (Desktop) */}
          <nav className={`hidden md:flex space-x-6 transition-opacity duration-500 ease-in-out ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-200 hover:text-amber-400 transition duration-300 font-semibold tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Hero;