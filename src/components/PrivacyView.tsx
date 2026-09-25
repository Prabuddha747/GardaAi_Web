import React from 'react';
import { C, Sheet, Wrap } from './ui';

const SECTIONS: [string, React.ReactNode][] = [
  ['Who we are', <>GardaAI Academy ("we", "us") teaches practical AI in simple Hinglish from Patna, Bihar. This policy covers the website <b>gardaai.in</b> and how it handles your information. Questions? Write to <a className="text-[#087F8C] underline" href="mailto:academy@gardaai.in">academy@gardaai.in</a>.</>],
  ['What this website collects', <ul className="list-disc pl-5 space-y-2">
    <li><b>Chat assistant.</b> Messages you type into the chat are sent through our server to Anthropic, the AI provider that writes the replies. We don't keep a chat-history database. Please don't share passwords, ID numbers or other sensitive details in chat.</li>
    <li><b>AI Updates.</b> Headlines and images come from a news provider (freenewsapi.io) and every story links to its original publisher. Your browser saves the last feed on your own device so the page still works if the feed is down. This contains no personal data.</li>
    <li><b>Videos.</b> Videos are embedded from YouTube. When you press play, YouTube (Google) may set its own cookies under its own policy.</li>
    <li><b>Hosting logs.</b> Our host (Vercel) keeps standard technical logs such as IP address, browser type and pages requested, for security and reliability.</li>
    <li><b>When you contact us.</b> If you email, call or WhatsApp us, we use the details you share only to reply and to run the workshop or course you asked about.</li>
  </ul>],
  ['What we do not do', <>We do not sell your personal information. We do not run advertising trackers, and this website does not set its own tracking or analytics cookies.</>],
  ['The GardaAI mobile app', <>The GardaAI app is available on Google Play. What the app collects and how it is used is described in the <b>Data safety</b> section of its <a className="text-[#087F8C] underline" href="https://play.google.com/store/apps/details?id=com.gardaai.academy" target="_blank" rel="noopener noreferrer">Google Play listing</a>.</>],
  ['Children and students', <>Many of our learners are students. We do not knowingly collect personal information from children without a parent, guardian or school involved. If you think a child has shared personal details with us, contact us and we will delete them.</>],
  ['Your choices', <>You can ask us what we hold about you, or ask us to correct or delete it, by emailing <a className="text-[#087F8C] underline" href="mailto:academy@gardaai.in">academy@gardaai.in</a>. You can clear the saved news feed any time by clearing this site's data in your browser.</>],
  ['Changes to this policy', <>If we change how we handle information, we will update this page and the date below.</>],
  ['Contact', <>GardaAI Academy, Patna, Bihar, India<br /><a className="text-[#087F8C] underline" href="mailto:academy@gardaai.in">academy@gardaai.in</a> • <a className="text-[#087F8C] underline" href="tel:+917632821374">+91 76328 21374</a></>],
];

export const PrivacyView: React.FC = () => (
  <Sheet bg={C.paper} z={10} className="pt-14 pb-20">
    <Wrap className="max-w-3xl">
      <span className="mono-label inline-block text-[11px] font-bold border border-[#087F8C] text-[#087F8C] px-2.5 py-0.5">Legal</span>
      <h1 className="font-serif font-black text-4xl sm:text-5xl mt-3 text-[#101820]">Privacy Policy</h1>
      <p className="mt-2 text-sm text-[#645e52]">Last updated: 25 September 2026</p>
      <div className="mt-8 space-y-8">
        {SECTIONS.map(([h, body]) => (
          <section key={h}>
            <h2 className="font-serif font-bold text-2xl text-[#101820]">{h}</h2>
            <div className="mt-2 leading-relaxed text-[#3b3a37]">{body}</div>
          </section>
        ))}
      </div>
    </Wrap>
  </Sheet>
);
