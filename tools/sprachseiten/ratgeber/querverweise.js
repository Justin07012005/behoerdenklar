/**
 * Kasten „Passt auch zu Ihrem Brief“ unter jedem DEUTSCHEN Ratgeber (vor der
 * blauen Werbebox) — wird von tools/sprachseiten/build.js gepflegt.
 *
 * Zuordnung: welcher Ratgeber auf welche drei anderen verweist. Der Linktext
 * ist die Überschrift (H1) des Zielratgebers und wird beim Bauen aus dessen
 * Datei gelesen — eine geänderte Überschrift landet so automatisch überall.
 *
 * Die übersetzten Ratgeber haben ihre eigene Liste („weitere Ratgeber in Ihrer
 * Sprache“, siehe bauen.js).
 */
const fs = require('fs');
const path = require('path');

const QUERVERWEISE = {
  'widerspruch-einlegen': ['jobcenter-mitwirkungsaufforderung', 'auf-behoerdenbrief-antworten', 'auslaenderbehoerde-termin-aufenthaltstitel'],
  'jobcenter-mitwirkungsaufforderung': ['widerspruch-einlegen', 'auf-behoerdenbrief-antworten', 'behoerdenbrief-verstehen'],
  'auf-behoerdenbrief-antworten': ['widerspruch-einlegen', 'behoerdenbrief-verstehen', 'behoerdenpost-organisieren'],
  'behoerdenbrief-verstehen': ['behoerdenbrief-uebersetzen', 'jobcenter-mitwirkungsaufforderung', 'auf-behoerdenbrief-antworten'],
  'behoerdenbrief-uebersetzen': ['behoerdenbrief-verstehen', 'auslaenderbehoerde-termin-aufenthaltstitel', 'auf-behoerdenbrief-antworten'],
  'auslaenderbehoerde-termin-aufenthaltstitel': ['behoerdenbrief-uebersetzen', 'behoerdenbrief-verstehen', 'widerspruch-einlegen'],
  'behoerdenpost-organisieren': ['behoerdenbrief-verstehen', 'auf-behoerdenbrief-antworten', 'mahnung-inkasso-was-tun'],
  'steuerbescheid-finanzamt-einspruch': ['widerspruch-einlegen', 'mahnung-inkasso-was-tun', 'bussgeldbescheid-einspruch'],
  'bussgeldbescheid-einspruch': ['widerspruch-einlegen', 'steuerbescheid-finanzamt-einspruch', 'mahnung-inkasso-was-tun'],
  'mahnung-inkasso-was-tun': ['versicherung-zahlt-nicht', 'steuerbescheid-finanzamt-einspruch', 'behoerdenpost-organisieren'],
  'nebenkostenabrechnung-pruefen': ['kuendigung-wohnung-eigenbedarf', 'versicherung-zahlt-nicht', 'mahnung-inkasso-was-tun'],
  'kuendigung-wohnung-eigenbedarf': ['nebenkostenabrechnung-pruefen', 'auf-behoerdenbrief-antworten', 'versicherung-zahlt-nicht'],
  'versicherung-zahlt-nicht': ['mahnung-inkasso-was-tun', 'nebenkostenabrechnung-pruefen', 'kuendigung-wohnung-eigenbedarf'],
};

const START = '<!-- passt-auch:start';
const ENDE = '<!-- passt-auch:ende -->';

function ueberschrift(AUS, slug) {
  const datei = path.join(AUS, 'ratgeber', `${slug}.html`);
  if (!fs.existsSync(datei)) throw new Error(`Querverweis auf ${slug}: Datei fehlt`);
  const m = fs.readFileSync(datei, 'utf8').match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!m) throw new Error(`${slug}: keine <h1> gefunden`);
  return m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().replace(/&(?![a-z]+;|#\d+;)/g, '&amp;');
}

function pflegen(AUS) {
  let n = 0;
  for (const [slug, ziele] of Object.entries(QUERVERWEISE)) {
    const datei = path.join(AUS, 'ratgeber', `${slug}.html`);
    let s = fs.readFileSync(datei, 'utf8');
    const links = ziele.map((z) => `        <li><a href="/ratgeber/${z}">${ueberschrift(AUS, z)}</a></li>`);
    const block =
      `    ${START} (gepflegt von tools/sprachseiten/build.js, Zuordnung in ratgeber/querverweise.js) -->\n` +
      `    <div class="kurz">\n` +
      `      <h2>Passt auch zu Ihrem Brief</h2>\n` +
      `      <ul>\n${links.join('\n')}\n      </ul>\n` +
      `    </div>\n` +
      `    ${ENDE}`;
    const a = s.indexOf(START);
    if (a !== -1) {
      const e = s.indexOf(ENDE, a);
      if (e === -1) throw new Error(`${datei}: ${ENDE} fehlt`);
      s = s.slice(0, s.lastIndexOf('\n', a) + 1) + block + s.slice(e + ENDE.length);
    } else {
      if (!/^ *<div class="cta-box">/m.test(s)) throw new Error(`${datei}: blaue Werbebox nicht gefunden`);
      s = s.replace(/^ *<div class="cta-box">/m, (m) => block + '\n\n' + m);
    }
    fs.writeFileSync(datei, s, 'utf8');
    n++;
  }
  return n;
}

module.exports = { QUERVERWEISE, pflegen };
