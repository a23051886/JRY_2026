import { Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-16 bg-dark border-t border-gold/10">
      <div className="w-full px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-gold/50 flex items-center justify-center">
                <span className="text-gold font-serif text-xl">璽</span>
              </div>
              <div>
                <span className="text-gold font-serif text-xl tracking-wider">仁愛玉璽</span>
                <span className="text-text-secondary text-xs block">ZHUO PU CONSTRUCTION</span>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              琢樸建設以匠心獨運的建築美學，
              為城市締造永恆的居住經典。
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-text-primary mb-6">快速連結</h4>
            <ul className="space-y-3">
              {[
                { label: '區域介紹', href: '#location' },
                { label: '本案重點', href: '#features' },
                { label: '周遭環境', href: '#surroundings' },
                { label: '房型格局', href: '#floorplans' },
                { label: '預約賞屋', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-text-secondary hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-text-primary mb-6">聯絡我們</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-text-secondary text-sm">
                <Phone className="w-4 h-4 text-gold/50" />
                <div className="flex flex-col gap-1">
                  <span>(02) 2236-1566</span>
                  <span>0982-311-237</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-text-secondary text-sm">
                <MapPin className="w-4 h-4 text-gold/50 mt-0.5" />
                <span>台北市文山區木柵路一段 83 號一樓</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary/50 text-xs">
            © 2024 琢樸建設有限公司. All rights reserved. 113建字第0069號
          </p>

          <button
            onClick={scrollToTop}
            className="text-gold/50 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-2"
          >
            <span>回到頂部</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-gold/10" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-gold/10" />
    </footer>
  );
};
