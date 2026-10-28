> **ENTWURF, Stand 28.10.2026. Von Claude erstellt, keine Rechtsberatung. Vor dem ersten Einsatz anwaltlich bzw. durch die Datenschutzbeauftragte prüfen lassen.**

# Anlage 2 zum AVV: Unterauftragsverarbeiter

**Webklar GbR · BehördenKlar im Einrichtungs-Zugang**

Die Angaben zu den Verträgen von Cloudflare und Anthropic wurden am **28.10.2026** von deren
Webseiten abgerufen und hier vereinfacht zusammengefasst. Maßgeblich ist immer der jeweilige
Vertragstext. `[zu bestätigen durch Webklar: Vor der Unterzeichnung die aktuellen Fassungen als
PDF sichern und die Angaben unten damit abgleichen (offener Punkt aus
rechtliches/avv-nachweis.md).]`

## Übersicht

| | Cloudflare | Anthropic |
|---|---|---|
| **Leistung** | Server (Durchleitung zur KI), Zwischenspeicher für die Übergabe, Zähler, Bot-Schutz, Hosting der Webseite, Besucherstatistik | KI-Erklärung und Übersetzung (Claude) |
| **Briefinhalt?** | ja: auf der Durchleitung (nicht gespeichert) und verschlüsselt in der Übergabe | ja: Brief und Erklärung |
| **Ort** | weltweites Netz von Cloudflare, auch USA; keine EU-Beschränkung eingestellt | USA und weitere Standorte laut Liste von Anthropic; keine EU-Region eingestellt |
| **Grundlage der Übermittlung** | EU-Standardvertragsklauseln im DPA (Prüfhinweis in Nr. 1) | EU-Standardvertragsklauseln im DPA (Prüfhinweis zum Vertragspartner in Nr. 2) |
| **Speicherdauer Briefinhalt** | Durchleitung: keine; Übergabe (verschlüsselt): beim Abholen, spätestens 15 Min. nach dem letzten Päckchen (zur Wiederherstellungsfunktion siehe Anlage 1 Nr. 8) | in der Regel 30 Tage, bei Verstoß-Einstufung bis zu 2 Jahre |

---

## 1. Cloudflare, Inc.

**Sitz:** Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA
(Vertragspartner laut DPA).

**Leistungen im Einrichtungs-Zugang:**

| Dienst | Wofür | Berührt Briefinhalt? |
|---|---|---|
| Workers | Server von BehördenKlar: nimmt den Brief an, prüft, reicht ihn an Anthropic weiter, gibt die Erklärung zurück | ja, nur im Arbeitsspeicher, keine Speicherung |
| Durable Objects | Zwischenspeicher für die Übergabe zwischen Geräten | nur verschlüsselt (Ende-zu-Ende), höchstens 15 Minuten |
| Workers KV | Einrichtungs-Guthaben, Nutzungszähler (Datum, Sprache), Code-Fehlversuche | nein |
| Rate Limiting | Schreib-Bremse für die Übergabe pro IP-Adresse | nein |
| Turnstile | Bot-Schutz vor jeder Analyse | nein (Browser-Merkmale, IP-Adresse) |
| Pages | Hosting der Webseite behoerdenklar.de | nein |
| Web Analytics | Besucherstatistik ohne Cookies | nein |
| Workers Logs | Server-Protokolle zur Fehlersuche, höchstens 7 Tage | nicht vorgesehen; protokolliert werden aber gekürzte Fehlermeldungen des KI-Dienstes (Anlage 1 Nr. 5) `[zu bestätigen durch Webklar: ob sie Teile eines Briefs enthalten können]` |

**Ort der Verarbeitung:**

- Cloudflare betreibt Rechenzentren weltweit, auch in den USA. Welches Rechenzentrum eine
  Anfrage bearbeitet, wählt Cloudflare. `[zu bestätigen durch Webklar: ob für die Nutzung aus
  Deutschland eine Aussage zum Standort möglich ist]`
