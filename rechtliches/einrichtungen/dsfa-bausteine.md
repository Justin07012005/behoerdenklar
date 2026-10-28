> **ENTWURF, Stand 28.10.2026. Von Claude erstellt, keine Rechtsberatung. Vor dem ersten Einsatz anwaltlich bzw. durch die Datenschutzbeauftragte prüfen lassen.**

# Bausteine für eine Datenschutz-Folgenabschätzung (Art. 35 DSGVO)

**Dienst:** BehördenKlar, Webseite `behoerdenklar.de/demo`, Zugang über einen Einrichtungs-Code
**Anbieter:** Webklar GbR, vertreten durch Justin Klein und Kenso Grimm, Am Schwimmbad 10, 67722 Winnweiler, Tel. 0170 4969375, justin@webklar.com
**Für:** die Datenschutzbeauftragte (DSB) eines Trägers von Beratungsstellen. Zuerst: [TRÄGER, z. B. Förderinitiative Donnersberg e.V.] für die Migrationsberatung für erwachsene Zugewanderte (MBE) Donnersberg
**Rechtsrahmen:** DSGVO und BDSG (nicht KDG, nicht DSG-EKD). Zuständige Aufsicht für den Träger und für Webklar: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.

---

## So benutzen Sie dieses Dokument

- Das sind **Bausteine**, keine fertige Folgenabschätzung. Ob eine DSFA nötig ist, wie die Risiken zu bewerten sind und ob die Verarbeitung beginnen darf, entscheidet der Verantwortliche. Übernehmen Sie, was passt, und ändern Sie den Rest.
- Was hier über das **System** steht, ist am Quellcode geprüft (Entwurf von Claude, von Webklar gegenzulesen). Die Fundstellen stehen als `Datei:Zeile` (Stand des Codes: 28.10.2026, spätere Änderungen können die Zeilen verschieben). Der Quellcode ist öffentlich einsehbar [Link zum Repository zu bestätigen durch Webklar].
- Markierungen:
  - **[zu bestätigen durch Webklar]**: Webklar hat das noch nicht belegt. Bitte nicht als Tatsache übernehmen.
  - **[vom Verantwortlichen festzulegen]**: Ihre Entscheidung.
  - **Vorschlag**: Einschätzung von Webklar. Sie ersetzt Ihre Bewertung nicht.
- Zwei Fälle, die das Datenschutz-Blatt vom 25.10.2026 unterscheidet:
  - **Fall A:** Die ratsuchende Person nutzt den Dienst selbst, mit ihrem eigenen Handy und ihrem eigenen Häkchen, zu Hause oder in der Beratung (Knopf „Lieber mit dem Handy fotografieren“ am Beratungs-PC). Verantwortlich für Hochladen und Erklärung ist laut Blatt **Webklar**. Das ist ein Vorschlag, keine Festlegung (siehe unten).
  - **Fall B:** Die Beraterin lädt den Brief einer Klientin am Dienst-PC hoch. Dann ist laut Blatt die **Beratungsstelle bzw. ihr Träger verantwortlich**, Webklar arbeitet als **Auftragsverarbeiter** (Art. 28 DSGVO), Cloudflare und Anthropic als Unterauftragsverarbeiter.
- **Begriffe wie im AVV-Entwurf** (`rechtliches/einrichtungen/avv-entwurf.md`, Teil A): Fall A hat zwei Spielarten, **A1** (zu Hause, ohne die Stelle; nicht vorgesehen, weil der Code nach den Bedingungen für Einrichtungen § 9 Abs. 1 nur für Mitarbeitende ist, kommt also nur bei einer Weitergabe des Codes vor) und **A2** (in der Beratung, die Erklärung erscheint auch am Dienst-PC). Für die Rolle in Fall A nennt der Entwurf zwei Lesarten: **Lesart 1** Webklar ist verantwortlich (so das Datenschutz-Blatt), **Lesart 2** der Träger ist verantwortlich und Webklar Auftragsverarbeiter. Denkbar ist auch eine gemeinsame Verantwortlichkeit (Art. 26). Dieses Dokument folgt Lesart 1, wo nichts anderes steht. Entscheidet sich der Träger für Lesart 2, gelten die Angaben zu Fall B auch für Fall A.
- Im Test bis 29.11.2026 ist Fall A vorgesehen. Die Kurzanleitung für Beratende sagt: „Nur übers Handy der Person. Briefe nicht selbst am PC hochladen.“ (`marketing/praesentation-mbe/kurzanleitung-beratung.html:158`). Fall B setzt einen Auftragsverarbeitungsvertrag (AVV) voraus.

---

## 0. Vorfrage: Ist eine DSFA Pflicht, und für wen?

| | Wer ist verantwortlich? | Wer prüft die DSFA-Pflicht? |
|---|---|---|
| Fall A, Hochladen und Erklären | Webklar GbR (Lesart 1). Bei Lesart 2: Träger | Webklar, für die eigene Verarbeitung. Bei Lesart 2: Träger |
| Fall A, Anzeige und Ausdruck der Erklärung am Dienst-PC | [vom Verantwortlichen festzulegen, siehe 3.1] | Träger, soweit eigene Verarbeitung |
| Fall B | Träger der Beratungsstelle | Träger. Webklar unterstützt nach Art. 28 Abs. 3 lit. f DSGVO |

**Anhaltspunkte (keine Festlegung):**

- **Art. 35 Abs. 1 DSGVO:** Es wird eine neue Technologie eingesetzt (generative KI). Briefe von Behörden enthalten oft sehr persönliche Angaben.
- **Art. 35 Abs. 3 lit. b DSGVO:** Pflicht bei *umfangreicher* Verarbeitung besonderer Kategorien (Art. 9) oder von Daten über Straftaten (Art. 10). Ob das bei bis zu 1.200 Briefen pro Stelle und Jahr (Paket „Standard“) „umfangreich“ ist: [vom Verantwortlichen festzulegen].
- **Liste der DSK für den nicht-öffentlichen Bereich („Muss-Liste“), Nr. 11:** Sie betrifft den Einsatz von KI zur Verarbeitung personenbezogener Daten, um die Interaktion mit Betroffenen zu steuern oder persönliche Aspekte zu bewerten. Das könnte greifen: Die KI erzeugt für die Person eine Erklärung. Dagegen spricht: Sie bewertet die Person nicht und trifft keine Entscheidung. Bitte Wortlaut und aktuelle Fassung der Liste prüfen. Falls die Beratenden Berufsgeheimnisträger sind (§ 203 StGB), bitte auch den Listenpunkt zu Daten prüfen, die einem Berufsgeheimnis unterliegen.
- **Leitlinien WP 248 rev.01 (vom Europäischen Datenschutzausschuss bestätigt):** Sind zwei oder mehr Kriterien erfüllt, ist in der Regel eine DSFA angezeigt. Hier kommen in Betracht: *sensible oder höchstpersönliche Daten* (ja), *schutzbedürftige Betroffene* (Sprachbarriere, Abhängigkeit von der Beratung, aufenthaltsrechtliche Lage; die Leitlinien nennen Asylsuchende ausdrücklich als Beispiel) und *innovative Nutzung neuer Technologien* (KI). Nicht einschlägig: automatisierte Entscheidung mit Rechtswirkung (Art. 22). Die KI entscheidet nichts.
- **Ergebnis der Schwellwertprüfung:** [vom Verantwortlichen festzulegen: DSFA ja / nein, Begründung, Datum, Name].
- Auch ohne Pflicht helfen die Bausteine bei der Rechenschaftspflicht (Art. 5 Abs. 2) und bei der Sicherheit der Verarbeitung (Art. 32).
- **Art. 35 Abs. 2:** Der Rat der DSB ist einzuholen. **Art. 35 Abs. 9:** Gegebenenfalls Standpunkt der Betroffenen einholen, zum Beispiel über Rückmeldungen von Ratsuchenden im Test. [vom Verantwortlichen festzulegen]

---

## 1. Systematische Beschreibung (Art. 35 Abs. 7 lit. a)

### 1.1 Was BehördenKlar tut

BehördenKlar erklärt Briefe von Behörden in einfacher Sprache (Niveau A2/B1), auf Wunsch in 27 Sprachen. Aus einem Foto oder PDF erstellt eine KI (Claude von Anthropic) eine strukturierte Erklärung: Art des Briefs, Absender, Kernaussage, Erklärung, Fachbegriffe, Frist, Termin, To-do-Liste, Kontaktangaben aus dem Brief und Sätze für einen Anruf (`proxy/src/index.ts:131-196`). Es gibt kein Nutzerkonto. Mit einem Einrichtungs-Code zahlt die Stelle, die Ratsuchenden zahlen nichts.

