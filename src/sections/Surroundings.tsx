import { useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Utensils, Hotel, Palette, ShoppingBag, Stethoscope, Dumbbell } from 'lucide-react';

const categories = [
  {
    id: 'dining',
    icon: Utensils,
    title: '餐飲',
    titleEn: 'DINING',
    items: ['仁愛圓環', '延吉商圈', '廖嬌米粉湯', '一蘭拉麵', '通化夜市'],
    image: '/images/landmark-5.jpg',
    description: '從米其林星級餐廳到隱藏版巷弄美食、從清晨到深夜，大安區的精緻味蕾地圖就在您的門前。',
  },
  {
    id: 'hotel',
    icon: Hotel,
    title: '酒店',
    titleEn: 'HOTELS',
    items: ['君悅酒店'],
    image: '/images/landmark-6.jpg',
    description: '國際五星地標為鄰，無論商務會晤或精緻餐飲，皆能顯現您的非凡品味。',
  },
  {
    id: 'culture',
    icon: Palette,
    title: '藝文',
    titleEn: 'ART & CULTURE',
    items: ['國父紀念館', '松山文創園區', '誠品書店', '1839當代藝廊'],
    image: '/images/landmark-3.jpg',
    description: '浸淫在誠品書香與國父紀念館的靜謐之中，城市喧囂在此轉化為人文底蘊。',
  },
  {
    id: 'shopping',
    icon: ShoppingBag,
    title: '購物',
    titleEn: 'SHOPPING',
    items: ['信義新天地', 'SOGO 百貨', '微風廣場', '明曜百貨'],
    image: '/images/landmark-1.jpg',
    description: '時尚的首選之地。信義商圈與各大百貨環繞，全球流行時尚與您僅咫尺之遙。',
  },
  {
    id: 'medical',
    icon: Stethoscope,
    title: '醫療',
    titleEn: 'MEDICAL',
    items: ['國泰綜合醫院', '仁愛醫院', '台北市立聯合醫院'],
    image: '/images/landmark-4.jpg',
    description: '頂尖醫療資源守護家人健康，使老有所依、幼有所養，讓您的生活不僅只有奢華，更有安心的保障。',
  },
  {
    id: 'sports',
    icon: Dumbbell,
    title: '運動',
    titleEn: 'SPORTS',
    items: ['台北大巨蛋', '台北體育館', '大安森林公園', '信義運動中心'],
    image: '/images/landmark-2.jpg',
    description: '在中山公園、大安森林公園及國父紀念館擁抱綠意，在大巨蛋感受演唱會、賽事享受運動熱情，重啟城市中的健康能量。',
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
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <img
            src={activeCategory.image}
            alt={activeCategory.title}
            className="w-full h-full object-cover filter brightness-[1.2] contrast-[1.05]"
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
            <p className="text-gold font-serif text-xl tracking-[0.2em]">周圍的精彩所在</p>
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
                    className={`group relative p-5 sm:p-6 text-left border rounded-sm transition-all duration-300 w-full active:scale-[0.98] cursor-pointer ${category.id === activeCategory.id
                      ? 'border-gold bg-gradient-to-r from-gold/20 via-dark/95 to-dark/90 text-gold shadow-[0_4px_20px_rgba(212,175,55,0.2)]'
                      : 'border-gold/30 hover:border-gold/60 bg-gradient-to-r from-white/[0.04] to-dark/85 hover:bg-gold/10'
                      }`}
                  >
                    <div className="flex items-center justify-between lg:block">
                      <div className="flex items-center gap-4 lg:block">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border transition-all duration-300 rounded-sm lg:mb-4 ${category.id === activeCategory.id
                          ? 'border-gold bg-gold/20 text-gold shadow-sm shadow-gold/30'
                          : 'border-gold/30 text-gold/60 group-hover:border-gold/60 group-hover:text-gold'
                          }`}>
                          <category.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                        <div className="lg:block">
                          <span className="text-gold/60 text-[10px] lg:text-xs tracking-[0.15em] block lg:mb-1 uppercase">
                            {category.titleEn}
                          </span>
                          <span className="font-serif text-lg lg:text-xl text-text-primary">
                            {category.title}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Expand Indicator - Clearly styled button badge */}
                      <div className="lg:hidden flex items-center gap-2">
                        {category.id === activeCategory.id ? (
                          <span className="text-[11px] text-gold font-medium bg-gold/15 px-2 py-0.5 rounded-full border border-gold/40">
                            已展開
                          </span>
                        ) : (
                          <span className="text-[11px] text-gold/70 group-hover:text-gold bg-white/5 px-2 py-0.5 rounded-full border border-gold/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            點擊探索
                          </span>
                        )}
                        <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${category.id === activeCategory.id
                          ? 'border-gold bg-gold text-dark rotate-180'
                          : 'border-gold/30 text-gold/70 group-hover:border-gold group-hover:text-gold'
                          }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Active indicator */}
                    <div className={`hidden lg:block absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-500 ${category.id === activeCategory.id ? 'w-full' : 'w-0 group-hover:w-1/3'
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
