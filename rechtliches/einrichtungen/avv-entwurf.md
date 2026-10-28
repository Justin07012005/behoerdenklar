> **ENTWURF, Stand 28.10.2026. Von Claude erstellt, keine Rechtsberatung. Vor dem ersten Einsatz anwaltlich bzw. durch die Datenschutzbeauftragte prüfen lassen.**

# Vertrag über eine Auftragsverarbeitung (AVV) nach Art. 28 DSGVO

**BehördenKlar im Einrichtungs-Zugang (Einrichtungs-Code)**

zwischen **[NAME DES TRÄGERS]** als Verantwortlichem
und der **Webklar GbR** als Auftragsverarbeiter

Anlagen (Teil des Vertrags):

- Anlage 1: Technische und organisatorische Maßnahmen (`anlage-1-toms.md`)
- Anlage 2: Unterauftragsverarbeiter (`anlage-2-unterauftragsverarbeiter.md`)

---

## Lesehilfe (nicht Teil des Vertrags)

**Was das ist.** Ein Vertragsentwurf für Beratungsstellen gemeinnütziger Träger, die
BehördenKlar über einen Einrichtungs-Code nutzen. Geschrieben für einen Träger, für den die
DSGVO und das BDSG gelten (kein kirchliches Datenschutzrecht). Für Träger nach KDG oder
DSG-EKD müssen die Verweise angepasst werden.

**Zwei Fälle.** Wer verantwortlich ist, hängt davon ab, wer den Brief hochlädt:

| | Fall A | Fall B |
|---|---|---|
| Wer lädt hoch? | Die ratsuchende Person selbst, mit dem eigenen Handy | Mitarbeitende der Stelle, mit einem Gerät der Stelle |
| Einwilligung | Die Person setzt das Häkchen selbst, für jeden Brief neu | Die Stelle muss die Rechtsgrundlage selbst sicherstellen |
| Rolle von Webklar | **offen, siehe Teil A** | Auftragsverarbeiter (dieser Vertrag) |

**Aufbau.** Teil A erklärt Fall A und bietet zwei Lesarten an. Teil B ist der eigentliche
Vertrag für Fall B. In § 1 Abs. 3 wird nach Abstimmung mit der Datenschutzbeauftragten (DSB)
angekreuzt, ob der Vertrag auch für Fall A gilt.

**Zeichen im Text.**

- `[GROSSBUCHSTABEN]`: Platzhalter, vor der Unterschrift ausfüllen.
- `[zu bestätigen durch Webklar]`: Angabe, die aus den Unterlagen nicht belegt ist.
- `[Abstimmungspunkt mit der DSB]`: Frage, die der Träger entscheiden sollte.

**Grundlagen dieses Entwurfs.** Datenschutz-Blatt für die DSB (Stand 25.10.2026),
Datenschutzerklärung auf behoerdenklar.de/datenschutz (Stand 22.10.2026) und der Quelltext von
Server und Webseite (Stand 28.10.2026: `proxy/src/index.ts`, `proxy/wrangler.toml`,
`webseite/demo.html`, `webseite/uebergabe.js`) sowie der Entwurf der Bedingungen für Einrichtungen
(`bedingungen-einrichtungen.md`). Die Angaben zu Cloudflare und Anthropic stammen
aus deren Vertragsunterlagen, abgerufen am 28.10.2026 (Fundstellen in Anlage 2).

---

## Teil A: Fall A, die Person nutzt ihr eigenes Handy

### A.1 Was in Fall A passiert

Fall A hat zwei Spielarten:

- **A1, ohne die Stelle:** Die Person nutzt den Zugang der Stelle zu Hause oder unterwegs. Die
  Stelle ist an der einzelnen Nutzung nicht beteiligt. **Vorgesehen ist das nicht:** Nach den
  Bedingungen für Einrichtungen (§ 9 Abs. 1) ist der Code nur für Mitarbeitende. Zugangskarte und
  Kurzanleitung, auf denen der Code steht, sind als „nur für Mitarbeitende“ gekennzeichnet; der
  Handzettel enthält keinen Code. A1 kommt also nur vor, wenn der Code
  entgegen dieser Regel weitergegeben wurde. (Nutzt die Person BehördenKlar zu Hause ohne den Code
  der Stelle, z. B. mit den Gratis-Analysen oder mit gekauftem Guthaben, hat das mit der Stelle
  nichts zu tun. Dafür ist allein Webklar verantwortlich.)
- **A2, in der Beratung:** Am Dienst-PC wird „Lieber mit dem Handy fotografieren“ angeklickt. Die
  Person scannt den QR-Code mit dem eigenen Handy, setzt dort das Häkchen und fotografiert den
  Brief. Die Erklärung erscheint am Handy (in der Sprache der Person) **und am Bildschirm der
  Stelle** (voreingestellt auf Deutsch). Die Übergabe an den PC ist Ende-zu-Ende verschlüsselt; Webklar kann
  sie nicht lesen. Der QR-Code enthält auch den Zugangs-Nachweis der Stelle: Das Handy nutzt das
  Kontingent der Stelle, aber nur in diesem einen Browser-Tab und bis zum Ergebnis.

In beiden Spielarten setzt die Person das Häkchen selbst, am eigenen Handy, für genau diesen
einen Brief. Der Text am Häkchen lautet:

> „Ich bin einverstanden, dass das Foto dieses Briefs zur Erklärung an den Server von
> BehördenKlar und an den KI-Dienst Anthropic (USA) geschickt wird. Briefe können sehr
> persönliche Angaben enthalten, zum Beispiel zu Gesundheit, Herkunft oder Aufenthalt.
> BehördenKlar speichert den Brief nicht. Anthropic löscht ihn in der Regel nach 30 Tagen und
> nutzt ihn nicht zum Training.“

Am Handy erscheint er in einer von 27 Sprachen (KI-übersetzt), mit Link zur deutschen
Datenschutzerklärung. Ohne Häkchen wird nichts hochgeladen.

### A.2 Ehrlich gesagt: Die Rollen in Fall A sind nicht eindeutig

Für Fall A gibt es zwei vertretbare Lesarten. Welche gilt, sollte der Träger mit seiner
Datenschutzbeauftragten entscheiden. Webklar legt sich in diesem Entwurf nicht fest. Das
Datenschutz-Blatt vom 25.10.2026 beschreibt Lesart 1. Auch der Entwurf der Bedingungen für
Einrichtungen (§ 13 Abs. 1) geht von Lesart 1 aus, mit dem Vorbehalt, dass die Parteien die
Verteilung mit der Datenschutzbeauftragten prüfen und ihre Vereinbarungen anpassen. Das ist ein
Vorschlag, keine Festlegung. Entscheidet sich der Träger anders, geht dieser Vertrag den
Bedingungen vor (§ 1 Abs. 4).

#### Lesart 1: Webklar ist selbst verantwortlich

**Gedanke.** Die Person nutzt einen Dienst von Webklar, so wie sie jede andere Webseite nutzen
würde. Webklar legt Zweck und Mittel fest (welche KI, welche Anweisung, welche Dienstleister).
Die Stelle bezahlt nur ein Kontingent und gibt den Code weiter, ähnlich einem Gutschein.

**Dafür spricht:**

