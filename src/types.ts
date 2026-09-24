export type ActiveTab = 'home' | 'about' | 'learn' | 'impact';

export interface VideoItem {
  id: string;
  title: string;
  duration?: string;
  youtubeId: string;
  language: string;
  thumbnail: string;
  views?: string;
  category: 'start' | 'prompting' | 'tools' | 'content' | 'productivity';
  description: string;
  badgeTag?: string;
  notes?: string[];
  keyPrompt?: string;
}

export interface Chapter {
  id: string;
  title: string;
  time: string;
  summary: string;
}

export interface MapStory {
  city: string;
  coordinates: { x: number; y: number };
  workshops: number;
  learners: number;
  highlight: string;
  quote: string;
  author: string;
}
