// usage: node scripts/shot.mjs <width> home,about,learn,impact [baseUrl]   (default base: vite dev on :3000; use :4173 for `npm run preview`)
import { chromium } from 'playwright-core';
const [w = 861, tabs = 'about,learn,impact', base = 'http://localhost:3000'] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: +w, height: 900 } });
p.on('console', (m) => ['error', 'warning'].includes(m.type()) && console.log(`[${m.type()}]`, m.text().slice(0, 200)));
p.on('requestfailed', (r) => console.log('[failed]', r.url()));
p.on('response', (r) => r.status() >= 400 && console.log('[' + r.status() + ']', r.url()));
for (const t of tabs.split(',')) {
  await p.goto(`${base}${t === 'home' ? '/' : '/' + t}`);
  await p.waitForTimeout(1500);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } scrollTo(0, 0); });
  await p.waitForTimeout(800);
  console.log(t, 'title:', await p.title());
  await p.screenshot({ path: `shots/${t}.png`, fullPage: true });
}
await b.close();