### 1.2 Gegenstand und Abgrenzung

**Gegenstand:**
- Webseite `behoerdenklar.de/demo` mit Einrichtungs-Code, am Dienst-PC und am Handy der Person
- Übergabe zwischen Handy und PC per QR-Code (Ende-zu-Ende-verschlüsselt)
- Zusatzfunktionen am PC: Drucken oder als PDF speichern, Kalender-Datei, „Ergebnis aufs Handy mitnehmen“, „Zugang dauerhaft auf ein Handy geben (nur für Mitarbeitende)“, „Fertig, nächste Person“

**Nicht Gegenstand:**
- Die iOS-App (eigene Route im Server, nicht Teil des Einrichtungs-Zugangs; noch nicht im App Store [zu bestätigen durch Webklar])
- Funktionen nur für Privatpersonen: 2 Gratis-Analysen, Kauf von Guthaben über Stripe, E-Mail über Brevo. Im Code-Zugang laufen die Gratis-Zähler nicht (`proxy/src/index.ts:336-388`, nur ohne Guthaben), Stripe und Brevo werden nicht aufgerufen.
- Vertrags- und Rechnungsdaten zwischen Träger und Webklar (eigene Verarbeitung von Webklar)

### 1.3 Beteiligte und Rollen

| Beteiligte | Rolle in Fall A | Rolle in Fall B |
|---|---|---|
| Ratsuchende Person | Betroffene, nutzt den Dienst selbst und willigt selbst ein | Betroffene |
| Beratungsstelle / Träger | Stellt Code und QR-Code bereit, sieht die Erklärung am Dienst-PC, kann drucken. Rolle dabei: [vom Verantwortlichen festzulegen, siehe 3.1] | Verantwortlicher (Art. 4 Nr. 7) |
| Webklar GbR | Verantwortlicher (Lesart 1) | Auftragsverarbeiter (Art. 28) |
| Cloudflare, Inc. (USA) | Auftragsverarbeiter von Webklar. Bei Turnstile für die Verbesserung des Dienstes laut Cloudflare selbst Verantwortlicher (Anlage 2 zum AVV) | Unterauftragsverarbeiter, Turnstile wie links |
| Anthropic (KI) | Auftragsverarbeiter von Webklar | Unterauftragsverarbeiter |

Rollen wie im Datenschutz-Blatt (`marketing/praesentation-mbe/datenschutz-blatt.html:248-269`). Zu Lesart 2 und zur gemeinsamen Verantwortlichkeit: AVV-Entwurf Teil A.2.

**Anthropic:** Datenschutzerklärung und Blatt nennen die Anthropic PBC (USA). Laut den Commercial Terms ist für Kunden mit Sitz im EWR die Anthropic Ireland, Limited Vertragspartner, die KI betreibt die Anthropic PBC (Anlage 2 zum AVV). Welche Gesellschaft im Konto von Webklar Vertragspartner ist: [zu bestätigen durch Webklar].

### 1.4 Ablauf Fall A: Person fotografiert mit dem eigenen Handy, in der Beratung

1. **QR-Code am Dienst-PC.** Die Beraterin klickt „Lieber mit dem Handy fotografieren“. Der Browser des PCs erzeugt eine zufällige Übergabe-Kennung (128 Bit) und einen neuen AES-256-Schlüssel (`webseite/uebergabe.js:35-38`). Der QR-Code enthält hinter dem `#` der Adresse: Kennung, Schlüssel, gewählte Sprache, den Zugangs-Nachweis der Stelle und den Namen der Stelle (`webseite/demo.html:1565-1576`). Den Teil hinter `#` schicken Browser nicht an Server (`webseite/uebergabe.js:89-96`).
2. **Handy der Person.** Die Person scannt den Code. Die Seite entfernt Schlüssel und Kennung aus der Adresszeile (`webseite/demo.html:1896-1899`) und merkt sie sich nur für diesen Browser-Tab (sessionStorage), bis die Erklärung angekommen ist (`webseite/demo.html:1891-1895`, `1044`). Die Sprache wird nicht dauerhaft gespeichert (`webseite/demo.html:1773-1777`). Am Handy steht: Die Erklärung erscheint hier und auf dem Bildschirm (Text „verbunden“ in `webseite/ui-texte.js`).
3. **Einwilligung.** Die Person setzt das Häkchen. Ohne Häkchen startet kein Hochladen (`webseite/demo.html:843-850`). Text am Häkchen: `webseite/demo.html:339-350`, am Handy in der Sprache der Person (`webseite/ui-texte.js`).
4. **Foto.** Der Browser verkleinert das Foto auf höchstens 2.000 Pixel Kantenlänge und speichert es neu als JPEG mit 60 % Qualität (`webseite/demo.html:591`, `901-914`). PDFs gehen unverändert, höchstens 5 MB (`webseite/demo.html:920-931`).
5. **Weg zum Server.** Foto, Zugangs-Nachweis und Bot-Schutz-Token gehen per TLS an den Server von Webklar (Cloudflare Worker). Er prüft Bot-Schutz (Turnstile, dabei wird die IP-Adresse an Cloudflare übergeben: `proxy/src/index.ts:294-304`), Zugang, Ablaufdatum und Restguthaben (`proxy/src/index.ts:314-333`), Dateityp und Größe (`proxy/src/index.ts:284-289`).
6. **KI.** Der Server schickt die Datei mit einer festen Anweisung und dem heutigen Datum an Anthropic, Modell `claude-sonnet-5` (`proxy/src/index.ts:391-422`). Ist am PC „Hier am Bildschirm immer auf Deutsch zeigen“ angehakt (Voreinstellung, `webseite/demo.html:376-379`) und hat die Person eine andere Sprache, erklärt die KI zuerst auf Deutsch. Ein zweiter Aufruf (`claude-haiku-4-5`) übersetzt dann die fertige Erklärung, nicht das Foto (`proxy/src/index.ts:220-252`, `279-282`, `504-515`).
7. **Zählen.** Erst wenn der KI-Dienst ohne Fehler geantwortet hat: Restguthaben minus 1, dazu ein Nutzungszähler mit Datum und Sprache (`proxy/src/index.ts:454-470`). Fehler des KI-Dienstes kosten nichts. Eine Antwort, die danach nicht verwertbar ist (z. B. Ablehnung durch die KI), zählt mit (`proxy/src/index.ts:486-499`).
8. **Antwort.** Die Erklärung geht an das Handy zurück. Der Server speichert sie nicht (`proxy/src/index.ts:517-528`).
9. **Übergabe an den PC.** Das Handy verschlüsselt die Erklärung (AES-256-GCM, `webseite/uebergabe.js:46-53`) und legt sie als „Päckchen“ auf dem Server ab. Der PC holt und entschlüsselt sie und löscht die Übergabe sofort (`webseite/demo.html:1651-1656`). Sonst löscht der Server sie 15 Minuten nach dem letzten Päckchen (`proxy/src/index.ts:807`, `821-837`).
10. **Am PC.** Die Erklärung steht auf Deutsch in der offenen Seite, am Handy in der Sprache der Person. „Fertig, nächste Person“ lädt die Seite neu und leert Häkchen, E-Mail-Feld und Sprache (`webseite/demo.html:1720-1733`).

**Fall A ohne Beratung (A1):** Die Person nutzt die Seite mit dem Code auf dem eigenen Handy, etwa zu Hause. Dann entfallen Schritte 1, 2 und 9. Vorgesehen ist das nicht: Der Code ist nur für Mitarbeitende (Bedingungen für Einrichtungen § 9 Abs. 1; „nur für Mitarbeitende“ auf Zugangskarte und Kurzanleitung, `marketing/praesentation-mbe/zugangskarte.html:69`, `kurzanleitung-beratung.html:123`). A1 kommt nur vor, wenn der Code weitergegeben wurde.

### 1.5 Ablauf Fall B: Die Stelle lädt am Dienst-PC hoch

Wie Fall A, Schritte 3 bis 8, aber am Dienst-PC: Die Beraterin setzt das Häkchen und wählt die Datei (Foto oder Scan) aus. Einen Übersetzungsschritt gibt es dabei nicht, die KI schreibt direkt in der gewählten Sprache (`proxy/src/index.ts:408-410`). Das Datenschutz-Blatt sagt dazu: Das Häkchen der Beraterin „ersetzt keine Einwilligung der Klientin“ (`marketing/praesentation-mbe/datenschutz-blatt.html:267`). Die Datei, die die Beraterin auswählt, liegt vorher schon auf dem Dienst-PC oder Scanner. Das liegt außerhalb von BehördenKlar.

