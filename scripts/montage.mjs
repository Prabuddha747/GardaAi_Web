// node scripts/montage.mjs shots/about.png shots/m-about.png [segmentHeight]
import { chromium } from 'playwright-core';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
const [src, out, seg = 1700] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 400, height: 400 } });
await p.goto('file://' + resolve(src));
const { w, h } = await p.evaluate(() => ({ w: document.images[0].naturalWidth, h: document.images[0].naturalHeight }));
const n = Math.ceil(h / +seg);
await p.setViewportSize({ width: w * n, height: +seg });
writeFileSync('shots/.m.html', `<body style="margin:0;display:flex">${Array.from({ length: n }, (_, i) => `<div style="flex:none;width:${w}px;height:${seg}px;background:url(file://${resolve(src)}) 0 -${i * seg}px no-repeat"></div>`).join('')}</body>`);
await p.goto('file://' + resolve('shots/.m.html'));
await p.waitForTimeout(500);
await p.screenshot({ path: out });
await b.close();
