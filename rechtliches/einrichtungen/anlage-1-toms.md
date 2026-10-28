> **ENTWURF, Stand 28.10.2026. Von Claude erstellt, keine Rechtsberatung. Vor dem ersten Einsatz anwaltlich bzw. durch die Datenschutzbeauftragte prüfen lassen.**

# Anlage 1 zum AVV: Technische und organisatorische Maßnahmen (Art. 32 DSGVO)

**Webklar GbR · BehördenKlar im Einrichtungs-Zugang**

## So ist diese Anlage zu lesen

- **Belegt** heißt: Die Maßnahme steht so im Quelltext (Stand 28.10.2026). In Klammern steht,
  wo: Datei und Name der Funktion oder Konstante. Zeilennummern sind bewusst weggelassen, weil
  sich der Code ändert.
- `[zu bestätigen durch Webklar]` heißt: Die Angabe ist aus den Unterlagen nicht belegt.
  Webklar muss sie vor der Unterzeichnung bestätigen, ergänzen oder streichen.
- Maßnahmen von Cloudflare und Anthropic stehen nur hier, wo sie für den Datenfluss wichtig sind.
  Im Übrigen gelten deren eigene Sicherheitsbeschreibungen (Fundstellen in Anlage 2).

Grundlagen: `proxy/src/index.ts`, `proxy/wrangler.toml`, `webseite/demo.html`,
`webseite/uebergabe.js`, `tools/einrichtungs-code.js`, `.gitignore`, `FEATURES.md`,
Datenschutzerklärung (Stand 22.10.2026), Datenschutz-Blatt (Stand 25.10.2026).

---

## 1. Grundsatz: wenig Daten, keine Speicherung von Briefen

| Maßnahme | Beleg |
|---|---|
| Der Server speichert weder Brief noch Erklärung. Die Datei wird nur an die KI weitergereicht, die Antwort nur an den Browser zurückgegeben. | `proxy/src/index.ts`, `demoHandler` |
| Kein Nutzerkonto, keine Anmeldung, keine E-Mail-Adresse im Einrichtungs-Zugang. Die Stelle bekommt einen signierten Zugangs-Nachweis, der auf ein Guthaben unter einer zufälligen Kennung zeigt. | `codeHandler`, `signWallet`; `tools/einrichtungs-code.js` (`crypto.randomUUID`) |
| An die KI gehen nur die Datei, die feste Anweisung, die Zielsprache (aus einer festen Liste) und das heutige Datum. Keine Kennung und kein Name der Stelle, keine IP-Adresse des Geräts. (Was auf dem Brief steht, auch der Name der Person, liest die KI natürlich mit.) | `demoHandler` (Aufbau des Anfrage-Körpers) |
| Für die Übersetzung geht nur der Text der Erklärung an die KI, nicht der Brief. | `uebersetzeAnalyse` |
| Für die Auswertung mit der Stelle wird je Analyse nur Datum und Sprache gezählt, ohne Briefinhalt und ohne Bezug zu einer Person. | `demoHandler` (Schlüssel `nutzung:…`) |
| Über den Code erfährt die Stelle keine Briefe, nur Zahlen (übrige Briefe; Nutzung pro Woche und Sprache, die Webklar mit dem Code-Werkzeug ausliest). | `codeHandler`; `tools/einrichtungs-code.js` (`stand`) |
| Fotos werden im Browser auf höchstens 2.000 Pixel verkleinert und neu als JPEG erzeugt. Dabei entfallen nach unserem Verständnis die Metadaten der Kamera (z. B. Aufnahmeort). PDFs werden unverändert gesendet. | `webseite/demo.html` (`MAX_KANTE`, `bildVerkleinern`); Wegfall der Metadaten `[zu bestätigen durch Webklar, technisch prüfen]` |

## 2. Verschlüsselung (Art. 32 Abs. 1 lit. a)

