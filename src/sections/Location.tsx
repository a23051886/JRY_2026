import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '@/hooks/useInView';
import { MapPin, Train, Building2, TreePine } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locationFeatures = [
  {
    icon: Train,
    title: '?™æ·ä¸­å?',
    description: 'MRT?¿å?ç·??‹çˆ¶ç´€å¿µé¤¨ç«? Â· MRTæ·¡æ°´ä¿¡ç¾©ç·?ä¿¡ç¾©å®‰å?ç«?',
  },
  {
    icon: Building2,
    title: 'é»ƒé??°æ®µ',
    description: '?±å?ï½˜ä??›å??°ï?ä¿¡ç¾©?€',
  },
  {
    icon: TreePine,
    title: 'ç¶ æ??°ç?',
    description: 'ä»æ??—è”­ Â· ä¸­å±±?¬å? Â· ?‹çˆ¶ç´€å¿µé¤¨',
  },
  {
    icon: MapPin,
    title: '?—å??¸å?',
    description: '?—æ??±å??‡å·¨??Â· ?±ç‚º?°å?101',
  },
];

export const Location = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [titleInViewRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [contentInViewRef, contentInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;
    if (!section || !map) return;

    const ctx = gsap.context(() => {
      // Map parallax
      gsap.to(map, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative min-h-[100dvh] w-full py-32 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/texture-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Title section */}
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-1000 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="text-gold text-sm tracking-[0.3em] mb-4 block">LOCATION</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary mb-6">
            ?ºé?ä¸è©²?¯ä»¶éº»ç…©äº?          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            ?¨ç??¯éƒ½å¸‚ç??ˆçµ¡ä¹‹ä¸­ï¼Œé??·ä¸­å¿ƒã€é??‘åœ°æ®µã€å??‹åŸº??            <br />
            ?Šæ°¸?†ç??¨ï?ä¸–ä»£?è???          </p>
        </div>

        {/* Content grid */}
        <div
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left: Features */}
          <div
            ref={titleInViewRef}
            className={`space-y-8 transition-all duration-1000 delay-300 ${titleInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            <div className="grid grid-cols-2 gap-6">
              {locationFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 border border-gold/20 hover:border-gold/50 transition-all duration-500 bg-dark/50 backdrop-blur-sm"
                >
                  <feature.icon className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-serif text-lg text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="p-8 border-l-2 border-gold bg-dark/30">
              <p className="text-text-primary leading-relaxed mb-4">
                ?Œä??›ç??½ã€åº§?½æ–¼?°å?å¸‚å¤§å®‰å?ç²¾è¯?°æ®µï¼Œç??°ä??›å??°è?å®‰å??†å?ï¼?                æ­¥è??³å¯?µé?MRT?‹çˆ¶ç´€å¿µé¤¨ç«™è?MRTä¿¡ç¾©å®‰å?ç«™ï?äº«æ?ä¾¿æ·?„äº¤?šç¶²çµ¡è?è±å??„ç?æ´»æ??½ã€?              </p>
              <p className="text-text-secondary text-sm">
                ?¨é??¯è??‹çˆ¶ç´€å¿µé¤¨?å¤§å·¨è??ä¿¡ç¾©è??«å?ç­‰é?è¦åœ°æ¨™ï?
                ?¯å¤§?°å??°å??€?·åƒ¹?¼ç?å±…ä??ˆå?ä¹‹ä???              </p>
            </div>
          </div>

          {/* Right: Map visualization */}
          <div
            ref={(el) => {
              mapRef.current = el;
              contentInViewRef.current = el;
            }}
            className={`relative transition-all duration-1000 delay-500 ${contentInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Map background */}
              <div className="absolute inset-0 border border-gold/30 rounded-full animate-pulse-glow" />
              <div className="absolute inset-4 border border-gold/20 rounded-full" />
              <div className="absolute inset-8 border border-gold/10 rounded-full" />

              {/* Center point */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-4 h-4 bg-gold rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full" />
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-gold font-serif text-lg whitespace-nowrap">ä»æ??‰ç’½</span>
              </div>

              {/* Location markers calculated from Google Maps coordinates */}
              {[
                { name: 'å¤§å·¨??, top: '35.7%', left: '60.1%' },
                { name: '?‹çˆ¶ç´€å¿µé¤¨', top: '42.2%', left: '62.1%' },
                { name: 'ä¸­å±±?¬å?', top: '46.8%', left: '56.0%' },
                { name: 'MRTä¿¡ç¾©å®‰å?', top: '58.4%', left: '45.2%' },
                { name: 'MRT?‹çˆ¶ç´€å¿µé¤¨', top: '39.2%', left: '53.2%' },
                { name: '?°å?å¸‚æ”¿åº?, top: '47.9%', left: '70.9%' },
                { name: '?°å?101', top: '56.8%', left: '72.6%' },
                { name: '?šå?å¤œå?', top: '66.3%', left: '47.2%' },
                { name: '?±å?', top: '37.6%', left: '33.4%' },
                { name: 'ä¿¡ç¾©?°å¤©??, top: '47.8%', left: '78.9%' },
                { name: 'å®‰å??†å?', top: '51.8%', left: '38.8%' },
                { name: '? æ±?†å?', top: '75.2%', left: '35.8%' },
                { name: '?—é†«?†å?', top: '71.0%', left: '67.5%' },
                { name: '?°å?ä¸–è²¿', top: '58.7%', left: '65.9%' },
                { name: 'å¤§å?æ£®æ??¬å?', top: '59.3%', left: '4.5%' },
                { name: 'ç§‘æ?å¤§æ?', top: '78.9%', left: '20.5%' },
                { name: 'ä»æ?å¸å¯¶', top: '44.7%', left: '3.9%' },
                { name: 'å¿ å?SOGO', top: '36.0%', left: '23.9%' },
                { name: 'å°å·¨??, top: '20.1%', left: '35.8%' },
                { name: '?­å¼µ??, top: '82.4%', left: '44.2%' },
                { name: '?¾å±±?‡å‰µ?’å?', top: '30.1%', left: '63.8%' },
                { name: 'é¥’æ²³å¤œå?', top: '17.5%', left: '88.0%' },
                { name: 'ç¦è¯å¤§é£¯åº?, top: '46.9%', left: '19.5%' },
                { name: 'è±¡å±±', top: '59.6%', left: '86.3%' }
              ].map((loc, i) => (
                <div key={i} className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-125 z-10 hover:z-30 group" style={{ top: loc.top, left: loc.left }}>
                  <div className="w-1.5 h-1.5 bg-gold/70 group-hover:bg-gold rounded-full mb-1 shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
                  <span className="text-[10px] text-text-secondary/80 group-hover:text-gold whitespace-nowrap">{loc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-gold/30 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-px h-32 bg-gradient-to-t from-gold/30 to-transparent" />
    </section>
  );
};
