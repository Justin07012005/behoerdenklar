/**
 * Ratgeber in anderen Sprachen — wird von tools/sprachseiten/build.js aufgerufen.
 *
 * Aus vorlage.html + texte-<code>.js entstehen die Seiten
 *   webseite/<code>/ratgeber/<slug>.html   →   https://behoerdenklar.de/<code>/ratgeber/<slug>
 *
 * Dazu pflegt dieser Baustein:
 *   - hreflang + Sprach-Links in den DEUTSCHEN Ratgebern (zwischen Markierungen)
 *   - den Kasten „Ratgeber in Ihrer Sprache“ in webseite/ratgeber/index.html
 *   - den Abschnitt „Ratgeber“ auf den Sprachseiten (/ar, /tr …)
 *   - die Sitemap-Einträge (mit Sprach-Alternativen)
 *
 * Inhaltliche Regeln (Fakten, was BehördenKlar kann und was nicht): QUELLE.md.
 * In den Texten steht ein deutsches Fachwort als [[Wort]]; daraus wird ein
 * hervorgehobenes Element mit lang="de" dir="ltr" (sonst springen in Arabisch
 * und Farsi Satzzeichen an die falsche Stelle).
 */
const fs = require('fs');
const path = require('path');

const BASIS = 'https://behoerdenklar.de';

/** Reihenfolge = Reihenfolge in Listen. Slug = Dateiname des deutschen Ratgebers. */
const THEMEN = [
  'behoerdenbrief-verstehen',
  'jobcenter-mitwirkungsaufforderung',
  'auslaenderbehoerde-termin-aufenthaltstitel',
];

const PFLICHT_UI = ['locale', 'start', 'ratgeber', 'testen', 'kurzTitel', 'faqTitel', 'ctaKnopf',
  'deHinweis', 'mehrTitel', 'andereSprachen', 'ratgeberTitel', 'alleSprache', 'alleDeutsch'];
const PFLICHT_ARTIKEL = ['titel', 'beschreibung', 'kurztitel', 'karte', 'brot', 'kicker', 'h1a', 'h1b',
  'intro', 'kurz', 'abschnitte', 'faq', 'hinweis', 'ctaTitel', 'ctaText'];

/** Lädt alle Sprachen, für die es texte-<code>.js gibt — in der Reihenfolge der Sprachseiten. */
function laden(SPRACHEN, TEXTE) {
  const raus = [];
  for (const s of SPRACHEN) {
    const datei = path.join(__dirname, `texte-${s.code}.js`);
    if (!fs.existsSync(datei)) continue;
    const t = require(datei);
    const wo = `ratgeber/texte-${s.code}.js`;
    for (const k of PFLICHT_UI) if (!t.ui || !t.ui[k]) throw new Error(`${wo}: ui.${k} fehlt`);
    for (const slug of THEMEN) {
      const a = t.artikel && t.artikel[slug];
      if (!a) throw new Error(`${wo}: Artikel ${slug} fehlt`);
      for (const k of PFLICHT_ARTIKEL) if (!a[k] || (Array.isArray(a[k]) && !a[k].length)) throw new Error(`${wo} ${slug}: ${k} fehlt`);
      for (const f of a.faq) {
        if (/<[a-z]/i.test(f.f + f.a)) throw new Error(`${wo} ${slug}: FAQ ohne HTML schreiben („${f.f}“)`);
      }
      pruefeKlammern(JSON.stringify(a), `${wo} ${slug}`);
    }
    raus.push({ ...s, ui: t.ui, artikel: t.artikel, impressum: TEXTE[s.code].impressum, datenschutz: TEXTE[s.code].datenschutz });
  }
  return raus;
}

function pruefeKlammern(text, wo) {
  const auf = (text.match(/\[\[/g) || []).length;
  const zu = (text.match(/\]\]/g) || []).length;
  if (auf !== zu) throw new Error(`${wo}: [[ und ]] passen nicht zusammen (${auf}/${zu})`);
}

/** [[Wort]] → hervorgehobenes deutsches Wort (HTML). */
function de(text) {
  return String(text).replace(/\[\[(.+?)\]\]/g, '<span class="de" lang="de" dir="ltr">$1</span>');
}

