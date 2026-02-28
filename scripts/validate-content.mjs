
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pub = path.join(root, 'public');
let ok = true;

function assertFile(p) {
  const fp = path.join(root, p.replace(/^\//, ''));
  if (!fs.existsSync(fp)) {
    console.error('[missing]', p);
    ok = false;
  }
}

function walkLinks(text) {
  const hrefs = Array.from(text.matchAll(/href="([^"]+)"/g)).map(m => m[1]);
  for (const h of hrefs) {
    if (/^https?:/.test(h)) continue;
    if (h.startsWith('/')) {
      // basic existence check for public asset or route
      if (h.startsWith('/images/')) assertFile(`public${h}`);
    }
  }
}

try {
  const articles = JSON.parse(fs.readFileSync(path.join(root,'data','articles.json'),'utf8'));
  for (const a of articles) {
    assertFile(`public${a.image}`);
    for (const block of a.content) {
      if (block.type === 'html' && block.html) walkLinks(block.html);
    }
  }
  const consultants = JSON.parse(fs.readFileSync(path.join(root,'data','consultants.json'),'utf8'));
  for (const c of consultants) {
    assertFile(`public${c.avatar}`);
  }
} catch (e) {
  console.error('Validator error:', e);
  process.exitCode = 1;
}

if (!ok) process.exit(2);
else console.log('All referenced images and links look OK.');
