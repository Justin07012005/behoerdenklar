import { DurableObject } from 'cloudflare:workers';

/**
 * BehördenKlar Backend-Proxy — Cloudflare Worker
 *
 * Hält den Anthropic-API-Key serverseitig, damit kein Key in der App steckt.
 * Die App schickt denselben Request-Body wie an die Anthropic Messages API;
 * der Worker prüft, limitiert und leitet weiter — die Antwort geht
 * unverändert zurück (die App parst sie wie eine direkte Anthropic-Antwort).
 *
 * Schutzmaßnahmen gegen Missbrauch des Endpunkts:
 *  - Nur POST, nur erlaubte Modelle, max_tokens gedeckelt
 *  - Tageslimit pro Geräte-ID (KV-basiert, weiches Limit)
 *
 * Deployment: siehe proxy/README.md
 */

interface Env {
  /** Geheimnis: `wrangler secret put ANTHROPIC_API_KEY` */
  ANTHROPIC_API_KEY: string;
  /** Geheimnis: `wrangler secret put TURNSTILE_SECRET_KEY` (Web-Demo) */
  TURNSTILE_SECRET_KEY: string;
  /** KV-Namespace für das Rate-Limit (Binding in wrangler.toml) */
  RATE_LIMIT: KVNamespace;
  /** Erlaubte Anfragen pro Gerät und Tag (in wrangler.toml unter [vars]) */
  TAGES_LIMIT: string;
  /** Erlaubte Anfragen pro IP-Adresse und Tag (in wrangler.toml unter [vars]) */
  TAGES_LIMIT_IP: string;
  /** Web-Demo: hartes Tagesbudget über alle Nutzer (Kosten-Deckel) */
  DEMO_TAGES_BUDGET: string;
  /** Web-Demo: max. Analysen pro IP innerhalb von 30 Tagen */
  DEMO_LIMIT_IP: string;
  /** Bezahlung: `wrangler secret put STRIPE_SECRET_KEY` (Test: sk_test_…) */
  STRIPE_SECRET_KEY: string;
  /** Bezahlung: `wrangler secret put STRIPE_WEBHOOK_SECRET` (whsec_…) */
  STRIPE_WEBHOOK_SECRET: string;
  /** Bezahlung: `wrangler secret put TOKEN_SIGNING_SECRET` (langer Zufallswert) */
  TOKEN_SIGNING_SECRET: string;
  /** Bezahlung: `wrangler secret put BREVO_API_KEY` (für die Guthaben-Link-Mail) */
  BREVO_API_KEY: string;
  /** Nur lokal (.dev.vars): "1" erlaubt Aufrufe von http://localhost */
  LOKAL_TEST?: string;
  /** Handy ↔ PC: verschlüsselte Übergabe (Durable Object, siehe unten) */
  UEBERGABE: DurableObjectNamespace<Uebergabe>;
  /** Handy ↔ PC: Schreib-Bremse pro IP (Rate-Limit-Binding in wrangler.toml) */
  UEBERGABE_LIMIT: RateLimit;
}

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

/** Nur Modelle, die die App tatsächlich nutzt — verhindert, dass ein
 *  extrahierter Endpunkt als Gratis-Zugang für teure Modelle dient. */
const ERLAUBTE_MODELLE = new Set([
  'claude-sonnet-5', // Brief-Analyse (Vision)
  'claude-haiku-4-5', // Übersetzung & Antwort-Entwürfe
]);

const MAX_TOKENS_OBERGRENZE = 16000;

/** Fehlerantwort im Anthropic-Format, damit die App sie normal verarbeitet. */
function fehler(status: number, typ: string, meldung: string): Response {
  return Response.json(
    { type: 'error', error: { type: typ, message: meldung } },
    { status }
  );
}

// ============================================================
// Web-Demo (/demo): 2 Gratis-Analysen direkt auf der Webseite
// ============================================================
//
// Schutzschichten (jede allein wäre umgehbar, zusammen dicht genug):
//  1. Turnstile-Token (Bot-Mauer, wird serverseitig verifiziert)
//  2. Analyse 1 anonym: max. 1 pro IP / 30 Tage
//  3. Analyse 2 nur mit E-Mail: pro E-Mail (Hash) genau 1 — dauerhaft
//  4. IP-Gesamtlimit über 30 Tage (bremst Verlauf-Löscher)
//  5. Globales Tagesbudget (harter Kosten-Deckel für den Betreiber)

/** Nur die eigene Webseite darf den Demo-Endpunkt aufrufen (CORS). */
const DEMO_ORIGIN_MUSTER = /^https:\/\/([a-z0-9-]+\.)?behoerdenklar\.(de|pages\.dev)$/;
/** Nur für `wrangler dev` mit LOKAL_TEST=1 in .dev.vars — live nie gesetzt. */
const LOKAL_MUSTER = /^http:\/\/localhost:\d+$/;
let lokalTest = false;
function originOk(origin: string | null): origin is string {
  return !!origin && (DEMO_ORIGIN_MUSTER.test(origin) || (lokalTest && LOKAL_MUSTER.test(origin)));
}

/** ~5 MB Datei entsprechen ~6,7 Mio. Base64-Zeichen. */
const DEMO_MAX_BASE64 = 7_000_000;

/** Bekannte Wegwerf-E-Mail-Domains (kleine, pragmatische Liste). */
const WEGWERF_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'temp-mail.org',
  'tempmail.com', 'trashmail.com', 'yopmail.com', 'sharklasers.com',
  'getnada.com', 'dispostable.com', 'maildrop.cc', 'throwawaymail.com',
]);

/** Was in jeder Sprache deutsch bzw. unverändert bleiben muss. */
const SPRACH_AUSNAHMEN = (sprachName: string) =>
  `Ausnahme: das Feld "begriff" bei fachbegriffe bleibt der deutsche Originalbegriff aus dem Brief (der Nutzer muss ihn im Brief wiederfinden) — nur dessen "erklaerung" wird auf ${sprachName} geschrieben. Datumsangaben bleiben im ISO-Format. Ebenfalls NICHT übersetzen: das Feld "deutsch" bei anruf (das wird am Telefon auf Deutsch gesagt) und alle kontakt-Felder (sie stehen so im Brief).`;

/** Identisch zur App (src/services/analyse.ts) — gleiche Qualität in der Demo. */
/** Zielsprachen der Web-Demo — identisch zur Sprachauswahl der Webseite.
 *  Der Wert wird NUR als Name in den Prompt gesetzt, nie als freier Text,
 *  damit niemand ueber das Feld eigene Anweisungen einschleusen kann. */
