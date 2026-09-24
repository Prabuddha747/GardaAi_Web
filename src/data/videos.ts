import type { VideoItem } from '../types';

/**
 * Every video on the site is a numbered slot: <PAGE>_<N>  (HOME_1, ABOUT_1, IMPACT_1, LEARN_1..6).
 * Override any slot in .env / Vercel env vars with VITE_VIDEO_<SLOT>=<YouTube link | YouTube id | any embed URL>.
 * Learn slots also take VITE_VIDEO_LEARN_<N>_TITLE. Empty LEARN slots are simply not shown.
 */
const BUNNY = (id: string) => `https://iframe.mediadelivery.net/embed/699907/${id}?autoplay=false`;

const DEFAULTS: Record<string, string> = {
  HOME_1: BUNNY('cb2c9774-3256-4823-a0d7-3d9c158817cf') + '&preload=true', // hero "Why You Choose GardaAI?" popup
  HOME_2: BUNNY('1ed64545-e6e9-42e7-9218-3ef8b7aff0e8'), // video stories: Rohit Sharma
  HOME_3: BUNNY('e4cc0f55-c04d-4ec1-bf9e-ccb162047ee1'), // video stories: Vishnu Kumar
  HOME_4: BUNNY('96d2c7b0-4093-4dc5-a155-ce8ca60c7b99'), // video stories: Nayana Uchil
  ABOUT_1: BUNNY('816d1916-0587-458e-9b24-2f133344900d'), // about hero (School & Campus Workshops)
  IMPACT_1: BUNNY('2ad6516b-33c7-43de-ad06-e726f81190ea'), // "Unki awaaz mein"
  LEARN_1: '-8_hR72a7aU',
  LEARN_2: 'TtpSBadMRNY',
  LEARN_3: 'YOnZNCq0c-w',
};

const LEARN_META: [string, VideoItem['category'], string][] = [
  ['99% People Use AI Wrong! Learn Prompt Engineering in 5 minute', 'prompting', 'Prompt engineering ka simple tarika — 5 minute mein.'],
  ['Give me 2 Minutes and I’ll Make You Dangerously Productive with AI', 'productivity', 'AI se apna roz ka kaam tezi se karne ke tareeke.'],
  ['Nobody Told You This About AI — The 5 Hidden Stages', 'start', 'AI seekhne ke 5 hidden stages, ek video mein.'],
  ['Learn Practical AI Tools', 'tools', 'Kaam ke AI tools, step by step.'],
  ['Create Content with AI', 'content', 'AI se content banane ke tareeke.'],
  ['Start Your AI Journey', 'start', 'AI seekhna yahan se shuru karo.'],
];

const env = (k: string): string => ((import.meta.env as Record<string, string>)[`VITE_VIDEO_${k}`] || '').trim();
const value = (slot: string) => env(slot) || DEFAULTS[slot] || '';
const ytId = (v: string) => v.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)?.[1] ?? (/^[\w-]{11}$/.test(v) ? v : '');

/** iframe src for a slot. */
export const videoSrc = (slot: string) => {
  const v = value(slot);
  const id = ytId(v);
  return id ? `https://www.youtube.com/embed/${id}` : v;
};

export const VIDEOS: VideoItem[] = LEARN_META.flatMap(([title, category, description], i) => {
  const slot = `LEARN_${i + 1}`;
  const id = ytId(value(slot));
  if (!id) return [];
  return [{ id, youtubeId: id, title: env(`${slot}_TITLE`) || title, language: 'Hinglish', thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, category, description }];
});