- Die Person entscheidet selbst, ob und welchen Brief sie hochlädt, am eigenen Gerät.
- Die Einwilligung wird gegenüber BehördenKlar erklärt und nennt BehördenKlar und Anthropic.
- Die Stelle sieht über den Code keine Briefe, nur Zahlen (übrige Briefe, Nutzung pro Woche und
  Sprache).
- Bei A1 hat die Stelle auf die einzelne Verarbeitung keinerlei Einfluss.

**Dagegen kann sprechen (vor allem bei A2):**

- Die Stelle entscheidet, BehördenKlar in ihrer Beratung einzusetzen, bezahlt dafür, startet
  den Vorgang an ihrem PC und bekommt das Ergebnis für ihre Beratung. Der Europäische
  Gerichtshof legt den Begriff des Verantwortlichen weit aus.
- Der Text am Häkchen erwähnt nicht, dass die Erklärung bei A2 auch am Bildschirm der Stelle
  erscheint. `[Abstimmungspunkt mit der DSB: Reicht dafür die mündliche Information in der
  Beratung, oder soll der Text ergänzt werden?]`

**Folgen:**

- Für Fall A braucht es keinen AVV. Es gelten die Datenschutzerklärung von BehördenKlar und die
  Einwilligung der Person. Betroffenenrechte richten sich an Webklar.
- Was die Stelle bei A2 selbst mit der Erklärung macht (am Bildschirm ansehen, drucken, in die
  Beratungsakte nehmen), ist ihre eigene Verarbeitung, in ihrer eigenen Verantwortung.
- Die Stelle sollte die Person darauf hinweisen, dass BehördenKlar ein eigenständiger Dienst
  von Webklar ist.
- Gibt die Stelle eine Erklärung aus A2 über „Ergebnis aufs Handy mitnehmen“ an das Handy der
  Person weiter, legt ihr PC die Erklärung verschlüsselt bei Webklar (Cloudflare Durable Objects)
  ab. § 1 Abs. 3 erfasst das nur für Erklärungen aus Fall B. `[Abstimmungspunkt mit der DSB: Ob
  Webklar dabei als Auftragsverarbeiter der Stelle tätig wird und dieser Vertrag insoweit auch bei
  Lesart 1 gelten soll.]`

#### Lesart 2: Der Träger ist verantwortlich, Webklar ist Auftragsverarbeiter

**Gedanke.** BehördenKlar ist ein Werkzeug der Beratungsstelle. Die Stelle entscheidet über
das „Ob“ und das „Wofür“; Webklar arbeitet in ihrem Auftrag, wie in Fall B.

**Dafür spricht:**

- Die Nutzung geschieht (bei A2) in der Beratung, auf Veranlassung der Stelle, mit dem Zugang
  und auf Kosten der Stelle; das Ergebnis dient der Beratung.
- Die Rollen wären für Fall A2 und Fall B gleich. Das ist für die Stelle einfacher zu erklären
  und zu dokumentieren.

**Dagegen kann sprechen:**

- Die Person handelt am eigenen Gerät selbst, und die Einwilligung wird heute gegenüber
  BehördenKlar erklärt, nicht gegenüber der Stelle.
- Bei A1 (zu Hause) hat die Stelle praktisch keinen Einfluss auf die Verarbeitung.

**Folgen:**

- Dieser Vertrag gilt dann auch für Fall A (mindestens für A2), siehe § 1 Abs. 3.
- Die Einwilligung muss (auch) gegenüber der Stelle wirken. Der heutige Text am Häkchen nennt
  nur BehördenKlar und Anthropic. Die Stelle müsste die Person selbst informieren und ihre
  Einwilligung einholen oder eine andere Rechtsgrundlage prüfen.
- Betroffenenrechte richten sich an die Stelle. Die Stelle nimmt die Verarbeitung in ihr
  Verzeichnis der Verarbeitungstätigkeiten und gegebenenfalls in ihre
  Datenschutz-Folgenabschätzung auf.
- Webklar darf die Daten nur nach den Weisungen der Stelle verarbeiten. (Eigene Zwecke verfolgt
  Webklar mit den Briefinhalten ohnehin nicht, siehe § 3 Abs. 4.)

#### Eine dritte Sicht

Denkbar ist auch, dass Stelle und Webklar für die Nutzung in der Beratung **gemeinsam
verantwortlich** sind (Art. 26 DSGVO). Dafür bräuchte es eine eigene Vereinbarung über die
Aufgabenteilung. Sie ist nicht Teil dieses Entwurfs und kann auf Wunsch nachgereicht werden.

### A.3 Was in jeder Lesart gilt

- Webklar wendet die Maßnahmen aus Anlage 1 und die Unterauftragsverarbeiter aus Anlage 2 in
  Fall A genauso an wie in Fall B. Technisch gibt es keinen Unterschied.
- Die Nutzung ist freiwillig. Wer nicht einwilligt, wird ganz normal beraten.
- Den QR-Code am Dienst-PC nur der Person zeigen, für die er bestimmt ist. Wer ihn
  abfotografiert, kann die Erklärung in den folgenden 15 Minuten öffnen. Außerdem enthält er den
  Zugangs-Nachweis der Stelle. Wer ihn hat, kann das Kontingent der Stelle nutzen, bis Webklar den
  Code sperrt.
- Nach jedem Gespräch am Dienst-PC „Fertig, nächste Person“ drücken. Ausdrucke und gespeicherte
  PDFs wie Akten behandeln.
- Über den Code erfährt die Stelle keine Briefinhalte, nur Zahlen.

---

## Teil B: Vertrag über die Auftragsverarbeitung

### § 1 Vertragsparteien und Geltungsbereich

(1) **Verantwortlicher** (im Folgenden „Träger“):
[NAME DES TRÄGERS], [ANSCHRIFT], vertreten durch [VERTRETUNGSBERECHTIGTE PERSON(EN)],
für die Beratungsstelle [NAME DER BERATUNGSSTELLE, z. B. MBE Donnersberg], [ANSCHRIFT DER STELLE].
Datenschutzbeauftragte des Trägers: [NAME, KONTAKT].

(2) **Auftragsverarbeiter** (im Folgenden „Webklar“):
Webklar GbR, vertreten durch die Gesellschafter Justin Klein und Kenso Grimm,
Am Schwimmbad 10, 67722 Winnweiler, Tel. 0170 4969375, justin@webklar.com.
Datenschutzbeauftragte/r von Webklar: derzeit nicht benannt. `[zu bestätigen durch Webklar:
Ob eine Benennungspflicht besteht (Art. 37 DSGVO, § 38 BDSG), ist zu prüfen, insbesondere
§ 38 Abs. 1 Satz 2 BDSG, falls die Verarbeitung einer Datenschutz-Folgenabschätzung
unterliegt.]`

(3) **Geltungsbereich.** Dieser Vertrag gilt für **Fall B**: Mitarbeitende der Stelle laden
Briefe von Ratsuchenden auf einem Gerät der Stelle (z. B. Dienst-PC, Dienst-Handy) über den
Einrichtungs-Zugang hoch. Dazu gehört auch, eine so erstellte Erklärung über „Ergebnis aufs
Handy mitnehmen“ an das Handy der Person weiterzugeben. Ebenso gehört dazu, wenn ein Dienst-Handy
über „Lieber mit dem Handy fotografieren“ für den Dienst-PC fotografiert.
Für **Fall A** (siehe Teil A) vereinbaren die Parteien nach Abstimmung mit der
Datenschutzbeauftragten des Trägers (bitte genau eine Möglichkeit ankreuzen):

