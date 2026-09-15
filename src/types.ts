/**
 * Zentrale Typdefinitionen für BehördenKlar.
 * Die Feldnamen entsprechen exakt dem JSON-Schema, das die Claude API
 * per Structured Output garantiert zurückliefert (siehe services/analyse.ts).
 */

/** Ampel-Stufen für die Dringlichkeit eines Briefs. */
export type Dringlichkeit = 'rot' | 'gelb' | 'gruen';

/** Vorlagen-Typen für den Antwort-Generator. */
export type AntwortTyp =
  | 'terminbestaetigung'
  | 'terminverschiebung'
  | 'widerspruch'
  | 'unterlagen_nachreichen'
  | 'rueckfrage';

export const ANTWORT_TYP_LABEL: Record<AntwortTyp, string> = {
  terminbestaetigung: 'Termin bestätigen',
  terminverschiebung: 'Termin verschieben',
  widerspruch: 'Widerspruch einlegen',
  unterlagen_nachreichen: 'Unterlagen nachreichen',
  rueckfrage: 'Rückfrage stellen',
};

/** Ein im Brief gefundener Fachbegriff mit einfacher Erklärung. */
export interface Fachbegriff {
  begriff: string;
  erklaerung: string;
}

/** Eine erkannte Frist ("Antwort bis TT.MM.JJJJ"). Datum ist ISO (JJJJ-MM-TT). */
export interface Frist {
  datum: string;
  aktion: string;
}

/** Ein erkannter Termin (z. B. Vorsprache beim Amt). Datum ist ISO. */
export interface Termin {
  datum: string;
  uhrzeit: string | null;
  ort: string | null;
}

/** Das strukturierte Analyse-Ergebnis eines gescannten Briefs. */
export interface BriefAnalyse {
  brieftyp: string;
  absender: string;
  /** "Was will das Amt von mir?" — 2-3 Sätze, A2-Niveau. */
  kernaussage: string;
  /** Ausführlichere Erklärung in einfacher Sprache (A2/B1). */
  erklaerung_einfach: string;
  fachbegriffe: Fachbegriff[];
  frist: Frist | null;
  termin: Termin | null;
  /** To-do-Liste: was der Nutzer tun / mitbringen muss. */
  checkliste: string[];
  antwort_noetig: boolean;
  antwort_optionen: AntwortTyp[];
}

/** Übersetzung der wichtigsten Analyse-Teile in eine Zielsprache. */
export interface Uebersetzung {
  kernaussage: string;
  erklaerung_einfach: string;
  checkliste: string[];
  fachbegriffe: Fachbegriff[];
}

/** Ein gespeicherter Brief im lokalen Archiv. */
export interface BriefEintrag {
  id: string;
  /** ISO-Zeitstempel der Erstellung. */
  erstelltAm: string;
  analyse: BriefAnalyse;
  /** Cache: Sprachcode -> fertige Übersetzung (spart API-Kosten). */
  uebersetzungen: Record<string, Uebersetzung>;
  antwortEntwurf?: {
    typ: AntwortTyp;
    betreff: string;
    text: string;
  };
}

/** Eine unterstützte Zielsprache für die Übersetzung. */
export interface Sprache {
  /** ISO-Code, wird an die KI übergeben. */
  code: string;
  /** Deutscher Name (für die UI). */
  name: string;
  /** Name in der Sprache selbst (damit Nutzer ihre Sprache erkennen). */
  eigenname: string;
  /** Schrift läuft von rechts nach links (Arabisch, Farsi, Urdu, Paschtu). */
  rtl?: boolean;
}

/**
 * Zielsprachen für die Übersetzung — grob nach Größe der jeweiligen
 * Sprachgemeinschaft in Deutschland sortiert, damit die häufigsten oben
 * stehen und man nicht lange scrollen muss.
 */
export const SPRACHEN: Sprache[] = [
  { code: 'tr', name: 'Türkisch', eigenname: 'Türkçe' },
  { code: 'ar', name: 'Arabisch', eigenname: 'العربية', rtl: true },
  { code: 'ru', name: 'Russisch', eigenname: 'Русский' },
  { code: 'uk', name: 'Ukrainisch', eigenname: 'Українська' },
  { code: 'pl', name: 'Polnisch', eigenname: 'Polski' },
  { code: 'ro', name: 'Rumänisch', eigenname: 'Română' },
  { code: 'en', name: 'Englisch', eigenname: 'English' },
  { code: 'fa', name: 'Farsi / Dari', eigenname: 'فارسی', rtl: true },
  { code: 'ku', name: 'Kurdisch (Kurmancî)', eigenname: 'Kurdî' },
  { code: 'bg', name: 'Bulgarisch', eigenname: 'Български' },
  { code: 'hr', name: 'Kroatisch', eigenname: 'Hrvatski' },
  { code: 'sr', name: 'Serbisch', eigenname: 'Српски' },
  { code: 'bs', name: 'Bosnisch', eigenname: 'Bosanski' },
  { code: 'sq', name: 'Albanisch', eigenname: 'Shqip' },
  { code: 'it', name: 'Italienisch', eigenname: 'Italiano' },
  { code: 'el', name: 'Griechisch', eigenname: 'Ελληνικά' },
  { code: 'es', name: 'Spanisch', eigenname: 'Español' },
  { code: 'pt', name: 'Portugiesisch', eigenname: 'Português' },
  { code: 'fr', name: 'Französisch', eigenname: 'Français' },
  { code: 'hu', name: 'Ungarisch', eigenname: 'Magyar' },
  { code: 'vi', name: 'Vietnamesisch', eigenname: 'Tiếng Việt' },
  { code: 'hi', name: 'Hindi', eigenname: 'हिन्दी' },
  { code: 'ur', name: 'Urdu', eigenname: 'اردو', rtl: true },
  { code: 'ps', name: 'Paschtu', eigenname: 'پښتو', rtl: true },
  { code: 'ti', name: 'Tigrinya', eigenname: 'ትግርኛ' },
  { code: 'so', name: 'Somali', eigenname: 'Soomaali' },
  { code: 'zh', name: 'Chinesisch', eigenname: '中文' },
];

/** Untere Tab-Leiste: Fristen-Übersicht · Scannen · Archiv. */
export type HauptTabParamList = {
  Fristen: undefined;
  ScanTab: undefined;
  Archiv: undefined;
};

/** Navigation: Root-Stack mit Tab-Leiste + darüber liegenden Detail-Screens. */
export type RootStackParamList = {
  Tabs: undefined;
  Consent: undefined;
  Scan: undefined;
  Analyse: { briefId: string };
  Antwort: { briefId: string };
  Glossar: undefined;
  Einstellungen: undefined;
};
