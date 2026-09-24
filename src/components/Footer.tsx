import React from 'react';
import { Instagram, Youtube, MessageCircle, Linkedin } from 'lucide-react';
import { ActiveTab } from '../types';
import { PATHS } from '../routes';
import { IMG } from '../data/academyData';

interface FooterProps {
  onNavigate: (tab: ActiveTab, anchor?: string) => void;
}

const WA = 'https://wa.me/917632821374?text=Hello%20GardaAI%20Academy!%20I%20am%20interested%20in%20your%20courses%20and%20workshops.';
const SOCIAL = [
  ['Instagram', 'https://www.instagram.com/gardaaiacademy', Instagram, 'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]'],
  ['YouTube', 'https://www.youtube.com/@punit.gupta_ai', Youtube, 'bg-[#e02d2d]'],
  ['WhatsApp', WA, MessageCircle, 'bg-[#25D366]'],
  ['LinkedIn', 'https://www.linkedin.com/in/punit-gupta-b58583232/', Linkedin, 'bg-[#0077B5]'],
] as const;

// same footer on every page
export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const link = 'text-white/70 hover:text-white transition-colors cursor-pointer text-left';
  return (
    <footer className="relative z-[5] text-white pt-20 pb-6" style={{ background: 'linear-gradient(155deg,#0B1F24 0%,#0F2428 60%,#0A4F53 100%)' }}>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={IMG.logo} alt="" className="w-11 h-11 rounded-lg object-contain" />
              <span className="text-xl font-extrabold">Garda<span className="text-[#2dd4e0]">AI</span> Academy</span>
            </div>
            <p className="mt-5 text-white/60 leading-relaxed max-w-sm">
              Bihar's leading AI education academy — making Artificial Intelligence practical, accessible, and genuinely useful for every student and educator across Bihar.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map(([label, href, I, bg]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label} className={`w-10 h-10 rounded-lg grid place-items-center ${bg} hover:-translate-y-0.5 transition`}>
                  <I className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mono-label text-xs font-bold text-white/50 mb-4">Quick Links</div>
            <ul className="flex flex-col gap-2.5">
              <li><a className={link} href={PATHS.home} onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
              <li><a className={link} href={PATHS.about} onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</a></li>
              <li><a className={link} href={PATHS.learn} onClick={(e) => { e.preventDefault(); onNavigate('learn'); }}>Learn</a></li>
              <li><a className={link} href={PATHS.impact} onClick={(e) => { e.preventDefault(); onNavigate('impact'); }}>Impact</a></li>
              <li><a className={link} href="/#faq" onClick={(e) => { e.preventDefault(); onNavigate('home', 'faq'); }}>FAQ</a></li>
              <li><a className={link} href="/#contact" onClick={(e) => { e.preventDefault(); onNavigate('home', 'contact'); }}>Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="mono-label text-xs font-bold text-white/50 mb-4">Contact</div>
            <ul className="flex flex-col gap-2.5">
              <li><a className={link} href="mailto:academy@gardaai.in">academy@gardaai.in</a></li>
              <li><a className={link} href="tel:+917632821374">+91 76328 21374</a></li>
              <li><a className={link} href={WA} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
              <li><a className={link} href="https://maps.google.com/?q=Bihar,India" target="_blank" rel="noopener noreferrer">Bihar, India</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-5 border-t border-white/10 flex flex-wrap justify-between gap-2 text-sm text-white/45">
          <span>© 2026 <span className="text-[#2dd4e0]">GardaAI Academy</span> — All Rights Reserved</span>
          <span>AI Seekho, AI Seekhao</span>
        </div>
      </div>
    </footer>
  );
};