/** Reiner Text für <title>, Meta-Angaben und JSON-LD: ohne [[ ]] und ohne Tags. */
function klar(text) {
  return String(text).replace(/\[\[(.+?)\]\]/g, '$1').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function attr(text) {
  return klar(text).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlDe(slug) { return `${BASIS}/ratgeber/${slug}`; }
function urlSprache(code, slug) { return `${BASIS}/${code}/ratgeber/${slug}`; }
function pfadSprache(code, slug) { return `/${code}/ratgeber/${slug}`; }

/** Alle Fassungen eines Themas: Deutsch zuerst. */
function fassungen(slug, sprachen) {
  return [{ code: 'de', url: urlDe(slug), pfad: `/ratgeber/${slug}`, eigenname: 'Deutsch' }].concat(
    sprachen.map((s) => ({ code: s.code, url: urlSprache(s.code, slug), pfad: pfadSprache(s.code, slug), eigenname: s.eigenname, rtl: s.rtl }))
  );
}

/** hreflang-Satz — auf allen Fassungen eines Themas identisch. */
function hreflang(slug, sprachen) {
  return fassungen(slug, sprachen)
    .map((f) => `  <link rel="alternate" hreflang="${f.code}" href="${f.url}">`)
    .concat(`  <link rel="alternate" hreflang="x-default" href="${urlDe(slug)}">`)
    .join('\n');
}

function sprachLink(f) {
  const dir = f.rtl ? ' dir="rtl"' : '';
  return `<a href="${f.pfad}" hreflang="${f.code}" lang="${f.code}"${dir}>${f.eigenname}</a>`;
}

function absaetze(inhalt, einzug) {
  const liste = Array.isArray(inhalt) ? inhalt : [inhalt];
  return liste.map((p) => `${einzug}<p>${de(p)}</p>`).join('\n');
}

function schema(a) {
  const daten = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: a.faq.map((f) => ({
      '@type': 'Question',
      name: klar(f.f),
      acceptedAnswer: { '@type': 'Answer', text: klar(f.a) },
    })),
  };
  return JSON.stringify(daten, null, 2).split('\n').map((z) => '  ' + z).join('\n');
}

function fuellen(vorlage, werte) {
  const html = vorlage.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, k) => {
    if (!(k in werte)) throw new Error('Platzhalter ohne Wert: ' + k);
    return werte[k];
  });
  return html;
}

function seite(s, slug, sprachen, vorlage) {
  const a = s.artikel[slug];
  const ui = s.ui;
  const andere = fassungen(slug, sprachen).filter((f) => f.code !== s.code);
  const mehr = THEMEN.filter((x) => x !== slug).map((x) => {
    const b = s.artikel[x];
    return `      <li><a href="${pfadSprache(s.code, x)}"><b>${de(b.kurztitel)}</b><span>${de(b.karte)}</span></a></li>`;
  });

  return fuellen(vorlage, {
    LANG: s.code,
    DIR: s.rtl ? ' dir="rtl"' : '',
    LOCALE: ui.locale,
    TITEL: attr(a.titel) + ' | BehördenKlar',
    BESCHREIBUNG: attr(a.beschreibung),
    OG_TITEL: attr(a.ogTitel || a.titel),
    OG_BESCHREIBUNG: attr(a.ogBeschreibung || a.beschreibung),
    URL: urlSprache(s.code, slug),
    HREFLANG: hreflang(slug, sprachen),
    SCHEMA: schema(a),
    TESTEN: de(ui.testen),
    START: de(ui.start),
    RATGEBER: de(ui.ratgeber),
    BROT: de(a.brot),
    KICKER: de(a.kicker),
    H1_A: de(a.h1a),
    H1_B: de(a.h1b),
    INTRO: absaetze(a.intro, '    '),
    DE_HINWEIS: de(ui.deHinweis),
    KURZ_TITEL: de(ui.kurzTitel),
    KURZ: a.kurz.map((x) => `        <li>${de(x)}</li>`).join('\n'),
    ABSCHNITTE: a.abschnitte.map((x) => `    <h2>${de(x.h2)}</h2>\n    ${de(x.html).trim()}`).join('\n\n'),
    FAQ_TITEL: de(ui.faqTitel),
    FAQ_HTML: a.faq.map((f) => `      <h3>${de(f.f)}</h3>\n      <p>${de(f.a)}</p>`).join('\n'),
    HINWEIS: de(a.hinweis),
    CTA_TITEL: de(a.ctaTitel),
    CTA_TEXT: de(a.ctaText),
    CTA_KNOPF: de(ui.ctaKnopf),
    PFEIL: s.rtl ? '←' : '→',
    MEHR_TITEL: de(ui.mehrTitel),
    MEHR: mehr.join('\n'),
    ALLE_SPRACHE: de(ui.alleSprache),
    ALLE_DEUTSCH: de(ui.alleDeutsch),
    ANDERE_SPRACHEN: de(ui.andereSprachen),
    SPRACH_LINKS: andere.map(sprachLink).join(' · '),
    IMPRESSUM: s.impressum,
    DATENSCHUTZ: s.datenschutz,
  });
}

/** Ersetzt den Bereich zwischen zwei Markierungen — oder fügt ihn nach `nach` ein. */
function zwischen(text, name, inhalt, nach, datei) {
  const start = `<!-- ${name}:start`;
  const ende = `<!-- ${name}:ende -->`;
  const a = text.indexOf(start);
  if (a !== -1) {
    const zeilenAnfang = text.lastIndexOf('\n', a) + 1;
    const e = text.indexOf(ende, a);
    if (e === -1) throw new Error(`${datei}: Markierung ${name}:ende fehlt`);
    return text.slice(0, zeilenAnfang) + inhalt + text.slice(e + ende.length);
  }
  const m = text.match(nach);
  if (!m) throw new Error(`${datei}: Einfügestelle für ${name} nicht gefunden`);
  const i = m.index + m[0].length;
  return text.slice(0, i) + '\n' + inhalt + text.slice(i);
}

