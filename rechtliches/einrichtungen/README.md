> **ENTWURF, Stand 28.10.2026. Von Claude erstellt, keine Rechtsberatung. Vor dem ersten Einsatz anwaltlich bzw. durch die Datenschutzbeauftragte prüfen lassen.**

# Unterlagen für Einrichtungen: Überblick

Dieser Ordner enthält die Vertrags- und Datenschutzunterlagen für Beratungsstellen gemeinnütziger
Träger, die BehördenKlar über einen Einrichtungs-Code nutzen. Erster Fall: die MBE Donnersberg der
Förderinitiative Donnersberg e.V. (FID). Test bis 29.11.2026, Auswertung und Angebot am 26.11.2026.

Alle Dateien sind **Entwürfe**. Sie wurden am 28.10.2026 untereinander und mit dem Datenschutz-Blatt
(Stand 25.10.2026), der Datenschutzerklärung (Stand 22.10.2026), `marketing/preise-einrichtungen.md`
und dem Quelltext abgeglichen.

**Das Repository ist öffentlich.** In diese Dateien gehören nie Steuernummer, IBAN, BIC,
Einrichtungs-Codes oder Links mit Code. Ausgefüllte Fassungen nur außerhalb des Repositorys
speichern oder in einem von Git ignorierten Ordner (z. B. `marketing/praesentation-mbe/druck/`,
siehe `.gitignore`).

---

## 1. Die Dateien

| Datei | Was es ist | Für wen | Weitergeben? |
|---|---|---|---|
| `angebot-vorlage.md` | Vorlage für ein einseitiges Angebot (Paket, Preis, Leistungszeitraum, Übergang, Rechnung), mit Ausfüllhinweisen und MBE-Beispiel | Träger (Vertragspartner) | ja, ohne die Ausfüllhinweise |
| `bedingungen-einrichtungen.md` | Bedingungen für Einrichtungen (Allgemeine Geschäftsbedingungen für Träger), ersetzen für diese Verträge die AGB für Privatpersonen auf der Webseite | Träger, Anlage zum Angebot | ja, ohne den Abschnitt „Für Webklar“ am Ende |
| `rechnung-vorlage.md` | Rechnungsvorlage für Kleinunternehmer nach § 34a UStDV, mit Projektbezug (z. B. „MBE 2027“) und Leistungszeitraum | Träger, im Januar | ja, ohne die Ausfüllhinweise |
| `avv-entwurf.md` | Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO). Teil A erklärt Fall A und die beiden Lesarten, Teil B ist der Vertrag für Fall B | Träger und seine Datenschutzbeauftragte (DSB) | ja, ohne „Offene Punkte“ am Ende |
| `anlage-1-toms.md` | Anlage 1 zum AVV: technische und organisatorische Maßnahmen, mit Belegen im Quelltext | DSB des Trägers | ja |
| `anlage-2-unterauftragsverarbeiter.md` | Anlage 2 zum AVV: Cloudflare und Anthropic, Verträge, Orte, Fristen, Abweichungen vom AVV | DSB des Trägers | ja |
| `dsfa-bausteine.md` | Bausteine für eine Datenschutz-Folgenabschätzung (Art. 35 DSGVO): Beschreibung, Risiken, Maßnahmen, offene Rechtsfragen | DSB des Trägers | ja, auf Anfrage oder mit dem AVV |
| `vvt-baustein.md` | Teil A: Einträge für das Verzeichnis des Trägers (Art. 30 Abs. 1). Teil B: Verzeichnis von Webklar als Auftragsverarbeiter (Art. 30 Abs. 2) | Teil A: DSB des Trägers. Teil B: Webklar intern | Teil A ja; Teil B auf Anfrage (AVV § 16 Abs. 1) |
| `README.md` | diese Übersicht | Webklar | nein |

Außerhalb dieses Ordners, aber Teil des Pakets: das **Datenschutz-Blatt**
(`marketing/praesentation-mbe/datenschutz-blatt.html` bzw. `.pdf`, Stand 25.10.2026) und die
**Kurzanleitung für Beratende** (`marketing/praesentation-mbe/kurzanleitung-beratung.html`).

---

## 2. Reihenfolge: Was der Träger wann bekommt

Es gibt zwei Stränge. Der Datenschutz-Strang geht an die DSB, der Vertrags-Strang an die Leitung
bzw. die Buchhaltung des Trägers.

### Datenschutz (für die DSB)