| Maßnahme | Beleg |
|---|---|
| Alle Verbindungen zwischen Browser, Server und KI laufen über HTTPS (TLS). | Adressen in `webseite/demo.html`, `webseite/uebergabe.js`, `proxy/src/index.ts` (`ANTHROPIC_URL`). Mindest-TLS-Version und HSTS in den Cloudflare-Einstellungen `[zu bestätigen durch Webklar]` |
| **Übergabe zwischen Geräten Ende-zu-Ende verschlüsselt:** AES-256-GCM, Schlüssel (256 Bit) und Übergabe-Kennung (128 Bit) entstehen zufällig im Browser, je Päckchen ein neuer Zufallswert (IV, 96 Bit). | `webseite/uebergabe.js` (`neu`, `verschluesseln`) |
| Der Schlüssel steht nur im QR-Code hinter dem „#“ der Adresse. Diesen Teil senden Browser nicht an Server. Die Seite entfernt ihn nach dem Lesen aus der Adresszeile. | `webseite/uebergabe.js` (`adresse`, `ausAdresse`); `webseite/demo.html` (`history.replaceState` nach dem Lesen) |
| Die Seite legt in der Übergabe nur verschlüsselte Päckchen ab. Der Server nimmt dort ohnehin nur Zeichenfolgen im base64url-Format an (kein lesbarer Text, z. B. kein JSON). | `webseite/uebergabe.js` (`senden` → `verschluesseln`); `uebergabeHandler` (Prüfung `^[A-Za-z0-9_-]+$`) |
| Zugangs-Nachweise sind mit HMAC-SHA-256 signiert und werden in konstanter Zeit verglichen. | `signWallet`, `verifyWallet`, `gleich` |
| Geheime Schlüssel (KI-Schlüssel, Signatur-Schlüssel, Turnstile-Schlüssel) liegen nur als verschlüsselte Secrets bei Cloudflare, nie im Quelltext und nie auf Geräten von Nutzern. | `proxy/src/index.ts` (`interface Env`); `FEATURES.md` (Abschnitt Secrets); `.gitignore` (`.dev.vars`) |
| Gespeicherte Werte in Cloudflare KV und Durable Objects sind laut Cloudflare im Ruhezustand verschlüsselt (AES-256). | Cloudflare-Dokumentation, siehe Anlage 2 |

## 3. Pseudonymisierung und Trennung (Art. 32 Abs. 1 lit. a, Art. 25)

| Maßnahme | Beleg |
|---|---|
| Guthaben der Stelle unter einer zufälligen Kennung (UUID); der Code selbst zeigt nur auf diese Kennung. | `tools/einrichtungs-code.js` (`neu`); KV-Schlüssel `code:`, `wallet:`, `einrichtung:` |
| Jede Übergabe liegt in einem eigenen Speicher (eigenes Durable Object je Übergabe-Kennung). | `uebergabeHandler` (`idFromName(id)`), Klasse `Uebergabe` |
| Guthaben verschiedener Stellen sind getrennt (eigene Kennung je Code). | wie oben |
| Im Einrichtungs-Zugang legt der Server IP-Adressen nur als Teil kurzlebiger Zähler ab (siehe Nr. 8). Für den Bot-Schutz gibt er die IP-Adresse an Cloudflare Turnstile weiter. Zu den Protokollen von Cloudflare siehe Nr. 5. | `codeHandler` (`codefail:`), `proxy/wrangler.toml` (`UEBERGABE_LIMIT`); `demoHandler` (Turnstile-Prüfung mit `remoteip`) |
| Test und Entwicklung laufen lokal mit Testschlüsseln, getrennt vom Live-Betrieb. Aufrufe von `localhost` nimmt der Server nur an, wenn lokal ausdrücklich eingeschaltet. | `LOKAL_MUSTER`, `LOKAL_TEST`; `FEATURES.md` (Lokal testen) |

## 4. Vertraulichkeit: Zutritt, Zugang, Zugriff

### 4.1 Zutritt (Räume)

| Maßnahme | Beleg |
|---|---|
| Webklar betreibt keine eigenen Server und keine eigenen Rechenzentren. Die Technik läuft bei Cloudflare und Anthropic; deren physische Sicherheit ist Teil ihrer Zertifizierungen. | `proxy/wrangler.toml`; Anlage 2 |
| Arbeitsplätze von Webklar: Laptops der Gesellschafter. Räume, Aufbewahrung, Mitnahme unterwegs. | `[zu bestätigen durch Webklar]` |