### 1.6 Zusatzfunktionen am Dienst-PC

| Funktion | Was passiert | Fundstelle |
|---|---|---|
| Drucken oder als PDF | Druck der Erklärung mit Name der Stelle und Datum, Hinweis „Maßgeblich ist immer der Originalbrief.“ Ein Ausdruck oder PDF ist eine Kopie bei der Stelle. | `webseite/demo.html:1704-1717` |
| Kalender | Der Browser erzeugt eine `.ics`-Datei mit Frist und Termin. Nichts wird hochgeladen. Am PC würde die Datei auf dem Dienst-PC landen, deshalb „Kalender nur am Handy“. | `webseite/demo.html:1225-1362`, Kurzanleitung `:203` |
| Ergebnis aufs Handy mitnehmen | Der PC verschlüsselt die Erklärung und den Namen der Stelle und legt sie auf dem Server ab. Das Handy holt sie über einen QR-Code, danach wird gelöscht, sonst nach 15 Minuten. | `webseite/demo.html:1735-1750`, `1807` |
| Zugang dauerhaft auf ein Handy geben (nur für Mitarbeitende) | Zugangs-Nachweis, Restzahl und Name der Stelle gehen per QR-Code in den Browser-Speicher eines Handys. Keine Briefdaten. | `webseite/demo.html:1752-1759`, `1818-1830` |
| Fertig, nächste Person | Erklärung und Verbindung weg, Häkchen leer, Sprache zurück auf Deutsch. Der Zugang der Stelle bleibt. | `webseite/demo.html:1720-1733` |

### 1.7 Welche Daten, wo und wie lange

| Daten | Beispiele | Wo | Wie lange | Fundstelle |
|---|---|---|---|---|
| Brief (Foto oder PDF) | Name, Anschrift, Geburtsdatum, Aktenzeichen, Kunden- oder BG-Nummer, Leistungen, Aufenthaltsstatus, Gesundheit, Schulden, Familienangehörige, Daten über Straftaten oder Ordnungswidrigkeiten | Browser → Server von Webklar (nur Durchleitung) → Anthropic | Webklar: keine Speicherung. Anthropic: in der Regel 30 Tage, kein Training. Stufen die Sicherheitssysteme von Anthropic eine Anfrage als Verstoß gegen die Nutzungsrichtlinien ein, bis zu 2 Jahre (laut Anlage 2 zum AVV) | `proxy/src/index.ts:391-422`; `webseite/datenschutz.html:62-66`, `116`; `rechtliches/einrichtungen/anlage-2-unterauftragsverarbeiter.md` |
| Erklärung (KI-Ergebnis) | Zusammenfassung des Briefs, Frist, Termin, Kontaktdaten aus dem Brief | Anthropic → Server (Durchleitung) → Browser; bei Übersetzung zweiter Aufruf bei Anthropic | Webklar: keine Speicherung außer verschlüsselter Übergabe. Anthropic: wie oben. Browser: bis die Seite neu geladen wird | `proxy/src/index.ts:220-252`, `517-528` |
| Übergabe-Päckchen | Erklärung (ggf. auf Deutsch und übersetzt), gewählte Sprache, Restzahl, Name der Stelle, Statusmeldungen; alles verschlüsselt | Cloudflare Durable Object | Beim Abholen gelöscht, sonst 15 Min. nach dem letzten Päckchen. Ob Cloudflare gelöschte Stände technisch noch wiederherstellen kann: siehe P10 | `proxy/src/index.ts:807-838`; `webseite/demo.html:732-743`, `1024-1027`, `1735-1750` |
| Zugangs-Nachweis und Guthaben | KV: Code, zufällige Kennung, Name der Stelle, Ablaufdatum, Restbriefe. Browser: signierter Zugangs-Nachweis, Code, Name der Stelle, Ablaufdatum, Restzahl | Cloudflare KV; im Browser-Speicher des Geräts | KV: ohne automatische Frist (Löschung nach Vertragsende: AVV-Entwurf § 15). Browser: bis zum Löschen | `proxy/src/index.ts:709-718`; `webseite/demo.html:660-684`, `1527-1532` |
| Nutzungszähler | Je Analyse: Kennung des Guthabens, Datum, Sprache, Zufallswert. Kein Briefinhalt, keine Person | Cloudflare KV | 390 Tage (unter 13 Monaten) | `proxy/src/index.ts:460-469` |
| Code-Fehlversuche | IP-Adresse und Tag, nur bei falscher Eingabe | Cloudflare KV | 48 Stunden | `proxy/src/index.ts:761-773` |
| Schreib-Bremse Übergabe | IP-Adresse als Schlüssel, 60 Päckchen pro Minute | Cloudflare (Rate Limiting) | Zeitfenster 60 Sekunden [Speicherdauer bei Cloudflare zu bestätigen durch Webklar] | `proxy/wrangler.toml:37-43`; `proxy/src/index.ts:871-875` |
| Bot-Schutz | IP-Adresse, Browser-Merkmale | Cloudflare Turnstile | [zu bestätigen durch Webklar, Angaben von Cloudflare] | `proxy/src/index.ts:294-304`; `webseite/demo.html:385`, `578` |
| Server-Protokolle | Zeitpunkt, aufgerufene Adresse, Fehlerart, technische Metadaten, gekürzte Fehlermeldungen der KI-Schnittstelle (bis 300 bzw. 500 Zeichen). Ob IP-Adressen enthalten sind und ob die Fehlermeldungen Teile der Eingabe zitieren können: [zu bestätigen durch Webklar]. Die Datenschutzerklärung sagt „kein Briefinhalt“; belegt ist das nur für die Stellen mit reiner Fehlerart (siehe M9) | Cloudflare Workers Logs | max. 7 Tage (laut Cloudflare 3 Tage im kostenlosen Tarif) [Tarif zu bestätigen durch Webklar] | `proxy/wrangler.toml:7-8`; `proxy/src/index.ts:240`, `248-249`, `424`, `431`, `940`; `webseite/datenschutz.html:118` |
| Besucherstatistik | Seitenaufrufe, Herkunftsland, Browser, ohne Cookies | Cloudflare Web Analytics | [zu bestätigen durch Webklar] | `webseite/demo.html:1914`; `webseite/datenschutz.html:265-274` |
| Kopien bei der Stelle | Ausdrucke, PDF-Dateien, ggf. Kalender-Datei, in Fall B die hochgeladene Datei | Dienst-PC, Papier | [vom Verantwortlichen festzulegen] | – |

**Was Webklar nicht hat:** keine Briefe, keine Erklärungen im Klartext, keine Namen von Ratsuchenden, keine E-Mail-Adressen im Code-Zugang, keine Zuordnung einer Analyse zu einer Person oder einer Beraterin.

**Was Anthropic bekommt:** nur die Datei, eine feste Anweisung, das Datum und den Namen der Zielsprache, bei der Übersetzung die deutsche Erklärung. Der Server gibt nicht weiter: IP-Adresse der Person, Code, Name der Stelle. Er baut die Anfrage mit eigenen Kopfzeilen neu auf (`proxy/src/index.ts:224-237`, `398-421`). Ob die Plattform von Cloudflare bei Anfragen des Servers von sich aus Angaben zur ursprünglichen Verbindung ergänzt: [zu bestätigen durch Webklar].

### 1.8 Betroffene Personen

- Ratsuchende (erwachsene Zugewanderte, oft mit wenig Deutschkenntnissen)
- Dritte, die im Brief genannt sind: Familienangehörige einschließlich Kinder, Mitbewohnende, Vermieter, Arbeitgeber, Beschäftigte von Behörden
- Beschäftigte der Beratungsstelle: nur mittelbar (IP-Adresse des Dienst-Anschlusses bei Fehlversuchen und in technischen Daten). Es gibt keine Konten pro Person und keine Auswertung pro Beraterin. Aber: Arbeitet an einer Stelle nur eine beratende Person, zeigen die Zahlen pro Woche praktisch deren Nutzung. Ob deshalb eine Mitarbeitervertretung zu beteiligen ist (z. B. § 87 Abs. 1 Nr. 6 BetrVG): [vom Verantwortlichen festzulegen].

### 1.9 Empfänger, Orte, Technik

