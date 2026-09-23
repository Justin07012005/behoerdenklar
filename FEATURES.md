# BehördenKlar — Überblick für Claude

> Stand: 23.09.2026. Diese Datei beschreibt, **was es gibt**.
> Für Release-Stand und offene Aufgaben siehe die Projekt-Erinnerung.
> Für Arbeitsregeln siehe `AGENTS.md` (Expo-Docs vor Code lesen!).

## Worum es geht

BehördenKlar macht **schwierige Post verständlich**: Brief fotografieren →
Klartext in einfacher Sprache (Niveau A2/B1) → Frist erkennen → richtig reagieren.

Nicht nur Ämter, sondern auch **Versicherung, Vermieter, Bank, Inkasso**. Die
Positionierung wurde am 19.09. bewusst verbreitert — weg vom „Hartz-IV"-Bild,
aber ohne die Spezialisierung aufzugeben (das ist der einzige Vorteil gegenüber
DeepL/ChatGPT).

**Zielgruppe:** Menschen, denen Amtsdeutsch schwerfällt — Muttersprachler mit
Leseschwierigkeiten ebenso wie Zugewanderte. Seit der Verbreiterung auch
Selbständige.

**Betreiber:** Webklar GbR (Justin Klein, Kenso Grimm), Kleinunternehmer § 19 UStG
— **keine Umsatzsteuer ausweisen!**

---

## Die drei Teile

| Teil | Was | Wo |
|---|---|---|
| **App** | Vollprodukt, iOS zuerst | `src/`, Expo SDK 57 |
| **Webseite** | Landingpages, Demo, Ratgeber, Bezahlung | `webseite/` → Cloudflare Pages |
| **Worker** | Proxy zur KI, Bezahlung, Limits | `proxy/` → Cloudflare Workers |

Der Worker steht dazwischen, damit **kein API-Schlüssel je auf ein Gerät kommt**.

---

## App (`src/`)

### Bildschirme
| Datei | Zweck |
|---|---|
| `FristenScreen` | Start — Briefe nach **Dringlichkeit**, nicht nach Datum. Countdown-Karte für die nächste Frist |
| `ScanScreen` | Foto oder PDF aufnehmen, verkleinern, hochladen |
| `AnalyseScreen` | Ergebnis: Kernaussage, Erklärung, Ampel, To-do-Liste, Fachbegriffe |
| `AntwortScreen` | Antwort-Assistent in 3 Schritten, Ausgabe als PDF oder zum Teilen |
| `ArchivScreen` | Alle Briefe, verschlüsselt |
| `GlossarScreen` | Amts-Wörterbuch, funktioniert **offline** |
| `EinstellungenScreen` | App-Sperre, Auto-Löschen, Aktions-Code |
| `ConsentScreen` | Einwilligung vor dem ersten Scan (Art. 9 DSGVO) |

Navigation: untere Leiste **Fristen · Scannen (FAB) · Archiv**.

### Funktionen
- **Ampel:** rot ≤ 7 Tage, gelb ≤ 21, sonst grün (`utils/ampel.ts`)
- **27 Zielsprachen** (`types.ts` → `SPRACHEN`), nach Größe der Sprachgemeinschaft
  in Deutschland sortiert. Mit `rtl`-Flag für Arabisch, Farsi, Urdu, Paschtu —
  ohne das wurden diese Schriften falsch linksbündig dargestellt.
  **Der deutsche Fachbegriff bleibt deutsch**, nur seine Erklärung wird übersetzt
  (man muss ihn im Brief wiederfinden).
- **Verschlüsseltes Archiv:** AES-256-GCM, Schlüssel im SecureStore (`krypto.ts`)
- **App-Sperre:** Face ID / Geräte-Code, plus Sichtschutz im App-Umschalter
- **Auto-Löschen** nach 30 oder 90 Tagen (`aufbewahrung.ts`)
- **Kalender + Erinnerungen** für Fristen (`kalender.ts`, `erinnerungen.ts`)
- **Vorlesen** über die Gerätestimme — fehlt sie für eine Sprache, passiert nichts
  (abgefangen, kein Absturz)
