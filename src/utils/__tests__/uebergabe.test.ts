/// <reference types="node" />
/**
 * Übergabe Handy ↔ PC: App und Webseite müssen die Päckchen gegenseitig lesen.
 *
 * Die Web-Seite wird hier mit WebCrypto nachgebaut — exakt wie in
 * webseite/uebergabe.js. Für die App läuft die echte Web-Implementierung von
 * expo-crypto (gleiche Kombi-Reihenfolge IV‖Chiffrat‖Tag wie nativ).
 */
jest.mock('expo-crypto/build/aes/ExpoCryptoAES', () => jest.requireActual('expo-crypto/build/aes/ExpoCryptoAES.web'));

import { webcrypto } from 'crypto';
import { holeAusUebergabe, oeffneUebergabe, sendeAnUebergabe } from '../../services/uebergabe';
import { briefZuWebPaket, leseUebergabeLink, webPaketZuBrief } from '../uebergabeFormat';
import { BriefEintrag } from '../../types';

const subtle = webcrypto.subtle;
const b64u = (b: Uint8Array) => Buffer.from(b).toString('base64url');

// --- Web-Seite (wie webseite/uebergabe.js) ---
async function webSchluessel(k: string) {
  return subtle.importKey('raw', Buffer.from(k, 'base64url'), { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}
async function webVerschluesseln(k: string, daten: unknown) {
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await subtle.encrypt({ name: 'AES-GCM', iv }, await webSchluessel(k), new TextEncoder().encode(JSON.stringify(daten))));
  return b64u(Buffer.concat([iv, ct]));
}
async function webEntschluesseln(k: string, text: string) {
  const b = Buffer.from(text, 'base64url');
  const klar = await subtle.decrypt({ name: 'AES-GCM', iv: b.subarray(0, 12) }, await webSchluessel(k), b.subarray(12));
  return JSON.parse(new TextDecoder().decode(klar));
}

const ID = 'v1wRNjDlmRZeGSS_YRiRVA';
const KEY = b64u(webcrypto.getRandomValues(new Uint8Array(32)));
const link = (a: string) => `https://behoerdenklar.de/demo#a=${a}&s=${ID}&k=${KEY}&l=ar&d=1`;

const ANALYSE_DE = {
  brieftyp: 'Aufforderung', absender: 'Ausländerbehörde', kernaussage: 'Unterlagen fehlen.',
  erklaerung_einfach: 'Bitte bis 12.11. einreichen.', fachbegriffe: [{ begriff: 'Fiktionsbescheinigung', erklaerung: 'Papier' }],
  frist: { datum: '2026-11-12', aktion: 'Unterlagen einreichen' }, termin: null, checkliste: ['Pass'],
  kontakt: { telefon: '069 90009-314' }, anruf: [],
};
const ANALYSE_AR = { ...ANALYSE_DE, kernaussage: 'المستندات ناقصة.', checkliste: ['جواز السفر'] };

describe('leseUebergabeLink', () => {
  it('liest Kamera- und Mitnehmen-Codes', () => {
    expect(leseUebergabeLink(link('k'))).toMatchObject({ art: 'k', id: ID, schluessel: KEY, basis: 'https://behoerdenklar-proxy.behoerdenbrief.workers.dev' });
    expect(leseUebergabeLink(link('m'))?.art).toBe('m');
  });
  it('nimmt beim lokalen Test den lokalen Worker', () => {
    expect(leseUebergabeLink(`http://localhost:4173/demo.html#a=m&s=${ID}&k=${KEY}`)?.basis).toBe('http://localhost:8799');
  });
  it('lehnt fremde Seiten und kaputte Codes ab', () => {
    expect(leseUebergabeLink(`https://boese.example/demo#a=m&s=${ID}&k=${KEY}`)).toBeNull();
    expect(leseUebergabeLink('https://behoerdenklar.de/demo#a=m&s=kurz&k=kurz')).toBeNull();
    expect(leseUebergabeLink('Hallo')).toBeNull();
  });
});

describe('Verschlüsselung App ↔ Webseite', () => {
  const fetchOriginal = global.fetch;
  afterEach(() => { global.fetch = fetchOriginal; });

  it('App liest, was die Webseite verschlüsselt hat', async () => {
    const chiffrat = await webVerschluesseln(KEY, { analyse: ANALYSE_AR, analyse_de: ANALYSE_DE, sprache: 'ar' });
    global.fetch = jest.fn(async () => new Response(JSON.stringify({ faecher: { ergebnis: chiffrat, fremd: 'QUJD' } }))) as typeof fetch;
    const u = await oeffneUebergabe(leseUebergabeLink(link('m'))!);
    const faecher = await holeAusUebergabe(u);
    expect(faecher.ergebnis).toEqual({ analyse: ANALYSE_AR, analyse_de: ANALYSE_DE, sprache: 'ar' });
    expect(faecher.fremd).toBeUndefined(); // nicht entschlüsselbar → ignoriert
  });

  it('Webseite liest, was die App verschlüsselt hat', async () => {
    let gesendet = '';
    let adresse = '';
    global.fetch = jest.fn(async (url: string, opt: RequestInit) => {
      adresse = url;
      gesendet = String(opt.body);
      return new Response(null, { status: 204 });
    }) as unknown as typeof fetch;
    const u = await oeffneUebergabe(leseUebergabeLink(link('k'))!);
    await sendeAnUebergabe(u, 'ergebnis', { analyse: ANALYSE_DE, sprache: 'de' });
    expect(adresse).toBe(`https://behoerdenklar-proxy.behoerdenbrief.workers.dev/uebergabe/${ID}/ergebnis`);
    expect(gesendet).toMatch(/^[A-Za-z0-9_-]+$/); // base64url, wie der Worker verlangt
    expect(await webEntschluesseln(KEY, gesendet)).toEqual({ analyse: ANALYSE_DE, sprache: 'de' });
  });
});

describe('Umwandeln Web ↔ App', () => {
  it('Ergebnis vom PC wird ein Brief: Deutsch als Grundlage, Arabisch als Übersetzung', () => {
    const b = webPaketZuBrief({ analyse: ANALYSE_AR, analyse_de: ANALYSE_DE, sprache: 'ar' }, 'id1', new Date('2026-10-29T10:00:00Z'));
    expect(b.analyse.kernaussage).toBe('Unterlagen fehlen.');
    expect(b.analyse.frist).toEqual({ datum: '2026-11-12', aktion: 'Unterlagen einreichen' });
    expect(b.analyse.antwort_noetig).toBe(false);
    expect(b.uebersetzungen.ar.kernaussage).toBe('المستندات ناقصة.');
    expect(b.erstelltAm).toBe('2026-10-29T10:00:00.000Z');
  });
  it('rein deutsches Ergebnis hat keine Übersetzung', () => {
    const b = webPaketZuBrief({ analyse: ANALYSE_DE, sprache: 'de' }, 'id2', new Date());
    expect(b.analyse.kernaussage).toBe('Unterlagen fehlen.');
    expect(b.uebersetzungen).toEqual({});
  });
  it('Brief aus dem Archiv geht zweisprachig an den PC', () => {
    const brief = webPaketZuBrief({ analyse: ANALYSE_AR, analyse_de: ANALYSE_DE, sprache: 'ar' }, 'id3', new Date());
    const p = briefZuWebPaket(brief as BriefEintrag);
    expect(p.sprache).toBe('ar');
    expect(p.analyse.kernaussage).toBe('المستندات ناقصة.');
    expect(p.analyse.frist).toEqual(ANALYSE_DE.frist);
    expect(p.analyse_de?.kernaussage).toBe('Unterlagen fehlen.');
  });
});
