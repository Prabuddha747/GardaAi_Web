import React, { useMemo, useState } from 'react';
import { BarChart3, ChevronRight, Clapperboard, Lightbulb, MessageCircle, Package, Play, Search, Share2, Sparkles, Wrench, Zap, ArrowRight, Youtube, Pencil, Download } from 'lucide-react';
import { ASSETS, IMG, VIDEOS } from '../data/academyData';
import { VideoItem } from '../types';
import { Arrow, Note, Typed, Squiggle, Wrap } from './ui';

const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.gardaai.academy';

interface LearnViewProps {
  onOpenVideo: (video: VideoItem) => void;
  onOpenDownloadApp: () => void;
}

const TEAL = '#0a4653';
const G = 'rgba(140,220,235,.11)';
const DARK = `linear-gradient(${G} 1px,transparent 1px) 0 0/36px 36px, linear-gradient(90deg,${G} 1px,transparent 1px) 0 0/36px 36px, linear-gradient(180deg,#083744,#062c37)`;

const SKILLS = [
  ['Start Here', 'start', Play],
  ['Prompting', 'prompting', MessageCircle],
  ['AI Tools', 'tools', Wrench],
  ['Content Creation', 'content', Clapperboard],
  ['Productivity', 'productivity', BarChart3],
] as const;

const GOALS = [
  ['Better Prompts', 'Behtar sawal. Behtar results.', 0],
  ['Images & Videos', 'Text se amazing images aur videos banao.', 1],
  ['Study & Research', 'Jaldi samjho. Behtar likho. Gehra seekho.', 2],
  ['Work Faster', 'Roz ke kaam AI ke saath simple banao.', 4],
] as const;

const LOOP = [
  ['Watch', 'Dekho aur samjho', Play],
  ['Try', 'Khud se use karke dekho', Pencil],
  ['Build', 'Apni cheez banao', Package],
  ['Share', 'Dikhao, feedback lo, aur grow karo', Share2],
] as const;

// crops of the shared instructor frame so the six thumbnails differ