/** Deutsche Ratgeber: hreflang im Kopf + sichtbare Links zu den Übersetzungen. */
function deutschePflegen(AUS, sprachen) {
  for (const slug of THEMEN) {
    const datei = path.join(AUS, 'ratgeber', `${slug}.html`);
    let s = fs.readFileSync(datei, 'utf8');
    s = zwischen(s, 'sprachen',
      `  <!-- sprachen:start (gepflegt von tools/sprachseiten/build.js) -->\n${hreflang(slug, sprachen)}\n  <!-- sprachen:ende -->`,
      /^ *<link rel="canonical"[^>]*>/m, datei);
    const links = fassungen(slug, sprachen).filter((f) => f.code !== 'de').map(sprachLink).join(' · ');
    s = zwischen(s, 'sprachwahl',
      `    <!-- sprachwahl:start (gepflegt von tools/sprachseiten/build.js) -->\n` +
      `    <p class="brot" style="margin-top:6px">🌐 Auch in Ihrer Sprache: ${links}</p>\n` +
      `    <!-- sprachwahl:ende -->`,
      /^ *<p class="brot">.*<\/p>/m, datei);
    fs.writeFileSync(datei, s, 'utf8');
  }
}

/** Übersicht /ratgeber/: Kasten mit allen Übersetzungen. */
function indexPflegen(AUS, sprachen) {
  const datei = path.join(AUS, 'ratgeber', 'index.html');
  let s = fs.readFileSync(datei, 'utf8');
  const karten = sprachen.map((x) => {
    const dir = x.rtl ? ' dir="rtl"' : '';
    const links = THEMEN.map((slug) => `<a href="${pfadSprache(x.code, slug)}">${klar(x.artikel[slug].kurztitel)}</a>`).join(' · ');
    return `      <li>\n        <div class="artikel-karte" lang="${x.code}"${dir}>\n          <b>${x.eigenname}</b>\n          <span>${links}</span>\n        </div>\n      </li>`;
  });
  const block =
    `    <!-- sprachen-ratgeber:start (gepflegt von tools/sprachseiten/build.js) -->\n` +
    `    <h2 id="sprachen" style="font-size:23px;margin:40px 0 6px">Ratgeber in Ihrer Sprache</h2>\n` +
    `    <p>Die wichtigsten Ratgeber gibt es auch auf Arabisch, Türkisch, Ukrainisch, Russisch und Farsi. Die deutschen Fachwörter bleiben stehen, damit Sie sie im Brief wiederfinden.</p>\n` +
    `    <ul class="artikel-liste">\n${karten.join('\n')}\n    </ul>\n` +
    `    <!-- sprachen-ratgeber:ende -->`;
  s = zwischen(s, 'sprachen-ratgeber', block, /<\/ul>(?=\s*<footer>)/, datei);
  fs.writeFileSync(datei, s, 'utf8');
}

/** Abschnitt für die Sprachseite /<code> — leer, wenn es dort keine Ratgeber gibt. */
function abschnittSprachseite(code, sprachen) {
  const x = sprachen.find((s) => s.code === code);
  if (!x) return '';
  const karten = THEMEN.map((slug) => {
    const a = x.artikel[slug];
    return `        <li><a href="${pfadSprache(code, slug)}"><b>${de(a.kurztitel)}</b><span>${de(a.karte)}</span></a></li>`;
  });
  return `
    <section id="ratgeber">
      <h2>§ 6 &nbsp;${de(x.ui.ratgeberTitel)}</h2>
      <ul class="rg-liste">
${karten.join('\n')}
      </ul>
    </section>
`;
}

/** Sitemap-Blöcke: die deutschen Fassungen und alle Übersetzungen, jeweils mit Alternativen. */
function sitemapBloecke(sprachen, heute) {
  const bloecke = [];
  for (const slug of THEMEN) {
    const alle = fassungen(slug, sprachen);
    const links = alle.map((f) => `    <xhtml:link rel="alternate" hreflang="${f.code}" href="${f.url}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${urlDe(slug)}"/>`).join('\n');
    for (const f of alle) {
      bloecke.push({ loc: f.url, xml: `  <url>\n    <loc>${f.url}</loc>\n    <lastmod>${heute}</lastmod>\n${links}\n  </url>` });
    }
  }
  return bloecke;
}

/** Alles bauen. Gibt die Zahl der Seiten zurück. */
function bauen(AUS, sprachen) {
  const vorlage = fs.readFileSync(path.join(__dirname, 'vorlage.html'), 'utf8');
  let n = 0;
  for (const s of sprachen) {
    const ordner = path.join(AUS, s.code, 'ratgeber');
    fs.mkdirSync(ordner, { recursive: true });
    for (const slug of THEMEN) {
      fs.writeFileSync(path.join(ordner, `${slug}.html`), seite(s, slug, sprachen, vorlage), 'utf8');
      n++;
    }
  }
  if (sprachen.length) {
    deutschePflegen(AUS, sprachen);
    indexPflegen(AUS, sprachen);
  }
  return n;
}

module.exports = { THEMEN, laden, bauen, abschnittSprachseite, sitemapBloecke, de, klar };
