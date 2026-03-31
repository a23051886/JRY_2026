import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '@/hooks/useInView';
import { Crown, Users, Wallet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    icon: Crown,
    title: '?∞È??ìË?',
    subtitle: 'PRIME LOCATION',
    description: '‰ΩçÊñº?óÂ??∏Â??ÅÂú∞?ïÁ??ØÂ??àÔ??óÈÄöËÜ®?ÑÂÇ≥?øÈ???,
    details: '?±Â??Å‰??õÂ??∞Ë??∞Â?Â∏ÇÊîøÂ∫ú‰∫§?Ø‰??ïÔ??ØË??∞Â??ÄÁ≤æËèØ?ÑÂ?Ê•≠„ÄÅÊ??ñË??üÊ¥ªË≥áÊ??ÇÊ≠•Ë°åÂèØ?îMRTÊ∑°Ê∞¥‰ø°Áæ©Á∑?‰ø°Áæ©ÂÆâÂ?Á´??äÊùø?óÁ?(?ãÁà∂Á¥ÄÂøµÈ§®Á´?Ôºå‰∏≤??Ö®?∞Â??Ñ‰∫§?öÁ∂≤Áµ°„Ä?,
    image: '/images/feature-1.jpg',
  },
  {
    id: 2,
    icon: Users,
    title: '?¨È?Ë≤∑ÈÑ∞',
    subtitle: 'EXCLUSIVE COMMUNITY',
    description: 'Â§ßÂ??Ä‰ΩèÊà∂Á¥†Ë≥™?™ËâØÔºåË?Á¨ëÊ?È¥ªÂ??ÅÂ?‰æÜÁÑ°?Ω‰?',
    details: '‰∏ÄÂ±§ÂÖ©?∂Â??∫Âú∞?¥È°ØÂ±Ö‰??ÆÁ?ÔºåÈÑ∞?åÁ??∫Á§æ?ÉÁ≤æ?±Ô??üÈÄ†È??ÖÂØß?úÁ?Â±Ö‰?Ê∞õÂ?ÔºåÊòØ?ÅÂë≥‰∫∫Â£´?ÑÁ??≥Â??Ä??,
    image: '/images/feature-2.jpg',
  },
  {
    id: 3,
    icon: Wallet,
    title: '‰ΩéÈ?‰ª?,
    subtitle: 'ACCESSIBLE LUXURY',
    description: 'Ë®ÇÁ∞Ω?ÖÈ? 3%ÔºåÊú¨Ê°àÈ?Ë®àÊñº 2029 Âπ?2 ?àÁ´£Â∑?,
    details: 'ËºïÈ??≤È?Â§ßÂ??Ä?ÑÁ?‰Ω≥Ê??ÉÔ?‰ª•Ê•µ‰ΩéÁ??ÄÊ™ªÈ?Á¥ÑÊú™‰æÜÁ?Á≤æÁ∑ª?üÊ¥ª?ÇÂ??ß‰?Ê¨æÊñπÊ°àÔ?ËÆìÂ§¢?≥‰??çÈ??†„Ä?,
    image: '/images/feature-3.jpg',
  },
];

export const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [titleInViewRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    // ScrollTrigger or other side effects can go here if needed
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative min-h-[100svh] w-full overflow-hidden bg-dark"
    >
      {/* Background image with transition */}
      <div className="absolute inset-0 z-0">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1] saturate-[0.8]"
            />
            {/* Darker overlay on mobile to improve text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 lg:from-dark/80 lg:via-dark/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[100svh] flex flex-col justify-center px-6 lg:px-12 py-32">
        {/* Section title */}
        <div
          ref={titleInViewRef}
          className={`mb-16 transition-all duration-1000 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="text-gold text-sm tracking-[0.3em] mb-4 block">HIGHLIGHTS</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary">
            ?¨Ê??çÈ?
          </h2>
        </div>

        {/* Features display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature content */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group cursor-pointer transition-all duration-500 ${index === activeIndex
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-40 translate-x-4 hover:opacity-60'
                  }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${index === activeIndex
                    ? 'border-gold bg-gold/10'
                    : 'border-gold/30'
                    }`}>
                    <feature.icon className={`w-5 h-5 transition-colors duration-300 ${index === activeIndex ? 'text-gold' : 'text-gold/50'
                      }`} />
                  </div>
                  <div className="flex-1">
                    <span className="text-gold/60 text-xs tracking-[0.2em] block mb-1">
                      {feature.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3">
                      {feature.description}
                    </p>
                    <div className={`overflow-hidden transition-all duration-500 ${index === activeIndex ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                      <p className="text-text-secondary/80 text-sm leading-relaxed">
                        {feature.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Active feature highlight */}
          <div className="hidden lg:block">
            <div className="relative">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`transition-all duration-700 ${index === activeIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 absolute inset-0'
                    }`}
                >
                  <div className="aspect-[4/3] relative overflow-hidden border border-gold/20">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.05]"
                    />
                    {(index === 1 || index === 2) && (
                      <div className="absolute top-4 right-4 bg-dark/40 backdrop-blur-sm border border-white/20 px-2 py-1 rounded text-white/90 text-xs tracking-widest pointer-events-none shadow-sm z-10">
                        3DÊ∏≤Ê?Á§∫Ê???                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-0" />
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <span className="text-gold text-sm tracking-[0.2em]">{feature.subtitle}</span>
                      <h4 className="font-serif text-3xl text-text-primary mt-2">{feature.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-4 mt-12">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1 transition-all duration-500 ${index === activeIndex
                ? 'w-12 bg-gold'
                : 'w-6 bg-gold/30 hover:bg-gold/50'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-12 w-px h-48 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent" />
      <div className="absolute bottom-1/4 left-12 w-px h-48 bg-gradient-to-t from-gold/30 via-gold/10 to-transparent" />
    </section>
  );
};
