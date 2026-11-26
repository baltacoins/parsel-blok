// Derlemeden önce oyun dosyasını denetler: dosyalar yerinde mi, JavaScript sözdizimi temiz mi,
// uygulama internete bağımlı kalmış mı (Google Fonts gibi dış bağlantılar).
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const html = readFileSync('www/index.html', 'utf8');
const hata = [];
for (const f of ['www/fonts/fredoka-latin-wght-normal.woff2', 'www/fonts/fredoka-latin-ext-wght-normal.woff2'])
  if (!existsSync(f)) hata.push('Eksik dosya: ' + f);
if (/https?:\/\/(fonts\.googleapis|fonts\.gstatic|cdn)/.test(html)) hata.push('Uygulama dış bir adrese bağlanıyor; çevrimdışı çalışmaz.');
const m = html.match(/<script>([\s\S]*)<\/script>/);
if (!m) hata.push('Oyun betiği bulunamadı.');
else {
  writeFileSync('/tmp/parsel-oyun.js', m[1]);
  try { execFileSync(process.execPath, ['--check', '/tmp/parsel-oyun.js'], { stdio: 'pipe' }); }
  catch (e) { hata.push('JavaScript sözdizimi hatası:\n' + e.stderr.toString()); }
}
if (hata.length) { console.error(hata.join('\n')); process.exit(1); }
console.log('Oyun dosyası temiz (' + Math.round(html.length / 1024) + ' KB).');