1. **Datenschutz-Blatt** (2 Seiten): der schnelle Überblick. Gibt es schon, liegt seit dem Test vor.
2. **AVV-Entwurf mit Anlage 1 (TOMs) und Anlage 2 (Unterauftragsverarbeiter).** Mit der DSB zuerst
   die Rolle in Fall A klären (Teil A, Lesart 1 oder 2) und in § 1 Abs. 3 ankreuzen.
   Nötig spätestens vor dem ersten Brief, den die Stelle selbst hochlädt (Fall B).
3. **DSFA-Bausteine und VVT-Baustein (Teil A).** Für die Schwellwertprüfung und das Verzeichnis
   des Trägers. Ob eine DSFA nötig ist, entscheidet der Träger.

### Vertrag (für Leitung und Buchhaltung)

4. **Angebot** (am 26.11.2026 für die MBE), mit den Anlagen Bedingungen, AVV-Entwurf und
   Datenschutz-Blatt.
5. **Bedingungen für Einrichtungen** als Anlage zum Angebot. Ohne die Bedingungen das Angebot nicht
   verschicken: Haftung, Verfügbarkeit, Pflichten der Stelle und Gerichtsstand stehen nur dort.
6. **Rechnung** im Januar des Leistungsjahres (für die MBE: Januar 2027, „MBE 2027“), nach der
   Bestellung. Für die kostenlose Übergangszeit keine Rechnung.

Rangfolge bei Widersprüchen (Bedingungen § 1 Abs. 6): 1. geschlossener AVV (für den Datenschutz),
2. angenommenes Angebot, 3. Bedingungen. Datenschutz-Blatt und Kurzanleitung beschreiben nur.

---

## 3. Gemeinsame Begriffe

| Begriff | Bedeutung in allen Dateien |
|---|---|
| **Fall A** | Die ratsuchende Person lädt mit dem eigenen Handy hoch und setzt das Häkchen selbst. |
| **A1 / A2** | Spielarten von Fall A. A1: zu Hause ohne die Stelle (nicht vorgesehen, weil der Code nur für Mitarbeitende ist). A2: in der Beratung über „Lieber mit dem Handy fotografieren“, die Erklärung erscheint auch am Dienst-PC. |
| **Fall B** | Mitarbeitende laden den Brief selbst auf einem Gerät der Stelle hoch. Webklar ist Auftragsverarbeiter. Erst nach geschlossenem AVV, im Test nie. |
| **Lesart 1 / 2** | Rolle in Fall A. Lesart 1: Webklar ist verantwortlich (so Datenschutz-Blatt, Bedingungen § 13, DSFA, VVT). Lesart 2: Träger verantwortlich, Webklar Auftragsverarbeiter. Der AVV lässt es offen. |
| **Eintrag 1 / 2** | Nur im VVT-Baustein: Einträge für das Verzeichnis des Trägers (nicht zu verwechseln mit A1/A2). |
| **Einrichtungs-Code** | Zugangscode der Stelle, nur für Mitarbeitende. Links und QR-Codes mit Code stehen ihm gleich. |
| **Zugangs-Nachweis** | Signierter Nachweis im Browser, der auf das Kontingent zeigt. Steht auch im QR-Code von „Lieber mit dem Handy fotografieren“. |
| **Kontingent** | Zahl der Briefe im Leistungszeitraum. Im Datenschutz-Blatt und in Anlage 1 heißt es „Guthaben“ bzw. „Einrichtungs-Guthaben“. |
| **Brief** | Eine Analyse eines Fotos oder einer PDF-Datei (Bedingungen § 2 Abs. 4). Jedes Foto zählt einzeln. |
| **Übergabe-Päckchen** | Ende-zu-Ende-verschlüsselte Ablage für die Übergabe zwischen Handy und PC (Cloudflare Durable Objects). |
| **DSB** | Datenschutzbeauftragte des Trägers. |

---

## 4. Abgeglichene Kernangaben

Diese Werte stehen jetzt in allen Dateien gleich.