/** Thumbnail that turns into the real YouTube player in place. */
const YtPlayer: React.FC<{ video: VideoItem; autoplay?: boolean; big?: boolean }> = ({ video, autoplay, big }) => {
  const [on, setOn] = useState(false);
  if (on || autoplay)
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  return (
    <button onClick={() => setOn(true)} className="group absolute inset-0 w-full h-full cursor-pointer" aria-label={`Play ${video.title}`}>
      <img src={video.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      <span className="absolute inset-0 bg-black/20" />
      <span className="absolute inset-0 grid place-items-center">
        <span className={`${big ? 'w-16 h-16' : 'w-11 h-11'} rounded-full bg-white/90 grid place-items-center group-hover:scale-110 transition`}><Play className={`${big ? 'w-6 h-6' : 'w-4 h-4'} fill-[#083744] text-[#083744]`} /></span>
      </span>
    </button>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div className={`mono-label text-[11px] font-bold flex items-center gap-2 ${light ? 'text-[#FF8a3a]' : 'text-[#ea580c]'}`}>
    <span className="w-2 h-2 rounded-full bg-[#FF6500]" /> {children}
  </div>
);

export const LearnView: React.FC<LearnViewProps> = ({ onOpenVideo, onOpenDownloadApp }) => {
  const [q, setQ] = useState('');
  const [newest, setNewest] = useState(true);
  const [feat, setFeat] = useState(VIDEOS[0]);
  const list = useMemo(() => {
    const f = VIDEOS.filter((v) => v.title.toLowerCase().includes(q.toLowerCase()));
    return newest ? f : [...f].reverse();
  }, [q, newest]);
  const first = (cat: string) => VIDEOS.find((v) => v.category === cat) ?? VIDEOS[0];

  return (
    <div className="overflow-x-clip bg-[#f4f8fa]">
      {/* HERO */}
      <section className="text-white py-10" style={{ background: DARK }}>
        <Wrap className="grid lg:grid-cols-[0.95fr_1.7fr_0.85fr] gap-6 items-start">
          <div className="pt-4">
            <Eyebrow light>Free Hinglish Videos</Eyebrow>
            <h1 className="hl-sans text-[clamp(34px,3.5vw,50px)] mt-4"><Typed lines={[{ t: 'Dekho kam.' }, { t: 'Banaao zyada.', c: 'text-[#FF8a1a]' }]} /></h1>
            <p className="mt-4 text-white/85 max-w-xs leading-snug">Short Hinglish videos. Real AI tools. Har video ke baad ek cheez khud bana sako.</p>
            <div className="mt-5 flex gap-5 text-[11px] text-white/80">
              {[[Zap, 'Practical Skills'], [Lightbulb, 'Real AI Tools'], [BarChart3, 'Apply Immediately']].map(([I, t]: any) => (
                <div key={t} className="flex items-center gap-1.5 max-w-[80px] leading-tight"><span className="w-8 h-8 shrink-0 rounded-full border border-white/40 grid place-items-center"><I className="w-4 h-4" /></span>{t}</div>
              ))}
            </div>
            <Note className="mt-6 text-xl" rot={-8} color="#e8eef0">Same Curiosity.<br />Bigger Possibilities.</Note>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black">
            <YtPlayer key={feat.id} video={feat} big />
            <span className="absolute left-3 top-3 bg-[#FF6500] text-[10px] font-bold px-2 py-1 rounded mono-label pointer-events-none">Featured • Start Here</span>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/5 p-3 relative">
            <div className="text-sm font-semibold px-1 pb-2">Choose your next skill</div>
            {SKILLS.map(([label, cat, I], i) => (
              <button key={cat} onClick={() => setFeat(first(cat))} className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 mb-1.5 text-left cursor-pointer transition ${i === 0 ? 'bg-white text-[#083744]' : 'hover:bg-white/10'}`}>
                <span className={`w-8 h-8 rounded-full grid place-items-center shrink-0 ${i === 0 ? 'bg-[#0d828a] text-white' : 'border border-white/30'}`}><I className="w-4 h-4" /></span>
                <span className="flex-1 leading-tight"><b className="block text-[13px]">{label}</b><span className="text-[10px] opacity-70">Video series</span></span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            ))}
            <Note className="absolute -right-5 bottom-2 text-sm hidden xl:block" rot={-10} color="#fff" line={false}>Learn<br />Build<br />Create<br />Repeat</Note>
          </div>
        </Wrap>
      </section>

      {/* ALL VIDEOS */}
      <section className="py-10">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="hl-sans text-4xl">All Videos — <span className="text-[#0d828a]">Play Here</span></h2>
              <div className="mt-1.5 text-sm text-stone-600 flex items-center gap-2"><Youtube className="w-6 h-6 text-red-600 fill-red-600 stroke-white" /> <b className="text-stone-900">YouTube</b></div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <label className="flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-3 py-2 w-56"><Search className="w-4 h-4 text-stone-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search videos" className="outline-none w-full bg-transparent" /></label>
              <select value={newest ? 'n' : 'o'} onChange={(e) => setNewest(e.target.value === 'n')} className="bg-white border border-stone-300 rounded-lg px-3 py-2"><option value="n">Newest</option><option value="o">Oldest</option></select>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6">
            {list.map((v) => (
              <div key={v.id}>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-800"><YtPlayer video={v} /></div>
                <div className="mt-2 font-bold text-[15px] leading-snug">{v.title}</div>
                <span className="mt-1.5 inline-block bg-[#dff1f3] text-[#0d828a] text-[11px] font-semibold px-2 py-0.5 rounded">▮ {v.language}</span>
              </div>
            ))}
            {!list.length && <p className="text-stone-500">Koi video nahi mila.</p>}
          </div>
        </Wrap>
      </section>

      {/* CHOOSE BY GOAL */}
      <section className="text-white py-12" style={{ background: DARK }}>
        <Wrap>
          <div className="flex justify-between items-start">
            <div>
              <Eyebrow light>Choose by goal</Eyebrow>
              <h2 className="hl-sans text-[clamp(36px,4vw,54px)] mt-3">Aaj kya<br /><span className="text-[#FF8a1a]">banana hai?</span></h2>
            </div>
            <Note className="text-2xl hidden md:block" rot={-6} color="#fff">Pick one.<br />Build one.</Note>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GOALS.map(([t, d, vi]) => (
              <button key={t} onClick={() => onOpenVideo(VIDEOS[vi % VIDEOS.length])} className="flex gap-3 text-left rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 p-2.5 cursor-pointer transition">
                <img src={VIDEOS[vi % VIDEOS.length].thumbnail} alt="" className="w-[38%] h-[120px] rounded-lg object-cover" />
                <span className="flex-1 flex flex-col">
                  <b className="text-[15px]">{t}</b>
                  <span className="text-xs text-white/75 mt-1.5 leading-snug">{d}</span>
                  <span className="mt-auto flex items-center gap-2 text-[11px] text-white/80"><Play className="w-4 h-4" /> Videos <ChevronRight className="w-4 h-4 ml-auto" /></span>
                </span>
              </button>
            ))}
          </div>
        </Wrap>
      </section>

      {/* LEARNING LOOP */}
      <section className="py-10 bg-white/60">
        <Wrap className="grid lg:grid-cols-[1fr_1.6fr_0.8fr] gap-8 items-center">
          <div>
            <Eyebrow>Learning loop</Eyebrow>
            <h2 className="hl-sans text-[clamp(30px,3vw,42px)] mt-3">Sirf dekho mat.<br /><span className="text-[#0d828a]">Karke dekho.</span></h2>
            <p className="mt-4 text-sm text-stone-700">Har video ka goal ek practical output hai.</p>
          </div>
          <div className="flex items-start justify-between gap-2">
            {LOOP.map(([t, d, I], i) => (
              <React.Fragment key={t}>
                <div className="text-center w-[120px]">
                  <span className="mx-auto w-14 h-14 rounded-full bg-[#cfeaee] grid place-items-center text-[#0d828a]"><I className="w-6 h-6" /></span>
                  <b className="block mt-2 text-sm"><span className="text-[#0d828a] font-mono mr-1">0{i + 1}</span>{t}</b>
                  <span className="text-[11px] text-stone-600 leading-tight block">{d}</span>
                </div>
                {i < 3 && <Arrow className="mt-4 shrink-0" color="#0d828a" />}
              </React.Fragment>
            ))}
          </div>
          <div className="relative rounded-xl overflow-hidden h-[200px] shadow-lg">
            <img src={ASSETS.studentLaptop} alt="" className="w-full h-full object-cover" />
          </div>
        </Wrap>
      </section>

      {/* KEEP LEARNING */}
      <section className="text-white py-12" style={{ background: DARK }}>
        <Wrap className="grid lg:grid-cols-[1.2fr_0.6fr_0.8fr] gap-8 items-center">
          <div>
            <Eyebrow light>Keep learning</Eyebrow>
            <h2 className="hl-sans text-[clamp(34px,3.8vw,52px)] mt-3">Agla skill,<br /><span className="text-[#FF8a1a]">ek play button door.</span></h2>
            <p className="mt-4 text-white/85">Free videos. Simple Hinglish. Real application.</p>
            <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#FF6500] hover:bg-[#e85a00] px-6 py-3 rounded-lg font-semibold"><Download className="w-4 h-4" /> Download GardaAI App</a>
          </div>
          <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="mx-auto w-[200px] sm:w-[210px] rounded-[30px] border-[6px] border-[#1a1f24] overflow-hidden shadow-2xl -rotate-3 block" aria-label="Download GardaAI app on Google Play">
            <img src={IMG.phone} alt="GardaAI app" loading="lazy" className="w-full block" />
          </a>
          <div className="text-center"><Note className="text-3xl" rot={-6} color="#fff">GardaAI App</Note><div className="mt-3 text-white/85 text-sm">Videos • Prompts • AI News</div></div>
        </Wrap>
      </section>
    </div>
  );
};