| Empfänger | Wofür | Ort |
|---|---|---|
| Cloudflare, Inc. | Server (Workers), Speicher (KV, Durable Objects), Schreib-Bremse, Bot-Schutz (Turnstile), Webseite (Pages), Besucherstatistik (Web Analytics), Protokolle | Weltweites Netz von Cloudflare. Keine Beschränkung auf die EU eingestellt (`proxy/wrangler.toml`: keine Ortsvorgabe; `proxy/src/index.ts:861`: Durable Object ohne Jurisdiktion) |
| Anthropic (PBC bzw. Ireland, Limited, siehe 1.3) | KI-Erklärung (`claude-sonnet-5`) und Übersetzung (`claude-haiku-4-5`), `proxy/src/index.ts:54-57`, `232`, `406` | USA und weitere Standorte laut Liste von Anthropic. Keine EU-Region eingestellt |

Adressen, die die IT der Stelle freigeben muss: `behoerdenklar.de`, `behoerdenklar-proxy.behoerdenbrief.workers.dev`, `challenges.cloudflare.com` (`webseite/demo.html:578`, `585-587`; so auch die Kurzanleitung `:210-213`). Für die Besucherstatistik lädt die Seite zusätzlich ein Skript von `static.cloudflareinsights.com` (`webseite/demo.html:1914`); die Messdaten gehen nach unserem Verständnis an `cloudflareinsights.com` [zu bestätigen durch Webklar]. Ohne diese beiden Adressen funktioniert der Dienst trotzdem.

### 1.10 Umfang

- Test: bis zu 100 Briefe, bis 29.11.2026
- Danach je nach Paket bis 600, 1.200 oder 2.400 Briefe pro Stelle und Kalenderjahr (`marketing/preise-einrichtungen.md:11-17`)
- 27 Sprachen plus Deutsch

---

## 2. Zwecke

**Hauptzweck:** Ratsuchenden den Inhalt eines Behördenbriefs in einfacher Sprache und in ihrer Sprache verständlich machen, Fristen und nächste Schritte erkennbar machen, Hilfe zur Selbsthilfe. Für die Beratung: Die Beraterin liest die deutsche Fassung mit.

**Nebenzwecke:**
- Zugang und Abrechnung über das Guthaben der Stelle
- Übergabe zwischen Handy und PC
- Schutz vor Missbrauch (Bot-Schutz, Fehlversuche, Schreib-Bremse). Laut Datenschutzerklärung: berechtigtes Interesse, Art. 6 Abs. 1 lit. f
- Auswertung mit der Stelle: Zahl der Briefe pro Woche und pro Sprache, ohne Personenbezug
- Fehlersuche (Server-Protokolle)

**Ausdrücklich nicht (als Zweck):** Training von KI, Werbung, Profilbildung, Weitergabe an Behörden, Auswertung einzelner Personen. Zu möglichen Zugriffen von Behörden in den USA bei den Anbietern siehe R3.

---

## 3. Notwendigkeit und Verhältnismäßigkeit (Art. 35 Abs. 7 lit. b)

### 3.1 Rechtsgrundlagen

**Fall A (Lesart 1, Webklar verantwortlich), laut Datenschutzerklärung:** Brief und Erklärung: ausdrückliche Einwilligung, Art. 6 Abs. 1 lit. a und Art. 9 Abs. 2 lit. a DSGVO. Zähler, Missbrauchsschutz, Protokolle: Art. 6 Abs. 1 lit. f (`webseite/datenschutz.html:151-171`, `220-234`).

**Fall B (Stelle verantwortlich):** [vom Verantwortlichen festzulegen]. In Betracht kommt vor allem eine ausdrückliche Einwilligung der Klientin, die die Stelle selbst einholt und nachweisen kann (Art. 7 Abs. 1). Das Häkchen der Beraterin genügt dafür nicht. Ob daneben § 22 Abs. 1 Nr. 1 lit. b BDSG trägt (Sozialbereich), prüft die DSB. Dann sind die Maßnahmen nach § 22 Abs. 2 BDSG zu dokumentieren.

**Offene Rechtsfragen für die DSB:**
- **Rolle der Stelle in Fall A.** Der Dienst-PC startet die Sitzung, empfängt die Erklärung und kann sie drucken. Liegt eine eigene Verantwortlichkeit der Stelle für Anzeige und Ausdruck vor, eine gemeinsame Verantwortlichkeit mit Webklar (Art. 26) oder Lesart 2 des AVV-Entwurfs (Träger verantwortlich, Webklar Auftragsverarbeiter)? Abwägung: AVV-Entwurf Teil A.2. Der Einwilligungstext nennt die Übermittlung an den „Server von BehördenKlar“ und an Anthropic, nicht die Anzeige bei der Stelle. Das Handy sagt es im Hinweis „verbunden“.
- **Daten Dritter.** Die Einwilligung der Person deckt nicht die Daten von Familienangehörigen oder anderen Dritten im Brief. Welche Grundlage trägt deren Verarbeitung, insbesondere bei Gesundheitsdaten Dritter (Art. 9)?
- **Daten über Straftaten (Art. 10).** Briefe von Polizei, Staatsanwaltschaft, Gericht oder Bußgeldstelle. Art. 10 erlaubt die Verarbeitung nur unter behördlicher Aufsicht oder auf Grundlage einer Rechtsvorschrift mit geeigneten Garantien. Ob eine Einwilligung dafür genügt, ist zu prüfen. Nach EuGH, Urteil vom 22.06.2021, C-439/19, können auch Sanktionen für Ordnungswidrigkeiten (dort: Strafpunkte im Straßenverkehr) unter Art. 10 fallen. Bußgeldbescheide sind deshalb vorsorglich mitzudenken.
- **Berufsgeheimnis.** Sind die Beratenden Berufsgeheimnisträger (z. B. § 203 Abs. 1 Nr. 6 StGB, staatlich anerkannte Sozialarbeit), ist die Offenbarung gegenüber Dienstleistern nur nach § 203 Abs. 3 Satz 2 und Abs. 4 StGB zulässig: Die mitwirkende Person muss zur Geheimhaltung verpflichtet sein (zum Nachweis in Textform). Der AVV-Entwurf enthält diese Verpflichtung für Webklar (§ 8 Abs. 2). Cloudflare und Anthropic haben keine eigene Verpflichtung nach § 203 StGB abgegeben. Ob ihre Vertraulichkeitsregeln für § 203 Abs. 4 Satz 2 Nr. 2 StGB genügen: [anwaltlich zu prüfen] (AVV-Entwurf § 8 Abs. 3). In Fall A lädt die Person selbst hoch; zu prüfen ist dann vor allem, ob „Ergebnis aufs Handy mitnehmen“ vom Dienst-PC (Ende-zu-Ende-verschlüsselt, Webklar hat den Schlüssel nicht) ein Offenbaren ist.

### 3.2 Ist die Verarbeitung erforderlich? Gibt es mildere Mittel?

| Möglichkeit | Bewertung (Vorschlag) |
|---|---|
| Beraterin liest und erklärt den Brief selbst (wie bisher) | Kein Datenfluss nach außen. Bleibt immer möglich und ist der Normalfall für alle, die nicht einwilligen. Kostet Beratungszeit, Erklärung in der Muttersprache oft nicht möglich. |
| Dolmetscher oder Sprachmittlung | Gut, aber selten sofort verfügbar. Auch hier erfahren Dritte den Inhalt. |
| Allgemeine KI- oder Übersetzungsdienste (eigenes Konto der Person oder der Stelle) | Meist Konto nötig, Bedingungen zu Speicherung und Training oft ungünstiger, kein Schutz für Fristen und Fachbegriffe. |
| KI-Dienst mit Verarbeitung nur in der EU | Wäre milder beim Drittlandbezug. Derzeit bei BehördenKlar nicht eingerichtet. Webklar hat das früher als möglichen Ausbaupfad genannt (`rechtliches/datenschutz-factsheet.md`). Nicht entschieden. |
| Weniger Daten hochladen | Nur die Seite mit Betreff und Frist, keine Ausweise (Kurzanleitung `:160`, `:201`). Optional: Namensfeld und Anschrift vor dem Foto abdecken. Ob die Erklärung dann gleich gut ist, wäre im Test zu prüfen. |

### 3.3 Datenminimierung und Speicherbegrenzung

