import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Search } from 'lucide-react';
import { C, Note, Sheet, Wrap } from './ui';

interface NewsItem { id: string; title: string; source: string; date: string; image: string | null; summary: string; url: string; cat: string }
interface Feed { items: NewsItem[]; updated: string }

const CATS = ['All', 'Models', 'Tools', 'Education', 'India', 'Safety', 'Business'];
const REFRESH_MS = 30 * 60 * 1000; // matches the server's edge cache, so polling costs no extra API calls
const CACHE = 'gardaai-ai-news';

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const fmtTime = (d: string) => new Date(d).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }).toUpperCase() + ' IST';

const readCache = (): Feed | null => { try { return JSON.parse(localStorage.getItem(CACHE) || 'null'); } catch { return null; } };

const Card: React.FC<{ n: NewsItem }> = ({ n }) => (
    <article className="group relative flex flex-col bg-white border-2 border-[#0d828a]/60 rounded-sm overflow-hidden shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#0d828a] hover:shadow-lg focus-within:border-[#0d828a]">
      <div className="relative h-[130px] overflow-hidden bg-gradient-to-br from-[#06323C] to-[#087F8C] grid place-items-center text-white/30 text-5xl font-black">
        {n.image ? (
          <img src={n.image} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.style.display = 'none')} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : n.source[0]}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="text-[11px] text-[#645e52]"><b className="text-[#1c1917]">{n.source}</b> • {fmtDate(n.date)}</div>
        <div className="mono-label text-[10px] font-bold text-[#087F8C] mt-1.5">{n.cat}</div>
        <h3 className="font-serif font-bold text-[19px] leading-tight mt-1 text-[#101820]">{n.title}</h3>
        <p className="text-[13px] leading-snug text-[#4b463c] mt-2 line-clamp-4">{n.summary}</p>
        <div className="mt-auto pt-3 flex justify-end text-[13px] font-semibold text-[#087F8C]">
          <a href={n.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 group-hover:underline after:absolute after:inset-0" aria-label={`Read original: ${n.title}`}>Read original <ArrowUpRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </article>
);

export const AIUpdatesView: React.FC = () => {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'stale' | 'error'>('loading');
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'new' | 'old'>('new');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const r = await fetch('/api/news');
      if (!r.ok) throw new Error(String(r.status));
      const d: Feed = await r.json();
      setFeed(d); setState('ok');
      try { localStorage.setItem(CACHE, JSON.stringify(d)); } catch { /* private mode */ }
    } catch {
      const c = readCache(); // "API fail hone par last successful feed dikhegi"
      if (c) { setFeed(c); setState('stale'); } else setState('error');
    }
  }, []);

  useEffect(() => { const c = readCache(); if (c) setFeed(c); load(); }, [load]);
  useEffect(() => { const t = setInterval(load, REFRESH_MS); return () => clearInterval(t); }, [load]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (feed?.items ?? [])
      .filter((n) => (cat === 'All' || n.cat === cat) && (!s || `${n.title} ${n.source} ${n.summary}`.toLowerCase().includes(s)))
      .sort((a, b) => (sort === 'new' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [feed, cat, q, sort]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="overflow-x-clip bg-[#fbf9f4]">
      <Sheet bg="#0a3742" z={60} tear={2} grain={false} className="pt-14 pb-14 text-white">
        <Wrap>
          <span className="mono-label inline-block text-[11px] font-bold border-[1.5px] border-[#2dd4e0] text-[#2dd4e0] px-3 py-1">Daily AI News • Simple Hinglish</span>
          <h1 className="hl-impact text-[clamp(34px,6vw,84px)] mt-5 font-serif !font-black !tracking-tight">Roz AI badalta hai.<br />Aapko sirf kaam ki baat chahiye.</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl text-white/90">Latest AI news, short Hinglish summaries aur original source — ek clean feed mein.</p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button onClick={() => go('feed')} className="inline-flex items-center gap-2 bg-[#f95716] hover:bg-[#ea4805] text-white font-bold px-6 py-3 rounded-md cursor-pointer">Aaj ki News Dekho <ArrowDown className="w-4 h-4" /></button>
            <button onClick={() => go('how')} className="font-semibold text-[#2dd4e0] hover:underline cursor-pointer">How it works →</button>
          </div>
          <div className="mt-6 text-sm text-white/70 flex flex-wrap gap-x-4">
            <span>Original sources</span><span>•</span><span>Short summaries</span><span>•</span><span>Direct links</span>
          </div>
          {feed && <div className="mt-1 text-sm text-white/70">Last refreshed {fmtTime(feed.updated)}</div>}
          <div className="hidden lg:block absolute right-10 top-16"><Note className="text-3xl" rot={-6} color="#fbf7ec">10 minute.<br />Clear picture.</Note></div>
        </Wrap>
      </Sheet>

      <Sheet bg={C.paper} z={50} className="-mt-8 pt-14 pb-16">
        <Wrap>
          <div id="feed" className="scroll-mt-20" />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mono-label inline-block text-[11px] font-bold border border-[#087F8C] text-[#087F8C] px-2.5 py-0.5">Live feed</span>
              <h2 className="font-serif font-black text-4xl sm:text-5xl mt-2 text-[#101820]">Latest AI updates</h2>
              <p className="text-[#4b463c]">Newest verified stories first.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <label className="flex items-center gap-2 flex-1 min-w-[240px] max-w-[360px] border border-[#087F8C]/50 bg-white rounded-sm px-3 py-2">
              <Search className="w-4 h-4 text-[#087F8C]" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search headlines or sources..." aria-label="Search news" className="flex-1 outline-none text-sm bg-transparent" />
            </label>
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 text-sm rounded-sm border cursor-pointer ${cat === c ? 'bg-[#0a3742] text-white border-[#0a3742]' : 'bg-white text-[#087F8C] border-[#087F8C]/50 hover:bg-[#087F8C]/10'}`}>{c}</button>
            ))}
            <select value={sort} onChange={(e) => setSort(e.target.value as 'new' | 'old')} aria-label="Sort" className="ml-auto border border-[#087F8C]/50 bg-white text-[#087F8C] rounded-sm px-3 py-2 text-sm cursor-pointer">
              <option value="new">Newest first</option><option value="old">Oldest first</option>
            </select>
          </div>

          {state === 'stale' && <p className="mt-4 text-sm text-[#b45309]">Loaded New list </p>}

          {state === 'error' && !feed ? (
            <p className="mt-10 text-center text-[#4b463c]">News abhi load nahi ho payi. Thodi der baad page dobara kholein.</p>
          ) : !feed ? (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, i) => <div key={i} className="h-[330px] bg-[#ece6d7] animate-pulse rounded-sm" />)}
            </div>
          ) : list.length ? (
            <>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{list.map((n) => <Card key={n.id} n={n} />)}</div>
              <div className="mt-8 text-center">
                <div className="text-xs text-[#645e52]">Har story original publisher website par khulti hai.</div>
              </div>
            </>
          ) : (
            <p className="mt-10 text-center text-[#4b463c]">Is filter mein koi story nahi mili.</p>
          )}
        </Wrap>
      </Sheet>

      <section id="how" className="bg-[#e3f4f6] py-6 text-sm text-[#06323C]">
        {/* <Wrap className="flex flex-wrap justify-between gap-2">
          <span><b>Headline:</b> publisher se  •<b>Click:</b> original source</span>
        
        </Wrap> */}
      </section>
    </div>
  );
};