- [ ] **Lesart 1:** Dieser Vertrag gilt nicht für Fall A. In Fall A ist Webklar selbst
  verantwortlich.
- [ ] **Lesart 2:** Dieser Vertrag gilt auch für Fall A, und zwar
  - [ ] nur für die Nutzung in der Beratung (A2),
  - [ ] für A1 und A2.

(4) **Hauptvertrag.** Grundlage ist der Vertrag über die Nutzung von BehördenKlar durch die
Stelle (Angebot und Auftrag bzw. Bedingungen für Einrichtungen, im Folgenden „Hauptvertrag“)
`[Bezeichnung und Datum ergänzen]`. Bei Widersprüchen in Fragen des Datenschutzes geht dieser
Vertrag dem Hauptvertrag vor.

### § 2 Gegenstand und Dauer

(1) **Gegenstand** ist die Bereitstellung der Webanwendung BehördenKlar
(behoerdenklar.de/demo) im Einrichtungs-Zugang. BehördenKlar erklärt hochgeladene Briefe
(von Behörden, aber z. B. auch von Versicherung, Vermieter, Bank oder Inkasso) mit Hilfe einer
KI in einfacher Sprache, auf Wunsch in einer von 27 Sprachen, und gibt Erklärungen zwischen
Geräten weiter.

(2) **Dauer.** Der Vertrag beginnt mit der Unterzeichnung `[alternativ: am DATUM]`. Er läuft so
lange wie der Hauptvertrag, einschließlich einer kostenlosen Testphase und einer kostenlosen
Überbrückung bis zum Beginn des bezahlten Zeitraums. Schließen die Parteien im Anschluss einen
weiteren Hauptvertrag (z. B. für das nächste Kalenderjahr), gilt dieser Vertrag auch dafür, solange
keine Partei vorher in Textform eine neue Fassung verlangt. Sonst endet er mit dem letzten
Hauptvertrag, ohne dass es einer Kündigung bedarf. Die Pflichten aus § 8 (Vertraulichkeit) und
§ 15 (Löschung) gelten über das Vertragsende hinaus. Die Pflichten aus §§ 12 bis 14 gelten fort,
solange noch Daten aus dem Auftrag bei Webklar oder einem Unterauftragsverarbeiter vorhanden sind.

(3) Jede Partei kann diesen Vertrag und den Hauptvertrag aus wichtigem Grund fristlos
kündigen, insbesondere bei einem schweren Verstoß gegen diesen Vertrag oder gegen
Datenschutzvorschriften.

### § 3 Art und Zweck der Verarbeitung

(1) **Zweck.** Briefe von Ratsuchenden verständlich machen, damit die Stelle sie beraten kann:
Erklärung in einfacher Sprache, Fristen und Termine, To-do-Liste, Fachbegriffe, die
Kontaktdaten aus dem Brief und Sätze für einen Anruf beim Absender.

(2) **Ablauf.** Eine Erklärung entsteht so:

1. **Hochladen.** Die Stelle wählt im Browser ein Foto (JPG/PNG) oder PDF. Fotos werden im
   Browser auf höchstens 2.000 Pixel Kantenlänge verkleinert und neu als JPEG gespeichert. PDFs
   werden unverändert gesendet und dürfen höchstens 5 MB groß sein. Der Server nimmt Dateien bis
   etwa 5 MB an. Die Datei geht über eine verschlüsselte Verbindung (TLS) an den Server von Webklar
   (Cloudflare Workers).
2. **Prüfen.** Der Server prüft den Bot-Schutz (Cloudflare Turnstile), den signierten
   Zugangs-Nachweis der Stelle und das Restkontingent.
3. **Erklären.** Der Server reicht die Datei mit einer festen Anweisung an Anthropic weiter
   (Modell Claude Sonnet 5). Ist eine deutsche **und** eine anderssprachige Fassung gewünscht,
   übersetzt ein zweiter Aufruf (Modell Claude Haiku 4.5) die fertige Erklärung; dabei geht nur
   der Text der Erklärung an Anthropic, nicht der Brief. Außer der Datei gehen nur die feste
   Anweisung, die Zielsprache (aus einer festen Liste) und das heutige Datum an Anthropic. Kennungen,
   Name oder IP-Adresse der Stelle oder der Person gehen nicht mit. Was auf dem Brief steht, liest
   Anthropic natürlich.
4. **Zurückgeben.** Die Erklärung geht über den Server zurück an den Browser der Stelle. Der
   Server speichert weder den Brief noch die Erklärung.
5. **Mitnehmen (freiwillig).** Auf Wunsch verschlüsselt der Browser der Stelle die Erklärung
   mit einem neuen Schlüssel (AES-256-GCM) und legt sie zur Abholung auf dem Server von Webklar
   ab (Zwischenspeicher bei Cloudflare, Durable Objects). Der Schlüssel steht nur im QR-Code
   hinter dem „#“ der Adresse und erreicht den Server nie. Das Handy der Person holt die Erklärung
   ab und entschlüsselt sie. Gleich nach dem Abholen löscht die abholende Seite die Ablage. Klappt
   das nicht, löscht der Server sie spätestens 15 Minuten nach dem letzten Päckchen von selbst.
   Fotografiert ein Dienst-Handy für den Dienst-PC (§ 1 Abs. 3), läuft die Erklärung auf dieselbe
   Weise verschlüsselt vom Handy zum PC.
6. **Zählen.** Das Kontingent der Stelle sinkt um eins, sobald Anthropic geantwortet hat, auch
   wenn die Antwort danach nicht verwertbar ist (z. B. weil die KI den Inhalt ablehnt). Ist die KI
   nicht erreichbar oder meldet sie einen Fehler, wird nichts abgezogen. Für die Auswertung mit der
   Stelle wird je Analyse nur Datum und Sprache gezählt (siehe § 5).

(3) **Art der Verarbeitung.** Empfangen, Übermitteln an Unterauftragsverarbeiter, Auslesen und
Auswerten durch die KI, Übersetzen, Zurückgeben, verschlüsseltes Zwischenspeichern für die
Übergabe, Löschen.

(4) **Keine eigenen Zwecke.** Webklar verarbeitet die Daten aus diesem Auftrag nur für die
Stelle. Webklar nutzt sie nicht für eigene Zwecke, nicht zum Training von KI, nicht für
Werbung und gibt sie nicht an Dritte weiter, außer an die Unterauftragsverarbeiter nach
Anlage 2. Webklar nimmt im Regelbetrieb keine Kenntnis von Briefinhalten. Anthropic darf
Inhalte aus seinen Diensten nach den Commercial Terms (Abschnitt B, laut Abruf vom 28.10.2026)
nicht zum Training nutzen. `[zu bestätigen durch Webklar: Im Anthropic-Konto ist keine Funktion
aktiviert, die Anfragen mit Inhalt für Webklar einsehbar macht, und Webklar nimmt an keinem
Programm teil, das Anthropic eine Nutzung der Inhalte zum Training erlaubt.]`

