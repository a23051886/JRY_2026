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
    title: '地點卓越',
    subtitle: 'PRIME LOCATION',
    description: '位於北市核心、地處繁華商圈，抗通膨的傳承首選',
    details: '東區、仁愛圓環與台北市政府交匯之處，匯聚台北最精華的商業、文化與生活資源。步行可達MRT淡水信義線(信義安和站)及板南線(國父紀念館站)，串連全台北的交通網絡。',
    image: '/images/feature-1.jpg',
  },
  {
    id: 2,
    icon: Users,
    title: '萬金買鄰',
    subtitle: 'EXCLUSIVE COMMUNITY',
    description: '大安區住戶素質優良，談笑有鴻儒、往來無白丁',
    details: '一層兩戶小基地更顯居住單純，鄰里皆為社會精英，營造高雅寧靜的居住氛圍，是品味人士的理想居所。',
    image: '/images/feature-2.jpg',
  },
  {
    id: 3,
    icon: Wallet,
    title: '低首付',
    subtitle: 'ACCESSIBLE LUXURY',
    description: '訂簽僅需 3%，本案預計於 2029 年 2 月竣工',
    details: '輕鬆進駐大安區的絕佳機會，以極低的門檻預約未來的精緻生活。彈性付款方案，讓夢想不再遙遠。',
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
      className="relative min-h-screen w-full overflow-hidden bg-dark"
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
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-12 py-32">
        {/* Section title */}
        <div
          ref={titleInViewRef}
          className={`mb-16 transition-all duration-1000 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="text-gold text-sm tracking-[0.3em] mb-4 block">HIGHLIGHTS</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary">
            本案重點
          </h2>
        </div>

        {/* Features display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature content */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group cursor-pointer transition-all duration-500 active:scale-[0.98] rounded-sm p-6 border relative ${index === activeIndex
                  ? 'border-gold bg-gradient-to-r from-gold/15 via-gold/5 to-transparent shadow-[0_0_25px_rgba(212,175,55,0.18)] opacity-100'
                  : 'border-gold/30 bg-dark/60 hover:border-gold/60 hover:bg-gold/5 opacity-75 hover:opacity-100'
                  }`}
                onClick={() => setActiveIndex(index)}
              >
                {/* Visual click affordance badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs">
                  {index === activeIndex ? (
                    <span className="text-gold font-medium bg-gold/20 border border-gold/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                      展開中
                    </span>
                  ) : (
                    <span className="text-gold/70 group-hover:text-gold bg-white/5 group-hover:bg-gold/15 border border-gold/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-all duration-300">
                      點擊查看詳情
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-5 pt-1">
                  <div className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 shrink-0 ${index === activeIndex
                    ? 'border-gold bg-gold/20 text-gold shadow-sm shadow-gold/30'
                    : 'border-gold/30 text-gold/60 group-hover:border-gold/60 group-hover:text-gold'
                    }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="pr-24 sm:pr-28">
                      <span className="text-gold/70 text-xs tracking-[0.2em] block mb-1">
                        {feature.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl text-text-primary mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${index === activeIndex ? 'max-h-[500px] opacity-100 pt-3 mt-1 border-t border-gold/20' : 'max-h-0 opacity-0'
                      }`}>
                      <p className="text-text-secondary/90 text-sm leading-relaxed pb-1">
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
                        3D渲染示意圖
                      </div>
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
