/**
 * Übergabe Handy ↔ PC — reine Hilfsfunktionen ohne native Module (testbar).
 *
 * Gleiches Protokoll wie die Webseite (webseite/uebergabe.js): Der QR-Code
 * enthält hinter dem `#` eine Übergabe-ID (s), einen AES-256-Schlüssel (k)
 * und die Art der Übergabe (a):
 *   a=k  „Kamera": der PC wartet auf einen Brief  → App schickt ihn hin
 *   a=m  „Mitnehmen": der PC hat ein Ergebnis bereitgelegt → App holt es
 *   a=g  Guthaben der Webseite (gilt nur im Browser, nicht in der App)
 */
import { BriefAnalyse, BriefEintrag, Fachbegriff, Uebersetzung } from '../types';

export type UebergabeArt = 'k' | 'm' | 'g';

export interface UebergabeLink {
  art: UebergabeArt;
  id: string;
  schluessel: string; // base64url, 32 Byte
  /** Worker, der die Päckchen hält (lokal beim Testen, sonst live). */
  basis: string;
}

const LIVE_BASIS = 'https://behoerdenklar-proxy.behoerdenbrief.workers.dev';
const LOKAL_BASIS = 'http://localhost:8799';
const ERLAUBTE_SEITEN = /^https:\/\/([a-z0-9-]+\.)?behoerdenklar\.(de|pages\.dev)\//;
const LOKALE_SEITE = /^http:\/\/(localhost|127\.0\.0\.1):\d+\//;

/** Liest einen gescannten QR-Code. null = kein BehördenKlar-Code. */
export function leseUebergabeLink(text: string): UebergabeLink | null {
  const t = (text || '').trim();
  const lokal = LOKALE_SEITE.test(t);
  if (!ERLAUBTE_SEITEN.test(t) && !lokal) return null;
  const raute = t.indexOf('#');
  if (raute < 0) return null;
  const werte: Record<string, string> = {};
  for (const teil of t.slice(raute + 1).split('&')) {
    const i = teil.indexOf('=');
    if (i > 0) werte[teil.slice(0, i)] = decodeURIComponent(teil.slice(i + 1));
  }
  const art = werte.a as UebergabeArt;
  if (art === 'g') return { art, id: '', schluessel: '', basis: '' };
  if ((art !== 'k' && art !== 'm') || !/^[A-Za-z0-9_-]{22}$/.test(werte.s ?? '') || !/^[A-Za-z0-9_-]{43}$/.test(werte.k ?? '')) {
    return null;
  }
  return { art, id: werte.s, schluessel: werte.k, basis: lokal ? LOKAL_BASIS : LIVE_BASIS };
}

export function base64UrlZuBase64(s: string): string {
  const b = s.replace(/-/g, '+').replace(/_/g, '/');
  return b + '='.repeat((4 - (b.length % 4)) % 4);
}
export function base64ZuBase64Url(s: string): string {
  return s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Was die Webseite als Ergebnis schickt bzw. erwartet. */
export interface WebPaket {
  analyse: WebAnalyse;
  analyse_de?: WebAnalyse;
  sprache?: string;
}
/** Die Analyse der Webseite: wie BriefAnalyse, dafür mit Kontakt + Anruf-Hilfe. */
type WebAnalyse = Partial<BriefAnalyse> & {
  kontakt?: unknown;
  anruf?: unknown;
};

function textOder(s: unknown, ersatz = ''): string {
  return typeof s === 'string' ? s : ersatz;
}
function alsBriefAnalyse(w: WebAnalyse): BriefAnalyse {
  return {
    brieftyp: textOder(w.brieftyp, 'Brief'),
    absender: textOder(w.absender),
    kernaussage: textOder(w.kernaussage),
    erklaerung_einfach: textOder(w.erklaerung_einfach),
    fachbegriffe: Array.isArray(w.fachbegriffe) ? (w.fachbegriffe as Fachbegriff[]) : [],
    frist: w.frist ?? null,
    termin: w.termin ?? null,
    checkliste: Array.isArray(w.checkliste) ? w.checkliste.filter((x) => typeof x === 'string') : [],
    // Die Web-Analyse kennt keine Antwort-Vorschläge — die App kann sie nicht erfinden
    antwort_noetig: false,
    antwort_optionen: [],
  };
}

/** Ergebnis vom PC → Brief fürs Archiv. Deutsch ist die Grundlage, die
 *  andere Sprache landet im Übersetzungs-Cache (wie bei App-Übersetzungen). */
export function webPaketZuBrief(p: WebPaket, id: string, jetzt: Date): BriefEintrag {
  const sprache = p.sprache && p.sprache !== 'de' ? p.sprache : null;
  const deutsch = p.analyse_de ?? (sprache ? null : p.analyse);
  const basis = alsBriefAnalyse(deutsch ?? p.analyse);
  const uebersetzungen: Record<string, Uebersetzung> = {};
  if (sprache) {
    const f = alsBriefAnalyse(p.analyse);
    uebersetzungen[sprache] = {
      kernaussage: f.kernaussage,
      erklaerung_einfach: f.erklaerung_einfach,
      checkliste: f.checkliste,
      fachbegriffe: f.fachbegriffe,
    };
  }
  return { id, erstelltAm: jetzt.toISOString(), analyse: basis, uebersetzungen };
}

/** Brief aus dem Archiv → Ergebnis für den PC. Gibt es eine Übersetzung,
 *  bekommt der PC beide Sprachen (Deutsch zuerst für die Beratung). */
export function briefZuWebPaket(b: BriefEintrag): WebPaket {
  const deutsch: WebAnalyse = { ...b.analyse };
  const [sprache] = Object.keys(b.uebersetzungen ?? {});
  if (!sprache) return { analyse: deutsch, sprache: 'de' };
  return {
    analyse: { ...b.analyse, ...b.uebersetzungen[sprache] },
    analyse_de: deutsch,
    sprache,
  };
}