- **3 Gratis-Analysen** (`GRATIS_ANALYSEN` in `storage.ts`), mit Aktions-Code
  `FRUEHSTART` sind es 5
- **Kein Konto, kein Login.** Bewusste Entscheidung.

### Modelle
| Zweck | Modell |
|---|---|
| Brief-Analyse (Vision) | `claude-sonnet-5` |
| Übersetzung, Antwort-Entwürfe | `claude-haiku-4-5` |

Getrennt, weil die Analyse Qualität braucht und der Rest nicht — spart etwa
60 % der Kosten pro Brief.

---

## Webseite (`webseite/`)

- **28 Sprachen** (Deutsch + 27). **Nicht von Hand pflegen** — siehe Generator unten.
- **`/demo`** — 2 Gratis-Analysen im Browser, ohne Konto. Mit **Sprachauswahl**:
  die Erklärung kommt in der gewählten Sprache.
- **Bezahlung** auf Startseite, Demo-Seite und **allen 27 Sprachseiten**
- **13 Ratgeber** unter `/ratgeber/` — Jobcenter, Finanzamt, Ausländerbehörde,
  Widerspruch, Nebenkosten, Versicherung, Inkasso, Bußgeld, Kündigung u. a.
  Jeder mit FAQ-Schema und Musterbrief.
- **4 Rechtsseiten:** AGB, Widerruf, Impressum, Datenschutz (alle `noindex`)
- **Warteliste** über Brevo (Double-Opt-in)

### Sprachseiten-Generator — WICHTIG
```bash
node tools/sprachseiten/build.js
```
Erzeugt **alle 27 Sprachseiten** aus `vorlage.html` + `texte.js`, pflegt hreflang
und Sprachwähler in der handgemachten `index.html` nach und schreibt die
`sitemap.xml`.

**Einzelne Sprachdateien niemals direkt bearbeiten** — sie werden überschrieben.
Änderungen gehören in `vorlage.html` (Aufbau) oder `texte.js` (Texte).

> Die Übersetzungen stammen von Claude. Bei Tigrinya, Somali, Paschtu und
> Kurdisch sollte vor größerer Werbung jemand mit Muttersprache gegenlesen.

---

## Worker (`proxy/src/index.ts`)

| Route | Zweck |
|---|---|
| `/` | App-Proxy zur Anthropic-API (Modell-Whitelist, Tageslimits) |
| `/demo` | Web-Demo — Turnstile, Gratis-Kontingent, **Zielsprache**, Guthaben |
| `/kaufen` | Stripe-Bezahlseite erzeugen |
| `/kauf-status` | Nach Rückkehr: Zahlung prüfen, Guthaben freischalten |
| `/stripe-webhook` | Sicherungsnetz + Wiederherstellungs-Mail |

### Bezahlung (LIVE, echtes Geld)
- **Guthaben statt Abo:** 5 Analysen 2,99 € · 15 Analysen 6,99 €
- **Ohne Konto:** Guthaben liegt server-seitig in KV (`wallet:<id>`), der Browser
  bekommt einen **signierten Nachweis** (HMAC). Die Zahl im Browser ist nur
  Anzeige — gerechnet wird auf dem Server.
- **Wiederherstellung** per E-Mail-Link (`?wallet=…`) — wirkt wie ein Gutscheincode
- **Pflicht-Häkchen** = Widerrufsverzicht nach § 356 Abs. 5 BGB
- **Kartenzahlung fest vorgegeben** (`payment_method_types[0]=card`). Schaltet
  Stripe Link ab — das zeigte eine englische Ansicht mit winzigem
  „Pay without Link", eine Sackgasse für die Zielgruppe.
  ⚠️ Solange das gesetzt ist, erscheinen **keine** weiteren Methoden. Wer PayPal
  will: erst im Dashboard freischalten, **dann** hier ergänzen — sonst scheitert
  der Kauf komplett.