### 4.2 Zugang (Systeme)

| Maßnahme | Beleg |
|---|---|
| Verwaltung des Servers, der Codes und der Guthaben nur über das Cloudflare-Konto (Werkzeug `wrangler`, angemeldet auf dem Laptop). Wer an einem angemeldeten Laptop sitzt, kann Codes und Guthaben ändern. | `tools/einrichtungs-code.js` („Braucht nur den wrangler-Login“) |
| Wer Zugang zum Cloudflare-Konto und zum Anthropic-Konto hat; Zwei-Faktor-Anmeldung in beiden Konten; Rechte je Person. | `[zu bestätigen durch Webklar]` |
| Laptops: Festplattenverschlüsselung, Bildschirmsperre, aktuelle Updates, Benutzerkonto mit Passwort. | `[zu bestätigen durch Webklar]` |
| Konto, in dem die Verträge mit Cloudflare und Anthropic geschlossen sind (Webklar GbR oder Person). | `[zu bestätigen durch Webklar]` |

### 4.3 Zugriff (Daten)

| Maßnahme | Beleg |
|---|---|
| Briefe und Erklärungen werden nicht gespeichert; es gibt bei Webklar nichts, worauf zugegriffen werden könnte (außer verschlüsselten Übergabe-Päckchen für höchstens 15 Minuten). | Nr. 1, Nr. 8 |
| Übergabe-Päckchen kann nur entschlüsseln, wer den QR-Code hat. Weder Webklar noch Cloudflare haben den Schlüssel. | `webseite/uebergabe.js` |
| Der Einrichtungs-Code öffnet keine Daten. Wer ihn kennt, kann Briefe erklären lassen (und verbraucht Guthaben der Stelle), aber keine Briefe oder Erklärungen anderer sehen. | `codeHandler` (liefert nur Token, Rest, Name, Ablauf) |
| Codes sind schwer zu erraten: Präfix plus 4 Zufallszeichen aus 31 Zeichen (rund 920.000 Möglichkeiten je Präfix); höchstens 30 Fehlversuche pro IP-Adresse und Tag. | `tools/einrichtungs-code.js` (`ZEICHEN`, `zufall`); `CODE_FEHLVERSUCHE_PRO_TAG` |
| Abgelaufene oder gesperrte Codes lehnt der Server ab. | `codeHandler`, `demoHandler` (`ablauf < heute`); `tools/einrichtungs-code.js` (`sperren`) |
| Der KI-Schlüssel liegt nur im Server. Die Anfragen an Anthropic baut der Server neu. Vom Gerät übernimmt er nur die Datei (nach Prüfung von Dateityp und Größe, nicht des Inhalts) und die Sprachwahl aus einer festen Liste. | `demoHandler`, `uebersetzeAnalyse` |
| Codes von Stellen und Zugangslinks stehen nicht im öffentlichen Repository, sondern nur lokal in Dateien, die von Git ausgeschlossen sind. | `.gitignore` (`code.local.js`, `druck/`) `[zu bestätigen durch Webklar: Regel gilt für alle künftigen Codes]` |

## 5. Integrität: Weitergabe und Eingabe

