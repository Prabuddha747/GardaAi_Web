import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ASSETS, IMG, MAP_STORIES } from '../data/academyData';
import { videoSrc } from '../data/videos';
import { Arrow, C, Count, Typed, ChapterLabel, Note, Photo, Sheet, Squiggle, Wrap } from './ui';

interface ImpactViewProps {
  onOpenWorkshopModal: () => void;
  onNavigateToLearn: () => void;
}

const H = 'hl-impact';
const Tag: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <span className={`mono-label inline-block text-[11px] font-bold border-[1.5px] px-3 py-1 ${dark ? 'border-[#FF6500] text-[#FF6500]' : 'border-[#101820] text-[#101820] bg-[#f3eee2]/60'}`}>{children}</span>
);
const Marker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-[#FF6500] text-[#101820] font-handwritten font-bold text-xl px-3 py-0.5 -rotate-2 [clip-path:polygon(0_10%,100%_0,98%_100%,2%_92%)]">{children}</span>
);

const PANELS = [
  ['01', 'First build', 'Students explore. Ideas take shape.', ASSETS.heroClassroom, '30% 40%', 'Bigger Dreams Brighter Bihar'],
  ['02', 'Everyday business', 'Local businesses find new possibilities.', ASSETS.shopkeeperPhone, 'center', 'AI se bada sahaj vyapar'],
  ['03', 'New confidence', 'From hesitation to creation.', ASSETS.studentLaptop, 'center', 'Meri Awaaz Meri Pehchaan'],
] as const;

const PAIRS = [
  ['Student', ['Confused by AI', ASSETS.studentLaptop, '20% 40%'], ['Built a first idea', ASSETS.studentLaptop, '80% 50%']],
  ['Teacher', ['Hours on planning', ASSETS.heroClassroom, '10% 70%'], ['Faster lesson prep', ASSETS.heroClassroom, '85% 30%']],
  ['Shop Owner', ['Generic messages', ASSETS.shopkeeperPhone, '20% 50%'], ['Clear local communication', ASSETS.shopkeeperPhone, '80% 50%']],
] as const;

const BiharMap: React.FC<{ className?: string }> = ({ className = '' }) => (
  <img
    src={IMG.biharMap}
    alt="Map of Bihar: Muzaffarpur, Patna, Gaya, Purnia, Bhagalpur"
    className={`w-full drop-shadow-[0_8px_10px_rgba(0,0,0,0.3)] ${className}`}
  />
);

