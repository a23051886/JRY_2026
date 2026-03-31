import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Location } from '@/sections/Location';
import { Features } from '@/sections/Features';
import { Surroundings } from '@/sections/Surroundings';
import { VisualTour } from '@/sections/VisualTour';
import { FloorPlans } from '@/sections/FloorPlans';
import { Contact } from '@/sections/Contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize smooth scroll
  useLenis();

  useEffect(() => {
    // GSAP Configuration for mobile stability
    ScrollTrigger.config({ 
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" 
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle resize (throttle for desktop, ignore small shifts on mobile)
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-[100svh] bg-dark text-text-primary overflow-x-hidden">
      {/* Global noise overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none noise-overlay opacity-30" />
      
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <Location />
        <Features />
        <Surroundings />
        <VisualTour />
        <FloorPlans />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
