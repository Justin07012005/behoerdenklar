/**
 * Einrichtungs-Codes für Beratungsstellen anlegen und verwalten.
 *
 *   node tools/einrichtungs-code.js neu "MBE Donnersberg" MBE --briefe 100 --monate 1
 *   node tools/einrichtungs-code.js stand MBE-K7QX
 *   node tools/einrichtungs-code.js aufladen MBE-K7QX 100
 *   node tools/einrichtungs-code.js verlaengern MBE-K7QX 2027-06-30
 *
 * Ein Code ist ein Guthaben wie beim Kauf, das allen gehört, die den Code
 * kennen. Die Ratsuchenden zahlen nichts, die Einrichtung zahlt (oder testet
 * gratis). Gilt bis zum Ablaufdatum oder bis die Briefe aufgebraucht sind.
 *
 * Braucht nur den wrangler-Login (npx wrangler login), kein Secret.
 * Link für Handzettel/QR-Code: https://behoerdenklar.de/demo?code=<CODE>
 */
const { execFileSync } = require('child_process');
const crypto = require('crypto');
const path = require('path');

const PROXY = path.join(__dirname, '..', 'proxy');
const KV_ID = '7577adef8ceb4ed6bfaeef81a1d496af'; // RATE_LIMIT aus proxy/wrangler.toml
// ohne 0/O, 1/I/L: am Telefon und auf Papier nicht zu verwechseln
const ZEICHEN = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function kv(...args) {
  return execFileSync('npx', ['wrangler', 'kv', 'key', ...args, '--namespace-id', KV_ID, '--remote'],
    { cwd: PROXY, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}
function lies(schluessel) {
  try { return kv('get', schluessel, '--text'); } catch { return null; }
}
function schreib(schluessel, wert) { kv('put', schluessel, wert); }

function option(name, standard) {
  const i = process.argv.indexOf('--' + name);
  return i > 0 ? process.argv[i + 1] : standard;
}
function abbruch(text) { console.error('\x1b[31m' + text + '\x1b[0m'); process.exit(1); }

function zufall(laenge) {
  let s = '';
  for (const b of crypto.randomBytes(laenge)) s += ZEICHEN[b % ZEICHEN.length];
  return s;
}

function plusMonate(monate) {
  const d = new Date();
  d.setMonth(d.getMonth() + monate);
  return d.toISOString().slice(0, 10);
}

function ladeCode(code) {
  code = String(code || '').toUpperCase();
  const walletId = lies(`code:${code}`);
  if (!walletId) abbruch(`Code ${code} gibt es nicht.`);
  const einrichtung = JSON.parse(lies(`einrichtung:${walletId}`) || '{}');
  const rest = parseInt(lies(`wallet:${walletId}`) || '0', 10);
  return { code, walletId, einrichtung, rest };
}

function zeige({ code, einrichtung, rest }) {
  const heute = new Date().toISOString().slice(0, 10);
  console.log(`
  Einrichtung:  ${einrichtung.name}
  Code:         \x1b[1m${code}\x1b[0m
  Übrig:        ${rest} Briefe
  Gültig bis:   ${einrichtung.ablauf}${einrichtung.ablauf < heute ? '  \x1b[31m(abgelaufen)\x1b[0m' : ''}
  Link:         https://behoerdenklar.de/demo?code=${code}
`);
}

const [befehl, a, b] = process.argv.slice(2);

if (befehl === 'neu') {
  const name = a;
  const praefix = String(b || '').toUpperCase();
  if (!name || !/^[A-Z]{2,12}$/.test(praefix)) {
    abbruch('So geht es: node tools/einrichtungs-code.js neu "MBE Donnersberg" MBE --briefe 100 --monate 1');
  }
  const briefe = parseInt(option('briefe', '100'), 10);
  const ablauf = option('bis', plusMonate(parseInt(option('monate', '1'), 10)));
  const code = `${praefix}-${zufall(4)}`;
  if (lies(`code:${code}`)) abbruch('Zufällig schon vergeben — einfach nochmal ausführen.');
  const walletId = crypto.randomUUID();
  schreib(`wallet:${walletId}`, String(briefe));
  schreib(`einrichtung:${walletId}`, JSON.stringify({ name, ablauf }));
  schreib(`code:${code}`, walletId);
  console.log('\n  \x1b[32m✓ Code angelegt\x1b[0m');
  zeige({ code, einrichtung: { name, ablauf }, rest: briefe });
} else if (befehl === 'stand') {
  zeige(ladeCode(a));
} else if (befehl === 'aufladen') {
  const c = ladeCode(a);
  const dazu = parseInt(b, 10);
  if (!(dazu > 0)) abbruch('So geht es: node tools/einrichtungs-code.js aufladen MBE-K7QX 100');
  schreib(`wallet:${c.walletId}`, String(c.rest + dazu));
  console.log(`\n  \x1b[32m✓ ${dazu} Briefe dazu\x1b[0m`);
  zeige({ ...c, rest: c.rest + dazu });
} else if (befehl === 'verlaengern') {
  const c = ladeCode(a);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b || '')) abbruch('So geht es: node tools/einrichtungs-code.js verlaengern MBE-K7QX 2027-06-30');
  const einrichtung = { ...c.einrichtung, ablauf: b };
  schreib(`einrichtung:${c.walletId}`, JSON.stringify(einrichtung));
  console.log('\n  \x1b[32m✓ verlängert\x1b[0m');
  zeige({ ...c, einrichtung });
} else {
  console.log(require('fs').readFileSync(__filename, 'utf8').split('*/')[0].replace(/^\/\*\*?|^ \* ?/gm, ''));
}