- Kein Konto, keine E-Mail-Adresse, kein Name im Code-Zugang
- Briefe und Erklärungen werden bei Webklar nicht gespeichert, außer verschlüsselt zur Übergabe (gelöscht beim Abholen, sonst 15 Minuten nach dem letzten Päckchen; zur technischen Wiederherstellbarkeit bei Cloudflare siehe P10)
- Fotos werden vor dem Senden verkleinert. Bei der Neukodierung im Browser gehen nach unserem Verständnis Bild-Metadaten wie Aufnahmeort (EXIF) verloren [zu bestätigen durch Webklar mit einem Testfoto]. PDFs gehen unverändert, auch mit allen Seiten und Metadaten. Ein Seitenlimit für PDFs ist geplant (`marketing/preise-einrichtungen.md:67`)
- Anthropic bekommt keine Kennungen von Person oder Stelle (siehe 1.7)
- Nutzungszähler nur mit Datum und Sprache. Das Werkzeug von Webklar zeigt sie nur getrennt nach Woche und nach Sprache (`tools/einrichtungs-code.js:90-105`). Im Speicher stehen Datum und Sprache je Analyse aber zusammen (`proxy/src/index.ts:466`); eine kombinierte Auswertung wäre technisch möglich
- Kurze Fristen für IP-bezogene Zähler (48 Stunden bzw. 1 Minute)
- Grenze: Anthropic speichert in der Regel 30 Tage, bei Einstufung als Verstoß bis zu 2 Jahre. Darauf hat Webklar keinen Einfluss (`marketing/praesentation-mbe/datenschutz-blatt.html:316-317`; Anlage 2 zum AVV)

### 3.4 Transparenz und Einwilligung

- Einwilligung **für jeden Brief neu**: Nach jeder Erklärung ist das Häkchen wieder leer (`webseite/demo.html:1020-1021`), ebenso nach „Fertig, nächste Person“ (`webseite/demo.html:1725`)
- Text am Häkchen nennt den „Server von BehördenKlar“ (nicht ausdrücklich die Webklar GbR), Anthropic (USA), Gesundheit, Herkunft, Aufenthalt, „in der Regel 30 Tage“ und „kein Training“, mit Link zur Datenschutzerklärung (`webseite/demo.html:339-350`). Er nennt weder Cloudflare noch die Anzeige am Dienst-PC
- **Widerspruch in der Datenschutzerklärung:** Abschnitt 9a sagt, „die Beratungsstelle sieht keine Briefe oder Ergebnisse, nur Zahlen“ (`webseite/datenschutz.html:225-228`). Das gilt für den Code, aber nicht für „Lieber mit dem Handy fotografieren“: Dann erscheint die Erklärung am Dienst-PC (`webseite/ui-texte.js`, Text „verbunden“; Datenschutz-Blatt `:257-258`). Webklar sollte Abschnitt 9a anpassen (siehe P5)
- Am Handy in 27 Sprachen, von einer KI übersetzt, noch von keinem Muttersprachler geprüft. Die ausführliche Datenschutzerklärung gibt es nur auf Deutsch (`marketing/praesentation-mbe/datenschutz-blatt.html:305-307`)
- Freiwilligkeit: „Wer nicht einwilligt, wird ganz normal beraten.“ (`marketing/praesentation-mbe/datenschutz-blatt.html:308`)
- **Nachweis der Einwilligung:** Webklar speichert keine Einwilligungen. Nachweisbar ist nur die technische Gestaltung (kein Hochladen ohne Häkchen). Ob das für Art. 7 Abs. 1 reicht: [zu prüfen]
- Schwachstellen: Lesefähigkeit der Person, Abhängigkeit von der Beratung (Erwägungsgrund 43), Übersetzungsqualität. Siehe R5.

### 3.5 Rechte der Betroffenen

- Auskunft, Löschung, Berichtigung: Webklar kann eine Analyse keiner Person zuordnen und hat keine Inhalte gespeichert (Art. 11 DSGVO). Die Person sieht das Ergebnis selbst im Browser.
- Widerruf: wirkt für künftige Briefe. Bereits an Anthropic übermittelte Daten kann Webklar nicht gezielt löschen lassen [zu bestätigen durch Webklar].
- Kontakt laut Datenschutzerklärung: E-Mail-Adresse in `webseite/datenschutz.html:41`, `135`. Sie ist eine andere als die in diesem Dokument und im Datenschutz-Blatt genannte. Webklar sollte eine Adresse festlegen und überall gleich nennen [zu bestätigen durch Webklar].
- Art. 22: keine automatisierte Entscheidung.

### 3.6 Auftragsverarbeitung und Drittland

- Cloudflare und Anthropic arbeiten auf Grundlage ihrer Auftragsverarbeitungsbedingungen (DPA), die mit den Geschäftsbedingungen gelten (`webseite/datenschutz.html:106-112`). Fundstellen und Stand laut Abruf vom 28.10.2026: Anlage 2 zum AVV. Die Fassungen als PDF zu sichern, ist noch offen (`rechtliches/avv-nachweis.md`) [zu bestätigen durch Webklar].
- Übermittlung in die USA: EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c), Teil der DPAs. Module laut Anlage 2: bei Cloudflare Modul 3, wenn Webklar Auftragsverarbeiter ist (Fall B), Modul 2, wenn Webklar Verantwortlicher ist; bei Anthropic Modul 2 und/oder 3 [mit der aktuellen Fassung abzugleichen].
- Eine Bewertung der Rechtslage im Drittland (Transfer Impact Assessment) liegt nicht vor [zu bestätigen durch Webklar].
- Turnstile: Laut Cloudflare ist Cloudflare für den Bot-Schutz Auftragsverarbeiter, für die Verbesserung von Turnstile selbst Verantwortlicher (Anlage 2; AVV-Entwurf § 5 Abs. 4). Längere Speicherung bei Anthropic nach Einstufung als Verstoß: ob Anthropic dabei eigene Zwecke verfolgt, ergibt sich aus deren Bedingungen [zu prüfen].
- Meldung von Datenschutzverletzungen in der Kette: Webklar an den Träger spätestens 24 Stunden (AVV-Entwurf § 14), Anthropic an Webklar spätestens 48 Stunden, Cloudflare an Webklar unverzüglich ohne feste Frist (Anlage 2, Abschnitt 4).
- Für Fall B: AVV zwischen Träger und Webklar mit Liste der Unterauftragsverarbeiter (Art. 28 Abs. 2 und 4). Entwurf liegt vor (`rechtliches/einrichtungen/avv-entwurf.md` mit Anlage 1 TOMs und Anlage 2 Unterauftragsverarbeiter), noch nicht abgestimmt und nicht unterschrieben.

---

## 4. Risiken für die Rechte und Freiheiten (Art. 35 Abs. 7 lit. c)

### 4.1 Vorgehen

Nach DSK-Kurzpapier Nr. 18: Schwere des möglichen Schadens und Eintrittswahrscheinlichkeit, jeweils *geringfügig, überschaubar, substanziell* oder *groß*. Daraus ein Risiko *niedrig, mittel* oder *hoch* (im Kurzpapier: geringes Risiko, Risiko, hohes Risiko; maßgeblich ist die Matrix dort). Betrachtet werden alle Rechte und Freiheiten, nicht nur der Datenschutz, also auch Nachteile durch eine falsche Erklärung.

**Alle Einstufungen sind Vorschläge von Webklar.** Die Spalte „Ihre Bewertung“ füllt der Verantwortliche aus.

### 4.2 Übersicht

| Nr. | Risiko | Vorschlag ohne Maßnahmen | Maßnahmen (Abschnitt 5) | Vorschlag Restrisiko | Ihre Bewertung |
|---|---|---|---|---|---|
| R1 | Unbefugte Kenntnis des Briefs beim Transport oder auf dem Server von Webklar | Schwere groß, W. überschaubar: hoch | M2, M3, M11, M12, O1–O3 | mittel (hängt an O1–O3) | |
| R2 | Zugriff auf Brief und Erklärung bei Anthropic während der Speicherdauer | Schwere groß, W. überschaubar: hoch | M3, M4, O4, P3, P4 | mittel | |
| R3 | Zugriff von Behörden in den USA (Drittland) | Schwere groß, W. [vom Verantwortlichen einzuschätzen] | O4, P3, P6 | [nach Transfer Impact Assessment] | |
| R4 | Falsche oder unvollständige Erklärung, falsche Frist, Übersetzungsfehler | Schwere substanziell bis groß, W. überschaubar: hoch | M13, S8, S9 | mittel | |
| R5 | Einwilligung unwirksam (nicht informiert, nicht freiwillig, Fall B ohne eigene Einwilligung) | Schwere substanziell, W. substanziell: hoch | M1, S3, S7, P5 | mittel | |
| R6 | Daten Dritter im Brief ohne deren Einwilligung | Schwere überschaubar bis substanziell, W. groß: mittel bis hoch | M2, M3, S2, S10 | mittel, Rechtsgrundlage offen | |
| R7 | Daten über Straftaten (Art. 10) | Schwere groß, W. überschaubar: hoch | S2, S11 | [vom Verantwortlichen einzuschätzen] | |
| R8 | Mitlesen oder Fälschen bei der Übergabe Handy und PC | Schwere substanziell, W. überschaubar: mittel | M5, S4, P9 | niedrig | |
| R9 | Rückstände am Dienst-PC und auf Papier | Schwere substanziell, W. überschaubar: mittel | M14, S5 | niedrig bis mittel (liegt bei der Stelle) | |
| R10 | Mehr Daten hochgeladen als nötig | Schwere substanziell, W. überschaubar: mittel | M4, S2, P1 | niedrig bis mittel | |
| R11 | Rückschluss auf Personen aus Nutzungszahlen | Schwere überschaubar, W. geringfügig: niedrig | M7 | niedrig | |
| R12 | IP-Adressen in Zählern und Protokollen | Schwere geringfügig, W. überschaubar: niedrig | M8, M9, P8 | niedrig | |
| R13 | Unbefugter Zugriff auf die Konten von Webklar oder geänderter Server-Code | Schwere groß, W. [zu bestätigen] | M12, O1–O3 | [nach Bestätigung von O1–O3] | |
| R14 | Betroffenenrechte schwer durchsetzbar | Schwere überschaubar, W. groß: mittel | M2, 3.5, P5 | niedrig bis mittel | |
| R15 | Zugangsdaten oder Name der Stelle auf fremden Geräten | Schwere geringfügig bis überschaubar, W. überschaubar: niedrig | M6, M15, S4, S6 | niedrig | |

