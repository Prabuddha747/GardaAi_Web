import type { ActiveTab } from './types';

export const SITE = 'https://gardaai.in';
export const PATHS: Record<ActiveTab, string> = { home: '/', about: '/about', learn: '/learn', impact: '/impact' };

export const SEO: Record<ActiveTab, { title: string; description: string }> = {
  home: {
    title: 'GardaAI Academy — Learn AI in Hinglish | AI Courses & Workshops in Bihar',
    description: 'GardaAI Academy teaches practical AI in simple Hinglish — free videos, live courses and school workshops across Bihar. 5,000+ learners, 35+ partner schools.',
  },
  about: {
    title: 'About GardaAI Academy — AI Education in Simple Hinglish, Bihar',
    description: "Problem talent ki nahi thi, language ki thi. Read the story of GardaAI Academy, our team and why we're bringing AI to every classroom in Bihar.",
  },
  learn: {
    title: 'Free AI Videos in Hinglish — Learn AI Tools Step by Step | GardaAI',
    description: 'Short Hinglish videos on prompt engineering, AI productivity and real AI tools. Watch, try and build something after every video — free.',
  },
  impact: {
    title: 'Our Impact — 5,000+ Learners Across Bihar | GardaAI Academy',
    description: 'From classrooms to local shops: real stories of students, teachers and shop owners in Patna, Gaya, Muzaffarpur, Bhagalpur and Purnia learning AI with GardaAI.',
  },
};

export const tabFromPath = (p: string): ActiveTab =>
  (Object.keys(PATHS) as ActiveTab[]).find((t) => t !== 'home' && p.replace(/\/+$/, '') === PATHS[t]) ?? 'home';

/** Client-side head update on navigation (the static HTML already has the right tags per route). */
export const applySeo = (tab: ActiveTab) => {
  const { title, description } = SEO[tab];
  const url = SITE + PATHS[tab];
  document.title = title;
  const set = (sel: string, attr: string, v: string) => document.head.querySelector(sel)?.setAttribute(attr, v);
  set('meta[name="description"]', 'content', description);
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:url"]', 'content', url);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
};
