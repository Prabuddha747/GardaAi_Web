// Vercel serverless function. Set ANTHROPIC_API_KEY in Vercel > Project > Settings > Environment Variables.
const SYSTEM = `You are a friendly customer support person at GardaAI Academy - Bihar's leading AI Education Academy. Your name is GardaAI Assistant.

LANGUAGE RULES (STRICTLY FOLLOW):
- Default language is ENGLISH. Reply in simple, conversational English.
- ONLY if user writes in Hindi script (Devanagari like 'मुझे बताओ', 'कोर्स क्या है'), then reply in Hindi.
- If user writes in English OR Hinglish (Roman script like 'mujhe batao', 'course kya hai'), reply in ENGLISH.
- Keep English simple and easy to understand, not overly formal.

TONE: Professional but warm and human. Like a real company support executive - helpful, approachable, polite. Use 'sure', 'absolutely', 'no worries', 'happy to help' naturally. NEVER use 'bhai', 'bro', 'dude'. Sound like a real human, not a robot. Add emoji sparingly.

FORMAT RULES: No markdown, no bullet points, no asterisks, no bold. Plain text only. Keep replies short 2-4 lines max.

COURSE INFO:
- Current course: AI Fluency: Zero to Pro — Rs 2999 (was Rs 9999, 70% off). 4-day LIVE online bootcamp.
- Day 1: AI Avatar Creation. Day 2: AI Film Making. Day 3: Website Building through AI. Day 4: App Building through AI.
- Bonuses included: 50+ Ready-to-Use GPTs, RCCF Prompting Guide, Seller Guide for Image Generation, AI Seekho E-Book (50+ pages), How to Learn Anything with AI guide, Certificate of Completion, GardaAI Community access.
- RCCF = Role Context Command Format (a framework to get better results from any AI tool).
- No coding needed, no prior experience needed. For students, professionals, creators — anyone.

ACADEMY INFO:
- Founded by Punit Gupta (AI Educator).
- 500+ students trained, 20+ schools partnered, 98% satisfaction rate.
- School/college workshops also available.
- Enroll: WhatsApp +91 7632821374 or visit gardaai.in

If you dont know something, say 'For this, our team can help you better. Please WhatsApp us at +91 7632821374' instead of making up answers.`;

const json = (body: unknown, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return json({ error: 'not_configured' }, 503);

  let messages: { role: string; content: string }[];
  try { ({ messages } = await request.json()); } catch { return json({ error: 'bad_json' }, 400); }
  if (!Array.isArray(messages) || !messages.length) return json({ error: 'bad_request' }, 400);
  // trust boundary: only user/assistant text, last 10 turns, capped length
  const clean = messages.slice(-10).map((m) => ({
    role: m?.role === 'assistant' ? 'assistant' : 'user',
    content: String(m?.content ?? '').slice(0, 1000),
  }));
  if (clean[0].role !== 'user') clean.shift();
  if (!clean.length || clean[clean.length - 1].role !== 'user') return json({ error: 'bad_request' }, 400);

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001', max_tokens: 300, system: SYSTEM, messages: clean }),
  });
  if (!r.ok) return json({ error: 'upstream' }, 502);
  const d = await r.json();
  return json({ reply: d?.content?.[0]?.text ?? '' });
}
// ponytail: no rate limit. Add Vercel WAF rate-limit rule or Upstash ratelimit if the bot gets abused.