### 4.3 Die Risiken im Einzelnen

**R1 Unbefugte Kenntnis des Briefs beim Transport oder auf dem Server.** Der Brief läuft im Klartext durch den Server von Webklar (TLS nur auf dem Weg, die Ende-zu-Ende-Verschlüsselung gilt nur für die Übergabe: `marketing/praesentation-mbe/datenschutz-blatt.html:318-319`). Ein Fehler im Code, ein Angreifer oder ein Mitarbeiter von Cloudflare könnte theoretisch mitlesen. Folgen: Offenlegung von Gesundheit, Aufenthalt, Finanzen, Diskriminierung, Angst.

**R2 Zugriff bei Anthropic.** Anthropic speichert Eingaben und Ausgaben in der Regel 30 Tage. Stufen die Sicherheitssysteme von Anthropic eine Anfrage als Verstoß gegen die Nutzungsrichtlinien ein, bis zu 2 Jahre (Anlage 2 zum AVV). Ob und wann ein Brief so eingestuft wird, kann Webklar weder vorhersehen noch beeinflussen. In dieser Zeit sind Datenpannen oder Zugriffe von Beschäftigten nicht ausgeschlossen. Webklar hat darauf keinen Einfluss.

**R3 Zugriff von Behörden in den USA.** Cloudflare und Anthropic haben ihren Sitz in den USA. Ein Zugriff nach US-Recht lässt sich durch Standardvertragsklauseln nicht sicher ausschließen. Für Menschen mit unsicherem Aufenthalt oder Fluchtgeschichte kann das schwer wiegen.

**R4 Falsche Erklärung.** KI kann Fristen falsch lesen, Inhalte verkürzen oder falsch übersetzen. Folgen: verpasste Frist, Leistungskürzung, Nachteile im Aufenthaltsverfahren, falsche Telefonnummer. Bezug: Richtigkeit (Art. 5 Abs. 1 lit. d) und Rechte der Person insgesamt. Fristen „ab Zustellung“ kann die KI nicht kennen (Kurzanleitung `:204`).

**R5 Einwilligung unwirksam.** Der Text ist von einer KI übersetzt und nicht muttersprachlich geprüft. Manche Ratsuchende können nicht gut lesen. In der Beratung kann sich die Person zur Einwilligung gedrängt fühlen. In Fall B setzt die Beraterin das Häkchen. Folge: Verarbeitung ohne Rechtsgrundlage, Kontrollverlust der Person.

**R6 Daten Dritter.** Briefe nennen oft Ehepartner, Kinder oder andere Haushaltsmitglieder, manchmal mit Gesundheits- oder Leistungsdaten. Diese Menschen wissen nichts davon.

**R7 Daten über Straftaten.** Bußgeldbescheide, Strafbefehle, Vorladungen. Hohe Schwere, Rechtsgrundlage fraglich (siehe 3.1).

**R8 Mitlesen oder Fälschen bei der Übergabe.** Wer den QR-Code abfotografiert, kann die Erklärung in den 15 Minuten öffnen (`webseite/datenschutz.html:258-262`). Der Schlüssel steht in der Adresse des QR-Codes. Wer den Schlüssel hat, könnte außerdem ein gefälschtes Päckchen ablegen, das der PC als Erklärung anzeigt (die Prüfung in M5 hält nur Päckchen ohne passenden Schlüssel ab). Der QR-Code „Lieber mit dem Handy fotografieren“ enthält zusätzlich den Zugangs-Nachweis der Stelle (`webseite/demo.html:1572-1576`), siehe R15. Eine QR-Scanner-App oder der Browser-Verlauf des Handys könnte die Adresse vor dem Entfernen festhalten [zu bestätigen durch Webklar]. Auf der Seite laufen Skripte von Cloudflare (Turnstile, Web Analytics). Turnstile wird asynchron geladen und könnte technisch die Adresse samt `#`-Teil lesen, bevor die Seite ihn entfernt. Ob eines der Skripte den `#`-Teil erfasst oder überträgt, ist nicht geprüft [zu bestätigen durch Webklar]. Nach Ablauf oder Abholung ist der Schlüssel für die Erklärung nutzlos.

**R9 Rückstände am Dienst-PC.** Erklärung offen am Bildschirm für die nächste Person, Ausdrucke, PDF-Dateien, Kalender-Dateien im Download-Ordner, in Fall B die hochgeladenen Scans. Das liegt außerhalb von BehördenKlar und bei der Stelle.

**R10 Mehr Daten als nötig.** Mehrseitige PDFs mit Berechnungsbögen, mehrere Briefe auf einem Foto, Ausweise. Heute begrenzt nur die Dateigröße (5 MB), nicht die Seitenzahl.

**R11 Rückschluss aus Nutzungszahlen.** Die Sprache kann auf die Herkunft hindeuten. Mit Datum und Sprache und dem eigenen Terminkalender könnte die Stelle bei seltenen Sprachen eine Person erkennen. Webklar gibt die Zahlen nur getrennt nach Woche und nach Sprache heraus. Im Speicher bei Cloudflare stehen Datum und Sprache je Analyse zusammen (390 Tage).

**R12 IP-Adressen.** Bei Code-Fehlversuchen (48 Stunden), in der Schreib-Bremse (1 Minute), beim Bot-Schutz und möglicherweise in den Protokollen (bis 7 Tage). In den Protokollen stehen außerdem gekürzte Fehlermeldungen von Anthropic (`proxy/src/index.ts:240`, `431`). Dass diese keine Teile des Briefs zitieren: [zu bestätigen durch Webklar].

**R13 Zugriff auf Konten von Webklar.** Wer das Cloudflare-Konto kontrolliert, kann den Server-Code ändern, zum Beispiel so, dass Briefe gespeichert werden. Wer das Anthropic-Konto kontrolliert, sieht Nutzungsdaten [Umfang zu bestätigen durch Webklar]. Der Quellcode ist öffentlich und nachprüfbar. Dass der laufende Code dem veröffentlichten entspricht, ist für Außenstehende nicht prüfbar.

**R14 Betroffenenrechte.** Weil nichts gespeichert und nichts zugeordnet wird, kann Webklar kaum Auskunft geben. Das ist auch Datensparsamkeit. Die Person muss aber verstehen, an wen sie sich wenden kann. Die Datenschutzerklärung gibt es nur auf Deutsch.

**R15 Zugangsdaten und Name der Stelle auf Geräten.** Am Handy der Person steht unter der Erklärung der Name der Stelle (`webseite/demo.html:1691-1700`). Wer das Handy sieht, erfährt so vom Kontakt zur Beratung. Löst die Person den Code selbst ein (Fall A1, nur nach einer Weitergabe des Codes entgegen den Bedingungen für Einrichtungen § 9 Abs. 1; der Handzettel enthält keinen Code, `marketing/praesentation-mbe/handzettel.html:4`), bleiben Zugangs-Nachweis, Code und Name der Stelle dauerhaft im Browser-Speicher ihres Handys (`webseite/demo.html:1527-1532`). Ein weitergegebener Code oder Zugangs-Nachweis erlaubt nur Analysen auf Kosten der Stelle. Briefe oder Erklärungen anderer kann man damit nicht sehen, weil keine gespeichert sind.

---

