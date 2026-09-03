import { useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Maximize, Bed, Bath, Wind, Square } from 'lucide-react';

const floorPlans = [
  {
    id: 'A',
    name: 'A 房型',
    nameEn: 'TYPE A',
    area: '21.6坪',
    rooms: '2房2廳1衛1陽台',
    features: ['主臥室', '次臥室', '現代衛浴', '景觀陽台'],
    image: '/images/room-a-living.jpg',
    roomImages: [
      { src: '/images/room-a-living.jpg', label: '客廳', labelEn: 'LIVING' },
      { src: '/images/room-a-bedroom.jpg', label: '臥室', labelEn: 'BEDROOM' },
      { src: '/images/room-a-kitchen.jpg', label: '廚房', labelEn: 'KITCHEN' },
      { src: '/images/room-a-bathroom.jpg', label: '衛浴', labelEn: 'BATHROOM' },
    ],
    details: {
      living: '開放式客餐廳，連結景觀陽台',
      master: '舒適主臥，配置大面採光',
      second: '多功能次臥，空間靈活',
      kitchen: '精品廚具，高效動線規劃',
    },
  },
  {
    id: 'B',
    name: 'B 房型',
    nameEn: 'TYPE B',
    area: '19.08坪',
    rooms: '1+1房2廳1衛1陽台',
    features: ['大面採光', '開放式廚房', '景觀陽台', '彈性空間'],
    image: '/images/room-b-living.jpg',
    roomImages: [
      { src: '/images/room-b-living.jpg', label: '客廳', labelEn: 'LIVING' },
      { src: '/images/room-b-bedroom.jpg', label: '臥室', labelEn: 'BEDROOM' },
      { src: '/images/room-b-kitchen.jpg', label: '廚房', labelEn: 'KITCHEN' },
      { src: '/images/room-b-bathroom.jpg', label: '衛浴', labelEn: 'BATHROOM' },
    ],
    details: {
      living: '客餐廳合一，極大化空間感',
      master: '靜謐主臥，享受純粹休息',
      flexible: '彈性+1空間，可作書房或客房',
      kitchen: '精密廚房，精巧機能美學',
    },
  },
];

export const FloorPlans = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePlan, setActivePlan] = useState(floorPlans[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const [titleInViewRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [contentInViewRef, contentInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="floorplans"
      className="relative min-h-screen w-full py-32 overflow-hidden bg-dark"
    >
      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/texture-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Title */}
        <div
          ref={titleInViewRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-gold text-sm tracking-[0.3em] mb-4 block">FLOOR PLANS</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary mb-4">
            房型格局
          </h2>
          <p className="text-text-secondary">3D渲染情境示意圖，實際以現況為準</p>
        </div>

        {/* Floor plan selector */}
        <div
          ref={contentInViewRef}
          className={`transition-all duration-1000 delay-300 ${
            contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Plan tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {floorPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  setActivePlan(plan);
                  setActiveImageIndex(0);
                }}
                className={`px-8 py-4 border transition-all duration-500 ${
                  plan.id === activePlan.id
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-gold/30 text-text-secondary hover:border-gold/50'
                }`}
              >
                <span className="text-xs tracking-[0.2em] block mb-1">{plan.nameEn}</span>
                <span className="font-serif text-xl">{plan.name}</span>
              </button>
            ))}
          </div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Image gallery */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="aspect-[4/3] relative overflow-hidden border border-gold/20">
                <img
                  src={activePlan.roomImages[activeImageIndex].src}
                  alt={activePlan.roomImages[activeImageIndex].label}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-dark/40 backdrop-blur-sm border border-white/20 px-2 py-1 rounded text-white/90 text-xs tracking-widest pointer-events-none shadow-sm z-10">
                  3D渲染示意圖
                </div>
                <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-sm px-4 py-2">
                  <span className="text-gold text-xs tracking-[0.15em]">{activePlan.roomImages[activeImageIndex].labelEn}</span>
                  <span className="text-text-primary font-serif ml-2">{activePlan.roomImages[activeImageIndex].label}</span>
                </div>
              </div>

              {/* Thumbnail grid */}
              <div className="grid grid-cols-4 gap-2">
                {activePlan.roomImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square relative overflow-hidden border-2 transition-all duration-300 ${
                      index === activeImageIndex
                        ? 'border-gold'
                        : 'border-transparent hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Plan details */}
            <div className="space-y-8">
              {/* Basic info */}
              <div className="p-8 border border-gold/30 bg-dark/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-gold/60 text-sm tracking-[0.2em] block mb-1">{activePlan.nameEn}</span>
                    <h3 className="font-serif text-3xl text-text-primary">{activePlan.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-gold text-2xl font-serif">{activePlan.area}</span>
                    <span className="text-text-secondary text-sm block">{activePlan.rooms}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {activePlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-text-secondary">
                      <Square className="w-4 h-4 text-gold/50" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Icons */}
                <div className="flex items-center gap-6 pt-6 border-t border-gold/20">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Bed className="w-5 h-5 text-gold/50" />
                    <span className="text-sm">{activePlan.id === 'A' ? '2 房' : '1+1 房'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Maximize className="w-5 h-5 text-gold/50" />
                    <span className="text-sm">{activePlan.area}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Bath className="w-5 h-5 text-gold/50" />
                    <span className="text-sm">1 衛</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Wind className="w-5 h-5 text-gold/50" />
                    <span className="text-sm">1 陽台</span>
                  </div>
                </div>
              </div>

              {/* Room details */}
              <div className="space-y-4">
                <h4 className="font-serif text-xl text-text-primary mb-4">空間規劃</h4>
                {Object.entries(activePlan.details).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-4 p-4 border-l-2 border-gold/30 bg-dark/30">
                    <div className="w-2 h-2 bg-gold/50 rounded-full mt-2" />
                    <div>
                      <span className="text-gold/60 text-xs tracking-[0.15em] uppercase block mb-1">
                        {key}
                      </span>
                      <span className="text-text-secondary text-sm">{value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block w-full py-4 text-center border border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300"
              >
                預約賞屋
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-24 h-px bg-gradient-to-r from-gold/30 to-transparent" />
      <div className="absolute bottom-1/4 right-0 w-24 h-px bg-gradient-to-l from-gold/30 to-transparent" />
    </section>
  );
};