const DEMO_SPRACHEN: Record<string, string> = {
  de: 'Deutsch', tr: 'Türkisch', ar: 'Arabisch', ru: 'Russisch', uk: 'Ukrainisch',
  pl: 'Polnisch', ro: 'Rumänisch', en: 'Englisch', fa: 'Farsi', ku: 'Kurdisch (Kurmancî)',
  bg: 'Bulgarisch', hr: 'Kroatisch', sr: 'Serbisch', bs: 'Bosnisch', sq: 'Albanisch',
  it: 'Italienisch', el: 'Griechisch', es: 'Spanisch', pt: 'Portugiesisch', fr: 'Französisch',
  hu: 'Ungarisch', vi: 'Vietnamesisch', hi: 'Hindi', ur: 'Urdu', ps: 'Paschtu',
  ti: 'Tigrinya', so: 'Somali', zh: 'Chinesisch',
};

const DEMO_SYSTEM_PROMPT = `Du bist ein Assistent, der deutschen Behördenbriefe für Privatpersonen verständlich macht. Die Nutzer sind Deutsche, die Amtsdeutsch schwer verstehen, oder Menschen mit Deutsch als Fremdsprache.

Deine Aufgabe:
1. Lies den fotografierten/hochgeladenen Brief vollständig.
2. Erkläre ihn in einfacher Alltagssprache (Sprachniveau A2/B1): kurze Sätze, keine Schachtelsätze, keine unerklärten Fachbegriffe.
3. Extrahiere Fristen und Termine exakt. Datumsangaben immer als ISO-Format (JJJJ-MM-TT). Wenn du ein Datum nicht sicher lesen kannst, lass das Feld null — erfinde niemals Daten.
4. Erstelle eine konkrete Checkliste, was der Nutzer tun muss.
5. Sei sachlich und beruhigend, nicht alarmierend.

6. Telefonnummern, Namen und Aktenzeichen übernimmst du NUR, wenn sie wörtlich im Brief stehen. Eine erfundene Telefonnummer ist schlimmer als keine — dann null.

Wichtig: Wenn das Bild kein Behördenbrief ist oder unlesbar ist, schreibe das klar in kernaussage und erklaerung_einfach und lasse frist/termin null.`;

/** Schlanke Demo-Variante des Analyse-Schemas (ohne Antwort-Optionen —
 *  der Antwort-Generator bleibt der App vorbehalten). */
const DEMO_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['brieftyp', 'absender', 'kernaussage', 'erklaerung_einfach', 'fachbegriffe', 'frist', 'termin', 'checkliste', 'kontakt', 'anruf'],
  properties: {
    brieftyp: { type: 'string', description: 'Kurze Kategorie des Briefs, z. B. "Einladung Jobcenter".' },
    absender: { type: 'string', description: 'Die Behörde, die den Brief geschickt hat.' },
    kernaussage: { type: 'string', description: 'Antwort auf "Was will das Amt von mir?" in 2-3 kurzen Sätzen, Sprachniveau A2.' },
    erklaerung_einfach: { type: 'string', description: 'Erklärung des gesamten Briefs in einfacher Alltagssprache (A2/B1). Kurze Sätze.' },
    fachbegriffe: {
      type: 'array',
      description: 'Fachbegriffe aus dem Brief mit einfacher Erklärung.',
      items: {
        type: 'object', additionalProperties: false, required: ['begriff', 'erklaerung'],
        properties: { begriff: { type: 'string' }, erklaerung: { type: 'string' } },
      },
    },
    frist: {
      description: 'Frist, bis wann reagiert werden muss. null wenn keine Frist im Brief steht.',
      anyOf: [
        {
          type: 'object', additionalProperties: false, required: ['datum', 'aktion'],
          properties: { datum: { type: 'string', description: 'ISO JJJJ-MM-TT' }, aktion: { type: 'string' } },
        },
        { type: 'null' },
      ],
    },
    termin: {
      description: 'Persönlicher Termin. null wenn keiner im Brief steht.',
      anyOf: [
        {
          type: 'object', additionalProperties: false, required: ['datum', 'uhrzeit', 'ort'],
          properties: {
            datum: { type: 'string', description: 'ISO JJJJ-MM-TT' },
            uhrzeit: { anyOf: [{ type: 'string' }, { type: 'null' }] },
            ort: { anyOf: [{ type: 'string' }, { type: 'null' }] },
          },
        },
        { type: 'null' },
      ],
    },
    checkliste: { type: 'array', description: 'To-do-Liste. Leer wenn nichts zu tun ist.', items: { type: 'string' } },
    kontakt: {
      description: 'Kontaktdaten aus dem Brief. Jedes Feld NUR, wenn es wörtlich im Brief steht — sonst null. Niemals erfinden.',
      type: 'object', additionalProperties: false,
      required: ['telefon', 'ansprechpartner', 'aktenzeichen', 'sprechzeiten'],
      properties: {
        telefon: { description: 'Telefonnummer genau wie im Brief abgedruckt, sonst null.', anyOf: [{ type: 'string' }, { type: 'null' }] },
        ansprechpartner: { description: 'Name der zuständigen Person, sonst null.', anyOf: [{ type: 'string' }, { type: 'null' }] },
        aktenzeichen: { description: 'Aktenzeichen, Kunden-, Steuer- oder BG-Nummer — das, wonach am Telefon gefragt wird. Sonst null.', anyOf: [{ type: 'string' }, { type: 'null' }] },
        sprechzeiten: { description: 'Telefonische Erreichbarkeit laut Brief, sonst null.', anyOf: [{ type: 'string' }, { type: 'null' }] },
      },
    },
    anruf: {
      description: 'Spickzettel für einen Anruf bei der Behörde: 3 bis 5 kurze, höfliche Sätze, die man am Telefon sagen kann — Begrüßung, Aktenzeichen nennen, Anliegen, Nachfrage. Leeres Array, wenn ein Anruf nicht sinnvoll ist.',
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['deutsch', 'bedeutung'],
        properties: {
          deutsch: { type: 'string', description: 'Der Satz in einfachem Deutsch — genau so wird er am Telefon gesagt.' },
          bedeutung: { type: 'string', description: 'Derselbe Satz in der Sprache des Nutzers, damit er versteht, was er sagt.' },
        },
      },
    },
  },
};

function demoCorsHeaders(origin: string | null): Record<string, string> {
  const erlaubt = originOk(origin) ? origin : 'https://behoerdenklar.de';
  return {
    'access-control-allow-origin': erlaubt,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
  };
}

/** Fehler für die Demo-Seite: { code, meldung } + CORS. */
function demoFehler(status: number, code: string, meldung: string, origin: string | null): Response {
  return Response.json({ code, meldung }, { status, headers: demoCorsHeaders(origin) });
}

