import React, { useEffect, useRef, useState } from 'react';
import './chatbot.css';

const WA_FALLBACK = 'Connection issue. WhatsApp +91 7632821374';
const QUICK = ['Live Bootcamp Details', 'Pricing & Offers', 'School Workshop', 'How to Enroll'];
type Msg = { role: 'user' | 'assistant'; text: string };
const WELCOME: Msg = { role: 'assistant', text: 'Hello! Welcome to GardaAI Academy.\n\nI can help you with our live bootcamp, pricing, school workshops, and enrollment.' };

export const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [quick, setQuick] = useState(true);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState('');
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [msgs, busy, open]);

  const send = async (t: string) => {
    t = t.trim();
    if (!t || busy) return;
    const next: Msg[] = [...msgs, { role: 'user', text: t }];
    setMsgs(next); setQuick(false); setText(''); setBusy(true);
    let reply = WA_FALLBACK;
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // the welcome message is UI-only; the API wants the conversation to start with a user turn
        body: JSON.stringify({ messages: next.slice(1).map((m) => ({ role: m.role, content: m.text })) }),
      });
      if (r.ok) reply = (await r.json()).reply || 'Sorry, WhatsApp us at +91 7632821374';
    } catch { /* keep fallback */ }
    setMsgs((m) => [...m, { role: 'assistant', text: reply }]);
    setBusy(false);
  };

  return (
    <div id="gcw">
      <div id="gcwin" className={open ? 'open' : ''} role="dialog" aria-label="GardaAI Assistant" aria-hidden={!open}>
        <div className="gc-hd">
          <div className="gc-av">🤖</div>
          <div className="gc-nfo"><h3>GardaAI Assistant</h3><p><span className="gc-gd" /> Online</p></div>
          <button className="gc-x" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>
        <div className="gc-msgs" aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`gc-m ${m.role === 'user' ? 'gc-u' : 'gc-b'}`}>
              <div className="gc-ma">{m.role === 'user' ? '👤' : '🤖'}</div>
              <div className="gc-mb">{m.text}</div>
            </div>
          ))}
          {quick && <div className="gc-qr">{QUICK.map((q) => <button key={q} className="gc-qb" onClick={() => send(q)}>{q}</button>)}</div>}
          {busy && <div className="gc-m gc-b"><div className="gc-ma">🤖</div><div className="gc-td"><span /><span /><span /></div></div>}
          <div ref={end} />
        </div>
        <div className="gc-ia">
          <textarea
            value={text} rows={1} placeholder="Ask anything..." maxLength={1000} aria-label="Your message"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(text); } }}
          />
          <button className="gc-sb" disabled={busy} onClick={() => send(text)} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
        <div className="gc-pw">Powered by <span>GardaAI</span></div>
      </div>
      <button id="gcb" onClick={() => setOpen(!open)} aria-label={open ? 'Close chat' : 'Open chat'}>
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" aria-hidden="true">
          <g className="gcf">
            <rect x="27.5" y="2" width="3" height="7" rx="1.5" fill="rgba(255,255,255,.8)" />
            <circle cx="29" cy="2" r="3" className="gcad" />
            <circle cx="29" cy="31" r="24" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
            <circle cx="6" cy="29" r="4" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.4)" />
            <circle cx="6" cy="29" r="1.8" fill="white" opacity=".7" />
            <circle cx="52" cy="29" r="4" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.4)" />
            <circle cx="52" cy="29" r="1.8" fill="white" opacity=".7" />
            <rect x="12" y="20" width="14" height="13" rx="5" fill="rgba(0,0,0,.3)" />
            <g className="gcel"><ellipse cx="19" cy="26" rx="5.5" ry="5.5" fill="white" /><circle cx="19" cy="26" r="3.2" fill="#0C1B1E" /><circle cx="20.5" cy="24.5" r="1.4" fill="white" /></g>
            <rect x="32" y="20" width="14" height="13" rx="5" fill="rgba(0,0,0,.3)" />
            <g className="gcer"><ellipse cx="39" cy="26" rx="5.5" ry="5.5" fill="white" /><circle cx="39" cy="26" r="3.2" fill="#0C1B1E" /><circle cx="40.5" cy="24.5" r="1.4" fill="white" /></g>
            <ellipse cx="14" cy="36" rx="5" ry="3" fill="white" opacity=".18" className="gcck" />
            <ellipse cx="44" cy="36" rx="5" ry="3" fill="white" opacity=".18" className="gcck" />
            <path d="M19 38 Q29 45 39 38" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </g>
        </svg>
        {!open && <div className="gcb-dot" />}
      </button>
    </div>
  );
};
