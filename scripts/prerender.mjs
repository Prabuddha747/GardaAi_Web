// Runs after `vite build` + `vite build --ssr`: writes one static HTML file per route with its own title/meta.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { render, PATHS, SEO, SITE } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const template = fs.readFileSync('dist/index.html', 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

for (const [tab, route] of Object.entries(PATHS)) {
  const { title, description } = SEO[tab];
  const url = SITE + route;
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(property="og:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, () => `<div id="root">${render(route)}</div>`);
  const out = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log('prerendered', route, `${(html.length / 1024).toFixed(0)}KB`);
}
fs.rmSync('dist-ssr', { recursive: true });