(5) **Ort.** Webklar speichert Daten aus dem Auftrag nicht auf eigenen Geräten. Die Verarbeitung
findet bei den Unterauftragsverarbeitern statt, auch in den USA und an weiteren Standorten (§ 11,
Anlage 2). Webklar verwaltet den Dienst von Deutschland aus. `[zu bestätigen durch Webklar]`

### § 4 Art der Daten und Kategorien betroffener Personen

(1) **Art der Daten.** Alles, was auf einem hochgeladenen Brief steht. Typisch sind:

- Name, Anschrift, Geburtsdatum, Familienstand, Staatsangehörigkeit;
- Aktenzeichen, Kunden-, Versicherungs-, Steuer- oder BG-Nummern;
- Angaben zu Sozialleistungen, Einkommen, Schulden, Miete, Bankverbindung;
- Angaben zu Aufenthalt, Asylverfahren, Arbeitserlaubnis;
- Angaben zu Familie und Haushalt (z. B. Kinder, Bedarfsgemeinschaft);
- Name, Telefonnummer und Sprechzeiten der Sachbearbeitung beim Absender.

(2) **Besondere Kategorien (Art. 9 DSGVO).** Briefe können solche Daten enthalten,
insbesondere:

- Gesundheitsdaten (z. B. Krankenkasse, Pflegegrad, Schwerbehinderung, ärztliche Gutachten);
- Daten, aus denen die ethnische Herkunft hervorgeht (z. B. aus Unterlagen der
  Ausländerbehörde oder zum Asylverfahren);
- religiöse oder weltanschauliche Überzeugungen (z. B. Konfession in Steuer- oder
  Meldeunterlagen);
- seltener: Gewerkschaftszugehörigkeit, Sexualleben oder sexuelle Orientierung.

(3) **Strafrechtliche Daten (Art. 10 DSGVO).** Briefe können Angaben zu Straftaten oder
Strafverfahren enthalten (z. B. Strafbefehl, Schreiben der Staatsanwaltschaft).
`[Abstimmungspunkt mit der DSB bzw. anwaltlich prüfen: Einordnung von Bußgeldbescheiden und vor
allem die Rechtsgrundlage. Art. 10 DSGVO erlaubt solche Daten außerhalb behördlicher Aufsicht nur,
wenn eine Rechtsvorschrift es zulässt. Ob die Einwilligung der Person dafür ausreicht, ist
umstritten. Notfalls solche Briefe von der Nutzung ausnehmen.]`

(4) **Ergebnis.** Die Erklärung der KI mit den Feldern: Briefart, Absender, Kernaussage,
Erklärung in einfacher Sprache, Fachbegriffe, Frist, Termin (Datum, Uhrzeit, Ort), To-do-Liste,
Kontaktdaten aus dem Brief (Telefon, Ansprechperson, Aktenzeichen, Sprechzeiten) und Sätze für
einen Anruf. Auf Wunsch in zwei Sprachen.

(5) **Übergabe-Päckchen.** Die Erklärung (gegebenenfalls deutsch und übersetzt), die gewählte
Sprache, die Zahl der übrigen Briefe, der Name der Stelle und Statusmeldungen, verschlüsselt.
Für Webklar nicht lesbar.

(6) **Verbindungsdaten**, die bei der Übertragung zwangsläufig anfallen (IP-Adresse des Geräts
der Stelle, Zeitpunkt). Zu ihrer weiteren Verwendung siehe § 5.

(7) **Betroffene Personen:**

- Ratsuchende der Stelle;
- Personen, die im Brief genannt sind (z. B. Angehörige, Kinder, Mitglieder der
  Bedarfsgemeinschaft, Vermieter, Arbeitgeber);
- Beschäftigte der Absender (z. B. Sachbearbeitung mit Name und Telefonnummer);
- Mitarbeitende der Stelle, soweit sie im Brief genannt sind.

Unter den Betroffenen sind regelmäßig besonders schutzbedürftige Personen (z. B. Zugewanderte
mit geringen Deutschkenntnissen, Menschen in Notlagen).

### § 5 Abgrenzung: Was Webklar in eigener Verantwortung verarbeitet

(1) Folgende Daten verarbeitet Webklar nicht im Auftrag der Stelle, sondern als eigener
Verantwortlicher, wie in der Datenschutzerklärung von BehördenKlar beschrieben. **Sie sollen
keine Briefinhalte enthalten.** Offen ist das nur für die Server-Protokolle: Sie enthalten gekürzte
Fehlermeldungen des KI-Dienstes (Anlage 1 Nr. 5). `[zu bestätigen durch Webklar: ob diese Teile
eines Briefs zitieren können; sonst nicht mehr protokollieren.]`

| Was | Zweck | Wie lange |
|---|---|---|
| Einrichtungs-Daten: Code, zufällige Kennung, Name der Stelle, Ablaufdatum, Restkontingent | Vertrag und Abrechnung | ohne automatische Frist, Löschung nach § 15 Abs. 2 |
| Nutzungszähler: je Analyse nur Datum und Sprache | Auswertung mit der Stelle | höchstens 13 Monate |
| Bot-Schutz (Cloudflare Turnstile): Browser-Merkmale und IP-Adresse | Schutz vor Missbrauch | siehe Anlage 2 |
| Code-Fehlversuche: Zähler pro IP-Adresse und Tag, nur bei falscher Eingabe | Schutz vor dem Erraten von Codes | 48 Stunden |
| Schreib-Bremse für die Übergabe: Zähler pro IP-Adresse | Schutz vor Missbrauch | Zeitfenster 1 Minute |
| Server-Protokolle: Zeitpunkt, aufgerufene Adresse, Fehlerart, technische Metadaten, gekürzte Fehlermeldungen des KI-Dienstes | Fehlersuche, Sicherheit | höchstens 7 Tage |
| Besucherstatistik (Cloudflare Web Analytics, ohne Cookies) | Reichweitenmessung | nur zusammengefasste Werte |

(2) Rechtsgrundlage ist, soweit Personenbezug besteht, Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
Interesse an der Abwicklung des Vertrags mit der Stelle und an einem sicheren,
missbrauchsgeschützten Dienst), wie in der Datenschutzerklärung (Abschnitte 5, 8 und 9a).

(3) `[Abstimmungspunkt mit der DSB: Statt dieser Abgrenzung können die Verbindungs- und
Schutzdaten auch in den Auftrag einbezogen werden. Webklar ist für beide Wege offen.]`

(4) Für den Bot-Schutz Turnstile ist Cloudflare nach eigenen Angaben teilweise selbst
Verantwortlicher (zur Verbesserung der Bot-Erkennung), siehe Anlage 2.

### § 6 Pflichten des Trägers

(1) **Rechtsgrundlage.** Der Träger ist dafür verantwortlich, dass das Hochladen eines Briefs
rechtmäßig ist. Für Briefe mit besonderen Kategorien (§ 4 Abs. 2) kommt vor allem die
ausdrückliche Einwilligung der Person in Betracht (Art. 9 Abs. 2 lit. a DSGVO). Ob andere
Grundlagen greifen (z. B. Art. 9 Abs. 2 lit. h DSGVO mit § 22 BDSG), prüft der Träger selbst. Für
Daten nach § 4 Abs. 3 gilt der dortige Abstimmungspunkt. Der Träger informiert die Personen nach Art. 13 und 14
DSGVO. Webklar stellt dafür Textbausteine zur Verfügung (Datenschutz-Blatt, Anlagen 1 und 2).