| Thema | Angabe | Quelle |
|---|---|---|
| Brief und Erklärung bei Webklar | nicht gespeichert, nur Durchleitung | Datenschutz-Blatt Abschnitt 3; `proxy/src/index.ts` |
| Übergabe-Päckchen | beim Abholen gelöscht, spätestens 15 Minuten nach dem letzten Päckchen; Inhalt: Erklärung, gewählte Sprache, Zahl der übrigen Briefe, Name der Stelle, Statusmeldungen. Offen: Wiederherstellungsfunktion von Cloudflare (bis 30 Tage) | `proxy/src/index.ts:807-838`; `webseite/demo.html:1024-1027`; Anlage 1 Nr. 8 |
| Anthropic | in der Regel 30 Tage; bei Einstufung als Verstoß gegen die Nutzungsrichtlinien bis zu 2 Jahre; kein Training | Anlage 2 Nr. 2 |
| Nutzungszähler | je Analyse Datum und Sprache, 390 Tage (unter 13 Monaten) | `proxy/src/index.ts:465-469` |
| Code-Fehlversuche | je IP-Adresse und Tag, 48 Stunden; höchstens 30 pro Tag | `proxy/src/index.ts:722`, `:772` |
| Schreib-Bremse Übergabe | je IP-Adresse, Zeitfenster 60 Sekunden, 60 Päckchen | `proxy/wrangler.toml` |
| Server-Protokolle | höchstens 7 Tage; enthalten gekürzte Fehlermeldungen des KI-Dienstes (ob mit Briefteilen: offen) | `proxy/src/index.ts:240`, `:431`; Anlage 1 Nr. 5 |
| Einrichtungs-Daten | ohne automatische Frist; Löschung innerhalb von 30 Tagen nach Vertragsende zugesagt (Verfahren offen) | AVV § 15 Abs. 2; Bedingungen § 13 Abs. 4 |
| Unterauftragsverarbeiter | Cloudflare, Inc. (Workers, KV, Durable Objects, Rate Limiting, Turnstile, Pages, Web Analytics, Workers Logs); Anthropic (Anthropic PBC; für Kunden im EWR laut Commercial Terms Anthropic Ireland, Limited, zu bestätigen). Stripe und Brevo nicht im Einrichtungs-Zugang | Anlage 2 |
| Übermittlung USA | EU-Standardvertragsklauseln, mit Prüfhinweis (Cloudflare-DPA Ziff. 6, Vertragspartner Anthropic); keine EU-Region eingestellt; keine Aussage zum EU-US Data Privacy Framework | AVV § 11; Anlage 2 |
| Meldefristen | Webklar an Träger 24 Stunden (zu bestätigen, sonst 48); Anthropic an Webklar 48 Stunden; Cloudflare unverzüglich | AVV § 14; Anlage 2 Nr. 4 |
| Widerspruch neue Unterauftragsverarbeiter | Träger 14 Tage; Cloudflare 10 Tage; Anthropic 15 Tage; Webklar kündigt eigene Änderungen 4 Wochen vorher an | AVV § 10; Bedingungen § 14 Abs. 1 |
| Preise | Klein 190 € / 600, Standard 290 € / 1.200, Groß 450 € / 2.400 Briefe je Kalenderjahr; Test 0 €, bis 100 Briefe, in der Regel 1 Monat | `marketing/preise-einrichtungen.md:11-19` |
| Pilot 2027 | Standard-Paket für 190 € (Rabatt 100 €), Rückmeldung nach 3 und 12 Monaten | `preise-einrichtungen.md:40-46` |
| Preisobergrenze 2028/2029 | höchstens 290 € für das Standard-Paket mit 1.200 Briefen, Endpreis, auch bei späterer Umsatzsteuerpflicht | `preise-einrichtungen.md:42-44` |
| Übergang | kostenlos bis 31.12. des Vorjahres, bei Bedarf 100 Briefe; im Januar bis 31.01.; danach `setzen` auf das Paket, Übergangsbriefe werden nicht angerechnet | Angebot Abschnitt 3; Bedingungen § 4 Abs. 4 |
| Laufzeit | Kalenderjahr, endet am 31.12. von selbst, kein Abo, Restbriefe verfallen; anteilige Erstattung nur bei Einstellung oder Kündigung nach AVV bzw. § 14 | Bedingungen § 5 |
| Rechnung | im Januar, 30 Tage, Überweisung; PDF nur mit Zustimmung, sonst Post; Zahlungsplan (z. B. Raten je Quartal) falls keine Vorauszahlung erlaubt | Angebot Abschnitt 5; Bedingungen § 7; Rechnungsvorlage |
| Umsatzsteuer | keine (Kleinunternehmer, § 19 UStG); alle Preise Endpreise | alle |
| Code-Weitergabe | nur an Mitarbeitende; Ratsuchende nutzen den QR-Code am PC | Bedingungen § 9 Abs. 1; AVV § 6 Abs. 4; Anlage 1 Nr. 11 |

---

