import path from 'node:path';
import fs from 'fs-extra';
import { fetchGitHubProfile } from './github.js';
import { renderPortfolio } from './template.js';

const css = `
:root { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #e5e7eb; background: #070b13; }
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; background: radial-gradient(circle at top left, #1d4ed8 0, transparent 35%), #070b13; }
main { width: min(1100px, 92vw); margin: 0 auto; padding: 56px 0; }
.hero { padding: 42px; border: 1px solid rgba(255,255,255,.12); border-radius: 28px; background: rgba(255,255,255,.06); box-shadow: 0 24px 80px rgba(0,0,0,.35); }
.hero img { width: 96px; height: 96px; border-radius: 50%; border: 3px solid rgba(255,255,255,.2); }
.eyebrow { color: #93c5fd; text-transform: uppercase; letter-spacing: .18em; font-size: 12px; font-weight: 700; }
h1 { font-size: clamp(42px, 8vw, 82px); line-height: .95; margin: 12px 0; }
.bio { max-width: 680px; color: #cbd5e1; font-size: 20px; line-height: 1.7; }
.stats, .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
.stats span { padding: 10px 14px; border: 1px solid rgba(255,255,255,.1); border-radius: 999px; color: #dbeafe; }
a { color: inherit; text-decoration: none; }
.actions a, .card a { display: inline-block; padding: 12px 16px; border-radius: 14px; background: #2563eb; font-weight: 700; }
section { margin-top: 44px; }
.section-title p { color: #93c5fd; margin: 0; font-weight: 700; }
.section-title h2 { font-size: 36px; margin: 6px 0 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
.card { padding: 22px; border: 1px solid rgba(255,255,255,.12); border-radius: 22px; background: rgba(15,23,42,.8); }
.card-top { display: flex; justify-content: space-between; gap: 12px; align-items: start; }
.card h3 { margin: 0; font-size: 20px; }
.card-top span { color: #fde68a; font-size: 13px; }
.card p { color: #cbd5e1; line-height: 1.6; min-height: 76px; }
.repo-meta { color: #93c5fd; margin-bottom: 18px; }
.terminal { background: #050505; color: #d1fae5; }
.terminal .hero, .terminal .card { border-color: #10b981; background: rgba(0,0,0,.72); }
.terminal .actions a, .terminal .card a { background: #10b981; color: #02110b; }
`;

export async function generatePortfolio({ username, outDir, theme = 'default' }) {
  const absoluteOut = path.resolve(process.cwd(), outDir);
  const data = await fetchGitHubProfile(username);
  const html = renderPortfolio({ ...data, theme });

  await fs.ensureDir(absoluteOut);
  await fs.writeFile(path.join(absoluteOut, 'index.html'), html);
  await fs.writeFile(path.join(absoluteOut, 'style.css'), css);

  return {
    outDir: absoluteOut,
    indexPath: path.join(absoluteOut, 'index.html')
  };
}
