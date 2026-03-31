import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMousePosition } from '@/hooks/useMousePosition';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const mousePosition = useMousePosition();

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const tagline = taglineRef.current;
    const overlay = overlayRef.current;

    if (!section || !bg || !title || !subtitle || !tagline || !overlay) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(bg, { scale: 1.2, filter: 'blur(10px)' });
      gsap.set(title.querySelectorAll('.char'), { y: '100%', rotateX: 90, opacity: 0 });
      gsap.set(subtitle, { width: 0, opacity: 0 });
      gsap.set(tagline, { opacity: 0, y: 20 });
      gsap.set(overlay, { opacity: 1 });

      // Entry animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(overlay, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
      })
        .to(bg, {
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: 'power2.out',
        }, 0)
        .to(title.querySelectorAll('.char'), {
          y: '0%',
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
        }, 0.3)
        .to(subtitle, {
          width: 'auto',
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }, 1)
        .to(tagline, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }, 1.3);

      // Scroll animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      scrollTl
        .to(title, {
          rotateY: 15,
          opacity: 0.3,
          ease: 'none',
        }, 0)
        .to(bg, {
          y: '30%',
          ease: 'none',
        }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    gsap.to(bg, {
      x: mousePosition.normalizedX * 10,
      y: mousePosition.normalizedY * 10,
      duration: 1,
      ease: 'power2.out',
    });
  }, [mousePosition]);

  const scrollToNext = () => {
    const locationSection = document.querySelector('#location');
    if (locationSection) {
      locationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split title into characters
  const titleChars = '仁愛玉璽'.split('');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden perspective-1000"
    >
      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-dark z-20"
      />

      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="仁愛玉璽"
          className="w-full h-full object-cover filter brightness-[1.2] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/10 via-transparent to-dark/40" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 z-10 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col items-center lg:items-start justify-start pt-[12vh] md:pt-[15vh] lg:pt-[8vh] px-6 lg:px-20 xl:px-32">
        {/* Content wrapper - Primary Title (Subtle Watermark Style on Desktop) */}
        <div className="flex flex-col items-center lg:items-start justify-center w-full max-w-[90vw] mx-auto lg:mx-0">
          <h1
            ref={titleRef}
            className="font-artistic text-7xl sm:text-7xl md:text-8xl lg:text-[16vw] text-text-primary lg:opacity-10 mb-2 md:mb-8 tracking-tighter preserve-3d"
          >
            {titleChars.map((char, index) => (
              <span
                key={index}
                className="char inline-block"
              >
                <span className="inline-block">{char}</span>
              </span>
            ))}
          </h1>
        </div>

        {/* Secondary Content Wrapper (Absolute on Desktop, center on Mobile) */}
        <div className="flex flex-col items-center mt-2 md:mt-0 md:absolute md:bottom-24 md:right-12 lg:bottom-32 lg:right-24 md:items-end z-40">
          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-2xl md:text-3xl text-gold font-serif tracking-[0.3em] mb-4 md:mb-6 overflow-hidden whitespace-nowrap"
          >
            獨棟雙拼 · 大安之星
          </p>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className="flex items-center gap-4 text-text-secondary"
          >
            <span className="w-6 md:w-16 h-px bg-gold/50 block md:hidden" />
            <span className="text-xs md:text-base tracking-[0.2em] whitespace-nowrap">電梯兩房 · 訂簽 3%</span>
            <span className="w-6 md:w-16 h-px bg-gold/50" />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-gold/70 hover:text-gold transition-colors duration-300 group"
      >
        <span className="text-xs tracking-[0.2em]">探索</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>

      {/* Corner decorations */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l border-t border-gold/20 z-30" />
      <div className="absolute top-24 right-6 w-16 h-16 border-r border-t border-gold/20 z-30" />
      <div className="absolute bottom-24 left-6 w-16 h-16 border-l border-b border-gold/20 z-30" />
      <div className="absolute bottom-24 right-6 w-16 h-16 border-r border-b border-gold/20 z-30" />
    </section>
  );
};
