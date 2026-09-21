/**
 * Gesundheits-Check für BehördenKlar.
 *
 *   node tools/pruefung.js
 *
 * Prüft in EINEM Durchlauf alles, was in der Vergangenheit schon einmal
 * still kaputt war — ohne dass es jemand gemerkt hat:
 *
 *   - Warteliste-Formular (war 6 Wochen kaputt: Adresse abgeschnitten)
 *   - abgeschnittene Zeilen "[...]" (ein Werkzeug kürzte auf 200 Zeichen)
 *   - ungültige strukturierte Daten (Google meldete "Fehlerhafter Aufbau")
 *   - tote Verweise auf Dateien, die es nicht gibt (manifest.json lieferte HTML)
 *   - Bezahlung, KI-Analyse und Webhook — die drei Dinge, an denen Geld hängt
 *
 * Rückgabewert 0 = alles in Ordnung, 1 = mindestens ein Problem.
 * Nach jedem Deploy ausführen. Dauert etwa 30 Sekunden.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const WEB = path.join(__dirname, '..', 'webseite');
const BASIS = 'https://behoerdenklar.de';
const WORKER = 'https://behoerdenklar-proxy.behoerdenbrief.workers.dev';
const BREVO_LAENGE = 248; // vollständige Formular-Adresse

let fehler = 0;
let warnungen = 0;

function ok(text) { console.log('  \x1b[32m✓\x1b[0m ' + text); }
function schlecht(text) { console.log('  \x1b[31m✗ ' + text + '\x1b[0m'); fehler++; }
function warnung(text) { console.log('  \x1b[33m!\x1b[0m ' + text); warnungen++; }
function titel(text) { console.log('\n\x1b[1m' + text + '\x1b[0m'); }

/** Holt eine Adresse. curl statt fetch, damit es überall gleich läuft. */
function hole(url, optionen = []) {
  try {
    return execFileSync('curl', ['-s', '--max-time', '30', ...optionen, url],
      { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  } catch { return ''; }
}
function status(url) {
  try {
    return execFileSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--max-time', '30', url],
      { encoding: 'utf8' }).trim();
  } catch { return '000'; }
}
function htmlDateien() {
  const raus = [];
  (function lauf(ordner) {
    for (const eintrag of fs.readdirSync(ordner, { withFileTypes: true })) {
      const p = path.join(ordner, eintrag.name);
      if (eintrag.isDirectory()) lauf(p);
      else if (eintrag.name.endsWith('.html')) raus.push(p);
    }
  })(WEB);
  return raus;
}

// ─────────────────────────────────────────────────────────────
titel('1. Abgeschnittene Texte');
{
  const betroffen = htmlDateien().filter((p) => fs.readFileSync(p, 'utf8').includes('[...]'));
  if (betroffen.length) betroffen.forEach((p) => schlecht('abgeschnitten: ' + path.relative(WEB, p)));
  else ok('keine Datei enthält "[...]"');
}

titel('2. Warteliste-Formular');
{
  let geprueft = 0;
  for (const p of htmlDateien()) {
    const s = fs.readFileSync(p, 'utf8');
    const t = s.match(/action="(https:\/\/86550585[^"]*)"/);
    if (!t) continue;
    geprueft++;
    if (t[1].length !== BREVO_LAENGE) {
      schlecht(`${path.relative(WEB, p)}: Adresse ${t[1].length} statt ${BREVO_LAENGE} Zeichen — Anmeldungen gehen ins Leere!`);
    }
  }
  if (geprueft && !fehler) ok(`${geprueft} Formulare, alle Adressen vollständig`);
  if (!geprueft) warnung('kein Warteliste-Formular gefunden');
}

titel('3. Strukturierte Daten (Google)');
{
  let anzahl = 0, kaputt = 0;
  for (const p of htmlDateien()) {
    const s = fs.readFileSync(p, 'utf8');
    for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      anzahl++;
      try { JSON.parse(m[1]); }
      catch (e) { kaputt++; schlecht(`${path.relative(WEB, p)}: ${e.message.slice(0, 60)}`); }
    }
  }
  if (!kaputt) ok(`${anzahl} Blöcke, alle gültig`);
}

