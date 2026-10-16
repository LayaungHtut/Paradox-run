/*
 * Renders every raster icon from the one vector design (static/icon.svg) with Playwright's Chromium,
 * which the test suite already installs. Run after changing the icon: `npm run icons`.
 *
 * Outputs: PWA icons (static/icons), Android launcher icons (android/app/src/main/res) and Play
 * Store listing graphics (store/).
 */
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { chromium } from 'playwright';

const BG = '#070a12';
// the runner and its echo, from static/icon.svg; occupies x/y 14..48 of a 64 box, centred on 31,31
const GLYPH = `<rect x="14" y="16" width="16" height="22" rx="4" fill="#7fd3ff" opacity=".45"/><rect x="30" y="14" width="18" height="24" rx="4.5" fill="#eef2f8"/><rect x="36" y="19" width="10" height="4.5" rx="2" fill="#ffb347"/><rect x="31" y="40" width="6" height="8" rx="1.5" fill="#b9c3d6"/><rect x="41" y="40" width="6" height="8" rx="1.5" fill="#b9c3d6"/><rect x="15" y="40" width="5" height="7" rx="1.5" fill="#7fd3ff" opacity=".45"/><rect x="23" y="40" width="5" height="7" rx="1.5" fill="#7fd3ff" opacity=".45"/>`;
const GLYPH_SIZE = 34;

/** SVG of `size` px with the glyph centred, `fill` = glyph width as a fraction of the canvas. */
function icon(size, { fill, bg = BG, shape = 'square' }) {
	const s = (size * fill) / GLYPH_SIZE;
	const back =
		bg === null
			? ''
			: shape === 'circle'
				? `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${bg}"/>`
				: shape === 'rounded'
					? `<rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${bg}"/>`
					: `<rect width="${size}" height="${size}" fill="${bg}"/>`;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${back}<g transform="translate(${size / 2} ${size / 2}) scale(${s}) translate(-31 -31)">${GLYPH}</g></svg>`;
}

const FEATURE = `<!doctype html><html><body style="margin:0">
<div style="width:1024px;height:500px;background:radial-gradient(ellipse at 30% 40%,#16203a 0%,${BG} 70%);display:flex;align-items:center;gap:56px;padding:0 90px;box-sizing:border-box;font-family:'Segoe UI',Roboto,Arial,sans-serif;color:#eef2f8">
${icon(260, { fill: 0.8, bg: null })}
<div><div style="font-size:84px;font-weight:900;letter-spacing:4px;line-height:1">PARADOX<br>RUN</div>
<div style="margin-top:22px;font-size:28px;color:#7fd3ff;font-weight:600">Every run you lose runs with you.</div></div>
</div></body></html>`;

const RES = 'android/app/src/main/res';
const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };

const jobs = [
	// PWA / web
	['static/icons/icon-192.png', icon(192, { fill: 0.62, shape: 'rounded' })],
	['static/icons/icon-512.png', icon(512, { fill: 0.62, shape: 'rounded' })],
	// maskable: full bleed, glyph inside the 80% safe circle
	['static/icons/maskable-512.png', icon(512, { fill: 0.5 })],
	['static/icons/apple-touch-icon.png', icon(180, { fill: 0.6 })],
	// Play listing: 512×512 full square, Play applies its own mask
	['store/icon-512.png', icon(512, { fill: 0.62 })],
	['store/feature-graphic.png', FEATURE, { width: 1024, height: 500 }]
];
for (const [d, k] of Object.entries(DENSITIES)) {
	const legacy = Math.round(48 * k);
	const adaptive = Math.round(108 * k);
	jobs.push([`${RES}/mipmap-${d}/ic_launcher.png`, icon(legacy, { fill: 0.6, shape: 'rounded' })]);
	jobs.push([
		`${RES}/mipmap-${d}/ic_launcher_round.png`,
		icon(legacy, { fill: 0.56, shape: 'circle' })
	]);
	// adaptive foreground: 108dp canvas, only the centre 66dp is guaranteed visible
	jobs.push([
		`${RES}/mipmap-${d}/ic_launcher_foreground.png`,
		icon(adaptive, { fill: 0.44, bg: null })
	]);
}

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [out, markup, size] of jobs) {
	const html = markup.startsWith('<svg')
		? `<!doctype html><body style="margin:0;background:transparent">${markup}</body>`
		: markup;
	const w = size?.width ?? Number(/width="(\d+)"/.exec(markup)[1]);
	const h = size?.height ?? w;
	await page.setViewportSize({ width: w, height: h });
	await page.setContent(html);
	mkdirSync(dirname(out), { recursive: true });
	await page.screenshot({
		path: out,
		omitBackground: true,
		clip: { x: 0, y: 0, width: w, height: h }
	});
	console.log('wrote', out);
}
await browser.close();
