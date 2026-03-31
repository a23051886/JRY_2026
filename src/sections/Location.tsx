import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '@/hooks/useInView';
import { MapPin, Train, Building2, TreePine } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locationFeatures = [
  {
    icon: Train,
    title: '雙捷中心',
    description: 'MRT板南線(國父紀念館站) · MRT淡水信義線(信義安和站)',
  },
  {
    icon: Building2,
    title: '黃金地段',
    description: '東區ｘ仁愛圓環ｘ信義區',
  },
  {
    icon: TreePine,
    title: '綠意環繞',
    description: '仁愛林蔭 · 中山公園 · 國父紀念館',
  },
  {
    icon: MapPin,
    title: '北市核心',
    description: '北有東區與巨蛋 · 東為台北101',
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
      className="relative min-h-screen w-full py-32 overflow-hidden"
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
            出門不該是件麻煩事
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            在繁華都市的脈絡之中，雙捷中心、黃金地段、小型基地
            <br />
            《永恆璀璨ｘ世代珍藏》
          </p>
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
                「仁愛玉璽」座落於台北市大安區精華地段，緊鄰仁愛圓環與安和商圈，
                步行即可抵達MRT國父紀念館站與MRT信義安和站，享有便捷的交通網絡與豐富的生活機能。
              </p>
              <p className="text-text-secondary text-sm">
                周邊匯聚國父紀念館、大巨蛋、信義計畫區等重要地標，
                是大台北地區最具價值的居住版圖之一。
              </p>
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
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-gold font-serif text-lg whitespace-nowrap">仁愛玉璽</span>
              </div>

              {/* Location markers calculated from Google Maps coordinates */}
              {[
                { name: '大巨蛋', top: '35.7%', left: '60.1%' },
                { name: '國父紀念館', top: '42.2%', left: '62.1%' },
                { name: '中山公園', top: '46.8%', left: '56.0%' },
                { name: 'MRT信義安和', top: '58.4%', left: '45.2%' },
                { name: 'MRT國父紀念館', top: '39.2%', left: '53.2%' },
                { name: '台北市政府', top: '47.9%', left: '70.9%' },
                { name: '台北101', top: '56.8%', left: '72.6%' },
                { name: '通化夜市', top: '66.3%', left: '47.2%' },
                { name: '東區', top: '37.6%', left: '33.4%' },
                { name: '信義新天地', top: '47.8%', left: '78.9%' },
                { name: '安和商圈', top: '51.8%', left: '38.8%' },
                { name: '遠東商圈', top: '75.2%', left: '35.8%' },
                { name: '北醫商圈', top: '71.0%', left: '67.5%' },
                { name: '台北世貿', top: '58.7%', left: '65.9%' },
                { name: '大安森林公園', top: '59.3%', left: '4.5%' },
                { name: '科技大樓', top: '78.9%', left: '20.5%' },
                { name: '仁愛帝寶', top: '44.7%', left: '3.9%' },
                { name: '忠孝SOGO', top: '36.0%', left: '23.9%' },
                { name: '小巨蛋', top: '20.1%', left: '35.8%' },
                { name: '六張犁', top: '82.4%', left: '44.2%' },
                { name: '松山文創園區', top: '30.1%', left: '63.8%' },
                { name: '饒河夜市', top: '17.5%', left: '88.0%' },
                { name: '福華大飯店', top: '46.9%', left: '19.5%' },
                { name: '象山', top: '59.6%', left: '86.3%' }
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
