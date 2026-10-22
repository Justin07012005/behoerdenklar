/**
 * Übergabe Handy ↔ PC — Ende-zu-Ende verschlüsselt (AES-256-GCM).
 *
 * Päckchen-Format wie auf der Webseite: base64url(IV[12] || Chiffrat || Tag[16]).
 * expo-crypto liefert mit `combined()` genau diese Reihenfolge, deshalb können
 * App und Webseite die Päckchen gegenseitig lesen. Der Worker sieht nur
 * Chiffrat und löscht alles nach 15 Minuten.
 */
import { AESEncryptionKey, AESSealedData, aesDecryptAsync, aesEncryptAsync } from 'expo-crypto';
import { utf8Dekodieren, utf8Kodieren } from '../utils/utf8';
import { UebergabeLink, base64UrlZuBase64, base64ZuBase64Url } from '../utils/uebergabeFormat';

export interface OffeneUebergabe {
  link: UebergabeLink;
  schluessel: AESEncryptionKey;
}

export async function oeffneUebergabe(link: UebergabeLink): Promise<OffeneUebergabe> {
  const schluessel = await AESEncryptionKey.import(base64UrlZuBase64(link.schluessel), 'base64');
  return { link, schluessel };
}

async function verschluesseln(u: OffeneUebergabe, daten: unknown): Promise<string> {
  const versiegelt = await aesEncryptAsync(utf8Kodieren(JSON.stringify(daten)), u.schluessel);
  return base64ZuBase64Url((await versiegelt.combined('base64')) as string);
}

async function entschluesseln(u: OffeneUebergabe, text: string): Promise<unknown | null> {
  try {
    const versiegelt = AESSealedData.fromCombined(base64UrlZuBase64(text));
    const bytes = (await aesDecryptAsync(versiegelt, u.schluessel)) as Uint8Array;
    return JSON.parse(utf8Dekodieren(bytes));
  } catch {
    return null; // nicht von dieser Übergabe oder beschädigt
  }
}

const adresse = (u: OffeneUebergabe) => `${u.link.basis}/uebergabe/${u.link.id}`;

export async function sendeAnUebergabe(u: OffeneUebergabe, fach: string, daten: unknown): Promise<void> {
  const r = await fetch(`${adresse(u)}/${fach}`, { method: 'PUT', body: await verschluesseln(u, daten) });
  if (!r.ok) throw new Error(`Übergabe fehlgeschlagen (${r.status})`);
}

export async function holeAusUebergabe(u: OffeneUebergabe): Promise<Record<string, unknown>> {
  const r = await fetch(adresse(u), { headers: { 'cache-control': 'no-store' } });
  if (!r.ok) throw new Error(`Übergabe nicht erreichbar (${r.status})`);
  const faecher = ((await r.json()) as { faecher?: Record<string, string> }).faecher ?? {};
  const aus: Record<string, unknown> = {};
  for (const [fach, wert] of Object.entries(faecher)) {
    const d = await entschluesseln(u, wert);
    if (d) aus[fach] = d;
  }
  return aus;
}

export function loescheUebergabe(u: OffeneUebergabe): void {
  fetch(adresse(u), { method: 'DELETE' }).catch(() => {});
}