(2) **Das Häkchen am Dienst-PC.** Auch am Dienst-PC lädt BehördenKlar nur hoch, wenn das
Häkchen gesetzt ist. In Fall B setzt es eine Mitarbeiterin oder ein Mitarbeiter. Damit
bestätigt die Stelle, dass für diesen Brief eine Rechtsgrundlage vorliegt, insbesondere die
Einwilligung der Person. **Das Häkchen ersetzt diese Einwilligung nicht.**
`[Abstimmungspunkt mit der DSB: Der Text am Häkchen ist an die ratsuchende Person gerichtet
(„Ich bin einverstanden …“). Für Fall B wäre ein eigener Text für Mitarbeitende klarer.]`

(3) **So wenig wie nötig.** Die Stelle lädt nur Briefe hoch, die für die Beratung erklärt
werden müssen, und davon nur die nötigen Seiten. Ausweise, Pässe, Aufenthaltstitel und
ärztliche Unterlagen werden nicht hochgeladen, wenn es nicht unbedingt nötig ist.

(4) **Geräte und Zugang.** Die Stelle

- gibt den Einrichtungs-Code nur an Mitarbeitende weiter, nicht an Ratsuchende, und hängt ihn
  nicht aus (Bedingungen für Einrichtungen § 9 Abs. 1). Ratsuchende nutzen den Zugang nur über den
  QR-Code am PC („Lieber mit dem Handy fotografieren“);
- nutzt „Zugang dauerhaft auf ein Handy geben“ nur für Dienstgeräte von Mitarbeitenden;
- drückt am Dienst-PC nach jedem Gespräch „Fertig, nächste Person“;
- zeigt QR-Codes nur der Person, für die sie bestimmt sind;
- behandelt Ausdrucke und gespeicherte PDFs wie Akten;
- sichert ihre Geräte nach dem Stand der Technik (Anmeldung, Bildschirmsperre, Updates).

(5) Der Träger erteilt Weisungen nach § 7 und informiert Webklar unverzüglich, wenn er Fehler
oder Unregelmäßigkeiten bei der Verarbeitung bemerkt.

(6) Der Träger führt die Verarbeitung in seinem Verzeichnis der Verarbeitungstätigkeiten und
entscheidet, ob eine Datenschutz-Folgenabschätzung nötig ist (§ 13 Abs. 3).

### § 7 Weisungen

(1) Webklar verarbeitet die Daten nur auf dokumentierte Weisung des Trägers. Die Weisungen
ergeben sich aus diesem Vertrag, dem Hauptvertrag und der Nutzung der Funktionen von
BehördenKlar durch die Stelle. Dazu gehört die Weisung, die Daten über die
Unterauftragsverarbeiter nach Anlage 2 auch in die USA zu übermitteln.

(2) Weitere Weisungen erteilt der Träger in Textform (z. B. E-Mail). Mündliche Weisungen
bestätigt er unverzüglich in Textform.

(3) Weisungsberechtigt beim Träger: [NAME, FUNKTION, KONTAKT], Vertretung: [NAME].
Weisungsempfänger bei Webklar: Justin Klein und Kenso Grimm (Kontakt in § 18).

(4) Hält Webklar eine Weisung für rechtswidrig, sagt Webklar das dem Träger unverzüglich
(Art. 28 Abs. 3 Satz 2 DSGVO). Webklar darf die Ausführung aussetzen, bis der Träger die
Weisung bestätigt oder ändert.

(5) Muss Webklar Daten aufgrund einer gesetzlichen Pflicht anders verarbeiten, teilt Webklar
dem Träger das vorher mit, soweit das Gesetz es nicht verbietet (Art. 28 Abs. 3 lit. a DSGVO).

(6) BehördenKlar ist ein Standarddienst. Kann Webklar eine Weisung technisch nicht umsetzen,
sagt Webklar das unverzüglich. Die Stelle kann dann die Nutzung in Fall B aussetzen oder den
Hauptvertrag kündigen.

### § 8 Vertraulichkeit und Berufsgeheimnis

(1) Bei Webklar haben nur die Gesellschafter Justin Klein und Kenso Grimm Zugang zu den
Systemen. `[zu bestätigen durch Webklar: keine weiteren Beschäftigten oder freien
Mitarbeitenden mit Zugang.]` Sie sind zur Vertraulichkeit verpflichtet (Art. 28 Abs. 3 lit. b,
Art. 29, Art. 32 Abs. 4 DSGVO). `[zu bestätigen durch Webklar: Die schriftliche Verpflichtung ist
noch nicht unterschrieben (Anlage 1 Nr. 10); vor Unterzeichnung dieses Vertrags nachholen.]` Die Pflicht gilt nach Vertragsende fort. Neue Personen erhalten
erst nach einer Verpflichtung in Textform Zugang.

(2) **Berufsgeheimnis.** Soweit Mitarbeitende der Stelle einer Schweigepflicht nach § 203 StGB
unterliegen (z. B. als staatlich anerkannte Sozialarbeiterinnen und Sozialarbeiter oder
Sozialpädagoginnen und Sozialpädagogen, § 203 Abs. 1 Nr. 6 StGB), gilt zusätzlich:

1. Webklar wirkt an der beruflichen Tätigkeit der Stelle mit (§ 203 Abs. 3 Satz 2 StGB) und ist
   zur Geheimhaltung aller fremden Geheimnisse verpflichtet, die Webklar dabei bekannt werden.
2. Webklar ist darauf hingewiesen, dass eine unbefugte Offenbarung nach § 203 Abs. 4 StGB
   strafbar ist.
3. Webklar nimmt von solchen Geheimnissen nur Kenntnis, soweit es für den Auftrag erforderlich
   ist. Im Regelbetrieb nimmt Webklar keine Kenntnis (§ 3 Abs. 4).
4. Webklar verpflichtet jede Person, die bei Webklar mitwirkt, in Textform zur Geheimhaltung
   und weist sie auf die Strafbarkeit hin.

(3) Die Unterauftragsverarbeiter sind über ihre Auftragsverarbeitungsverträge zur
Vertraulichkeit verpflichtet (Anlage 2). Eine eigene Verpflichtung nach § 203 StGB haben sie
nicht abgegeben. `[Abstimmungspunkt mit der DSB bzw. anwaltlich prüfen: Ob die
Vertraulichkeitsregeln in den Standardverträgen von Cloudflare und Anthropic als Verpflichtung
zur Geheimhaltung im Sinne von § 203 Abs. 4 Satz 2 Nr. 2 StGB genügen.]`

### § 9 Sicherheit der Verarbeitung

(1) Webklar trifft die technischen und organisatorischen Maßnahmen nach Anlage 1
(Art. 28 Abs. 3 lit. c, Art. 32 DSGVO).

(2) Webklar darf die Maßnahmen weiterentwickeln, solange das Schutzniveau nicht sinkt.
Wesentliche Änderungen teilt Webklar dem Träger in Textform mit und aktualisiert Anlage 1.

(3) Webklar überprüft die Maßnahmen regelmäßig, mindestens einmal im Jahr und nach
wesentlichen Änderungen am Dienst.

