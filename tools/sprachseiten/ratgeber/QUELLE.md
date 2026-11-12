# Ratgeber in anderen Sprachen: inhaltliche Vorgabe

Diese Datei ist die **gemeinsame Grundlage** für alle übersetzten Ratgeber
(`texte-<code>.js`). Wer eine neue Sprache anlegt oder einen Text ändert, hält
sich an diese Fakten. Die Seiten werden von `node tools/sprachseiten/build.js`
erzeugt; die HTML-Dateien unter `webseite/<code>/ratgeber/` nie von Hand ändern.

Rechtliche Grundlage sind die deutschen Ratgeber in `webseite/ratgeber/`.
**Keine Fristen, Zahlen oder Paragrafen erfinden**, die dort nicht stehen.

---

## Regeln für alle Sprachen

1. **Für die Sprache schreiben, nicht wörtlich übersetzen.** Natürliche Sätze,
   so wie Menschen aus der Sprachgemeinschaft in Deutschland reden und suchen.
2. **Einfache Sprache (A2):** kurze Sätze, ein Gedanke pro Satz, „Sie“-Form
   bzw. die höfliche Anrede der Sprache, keine Fachsprache ohne Erklärung.
3. **Deutsche Fachwörter bleiben deutsch** und stehen in `[[…]]`, z. B.
   `[[Mitwirkungsaufforderung]]`. Beim ersten Vorkommen kurz in der Sprache
   erklären. Grund: Man muss das Wort im Brief wiederfinden. Der Generator macht
   daraus ein hervorgehobenes, richtungssicheres Element (wichtig für ar/fa).
4. **Suchbegriffe einbauen**, die Menschen wirklich eintippen: in Titel,
   Beschreibung, H1, erste Sätze und FAQ-Fragen. Auch verbreitete Umschriften
   (z. B. „джобцентр“, „جوب سنتر“, „جاب سنتر“) einmal erwähnen.
5. **Vorsichtig formulieren:** „in der Regel“, „meist“, „kann“. Nichts
   garantieren. Kein Versprechen, dass etwas sicher gut ausgeht.
6. **Keine Rechtsberatung:** Jede Seite hat den Hinweis (Feld `hinweis`).
7. **Beratungsstellen nennen** (Namen auf Deutsch): Migrationsberatung für
   Erwachsene (MBE), Jugendmigrationsdienst (JMD), Caritas, Diakonie, AWO, DRK.
   Kostenlos, oft in vielen Sprachen.
8. **Was BehördenKlar im Browser (Demo) kann — nur das versprechen:**
   Foto oder PDF des Briefs hochladen → Erklärung in einfacher Sprache in der
   eigenen Sprache, Frist und Termin werden angezeigt, Checkliste („Was tun“),
   schwere Wörter erklärt, Hilfe für einen Anruf beim Amt (Sätze auf Deutsch mit
   Übersetzung), Frist mit einem Knopf in den Handy-Kalender eintragen.
   **2 Briefe kostenlos, ohne Konto.**
   **Nicht versprechen:** dass BehördenKlar Antwortbriefe oder einen Widerspruch
   schreibt, dass es automatisch erinnert, dass es Unterlagen verschickt, dass
   die Erklärung rechtlich verbindlich ist.
9. FAQ-Antworten: **reiner Text** (keine HTML-Tags), `[[…]]` ist erlaubt.
10. Keine erfundenen Telefonnummern, Adressen oder Links (außer jobcenter.digital,
    das steht im deutschen Ratgeber).

---

## Thema 1: `behoerdenbrief-verstehen`

**Suchabsicht:** „Ich habe einen Brief vom deutschen Amt bekommen und verstehe
ihn nicht. Was steht da? Muss ich etwas tun?“ Breiteste Suche, Einstiegsseite.

**Kernaussagen (Pflicht):**
- Viele Menschen verstehen Amtsdeutsch nicht — auch Deutsche. Das ist normal.
- Wichtigste Regel: **den Brief nicht liegen lassen.** Abgelaufene Fristen
  sind das größte Problem.