| Maßnahme | Beleg |
|---|---|
| Daten gehen nur an Anthropic (KI) und über Cloudflare (Server). Bezahldienst (Stripe) und E-Mail-Dienst (Brevo) sind im Einrichtungs-Zugang nicht beteiligt. | `demoHandler`, `codeHandler` (kein Aufruf von Stripe oder Brevo) |
| Aufrufe aus dem Browser nimmt der Server nur von der eigenen Webseite an (Herkunftsprüfung). Die Übergabe nimmt zusätzlich Aufrufe ohne Herkunftsangabe an (für die App). Gegen Programme außerhalb eines Browsers schützt die Herkunftsprüfung nicht. Bei der Analyse schützen dann Turnstile und der signierte Zugangs-Nachweis. | `DEMO_ORIGIN_MUSTER`, `originOk`, `demoCorsHeaders`; `uebergabeHandler` |
| Eingaben werden geprüft: nur JPG, PNG oder PDF, höchstens ca. 5 MB; Sprache nur aus einer festen Liste (kein freier Text in der KI-Anweisung); Übergabe-Kennung und Fach nach festem Muster, höchstens 400.000 Zeichen und 50 Schreibvorgänge je Übergabe. | `DEMO_MAX_BASE64`, `DEMO_SPRACHEN`, `UEBERGABE_ID_MUSTER`, `UEBERGABE_FACH_MUSTER`, `UEBERGABE_MAX_ZEICHEN`, `UEBERGABE_MAX_SCHREIBVORGAENGE` |
| Manipulierte Übergabe-Päckchen werden erkannt (AES-GCM prüft die Unversehrtheit) und verworfen. | `webseite/uebergabe.js` (`entschluesseln`) |
| Die KI-Anweisung verlangt, nichts zu erfinden: Daten, Telefonnummern, Namen und Aktenzeichen nur, wenn sie wörtlich im Brief stehen, sonst leer. | `DEMO_SYSTEM_PROMPT`, `DEMO_SCHEMA` |
| Protokolle: Der Server schreibt bei Fehlern nur Fehlerart, Statuscode und gekürzte Fehlertexte der KI-Schnittstelle (höchstens 300 bzw. 500 Zeichen). Fehlermeldungen beim Lesen der KI-Antwort werden bewusst nicht protokolliert, weil sie Teile des Inhalts zitieren könnten. | `uebersetzeAnalyse`, `demoHandler`, Ausnahmebehandlung in `fetch` |
| Zusätzlich zeichnet Cloudflare zu jedem Aufruf Metadaten auf (Zeitpunkt, Adresse, Status, technische Merkmale). | `proxy/wrangler.toml` (`[observability] enabled = true`). Ob IP-Adressen dabei sind `[zu bestätigen durch Webklar]`; dass Fehlertexte der KI-Schnittstelle nie Teile der Eingabe enthalten `[zu bestätigen durch Webklar]` |
| Änderungen an Codes und Guthaben werden nicht gesondert protokolliert. Änderungen am Quelltext sind in Git nachvollziehbar. | `tools/einrichtungs-code.js`; `FEATURES.md` `[zu bestätigen durch Webklar: ob ein Änderungsprotokoll für Codes gewünscht ist]` |

## 6. Verfügbarkeit und Belastbarkeit (Art. 32 Abs. 1 lit. b)

| Maßnahme | Beleg |
|---|---|
| Betrieb auf dem weltweiten Netz von Cloudflare. | `proxy/wrangler.toml` |
| Bot-Schutz (Turnstile, serverseitig geprüft), Begrenzungen pro IP-Adresse und Tagesbudgets bremsen Missbrauch und Überlastung. | `demoHandler`; `proxy/wrangler.toml` (`[vars]`, `[[ratelimits]]`) |
| Fällt die KI aus, bekommt die Stelle eine verständliche Meldung, und vom Kontingent wird nichts abgezogen. Abgezogen wird erst, wenn die KI geantwortet hat, dann aber auch, wenn die Antwort nicht verwertbar ist (z. B. Ablehnung). | `demoHandler` (Fehlerzweige; „Erst NACH erfolgreichem KI-Aufruf zählen“) |
| Nach jedem Deploy prüft ein Gesundheits-Check die Live-Seite in einem Durchlauf (u. a. KI-Schlüssel, Bot-Schutz, tote Verweise). Dazu gibt es automatische Tests. | `tools/pruefung.js` (`npm run pruefung`); `FEATURES.md` (Befehle, `npm test`) |
| Ein Ausfall kostet keine Briefe, weil keine gespeichert werden. | Nr. 1 |
| Eine zugesagte Verfügbarkeit (SLA) gibt es nicht. | Bedingungen für Einrichtungen § 11 Abs. 1 |

## 7. Wiederherstellbarkeit (Art. 32 Abs. 1 lit. c)

| Maßnahme | Beleg |
|---|---|
| Der Quelltext liegt in zwei Git-Ablagen (`origin` und `gitea`); der Dienst lässt sich daraus neu aufsetzen. | `FEATURES.md` („auf beide Remotes pushen“) |
| Sicherung der Einrichtungs-Daten (Codes, Guthaben, Namen) in KV. | `[zu bestätigen durch Webklar: derzeit keine Sicherung bekannt]` |