- Durable Objects (Übergabe) entstehen laut Cloudflare in einem Rechenzentrum nahe der ersten
  Anfrage. Eine Beschränkung auf die EU („jurisdiction“) ist möglich, aber **nicht
  eingestellt**.
- Workers KV ist ein weltweit verteilter Speicher.

**Grundlage der Übermittlung:** Webklar stützt sich auf die EU-Standardvertragsklauseln
(Art. 46 Abs. 2 lit. c DSGVO). Sie sind Bestandteil des DPA (Ziff. 6): Modul 3, wenn der Kunde
Auftragsverarbeiter ist (Fall B), Modul 2, wenn er Verantwortlicher ist. `[anwaltlich prüfen:
Laut Abruf behandelt Ziff. 6 Übermittlungen, die unter einen Angemessenheitsbeschluss fallen,
nicht als Drittlandübermittlung im Sinne des DPA. Die Standardvertragsklauseln greifen danach
erst, wenn diese Grundlage entfällt. Ob die Aussage „Grundlage: Standardvertragsklauseln“ in
AVV, Datenschutzerklärung und Datenschutz-Blatt so bleiben kann, ist am Vertragstext zu klären.
Bei Widersprüchen gehen nach Ziff. 6 die Standardvertragsklauseln dem DPA vor.]`

**Vertrag:**

- Customer DPA, laut Abruf Version 6.4, gültig ab 03.04.2026:
  <https://www.cloudflare.com/cloudflare-customer-dpa/>
- Gilt per Verweis mit dem Self-Serve Subscription Agreement, auch für kostenlose Konten
  (laut `rechtliches/avv-nachweis.md`).
- Übersicht DSGVO: <https://www.cloudflare.com/trust-hub/gdpr/>

**Weitere Unterauftragsverarbeiter von Cloudflare:**
<https://www.cloudflare.com/gdpr/subprocessors/>
Laut DPA: neue oder ersetzte Unterauftragsverarbeiter mindestens 30 Tage vorher; Widerspruch
innerhalb von 10 Tagen; ohne Einigung Kündigung des betroffenen Auftrags.

**Weitere Regeln aus dem DPA (laut Abruf):**

- Meldung von Verletzungen: unverzüglich, ohne feste Stundenfrist.
- Kontrollen: Prüfberichte unabhängiger Prüfer (nicht älter als 13 Monate). Eine Kontrolle vor
  Ort nur eingeschränkt: für Daten unter den Standardvertragsklauseln, wenn die Berichte nicht
  ausreichen, höchstens einmal im Jahr. Das DPA nennt u. a. ISO/IEC 27001, SOC 2 Type II,
  ISO/IEC 27701 und PCI DSS.
- Vertragsende: Löschung oder Rückgabe nach Wahl des Kunden, soweit kein Gesetz die
  Aufbewahrung verlangt.

**Turnstile (Bot-Schutz), Besonderheit:** Laut Cloudflare verarbeitet Turnstile Signale wie
IP-Adresse, TLS-Fingerabdruck, User-Agent und Sitekey. Für den Bot-Schutz ist Cloudflare
Auftragsverarbeiter; **für die Verbesserung von Turnstile ist Cloudflare selbst
Verantwortlicher.** Eine Speicherdauer für diese Signale nennt Cloudflare dort nicht.
<https://www.cloudflare.com/turnstile-privacy-policy/>

**Speicherdauern bei Cloudflare (aus dem Quelltext, siehe Anlage 1 Nr. 8):**

| Was | Wie lange |
|---|---|
| Brief und Erklärung auf der Durchleitung | gar nicht gespeichert |
| Übergabe-Päckchen (verschlüsselt) | beim Abholen gelöscht, sonst spätestens 15 Min. nach dem letzten Päckchen |
| Nutzungszähler | 390 Tage (unter 13 Monaten) |
| Code-Fehlversuche | 48 Stunden |
| Schreib-Bremse | 60 Sekunden |
| Einrichtungs-Daten | ohne automatische Frist (Löschung nach AVV § 15) |
| Server-Protokolle | 7 Tage im bezahlten, 3 Tage im kostenlosen Tarif `[Tarif zu bestätigen durch Webklar]`. Welche Felder Cloudflare je Aufruf automatisch aufzeichnet (z. B. ob die IP-Adresse dabei ist), nennt die Dokumentation nicht abschließend `[zu bestätigen durch Webklar, im Dashboard nachsehen]` |