export const ImpactView: React.FC<ImpactViewProps> = ({ onOpenWorkshopModal, onNavigateToLearn }) => (
  <div className="overflow-x-clip bg-[#071C24]">
    {/* FIELD REPORT */}
    <Sheet bg={C.orange} z={60} tear={3} grain className="paper-orange pt-10 pb-16 text-[#101820]">
      <Wrap>
        <div className="grid lg:grid-cols-[1.05fr_1.15fr_0.55fr] gap-x-8 gap-y-6 items-start">
          <div>
            <Tag>Field Report • Bihar</Tag>
            <h1 className={`${H} text-[clamp(44px,5.6vw,80px)] mt-4`}><Typed lines={[{ t: 'Numbers nahi.' }, { t: 'Badlav dekho.' }]} /></h1>
            <Squiggle w={340} className="-mt-1" color={C.ink} />
            <p className="mt-4 text-lg leading-snug max-w-sm">Classroom se dukaan tak — AI tab useful hai jab real life mein kuch badle.</p>
          </div>
          <div className="text-center text-[#fbf7ec]">
            <div className={`${H} text-[clamp(90px,13vw,190px)] leading-[0.85]`}><Count to="5,000+" /></div>
            <div className={`${H} text-3xl text-[#101820] inline-block border-b-[3px] border-[#101820]`}>Learners</div>
          </div>
          <div className="relative border-l-2 border-[#101820] pl-5">
            <div className={`${H} text-6xl`}><Count to="100+" /></div><div className="font-bold">Workshops</div>
            <hr className="border-[#101820] my-3" />
            <div className={`${H} text-6xl`}><Count to="35+" /></div><div className="font-bold">Partner Schools</div>
            <div className="absolute -right-24 top-6 hidden 2xl:block"><Note className="text-2xl" rot={-10} color="#101820">Small<br />Steps.<br />Stronger<br />Bihar.</Note></div>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_1fr_1fr_1.05fr] gap-4 items-start">
          {PANELS.map(([n, t, d, src, pos, note]) => (
            <div key={n} className="reveal">
              <Photo src={src} pos={pos} gray className="h-[210px]">
                <span className="absolute right-3 top-6 font-handwritten text-white text-xl leading-tight max-w-[40%] drop-shadow" style={{ transform: 'rotate(-6deg)' }}>{note}</span>
              </Photo>
              <div className="flex gap-2 mt-2.5 items-start">
                <span className={`${H} text-4xl text-[#fbf7ec]`}>{n}</span>
                <div className="leading-tight"><b className="block">{t}</b><span className="font-handwritten text-sm">{d}</span></div>
              </div>
            </div>
          ))}
          <div className="relative reveal">
            <div className="bg-[#fbf7ec] p-4 shadow-md rotate-[0.5deg] font-handwritten text-lg leading-snug">
              <span className="text-[#087F8C] text-4xl leading-none font-serif">“</span> Main Hindi medium se hoon, English content dekh ke dar lagta tha. GardaAI ke Hinglish sessions ne sab aasan kar diya.
              <div className="font-sans text-xs mt-2"><b>— Priya Kumari</b><br />B.A. Student, Gaya</div>
            </div>
            <BiharMap className="mt-3 w-[75%]" />
          </div>
        </div>
      </Wrap>
    </Sheet>

    {/* FIELD NOTES */}
    <Sheet bg={C.paper} z={50} tear={5} className="-mt-4 pt-24 pb-20">
      <Wrap>
        <Tag>Field Notes • Real Life</Tag>
        <div className="flex justify-between items-start">
          <h2 className={`${H} text-[clamp(34px,4.4vw,62px)] mt-4`}>Badlav chhota dikhta hai.<br />Asar bada hota hai.</h2>
          <Note className="text-2xl hidden md:block" rot={-8}>Same People.<br />New Possibilities.</Note>
        </div>
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          {PAIRS.map(([who, a, b]) => (
            <div key={who} className="relative">
              <div className="mb-2"><Marker>{who}</Marker></div>
              <div className="grid grid-cols-[1fr_24px_1fr] items-center gap-1">
                {[a, b].map((x, i) => (
                  <React.Fragment key={i}>
                    {i === 1 && <span className="text-2xl text-center">→</span>}
                    <div>
                      <Photo src={x[1]} pos={x[2]} gray className="h-[130px]" />
                      <div className="font-handwritten text-base mt-1.5 leading-tight">{x[0]}<Squiggle w={90} className="block" /></div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Sheet>

    {/* OUR REACH */}
    <Sheet bg={C.orange} z={40} tear={2} className="paper-orange -mt-4 pt-24 pb-20 text-[#101820]">
      <Wrap className="grid lg:grid-cols-[0.8fr_1.3fr_0.6fr] gap-8 items-center">
        <div>
          <Tag>Our Reach • Bihar</Tag>
          <h2 className={`${H} text-[clamp(38px,4.6vw,66px)] mt-4`}>Har pin ke peeche<br />ek story.</h2>
          <p className="mt-4 text-lg leading-snug max-w-xs">Alag shehar. Alag log. Ek hi sawaal — AI hamare kaam ka kaise?</p>
        </div>
        <div className="relative">
          <BiharMap />
          <Note className="absolute right-0 top-2 text-xl" rot={-8} color="#101820">Real people.<br />Real questions.</Note>
          <Note className="absolute right-0 bottom-2 text-xl" rot={-6} color="#101820" line={false}>Bihar se<br />beyond.</Note>
        </div>
        <div className="space-y-2">
          {[['School workshop', 'Curious minds. Real conversations.', ASSETS.heroClassroom, '85% 40%'], ['Community learning', 'Beyond classrooms. In local spaces.', ASSETS.heroClassroom, '20% 70%'], ['Everyday application', 'AI finding a place in daily work.', ASSETS.shopkeeperPhone, 'center']].map(([t, d, src, pos]) => (
            <div key={t} className="grid grid-cols-[110px_1fr] gap-3 items-center">
              <Photo src={src} pos={pos} gray className="h-[62px]" />
              <div className="leading-tight"><b className="text-sm block">{t}</b><span className="text-xs">{d}</span></div>
            </div>
          ))}
        </div>
      </Wrap>
    </Sheet>

    {/* REAL PEOPLE */}
    <Sheet bg={C.navy} z={30} tear={4} grain={false} className="-mt-4 pt-24 pb-20 text-white">
      <Wrap className="grid lg:grid-cols-[0.8fr_1.4fr_1fr] gap-8 items-start">
        <div>
          <Tag dark>Real People • Real Words</Tag>
          <h2 className={`${H} text-[clamp(36px,4vw,56px)] mt-4`}>Unki awaaz mein.</h2>
          <Squiggle w={180} className="-mt-1" />
          <Note className="mt-6 text-xl" rot={-6} color="#e8eef0" line={false}>Bihar<br />bol raha hai.</Note>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {MAP_STORIES.filter((s) => s.city === 'Gaya' || s.city === 'Bhagalpur').map((s) => (
            <blockquote key={s.city} className="font-handwritten text-lg leading-snug">
              <span className="text-[#FF6500] text-5xl font-serif leading-none block h-6">“</span>
              {s.quote}
              <footer className="font-sans text-xs mt-3 text-white/80"><b>— {s.author.split(',')[0]}</b><br />{s.author.split(',').slice(1).join(',')}</footer>
            </blockquote>
          ))}
        </div>
        <div className="relative aspect-video rounded-md overflow-hidden border-4 border-[#101820] bg-black shadow-xl">
          <iframe className="absolute inset-0 w-full h-full" src={videoSrc('IMPACT_1')} loading="lazy" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowFullScreen title="GardaAI workshop voices" />
        </div>
      </Wrap>
    </Sheet>

    {/* FINAL CTA */}
    <Sheet bg={C.paper} z={20} tear={6} className="-mt-4 pt-24 pb-20">
      <Wrap className="grid lg:grid-cols-[1fr_1fr_0.8fr] gap-8 items-center">
        <Photo src={ASSETS.biharRiverbank} gray className="h-[150px] bg-transparent shadow-none [mask-image:linear-gradient(to_right,#000_60%,transparent)]">
          <Note className="absolute left-4 bottom-4 text-lg" rot={-6} color="#222">Legon se<br />Sikhega India.</Note>
        </Photo>
        <div>
          <h2 className={`${H} text-[clamp(30px,3.2vw,44px)]`}>Agli story aapke school<br />se ho sakti hai.</h2>
          <p className="mt-3 text-[15px] leading-snug max-w-xs">Practical, age-appropriate AI sessions—simple Hinglish aur real examples ke saath.</p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <button onClick={onOpenWorkshopModal} className="bg-[#087F8C] hover:bg-[#06707b] text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-3 cursor-pointer shadow-md">
            Bring GardaAI to Your School <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onNavigateToLearn} className="text-[#087F8C] font-semibold text-sm inline-flex items-center gap-1 hover:underline cursor-pointer">Explore Free Videos <ArrowRight className="w-4 h-4" /></button>
        </div>
      </Wrap>
    </Sheet>
  </div>
);