## 5. Abhilfemaßnahmen (Art. 35 Abs. 7 lit. d)

### 5.1 Technisch umgesetzt (am Code geprüft)

| Nr. | Maßnahme | Fundstelle |
|---|---|---|
| M1 | Einwilligung pro Brief: kein Hochladen ohne Häkchen, Häkchen nach jeder Erklärung und bei „Fertig“ wieder leer, Text mit Link zur Datenschutzerklärung, am Handy in 27 Sprachen | `webseite/demo.html:339-350`, `843-850`, `1020-1021`, `1725`; `webseite/ui-texte.js` |
| M2 | Keine Speicherung von Brief und Erklärung beim Server. Er leitet nur weiter und schreibt nur Zähler und Guthaben in den Speicher. Einzige Ausnahme: die verschlüsselte Übergabe (M5) | `proxy/src/index.ts:391-528` |
| M3 | Sparsame Anfrage an Anthropic: nur Datei, feste Anweisung, Datum und Zielsprache. Der Server gibt keine IP-Adresse, keinen Code und keinen Namen der Stelle weiter. Nur zwei freigegebene Modelle | `proxy/src/index.ts:54-57`, `224-237`, `398-421` |
| M4 | Fotos verkleinert (max. 2.000 Pixel, JPEG 60 %). Nur JPG, PNG, PDF, max. ca. 5 MB | `webseite/demo.html:591`, `901-914`, `931`; `proxy/src/index.ts:89-90`, `284-289` |
| M5 | Ende-zu-Ende-verschlüsselte Übergabe: AES-256-GCM, Schlüssel 256 Bit und Kennung 128 Bit zufällig im Browser, Schlüssel nur hinter `#`. Server nimmt nur Text im Format base64url an (so sieht das verschlüsselte Päckchen aus). Löschen beim Abholen oder 15 Minuten nach dem letzten Päckchen. Höchstens 50 Schreibvorgänge und 400.000 Zeichen. Kein Zwischenspeichern im Browser-Cache. Schlüssel wird aus der Adresszeile entfernt. Päckchen, die nicht mit dem Schlüssel aus dem QR-Code verschlüsselt sind, werden verworfen (GCM-Prüfung) | `webseite/uebergabe.js:29-62`, `89-96`; `proxy/src/index.ts:807-838`, `844`, `870-884`; `webseite/demo.html:1651-1656`, `1807`, `1896-1899` |
| M6 | Kein Konto. Zugang über signierten Nachweis (HMAC-SHA-256). Code mit Zufallsteil (4 Zeichen aus 31), falsche Eingaben auf 30 pro IP-Adresse und Tag begrenzt. Ablaufdatum. Sperrbar mit dem Befehl `sperren` (setzt das Ablaufdatum auf gestern); wirksam, sobald der Speicher von Cloudflare den neuen Wert verteilt hat [Dauer zu bestätigen durch Webklar]. Der Nachweis selbst läuft nicht ab, er wirkt aber nur, solange der Zugang gültig ist | `proxy/src/index.ts:325-327`, `552-583`, `722`, `761-777`; `tools/einrichtungs-code.js:25-26`, `51-55`, `159-168` |
| M7 | Nutzungszähler nur mit Datum und Sprache, 390 Tage. Das Werkzeug zeigt sie getrennt nach Woche und nach Sprache | `proxy/src/index.ts:460-469`; `tools/einrichtungs-code.js:90-105` |
| M8 | Kurze Fristen für IP-bezogene Zähler: 48 Stunden bzw. 60 Sekunden | `proxy/src/index.ts:772`; `proxy/wrangler.toml:37-43` |
| M9 | Sparsame Protokolle: Wo eine Fehlermeldung Teile der KI-Antwort zitieren könnte (Fehler beim Lesen der Antwort, unerwartete Ausnahmen), wird nur die Fehlerart protokolliert. Fehlermeldungen der KI-Schnittstelle selbst werden gekürzt protokolliert (300 bzw. 500 Zeichen); dass sie nie Teile des Briefs enthalten, ist nicht belegt (siehe R12, P8). Protokolle max. 7 Tage | `proxy/src/index.ts:240`, `248-249`, `431`, `940`; `webseite/datenschutz.html:118` |
| M10 | Missbrauchsschutz: Bot-Schutz serverseitig geprüft, Herkunftsprüfung (Origin) und CORS, sodass Webseiten Dritter den Dienst im Browser nicht aufrufen können, feste Modelle, Dateiprüfung | `proxy/src/index.ts:81`, `262-264`, `284-304` |
| M11 | Transport verschlüsselt (HTTPS) zu Server, Übergabe und Anthropic | `proxy/src/index.ts:49`; `webseite/uebergabe.js:16`; `webseite/demo.html:585-587` |
| M12 | Schlüssel für Anthropic nur als Geheimnis im Server, nie auf Geräten | `proxy/src/index.ts:18-40` |
| M13 | Qualität der Erklärung: Anweisung an die KI, Daten und Telefonnummern nie zu erfinden und unsichere Daten leer zu lassen. Feste Struktur. Deutsche Fachbegriffe bleiben stehen. Ausdruck mit „Maßgeblich ist immer der Originalbrief.“ | `proxy/src/index.ts:100-101`, `116-127`, `131-196`; `webseite/demo.html:1707-1708` |
| M14 | Dienst-PC: Erklärung nur in der offenen Seite, nicht im Browser-Speicher. Dort liegen nur Zugangs-Nachweis, Code, Restzahl, Name der Stelle, Ablaufdatum, Sprache. „Fertig, nächste Person“ | `webseite/demo.html:600-684`, `1527-1532`, `1720-1733` |
| M15 | Handy der Person im Kamera-Modus: Sprache nicht dauerhaft gespeichert, Sitzungsdaten nur im Tab und nach Erfolg gelöscht | `webseite/demo.html:1044`, `1773-1777`, `1832`, `1891-1895` |

### 5.2 Organisatorisch bei Webklar

| Nr. | Maßnahme | Stand |
|---|---|---|
| O1 | Zugriff auf Cloudflare- und Anthropic-Konto nur durch die Gesellschafter | [zu bestätigen durch Webklar] |
| O2 | Zwei-Faktor-Anmeldung bei Cloudflare und Anthropic | [zu bestätigen durch Webklar] |
| O3 | Geräte der Gesellschafter: Festplattenverschlüsselung, Bildschirmsperre, aktuelle Updates | [zu bestätigen durch Webklar] |
| O4 | DPAs mit Standardvertragsklauseln bei Cloudflare und Anthropic (Fundstellen: Anlage 2 zum AVV). Versionsstand der DPAs als PDF ablegen (laut `rechtliches/avv-nachweis.md` noch offen). Vertragspartner der Konten soll die Webklar GbR sein | Vertragspartner und Ablage: [zu bestätigen durch Webklar]. `rechtliches/avv-nachweis.md` (Juli 2026) nennt noch einen Gesellschafter persönlich als Kontoinhaber |
| O5 | Deploy durch die Gesellschafter, nach jedem Deploy Funktionsprüfung (`npm run pruefung`, siehe `FEATURES.md`) | Funktionsprüfung vorhanden. Dass nur der veröffentlichte Stand des Repositorys deployt wird und Änderungen vorher auf Datenschutz-Auswirkungen geprüft werden: [zu bestätigen durch Webklar] |
| O6 | Meldung von Datenschutzverletzungen an den Träger unverzüglich (Art. 33 Abs. 2) | AVV-Entwurf § 14: spätestens 24 Stunden. Interner Ablauf (wer bemerkt, wer meldet) [zu bestätigen durch Webklar] |
| O7 | Verschwiegenheit der Gesellschafter, AVV mit Verschwiegenheitsklausel und Verpflichtung nach § 203 StGB | AVV-Entwurf § 8; Verpflichtung der Gesellschafter in Textform [zu bestätigen durch Webklar] |
| O8 | Kein Zugriff auf Briefinhalte bei Support: Webklar sieht keine Briefe und fragt nicht danach | Folgt aus M2. Regel für Support-Anfragen [zu bestätigen durch Webklar] |

### 5.3 Bei der Beratungsstelle (Empfehlungen, vom Verantwortlichen festzulegen)

