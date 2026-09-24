import React, { useEffect, useState } from 'react';
import { videoSrc } from '../data/videos';
import '../home/home.css';

const WA = 'https://wa.me/917632821374?text=Hello%20GardaAI%20Academy!%20I%20am%20interested%20in%20your%20courses%20and%20workshops.';
const PLAY = 'https://play.google.com/store/apps/details?id=com.gardaai.academy';
const VID_ALLOW = 'accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture';
const LIGHT = { background: 'linear-gradient(120deg,#F8FBFB 0%,#F8FBFB 55%,#EEF8F9 100%)' };
const DARK = { background: 'linear-gradient(155deg,#0B1F24 0%,#0F2428 60%,#0A4F53 100%)' };
const S = { fill: 'none', stroke: '#0E9F9A', strokeWidth: 2, strokeLinecap: 'round' as const };

const Wa = ({ size, fill = 'white' }: { size: number; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Head = ({ pill, title, sub, w = 600 }: { pill: string; title: React.ReactNode; sub?: string; w?: number }) => (
  <div style={{ textAlign: 'center', maxWidth: w, margin: '0 auto 3.5rem' }} className="rv">
    <div style={{ marginBottom: '.9rem', display: 'flex', justifyContent: 'center' }}><span className="pill pill-teal"><span className="dot" />{pill}</span></div>
    <h2>{title}</h2>
    {sub && <p style={{ marginTop: '.8rem' }}>{sub}</p>}
  </div>
);

const stats = [
  ['5,000+', 'Learners', <><path d="M16 19v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M20 8v6M17 11h6" /></>],
  ['100+', 'AI Workshops', <><path d="M11 4L2 8l9 4 9-4-9-4z" /><path d="M5 10v5c0 1 3 2.5 6 2.5s6-1.5 6-2.5v-5" /></>],
  ['35+', 'Partner Schools', <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" />],
  ['4.9/5', 'Student Rating', <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.9 5.9 21.4l1.4-6.8L2.2 9.1l6.9-.8L12 2z" strokeLinejoin="round" />],
] as const;

const trusted = [
  ['Students', <><path d="M10 3L2 7l8 4 8-4-8-4z" /><path d="M5 9v4c0 1 2.5 2 5 2s5-1 5-2V9" /></>],
  ['Teachers', <><path d="M14 15v-1a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v1" /><circle cx="8" cy="6" r="3" /><path d="M15 4l3 2-3 2" /></>],
  ['Business Owners', <><rect x="2" y="6" width="16" height="11" rx="2" /><path d="M7 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></>],
  ['Professionals', <><circle cx="10" cy="6" r="3.5" /><path d="M4 18v-1a6 6 0 0 1 12 0v1" /></>],
  ['Content Creators', <><rect x="2" y="4" width="16" height="12" rx="2" /><path d="M9 8l4 2-4 2z" fill="#0E9F9A" stroke="none" /></>],
  ['Job Seekers', <><circle cx="8" cy="8" r="5.5" /><path d="M12 12l5 5" /></>],
] as const;

// [name, quote] — video comes from slot HOME_2..HOME_4 (see src/data/videos.ts)
const videos = [
  ['Rohit Sharma', 'I used AI only for basic tasks and simple searches. This workshop completely changed my perspective. I highly recommend this workshop to students, freelancers, and professionals who want to stay ahead in the AI era.'],
  ['Vishnu Kumar', 'Main ek small business chalata hoon aur mujhe lagta tha AI sirf tech logon ke liye hota hai. Ab main content creation, research aur daily tasks ko kaafi fast complete kar pata hoon. Workshop bahut simple aur beginner-friendly tha.'],
  ['Nayana Uchil', 'AI ke baare mein seekhna tha lekin technical background nahi tha. Punit sir ne har concept ko bahut simple language mein explain kiya. Ab main AI tools ka use content ideas, presentations aur daily productivity ke liye karti hoon. Agar aap beginner hain to ye workshop definitely join karni chahiye.'],
] as const;

const T = ['#0E9F9A,#0A4F53', '#F16200,#FFA143', '#14B8A6,#0E9F9A'];
// 3 marquee columns of [quote, name, role, initials, gradient]
const testi = [
  [
    ['Sir ne AI ko itna simple samjhaya ki mujhe laga main bhi kuch bana sakta hoon. Zero se shuru kiya, ab roz ChatGPT use karta hoon.', 'Rohit Kumar', 'Class 11 Student, Patna', 'RK', T[0]],
    ['Maine apni dukaan ke liye AI se poster aur WhatsApp message banana seekha. Sach me sales improve hui hai.', 'Suresh Sah', 'Shop Owner, Bhagalpur', 'SS', T[1]],
    ['I never thought AI could be this practical. Real projects, real examples — bilkul apne context me.', 'Meena Devi', 'Vice Principal, Patna', 'MD', T[2]],
  ],
  [
    ['Main Hindi medium se hoon, English content dekh ke dar lagta tha. GardaAI ke Hinglish sessions ne sab aasan kar diya.', 'Priya Kumari', 'B.A. Student, Gaya', 'PK', '#0B1F24,#0E9F9A'],
    ['YouTube ke liye scripts ab AI se likhta hoon. Sirf 2 mahine me subscribers double ho gaye.', 'Aryan Raj', 'Content Creator, Darbhanga', 'AR', '#E68030,#FF7700'],
    ['Bacchon ki workshop ke baad ghar aake wo mujhe AI tools dikha rahe the. Proud moment tha.', 'Rajesh Kumar', 'Parent, Samastipur', 'Rj', '#00737D,#0B1F24'],
  ],
  [
    ['Teacher hote hue AI se lesson plan banana ab 5 minute ka kaam hai. Har hafte ghante bach jaate hain.', 'Anjali Verma', 'Science Teacher, Muzaffarpur', 'AV', T[0]],
    ['Job ke liye resume aur interview prep AI se ki. Confidence bilkul alag level pe aa gaya.', 'Neha Jha', 'Job Seeker, Begusarai', 'NJ', T[1]],
    ['Prompting ka RCCF framework game-changer hai. Ab jo bhi poochho, sahi jawab milta hai.', 'Vivek Anand', 'College Student, Nalanda', 'VA', T[2]],
  ],
] as const;

const appFeats = [
  ['Free Prompts', 'Ready-to-use prompts jo turant result dete hain.', <path d="M4 6h14M4 11h14M4 16h9" />],
  ['AI News & Updates', 'Tezi se badalti AI duniya ki har khabar, simple bhasha me.', <><rect x="3" y="4" width="16" height="15" rx="2" /><path d="M7 8h8M7 12h8M7 16h5" /></>],
  ['Free Learning Videos', 'AI seekhne ke liye Hinglish tutorials — bilkul free.', <><rect x="2" y="5" width="18" height="12" rx="3" /><polygon points="10,9 14,11 10,13" fill="#0E9F9A" stroke="none" /></>],
] as const;

const DL = <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />;
const community = [
  ['WhatsApp Community', '500+ learners & daily AI tips.', 'Join Now', WA.replace('interested%20in%20your%20courses%20and%20workshops.', 'I%20want%20to%20join%20the%20community.'), '#25D366', <Wa size={24} />],
  ['YouTube Channel', 'Free AI tutorials in Hinglish.', 'Subscribe', 'https://www.youtube.com/@punit.gupta_ai', '#FF0000', <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M23 12s0-3.8-.5-5.6a2.9 2.9 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.4a2.9 2.9 0 0 0-2 2C1 8.2 1 12 1 12s0 3.8.5 5.6a2.9 2.9 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.4a2.9 2.9 0 0 0 2-2C23 15.8 23 12 23 12zM10 15.5v-7l6 3.5-6 3.5z" /></svg>],
  ['Instagram', 'Daily AI tips & reels.', 'Follow', 'https://www.instagram.com/gardaaiacademy', 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)', <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" /></svg>],
  ['Download GardaAI App', 'Seekho kahin bhi, kabhi bhi.', 'Download', PLAY, 'linear-gradient(135deg,#FFAB23,#FF8000)', <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{DL}</svg>],
] as const;

const team = [
  ['Punit Gupta', 'team-punit.png'], ['Prince Singh', 'team-prince.jpeg'], ['Khushi Gupta', 'team-khushi.jpeg'],
  ['Vivek Kumar', 'team-vivek.png'], ['Prabuddha Verma', 'team-prabuddha.jpeg'],
] as const;

const faqs = [
  ['Do I need any coding knowledge for these courses?', 'Absolutely not. All our courses are completely no-code. If you can use a smartphone or a basic computer, you are fully prepared. We teach AI tools in a practical, hands-on way — zero programming knowledge required at any level.'],
  ['What language are the courses delivered in?', 'Our courses are delivered bilingually — a practical mix of Hindi and English. Technical terms are explained in English with clear Hindi context, making the content accessible to all learners regardless of their English proficiency level.'],
  ['Will I receive a certificate upon completion?', 'Yes. All paid courses include a GardaAI Academy Certificate of Completion. This certificate can be added to your LinkedIn profile, included in your resume, or submitted as part of your school or college portfolio.'],
  ['What payment methods are accepted?', 'We accept UPI (PhonePe, Google Pay, Paytm), bank transfer, and cash payment for local workshops. EMI options are available for select courses. Simply fill out the enrollment form and our team will share payment details directly.'],
  ['How many students are required for a school workshop?', 'We recommend a minimum of 20 students for an effective group session. A single session can accommodate up to 60 students. For larger schools, we can arrange multiple batches on the same day to ensure full participation.'],
  ['Are the online courses self-paced or live?', 'AI Fluency: Zero to Pro is a 4-day LIVE online course — you attend live sessions with real interaction, Q&A, and guided practice each day. All recordings and materials are provided after each session so you can revise anytime.'],
  ['Are workshops available outside of Bihar?', 'Currently, our physical workshops are conducted primarily within Bihar. Our online courses are available across India. For physical workshops outside Bihar, please contact us — we are actively expanding our reach and may be able to accommodate your request.'],
  ['What is the refund policy?', 'We offer a full refund within 7 days of purchase if you are not satisfied — no questions asked. We stand behind the quality of our courses. For physical workshops, cancellations must be made at least 48 hours in advance to receive a full refund.'],
] as const;

const social = [
  ['Instagram', 'https://www.instagram.com/gardaaiacademy', 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', <><rect x="2" y="2" width="14" height="14" rx="4" /><circle cx="9" cy="9" r="3" /><circle cx="13" cy="5" r=".8" fill="white" stroke="none" /></>],
  ['YouTube', 'https://www.youtube.com/@punit.gupta_ai', '#FF0000', <><rect x="2" y="4" width="14" height="11" rx="3" /><polygon points="12,9.5 8,7 8,12" fill="white" stroke="none" /></>],
  ['WhatsApp', 'https://wa.me/917632821374?text=Hello%20GardaAI%20Academy!', '#25D366', null],
  ['LinkedIn', 'https://www.linkedin.com/in/punit-gupta-b58583232/', '#0077B5', <><rect x="2" y="2" width="14" height="14" rx="3" /><path d="M6 9v5M6 6v.01M10 14v-4a2 2 0 0 1 4 0v4" /></>],
] as const;

const contacts = [
  ['mailto:academy@gardaai.in', 'Email', 'academy@gardaai.in', <><path d="M4 4h12c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1z" /><polyline points="16,5 10,10 4,5" /></>],
  ['tel:+917632821374', 'Phone', '+91 76328 21374', <path d="M15 11.5v2.5a1.7 1.7 0 0 1-1.85 1.7 16.7 16.7 0 0 1-7.3-2.6A16.4 16.4 0 0 1 1.1 9.4 16.7 16.7 0 0 1 .9 2.1 1.7 1.7 0 0 1 2.58.4h2.5a1.7 1.7 0 0 1 1.7 1.46c.11.85.31 1.66.6 2.46a1.7 1.7 0 0 1-.38 1.79L5.97 7.2A13.5 13.5 0 0 0 9.77 11l1.08-1.08a1.7 1.7 0 0 1 1.78-.38c.8.29 1.62.49 2.47.6A1.7 1.7 0 0 1 15 11.5z" />],
] as const;

const Star5 = () => <div className="te-stars">{'★★★★★'.split('').map((s, i) => <span key={i} className="star">{s}</span>)}</div>;

export const HomeView: React.FC = () => {
  const [video, setVideo] = useState(false);
  const [faq, setFaq] = useState(-1);
  const [toast, setToast] = useState<'' | 'ok' | 'err'>('');
  const [sending, setSending] = useState(false);
  const [showFloat, setShowFloat] = useState({ wa: false, side: false });

  useEffect(() => {
    // reveal on scroll
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.home-page .rv,.home-page .rvl,.home-page .rvr').forEach((el) => io.observe(el));

    const onScroll = () => {
      const heroH = document.getElementById('hero')?.offsetHeight || innerHeight;
      setShowFloat({ wa: scrollY > 400, side: scrollY > heroH - 120 });
    };
    addEventListener('scroll', onScroll, { passive: true });

    return () => { io.disconnect(); removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setVideo(false);
    addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [video]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    const fd = new FormData(form);
    // web3forms access keys are public by design (domain-restricted in their dashboard)
    fd.append('access_key', '79805d82-98e2-4fcf-a7cf-965880af0fc8');
    fd.append('subject', 'New Enrollment - GardaAI Academy');
    fd.append('from_name', 'GardaAI Website');
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      if (!(await r.json()).success) throw 0;
      form.reset();
      setToast('ok');
    } catch { setToast('err'); }
    setSending(false);
    setTimeout(() => setToast(''), 4500);
  };

  return (
    <div className="home-page">
      <a id="wa-btn" className={showFloat.wa ? 'show' : ''} href={WA} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <div className="wa-pulse" /><Wa size={26} />
      </a>

      <section id="hero">
        <div className="wrap">
          <div className="h-wrap">
            <div className="h-top">
              <div className="h-badge rv"><span className="pill pill-teal"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15l-1.9-4.1L5.5 9l4.6-1.4L12 3z" /></svg>India's AI Learning Platform for Everyone</span></div>
              <h1 className="h1 rv d1">Learn <span style={{ color: '#0E9F9A' }}>AI.</span><br />Think Better.<br />Build <span style={{ color: '#FF8000' }}>Faster.</span></h1>
            </div>
            <div className="h-vis rv d2">
              <div className="h-photo"><img src="/images/hero-session.png" alt="GardaAI live learning session" fetchPriority="high" /></div>
              <div className="h-phone"><img src="/images/phone-app.jpeg" alt="GardaAI app screen" /></div>
              <div className="h-fcard fc-2"><div className="fc-ic" style={{ background: 'linear-gradient(180deg, #F16200, #FFA143)' }}><svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M13 15v-1a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v1" /><circle cx="7.5" cy="6" r="3" /><path d="M18 15v-1a3 3 0 0 0-2.2-2.9M13 3.1A3 3 0 0 1 13 9" /></svg></div><div><strong style={{ color: '#fff' }}>Hinglish Learning</strong><span style={{ color: 'rgba(255,255,255,.85)' }}>Simple language, deeper understanding</span></div></div>
            </div>
            <div className="h-bot">
              <p className="h-p rv d2">Master AI through practical projects, real-world workflows and Hinglish learning. We don't just teach tools, we teach you how to <b>think with AI.</b></p>
              <div className="h-btns rv d3">
                <a href={PLAY} target="_blank" rel="noopener" className="btn btn-lg h-btn-1" style={{ background: 'linear-gradient(180deg, #FFAB23, #FF8101)' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  Download Garda AI App
                </a>
                <button type="button" onClick={() => setVideo(true)} className="btn btn-lg h-btn-2" style={{ background: 'linear-gradient(180deg, #00E0F4, #008B86)' }}>
                  <span className="h-play"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                  Why You Choose GardaAI?
                </button>
              </div>
              <div className="h-avatars rv d4">
                <div className="ha-stack">
                  {[['RK', '#0E9F9A,#0A4F53'], ['AS', '#E68030,#FF7700'], ['PG', '#14B8A6,#0E9F9A'], ['MV', '#0B1F24,#4B5563']].map(([n, g]) => <span key={n} style={{ background: `linear-gradient(135deg,${g})` }}>{n}</span>)}
                </div>
                <p>Join <b>5,000+ learners</b> on their AI journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats"><div className="wrap"><div className="sb2">
        {stats.map(([n, l, ic]) => (
          <div className="si2" key={l}><div className="si2-ic"><svg width="22" height="22" {...S}>{ic}</svg></div><div><span className="sn2">{n}</span><span className="sl2">{l}</span></div></div>
        ))}
      </div></div></section>

      <section id="trusted"><div className="wrap">
        <p className="tr-h">Trusted by students, professionals, business owners &amp; creators <b>across India</b></p>
        <div className="tr-row">
          {trusted.map(([l, ic]) => <span key={l}><svg width="18" height="18" {...S}>{ic}</svg>{l}</span>)}
        </div>
      </div></section>

      <section id="vtesti" className="sec" style={LIGHT}>
        <div className="wrap">
          <Head pill="Video Stories" title={<>Hear It From<br />Our Learners</>} sub="Suno seedhe hamare learners se — kaise AI ne unki padhai, kaam aur business ko aasan banaya." />
          <div className="vt-g">
            {videos.map(([name, text], i) => (
              <div className={`vt rv d${i + 1}`} key={name}>
                <div className="vt-vid"><iframe src={videoSrc(`HOME_${i + 2}`)} loading="lazy" allow={VID_ALLOW} allowFullScreen title={`${name} video`} /></div>
                <div className="vt-body"><h3>{name}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testi" className="sec" style={LIGHT}>
        <div className="wrap">
          <Head pill="Student Stories" title={<>Real Words.<br />Real Results.</>} w={540} />
          <div className="te-marq">
            {testi.map((col, c) => (
              <div className="te-col" key={c}><div className="te-track">
                {[...col, ...col].map(([q, n, r, ini, g], i) => (
                  <div className="te" key={i} aria-hidden={i >= col.length || undefined}>
                    <Star5 />
                    <p className="te-q">{q}</p>
                    <div className="te-au"><div className="te-av" style={{ background: `linear-gradient(135deg,${g})` }}>{ini}</div><div><div className="ta-n">{n}</div><div className="ta-r">{r}</div></div></div>
                  </div>
                ))}
              </div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="sec" style={LIGHT}>
        <div className="wrap">
          <Head pill="100% Free" title={<>Everything Free<br />Inside the GardaAI App</>} sub="Ek hi app me sab kuch — free prompts, AI news aur free learning videos. Aaj hi download karo, koi payment nahi." w={620} />
          <div className="app-cta">
            <div className="app-info rvl">
              {appFeats.map(([t, d, ic]) => (
                <div className="app-feat" key={t}>
                  <div className="af-ic"><svg width="22" height="22" {...S}>{ic}</svg></div>
                  <div><strong>{t}</strong><span>{d}</span></div>
                </div>
              ))}
              <a href={PLAY} target="_blank" rel="noopener" className="btn btn-lg app-dl">
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{DL}</svg>
                Download GardaAI App
              </a>
            </div>
            <div className="app-phone rvr"><img src="/images/phone-app.jpeg" alt="GardaAI app screen" loading="lazy" /></div>
          </div>
        </div>
      </section>

      <section id="community" className="sec" style={DARK}>
        <div className="wrap">
          <Head pill="Join Us" title={<>Be Part of the<br />GardaAI Community</>} sub="Learning is better together. Join 500+ learners sharing tips, resources, and wins every single day." />
          <div className="comm-g">
            {community.map(([t, d, cta, href, bg, ic], i) => (
              <div className={`comm rv d${(i % 3) + 1}`} key={t}>
                <div className="comm-ic" style={{ background: bg }}>{ic}</div>
                <h3>{t}</h3><p>{d}</p>
                <a className="comm-btn" style={{ background: bg }} href={href} target="_blank" rel="noopener">{cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="sec" style={LIGHT}>
        <div className="wrap">
          <div className="g2 cnt-g">
            <div className="rvl">
              <div style={{ marginBottom: '1rem' }}><span className="pill pill-teal"><span className="dot" />Get In Touch</span></div>
              <h2 style={{ marginBottom: '1rem' }}>Enroll or Bring AI<br />to Your School</h2>
              <p style={{ marginBottom: '2.2rem' }}>Whether you're enrolling in a course, booking a school workshop, or simply have a question — our team responds within 24 hours. You can also reach us instantly on WhatsApp.</p>
              {contacts.map(([href, l, v, ic]) => (
                <a className="ci" href={href} key={l}>
                  <div className="ci-ic"><svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">{ic}</svg></div>
                  <div><div className="ci-l">{l}</div><div className="ci-v">{v}</div></div>
                </a>
              ))}
              <a className="ci" href={WA} target="_blank" rel="noopener" style={{ borderColor: 'rgba(37,211,102,.2)' }}>
                <div className="ci-ic ci-wa"><Wa size={16} /></div>
                <div><div className="ci-l" style={{ color: '#25D366' }}>WhatsApp</div><div className="ci-v">+91 76328 21374 — Instant Reply</div></div>
              </a>
              <div className="ci">
                <div className="ci-ic"><svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M14 7c0 4.4-6 8-6 8S2 11.4 2 7a6 6 0 1 1 12 0z" /><circle cx="8" cy="7" r="2" fill="white" stroke="none" /></svg></div>
                <div><div className="ci-l">Location</div><div className="ci-v">Bihar, India — We come to you</div></div>
              </div>
              <div style={{ marginTop: '1.8rem', padding: '1.4rem', background: 'var(--surf2)', borderRadius: 'var(--r)', border: '1px solid var(--bdr)', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '.8rem' }}>
                  <img src="/images/logo.png" alt="GardaAI Academy" loading="lazy" style={{ height: 52, width: 'auto', borderRadius: 10 }} />
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '.3rem' }}>GardaAI Academy</div>
                <div style={{ fontSize: '.82rem', color: 'var(--muted)' }}>India's AI Hinglish Learning Platform for Everyone — Est. 2026</div>
              </div>
            </div>
            <div className="rvr">
              <div className="form-card">
                <div className="form-ttl">Enroll or Request a Workshop</div>
                <div className="form-sub">Fill this out — we'll connect with you within 24 hours.</div>
                <form onSubmit={submit}>
                  <div className="form-g">
                    <div className="fg"><label className="flbl" htmlFor="f-name">Full Name *</label><input id="f-name" className="finp" name="Name" type="text" placeholder="Your full name" autoComplete="name" required /></div>
                    <div className="fg"><label className="flbl" htmlFor="f-phone">Phone / WhatsApp *</label><input id="f-phone" className="finp" name="Phone" type="tel" placeholder="+91 XXXXX XXXXX" autoComplete="tel" required /></div>
                    <div className="fg full"><label className="flbl" htmlFor="f-school">School / Institution</label><input id="f-school" className="finp" name="School" type="text" placeholder="Name of your school or institution (optional)" /></div>
                    <div className="fg"><label className="flbl" htmlFor="f-email">Email Address</label><input id="f-email" className="finp" name="Email" type="email" placeholder="your@email.com" autoComplete="email" /></div>
                    <div className="fg full"><label className="flbl" htmlFor="f-msg">Message</label><textarea id="f-msg" className="ftxt" name="Message" placeholder="Any specific requirements, preferred dates, or questions..." /></div>
                  </div>
                  <button type="submit" className="fsubmit" disabled={sending}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l6-6M4 5h6v6" /></svg>
                    {sending ? 'Submitting...' : 'Send Enrollment Request'}
                  </button>
                  <a href={WA} target="_blank" rel="noopener" className="fwa-btn"><Wa size={16} fill="currentColor" />Or Message Us Directly on WhatsApp</a>
                  <p className="fnote">🔒 Your information is private and secure. We never share your data.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="sec" style={DARK}>
        <div className="wrap">
          <Head pill="Our People" title={<>Meet the Team<br />Behind GardaAI</>} sub="Ek chhoti, driven team — educators aur creators jo har learner ke liye AI ko aasan bana rahe hain." />
          <div className="team-marq">
            <div className="team-track">
              {[...team, ...team].map(([n, img], i) => (
                <div className="tm2" key={i} aria-hidden={i >= team.length || undefined}>
                  <div className="tm2-ph"><img src={`/images/team/${img}`} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }} /></div>
                  <div className="tm2-n">{n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="sec" style={LIGHT}>
        <div className="wrap">
          <Head pill="FAQ" title={<>Frequently Asked<br />Questions</>} sub="Answers to the most common questions — if you need anything else, reach out directly via WhatsApp or the contact form below." w={560} />
          <div className="faq-g rv">
            {[faqs.slice(0, 4), faqs.slice(4)].map((col, c) => (
              <div className="faq-col" key={c}>
                {col.map(([q, a], j) => {
                  const i = c * 4 + j;
                  return (
                    <div className={`faq-i${faq === i ? ' open' : ''}`} key={q} onClick={() => setFaq(faq === i ? -1 : i)}>
                      <div className="faq-q"><span>{q}</span><div className="faq-ic">+</div></div>
                      <div className="faq-a"><div className="faq-a-in">{a}</div></div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`toast${toast ? ' show' : ''}`} role="status">
        {toast === 'err' ? '❌ Error! WhatsApp us.' : <>
          <svg width="16" height="16" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"><path d="M2 8l4 4L14 4" /></svg>
          Request received! We'll reach out within 24 hours.
        </>}
      </div>

      <div id="vmodal" className={video ? 'open' : ''} onClick={(e) => e.target === e.currentTarget && setVideo(false)}>
        <div className="vm-box">
          <button className="vm-x" onClick={() => setVideo(false)} aria-label="Close">✕</button>
          {video && <iframe src={videoSrc('HOME_1')} allow={VID_ALLOW} allowFullScreen title="Why choose GardaAI video" />}
        </div>
      </div>

      <div className={`social-sidebar${showFloat.side ? ' show' : ''}`}>
        {social.map(([t, href, bg, ic]) => (
          <a key={t} href={href} target="_blank" rel="noopener" title={t} aria-label={t} style={{ background: bg }}>
            {ic ? <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">{ic}</svg> : <Wa size={18} />}
          </a>
        ))}
        <div className="ss-line" />
      </div>
    </div>
  );
};
