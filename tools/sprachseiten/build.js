/**
 * Erzeugt alle Sprach-Landingpages aus EINER Vorlage + texte.js.
 *
 *   node tools/sprachseiten/build.js
 *
 * Warum ein Generator: Bei 28 Sprachen müsste sonst jede Änderung (neuer
 * Abschnitt, neuer Link, neues Brevo-Formular) 28-mal von Hand gemacht werden.
 * So ist es eine Änderung an einer Stelle.
 *
 * Deutsch (index.html) wird NICHT erzeugt — die Startseite ist handgemacht
 * und deutlich umfangreicher. Sie bekommt nur hreflang + Sprachwähler gepflegt
 * (siehe hreflangBlock() / waehlerBlock(), die auch index.html aktualisieren).
 */
const fs = require('fs');
const path = require('path');

const { SPRACHEN, TEXTE } = require('./texte.js');
const AUS = path.join(__dirname, '..', '..', 'webseite');
const BASIS = 'https://behoerdenklar.de';
const BREVO = 'https://86550585.sibforms.com/serve/MUIFAAvOQCpFg148k-xD2Ze2PDVKKaFEIaLECCCMe9fGKd_uIurPljyn_IhTrkR0EkM_pQp_8VBzcHZ6N9sKDX5GBZi9elYKN6isXGPUUxcAgO37OKhTFZyMlJiC9ikRmPI8Q2tU2GvqP6esJ5ReGfv1htZV_OfXRIgW59P6pkeUsYKxqdXA7nWOaWxNTYz4MzzoGg7czJMJ2fxuEg==';

/** Alle Sprachen inkl. Deutsch, in der Reihenfolge aus texte.js. */
const ALLE = [{ code: 'de', eigenname: 'Deutsch', datei: 'index.html', pfad: '/' }].concat(
  SPRACHEN.map((s) => ({ ...s, datei: `${s.code}.html`, pfad: `/${s.code}` }))
);

/** hreflang-Satz — identisch auf JEDER Seite, sonst wertet Google ihn ab. */
function hreflangBlock() {
  return (
    ALLE.map((s) => `  <link rel="alternate" hreflang="${s.code}" href="${BASIS}${s.pfad}">`).join('\n') +
    `\n  <link rel="alternate" hreflang="x-default" href="${BASIS}/">`
  );
}

/**
 * Sprachwähler als Auswahlliste. Bei 28 Sprachen wäre eine Linkleiste
 * unbenutzbar — ein Aufklappmenü bleibt auch auf dem Handy bedienbar.
 * Google findet die Seiten trotzdem: über hreflang und die Sitemap.
 */
function waehlerBlock(aktiv, label) {
  const optionen = ALLE.map(
    (s) =>
      `      <option value="${s.datei}" lang="${s.code}"${s.code === aktiv ? ' selected' : ''}>${s.eigenname}</option>`
  ).join('\n');
  return `    <nav class="sprachen" aria-label="${label}">
      🌐
      <select class="sprachwahl" onchange="if(this.value)location.href=this.value">
${optionen}
      </select>
    </nav>`;
}

const WAEHLER_CSS = `
    .sprachwahl {
      font-family: inherit; font-size: 15px; color: var(--tinte);
      background: #fff; border: 1.5px solid var(--tinte); padding: 6px 10px;
      max-width: 220px; cursor: pointer;
    }`;

/**
 * Strukturierte Daten je Sprachseite. Beschreibung und Sprache kommen aus
 * texte.js, damit Google die Seite in der jeweiligen Sprache einordnet —
 * ein deutscher Block auf der tuerkischen Seite waere widerspruechlich.
 */
function schemaBlock(s, t) {
  const daten = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BehördenKlar',
    description: t.beschreibung,
    applicationCategory: 'AccessibilityApplication',
    operatingSystem: 'iOS, Web',
    inLanguage: ALLE.map((x) => x.code),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    author: { '@type': 'Organization', name: 'Webklar GbR', url: BASIS },
  };
  const faq = faqSchema(t);
  const inhalt = faq ? [daten, faq] : daten;
  return JSON.stringify(inhalt, null, 2)
    .split('\n').map((z) => '  ' + z).join('\n');
}

/**
 * Sitemap mit Sprach-Angaben (xhtml:link). Google erkennt die Alternativen
 * dadurch auch ohne die HTML-Tags — doppelt haelt besser, gerade bei 28 Sprachen.
 * Die Nicht-Sprachseiten (Demo, Ratgeber) bleiben unveraendert bestehen.
 */
function sitemapSchreiben() {
  const pfad = path.join(AUS, 'sitemap.xml');
  const heute = new Date().toISOString().slice(0, 10);
  const alt = fs.existsSync(pfad) ? fs.readFileSync(pfad, 'utf8') : '';
  const andere = (alt.match(/<url>.*?<\/url>/gs) || []).filter(
    (u) => /\/(demo|ratgeber)/.test(u)
  );

  const sprachLinks = ALLE.map(
    (x) => `    <xhtml:link rel="alternate" hreflang="${x.code}" href="${BASIS}${x.pfad}"/>`
  ).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${BASIS}/"/>`;

  const bloecke = ALLE.map(
    (x) => `  <url>\n    <loc>${BASIS}${x.pfad}</loc>\n    <lastmod>${heute}</lastmod>\n${sprachLinks}\n  </url>`
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...bloecke,
    ...andere.map((u) => '  ' + u.replace(/\s+/g, ' ')),
    '</urlset>',
  ].join('\n');
  fs.writeFileSync(pfad, xml + '\n', 'utf8');
  return ALLE.length + andere.length;
}