- So geht man einen Brief durch (Reihenfolge):
  1. **Absender:** Welche Behörde? (Jobcenter, Finanzamt, Ausländerbehörde,
     Familienkasse, Krankenkasse …)
  2. **Betreff:** steht fett oben, nennt das Thema.
  3. **Frist oder Termin:** nach einem Datum suchen und nach Wörtern wie
     [[bis]], [[innerhalb]], [[spätestens]].
  4. **Aufforderung:** Was soll ich tun oder schicken?
  5. **[[Rechtsbehelfsbelehrung]]** (ganz unten in einem [[Bescheid]]): wie und
     bis wann man sich wehren kann.
  6. **[[Aktenzeichen]]** suchen und aufschreiben — immer angeben.
- Nicht auf jeden Brief muss man antworten. Reine Information: keine Antwort
  nötig. Steht eine Frist, eine Aufforderung oder ein Termin drin: reagieren.
- Wörterliste (deutsches Wort + einfache Erklärung): [[Bescheid]] (offizielle
  Entscheidung), [[Frist]] (bis wann man etwas tun muss), [[Antrag]] (schriftliche
  Bitte an das Amt, z. B. um Geld), [[Unterlagen]] / [[Nachweis]] (Papiere, die
  etwas beweisen), [[Mitwirkungspflicht]] (man muss mithelfen, z. B. Papiere
  schicken), [[Anhörung]] (das Amt fragt Sie nach Ihrer Sicht, bevor es
  entscheidet), [[Rechtsbehelfsbelehrung]], [[Widerspruch]] (Entscheidung noch
  einmal prüfen lassen), [[Bestandskraft]] / [[bestandskräftig]] (Bescheid ist
  endgültig, weil die Frist vorbei ist), [[Aktenzeichen]] (Nummer Ihres
  Vorgangs).
- Hilfe: Beratungsstellen (siehe Regel 7). VdK/SoVD bewusst weglassen: dort
  bekommt man Hilfe meist nur als Mitglied, „kostenlos“ wäre falsch.
- **Keine konkrete Widerspruchsfrist nennen**, nur: „Die Frist steht in der
  Rechtsbehelfsbelehrung.“

**FAQ (3–4 Fragen, so formuliert, wie man sucht):**
- Was mache ich, wenn ich einen Brief vom Amt nicht verstehe?
- Muss ich auf jeden Brief vom Amt antworten?
- Was bedeutet „Rechtsbehelfsbelehrung“?
- (optional) Kann ich den Brief in meiner Sprache erklärt bekommen?
  → Ja, z. B. mit BehördenKlar (Foto, 2 Briefe kostenlos) oder bei einer
  Beratungsstelle. Antwort an das Amt schreibt man auf Deutsch.

---

## Thema 2: `jobcenter-mitwirkungsaufforderung`

**Suchabsicht:** „Brief vom Jobcenter, da steht Mitwirkung / Unterlagen /
Frist. Was muss ich tun? Wird mein Geld gestoppt?“

**Kernaussagen (Pflicht):**
- [[Mitwirkungsaufforderung]] = das [[Jobcenter]] braucht **Unterlagen oder
  Informationen**, um Ihr Geld weiter zahlen zu können (z. B. [[Bürgergeld]]
  bzw. [[Grundsicherung]]).
- Das steht im Gesetz: [[§ 60 SGB I]] — man muss mitwirken (mithelfen). Das
  bekommen alle Menschen mit Leistungen, nichts Persönliches.
- Häufige Gründe: Weiterbewilligung (Antrag läuft aus), fehlende Unterlagen,
  Änderung (Miete, Einkommen, Personen im Haushalt).
- Schritt für Schritt:
  1. **Frist suchen** (Datum im Brief) und aufschreiben.
  2. **Unterlagen sammeln**, die im Brief aufgelistet sind (z. B.
     [[Kontoauszüge]], [[Mietvertrag]], ausgefüllte Formulare).
  3. **Rechtzeitig abgeben:** persönlich, per Post oder online — bei vielen
     Jobcentern über **jobcenter.digital** (kommunale Jobcenter haben eigene
     Portale, deshalb nie „immer jobcenter.digital“ schreiben).
  4. **Nachweis behalten:** Kopie oder Foto, Beleg der Abgabe aufheben.
- Wenn man **ohne wichtigen Grund** nicht rechtzeitig mitwirkt, kann das
  Jobcenter die Leistung **ganz oder teilweise versagen oder entziehen**
  ([[§ 66 SGB I]]) — also weniger oder kein Geld, bis die Unterlagen da sind.
