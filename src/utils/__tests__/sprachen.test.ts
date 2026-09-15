/**
 * Schützt die Sprachliste vor stillen Fehlern. Besonders wichtig: doppelte
 * Codes — Übersetzungen werden pro Code gecacht (brief.uebersetzungen[code]),
 * zwei gleiche Codes würden sich gegenseitig überschreiben.
 */
import { SPRACHEN } from '../../types';

describe('SPRACHEN', () => {
  it('hat keine doppelten Sprachcodes', () => {
    const codes = SPRACHEN.map((s) => s.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('enthält kein Deutsch (das ist die Ausgangssprache, nicht Zielsprache)', () => {
    expect(SPRACHEN.some((s) => s.code === 'de')).toBe(false);
  });

  it('hat für jede Sprache Code, Name und Eigenname', () => {
    for (const s of SPRACHEN) {
      expect(s.code).toMatch(/^[a-z]{2,3}$/);
      expect(s.name.trim().length).toBeGreaterThan(0);
      expect(s.eigenname.trim().length).toBeGreaterThan(0);
    }
  });

  it('markiert genau die Rechts-nach-links-Sprachen', () => {
    const rtl = SPRACHEN.filter((s) => s.rtl).map((s) => s.code).sort();
    expect(rtl).toEqual(['ar', 'fa', 'ps', 'ur']);
  });

  it('bietet die für Deutschland wichtigsten Sprachen an', () => {
    const codes = SPRACHEN.map((s) => s.code);
    for (const pflicht of ['tr', 'ar', 'ru', 'uk', 'pl', 'ro', 'en', 'fa']) {
      expect(codes).toContain(pflicht);
    }
  });
});