## 5. Vorher ausfüllen (Platzhalter)

Platzhalter in eckigen Klammern nur in der ausgefüllten Kopie ersetzen, nie in diesem Ordner.

| Datei | Platzhalter |
|---|---|
| Angebot | [TRÄGER], [STELLE], [ANSPRECHPARTNER], [ANSCHRIFT], [DATUM], [ANGEBOTSNUMMER], [JAHR], [VORJAHR], [PAKET], [BRIEFZAHL], [LISTENPREIS], [RABATT], [ENDPREIS], [RECHNUNGS-E-MAIL], [BINDEFRIST], [SEITENZAHL] (erst nach Einbau des Seitenlimits, sonst Satz löschen); OPTION-Blöcke übernehmen oder löschen; Unterschrift (ein oder beide Gesellschafter) |
| Bedingungen | [DATUM DER FREIGABE] |
| Rechnung | [STEUERNUMMER], [IBAN], [BIC], [BANK], [RECHNUNGSNUMMER], [DATUM], [FÄLLIGKEITSDATUM], [PROJEKT], [FÖRDERKENNZEICHEN], [ANGEBOTSNUMMER], [ANGEBOTSDATUM], [BESTELLDATUM], Empfängerangaben, Paket- und Preisfelder |
| AVV | [NAME DES TRÄGERS], [ANSCHRIFT], [VERTRETUNGSBERECHTIGTE PERSON(EN)], [NAME DER BERATUNGSSTELLE], DSB des Trägers, Bezeichnung und Datum des Hauptvertrags (§ 1 Abs. 4), Weisungsberechtigte (§ 7 Abs. 3), Ansprechpartner (§ 18), Telefon und E-Mail von Kenso Grimm; Kreuz in § 1 Abs. 3 |
| DSFA-Bausteine | [TRÄGER], alle Felder „vom Verantwortlichen festzulegen“, Abschnitt 6 (Ergebnis und Freigabe) |
| VVT-Baustein | Teil A: [TRÄGER], [ANSCHRIFT], [VORSTAND], [BERATUNGSSTELLE], [NAME, KONTAKT]. Teil B: Verantwortlicher je AVV, [DATUM]; [EINRICHTUNGS-CODE] nur in der internen Fassung |

Außerdem vor der Weitergabe alle Stellen `[zu bestätigen durch Webklar]` klären oder bewusst
offen lassen. Die wichtigsten:

- Zwei-Faktor-Anmeldung und Zugriffsrechte bei Cloudflare und Anthropic; Laptops (Verschlüsselung,
  Sperre, Updates); Tarif bei Cloudflare (Protokolle 7 oder 3 Tage).
- Vertragspartner bei Cloudflare und Anthropic: Webklar GbR oder ein Gesellschafter persönlich
  (`rechtliches/avv-nachweis.md` nennt einen Gesellschafter); welche Anthropic-Gesellschaft.
- Vertretung der GbR: Darf ein Gesellschafter allein unterschreiben (§ 720 Abs. 1 BGB)?
- Konto und Steuernummer der GbR (Rechnung).
- Schriftliche Verpflichtung der Gesellschafter auf Vertraulichkeit und § 203 StGB (AVV § 8).
- Meldefrist 24 Stunden nur mit gesicherter Vertretung, sonst 48 Stunden (AVV § 14).
- Verfahren zum Löschen eines Codes nach Vertragsende (das Werkzeug kann `sperren`, aber nicht löschen).
- Sicherung der Einrichtungs-Daten in Cloudflare KV (derzeit keine bekannt).
- Transfer-Folgenabschätzung von Webklar (AVV § 11 Abs. 5): noch zu erstellen.
- Eine Kontakt-E-Mail für alles festlegen (siehe Abschnitt 7).

---

## 6. Was Anwalt, DSB und Steuerberater prüfen sollten

### Anwältin oder Anwalt

- **Rolle in Fall A** (Lesart 1, Lesart 2 oder gemeinsame Verantwortlichkeit nach Art. 26), vor
  allem A2 mit Anzeige am Dienst-PC; danach Einwilligungstext, Bedingungen § 13 Abs. 1 und
  AVV § 1 Abs. 3 angleichen. Auch: „Ergebnis aufs Handy mitnehmen“ bei Erklärungen aus Fall A2.
- **Übermittlung in die USA:** Cloudflare-DPA Ziff. 6 (Angemessenheitsbeschluss vor
  Standardvertragsklauseln), Anthropic Ireland, Limited als Vertragspartner, Module; danach AVV
  § 11 Abs. 3, Datenschutzerklärung und Datenschutz-Blatt angleichen. Transfer-Folgenabschätzung.
