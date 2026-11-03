// Derlenmiş siteyi (dist/) kullanıcı adı + şifre korumasıyla sunar.
// Kullanım: önce `npm run build`, sonra `npm start`.
// Ayarlar ortam değişkenlerinden okunur: PANEL_USER, PANEL_PASS, PORT (varsayılan 80).

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { timingSafeEqual } from 'node:crypto';

const USER = process.env.PANEL_USER;
const PASS = process.env.PANEL_PASS;
const PORT = Number(process.env.PORT) || 80;
const ROOT = resolve('dist');

if (!USER || !PASS) {
  console.error('HATA: PANEL_USER ve PANEL_PASS ayarlanmamış. Şifresiz başlatılmadı.');
  process.exit(1);
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
};

const expected = Buffer.from(`${USER}:${PASS}`);

function authorized(req) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Basic ')) return false;
  const given = Buffer.from(Buffer.from(header.slice(6), 'base64').toString());
  return given.length === expected.length && timingSafeEqual(given, expected);
}

createServer(async (req, res) => {
  if (!authorized(req)) {
    res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Kontrol Paneli", charset="UTF-8"' });
    return res.end('Giriş gerekli');
  }

  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  } catch {
    res.writeHead(400);
    return res.end();
  }
  let file = normalize(join(ROOT, urlPath));
  if (file !== ROOT && !file.startsWith(ROOT + sep)) {
    res.writeHead(403);
    return res.end();
  }

  try {
    let data;
    try {
      data = await readFile(file);
    } catch {
      file = join(ROOT, 'index.html'); // React sayfaları için
      data = await readFile(file);
    }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(500);
    res.end('Site derlenmemiş. Önce "npm run build" çalıştırın.');
  }
}).listen(PORT, () => {
  console.log(`Kontrol Paneli çalışıyor: http://localhost:${PORT}`);
});