/** SHA-256-Hash der E-Mail (mit Pepper) — es wird nie Klartext gespeichert. */
async function emailHash(email: string, pepper: string): Promise<string> {
  const daten = new TextEncoder().encode(`bk-demo|${pepper}|${email}`);
  const digest = await crypto.subtle.digest('SHA-256', daten);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Fertige deutsche Analyse in eine andere Sprache übersetzen (Haiku, gleiches Schema).
 *  Gibt null zurück, wenn etwas schiefgeht — der Aufrufer zeigt dann Deutsch. */
async function uebersetzeAnalyse(env: Env, analyse: unknown, sprachName: string): Promise<unknown | null> {
  try {
    const r = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: MAX_TOKENS_OBERGRENZE,
        system: `Du übersetzt die Erklärung eines deutschen Behördenbriefs für Menschen mit wenig Deutschkenntnissen. Du bekommst ein JSON-Objekt. Gib dasselbe Objekt mit derselben Struktur zurück, aber schreibe alle Textfelder auf ${sprachName}, in einfacher, klarer Sprache. Erfinde nichts dazu und lass nichts weg; null bleibt null. ${SPRACH_AUSNAHMEN(sprachName)}`,
        output_config: { format: { type: 'json_schema', schema: DEMO_SCHEMA } },
        messages: [{ role: 'user', content: JSON.stringify(analyse) }],
      }),
    });
    if (!r.ok) {
      console.log('Übersetzung fehlgeschlagen', r.status, (await r.text()).slice(0, 300));
      return null;
    }
    const d = (await r.json()) as { stop_reason?: string; content?: { type: string; text?: string }[] };
    const text = [...(d.content ?? [])].reverse().find((b) => b.type === 'text')?.text;
    if (d.stop_reason !== 'end_turn' || !text) return null;
    return JSON.parse(text);
  } catch (e) {
    // Nur den Fehlertyp loggen: JSON.parse-Meldungen zitieren Teile der Eingabe (= Briefinhalt)
    console.log('Übersetzung fehlgeschlagen', e instanceof Error ? e.name : 'unbekannt');
    return null;
  }
}