| Nr. | Maßnahme |
|---|---|
| S1 | Im Test nur Fall A: über das Handy der Person, keine Briefe am Dienst-PC hochladen (Kurzanleitung `:158`) |
| S2 | Nur den Brief fotografieren, keine Ausweise oder Pässe. Bei mehreren Seiten die Seite mit Betreff und Frist (Kurzanleitung `:160`, `:201`) |
| S3 | Freiwilligkeit mündlich erklären: Ohne Einwilligung wird ganz normal beraten. Einwilligungstext bei Bedarf vorlesen oder in der Sprache der Person erklären lassen |
| S4 | QR-Code nur der Person zeigen, für die er bestimmt ist. Den Code nur an Mitarbeitende geben; Zugangskarte und Kurzanleitung mit Code nicht aushängen und nicht an Ratsuchende geben (Bedingungen für Einrichtungen § 9 Abs. 1; `marketing/praesentation-mbe/zugangskarte.html:69`, `kurzanleitung-beratung.html:123`). Der Handzettel enthält keinen Code (`marketing/praesentation-mbe/handzettel.html:4`) |
| S5 | Dienst-PC: nach jedem Gespräch „Fertig, nächste Person“. Bildschirm nicht für Wartende sichtbar. Kalender nur am Handy der Person. Ausdrucke und PDF-Dateien wie Akten behandeln, Download-Ordner leeren (`marketing/praesentation-mbe/datenschutz-blatt.html:322-323`) |
| S6 | „Zugang dauerhaft auf ein Handy geben“ nur auf Geräte von Mitarbeitenden. Im Test gar nicht nutzen (Kurzanleitung `:205`) |
| S7 | Fall B erst nach AVV, eigener Rechtsgrundlage bzw. dokumentierter Einwilligung der Klientin und Einweisung. Hochgeladene Scans nach dem Gespräch löschen |
| S8 | Beratende einweisen: Die Erklärung ist eine Lesehilfe, keine Rechtsberatung |
| S9 | Frist immer am Originalbrief prüfen, Fristen „ab Zustellung“ selbst nachrechnen (Kurzanleitung `:159`, `:204`) |
| S10 | Optional: Name und Anschrift vor dem Foto abdecken, wenn sie für die Erklärung nicht nötig sind |
| S11 | Optional: Briefe von Polizei, Staatsanwaltschaft oder Gericht im Test nicht hochladen, bis die Frage nach Art. 10 geklärt ist |

### 5.4 Geplant oder offen

| Nr. | Was | Wer |
|---|---|---|
| P1 | Seitenlimit für PDFs | Webklar (`marketing/preise-einrichtungen.md:67`) |
| P2 | AVV mit Verschwiegenheitsklausel, TOMs, Liste der Unterauftragsverarbeiter: Entwürfe liegen vor (`rechtliches/einrichtungen/avv-entwurf.md`, `anlage-1-toms.md`, `anlage-2-unterauftragsverarbeiter.md`). Abstimmung mit der DSB und Unterschrift vor dem ersten Brief am Dienst-PC | Webklar und Träger (`marketing/praesentation-mbe/datenschutz-blatt.html:328-329`) |
| P3 | Verarbeitung in der EU prüfen (KI-Anbieter mit EU-Region, Ortsvorgabe bei Cloudflare). Nicht entschieden | Webklar |
| P4 | Prüfen, ob bei Anthropic eine kürzere oder keine Speicherung vereinbart werden kann | Webklar |
| P5 | Einwilligungstext muttersprachlich prüfen lassen. Datenschutzhinweise in einfacher Sprache und weiteren Sprachen. Prüfen, ob der Einwilligungstext die Anzeige bei der Beratungsstelle nennen sollte. Abschnitt 9a der Datenschutzerklärung berichtigen („die Beratungsstelle sieht keine … Ergebnisse“ stimmt bei der Übergabe an den PC nicht, siehe 3.4). Eine Kontakt-Adresse für Datenschutzfragen festlegen (siehe 3.5) | Webklar |
| P6 | Transfer Impact Assessment für die USA dokumentieren | Webklar, für Fall B auch der Träger |
| P7 | Anwaltliche Prüfung von Datenschutzerklärung und Datenschutz-Blatt (`marketing/praesentation-mbe/datenschutz-blatt.html:326-327`) | Webklar |
| P8 | Prüfen, ob die Server-Protokolle IP-Adressen enthalten. Gegebenenfalls keine Fehlermeldungen von Anthropic mehr protokollieren | Webklar |
| P9 | Prüfen, ob Skripte Dritter auf der Seite den `#`-Teil der Adresse erfassen. Gegebenenfalls den Schlüssel früher aus der Adresse entfernen | Webklar |
| P10 | Laut Dokumentation von Cloudflare lassen sich Durable Objects mit SQLite-Speicher bis zu 30 Tage zurück wiederherstellen (Fundstelle in Anlage 2 zum AVV). Prüfen, ob das auch gelöschte Übergaben betrifft. Dann wären verschlüsselte Päckchen technisch bis zu 30 Tage vorhanden (ohne Schlüssel nicht lesbar), und die Angabe „gelöscht nach 15 Minuten“ wäre zu ergänzen [zu bestätigen durch Webklar] | Webklar |
| P11 | Prüfen, ob Webklar eine eigene DSFA für Fall A braucht und ob Webklar deshalb eine Datenschutzbeauftragte benennen muss (§ 38 Abs. 1 Satz 2 BDSG). Die Pflicht kann Webklar auch als Auftragsverarbeiter in Fall B treffen, wenn die Verarbeitung beim Träger einer DSFA unterliegt | Webklar |
| P12 | Sicherung der Einrichtungs-Daten (Code, Guthaben, Name) in Cloudflare KV: derzeit keine Sicherung bekannt (Anlage 1 zum AVV) [zu bestätigen durch Webklar] | Webklar |

---

## 6. Ergebnis und Freigabe (vom Verantwortlichen auszufüllen)

| | |
|---|---|
| Durchgeführt von | [NAME, FUNKTION] |
| Stellungnahme der DSB (Art. 35 Abs. 2) | [TEXT, DATUM] |
| Standpunkt Betroffener eingeholt (Art. 35 Abs. 9) | [ja / nein, wie] |
| Verbleibendes Risiko insgesamt | [niedrig / mittel / hoch] |
| Bei hohem Restrisiko: Konsultation der Aufsichtsbehörde (Art. 36) | [nötig / nicht nötig] |
| Entscheidung | [Verarbeitung freigegeben / mit Auflagen / nicht freigegeben] |
| Auflagen | [z. B. nur Fall A, nur nach AVV] |
| Datum, Unterschrift | [ ] |
| Nächste Überprüfung | [spätestens nach dem Test (Auswertung 26.11.2026), danach jährlich] |

---

## 7. Wann neu bewerten

Webklar informiert den Träger, wenn sich etwas davon ändert: bei eigenen Änderungen vorher, bei Änderungen durch Cloudflare oder Anthropic, sobald Webklar davon erfährt (AVV-Entwurf § 9 und § 10; Webklar kann Änderungen dieser Anbieter nicht vorher zusichern):

- Neuer oder anderer Unterauftragsverarbeiter, anderes KI-Modell oder anderer Anbieter
- Briefe oder Erklärungen werden doch gespeichert, auch kurz
- Neue Daten im Code-Zugang (z. B. Konten, E-Mail-Adressen, Namen)
- Änderung der Speicherdauern bei Webklar oder bei Anthropic
- Verarbeitung in der EU oder Wegfall der Standardvertragsklauseln
- Neue Funktionen, die Inhalte an Dritte schicken
- Nutzung der iOS-App im Einrichtungs-Zugang

---

## Quellen

- Quellcode: `proxy/src/index.ts`, `proxy/wrangler.toml`, `webseite/demo.html`, `webseite/uebergabe.js`, `webseite/ui-texte.js`, `tools/einrichtungs-code.js` (Stand 28.10.2026)
- Datenschutzerklärung: `webseite/datenschutz.html` (Stand 22.10.2026)
- Datenschutz-Blatt für die DSB: `marketing/praesentation-mbe/datenschutz-blatt.html` (Stand 25.10.2026)
- Kurzanleitung für Beratende: `marketing/praesentation-mbe/kurzanleitung-beratung.html`
- Preise und Umfang: `marketing/preise-einrichtungen.md`
- Entwürfe in diesem Ordner: `avv-entwurf.md`, `anlage-1-toms.md`, `anlage-2-unterauftragsverarbeiter.md` (Angaben zu Cloudflare und Anthropic laut Abruf vom 28.10.2026)
- DSK-Kurzpapier Nr. 5 (Datenschutz-Folgenabschätzung) und Nr. 18 (Risiko für die Rechte und Freiheiten)
- DSK-Liste der Verarbeitungstätigkeiten, für die eine DSFA durchzuführen ist (nicht-öffentlicher Bereich)
- Artikel-29-Gruppe, WP 248 rev.01, Leitlinien zur Datenschutz-Folgenabschätzung
