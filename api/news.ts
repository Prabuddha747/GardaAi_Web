// Vercel serverless function. Set NEWS_API_KEY (freenewsapi.io) in Vercel > Project > Settings > Environment Variables.
// The list endpoint has no free-text search and no images, so: page a few topics, keep AI headlines, fetch /details for image + summary.
const B = 'https://api.freenewsapi.io/v1';
const AI = /\b(AI|A\.I\.|artificial intelligence|OpenAI|ChatGPT|GPT-?\d[\w.]*|Gemini|Claude|Anthropic|Copilot|LLMs?|chatbots?|machine learning|generative|Nvidia|DeepSeek|Llama|Grok|Mistral|xAI|Perplexity|Midjourney|Sora|Qwen|Baidu|Alibaba|Huawei|Tencent|ByteDance|Moonshot|Kimi|Sarvam|Krutrim|Bhashini|IndiaAI|Reliance Intelligence|Hugging Face|deepfakes?|agentic|neural network|robotics|humanoid|Sendance)\b/i;
// [query, pages of 10]. in_title=AI is a loose substring match (hits "Malaysia"), so the AI regex above still filters.
// Local + international: India/China publisher streams alongside the global topic streams.
const STREAMS: [string, number][] = [
  ['topic=technology', 4], ['country=IN', 3], ['country=CN', 1], ['topic=education', 1], ['topic=internet%20security', 1], ['topic=business', 1],
];
const MAX = 20;

// order matters: first match wins, default "Tools"
const CATS: [string, RegExp][] = [
  ['India', /\b(india|indian|bengaluru|bangalore|delhi|mumbai|patna|bihar|hyderabad|chennai|pune|hindi|isro|sarvam|krutrim)\b/i],
  ['Education', /\b(schools?|students?|education|teachers?|universit\w*|classrooms?|curriculum|exams?|graduates?)\b/i],
  ['Safety', /\b(safety|regulat|law|scam|deepfake|privacy|security|ban|risk|policy|lawsuit|copyright|EU)\b/i],
  ['Business', /\b(startup|funding|raises|revenue|stock|invest|market|billion|acquire|ipo|earnings|jobs?)\b/i],
  ['Models', /\b(model|gemini|gpt|llama|claude|open[- ]source|llm|benchmark|research|deepseek|mistral|grok)\b/i],
];

const json = (body: unknown, status = 200, cache = '') =>
  Response.json(body, { status, headers: cache ? { 'Cache-Control': cache } : {} });

// provider allows only ~3 req/s: space requests 300ms apart (pipelined), honour retry_after_ms on a 429
let slot = 0;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function get(key: string, path: string, tries = 4): Promise<any> {
  const at = Math.max(Date.now(), slot);
  slot = at + 300;
  await sleep(at - Date.now());
  const r = await fetch(B + path, { headers: { 'x-api-key': key } });
  if (r.status === 429 && tries > 1) {
    const { retry_after_ms = 400 } = await r.json().catch(() => ({}));
    slot = Math.max(slot, Date.now() + retry_after_ms + 100); // back off every queued call, not just this one
    return get(key, path, tries - 1);
  }
  if (!r.ok) return null;
  return r.json().catch(() => null);
}

// warm-instance memo: a story's details never change, so a regen only pays for stories it hasn't seen
const known = new Map<string, any>();
const details = async (key: string, uuid: string) => {
  if (known.has(uuid)) return known.get(uuid);
  const d = await get(key, `/details?uuid=${uuid}`);
  if (d) known.set(uuid, d);
  return d;
};

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '…' : s);

export async function GET() {
  const key = process.env.NEWS_API_KEY || process.env.newsapi_key;
  if (!key) return json({ error: 'not_configured' }, 503);

  const pages = await Promise.all(
    STREAMS.flatMap(([q, n]) => Array.from({ length: n }, (_, i) => get(key, `/news?language=en&in_title=AI&${q}&offset=${i * 10}`))),
  );
  const seen = new Set<string>();
  const hits = pages
    .flatMap((p) => p?.data ?? [])
    .filter((a: any) => AI.test(a.title) && !seen.has(a.title) && seen.add(a.title))
    .sort((a: any, b: any) => b.published_at.localeCompare(a.published_at))
    .slice(0, MAX);

  const items = (await Promise.all(hits.map((h: any) => details(key, h.uuid))))
    .map((d) => d?.data ?? d)
    .filter((d) => d?.original_url)
    .map((d) => {
      const summary = clip(String(d.incipit || d.body || '').replace(/\s+/g, ' ').trim(), 240);
      return {
        id: d.uuid, title: d.title, source: d.publisher, date: d.published_at,
        image: d.thumbnail || null, summary, url: d.original_url,
        cat: CATS.find(([, re]) => re.test(`${d.title} ${summary}`))?.[0] ?? 'Tools',
      };
    });

  if (!items.length) return json({ error: 'upstream' }, 502);
  // ponytail: this IS the auto-refresh. Edge regenerates at most every 30 min (stale served meanwhile): <=48 regens x ~31 calls = ~1,500/day worst case, under the 3k budget.
  // Per-region edge caches multiply that; lengthen s-maxage if the dashboard shows drift.
  return json({ items, updated: new Date().toISOString() }, 200, 'public, s-maxage=1800, stale-while-revalidate=86400');
}