- Reicht man die Unterlagen nach, wird **in der Regel** weitergezahlt.
- Frist zu knapp: **vor** Fristende beim Jobcenter melden und **schriftlich**
  um mehr Zeit bitten, kurz begründen.
- Hilfe: Beratungsstellen (Regel 7) helfen kostenlos beim Verstehen und
  Ausfüllen.
- Hinweis-Feld: bei wichtigen Entscheidungen (z. B. Widerspruch) Beratung oder
  Anwältin/Anwalt.

**FAQ (3–4):**
- Was bedeutet eine Mitwirkungsaufforderung vom Jobcenter?
- Was passiert, wenn ich nicht reagiere?
- Was tue ich, wenn ich die Frist nicht schaffe?
- (optional) Kann ich die Unterlagen online schicken? → jobcenter.digital,
  Nachweis aufheben.

---

## Thema 3: `auslaenderbehoerde-termin-aufenthaltstitel`

**Suchabsicht:** „Brief von der Ausländerbehörde, Termin, Verlängerung der
Aufenthaltserlaubnis — was mitbringen? Was ist eine Fiktionsbescheinigung?“

**Kernaussagen (Pflicht):**
- Die [[Ausländerbehörde]] heißt manchmal anders: [[Landesamt für
  Einwanderung]], [[Migrationsamt]], [[Amt für Migration]] oder Teil der Stadt
  bzw. des Kreises.
- Ein Brief ist meist eine **Einladung zu einem Termin** ([[Termin]],
  [[Vorsprache]], [[Ladung]]) — oft, um den [[Aufenthaltstitel]] zu verlängern
  (z. B. [[Aufenthaltserlaubnis]]).
- Häufige Gründe: Aufenthaltstitel läuft bald ab; Unterlagen fehlen;
  persönliche Vorsprache (z. B. Fingerabdrücke, Unterschrift).
- Im Brief stehen **Datum, Uhrzeit, Ort** und die **Liste der Unterlagen**.
  Genau an diese Liste halten. Alles **im Original** mitbringen, dazu den Brief.
- Häufig verlangt: [[Reisepass]] und bisheriger Aufenthaltstitel, aktuelle
  [[biometrische Passfotos]], Nachweis [[Krankenversicherung]], Nachweis
  [[Einkommen]] (z. B. Lohnabrechnungen, Arbeitsvertrag), aktuelle
  [[Meldebescheinigung]], oft [[Mietvertrag]].
- Tipp: am Abend vorher alles bereitlegen.
- [[Fiktionsbescheinigung]]: Läuft der Titel ab, **bevor** entschieden ist, gibt
  es **in der Regel** eine Fiktionsbescheinigung — **wenn** man die Verlängerung
  **rechtzeitig** beantragt hat, also **bevor der alte Titel abläuft**
  (§ 81 Abs. 4 AufenthG; „rechtzeitig“ nicht als „pünktlich zum Termin“
  übersetzen). Sie zeigt: Der Aufenthalt bleibt vorläufig
  erlaubt. Deshalb immer früh genug beantragen.
- Termin nicht möglich: **nicht einfach nicht hingehen.** So früh wie möglich
  absagen und um neuen Termin bitten (Telefon oder schriftlich), immer mit
  [[Aktenzeichen]]. Versäumte Termine können die Bearbeitung verzögern.
- Hilfe: MBE und JMD (kostenlos, viele Sprachen), Caritas, Diakonie, AWO.
- Hinweis-Feld: Im Aufenthaltsrecht kommt es auf den Einzelfall an →
  Beratungsstelle oder Anwältin/Anwalt für Migrationsrecht.
- **uk/ru zusätzlich erlaubt (vorsichtig):** Bei Menschen aus der Ukraine steht
  im Brief oft [[§ 24 AufenthG]] (vorübergehender Schutz). Die Regeln dazu
  ändern sich manchmal — bei einer Beratungsstelle nachfragen, was gerade gilt.
  Keine Daten oder Verlängerungsregeln nennen.

**FAQ (3–4):**
- Was muss ich zum Termin bei der Ausländerbehörde mitbringen?
- Was passiert, wenn mein Aufenthaltstitel während der Bearbeitung abläuft?
- Ich kann den Termin nicht wahrnehmen – was tun?
- (optional) Was ist eine Fiktionsbescheinigung?
