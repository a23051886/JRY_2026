import { useInView } from '@/hooks/useInView';

const galleryImages = [
  { src: '/images/gallery-1.webp', caption: '空中花園示意', desc: '在頂樓空中花園，享受城市綠意與休閒時光' },
  { src: '/images/gallery-2.webp', caption: '內部梯廳示意', desc: '現代簡約線條，勾勒大安之星優雅身影' },
  { src: '/images/nearby-1.jpg', caption: '永康街生活圈', desc: '漫步永康商圈，享受人文與美食的饗宴' },
  { src: '/images/nearby-2.webp', caption: '大安森林公園', desc: '城市綠肺供氧大安，享受純淨自然氣息' },
  { src: '/images/nearby-3.webp', caption: '東門市場', desc: '高貴不貴，盡顯大安人的從容與品味' },
  { src: '/images/nearby-4.webp', caption: '光華商場', desc: '三創生活園區，滿足科技與潮流的想像' },
  { src: '/images/transit-2.jpg', caption: '交通機能', desc: '捷運紅線信義安和站' },
  { src: '/images/transit-3.jpg', caption: '交通機能', desc: '捷運藍線國父紀念館站' },
  { src: '/images/env-1.jpg', caption: '周遭環境照', desc: '靜謐與繁華交織，大安區理想居所' },
  { src: '/images/env-2.jpg', caption: '街道景觀', desc: '離塵不離城，沉浸在優雅的城市氛圍' },
  { src: '/images/env-3.jpg', caption: '生活美學', desc: '每一隅街景，都是生活的靈感來源' },
  { src: '/images/env-4.jpg', caption: '優選地段', desc: '仁愛與大安，身價與地段的永恆象徵' },
  { src: '/images/env-5.jpg', caption: '鄰近機能', desc: '頂級醫療與教育中心環繞，全方位生活守護' },
  { src: '/images/env-6.jpg', caption: '城市風華', desc: '擁抱大安瑰寶，開啟世代傳承的品格生活' },
];

export const VisualTour = () => {
  const [titleInViewRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [gridInViewRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="visual-tour" className="relative py-32 bg-dark overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Title Section */}
        <div
          ref={titleInViewRef}
          className={`mb-16 transition-all duration-1000 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="text-gold text-xs tracking-[0.5em] mb-4 py-1 px-3 border border-gold/30 bg-gold/5 backdrop-blur-sm inline-block">
            VISUAL TOUR
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary mb-4 leading-tight">
            出門不該是件麻煩事
          </h2>
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-gold/50" />
            <p className="text-gold font-serif text-xl tracking-[0.2em]">視覺展示與地圖街景</p>
          </div>
        </div>

        {/* Video & Maps Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20 animate-fade-in">
          {/* Youtube Video Section */}
          <div className="group relative">
            <div className="p-4 border border-gold/30 bg-dark/90 backdrop-blur-md h-full transition-all duration-500 hover:border-gold/60">
              <h3 className="font-serif text-xl text-gold mb-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full" />
                影音導覽 Video
                <span className="w-2 h-2 bg-gold rounded-full" />
              </h3>
              <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl">
                <iframe
                  className="absolute inset-0 w-full h-full border-0"
                  src="https://www.youtube.com/embed/uW429e9TZJI?si=rrXnnOulhYn9sgeE&autoplay=1&mute=1"
                  title="仁愛玉璽影音導覽"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute bottom-4 left-4 bg-dark/70 backdrop-blur-sm px-3 py-1 text-[10px] text-text-secondary border border-gold/20 pointer-events-none">
                  情境示意影片，實際以現況為準
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="flex flex-col gap-8">
            <div className="p-4 border border-gold/30 bg-dark/90 backdrop-blur-md transition-all duration-500 hover:border-gold/60">
              <h3 className="font-serif text-xl text-gold mb-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full" />
                基地座落 Location
                <span className="w-2 h-2 bg-gold rounded-full" />
              </h3>
              <div className="aspect-video rounded-sm overflow-hidden border border-gold/10">
                <iframe
                  className="w-full h-full border-0"
                  src="https://maps.google.com/maps?q=25.036748,121.555407&z=16&output=embed"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Street View Section */}
        <div className="mb-20">
          <div className="p-4 border border-gold/30 bg-dark/90 backdrop-blur-md transition-all duration-500 hover:border-gold/60 w-full">
            <h3 className="font-serif text-xl text-gold mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              街景觀測 Street View
              <span className="w-2 h-2 bg-gold rounded-full" />
            </h3>
            <div className="aspect-video lg:aspect-[21/9] min-h-[300px] rounded-sm overflow-hidden border border-gold/10 w-full relative">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!4v1744972061679!6m8!1m7!1sgijUm15Ske90qeA5dFZXZg!2m2!1d25.03677396492414!2d121.5555820032919!3f319.9271985899656!4f7.61598340194422!5f0.7820865974627469"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div
          ref={gridInViewRef}
          className={`transition-all duration-1000 delay-300 ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl text-text-primary mb-2">精選影像清單</h3>
            <p className="text-text-secondary">視覺與地段的完美呈現</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="break-inside-avoid group relative border border-gold/20 overflow-hidden bg-dark/50 aspect-video md:aspect-auto">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-gold font-serif text-xl mb-1">{img.caption}</h4>
                    <p className="text-text-secondary text-xs">{img.desc}</p>
                  </div>
                </div>
                {/* Always visible watermark for compliance */}
                <div className="absolute top-3 right-3 bg-dark/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/50 tracking-widest pointer-events-none">
                  情境示意圖供參考
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
