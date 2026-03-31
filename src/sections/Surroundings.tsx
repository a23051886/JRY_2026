import { useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Utensils, Hotel, Palette, ShoppingBag, Stethoscope, Dumbbell } from 'lucide-react';

const categories = [
  {
    id: 'dining',
    icon: Utensils,
    title: 'é¤é£²',
    titleEn: 'DINING',
    items: ['ä»æ??“ç’°', 'å»¶å??†å?', 'å»–å?ç±³ç?æ¹?, 'ä¸€?­æ?éº?, '?šå?å¤œå?'],
    image: '/images/landmark-5.jpg',
    description: 'å¾žç±³?¶æ??Ÿç?é¤å»³?°éš±?ç?å··å?ç¾Žé??å?æ¸…æ™¨?°æ·±å¤œï?å¤§å??€?„ç²¾ç·»å‘³?¾åœ°?–å°±?¨æ‚¨?„é??ã€?,
  },
  {
    id: 'hotel',
    icon: Hotel,
    title: '?’å?',
    titleEn: 'HOTELS',
    items: ['?›æ??’å?'],
    image: '/images/landmark-6.jpg',
    description: '?‹é?äº”æ??°æ??ºé„°ï¼Œç„¡è«–å??™æ??¤æ?ç²¾ç·»é¤é£²ï¼Œç??½é¡¯?¾æ‚¨?„é??¡å??³ã€?,
  },
  {
    id: 'culture',
    icon: Palette,
    title: '?æ?',
    titleEn: 'ART & CULTURE',
    items: ['?‹çˆ¶ç´€å¿µé¤¨', '?¾å±±?‡å‰µ?’å?', 'èª å??¸å?', '1839?¶ä»£?å?'],
    image: '/images/landmark-3.jpg',
    description: 'æµ¸æ·«?¨è??æ›¸é¦™è??‹çˆ¶ç´€å¿µé¤¨?„é?è¬ä?ä¸­ï??Žå??§å??¨æ­¤è½‰å??ºäºº?‡å??Šã€?,
  },
  {
    id: 'shopping',
    icon: ShoppingBag,
    title: 'è³¼ç‰©',
    titleEn: 'SHOPPING',
    items: ['ä¿¡ç¾©?°å¤©??, 'SOGO ?¾è²¨', 'å¾®é¢¨å»? ´', '?Žæ??¾è²¨'],
    image: '/images/landmark-1.jpg',
    description: '?‚å??„é??¸ä??°ã€‚ä¿¡ç¾©å??ˆè??„å¤§?¾è²¨?°ç?ï¼Œå…¨?ƒæ?è¡Œæ?å°šè??¨å??«å°ºä¹‹é???,
  },
  {
    id: 'medical',
    icon: Stethoscope,
    title: '?«ç?',
    titleEn: 'MEDICAL',
    items: ['?‹æ³°ç¶œå??«é™¢', 'ä»æ??«é™¢', '?°å?å¸‚ç??¯å??«é™¢'],
    image: '/images/landmark-4.jpg',
    description: '?‚å??«ç?è³‡æ?å®ˆè­·å®¶äºº?¥åº·ï¼Œä½¿?æ??€ä¾ã€å¹¼?‰æ?é¤Šï?è®“æ‚¨?„ç?æ´»ä??…åª?‰å¥¢?¯ï??´æ?å®‰å??„ä??œã€?,
  },
  {
    id: 'sports',
    icon: Dumbbell,
    title: '?‹å?',
    titleEn: 'SPORTS',
    items: ['?°å?å¤§å·¨??, '?°å?é«”è‚²é¤?, 'å¤§å?æ£®æ??¬å?', 'ä¿¡ç¾©?‹å?ä¸­å?'],
    image: '/images/landmark-2.jpg',
    description: '?¨ä¸­å±±å…¬?’ã€å¤§å®‰æ£®?—å…¬?’å??‹çˆ¶ç´€å¿µé¤¨?æŠ±ç¶ æ?ï¼Œåœ¨å¤§å·¨?‹æ??—æ??±æ??è³½äº‹äº«?—é??•ç†±?…ï??å??Žå?ä¸­ç??¥åº·?½é???,
  },
];

export const Surroundings = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [titleInViewRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [gridInViewRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  const handleCategoryChange = (category: typeof categories[0]) => {
    if (category.id === activeCategory.id || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(category);
      setTimeout(() => setIsTransitioning(false), 100);

      // On mobile, scroll to details after selection
      if (window.innerWidth < 1024 && detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      id="surroundings"
      className="relative min-h-[100dvh] w-full py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-dark">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <img
            src={activeCategory.image}
            alt={activeCategory.title}
            className="w-full h-full object-cover filter brightness-[1.2] contrast-[1.05]"
            loading="eager"
            onLoad={() => setIsTransitioning(false)}
          />
        </div>
        {/* Very light gradient for maximum visibility */}
        <div className="absolute inset-0 bg-gradient-to-tr from-dark/60 via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/60 z-10" />
      </div>

      {/* Dynamic Background Floating Text for Visual Interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5 select-none opacity-[0.03]">
        <div className="absolute top-1/4 -right-12 font-serif text-[20vw] whitespace-nowrap leading-none transition-all duration-1000">
          {activeCategory.titleEn}
        </div>
        <div className="absolute bottom-1/4 -left-12 font-serif text-[20vw] whitespace-nowrap leading-none opacity-50">
          {activeCategory.title}
        </div>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Title */}
        <div
          ref={titleInViewRef}
          className={`mb-16 transition-all duration-1000 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="inline-block text-gold text-xs tracking-[0.5em] mb-4 py-1 px-3 border border-gold/30 bg-gold/5 backdrop-blur-sm">
            SURROUNDINGS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary mb-4">
            The Gems Around You
          </h2>
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-gold/50" />
            <p className="text-gold font-serif text-xl tracking-[0.2em]">?¨å??„ç²¾å½©æ???/p>
          </div>
        </div>

        {/* Content grid - Desktop only side-by-side, Mobile will be vertical stack */}
        <div
          ref={gridInViewRef}
          className={`transition-all duration-1000 delay-300 ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Main Grid Wrapper */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Desktop: Category cards (2/3 width) | Mobile: Vertical list */}
            <div className="lg:col-span-2 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
              {categories.map((category) => (
                <div key={category.id} className="flex flex-col">
                  {/* Category Button */}
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`group relative p-6 text-left border transition-all duration-500 w-full ${category.id === activeCategory.id
                      ? 'border-gold bg-dark/90 text-gold'
                      : 'border-gold/20 hover:border-gold/50 bg-dark/80'
                      }`}
                  >
                    <div className="flex items-center justify-between lg:block">
                      <div className="flex items-center gap-4 lg:block">
                        <category.icon className={`w-6 h-6 lg:mb-4 transition-colors duration-300 ${category.id === activeCategory.id ? 'text-gold' : 'text-gold/50 group-hover:text-gold/70'
                          }`} />
                        <div className="lg:block">
                          <span className="text-gold/60 text-[10px] lg:text-xs tracking-[0.15em] block lg:mb-1 uppercase">
                            {category.titleEn}
                          </span>
                          <span className="font-serif text-lg text-text-primary">
                            {category.title}
                          </span>
                        </div>
                      </div>
                      {/* Mobile Expand Indicator */}
                      <div className={`lg:hidden transition-transform duration-300 ${category.id === activeCategory.id ? 'rotate-180 text-gold' : 'text-gold'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>

                    {/* Desktop Active indicator */}
                    <div className={`hidden lg:block absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-500 ${category.id === activeCategory.id ? 'w-full' : 'w-0'
                      }`} />
                  </button>

                  {/* Mobile Accordion Content (Visible only when active on small screens) */}
                  <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-dark/95 backdrop-blur-sm border-x border-b border-gold/20 ${category.id === activeCategory.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 border-none'
                    }`}>
                    <div className="p-6 space-y-4">
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {category.items.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-text-primary text-sm font-medium">
                            <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-text-secondary text-xs italic pt-2 border-t border-gold/20 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Column Details (Right 1/3, hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-1">
              <div
                className={`p-8 border border-gold/30 bg-dark/95 backdrop-blur-md h-full transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                  }`}
              >
                <activeCategory.icon className="w-10 h-10 text-gold mb-6" />
                <span className="text-gold/60 text-sm tracking-[0.2em] block mb-2">
                  {activeCategory.titleEn}
                </span>
                <h3 className="font-serif text-3xl text-text-primary mb-6">
                  {activeCategory.title}
                </h3>

                <ul className="space-y-3">
                  {activeCategory.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-text-primary font-medium"
                    >
                      <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gold/20">
                  <p className="text-text-primary/70 text-sm leading-relaxed italic">
                    {activeCategory.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-32 h-px bg-gradient-to-l from-gold/30 to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-32 h-px bg-gradient-to-r from-gold/30 to-transparent" />
    </section>
  );
};