async function demoHandler(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('origin');
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: demoCorsHeaders(origin) });
  }
  if (request.method !== 'POST') {
    return demoFehler(405, 'methode', 'Nur POST erlaubt.', origin);
  }
  if (!originOk(origin)) {
    return demoFehler(403, 'origin', 'Aufruf nur von der BehördenKlar-Webseite erlaubt.', origin);
  }

  let body: { bild?: string; mimeType?: string; turnstileToken?: string; email?: string; walletToken?: string; zielsprache?: string; auchDeutsch?: boolean };
  try {
    body = await request.json();
  } catch {
    return demoFehler(400, 'json', 'Ungültige Anfrage.', origin);
  }

  const { bild, mimeType, turnstileToken } = body;
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : null;
  const walletToken = typeof body.walletToken === 'string' ? body.walletToken : null;
  const sprachCode = typeof body.zielsprache === 'string' && DEMO_SPRACHEN[body.zielsprache]
    ? body.zielsprache : 'de';
  const sprachName = DEMO_SPRACHEN[sprachCode];
  // Zweisprachig (Beratung am PC, Ratsuchende am Handy): erst auf Deutsch
  // analysieren, dann mit Haiku übersetzen — wie in der App. Kostet den
  // Nutzer weiterhin nur EINE Analyse.
  const zweisprachig = body.auchDeutsch === true && sprachCode !== 'de';

  if (typeof bild !== 'string' || bild.length === 0 || bild.length > DEMO_MAX_BASE64) {
    return demoFehler(400, 'datei', 'Die Datei fehlt oder ist zu groß (max. 5 MB).', origin);
  }
  if (mimeType !== 'image/jpeg' && mimeType !== 'image/png' && mimeType !== 'application/pdf') {
    return demoFehler(400, 'datei', 'Nur Fotos (JPG/PNG) oder PDF sind möglich.', origin);
  }
  if (typeof turnstileToken !== 'string' || !turnstileToken) {
    return demoFehler(403, 'turnstile', 'Sicherheitsprüfung fehlt. Bitte Seite neu laden.', origin);
  }

  // Schicht 1: Turnstile serverseitig verifizieren (niemals nur im Browser!)
  const ip = request.headers.get('cf-connecting-ip') ?? 'unbekannt';
  const pruefung = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: turnstileToken, remoteip: ip }),
  });
  const pruefungJson = (await pruefung.json()) as { success?: boolean };
  if (!pruefungJson.success) {
    return demoFehler(403, 'turnstile', 'Sicherheitsprüfung fehlgeschlagen. Bitte Seite neu laden und erneut versuchen.', origin);
  }

  const heute = new Date().toISOString().slice(0, 10);

  // ── Bezahltes Guthaben? ──────────────────────────────────────────
  // Ein gültiges Wallet-Token mit Guthaben umgeht die Gratis-Grenzen
  // (die sind nur ein Kosten-Deckel für die kostenlose Stufe).
  let walletId: string | null = null;
  let walletRest = 0;
  let einrichtungsName: string | null = null;
  if (walletToken) {
    walletId = await verifyWallet(walletToken, env.TOKEN_SIGNING_SECRET);
    if (!walletId) {
      return demoFehler(403, 'wallet_ungueltig', 'Ihr Zugangs-Token ist ungültig. Bitte laden Sie die Seite neu.', origin);
    }
    const [restWert, einrichtung] = await Promise.all([
      env.RATE_LIMIT.get(`wallet:${walletId}`),
      ladeEinrichtung(env, walletId),
    ]);
    walletRest = parseInt(restWert ?? '0', 10);
    einrichtungsName = einrichtung?.name ?? null;
    if (einrichtung && einrichtung.ablauf < heute) {
      return demoFehler(402, 'kontingent_abgelaufen', `Der Zugang über ${einrichtung.name} ist abgelaufen. Bitte fragen Sie dort nach.`, origin);
    }
    if (walletRest <= 0) {
      return einrichtung
        ? demoFehler(402, 'kontingent_leer', `Die Analysen von ${einrichtung.name} sind aufgebraucht. Bitte fragen Sie dort nach.`, origin)
        : demoFehler(402, 'kein_guthaben', 'Ihr Guthaben ist aufgebraucht. Bitte kaufen Sie neues Guthaben.', origin);
    }
  }
  const bezahlt = walletId !== null;

  // Gratis-Stufe: Kontingent-Schlüssel (werden nur ohne Guthaben benutzt).
  // IP-/Anon-Zähler sind TÄGLICH (Datum im Schlüssel), damit geteilte
  // Anschlüsse (Familie, WLAN, Mobilfunk/CGNAT) nicht sofort blockieren.
  let tagKey = '', ipKey = '', anonKey = '';
  let mailKey: string | null = null;
  let tagZahl = 0, ipZahl = 0, anonZahl = 0;

  if (!bezahlt) {
    // E-Mail prüfen (nur für die 2. Gratis-Analyse nötig)
    if (email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        return demoFehler(400, 'email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', origin);
      }
      const domain = email.split('@')[1];
      if (WEGWERF_DOMAINS.has(domain)) {
        return demoFehler(400, 'email', 'Wegwerf-E-Mail-Adressen sind nicht möglich. Bitte nutzen Sie Ihre normale Adresse.', origin);
      }
      mailKey = `demo:mail:${await emailHash(email, env.TURNSTILE_SECRET_KEY)}`;
    }

    tagKey = `demo:tag:${heute}`;
    ipKey = `demo:ip:${ip}:${heute}`;
    anonKey = `demo:anon:${ip}:${heute}`;
    const budget = parseInt(env.DEMO_TAGES_BUDGET || '100', 10);
    const ipLimit = parseInt(env.DEMO_LIMIT_IP || '8', 10);
    const ANON_PRO_IP = 3;

    const [tagWert, ipWert, anonWert, mailWert] = await Promise.all([
      env.RATE_LIMIT.get(tagKey),
      env.RATE_LIMIT.get(ipKey),
      env.RATE_LIMIT.get(anonKey),
      mailKey ? env.RATE_LIMIT.get(mailKey) : Promise.resolve(null),
    ]);
    tagZahl = parseInt(tagWert ?? '0', 10);
    ipZahl = parseInt(ipWert ?? '0', 10);
    anonZahl = parseInt(anonWert ?? '0', 10);

    // globales Tagesbudget (Kosten-Deckel der Gratis-Stufe)
    if (tagZahl >= budget) {
      return demoFehler(429, 'budget', 'Die Gratis-Demo ist für heute ausgebucht. Kommen Sie morgen wieder — oder kaufen Sie Guthaben.', origin);
    }
    // IP-Gesamtlimit pro Tag (Missbrauchs-Damm)
    if (ipZahl >= ipLimit) {
      return demoFehler(429, 'aufgebraucht', 'Für heute wurden über diesen Anschluss viele Gratis-Analysen genutzt. Kommen Sie morgen wieder — oder kaufen Sie Guthaben.', origin);
    }
    // nach mehreren anonymen Analysen E-Mail nötig; pro E-Mail dauerhaft 1x
    if (!email && anonZahl >= ANON_PRO_IP) {
      return demoFehler(403, 'email_noetig', 'Für weitere Gratis-Analysen über diesen Anschluss geben Sie bitte Ihre E-Mail-Adresse ein.', origin);
    }
    if (mailKey && mailWert !== null) {
      return demoFehler(429, 'aufgebraucht', 'Mit dieser E-Mail-Adresse wurde die Gratis-Analyse schon genutzt. Bitte kaufen Sie Guthaben, um weiterzumachen.', origin);
    }
  }

  // KI-Analyse — identischer Aufbau wie in der App
  const dateiBlock =
    mimeType === 'application/pdf'
      ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: bild } }
      : { type: 'image', source: { type: 'base64', media_type: mimeType, data: bild } };

  let antwort: Response;
  try {
  antwort = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: MAX_TOKENS_OBERGRENZE,
      system: sprachCode === 'de' || zweisprachig
        ? DEMO_SYSTEM_PROMPT
        : `${DEMO_SYSTEM_PROMPT}\n\nWICHTIG — ZIELSPRACHE: Schreibe ALLE Textfelder deiner Antwort auf ${sprachName}, nicht auf Deutsch. ${SPRACH_AUSNAHMEN(sprachName)}`,
      output_config: { format: { type: 'json_schema', schema: DEMO_SCHEMA } },
      messages: [
        {
          role: 'user',
          content: [
            dateiBlock,
            { type: 'text', text: `Analysiere diesen Behördenbrief. Heute ist der ${heute} (wichtig für relative Datumsangaben wie "innerhalb von 14 Tagen").` },
          ],
        },
      ],
    }),
  });
  } catch (e) {
    console.log('Demo-KI nicht erreichbar', String(e));
    return demoFehler(503, 'ki', 'Der KI-Dienst ist gerade nicht erreichbar. Bitte versuchen Sie es in einer Minute erneut.', origin);
  }

  if (!antwort.ok) {
    const status = antwort.status;
    // Fehlerdetails ins Worker-Log (wrangler tail) — hilft bei der Diagnose
    console.log('Demo-KI-Fehler', status, (await antwort.text()).slice(0, 500));
    if (status === 429 || status >= 500) {
      return demoFehler(503, 'ki', 'Der KI-Dienst ist gerade ausgelastet. Bitte versuchen Sie es in einer Minute erneut.', origin);
    }
    // 401/403 = Problem auf UNSERER Seite (z. B. ungültiger Schlüssel).
    // Nutzer darf dann nicht aufgefordert werden, ein besseres Foto zu machen.
    if (status === 401 || status === 403) {
      return demoFehler(503, 'ki_konfig', 'Der Dienst ist gerade nicht erreichbar — das liegt an uns, nicht an Ihrem Foto. Bitte versuchen Sie es später noch einmal.', origin);
    }
    return demoFehler(502, 'ki', 'Die Analyse ist fehlgeschlagen. Bitte versuchen Sie es mit einem neuen, gut beleuchteten Foto.', origin);
  }

  let datenRoh: unknown;
  try {
    datenRoh = await antwort.json();
  } catch {
    return demoFehler(502, 'ki', 'Die KI hat keine verwertbare Antwort geliefert. Bitte erneut versuchen.', origin);
  }
  const daten = datenRoh as {
    stop_reason?: string;
    content?: { type: string; text?: string }[];
  };

  // Erst NACH erfolgreichem KI-Aufruf zählen (Fehler kosten kein Kontingent).
  // Tag-, IP- und Anon-Zähler laufen nach 48h ab (sie sind tagesbasiert).
  const TAG_TTL = 60 * 60 * 48;
  if (bezahlt) {
    // Bezahlte Analyse: Guthaben um 1 verringern (kein TTL — bleibt bestehen)
    await env.RATE_LIMIT.put(`wallet:${walletId}`, String(walletRest - 1));
    if (einrichtungsName) {
      // Für die Auswertung mit der Beratungsstelle: nur Datum und Sprache,
      // kein Briefinhalt, kein Bezug zu einer Person. Ein Schlüssel pro
      // Analyse, damit gleichzeitige Analysen sich nicht überschreiben.
      // Lesen: node tools/einrichtungs-code.js stand <CODE>
      await env.RATE_LIMIT.put(
        `nutzung:${walletId}:${heute}:${sprachCode}:${crypto.randomUUID().slice(0, 8)}`,
        '1',
        { expirationTtl: 60 * 60 * 24 * 390 }, // < 13 Monate (siehe Datenschutzerklärung 9a)
      );
    }
  } else {
    const schreiben: Promise<void>[] = [
      env.RATE_LIMIT.put(tagKey, String(tagZahl + 1), { expirationTtl: TAG_TTL }),
      env.RATE_LIMIT.put(ipKey, String(ipZahl + 1), { expirationTtl: TAG_TTL }),
    ];
    if (!email) {
      schreiben.push(env.RATE_LIMIT.put(anonKey, String(anonZahl + 1), { expirationTtl: TAG_TTL }));
    }
    if (mailKey) {
      // bewusst OHNE TTL: „pro E-Mail für immer nur 1" — es liegt nur der Hash
      schreiben.push(env.RATE_LIMIT.put(mailKey, heute));
    }
    await Promise.all(schreiben);
  }

  if (daten.stop_reason === 'refusal') {
    return demoFehler(422, 'inhalt', 'Die KI konnte diesen Inhalt nicht verarbeiten. Bitte prüfen Sie, ob das Foto wirklich einen Behördenbrief zeigt.', origin);
  }
  const textBlock = [...(daten.content ?? [])].reverse().find((b) => b.type === 'text');
  if (!textBlock?.text) {
    return demoFehler(502, 'ki', 'Die KI hat keine verwertbare Antwort geliefert. Bitte erneut versuchen.', origin);
  }

  let analyse: unknown;
  try {
    analyse = JSON.parse(textBlock.text);
  } catch {
    return demoFehler(502, 'ki', 'Die Antwort war unlesbar. Bitte erneut versuchen.', origin);
  }

  let analyseDe: unknown = undefined;
  let ausgabeSprache = sprachCode;
  let uebersetzungFehlgeschlagen = false;
  if (zweisprachig) {
    const uebersetzt = await uebersetzeAnalyse(env, analyse, sprachName);
    if (uebersetzt) {
      analyseDe = analyse;
      analyse = uebersetzt;
    } else {
      // lieber Deutsch als gar nichts — aber nur EINE Fassung schicken,
      // sonst zeigt die Seite zwei Knöpfe „Deutsch | Deutsch"
      ausgabeSprache = 'de';
      uebersetzungFehlgeschlagen = true;
    }
  }

  return Response.json(
    {
      analyse,
      analyse_de: analyseDe,
      versuch: bezahlt ? 'bezahlt' : email ? 2 : 1,
      guthaben: bezahlt ? walletRest - 1 : undefined,
      einrichtung: einrichtungsName ?? undefined,
      sprache: ausgabeSprache,
      uebersetzung_fehlgeschlagen: uebersetzungFehlgeschlagen || undefined,
    },
    { headers: demoCorsHeaders(origin) }
  );
}