- **Art. 28 Abs. 4 DSGVO:** Abweichungen der nicht verhandelbaren DPAs (kürzere
  Widerspruchsfristen, Meldung, Kontrollen, bis zu 2 Jahre Speicherung bei Anthropic).
- **§ 203 StGB:** Reichen die Vertraulichkeitsregeln von Cloudflare und Anthropic
  (§ 203 Abs. 4 Satz 2 Nr. 2 StGB)?
- **Art. 10 DSGVO** (Strafbefehle, möglicherweise Bußgeldbescheide nach EuGH C-439/19) und
  **Daten Dritter** im Brief: Rechtsgrundlage, notfalls solche Briefe ausnehmen.
- **AGB-Kontrolle** der Bedingungen und des Angebots (§§ 305 ff., 307 BGB), auch die Frage, ob ein
  gemeinnütziger e.V. Unternehmer ist: Verfall der Restbriefe, Abzug bei abgelehnter oder nicht
  auswertbarer KI-Antwort, Haftungsbegrenzung (auch für Unterauftragsverarbeiter, Zirkelverweis
  AVV § 17 und Bedingungen § 12 Abs. 6), Mietrecht (§§ 536a, 547 BGB), Haftung im kostenlosen Test,
  Gerichtsstand, Fortgeltung des AVV für Folgeverträge (AVV § 2 Abs. 2).
- **Rechtsdienstleistungsgesetz:** Abgrenzung in Bedingungen § 8 (§ 2 RDG).
- **GbR:** Vertretung (§ 720 Abs. 1 BGB), ob eingetragen (eGbR).
- **Pflicht zur Datenschutzbeauftragten bei Webklar** (§ 38 Abs. 1 Satz 2 BDSG, Art. 37 DSGVO).
- **Zuwendungs- und Vergaberecht:** Jahresvorauszahlung (ANBest-P), Abwehrklausel gegen
  Vergabebedingungen (Bedingungen § 1 Abs. 4).

### Datenschutzbeauftragte des Trägers

- Lesart für Fall A wählen und im AVV ankreuzen.
- Rechtsgrundlage für Fall B (Einwilligung der Klientin, nachweisbar; ggf. § 22 Abs. 1 Nr. 1 lit. b
  BDSG) und eigener Häkchen-Text für Mitarbeitende.
- Schwellwertprüfung DSFA (DSK-Muss-Liste, WP 248) und Risikobewertung (DSFA-Bausteine Abschnitt 4).
- Freiwilligkeit in der Beratung, Ratsuchende unter 16 Jahren (Art. 8 DSGVO), Mitbestimmung bei
  Stellen mit nur einer beratenden Person (§ 87 Abs. 1 Nr. 6 BetrVG).
- Ob die Verbindungs- und Schutzdaten in den Auftrag gehören (AVV § 5 Abs. 3).

### Steuerberaterin oder Steuerberater

- Umsatz der **ganzen** Webklar GbR gegen 25.000 € (Vorjahr) und 100.000 € (laufendes Jahr),
  § 19 UStG.
- § 13b UStG für die Leistungen von Anthropic (und ggf. Cloudflare), auch als Kleinunternehmer.
- Eigene Steuernummer der GbR, Wortlaut des § 19-Hinweises, § 34a UStDV (Satzzählung „letzter
  Satz“), Zustimmung zur PDF-Rechnung, Aufbewahrung (§ 14b UStG).
- Preisobergrenze 290 € als Endpreis bei späterer Umsatzsteuerpflicht; Steuerentstehung bei der
  Januar-Rechnung als Vorauszahlung.

---

## 7. Abweichungen in Unterlagen außerhalb dieses Ordners

Diese Stellen wurden **nicht geändert**, weil nur dieser Ordner bearbeitet werden durfte. Sie
sollten nach der Klärung angeglichen werden.