/** Sichtbare Fragen — Google verlangt, dass das Schema sichtbaren Text spiegelt. */
function faqHtml(t) {
  return (t.faq || [])
    .map((f) => `      <details>\n        <summary>${f.f}</summary>\n        <p>${f.a}</p>\n      </details>`)
    .join('\n');
}

/** Dazu passendes FAQPage-Schema — gleiche Fragen, gleiche Sprache. */
function faqSchema(t) {
  if (!t.faq || !t.faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.f,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function seite(s) {
  const t = TEXTE[s.code];
  if (!t) throw new Error('Keine Texte für ' + s.code);
  const rtl = s.rtl ? ' dir="rtl"' : '';
  const vorlage = fs.readFileSync(path.join(__dirname, 'vorlage.html'), 'utf8');

  return vorlage
    .replace(/\{\{LANG\}\}/g, s.code)
    .replace(/\{\{DIR\}\}/g, rtl)
    .replace(/\{\{LOCALE\}\}/g, t.locale || s.code)
    .replace(/\{\{TITEL\}\}/g, t.titel)
    .replace(/\{\{BESCHREIBUNG\}\}/g, t.beschreibung)
    .replace(/\{\{OG_TITEL\}\}/g, t.ogTitel)
    .replace(/\{\{OG_BESCHREIBUNG\}\}/g, t.ogBeschreibung)
    .replace(/\{\{URL\}\}/g, `${BASIS}/${s.code}`)
    .replace(/\{\{HREFLANG\}\}/g, hreflangBlock())
    .replace(/\{\{WAEHLER_CSS\}\}/g, WAEHLER_CSS)
    .replace(/\{\{SCHEMA\}\}/g, schemaBlock(s, t))
    .replace(/\{\{S4_TITEL\}\}/g, t.s4Titel || 'FAQ')
    .replace(/\{\{FAQ_HTML\}\}/g, faqHtml(t))
    .replace(/\{\{WAEHLER\}\}/g, waehlerBlock(s.code, t.navLabel))
    .replace(/\{\{H1_A\}\}/g, t.h1a)
    .replace(/\{\{H1_B\}\}/g, t.h1b)
    .replace(/\{\{INTRO\}\}/g, t.intro)
    .replace(/\{\{CTA_HERO\}\}/g, t.ctaHero)
    .replace(/\{\{STEMPEL\}\}/g, t.stempel)
    .replace(/\{\{S1_TITEL\}\}/g, t.s1Titel)
    .replace(/\{\{VORHER_LABEL\}\}/g, t.vorherLabel)
    .replace(/\{\{PFEIL\}\}/g, t.pfeil)
    .replace(/\{\{NACHHER_LABEL\}\}/g, t.nachherLabel)
    .replace(/\{\{NACHHER_TEXT\}\}/g, t.nachherText)
    .replace(/\{\{HINWEIS\}\}/g, t.hinweis)
    .replace(/\{\{S2_TITEL\}\}/g, t.s2Titel)
    .replace(/\{\{SCHRITT1_T\}\}/g, t.schritt1T).replace(/\{\{SCHRITT1_B\}\}/g, t.schritt1B)
    .replace(/\{\{SCHRITT2_T\}\}/g, t.schritt2T).replace(/\{\{SCHRITT2_B\}\}/g, t.schritt2B)
    .replace(/\{\{SCHRITT3_T\}\}/g, t.schritt3T).replace(/\{\{SCHRITT3_B\}\}/g, t.schritt3B)
    .replace(/\{\{S3_TITEL\}\}/g, t.s3Titel)
    .replace(/\{\{FORMULAR_KOPF\}\}/g, t.formularKopf)
    .replace(/\{\{FORM_H3\}\}/g, t.formH3)
    .replace(/\{\{FORM_TEXT\}\}/g, t.formText)
    .replace(/\{\{BONUS\}\}/g, t.bonus)
    .replace(/\{\{BREVO\}\}/g, BREVO)
    .replace(/\{\{EMAIL_PLATZHALTER\}\}/g, t.emailPlatzhalter)
    .replace(/\{\{CTA_FORM\}\}/g, t.ctaForm)
    .replace(/\{\{KLEIN\}\}/g, t.klein)
    .replace(/\{\{DATENSCHUTZ\}\}/g, t.datenschutz)
    .replace(/\{\{IMPRESSUM\}\}/g, t.impressum)
    .replace(/\{\{FUSS_FRAGE\}\}/g, t.fussFrage);
}

let n = 0;
for (const s of SPRACHEN) {
  fs.writeFileSync(path.join(AUS, `${s.code}.html`), seite(s), 'utf8');
  n++;
}

// index.html (Deutsch, handgemacht) mitpflegen: hreflang + Sprachwähler
const idxPfad = path.join(AUS, 'index.html');
let idx = fs.readFileSync(idxPfad, 'utf8');
idx = idx.replace(
  /(  <link rel="alternate" hreflang="[\s\S]*?hreflang="x-default"[^>]*>)/,
  hreflangBlock()
);
idx = idx.replace(
  /    <nav class="sprachen"[\s\S]*?<\/nav>/,
  waehlerBlock('de', 'Sprache wählen')
);
if (!idx.includes('.sprachwahl {')) {
  idx = idx.replace('  </style>', WAEHLER_CSS + '\n  </style>');
}
fs.writeFileSync(idxPfad, idx, 'utf8');

const urls = sitemapSchreiben();
console.log(`${n} Sprachseiten erzeugt + index.html aktualisiert (${ALLE.length} Sprachen) + sitemap.xml mit ${urls} URLs`);
