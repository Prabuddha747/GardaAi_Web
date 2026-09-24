import React from 'react';
import { X, BookOpen, Heart } from 'lucide-react';
import { ASSETS } from '../data/academyData';

interface ReadStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReadStoryModal: React.FC<ReadStoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#fdfbf7] text-[#1c1917] rounded-2xl overflow-hidden shadow-2xl border border-[#ded8c9] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f4efe4] border-b border-[#ded8c9] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#ea580c]">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs uppercase font-bold tracking-wider">
              The GardaAI Story • By Punit Gupta
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-stone-800 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-2">
              Problem talent ki nahi thi. <br />
              <span className="text-[#ea580c]">Language ki thi.</span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span>By Punit Gupta, Founder</span>
              <span>•</span>
              <span>Classroom Field Notes, Bihar</span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden aspect-video border border-stone-200">
            <img
              src={ASSETS.heroClassroom}
              alt="GardaAI Classroom"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-2 py-0.5 rounded font-handwritten">
              Same People. Bigger Possibilities.
            </div>
          </div>

          <p className="font-editorial text-lg text-stone-700 italic border-l-2 border-[#ea580c] pl-4 my-4">
            "Bihar ke ek chhote se gaon se nikli ek simple baat: AI tabhi sabka hoga, jab samajh sabki language mein aayegi."
          </p>

          <p>
            Jab ChatGPT aur generative AI duniya bhar mein viral hue, toh YouTube
            aur Twitter par 99% tutorials fluent, fast-paced English mein the.
            Silicon Valley terms jaise <em>"embeddings"</em>, <em>"zero-shot prompting"</em>, aur <em>"fine-tuning"</em> dekh kar
            hamaare Bihar ke Hindi-medium aur regional language ke students ko lagta tha
            ki AI unke liye nahi hai.
          </p>

          <p>
            Par jab humne Gaya aur Patna ke chote classrooms mein jaakar ek blackboard par
            aur purane laptops par simple Hinglish mein samjhana shuru kiya—
            <em>"AI ek smart dost hai, jisse saaf bhasha mein baat karni hai"</em>—toh
            unhi baccho ne 1 ghante mein apna homework helper aur small business posters
            banakar dikha diya!
          </p>

          <div className="p-4 bg-[#f5efe2] rounded-xl border border-[#ded8c9] space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#ea580c]">
              GardaAI ke 3 Core Assool
            </h4>
            <ul className="text-xs space-y-1.5 text-stone-700 list-disc list-inside">
              <li><strong>Zero Jargon:</strong> Har technical baat ko real desi misaal ke saath samjhana.</li>
              <li><strong>Action over Theory:</strong> Har session ke baad ek cheez khud apne phone ya computer pe banana.</li>
              <li><strong>Har Shehar Tak:</strong> Sirf metros nahi, Muzaffarpur se Purnia tak har curious dimaag tak pahunchna.</li>
            </ul>
          </div>

          <p>
            Aaj GardaAI 5,000 se zyada students, 100+ workshops aur 35+ partner
            schools ke saath Bihar mein nayi umeed ban raha hai.
          </p>

          <div className="pt-4 border-t border-[#ded8c9] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>Bihar se, poore desh ke liye.</span>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#1c1917] text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Close Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
