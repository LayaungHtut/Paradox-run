/*
 * Captures Play Store phone screenshots (1920×1080, landscape) from a running build and fails on any
 * console error or CSP violation, so it doubles as a smoke test:
 *
 *   npm run build && node build          (or npm run preview)
 *   npm run screenshots -- http://127.0.0.1:3000
 */
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const base = (process.argv[2] ?? 'http://127.0.0.1:3000').replace(/\/$/, '');
const out = 'store/screenshots';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
	viewport: { width: 960, height: 540 },
	deviceScaleFactor: 2,
	isMobile: true,
	hasTouch: true
});
const page = await ctx.newPage();
const problems = [];
page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
await page.addInitScript(() =>
	document.addEventListener('securitypolicyviolation', (e) =>
		console.error(`CSP blocked ${e.blockedURI} (${e.violatedDirective})`)
	)
);

const shot = async (name) => {
	await page.waitForTimeout(700);
	await page.screenshot({ path: `${out}/${name}.png` });
	console.log('wrote', `${out}/${name}.png`);
};
const hold = async (keys, ms) => {
	for (const k of keys) await page.keyboard.down(k);
	await page.waitForTimeout(ms);
	for (const k of keys) await page.keyboard.up(k);
};

await page.goto(`${base}/`);
await shot('1-home');

// a run, a rewind (the run becomes an echo), then a second loop racing beside it
await page.goto(`${base}/play/first-echo`);
await page.waitForSelector('canvas');
await page.waitForTimeout(600);
await hold(['ArrowRight'], 900);
await hold(['ArrowRight', 'Space'], 500);
await hold(['ArrowRight'], 700);
await page.keyboard.press('KeyR');
await page.waitForTimeout(2500);
await hold(['ArrowRight'], 600);
await page.keyboard.down('ArrowRight');
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}/2-gameplay.png` });
console.log('wrote', `${out}/2-gameplay.png`);
await page.keyboard.up('ArrowRight');
await page.keyboard.press('Escape');
await shot('3-paused');

await page.goto(`${base}/levels`);
await shot('4-levels');
await page.goto(`${base}/daily`);
await shot('5-daily');
await page.goto(`${base}/settings`);
await page.waitForTimeout(300); // smoke only: not a store shot
await page.goto(`${base}/privacy`);
await page.waitForTimeout(300);

await browser.close();
if (problems.length) {
	console.error(`\n${problems.length} problem(s):\n${problems.join('\n')}`);
	process.exit(1);
}
console.log('no console errors or CSP violations');
