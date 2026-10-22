/**
 * Design-System — wie die Webseite behoerdenklar.de: ein Amtsbrief, der
 * endlich verständlich ist. Papier, Tinte, Amtsblau, gelber Textmarker,
 * Georgia-Serifenschrift, Etiketten in Schreibmaschinenschrift.
 *
 * - Große Schrift (Basis 18) für die Zielgruppe
 * - Hoher Kontrast (Tinte auf Papier, WCAG AA)
 * - Große Touch-Targets (min. 56px Höhe)
 *
 * Die Werte entsprechen den CSS-Variablen der Webseite (--papier, --tinte,
 * --amtsblau, --marker, --stempelrot …). Ändert sich dort etwas, hier mitziehen.
 */
import { Platform, TextStyle, ViewStyle } from 'react-native';

export const farben = {
  hintergrund: '#FAF7F0',      // Papier (--papier)
  flaeche: '#FFFFFF',          // weißes Formularblatt (Karten, Felder)
  flaecheSekundaer: '#F1ECDF', // dunkleres Papier (--papier-dunkel)
  primaer: '#1D4E89',          // Amtsblau (Icons, aktive Tabs, Links)
  primaerFuellung: '#1D4E89',  // Amtsblau — gefüllte Knöpfe
  primaerText: '#FFFFFF',      // Text auf gefüllten Knöpfen
  text: '#21211D',             // Tinte
  textSekundaer: '#6B675E',    // Grau (--grau)
  textTertiaer: '#9A958A',     // helles Grau (Platzhalter, Chevrons)
  rand: 'rgba(33,33,29,0.22)', // dünne Linie wie auf der Webseite
  tinte: '#21211D',            // harte Rahmen und Schatten
  marker: '#FFE66B',           // gelber Textmarker (Signatur der Marke)
  stempelrot: '#B3372B',
  // Hervorhebung = Textmarker (z. B. aktive Filter)
  hervorhebung: '#FFE66B',
  hervorhebungRand: '#21211D',

  // Dringlichkeits-Ampel wie auf der Webseite (--rot, --gelb, --gruen),
  // Gelb etwas dunkler, damit es als Text auf hellem Grund WCAG AA erreicht.
  ampelRot: '#B3372B',
  ampelGelb: '#8A5A00',
  ampelGruen: '#2E7D4F',
  ampelRotHintergrund: '#FDF1EF',
  ampelGelbHintergrund: '#FFF6D6',
  ampelGruenHintergrund: '#E7F4EA',

  fehler: '#B3372B',
};

/** Schriften der Webseite: Georgia (Text) und Courier (Etiketten). */
export const schriftart = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }) as string,
  mono: Platform.select({ ios: 'Courier New', android: 'monospace', default: 'Courier New' }) as string,
};

export const schrift = {
  klein: 15,
  basis: 18,
  gross: 21,
  titel: 26,
  riesig: 32,
};

export const abstand = {
  xs: 6,
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
};

/** Mindesthöhe für alle interaktiven Elemente (Barrierefreiheit). */
export const TOUCH_TARGET = 56;

/** Papier hat (fast) keine runden Ecken. */
export const ecke = 2;

/** Karte wie `.brief-karte` der Webseite: weißes Blatt, feine Linie, flacher Schatten. */
export const kartenSchatten: ViewStyle = {
  borderWidth: 1,
  borderColor: 'rgba(33,33,29,0.28)',
  boxShadow: '4px 5px 0px rgba(33,33,29,0.08)',
};

/** Formular wie `.antrag`: Tinten-Rahmen mit hartem Versatz-Schatten. */
export const formularRahmen: ViewStyle = {
  borderWidth: 2,
  borderColor: farben.tinte,
  boxShadow: '6px 7px 0px rgba(33,33,29,0.9)',
};

/** Etikett wie `h2`/`.karten-label` der Webseite: Schreibmaschine, Versalien. */
export const etikett: TextStyle = {
  fontFamily: schriftart.mono,
  fontSize: 13,
  letterSpacing: 1.4,
  textTransform: 'uppercase',
};