### § 10 Unterauftragsverarbeiter

(1) Der Träger erteilt eine allgemeine Genehmigung für Unterauftragsverarbeiter
(Art. 28 Abs. 2 DSGVO). Genehmigt sind die in Anlage 2 genannten: **Cloudflare** (Server,
Zwischenspeicher, Bot-Schutz, Webseite) und **Anthropic** (KI).

(2) **Änderungen durch Webklar.** Will Webklar einen Unterauftragsverarbeiter hinzufügen oder
ersetzen, teilt Webklar das dem Träger mindestens vier Wochen vorher in Textform mit.

(3) **Änderungen bei Cloudflare und Anthropic.** Beide setzen ihrerseits weitere
Unterauftragsverarbeiter ein (Listen in Anlage 2). Erfährt Webklar von einer Änderung, leitet
Webklar sie innerhalb von fünf Werktagen an den Träger weiter. `[zu bestätigen durch Webklar:
Benachrichtigungen von Cloudflare und Anthropic über neue Unterauftragsverarbeiter sind
abonniert bzw. werden regelmäßig geprüft.]`

(4) **Widerspruch.** Der Träger kann einer Änderung innerhalb von 14 Tagen nach der Mitteilung
aus Gründen des Datenschutzes in Textform widersprechen. Dann suchen die Parteien eine Lösung.
Gelingt das nicht, kann der Träger die Nutzung in Fall B aussetzen und den Hauptvertrag mit
sofortiger Wirkung kündigen; bereits gezahlte Entgelte für die Restlaufzeit erstattet Webklar
anteilig für jeden vollen Monat, wie in § 5 Abs. 6 der Bedingungen für Einrichtungen. Ehrlicher
Hinweis: Den Einsatz eines neuen Unterauftragsverarbeiters **bei** Cloudflare oder Anthropic kann
Webklar nicht verhindern. Die Widerspruchsfristen dort (Cloudflare 10 Tage, Anthropic 15 Tage)
sind kürzer als die Frist des Trägers. Ein Widerspruch des Trägers kann deshalb in der Regel
nicht mehr an Cloudflare oder Anthropic weitergegeben werden (Anlage 2).

(5) **Weitergabe der Pflichten (Art. 28 Abs. 4 DSGVO).** Cloudflare und Anthropic sind durch
ihre Standard-Auftragsverarbeitungsverträge (DPA) gebunden, die Webklar nicht verhandeln kann.
Diese enthalten die Pflichten nach Art. 28 Abs. 3 DSGVO in eigener Ausgestaltung. Wo sie von
diesem Vertrag abweichen (z. B. Kontrolle vorrangig über Prüfberichte, kürzere
Widerspruchsfristen, Speicherdauer bei Anthropic), ist das in Anlage 2 beschrieben. Der Träger
nimmt das zur Kenntnis. `[Abstimmungspunkt mit der DSB, anwaltlich prüfen: Art. 28 Abs. 4 DSGVO
verlangt „dieselben“ Pflichten für Unterauftragsverarbeiter. Die Kenntnisnahme heilt eine
Abweichung nicht; sie macht sie nur sichtbar. Ob die Abweichungen in der Sache hinnehmbar sind,
muss der Träger bewerten.]`

(6) Webklar haftet gegenüber dem Träger für die Einhaltung der Pflichten durch die
Unterauftragsverarbeiter (Art. 28 Abs. 4 Satz 2 DSGVO).

(7) Keine Unterauftragsverarbeitung sind Nebenleistungen wie Telekommunikation, Internetzugang
oder Post.

### § 11 Übermittlung in Drittländer

(1) Webklar selbst verarbeitet die Daten nur in der EU. `[zu bestätigen durch Webklar: Zugriff
auf Cloudflare- und Anthropic-Konto nur aus der EU.]`

(2) Cloudflare und Anthropic haben ihren Sitz bzw. ihre Muttergesellschaft in den USA und
verarbeiten Daten auch dort. Eine Beschränkung auf die EU ist nicht eingestellt: Bei
Anthropic ist keine EU-Region gewählt, und die Zwischenspeicher für die Übergabe (Cloudflare
Durable Objects) sind ohne EU-Beschränkung angelegt.

(3) Webklar stützt die Übermittlung auf die EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c
DSGVO). Sie sind Teil der Auftragsverarbeitungsverträge von Cloudflare und Anthropic. Für Fall B
sieht das DPA von Cloudflare Modul 3 (Auftragsverarbeiter an Unterauftragsverarbeiter) vor; das DPA
von Anthropic nennt Modul 2 und/oder Modul 3, soweit erforderlich (Anlage 2).
`[anwaltlich prüfen: Laut Abruf vom 28.10.2026 behandelt das DPA von Cloudflare (Ziff. 6)
Übermittlungen, die unter einen Angemessenheitsbeschluss fallen, nicht als Drittlandübermittlung
im Sinne des DPA; die Standardvertragsklauseln greifen dann erst, wenn diese Grundlage entfällt.
Bei Anthropic ist Vertragspartner für Kunden im EWR laut Commercial Terms die Anthropic Ireland,
Limited; die Übermittlung in die USA fände dann innerhalb der Anthropic-Gruppe statt. Welche
Grundlage jeweils tatsächlich greift, ist zu klären, bevor dieser Absatz so bleibt.]`
Einzelheiten und Fundstellen in Anlage 2.

(4) **Ehrliche Einordnung.** US-Behörden können unter Umständen auf Daten bei US-Anbietern
zugreifen. Webklar mindert das so: keine Speicherung von Briefen bei Webklar, keine Kennungen
der Stelle oder der Person in den Anfragen an Anthropic, Ende-zu-Ende-Verschlüsselung bei der
Übergabe. Der Brief selbst ist auf dem Weg zur KI nur durch TLS geschützt; Cloudflare
verarbeitet ihn auf seinem Server, und Anthropic muss ihn lesen, um ihn zu erklären.

(5) Soweit Webklar Daten selbst in ein Drittland übermittelt (Datenexporteur), bewertet und
dokumentiert Webklar die Übermittlung (Transfer-Folgenabschätzung, Klausel 14 der
Standardvertragsklauseln) und stellt die Bewertung dem Träger zur Verfügung. `[zu bestätigen
durch Webklar: Die Bewertung ist noch zu erstellen.]` Der Träger bewertet die Übermittlung für
sich als Verantwortlicher; Webklar unterstützt ihn mit den nötigen Informationen.

(6) Entfällt die Grundlage für eine Übermittlung, informiert Webklar den Träger unverzüglich.
Der Träger kann dann die Nutzung in Fall B aussetzen und nach § 10 Abs. 4 kündigen.

### § 12 Unterstützung bei den Rechten der Betroffenen

(1) Wendet sich eine betroffene Person direkt an Webklar, leitet Webklar die Anfrage
unverzüglich an den Träger weiter. Webklar antwortet nur auf Weisung des Trägers.

(2) Webklar unterstützt den Träger bei Auskunft, Berichtigung, Löschung, Einschränkung,
Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO) im Rahmen dessen, was technisch
möglich ist. **Ehrlicher Hinweis zu den Grenzen:**

- Webklar speichert keine Briefe und keine Erklärungen. Zu einer Person liegt bei Webklar daher
  in der Regel nichts vor.