**Technische Fundstellen bei Cloudflare:**

- Verschlüsselung im Ruhezustand, KV: <https://developers.cloudflare.com/kv/reference/data-security/>
- Verschlüsselung im Ruhezustand, Durable Objects:
  <https://developers.cloudflare.com/durable-objects/reference/data-security/>
- Standort von Durable Objects:
  <https://developers.cloudflare.com/durable-objects/reference/data-location/>
- Wiederherstellung von Durable Objects (30 Tage):
  <https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/>
- Workers Logs (Aufbewahrung):
  <https://developers.cloudflare.com/workers/observability/logs/workers-logs/>

---

## 2. Anthropic

**Sitz und Vertragspartner:**

- Laut den Commercial Terms ist für Kunden mit Sitz im Europäischen Wirtschaftsraum die
  **Anthropic Ireland, Limited** (Irland) Vertragspartner. Muttergesellschaft und Betreiber der
  KI ist die **Anthropic PBC**, San Francisco, USA.
- `[zu bestätigen durch Webklar: Welche Gesellschaft im Konto von Webklar Vertragspartner ist,
  mit Anschrift. Datenschutzerklärung und Datenschutz-Blatt nennen bisher Anthropic PBC.]`

**Leistung:**

- Erklärung des Briefs: Modell `claude-sonnet-5`, bekommt das Foto bzw. PDF und eine feste
  Anweisung.
- Übersetzung der fertigen Erklärung, wenn eine deutsche und eine anderssprachige Fassung
  gewünscht sind: Modell `claude-haiku-4-5`, bekommt nur den Text der Erklärung.
- Keine Kennungen der Stelle oder der Person in den Anfragen (`proxy/src/index.ts`,
  `demoHandler`, `uebersetzeAnalyse`).

**Ort der Verarbeitung:** USA sowie Standorte der Unterauftragsverarbeiter von Anthropic. Eine
Verarbeitung nur in der EU ist nicht eingestellt.

**Grundlage der Übermittlung:** EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO),
Bestandteil des DPA; Modul 2 und/oder Modul 3, soweit erforderlich. Datenimporteur ist laut DPA
„die Anthropic-Gesellschaft, die den Vertrag geschlossen hat“. `[zu prüfen: Ist das die
Anthropic Ireland, Limited, liegt die Übermittlung in die USA innerhalb der
Anthropic-Unternehmensgruppe. Wie das im DPA geregelt ist, mit der aktuellen Fassung
abgleichen.]`

**Vertrag:**

- Data Processing Addendum (DPA), laut Abruf gültig ab 24.02.2025:
  <https://www.anthropic.com/legal/data-processing-addendum>
- Gilt per Verweis mit den Commercial Terms of Service (laut Abruf Stand 17.06.2025):
  <https://www.anthropic.com/legal/commercial-terms>
- Hilfeseite „How do I view and sign your Data Processing Addendum (DPA)?“:
  <https://privacy.claude.com/en/articles/7996862>

**Weitere Unterauftragsverarbeiter von Anthropic:**
<https://trust.anthropic.com/subprocessors> (Weiterleitung von anthropic.com/subprocessors).
Laut DPA: angemessene Vorankündigung; Widerspruch innerhalb von 15 Tagen aus Gründen des
Datenschutzes oder der Sicherheit, sonst gilt die Zustimmung als erteilt.