## 8. Speicherbegrenzung und Löschung

| Was | Wo | Wie lange | Beleg |
|---|---|---|---|
| Brief (Foto/PDF) | Durchlauf durch den Server | **bei Webklar gar nicht** | `demoHandler` |
| Erklärung | Durchlauf durch den Server | **bei Webklar gar nicht** | `demoHandler` |
| Übergabe-Päckchen (verschlüsselt) | Cloudflare Durable Object | beim Abholen gelöscht (die Seite löscht danach sofort), sonst **spätestens 15 Minuten nach dem letzten Päckchen** (die Frist beginnt mit jedem neuen Päckchen neu) | `UEBERGABE_LEBENSDAUER_MS`, `Uebergabe.schreiben` (`setAlarm`), `Uebergabe.alarm`, `Uebergabe.loeschen`; `webseite/uebergabe.js` (`loeschen`) |
| Brief und Erklärung bei Anthropic | Anthropic | **in der Regel 30 Tage**; bei Einstufung als Verstoß gegen die Nutzungsrichtlinien bis zu 2 Jahre | Anlage 2 |
| Nutzungszähler (Datum, Sprache) | Cloudflare KV | **390 Tage** (unter 13 Monaten), dann automatisch gelöscht | `demoHandler` (`expirationTtl: 60 * 60 * 24 * 390`) |
| Code-Fehlversuche (IP-Adresse, Tag) | Cloudflare KV | **48 Stunden** | `codeHandler` (`expirationTtl: 60 * 60 * 48`) |
| Schreib-Bremse Übergabe (IP-Adresse) | Cloudflare Rate Limiting | Zeitfenster **60 Sekunden** | `proxy/wrangler.toml` (`[[ratelimits]]`, `period = 60`) |
| Einrichtungs-Daten (Code, Kennung, Name, Ablauf, Rest) | Cloudflare KV | **ohne automatische Frist**; Löschung nach Vertragsende (AVV § 15) | `tools/einrichtungs-code.js` (kein Ablauf gesetzt) |
| Server-Protokolle | Cloudflare Workers Logs | **höchstens 7 Tage** (laut Cloudflare: 7 Tage im bezahlten, 3 Tage im kostenlosen Tarif) | `proxy/wrangler.toml`; Datenschutzerklärung Nr. 5; Tarif `[zu bestätigen durch Webklar]` |
| Erklärung am Dienst-PC | nur im Arbeitsspeicher der offenen Seite | bis „Fertig, nächste Person“ oder Neuladen | `webseite/demo.html` (`fertigKnopf`) |
| Im Browser des Geräts: Zugangs-Nachweis, Code, Name der Stelle, Ablaufdatum, übrige Briefe, Sprache | Browser-Speicher (`localStorage`) | bis zum Löschen im Browser | `webseite/demo.html` (`bk_wallet`, `bk_guthaben`, `bk_einrichtung`, `bk_einrichtung_bis`, `bk_einrichtung_code`, `bk_sprache`) |
| Am Handy der Person (Fall A2): Inhalt des QR-Codes, also Übergabe-Kennung, Schlüssel, Zugangs-Nachweis und Name der Stelle | Browser-Speicher nur für diesen Tab (`sessionStorage`) | bis zum Ergebnis bzw. bis der Tab geschlossen wird | `webseite/demo.html` (`bk_handy`, `vergissHandySitzung`) |

**Ehrlicher Hinweis zu den Übergabe-Päckchen:** Cloudflare bietet für diese Art Speicher
(SQLite-Durable-Objects) eine Wiederherstellung auf jeden Zeitpunkt der letzten 30 Tage an.
Gelöschte Päckchen könnten darüber technisch noch eine Zeit lang vorhanden sein. Sie bleiben
verschlüsselt; den Schlüssel haben weder Webklar noch Cloudflare. `[zu bestätigen durch
Webklar: Verhalten bei Cloudflare nachfragen bzw. in der Dokumentation prüfen]`

## 9. Datenschutz durch Technikgestaltung und Voreinstellungen (Art. 25)