- Anfragen an Anthropic tragen keine Kennung der Person. Webklar kann einzelne Briefe bei
  Anthropic deshalb nicht gezielt finden. Anthropic löscht sie in der Regel nach 30 Tagen von
  selbst, bei Einstufung als Verstoß gegen die Nutzungsrichtlinien erst nach bis zu 2 Jahren
  (§ 15 Abs. 1). `[zu bestätigen durch Webklar: Ob Anthropic auf Anfrage einzelne Vorgänge
  vorzeitig löschen oder beauskunften kann.]`
- Erklärungen im Browser der Stelle, Ausdrucke und gespeicherte PDFs liegen bei der Stelle.

(3) Für diese Unterstützung berechnet Webklar nichts gesondert.

### § 13 Unterstützung bei Sicherheit, Meldungen und Folgenabschätzung (Art. 32 bis 36 DSGVO)

(1) **Sicherheit (Art. 32):** durch die Maßnahmen nach Anlage 1.

(2) **Meldungen (Art. 33, 34):** nach § 14.

(3) **Datenschutz-Folgenabschätzung (Art. 35).** Ob sie nötig ist, entscheidet der Träger.
Besondere Kategorien, schutzbedürftige Personen, der Einsatz einer KI und die Übermittlung in
die USA sprechen dafür, sie durchzuführen. Webklar liefert dafür auf Anfrage alle Angaben:
Beschreibung der Verarbeitung, Datenflüsse, Maßnahmen, Unterauftragsverarbeiter,
Speicherdauern und bekannte Grenzen. Ein Entwurf dieser Angaben liegt als gesonderte Unterlage
vor (`dsfa-bausteine.md`, ebenfalls Entwurf).

(4) **Vorherige Konsultation (Art. 36):** Webklar unterstützt den Träger, falls er die
Aufsichtsbehörde konsultiert.

(5) **Aufsichtsbehörden (Art. 31).** Webklar arbeitet mit der Aufsichtsbehörde zusammen und
informiert den Träger unverzüglich über Anfragen oder Kontrollen einer Behörde, die diese
Verarbeitung betreffen, soweit das zulässig ist.

### § 14 Meldung von Verletzungen und Störungen

(1) Webklar meldet dem Träger **unverzüglich, spätestens 24 Stunden** nachdem Webklar davon
erfährt `[zu bestätigen durch Webklar: Die 24 Stunden müssen auch an Wochenenden, Feiertagen und
im Urlaub einzuhalten sein, Vertretung siehe Anlage 1 Nr. 10. Kann Webklar das nicht sicher
leisten, besser „spätestens 48 Stunden“ vereinbaren; der Träger hat selbst 72 Stunden
(Art. 33 Abs. 1 DSGVO).]`:

- jede Verletzung des Schutzes personenbezogener Daten (Art. 4 Nr. 12 DSGVO), die Daten aus
  diesem Auftrag betrifft, auch bei einem Unterauftragsverarbeiter;
- den begründeten Verdacht einer solchen Verletzung;
- schwerwiegende Störungen und Verstöße gegen diesen Vertrag.

(2) Die Meldung enthält, soweit bekannt, die Angaben nach Art. 33 Abs. 3 DSGVO: Art der
Verletzung, betroffene Kategorien und ungefähre Zahl der Personen und Datensätze, eine
Kontaktperson, wahrscheinliche Folgen und ergriffene oder vorgeschlagene Maßnahmen. Was noch
nicht bekannt ist, reicht Webklar nach.

(3) Webklar meldet per Telefon und E-Mail an die Kontakte des Trägers aus § 18.

(4) Webklar ergreift sofort Maßnahmen, um die Daten zu sichern und Folgen zu mindern, und
dokumentiert den Vorfall.

(5) Meldungen an die Aufsichtsbehörde und an Betroffene macht der Träger. Webklar äußert sich
dazu nach außen nur auf Weisung des Trägers.

(6) Von Vorfällen bei Cloudflare oder Anthropic erfährt Webklar nur über deren Meldungen
(Fristen in Anlage 2). Die 24-Stunden-Frist beginnt dann mit dem Eingang dieser Meldung bei
Webklar.

### § 15 Löschung und Rückgabe

(1) **Während der Laufzeit:**

- Brief und Erklärung speichert Webklar nicht; sie laufen nur durch den Server.
- Übergabe-Päckchen werden beim Abholen gelöscht, sonst automatisch spätestens 15 Minuten nach
  dem letzten Päckchen. `[zu bestätigen durch Webklar: Cloudflare hält für diese Speicher eine
  Wiederherstellungsfunktion von 30 Tagen vor (Anlage 1, Nr. 8); die Päckchen sind
  verschlüsselt, den Schlüssel haben weder Webklar noch Cloudflare.]`
- Bei Anthropic werden Brief und Erklärung in der Regel nach 30 Tagen gelöscht. Stuft
  Anthropic eine Anfrage als Verstoß gegen seine Nutzungsrichtlinien ein, bewahrt Anthropic
  sie nach eigenen Angaben bis zu 2 Jahre auf. Darauf hat Webklar keinen Einfluss.

(2) **Bei Vertragsende:**

- Nach Abschluss der Verarbeitung löscht Webklar nach Wahl des Trägers alle personenbezogenen
  Daten aus dem Auftrag oder gibt sie ihm zurück und löscht vorhandene Kopien, soweit nicht nach
  dem Recht der EU oder Deutschlands eine Pflicht zur Speicherung besteht (Art. 28 Abs. 3 lit. g
  DSGVO). Praktisch gibt es nichts zurückzugeben: Webklar hält keine Briefe und keine
  Erklärungen. Für Daten bei Anthropic gilt Abs. 1; nach dem DPA von Anthropic löscht Anthropic
  Kundendaten innerhalb von 30 Tagen nach Ende des Vertrags zwischen Webklar und Anthropic, mit
  Ausnahmen (Anlage 2).
- Macht die Stelle nicht weiter, sperrt Webklar den Einrichtungs-Code spätestens am letzten
  Vertragstag (in der Regel läuft er an diesem Tag ohnehin ab).
- Webklar löscht die Einrichtungs-Daten (Code, Kennung, Name der Stelle, Ablaufdatum,
  Restkontingent) innerhalb von 30 Tagen nach Vertragsende, soweit die Stelle nicht
  weitermachen möchte. `[zu bestätigen durch Webklar: Verfahren; das Code-Werkzeug hat bisher
  einen Befehl zum Sperren, aber keinen zum Löschen.]`
- Die Nutzungszähler (nur Datum und Sprache) laufen spätestens nach 13 Monaten automatisch ab.
  Auf Wunsch löscht Webklar sie früher. `[zu bestätigen durch Webklar: Verfahren; das
  Code-Werkzeug hat dafür keinen Befehl.]`

(3) Daten im Browser der Geräte der Stelle (Zugangs-Nachweis, Code, Name der Stelle,
Ablaufdatum, übrige Briefe, Sprache) löscht die Stelle selbst, indem sie die Website-Daten von
behoerdenklar.de im Browser löscht.

(4) Auf Wunsch bestätigt Webklar die Löschung in Textform.

(5) Rechnungen und andere Vertragsunterlagen bewahrt Webklar nach den gesetzlichen Fristen auf.
Sie enthalten keine Daten von Ratsuchenden.

