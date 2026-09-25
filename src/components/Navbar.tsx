import React, { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { ActiveTab } from '../types';
import { PATHS } from '../routes';
import { IMG } from '../data/academyData';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenDownloadApp: () => void;
}

// same targets as the main site's index.html navbar
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.gardaai.academy';
const TABS: [ActiveTab, string][] = [['home', 'Home'], ['about', 'About'], ['learn', 'Learn'], ['ai-updates', 'AI Updates']];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [open, setOpen] = useState(false);
  const go = (e: React.MouseEvent, t: ActiveTab) => { e.preventDefault(); onTabChange(t); setOpen(false); };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#e6e0d4]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <a href="/" onClick={(e) => go(e, 'home')} className="flex items-center gap-2 cursor-pointer group shrink-0">
          <img src={IMG.logo} alt="GardaAI Academy" className="w-10 h-10 rounded-lg object-contain group-hover:scale-105 transition-transform" />
          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#1c1917]">
            Garda<span className="text-[#0d828a]">AI</span> Academy
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1 bg-[#f0ecdf] p-1.5 rounded-full border border-[#ded8c9]">
          {TABS.map(([t, label]) => (
            <a key={t} href={PATHS[t]} onClick={(e) => go(e, t)} className={`px-5 py-1.5 text-sm font-semibold rounded-full cursor-pointer transition-all ${activeTab === t ? 'bg-white text-[#1c1917] shadow-sm' : 'text-[#645e52] hover:text-[#1c1917]'}`}>{label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 bg-[#f95716] hover:bg-[#ea4805] text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-sm">
            <Download className="w-4 h-4" /> Download GardaAI App
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg cursor-pointer" aria-label="Menu" aria-expanded={open}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#e6e0d4] bg-[#fbf9f4] px-4 py-3 flex flex-col gap-1">
          {TABS.map(([t, label]) => (
            <a key={t} href={PATHS[t]} onClick={(e) => go(e, t)} className={`text-left px-3 py-2.5 rounded-lg font-semibold cursor-pointer ${activeTab === t ? 'bg-[#0d828a]/10 text-[#0d828a]' : ''}`}>{label}</a>
          ))}
          <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center justify-center gap-2 bg-[#f95716] text-white px-4 py-3 rounded-xl font-semibold"><Download className="w-4 h-4" /> Download GardaAI App</a>
        </div>
      )}
    </header>
  );
};