| Maßnahme | Beleg |
|---|---|
| Ohne Häkchen wird nichts hochgeladen. Nach jeder Erklärung ist das Häkchen wieder leer. | `webseite/demo.html` (`konsens`, `konsens.checked = false`) |
| „Fertig, nächste Person“ am Dienst-PC: Erklärung weg, der PC wartet nicht mehr auf das Handy, Häkchen und E-Mail-Felder leer, Sprache zurück auf Deutsch, Seite neu geladen. Der Zugang der Stelle bleibt. Ein noch nicht abgeholtes Übergabe-Päckchen löscht dabei nicht der Knopf, sondern der Server, spätestens 15 Minuten nach dem letzten Päckchen. | `webseite/demo.html` (`fertigKnopf`, `stoppeWarten`); `Uebergabe.alarm` |
| Ein Code in der Adresse (`?code=[EINRICHTUNGS-CODE]`) wird beim Einlösen aus der Adresszeile entfernt. | `webseite/demo.html` (`pruefeRueckkehr`, `reinigeUrl`) |
| Am Handy der Person merkt sich die Seite die Verbindung zum PC nur für den einen Browser-Tab und vergisst sie nach dem Ergebnis. | `webseite/demo.html` (`sessionStorage` `bk_handy`, `vergissHandySitzung`) |
| Die Seite greift weder auf Kamera noch auf Mikrofon zu (Foto über die Dateiauswahl des Geräts). | `webseite/demo.html` (`<input type="file">`) |
| Kalender-Dateien und Ausdrucke entstehen nur auf dem Gerät; nichts davon wird hochgeladen. | `webseite/demo.html` (Kalender `.ics`, `druckKnopf`) |
| Die Seite lädt außer Cloudflare (Turnstile, Besucherstatistik ohne Cookies) keine fremden Skripte. | `webseite/demo.html` (eingebundene Skripte) |

## 10. Auftragskontrolle und Organisation

| Maßnahme | Beleg |
|---|---|
| Mit Cloudflare und Anthropic gelten deren Auftragsverarbeitungsverträge (DPA) mit Standardvertragsklauseln. Der Nachweis wird geführt (zuletzt geprüft am 16.07.2026, also vor dem Einrichtungs-Zugang) und soll jährlich geprüft werden. | `rechtliches/avv-nachweis.md`; Anlage 2. `[zu bestätigen durch Webklar: Laut Nachweis ist Justin Klein, nicht die GbR, als Vertragspartner eingetragen; klären und ggf. umstellen]` |
| Bewertung der Übermittlung in die USA (Transfer-Folgenabschätzung, Klausel 14 der Standardvertragsklauseln). | `[zu bestätigen durch Webklar: noch zu erstellen, siehe AVV § 11 Abs. 5]` |
| Personen mit Zugang: nur die Gesellschafter Justin Klein und Kenso Grimm. | `[zu bestätigen durch Webklar]` |
| Schriftliche Verpflichtung auf Vertraulichkeit und, wo nötig, auf § 203 StGB. | `[zu bestätigen durch Webklar: noch zu unterschreiben]` |
| Schulung bzw. Unterweisung im Datenschutz. | `[zu bestätigen durch Webklar]` |
| Ablauf bei Datenpannen: Wer prüft, wer meldet (AVV § 14, 24 Stunden), Vertretung bei Abwesenheit, Dokumentation. | `[zu bestätigen durch Webklar: schriftlich festlegen]` |
| Ablauf bei Anfragen Betroffener (AVV § 12). | `[zu bestätigen durch Webklar: schriftlich festlegen]` |
| Wechsel des KI-Schlüssels und anderer Secrets bei Verdacht auf Offenlegung. | `[zu bestätigen durch Webklar: Verfahren]` |
| Verzeichnis der Verarbeitungstätigkeiten als Auftragsverarbeiter (Art. 30 Abs. 2). | Entwurf in `vvt-baustein.md`, Teil B `[zu bestätigen durch Webklar: ausfüllen und intern führen]` |
| Datenschutzbeauftragte/r. | `[zu bestätigen durch Webklar: Pflicht prüfen, siehe AVV § 1 Abs. 2]` |
| Überprüfung dieser Maßnahmen mindestens jährlich und nach wesentlichen Änderungen. | AVV § 9 Abs. 3 |