// ============================================================
// Bezahlung (Stripe) — Credit-Guthaben, passwortlos ("Gutschein"-Prinzip)
// ============================================================
//
// Ablauf:
//  1. /kaufen        -> legt eine Stripe-Checkout-Session an, gibt URL zurück
//  2. Stripe-Bezahlseite (Kartendaten fasst NUR Stripe an)
//  3a. /kauf-status  -> nach Rückkehr: prüft Zahlung, aktiviert Guthaben,
//                       gibt ein signiertes Wallet-Token zurück (localStorage)
//  3b. /stripe-webhook -> Sicherungsnetz: aktiviert Guthaben + mailt den
//                       Wiederherstellungs-Link (Brevo)
//  4. /demo mit walletToken -> Analyse gegen Guthaben (siehe demoHandler)

/** Credit-Pakete: Stripe-Price-ID -> Anzahl Analysen.
 *  NACH dem Anlegen der Produkte in Stripe die echten `price_…`-IDs eintragen. */
const PAKETE: Record<string, { credits: number }> = {
  // Stripe LIVE-Preise (Webklar). Echtes Geld — Änderungen nur mit Bedacht.
  'price_1U6BNnBsRA1AOdnedGW5eefh': { credits: 5 }, // 2,99 € — 5 Analysen
  'price_1U6BPRBsRA1AOdnemDUalzb8': { credits: 15 }, // 6,99 € — 15 Analysen
};

/** HMAC-SHA256 als Hex. */
async function hmacHex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Konstantzeit-Vergleich zweier Hex-Strings. */
function gleich(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Wallet-Token = `<walletId>.<HMAC>`. */
async function signWallet(walletId: string, secret: string): Promise<string> {
  return `${walletId}.${await hmacHex(secret, walletId)}`;
}
async function verifyWallet(token: string, secret: string): Promise<string | null> {
  const i = token.lastIndexOf('.');
  if (i < 0) return null;
  const walletId = token.slice(0, i);
  const sig = token.slice(i + 1);
  return gleich(sig, await hmacHex(secret, walletId)) ? walletId : null;
}

/** Guthaben idempotent aktivieren (pro Stripe-Session nur einmal). */
async function aktiviereGuthaben(env: Env, sessionId: string, walletId: string, credits: number): Promise<void> {
  const flagKey = `wallet_done:${sessionId}`;
  if (await env.RATE_LIMIT.get(flagKey)) return; // schon aktiviert
  await env.RATE_LIMIT.put(`wallet:${walletId}`, String(credits));
  await env.RATE_LIMIT.put(flagKey, '1', { expirationTtl: 60 * 60 * 24 * 400 });
}

/** Guthaben-/Wiederherstellungs-Link per Brevo-Transaktionsmail. */
async function guthabenMail(env: Env, email: string, link: string, credits: number): Promise<void> {
  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { name: 'BehördenKlar', email: 'behoerdenbriefhelfer@gmail.com' },
      to: [{ email }],
      subject: 'Ihr BehördenKlar-Guthaben',
      htmlContent:
        `<p>Vielen Dank für Ihren Kauf!</p>` +
        `<p>Ihr Guthaben: <strong>${credits} Analysen</strong>.</p>` +
        `<p>Mit diesem Link nutzen Sie Ihr Guthaben auf jedem Gerät:</p>` +
        `<p><a href="${link}">${link}</a></p>` +
        `<p>Bitte bewahren Sie diese E-Mail auf — der Link ist Ihr Zugang.</p>`,
    }),
  });
}

/** POST /kaufen — Stripe-Checkout-Session anlegen. */
/**
 * Sprachen, die die Stripe-Bezahlseite selbst beherrscht. Nur diese duerfen
 * als `locale` mitgegeben werden — ein unbekannter Wert laesst Stripe die
 * Session mit 400 ablehnen, und der Kauf waere kaputt. Fehlt eine Sprache
 * hier (z. B. Arabisch, Tigrinya), schicken wir GAR NICHTS mit; Stripe
 * waehlt dann selbst anhand des Browsers.
 */
const STRIPE_SPRACHEN = new Set([
  'bg','cs','da','de','el','en','es','et','fi','fil','fr','hr','hu','id','it',
  'ja','ko','lt','lv','ms','mt','nb','nl','pl','pt','ro','ru','sk','sl','sv',
  'th','tr','vi','zh',
]);