- **Bezahlseite in der Nutzersprache** über `locale`. Nur Sprachen aus
  `STRIPE_SPRACHEN` werden geschickt; ein unbekannter Wert lässt Stripe die
  Session mit 400 ablehnen.

### Schutz vor Missbrauch
| Schutz | Wert |
|---|---|
| Turnstile | Sitekey `0x4AAAAAAESi2p41B915R4hW` (an die Domain gebunden!) |
| App: pro Gerät / pro IP | 20 / 100 pro Tag |
| Demo: Gesamtbudget / pro IP | 100 / 8 pro Tag |
| Origin-Prüfung | nur `behoerdenklar.de` darf kaufen |

### Secrets (`npx wrangler secret put …`)
`ANTHROPIC_API_KEY` · `STRIPE_SECRET_KEY` (`rk_live_`, eingeschränkt) ·
`STRIPE_WEBHOOK_SECRET` · `TOKEN_SIGNING_SECRET` · `TURNSTILE_SECRET_KEY` ·
`BREVO_API_KEY`

**Niemals in den Chat oder in Dateien.** Ist zweimal passiert, beide Male musste
rotiert werden.

---

## Befehle

```bash
npm run pruefung    # Gesundheits-Check — nach JEDEM Deploy
npm test            # 35 Tests
npx tsc --noEmit    # Typen
node tools/sprachseiten/build.js   # Sprachseiten neu bauen
```

**Deploy:**
```bash
cd proxy && npx wrangler deploy                                              # Worker
cd proxy && npx wrangler pages deploy ../webseite --project-name behoerdenklar --commit-dirty=true   # Webseite
```

**Committen ist nicht veröffentlichen** — nur Deployen macht live. Das wurde
schon einmal verwechselt, die Google-Verifizierung lag wochenlang nur im Git.

**Nach jedem Commit auf beide Remotes pushen:**
`git push origin main && git push gitea main`

### `npm run pruefung`
Prüft in ~30 Sekunden zehn Bereiche — jeder war schon einmal **still** kaputt:
abgeschnittene Zeilen `[...]`, Warteliste-Formular, JSON-LD, tote Dateiverweise,
Preis-IDs, Sitemap-Adressen, Kauf, Webhook-Secret, KI-Schlüssel, Turnstile.

Hintergrund: Das Warteliste-Formular war **sechs Wochen** kaputt, ohne dass
etwas Alarm geschlagen hätte.

---

## Fallen, die schon zugeschnappt sind

- **Ein Werkzeug kürzte Zeilen auf 200 Zeichen** und hängte `[...]` an. Traf die
  Brevo-Formular-Adresse → Anmeldungen gingen ins Leere. `npm run pruefung`
  findet das.
- **Turnstile ist an die Domain gebunden.** Nach dem Domain-Umzug blockierte das
  alte Widget die Demo.
- **Der Anthropic-Schlüssel wurde zweimal ohne Zutun ungültig.** Die App war
  tagelang kaputt, bevor es auffiel.
- **Die Web-Demo konnte lange nur Deutsch** — während 27 Sprachseiten
  Übersetzung versprachen. Immer prüfen, ob das Produkt hält, was die Seite sagt.
- **expo-image-picker meldet standardmäßig `RECORD_AUDIO` an.** Abgeschaltet über
  `microphonePermission: false`; die App nimmt nur Fotos auf.

---

## Rechtliches

AGB, Widerrufsbelehrung, Datenschutz und Impressum sind **live** und auf Webklar
GbR ausgestellt. Sie sind **Entwürfe von Claude** — eine anwaltliche oder
IHK-Prüfung steht aus.

**Kleinunternehmer § 19 UStG:** nirgends „inkl. USt." schreiben. Die Steuernummer
gehört nicht ins öffentliche Impressum.

Der Wiederherstellungs-Link wirkt wie ein Gutscheincode — wer ihn hat, nutzt das
Guthaben. Steht so in den AGB.

**Keine Rechtsberatung.** Steht in jedem Ratgeber, in der App und in den AGB —
das muss so bleiben.