**Speicherdauer bei Anthropic** (laut Hilfeseite
<https://privacy.claude.com/en/articles/7996866>):

- Eingaben und Ausgaben der API werden **in der Regel innerhalb von 30 Tagen** gelöscht.
- Ausnahmen: eine andere Vereinbarung (z. B. Null-Speicherung, besteht bei Webklar nicht);
  Einstufung als Verstoß gegen die Nutzungsrichtlinien durch die Sicherheitssysteme von
  Anthropic: Eingaben und Ausgaben **bis zu 2 Jahre**, Einstufungswerte bis zu 7 Jahre;
  gesetzliche Pflichten.
- Für bestimmte Modelle („Covered Models“) nennt Anthropic besondere Regeln. Die von
  BehördenKlar genutzten Modelle gehören nach unserem Stand nicht dazu. `[zu bestätigen durch
  Webklar]`

**Kein Training:** Laut Commercial Terms (Abschnitt B, Abruf 28.10.2026) darf Anthropic Inhalte
von Kunden aus seinen Diensten nicht zum Training von Modellen nutzen (so auch
Datenschutzerklärung Nr. 3a). `[zu bestätigen durch Webklar: keine Teilnahme an Programmen, die
etwas anderes erlauben.]`

**Weitere Regeln aus dem DPA (laut Abruf):**

- Meldung von Verletzungen: unverzüglich, spätestens innerhalb von 48 Stunden.
- Kontrollen: jährliche externe Prüfung; Prüfberichte (z. B. SOC 2) auf schriftliche Anfrage;
  eigene Prüfung auf eigene Kosten nach Absprache, in der Regel höchstens einmal in 12 Monaten.
  Zertifikate: <https://trust.anthropic.com>
- Vertragsende: Rückgabe auf Wunsch, danach Löschung innerhalb von 30 Tagen, mit Ausnahmen
  (gesetzliche Pflichten, Streitigkeiten, Bekämpfung von Missbrauch).

---

## 3. Nicht beteiligt im Einrichtungs-Zugang

| Dienst | Wofür sonst | Warum nicht beteiligt |
|---|---|---|
| Stripe (Stripe Payments Europe, Ltd., Irland / Stripe, Inc., USA) | Kartenzahlung, wenn Privatpersonen Guthaben kaufen | Die Stelle zahlt per Rechnung; im Code-Zugang ruft der Server Stripe nicht auf |
| Brevo (Sendinblue GmbH, Deutschland / Frankreich) | E-Mail mit dem Guthaben-Link nach einem Kauf, Warteliste | Im Code-Zugang wird keine E-Mail-Adresse verarbeitet |

Beide werden erst beteiligt, wenn jemand auf der Webseite selbst Guthaben kauft oder sich in die
Warteliste einträgt. Das gehört nicht zum Auftrag der Stelle.

---

## 4. Wo die Standardverträge von diesem AVV abweichen

Zu AVV § 10 Abs. 5. Webklar kann die Verträge von Cloudflare und Anthropic nicht verhandeln.

| Punkt | Dieser AVV (Webklar gegenüber dem Träger) | Cloudflare | Anthropic |
|---|---|---|---|
| Widerspruch gegen neue Unterauftragsverarbeiter | 14 Tage nach Mitteilung | 10 Tage, Mitteilung 30 Tage vorher | 15 Tage nach Mitteilung |
| Meldung von Verletzungen | spätestens 24 Stunden | unverzüglich | spätestens 48 Stunden |
| Kontrollen | auch vor Ort bzw. per Vorführung | vorrangig Prüfberichte | Prüfberichte; eigene Prüfung nach Absprache |
| Speicherung von Briefinhalt | keine | keine (Durchleitung); Übergabe verschlüsselt, höchstens 15 Min. | in der Regel 30 Tage, bis zu 2 Jahre |
| Berufsgeheimnis (§ 203 StGB) | ausdrückliche Verpflichtung | keine eigene, nur Vertraulichkeit nach DPA | keine eigene, nur Vertraulichkeit nach DPA |
| Rolle bei Turnstile | – | teilweise selbst Verantwortlicher | – |

Die Datenschutzbeauftragte des Trägers sollte diese Abweichungen bewerten (AVV § 8 Abs. 3,
§ 10 Abs. 5).