## 11. Empfohlene Maßnahmen bei der Stelle (in deren Verantwortung)

Diese Punkte kann Webklar nicht umsetzen. Sie stehen hier, weil sie für die Sicherheit des
Ganzen wichtig sind (siehe AVV § 6).

- Dienst-PC mit eigener Anmeldung je Person und Bildschirmsperre; Updates aktuell.
- Nach jedem Gespräch „Fertig, nächste Person“.
- QR-Codes nur der Person zeigen, für die sie bestimmt sind. Wer einen QR-Code abfotografiert,
  kann die Erklärung in den folgenden 15 Minuten öffnen. Der QR-Code von „Lieber mit dem Handy
  fotografieren“ enthält außerdem den Zugangs-Nachweis der Stelle.
- Den Knopf „Zugang dauerhaft auf ein Handy geben“ nur für Dienst-Handys von Mitarbeitenden
  nutzen.
- Keine Ausweise, Pässe oder unnötigen ärztlichen Unterlagen hochladen; nur die nötigen Seiten.
- Ausdrucke und gespeicherte PDFs wie Akten behandeln.
- Den Code nur an Mitarbeitende geben, nicht an Ratsuchende, und nicht aushängen (Bedingungen für
  Einrichtungen § 9 Abs. 1).
- Bei Vertragsende die Website-Daten von behoerdenklar.de in den Browsern der Stelle löschen.

## 12. Bekannte Grenzen

- **USA.** Cloudflare und Anthropic sitzen in den USA bzw. haben dort ihre Muttergesellschaft.
  Eine Beschränkung auf Rechenzentren in der EU ist nicht eingestellt (keine EU-Region bei
  Anthropic; Durable Objects ohne EU-Beschränkung, `idFromName` ohne Angabe einer
  Rechtsordnung). Cloudflare bietet eine EU-Beschränkung für Durable Objects an; sie ist nicht
  eingestellt.
- **Ende-zu-Ende gilt nur für die Übergabe.** Der Brief selbst geht per TLS über den Server zur
  KI. Cloudflare verarbeitet ihn dabei im Klartext im Arbeitsspeicher, Anthropic muss ihn lesen.
- **Anthropic speichert** in der Regel 30 Tage, bei Einstufung als Verstoß bis zu 2 Jahre. Eine
  Vereinbarung über eine Null-Speicherung (Zero Data Retention) mit Anthropic besteht nicht.
- **Bot-Schutz:** Für die Verbesserung von Turnstile ist Cloudflare nach eigenen Angaben selbst
  Verantwortlicher (Anlage 2).
- **Zugangs-Nachweis ohne eigenes Ablaufdatum.** Der signierte Zugangs-Nachweis der Stelle läuft
  nicht von selbst ab. Er gilt, bis der Code abläuft oder Webklar ihn sperrt. Er steht auch im
  QR-Code von „Lieber mit dem Handy fotografieren“. Wer diesen QR-Code abfotografiert, kann das
  Kontingent der Stelle nutzen, aber keine Briefe oder Erklärungen anderer sehen.
  (`signWallet`, `verifyWallet`; `webseite/demo.html`, `zeichneHandyQr`)
- **Schlüssel im Verlauf.** Die Seite entfernt den Schlüssel nach dem Lesen aus der Adresszeile.
  QR-Scanner-Apps oder der Browser-Verlauf des Handys können die vollständige Adresse aber schon
  vorher gespeichert haben. Spätestens 15 Minuten nach dem letzten Päckchen ist die Übergabe
  gelöscht; danach öffnet der Schlüssel nichts mehr (zum Zugangs-Nachweis siehe vorigen Punkt). `[zu bestätigen durch Webklar: Verhalten gängiger Scanner-Apps und
  Browser]`
- **Selbstauskunft, kein Zertifikat.** Webklar ist nicht zertifiziert; diese Anlage wurde aus
  dem Quelltext abgeleitet, nicht von einer unabhängigen Stelle geprüft.