| Unterlage | Stelle | Abweichung |
|---|---|---|
| `webseite/datenschutz.html` | Abschnitt 9a | „Beratungsstellen können ihren Ratsuchenden einen Code geben“: widerspricht Bedingungen § 9 Abs. 1 (Code nur für Mitarbeitende). |
| `webseite/datenschutz.html` | Abschnitt 9a | „die Beratungsstelle sieht keine … Ergebnisse“: falsch bei „Lieber mit dem Handy fotografieren“ (Erklärung erscheint am Dienst-PC). |
| `webseite/datenschutz.html`, Datenschutz-Blatt | Abschnitte 3a/5 bzw. 3 und 7 | Anthropic „länger nur bei Missbrauchsverdacht“; laut Anlage 2 bis zu 2 Jahre bei Verstoß-Einstufung. Nur „Anthropic PBC“ genannt; Vertragspartner im EWR möglicherweise Anthropic Ireland, Limited. |
| `webseite/datenschutz.html`, Datenschutz-Blatt | Abschnitt 5 bzw. 3 | Server-Protokolle „kein Briefinhalt“: nicht belegt, gekürzte Fehlermeldungen des KI-Dienstes werden protokolliert. |
| `webseite/datenschutz.html`, `impressum.html`, `agb.html` | Kontakt | behoerdenbriefhelfer@gmail.com; Datenschutz-Blatt und alle Entwürfe hier: justin@webklar.com. Eine Adresse festlegen. |
| `webseite/datenschutz.html` | fehlt | Kontakt- und Rechnungsdaten der Einrichtungen (Bedingungen § 13 Abs. 5). |
| Datenschutz-Blatt | Abschnitt 4, Fall A | „zu Hause oder in der Beratung“: Zuhause-Nutzung mit dem Code ist nach den Bedingungen nicht vorgesehen (A1). Rolle in Fall A dort fest auf Webklar; die Entwürfe lassen sie offen (Lesart 1 als Vorschlag). |
| Datenschutz-Blatt | Abschnitt 7 | Beim abfotografierten QR-Code nur „15 Minuten“; der QR-Code enthält auch den dauerhaften Zugangs-Nachweis der Stelle (`webseite/demo.html:1572-1576`). Gilt auch für die Kurzanleitung. |
| Datenschutz-Blatt | Abschnitt 3 | Übergabe-Päckchen ohne gewählte Sprache und Restzahl; Einrichtungs-Guthaben „ohne automatische Frist“ ohne die Löschzusage nach Vertragsende. |
| Datenschutz-Blatt | Abschnitt 7 | „Noch offen: AVV-Entwurf, TOMs, Baustein fürs Verarbeitungsverzeichnis“: Entwürfe liegen jetzt hier vor. |
| `FEATURES.md` | Abschnitt 3d | „Falsche Codes: max. 10 pro IP und Tag“; im Code sind es 30 (`proxy/src/index.ts:722`). |
| `marketing/preise-einrichtungen.md` | Aufgabenliste | „Code-Werkzeug: Befehl `setzen`“: gibt es inzwischen (`tools/einrichtungs-code.js:150-158`), ebenso `sperren`. |

---

## 8. Stand der Aufgaben aus `marketing/preise-einrichtungen.md`

| Aufgabe | Stand |
|---|---|
| Echte KI-Kosten messen (über 5 ct pro Brief: Pilotpreis prüfen) | offen, nicht Teil dieses Ordners |
| PDF-Seitenlimit einbauen | offen; bis dahin im Angebot die OPTION [SEITENZAHL] löschen |
| Angebots- und Rechnungsvorlage | Entwürfe: `angebot-vorlage.md`, `rechnung-vorlage.md` |
| Bedingungen für Einrichtungen | Entwurf: `bedingungen-einrichtungen.md` |
| AVV, TOMs, Unterauftragsverarbeiter, Angaben für eine Folgenabschätzung | Entwürfe: `avv-entwurf.md`, `anlage-1-toms.md`, `anlage-2-unterauftragsverarbeiter.md`, `dsfa-bausteine.md`, `vvt-baustein.md` |
| Steuerberater (§ 19, § 13b UStG) | offen, Fragen in Abschnitt 6 |
| Befehl `setzen` | vorhanden (`tools/einrichtungs-code.js`); am Jahreswechsel `setzen` statt `aufladen` |
| Monatlich `stand <CODE>` prüfen | laufende Aufgabe; eine automatische Warnung gibt es nicht (Bedingungen § 6 Abs. 5) |

Weitere technische Punkte, die die Entwürfe offen nennen: Protokolle ohne Fehlertexte des
KI-Dienstes, Wiederherstellungsfunktion der Durable Objects klären, kurzlebiger Nachweis statt des
dauerhaften Zugangs-Nachweises im QR-Code, Befehl zum Löschen eines Codes, Wegfall der
Foto-Metadaten (EXIF) prüfen, ob Skripte von Cloudflare den `#`-Teil der Adresse lesen.