titel('4. Verwiesene Dateien vorhanden');
{
  const fehlend = new Set();
  for (const p of htmlDateien()) {
    const s = fs.readFileSync(p, 'utf8');
    for (const m of s.matchAll(/(?:href|src)="(\/[^"#?]*\.(?:png|jpg|svg|json|ico|webmanifest))"/g)) {
      const ziel = path.join(WEB, m[1]);
      if (!fs.existsSync(ziel)) fehlend.add(m[1]);
    }
  }
  if (fehlend.size) [...fehlend].forEach((f) => schlecht(`verlinkt, existiert aber nicht: ${f}`));
  else ok('alle verlinkten Dateien vorhanden');
}

titel('5. Preise stimmen zwischen Worker und Seiten überein');
{
  const worker = fs.readFileSync(path.join(__dirname, '..', 'proxy', 'src', 'index.ts'), 'utf8');
  const imWorker = new Set([...worker.matchAll(/'(price_[A-Za-z0-9]+)'/g)].map((m) => m[1]));
  const aufSeiten = new Set();
  for (const p of htmlDateien()) {
    for (const m of fs.readFileSync(p, 'utf8').matchAll(/(price_[A-Za-z0-9]+)/g)) aufSeiten.add(m[1]);
  }
  const unbekannt = [...aufSeiten].filter((x) => !imWorker.has(x));
  if (unbekannt.length) unbekannt.forEach((x) => schlecht(`Seite nutzt ${x}, Worker kennt ihn nicht — Kauf würde scheitern`));
  else ok(`${aufSeiten.size} Preis-IDs, alle dem Worker bekannt`);
}

titel('6. Alle Seiten der Sitemap erreichbar');
{
  const sm = fs.readFileSync(path.join(WEB, 'sitemap.xml'), 'utf8');
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const tot = urls.filter((u) => status(u) !== '200');
  if (tot.length) tot.forEach((u) => schlecht('nicht erreichbar: ' + u));
  else ok(`${urls.length} Adressen, alle liefern 200`);
}

titel('7. Bezahlung (echtes Geld)');
{
  const worker = fs.readFileSync(path.join(__dirname, '..', 'proxy', 'src', 'index.ts'), 'utf8');
  const preise = [...worker.matchAll(/'(price_[A-Za-z0-9]+)'/g)].map((m) => m[1]);
  for (const preis of preise) {
    const a = hole(`${WORKER}/kaufen`, ['-X', 'POST', '-H', 'origin: ' + BASIS,
      '-H', 'content-type: application/json', '-d', JSON.stringify({ priceId: preis })]);
    if (a.includes('cs_live_')) ok(`${preis.slice(0, 20)}… öffnet echte Bezahlseite`);
    else if (a.includes('cs_test_')) warnung(`${preis.slice(0, 20)}… ist im TESTMODUS — es fließt kein echtes Geld`);
    else schlecht(`${preis.slice(0, 20)}… KAUF GEHT NICHT: ${a.slice(0, 90)}`);
  }
  // Fremde Seiten dürfen nicht kaufen können
  const fremd = hole(`${WORKER}/kaufen`, ['-X', 'POST', '-H', 'origin: https://fremde-seite.de',
    '-H', 'content-type: application/json', '-d', JSON.stringify({ priceId: preise[0] })]);
  if (fremd.includes('"origin"')) ok('fremde Webseiten werden abgewiesen');
  else schlecht('SICHERHEIT: fremde Webseiten können Bezahlseiten erzeugen');
}

titel('8. Webhook (Wiederherstellungs-Mail)');
{
  const a = hole(`${WORKER}/stripe-webhook`, ['-X', 'POST',
    '-H', 'stripe-signature: t=1,v1=deadbeef', '-H', 'content-type: application/json', '-d', '{}']);
  if (a.includes('Signatur ungültig')) ok('Secret gesetzt, Signaturprüfung greift');
  else if (a.includes('nicht konfiguriert')) schlecht('STRIPE_WEBHOOK_SECRET fehlt — keine Wiederherstellungs-Mail!');
  else if (a.includes('Signatur fehlt')) ok('Signaturprüfung greift');
  else schlecht('Webhook antwortet unerwartet: ' + a.slice(0, 70));
}

titel('9. KI-Analyse');
{
  const a = hole(`${WORKER}/`, ['-X', 'POST', '-H', 'content-type: application/json',
    '-H', 'x-geraete-id: g_pruefunglauf0000000000ab', '-d',
    JSON.stringify({ model: 'claude-haiku-4-5', max_tokens: 8, messages: [{ role: 'user', content: 'Sag nur: OK' }] })]);
  if (a.includes('"text"')) ok('KI antwortet');
  else if (a.includes('authentication_error')) schlecht('ANTHROPIC-SCHLÜSSEL UNGÜLTIG — keine Analyse möglich!');
  else if (a.includes('credit balance')) schlecht('ANTHROPIC-GUTHABEN LEER — bitte aufladen');
  else schlecht('KI antwortet nicht: ' + a.slice(0, 90));
}

titel('10. Bot-Schutz auf der Demo-Seite');
{
  const s = hole(BASIS + '/demo');
  if (s.includes('cf-turnstile') && s.includes('data-sitekey="0x')) ok('Turnstile eingebunden');
  else schlecht('Turnstile fehlt — Missbrauch auf deine Kosten möglich');
}

// ─────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(56));
if (fehler === 0 && warnungen === 0) console.log('\x1b[32m\x1b[1mAlles in Ordnung.\x1b[0m');
else if (fehler === 0) console.log(`\x1b[33m${warnungen} Hinweis(e), keine Fehler.\x1b[0m`);
else console.log(`\x1b[31m\x1b[1m${fehler} Problem(e)\x1b[0m` + (warnungen ? `, ${warnungen} Hinweis(e)` : ''));
console.log('─'.repeat(56));
process.exit(fehler ? 1 : 0);