### § 16 Nachweise und Kontrollen

(1) Webklar stellt dem Träger alle Informationen zur Verfügung, die er zum Nachweis der
Pflichten aus Art. 28 DSGVO braucht (Art. 28 Abs. 3 lit. h DSGVO), insbesondere diesen Vertrag
mit Anlagen, das Datenschutz-Blatt, die Datenschutzerklärung, das Verzeichnis der
Verarbeitungstätigkeiten von Webklar als Auftragsverarbeiter (Art. 30 Abs. 2 DSGVO)
`[zu bestätigen durch Webklar: Entwurf liegt in vvt-baustein.md, Teil B; ausfüllen und intern
führen]` und, soweit Webklar sie weitergeben
darf, die Prüfberichte der Unterauftragsverarbeiter. Der Quelltext von Server und Webseite ist
öffentlich einsehbar; Webklar nennt die Fundstelle auf Anfrage.

(2) Der Träger oder eine von ihm beauftragte, zur Verschwiegenheit verpflichtete Person, die
nicht für einen Wettbewerber von Webklar tätig ist, kann die Einhaltung dieses Vertrags
kontrollieren. Kontrollen werden in der Regel 14 Tage vorher angemeldet, finden zu üblichen
Geschäftszeiten statt und höchstens einmal im Jahr, außer es gibt einen Anlass (z. B. einen
Vorfall oder eine Anfrage der Aufsichtsbehörde).

(3) Webklar betreibt keine eigenen Server und keine eigenen Geschäftsräume mit Technik. Eine
Kontrolle geschieht deshalb in der Regel durch Vorlage von Unterlagen, Vorführen der
Einstellungen (z. B. per Bildschirmfreigabe) und ein Gespräch.

(4) Die Unterauftragsverarbeiter werden über ihre Prüfberichte und Zertifikate kontrolliert.
Kontrollen vor Ort sind dort nur nach deren Verträgen möglich (Anlage 2).

(5) Jede Partei trägt ihre eigenen Kosten der Kontrolle.

### § 17 Haftung

(1) Für die Haftung gegenüber Betroffenen gilt Art. 82 DSGVO.

(2) Im Verhältnis zwischen Träger und Webklar gelten die Haftungsregeln des Hauptvertrags,
soweit Art. 82 DSGVO nichts anderes bestimmt. `[anwaltlich prüfen: Der Entwurf der Bedingungen für
Einrichtungen (§ 12 Abs. 6) verweist für den Datenschutz zurück auf diesen Vertrag. Zu klären
ist, ob die dortige Haftungsbegrenzung auch für die Haftung für Unterauftragsverarbeiter nach
§ 10 Abs. 6 (Art. 28 Abs. 4 Satz 2 DSGVO) gelten darf und ob sie als Formularklausel im
Verhältnis zu einem gemeinnützigen Träger hält (§ 307 BGB).]`

### § 18 Ansprechpartner und Schlussbestimmungen

(1) **Ansprechpartner:**

| | Träger | Webklar |
|---|---|---|
| Datenschutz | [NAME, TELEFON, E-MAIL] | Justin Klein, Tel. 0170 4969375, justin@webklar.com |
| Vertretung | [NAME, TELEFON, E-MAIL] | Kenso Grimm, [TELEFON, E-MAIL] |
| Datenschutzbeauftragte/r | [NAME, KONTAKT] | derzeit nicht benannt, siehe § 1 Abs. 2 |
| Meldungen nach § 14 | [TELEFON, E-MAIL] | wie oben |

Änderungen der Ansprechpartner teilen sich die Parteien in Textform mit.

(2) Dieser Vertrag kann auch in elektronischem Format geschlossen werden (Art. 28 Abs. 9
DSGVO). Änderungen und Ergänzungen bedürfen der Textform.

(3) Die Anlagen 1 und 2 sind Teil dieses Vertrags.

(4) Ist eine Bestimmung unwirksam, bleibt der Vertrag im Übrigen wirksam. An die Stelle der
unwirksamen Bestimmung tritt die gesetzliche Regelung, insbesondere Art. 28 DSGVO (§ 306 BGB).

(5) Es gilt deutsches Recht.

---

**Für den Träger**

Ort, Datum: ______________________

Name, Funktion: ______________________ Unterschrift: ______________________

**Für die Webklar GbR**

Ort, Datum: ______________________

Justin Klein: ______________________ Kenso Grimm: ______________________

`[zu bestätigen durch Webklar: Ob einer der Gesellschafter allein vertreten darf. Ohne
abweichende Regel im Gesellschaftsvertrag vertreten die Gesellschafter einer GbR gemeinsam
(§ 720 Abs. 1 BGB); dann unterschreiben beide.]`

---

## Offene Punkte vor der Unterzeichnung (nicht Teil des Vertrags)

1. Lesart für Fall A mit der DSB abstimmen und in § 1 Abs. 3 ankreuzen (Teil A).
2. Text am Häkchen für Fall B (Mitarbeitende) und für Fall A2 (Erklärung erscheint auch am
   PC der Stelle) prüfen (§ 6 Abs. 2, Teil A).
3. § 203 StGB: Reichen die Standardverträge der Unterauftragsverarbeiter (§ 8 Abs. 3)?
4. Vertragspartner bei Anthropic klären: Laut Commercial Terms ist für Kunden im EWR die
   Anthropic Ireland, Limited Vertragspartner, die Datenschutzerklärung nennt Anthropic PBC
   (Anlage 2).
5. Datenschutzbeauftragte/r bei Webklar: Benennungspflicht prüfen (§ 1 Abs. 2).
6. Verzeichnis der Verarbeitungstätigkeiten von Webklar als Auftragsverarbeiter aus dem Entwurf
   in `vvt-baustein.md` (Teil B) fertigstellen (§ 16 Abs. 1).
7. Grundlage der Übermittlung klären: Cloudflare-DPA Ziff. 6 und Vertragspartner bei Anthropic
   (§ 11 Abs. 3). Danach Datenschutzerklärung und Datenschutz-Blatt angleichen.
8. Transfer-Folgenabschätzung von Webklar erstellen (§ 11 Abs. 5).
9. Rechtsgrundlage für Briefe mit Angaben zu Straftaten klären (§ 4 Abs. 3, Art. 10 DSGVO).
10. Meldefrist von 24 Stunden nur zusagen, wenn Webklar sie mit Vertretung sicher halten kann
    (§ 14 Abs. 1).
11. Haftung und Abweichungen der Standardverträge anwaltlich prüfen (§ 10 Abs. 5, § 17 Abs. 2).
12. Schriftliche Verpflichtung der Gesellschafter auf Vertraulichkeit und § 203 StGB
    unterschreiben (§ 8).
13. „Ergebnis aufs Handy mitnehmen“ bei Erklärungen aus Fall A2 unter Lesart 1 regeln (Teil A.2,
    Lesart 1, Folgen).
14. Server-Protokolle: klären, ob gekürzte Fehlermeldungen des KI-Dienstes Briefteile enthalten
    können (§ 5 Abs. 1, Anlage 1 Nr. 5).
15. Alle `[zu bestätigen durch Webklar]`-Stellen in diesem Vertrag und in Anlage 1 klären.
