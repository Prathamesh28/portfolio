import React, { useState, useEffect, useRef } from 'react';

// Component Imports
import Navbar from './components/Navbar';
import Transition from './components/Transition';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import InteractiveDemo from './components/InteractiveDemo';
import Projects from './components/Projects';
import Awards from './components/Awards';
import Connect from './components/Connect';
import Chatbot from './components/Chatbot';

// Styles
import './App.css';

// --- Constants ---
const sections = ['hero', 'experience', 'skills', 
  // 'interactive-demo', 
  'projects', 'awards', 'connect'];
const totalSections = sections.length;
const SCROLL_THRESHOLD = 60; // Adjust for scroll sensitivity

function App() {
  // --- State Management ---
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  // --- Refs for managing events without re-renders ---
  const isWheeling = useRef(false);
  const scrollDelta = useRef(0);
  const scrollTimeout = useRef(null);

  // --- Navigation Logic ---
  const handleNavigate = (nextIndex) => {
    // Prevent navigation if a transition is in progress or the index is the same
    if (isWheeling.current || nextIndex === currentSectionIndex) return;
    
    isWheeling.current = true; // Lock further navigation attempts
    
    if (nextIndex >= 0 && nextIndex < totalSections) {
      setIsTransitioning(true);
      // Wait for the slide-out to begin before the main animation
      setTimeout(() => {
        setCurrentSectionIndex(nextIndex);
      }, 200);
    }
  };

  // --- Animation Completion Handler ---
  const onAnimationComplete = () => {
    setIsTransitioning(false);
    // Cooldown to prevent immediate re-triggering
    setTimeout(() => {
        isWheeling.current = false;
    }, 500);
  };

  // --- Scroll Hijacking Effect ---
  useEffect(() => {
    const handleWheel = (event) => {
      if (isWheeling.current) {
        event.preventDefault();
        return;
      }

      const currentSectionElement = document.getElementById(sections[currentSectionIndex]);
      if (!currentSectionElement) return;

      const scrollableContent = currentSectionElement.querySelector('.section-content-wrapper');
      
      if (scrollableContent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableContent;
        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const isScrollingDown = event.deltaY > 0;
        const isScrollingUp = event.deltaY < 0;

        if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
          scrollDelta.current = 0; // Reset scroll counter if scrolling inside a component
          return; 
        }
      }
      
      event.preventDefault();
      scrollDelta.current += event.deltaY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => { scrollDelta.current = 0; }, 150);

      const isThresholdDown = scrollDelta.current > SCROLL_THRESHOLD;
      const isThresholdUp = scrollDelta.current < -SCROLL_THRESHOLD;

      if (isThresholdDown && currentSectionIndex < totalSections - 1) {
        scrollDelta.current = 0;
        handleNavigate(currentSectionIndex + 1);
      } else if (isThresholdUp && currentSectionIndex > 0) {
        scrollDelta.current = 0;
        handleNavigate(currentSectionIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSectionIndex]);

  // --- Component Rendering ---
  // A map for cleaner component rendering
  const sectionComponents = {
    hero: <Hero />,
    experience: <Experience />,
    skills: <Skills />,
    // 'interactive-demo': <InteractiveDemo />,
    projects: <Projects />,
    awards: <Awards />,
    connect: <Connect />,
  };

  return (
    <>
      {/* Fixed position components */}
      <ParticleBackground />
      <Transition isTransitioning={isTransitioning} onAnimationComplete={onAnimationComplete} />
      <Chatbot />
      <Navbar 
        sections={sections} 
        currentSectionIndex={currentSectionIndex} 
        onNavigate={handleNavigate} 
      />

      {/* The main viewport for the sliding sections */}
      <div className="app-viewport">
        {sections.map((id, index) => {
          let sectionClass = 'page-section';
          if (index === currentSectionIndex) {
            sectionClass += ' active';
          } else if (index < currentSectionIndex) {
            sectionClass += ' prev';
          } else {
            sectionClass += ' next';
          }
          
          return (
            <section key={id} id={id} className={sectionClass}>
              {sectionComponents[id]}
            </section>
          );
        })}
      </div>
    </>
  );
}

export default App;
