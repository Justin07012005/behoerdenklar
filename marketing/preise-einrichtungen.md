# Preise für Beratungsstellen

> Stand 25.10.2026. Ergebnis der Preis-Prüfung (Kosten, Beschaffung, Vergleichspreise,
> 3 Modelle, bewertet aus Sicht von Träger und Gründer, Faktencheck).
> **Entscheidung von Justin (25.10.):** Am 29.10. nennt er auf Nachfrage **290 € im Jahr**.
> Ersetzt die alte Tabelle in `outreach-september.md` (100 Briefe 20 €, 500 Briefe 75 €).
> Alle Beträge sind Endpreise. Nach § 19 UStG wird keine Umsatzsteuer berechnet.

## Preisliste (Vorschlag)

| Paket | Preis pro Kalenderjahr | Briefe | pro Brief bei voller Nutzung |
|---|---|---|---|
| Test | 0 € | bis 100, 1 Monat | – |
| Klein (ca. 1 Beratende) | 190 € | 600 | ca. 32 ct |
| **Standard (2–5 Beratende)** | **290 €** | **1.200** | ca. 24 ct |
| Groß (6+ oder mehrere Standorte) | 450 € | 2.400 | ca. 19 ct |
| Träger ab 3 Stellen (FID schon ab der 2.) | 160 / 260 / 420 € | wie oben | – |
| Verband oder Land, ab 20 Stellen | 130 / 230 / 390 € | wie oben | – |
| Privatleute (unverändert) | 2,99 € / 6,99 € | 5 / 15 | 60 / 47 ct |

- Ein Code für das ganze Team, eine Rechnung im Januar, Überweisung in 30 Tagen.
- Kein Abo. Endet am 31.12. von selbst, Restbriefe verfallen dann.
- Nie „unbegrenzt“, immer eine feste Briefzahl.
- Untergrenze beim Verhandeln: **15 ct pro Brief** bei voller Nutzung (alt: 10 ct).

## Was am Do 29.10. gesagt wird (nur auf Nachfrage)

> „Über Ihren Code zahlen Ihre Ratsuchenden auch danach nichts. Für eine Stelle Ihrer Größe
> sind es voraussichtlich 290 Euro im Jahr für bis zu 1.200 Briefe. Endpreis, eine Rechnung im
> Januar, endet am 31. Dezember von selbst. Das ist ein Richtpreis, das genaue Angebot bringe
> ich am 26. November mit.“

Nicht nennen: den Pilotpreis von 190 €, „24 € im Monat“, Cent pro Brief, die alten Pakete.

## Angebot für die MBE Donnersberg am 26.11. (Vorschlag)

1. **Brücke, 0 €:** Bei einer Zusage den Code am selben Tag bis 31.12.2026 verlängern, bei Bedarf
   100 Briefe aufladen. Läuft die Bestellung im Januar noch, bis 31.01.2027.
   `node tools/einrichtungs-code.js verlaengern <CODE> 2026-12-31`
2. **Pilotjahr 2027, 190 €:** Standard-Paket (1.200 Briefe) zum Klein-Preis, offen als Rabatt auf
   den Listenpreis. Gilt für jede Stelle, die 2027 nach einem Test startet.
3. **Preisobergrenze 2028 und 2029:** höchstens 290 € im Jahr, Endpreis, auch falls Webklar
   umsatzsteuerpflichtig wird. Die MBE-Förderrichtlinie gilt bis 31.12.2029, bewilligt wird
   aber jedes Jahr einzeln.
4. **Gegenleistung:** Rückmeldung nach 3 und nach 12 Monaten. Als Referenz nur mit Zustimmung.
   Rabatte gehen an die Einrichtung, nie an Personen.

## Was übrig bleibt (Schätzung, nicht gemessen)

Ein zweisprachiger Brief kostet an KI ca. 3,8 ct, mit Puffer 4,6 ct, ungünstig 10,8 ct,
mehrseitiges PDF ca. 13 ct (Sonnet 5: 2 $/10 $, Haiku 4.5: 1 $/5 $ je Mio. Tokens).
Stripe entfällt (Überweisung), Cloudflare wahrscheinlich 0 €.

| Standard, 290 € | KI-Kosten | Bleibt übrig (vor Steuern) |
|---|---|---|
| halbe Nutzung (600 Briefe) | ca. 28 € | ca. 262 € |
| volle Nutzung, normal | ca. 55 € | ca. 235 € |
| volle Nutzung, ungünstig | ca. 130 € | ca. 160 € |
| Pilot 190 €, voll, ungünstig | ca. 130 € | ca. 60 € |

Arbeit pro Stelle: ca. 4 Std. im 1. Jahr, ca. 2 Std. danach.

## Vor dem Angebot am 26.11. erledigen

- [ ] Echte Kosten messen (`usage` im Worker mitschreiben oder Anthropic-Konsole / Zahl der Analysen).
      Liegen sie deutlich über 5 ct pro Brief: Pilotpreis neu prüfen.
- [ ] PDF-Seitenlimit einbauen (heute nur Dateigröße, proxy/src/index.ts).
- [ ] Angebotsvorlage (1 Seite) und Rechnungsvorlage nach § 34a UStDV, mit „MBE 2027“ und Leistungszeitraum.
- [ ] Bedingungen für Einrichtungen (die AGB gelten heute nur für Verbraucher).
- [ ] AVV, TOMs, Unterauftragsverarbeiter, Angaben für eine Folgenabschätzung: ohne die kauft kein Träger.
- [ ] Steuerberater: Umsatz der ganzen Webklar GbR gegen die 25.000-€-Grenze (§ 19 UStG), § 13b für Anthropic.
- [ ] Code-Werkzeug: Befehl `setzen` für den Jahreswechsel. Heute zählt `aufladen` zum Rest dazu.
- [ ] Monatlich `stand <CODE>` prüfen und vor 0 aufladen. Eine automatische 80-%-Warnung gibt es noch nicht.

## Gut zu wissen

- 2027 kommt das Geld voraussichtlich aus der Sachkostenpauschale oder aus Eigenmitteln. Den Antrag
  für 2027 reicht die Zentralstelle schon bis 15.11.2026 ein. Ab 2028 kann der Träger BehördenKlar
  als IT-Dienstleistung beantragen (Förderrichtlinie 2027, Ziff. 5.3.1 d, Antrag bis 15.11.2027).
- Konkurrenz: DokLotse Organisation S 348 € im Jahr (30 Analysen im Monat, 4 Sprachen).
  KlarBrief bietet Behörden und Beratungsstellen kostenlose Piloten an, Preis auf Anfrage.
- Echte Behörden (Jobcenter, Ausländerbehörde) sind ein eigener Markt mit eigener Beschaffung und
  bekommen später eine eigene, eher höhere Preisliste.
- Keine Rechts- oder Steuerberatung. Rechtsfragen beantwortet der Träger bzw. ein Steuerberater.