async function kaufenHandler(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('origin');
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: demoCorsHeaders(origin) });
  if (request.method !== 'POST') return demoFehler(405, 'methode', 'Nur POST erlaubt.', origin);
  if (!originOk(origin)) return demoFehler(403, 'origin', 'Aufruf nur von der BehördenKlar-Webseite erlaubt.', origin);

  let body: { priceId?: string; sprache?: string };
  try {
    body = await request.json();
  } catch {
    return demoFehler(400, 'json', 'Ungültige Anfrage.', origin);
  }
  const priceId = typeof body.priceId === 'string' ? body.priceId : '';
  const paket = PAKETE[priceId];
  if (!paket) return demoFehler(400, 'paket', 'Unbekanntes Paket.', origin);

  const walletId = crypto.randomUUID();
  const params = new URLSearchParams();
  params.set('mode', 'payment');
  // Zahlungsart fest auf Karte setzen. Ohne diese Angabe waehlt Stripe die
  // Methoden selbst ("dynamic payment methods") und stellt Link ganz nach
  // vorn — mit gespeicherter Karte und einem kleinen, englischen
  // "Pay without Link" als einzigem Ausweg. Fuer Menschen, die Deutsch kaum
  // lesen, ist das eine Sackgasse. Sobald weitere Methoden (PayPal, Klarna)
  // im Stripe-Konto freigeschaltet sind, hier ergaenzen — sonst erscheinen
  // sie nicht, weil diese Angabe die automatische Auswahl abschaltet.
  params.set('payment_method_types[0]', 'card');
  params.set('line_items[0][price]', priceId);
  params.set('line_items[0][quantity]', '1');
  params.set('success_url', `${origin}/demo?kauf=ok&session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${origin}/demo?kauf=abbruch`);
  params.set('metadata[walletId]', walletId);
  params.set('metadata[credits]', String(paket.credits));
  params.set('metadata[origin]', origin);
  // Bezahlseite in der Sprache zeigen, aus der der Nutzer kommt.
  if (typeof body.sprache === 'string' && STRIPE_SPRACHEN.has(body.sprache)) {
    params.set('locale', body.sprache);
  }

  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, 'content-type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const s = (await r.json()) as { url?: string; error?: { message?: string; type?: string; code?: string } };
  if (!r.ok || !s.url) {
    // Grund nur ins Worker-Log (wrangler tail) — Nutzer sehen keine Technik.
    console.log('Stripe-Checkout-Fehler', r.status, JSON.stringify(s).slice(0, 300));
    return demoFehler(502, 'stripe', 'Die Bezahlung ist gerade nicht möglich. Bitte versuchen Sie es später noch einmal.', origin);
  }
  return Response.json({ url: s.url }, { headers: demoCorsHeaders(origin) });
}

/** GET /kauf-status?session_id=… — nach Rückkehr: Zahlung prüfen, Guthaben aktivieren, Token liefern. */
async function kaufStatusHandler(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('origin');
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: demoCorsHeaders(origin) });
  if (!originOk(origin)) return demoFehler(403, 'origin', 'Nicht erlaubt.', origin);

  const sessionId = new URL(request.url).searchParams.get('session_id') ?? '';
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return demoFehler(400, 'session', 'Ungültige Sitzung.', origin);

  const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
  });
  const s = (await r.json()) as { payment_status?: string; metadata?: Record<string, string> };
  if (!r.ok || s.payment_status !== 'paid') {
    return demoFehler(402, 'nicht_bezahlt', 'Die Zahlung ist noch nicht bestätigt. Bitte einen Moment warten und neu laden.', origin);
  }
  const walletId = s.metadata?.walletId;
  const credits = parseInt(s.metadata?.credits ?? '0', 10);
  if (!walletId || !credits) return demoFehler(500, 'meta', 'Kaufdaten unvollständig.', origin);

  await aktiviereGuthaben(env, sessionId, walletId, credits);
  const token = await signWallet(walletId, env.TOKEN_SIGNING_SECRET);
  const rest = parseInt((await env.RATE_LIMIT.get(`wallet:${walletId}`)) ?? '0', 10);
  return Response.json({ token, guthaben: rest }, { headers: demoCorsHeaders(origin) });
}

// ============================================================
// Einrichtungs-Codes — Beratungsstellen zahlen, Ratsuchende nicht
// ============================================================
//
// Ein Code (z. B. `MBE-K7QX`) zeigt auf ein Guthaben wie beim Kauf, nur dass
// es allen gehört, die den Code kennen. Angelegt wird er von Hand mit
// tools/einrichtungs-code.js (kein Secret nötig, nur wrangler-Login).
//
// KV:  code:<CODE>           -> walletId
//      wallet:<walletId>     -> Restguthaben (wie beim Kauf)
//      einrichtung:<walletId> -> {"name":"MBE Donnersberg","ablauf":"2027-01-31"}
//
// Der zufällige Teil im Code macht Raten aussichtslos; zusätzlich sind
// Fehlversuche pro IP und Tag begrenzt.

// Großzügig, weil sich eine ganze Beratungsstelle eine IP teilt. Raten bleibt
// trotzdem aussichtslos: 31^4 ≈ 920.000 Codes je Präfix.
const CODE_FEHLVERSUCHE_PRO_TAG = 30;

/** „mbe k7qx", „MBEK7QX", „MBE-K7QX" → „MBE-K7QX" (Bindestrich vor den letzten 4 Zeichen). */
function normCode(eingabe: string): string {
  const roh = eingabe.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return roh.length > 4 ? `${roh.slice(0, -4)}-${roh.slice(-4)}` : roh;
}

interface Einrichtung {
  name: string;
  /** letzter gültiger Tag, ISO-Datum */
  ablauf: string;
}

async function ladeEinrichtung(env: Env, walletId: string): Promise<Einrichtung | null> {
  const roh = await env.RATE_LIMIT.get(`einrichtung:${walletId}`);
  if (!roh) return null;
  try {
    return JSON.parse(roh) as Einrichtung;
  } catch {
    return null;
  }
}

