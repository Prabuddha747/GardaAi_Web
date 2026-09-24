import { Chapter, MapStory } from '../types';
export { VIDEOS } from './videos';

export const ASSETS = {
  heroClassroom: '/images/hero_bihar_classroom_1790257525736.jpg',
  biharRiverbank: '/images/bihar_riverbank_village_1790257536777.jpg',
  shopkeeperPhone: '/images/indian_shopkeeper_phone_1790257563176.jpg',
  studentLaptop: '/images/indian_student_laptop_1790257581252.jpg',
  videoInstructor: '/images/gardaai_youtube_instructor_1790257596078.jpg',
};

export const IMG = {
  phone: '/images/phone-app.jpeg',
  biharMap: '/images/bihar-map.png',
  logo: '/images/logo.png',
};

export const ABOUT_CHAPTERS: Chapter[] = [
  { id: '00:00', title: 'Bihar', time: '00:00', summary: 'Grassroots context & ground reality in Bihar towns' },
  { id: '01:42', title: 'Language', time: '01:42', summary: 'Why English tech barrier held talented youth back' },
  { id: '03:18', title: 'First Workshop', time: '03:18', summary: 'The very first classroom experiment in Gaya' },
  { id: '05:06', title: "What's Next", time: '05:06', summary: 'Taking GardaAI across every district and school' },
];

export const TEAM_MEMBERS = [
  { name: 'Punit Gupta', photo: '/images/team/team-punit.png', role: 'Founder & Lead Educator' },
  { name: 'Prince Singh', photo: '/images/team/team-prince.jpeg', role: 'Community & School Outreach' },
  { name: 'Khushi Gupta', photo: '/images/team/team-khushi.jpeg', role: 'Content & Curriculum Design' },
  { name: 'Vivek Kumar', photo: '/images/team/team-vivek.png', role: 'Operations & District Lead' },
  { name: 'Prabuddha Verma', photo: '/images/team/team-prabuddha.jpeg', role: 'Engineering & Technology Lead' },
];

export const MAP_STORIES: MapStory[] = [
  {
    city: 'Patna',
    coordinates: { x: 48, y: 48 },
    workshops: 42,
    learners: 2200,
    highlight: 'Central hub conducting weekly hands-on cohorts for government school teachers and college students.',
    quote: 'Hamare Patna sessions mein teachers ne lesson planning ka time 70% kam kar liya.',
    author: 'GardaAI Outreach Team'
  },
  {
    city: 'Gaya',
    coordinates: { x: 38, y: 72 },
    workshops: 28,
    learners: 1450,
    highlight: 'College outreach focused on non-English medium undergraduates building their first resume and tech portfolio.',
    quote: 'Main Hindi medium se hoon, English content dekh ke dar lagta tha. GardaAI ne sab aasan kar diya.',
    author: 'Priya Kumari, B.A. Student, Gaya'
  },
  {
    city: 'Muzaffarpur',
    coordinates: { x: 45, y: 32 },
    workshops: 22,
    learners: 980,
    highlight: 'Dedicated youth labs in semi-rural schools teaching visual AI and prompt engineering for local enterprise.',
    quote: 'Bacche ab sirf reel nahi dekhte, computer lab mein AI tools se projects banate hain.',
    author: 'Rakesh Ranjan, School Principal'
  },
  {
    city: 'Bhagalpur',
    coordinates: { x: 74, y: 62 },
    workshops: 18,
    learners: 720,
    highlight: 'Silk weavers and retail shop owners adopting AI for WhatsApp business marketing and catalog generation.',
    quote: 'Maine apni dukaan ke liye AI se poster aur WhatsApp message banana seekha.',
    author: 'Suresh Sah, Shop Owner'
  },
  {
    city: 'Purnia',
    coordinates: { x: 78, y: 38 },
    workshops: 12,
    learners: 450,
    highlight: 'Grassroots mobile learning vans reaching rural youth with offline AI prompts and Hinglish guides.',
    quote: 'Gaon mein internet slow hota hai, par simple prompting sikhkar sabka confidence badh gaya.',
    author: 'Amit Kumar, Local Coordinator'
  }
];
