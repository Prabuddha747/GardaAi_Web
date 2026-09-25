import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { ABOUT_CHAPTERS, ASSETS, TEAM_MEMBERS, VIDEOS } from '../data/academyData';
import { videoSrc } from '../data/videos';
import { VideoItem } from '../types';
import { Arrow, C, Count, Typed, ChapterLabel, Note, Photo, Sheet, Squiggle, Wrap } from './ui';

interface AboutViewProps {
  onNavigateToLearn: () => void;
  onOpenVideo: (video: VideoItem) => void;
  onOpenReadStory: () => void;
}

const STATS = [
  ['5,000+', 'Learners'],
  ['100+', 'Workshops'],
  ['35+', 'Partner Schools'],
];

const METHOD = [
  ['Simple concept', ASSETS.heroClassroom, '85% 30%', 1.5],
  ['Live demonstration', ASSETS.heroClassroom, '10% 40%', 1.6],
  ['Hands-on practice', ASSETS.studentLaptop, 'center', 1],
  ['Real-life application', ASSETS.shopkeeperPhone, 'center', 1],
] as const;

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateToLearn, onOpenVideo, onOpenReadStory }) => (
  <div className="bg-[#0c1a20] overflow-x-clip">
    {/* HERO */}
    <Sheet bg={C.paper} z={50} tear={1} className="pt-8 pb-24">
      <Wrap className="grid lg:grid-cols-[80px_1.05fr_1.1fr] gap-x-10 gap-y-8">
        <aside className="hidden lg:block pt-4">
          <div className="hl-serif text-[26px] leading-[1.05]">WHY<br />WE<br />EXIST</div>
          {[['01', 'Origin'], ['02', 'The Barrier'], ['03', 'The Mission']].map(([n, l]) => (
            <div key={n} className="mt-8 border-l border-stone-400 pl-3 -ml-3">
              <div className="mono-label text-[#087F8C] font-bold text-sm">{n}</div>
              <div className="text-xs text-stone-600">{l}</div>
            </div>
          ))}
        </aside>

        <div>
          <h1 className="hl-serif text-[clamp(36px,4.3vw,58px)] pt-2">
            <Typed lines={[{ t: 'Problem' }, { t: 'talent ki nahi thi.' }, { t: 'Language ki thi.', c: 'text-[#FF6500]' }]} />
          </h1>
          <p className="mt-5 text-lg text-stone-600 max-w-md leading-snug">
            Bihar ke ek chhote se gaon se nikli ek simple baat: AI tabhi sabka hoga, jab sabki language mein aayegi.
          </p>
          <div className="relative mt-8 max-w-[480px]">
            <Photo src={ASSETS.biharRiverbank} pos="center 60%" gray className="h-[190px] [mask-image:linear-gradient(to_bottom,transparent,#000_35%)] shadow-none" />
            <Note className="absolute right-3 top-14 text-base" rot={-5} line={false}>Bihar<br />Always</Note>
          </div>
        </div>

        <div className="relative">
          <Note className="absolute -top-2 right-0 text-lg z-10" rot={-10} line>Same Curiosity<br />A Brighter Bihar</Note>
          <div className="mono-label text-[10px] text-stone-600 flex justify-between mb-2 mt-6">
            <span>The GardaAI Story</span>
          </div>
          <div className="relative aspect-video rounded-md overflow-hidden shadow-xl border-4 border-[#101820] bg-black">
            <iframe className="absolute inset-0 w-full h-full" src={videoSrc('ABOUT_1')} loading="lazy" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowFullScreen title="The GardaAI Story" />
          </div>
          <div className="mt-5 grid sm:grid-cols-[1.2fr_1fr] gap-6 items-start">
            <div>
              <div className="relative flex justify-between">
                <span className="absolute top-[5px] left-1 right-1 h-px bg-stone-400" />
                {ABOUT_CHAPTERS.map((c, i) => (
                  <div key={c.id} className="relative text-[10px] text-stone-600 leading-tight">
                    <span className={`block w-2.5 h-2.5 rounded-full border-2 mb-1.5 ${i === 0 ? 'bg-[#087F8C] border-[#087F8C]' : 'bg-[#F3EEE2] border-stone-700'}`} />
                    <b className="font-mono block">{c.time}</b>
                    {c.title}
                  </div>
                ))}
              </div>
              <button onClick={onOpenReadStory} className="mt-5 text-sm font-semibold text-[#087F8C] hover:underline cursor-pointer inline-flex items-center gap-1">
                Read the story instead <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <blockquote className="border-l border-stone-400 pl-4 text-sm text-stone-700 leading-snug">
              <span className="font-serif text-4xl leading-none text-stone-300 float-left mr-2 -mt-1">“</span>
              Talent har jagah hai. AI education bhi har language tak pahunchni chahiye.
              <footer className="text-xs text-stone-500 mt-3 flex items-center gap-2.5">
                <span className="w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-white shadow block relative">
                  <img src="/images/mentor.png" alt="Punit Gupta, Founder &amp; Mentor" loading="lazy" className="absolute max-w-none" style={{ width: '270%', left: '-158%', top: '-62%' }} />
                </span>
                <span>— Punit Gupta, Founder &amp; Mentor</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </Wrap>
    </Sheet>

    {/* ORIGIN */}
    <Sheet bg={C.paper} z={40} tear={3} className="-mt-4 pt-24 pb-20">
      <Wrap className="grid lg:grid-cols-[1fr_1.5fr_90px] gap-x-8 gap-y-8 items-center">
        <div>
          <h2 className="hl-serif text-[clamp(36px,4vw,56px)] mt-3">Ek problem jo<br />khud feel hui.</h2>
          <Squiggle w={130} className="mt-1" />
          <p className="mt-6 text-lg text-stone-700 max-w-sm leading-snug">
            Hindi-medium background se nikal kar samajh aaya—problem ability ki nahi, access aur language ki hai.
          </p>
          <Note className="mt-3 text-xl" rot={-8}>Start where<br />people are.</Note>
        </div>
        <Photo src={ASSETS.biharRiverbank} gray pos="center 65%" className="h-[340px] lg:h-[400px]">
        </Photo>
        <Note className="text-2xl justify-self-center" rot={-12}>Same<br />Soil<br />Bigger<br />Dreams</Note>
      </Wrap>
    </Sheet>

    {/* METHOD */}
    <Sheet bg={C.paper} z={30} tear={5} className="-mt-4 pt-24 pb-20">
      <Wrap>

        <h2 className="hl-serif text-[clamp(28px,3.7vw,52px)] mt-3">Samjho. Dekho. Karke dekho. Apne kaam mein lagao.</h2>
        <Squiggle w={130} className="-mt-1" />
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_120px] gap-6 items-start">
          {METHOD.map(([label, src, pos, scale], i) => (
            <div key={label} className="relative">
              <Photo src={src} pos={pos} scale={scale} gray={false} className="aspect-[4/3] lg:h-[210px] w-full">
                <span className="absolute left-2 top-2 w-8 h-8 rounded-full bg-[#101820] text-white text-xs font-mono grid place-items-center">0{i + 1}</span>
              </Photo>
              {i < 3 && <Arrow className="hidden lg:block absolute -right-[38px] top-[45%] z-10" />}
              <div className="mt-3 text-center font-serif text-lg font-medium">{label}</div>
            </div>
          ))}
          <Note className="hidden lg:block text-xl" rot={-9}>Learning today<br />A Stronger Bihar tomorrow.</Note>
        </div>
      </Wrap>
    </Sheet>

    {/* PEOPLE + PROOF */}
    <Sheet bg={C.paper} z={20} tear={2} className="-mt-4 pt-24 pb-20">
      <Wrap className="grid lg:grid-cols-[0.75fr_1.7fr_0.5fr] gap-x-8 gap-y-8">
        <div>
          <h2 className="hl-serif text-[clamp(30px,3.3vw,46px)] mt-3">Small team.<br />Growing community.</h2>
          <Squiggle w={120} className="mt-1" />
          <p className="mt-5 text-stone-600 leading-snug">A few people. A bigger purpose. From classrooms in Bihar to a growing community of curious learners.</p>
          <div className="mt-6 grid grid-cols-[110px_1fr] items-center">
            <Note className="text-xl" rot={-9}>Real<br />People<br />Real Progress</Note>
            <ul className="border-l border-stone-400 pl-5 space-y-2 text-[15px] text-stone-800">
              {TEAM_MEMBERS.map((m) => <li key={m.name} className="flex items-center gap-2.5"><img src={m.photo} alt={m.name} loading="lazy" className="w-9 h-9 rounded-full object-cover object-top border border-stone-300" />{m.name}</li>)}
            </ul>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-[1.25fr_0.9fr_0.6fr] grid-rows-2 gap-3 h-[420px]">
            <Photo src={ASSETS.heroClassroom} pos="20% 60%" scale={1.3} className="row-span-1" />
            <Photo src={ASSETS.videoInstructor} pos="85% 40%" scale={1.4} />
            <div className="row-span-1 bg-[#e8dfca] p-3 grid place-items-center text-center"><Note rot={-8} className="text-lg">Better Learners<br />A Brighter Bihar</Note></div>
            <Photo src={ASSETS.studentLaptop} />
            <div className="bg-[#e8dfca] p-3 grid place-items-center text-center"><Note rot={-8} className="text-lg">Questions today<br />Solutions tomorrow</Note></div>
            <Photo src={ASSETS.heroClassroom} pos="95% 30%" scale={1.6} />
          </div>
          <p className="text-[11px] text-stone-600 mt-1.5">Real classrooms. Real questions. Real progress.</p>
        </div>
        <dl className="divide-y divide-stone-400 self-start">
          {STATS.map(([n, l]) => (
            <div key={l} className="py-4 first:pt-0">
              <dt className="hl-serif text-5xl text-[#06323C]"><Count to={n} /></dt>
              <dd className="text-lg text-stone-700">{l}</dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </Sheet>

    {/* FINAL CTA */}
    <section className="relative -mt-4 pt-24 text-white overflow-hidden" style={{ background: C.navy, zIndex: 10 }}>
      <img src={ASSETS.studentLaptop} alt="" className="absolute right-0 top-0 h-full w-[62%] object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071C24] via-[#071C24]/85 to-transparent" />
      <Wrap className="relative py-14 min-h-[360px]">
        <h2 className="hl-serif text-[clamp(38px,4.4vw,62px)]">AI seekho.<br />Apni language mein.</h2>
        <Squiggle w={220} className="mt-1" />
        <p className="mt-5 text-lg text-white/85 max-w-sm">Free Hinglish videos, practical ideas aur ek community jo saath seekhti hai.</p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <button onClick={onNavigateToLearn} className="inline-flex items-center gap-2 bg-[#FF6500] hover:bg-[#e85a00] px-6 py-3 rounded-lg font-semibold cursor-pointer">
            Start Learning <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => onOpenVideo(VIDEOS[0])} className="text-[#7fd4dc] font-semibold text-sm hover:underline cursor-pointer inline-flex items-center gap-1">
            See GardaAI in Action <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <Note className="absolute right-8 bottom-10 text-xl hidden md:block" rot={-10} color="#f3eee2">More Learners<br />A Kinder Bihar</Note>
      </Wrap>
    </section>
  </div>
);