/** POST /code — Einrichtungs-Code einlösen, signiertes Wallet-Token liefern. */
async function codeHandler(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('origin');
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: demoCorsHeaders(origin) });
  if (request.method !== 'POST') return demoFehler(405, 'methode', 'Nur POST erlaubt.', origin);
  if (!originOk(origin)) return demoFehler(403, 'origin', 'Nicht erlaubt.', origin);

  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return demoFehler(400, 'json', 'Ungültige Anfrage.', origin);
  }
  const code = typeof body.code === 'string' ? normCode(body.code) : '';

  const ip = request.headers.get('cf-connecting-ip') ?? 'unbekannt';
  const heute = new Date().toISOString().slice(0, 10);
  const failKey = `codefail:${ip}:${heute}`;
  const fehlversuche = parseInt((await env.RATE_LIMIT.get(failKey)) ?? '0', 10);
  if (fehlversuche >= CODE_FEHLVERSUCHE_PRO_TAG) {
    return demoFehler(429, 'code_gesperrt', 'Zu viele falsche Codes. Bitte versuchen Sie es morgen wieder.', origin);
  }

  const walletId = /^[A-Z0-9-]{4,40}$/.test(code) ? await env.RATE_LIMIT.get(`code:${code}`) : null;
  const einrichtung = walletId ? await ladeEinrichtung(env, walletId) : null;
  if (!walletId || !einrichtung) {
    await env.RATE_LIMIT.put(failKey, String(fehlversuche + 1), { expirationTtl: 60 * 60 * 48 });
    return demoFehler(404, 'code_unbekannt', 'Diesen Code kennen wir nicht. Bitte prüfen Sie die Schreibweise.', origin);
  }
  if (einrichtung.ablauf < heute) {
    return demoFehler(410, 'kontingent_abgelaufen', `Der Zugang über ${einrichtung.name} ist abgelaufen. Bitte fragen Sie dort nach.`, origin);
  }

  const rest = parseInt((await env.RATE_LIMIT.get(`wallet:${walletId}`)) ?? '0', 10);
  const token = await signWallet(walletId, env.TOKEN_SIGNING_SECRET);
  return Response.json(
    { token, guthaben: rest, einrichtung: einrichtung.name, ablauf: einrichtung.ablauf },
    { headers: demoCorsHeaders(origin) }
  );
}

// ============================================================
// Übergabe Handy ↔ PC — Ende-zu-Ende verschlüsselt
// ============================================================
//
// Ein Gerät zeigt einen QR-Code, das andere scannt ihn. Im QR-Code stehen
// eine zufällige Übergabe-ID und ein AES-Schlüssel — der Schlüssel steht
// hinter dem `#` der Adresse und wird deshalb NIE an einen Server geschickt.
// Hier liegen nur verschlüsselte Päckchen, die wir selbst nicht lesen
// können. Jede Übergabe löscht sich nach 15 Minuten von selbst.
//
//   PUT    /uebergabe/<id>/<fach>  -> Päckchen ablegen (Text, verschlüsselt)
//   GET    /uebergabe/<id>         -> alle Päckchen dieser Übergabe
//   DELETE /uebergabe/<id>         -> sofort löschen
//
// Durable Object statt KV, weil KV Abfragen auf noch nicht vorhandene
// Schlüssel zwischenspeichert — das Warten am PC würde bis zu einer Minute
// hängen. Ein Durable Object ist sofort konsistent.
//
// Ein Fach (z. B. „status", „ergebnis") wird überschrieben, nicht angehängt.

const UEBERGABE_LEBENSDAUER_MS = 15 * 60 * 1000;
const UEBERGABE_MAX_ZEICHEN = 400_000; // Analyse-JSON in zwei Sprachen, verschlüsselt
const UEBERGABE_MAX_SCHREIBVORGAENGE = 50;
const UEBERGABE_ID_MUSTER = /^[A-Za-z0-9_-]{22}$/; // 128 Bit, base64url
const UEBERGABE_FACH_MUSTER = /^[a-z]{2,16}$/;

export class Uebergabe extends DurableObject<Env> {
  async lesen(): Promise<Record<string, string>> {
    const eintraege = await this.ctx.storage.list<string>({ prefix: 'fach:' });
    const faecher: Record<string, string> = {};
    for (const [k, v] of eintraege) faecher[k.slice(5)] = v;
    return faecher;
  }

  async schreiben(fach: string, wert: string): Promise<boolean> {
    const zahl = (await this.ctx.storage.get<number>('zahl')) ?? 0;
    if (zahl >= UEBERGABE_MAX_SCHREIBVORGAENGE) return false;
    await this.ctx.storage.put({ [`fach:${fach}`]: wert, zahl: zahl + 1 });
    // gleitend: 15 Minuten nach dem LETZTEN Päckchen löschen, nicht nach dem ersten
    await this.ctx.storage.setAlarm(Date.now() + UEBERGABE_LEBENSDAUER_MS);
    return true;
  }

  async loeschen(): Promise<void> {
    await this.ctx.storage.deleteAlarm();
    await this.ctx.storage.deleteAll();
  }

  async alarm(): Promise<void> {
    await this.ctx.storage.deleteAll();
  }
}

function uebergabeCors(origin: string | null): Record<string, string> {
  return {
    ...demoCorsHeaders(origin),
    'access-control-allow-methods': 'GET, PUT, DELETE, OPTIONS',
    'cache-control': 'no-store',
  };
}

async function uebergabeHandler(request: Request, env: Env, pfad: string): Promise<Response> {
  const origin = request.headers.get('origin');
  const cors = uebergabeCors(origin);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  // Webseite: nur unsere eigene. Die App schickt keinen Origin-Header.
  if (origin && !originOk(origin)) {
    return Response.json({ code: 'origin', meldung: 'Nicht erlaubt.' }, { status: 403, headers: cors });
  }

  const [, , id, fach] = pfad.split('/'); // "", "uebergabe", id, fach?
  if (!id || !UEBERGABE_ID_MUSTER.test(id)) {
    return Response.json({ code: 'id', meldung: 'Ungültige Übergabe.' }, { status: 400, headers: cors });
  }
  const stub = env.UEBERGABE.get(env.UEBERGABE.idFromName(id));

  if (request.method === 'GET' && !fach) {
    return Response.json({ faecher: await stub.lesen() }, { headers: cors });
  }
  if (request.method === 'DELETE' && !fach) {
    await stub.loeschen();
    return new Response(null, { status: 204, headers: cors });
  }
  if (request.method === 'PUT' && fach && UEBERGABE_FACH_MUSTER.test(fach)) {
    const ip = request.headers.get('cf-connecting-ip') ?? 'unbekannt';
    const { success } = await env.UEBERGABE_LIMIT.limit({ key: ip });
    if (!success) {
      return Response.json({ code: 'zu_viele', meldung: 'Zu viele Anfragen. Bitte kurz warten.' }, { status: 429, headers: cors });
    }
    const wert = await request.text();
    if (!wert || wert.length > UEBERGABE_MAX_ZEICHEN || !/^[A-Za-z0-9_-]+$/.test(wert)) {
      return Response.json({ code: 'inhalt', meldung: 'Ungültiger Inhalt.' }, { status: 400, headers: cors });
    }
    if (!(await stub.schreiben(fach, wert))) {
      return Response.json({ code: 'voll', meldung: 'Diese Übergabe ist abgeschlossen.' }, { status: 409, headers: cors });
    }
    return new Response(null, { status: 204, headers: cors });
  }
  return Response.json({ code: 'methode', meldung: 'Nicht erlaubt.' }, { status: 405, headers: cors });
}

/** POST /stripe-webhook — Sicherungsnetz: Signatur prüfen, Guthaben aktivieren, Link mailen. */
async function webhookHandler(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return new Response('nur POST', { status: 405 });
  const sigHeader = request.headers.get('stripe-signature') ?? '';
  const payload = await request.text();
  const teile = Object.fromEntries(sigHeader.split(',').map((p) => p.split('=') as [string, string]));
  const t = teile['t'];
  const v1 = teile['v1'];
  if (!t || !v1) return new Response('Signatur fehlt', { status: 400 });
  // Ohne gesetztes Secret koennen wir nichts pruefen. Sauber ablehnen statt
  // im hmacHex mit einem 500er (Worker-Exception) zu sterben.
  if (!env.STRIPE_WEBHOOK_SECRET) {
    console.log('Webhook ohne STRIPE_WEBHOOK_SECRET aufgerufen — Secret fehlt!');
    return new Response('Webhook nicht konfiguriert', { status: 503 });
  }
  const erwartet = await hmacHex(env.STRIPE_WEBHOOK_SECRET, `${t}.${payload}`);
  if (!gleich(v1, erwartet)) return new Response('Signatur ungültig', { status: 400 });

  let event: {
    type?: string;
    data?: { object?: { id?: string; metadata?: Record<string, string>; customer_details?: { email?: string } } };
  };
  try {
    event = JSON.parse(payload);
  } catch {
    return new Response('Kein gültiges JSON', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const o = event.data?.object;
    const walletId = o?.metadata?.walletId;
    const credits = parseInt(o?.metadata?.credits ?? '0', 10);
    if (o?.id && walletId && credits) {
      await aktiviereGuthaben(env, o.id, walletId, credits);
      const email = o.customer_details?.email;
      const basis = o.metadata?.origin || 'https://behoerdenklar.de';
      if (email) {
        const token = await signWallet(walletId, env.TOKEN_SIGNING_SECRET);
        await guthabenMail(env, email, `${basis}/demo?wallet=${encodeURIComponent(token)}`, credits).catch(() => {});
      }
    }
  }
  return new Response('ok', { status: 200 });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pfad = new URL(request.url).pathname;
    lokalTest = env.LOKAL_TEST === '1';
    // Web-Demo + Bezahl-Routen haben eigene Regeln
    if (pfad === '/demo') {
      return demoHandler(request, env).catch((e) => {
        console.log('Demo-Fehler', e instanceof Error ? e.name : 'unbekannt');
        return demoFehler(503, 'dienst', 'Der Dienst ist gerade nicht erreichbar. Bitte versuchen Sie es in einer Minute erneut.', request.headers.get('origin'));
      });
    }
    if (pfad === '/kaufen') return kaufenHandler(request, env);
    if (pfad === '/kauf-status') return kaufStatusHandler(request, env);
    if (pfad === '/code') return codeHandler(request, env);
    if (pfad.startsWith('/uebergabe/')) return uebergabeHandler(request, env, pfad);
    if (pfad === '/stripe-webhook') return webhookHandler(request, env);

    if (request.method !== 'POST') {
      return fehler(405, 'invalid_request_error', 'Nur POST erlaubt.');
    }

    // Geräte-ID der App (anonym, dient nur dem Tageslimit)
    const geraeteId = request.headers.get('x-geraete-id');
    if (!geraeteId || !/^g_[a-z0-9]{24}$/.test(geraeteId)) {
      return fehler(400, 'invalid_request_error', 'Fehlende oder ungültige Geräte-ID.');
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return fehler(400, 'invalid_request_error', 'Request-Body ist kein gültiges JSON.');
    }

    if (typeof body.model !== 'string' || !ERLAUBTE_MODELLE.has(body.model)) {
      return fehler(400, 'invalid_request_error', 'Dieses Modell ist nicht erlaubt.');
    }
    // max_tokens deckeln statt ablehnen — schützt vor Kosten-Missbrauch
    if (typeof body.max_tokens !== 'number' || body.max_tokens > MAX_TOKENS_OBERGRENZE) {
      body.max_tokens = MAX_TOKENS_OBERGRENZE;
    }
    // Die App streamt nicht; Streaming würde das Durchreichen verkomplizieren
    if (body.stream) {
      return fehler(400, 'invalid_request_error', 'Streaming wird nicht unterstützt.');
    }

    // Tageslimits prüfen (weiche Limits: KV ist eventually consistent,
    // parallele Anfragen können das Limit minimal überschreiten — okay).
    // Zwei Ebenen: pro Gerät (normale Nutzung) und pro IP-Adresse (dämmt
    // Angreifer ein, die sich beliebig neue Geräte-IDs ausdenken). Das
    // IP-Limit ist bewusst höher, weil sich viele Nutzer eine IP teilen
    // können (Familien-WLAN, Mobilfunk/CGNAT).
    const heute = new Date().toISOString().slice(0, 10);
    const ip = request.headers.get('cf-connecting-ip') ?? 'unbekannt';
    const kvKey = `rl:${geraeteId}:${heute}`;
    const kvKeyIp = `rlip:${ip}:${heute}`;
    const limit = parseInt(env.TAGES_LIMIT || '20', 10);
    const limitIp = parseInt(env.TAGES_LIMIT_IP || '100', 10);
    const [bisher, bisherIp] = (
      await Promise.all([env.RATE_LIMIT.get(kvKey), env.RATE_LIMIT.get(kvKeyIp)])
    ).map((wert) => parseInt(wert ?? '0', 10));
    if (bisher >= limit || bisherIp >= limitIp) {
      return fehler(
        429,
        'rate_limit_error',
        'Tageslimit erreicht. Bitte versuchen Sie es morgen erneut.'
      );
    }

    // An Anthropic weiterleiten — Header werden frisch gebaut, nichts vom
    // Client wird durchgereicht (außer dem geprüften Body)
    const antwort = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      body: JSON.stringify(body),
    });

    // Nur zählen, wenn die Anfrage Anthropic erreicht hat (5xx kostet kein Kontingent)
    if (antwort.status < 500) {
      await Promise.all([
        env.RATE_LIMIT.put(kvKey, String(bisher + 1), { expirationTtl: 60 * 60 * 48 }),
        env.RATE_LIMIT.put(kvKeyIp, String(bisherIp + 1), { expirationTtl: 60 * 60 * 48 }),
      ]);
    }

    return new Response(antwort.body, {
      status: antwort.status,
      headers: {
        'content-type': antwort.headers.get('content-type') ?? 'application/json',
      },
    });
  },
} satisfies ExportedHandler<Env>;
