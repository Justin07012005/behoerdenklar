/**
 * Übergabe Handy ↔ PC — Ende-zu-Ende verschlüsselt.
 *
 * Ein Gerät erzeugt eine Übergabe (zufällige ID + AES-256-Schlüssel) und
 * zeigt sie als QR-Code. Beides steht hinter dem `#` der Adresse; dieser
 * Teil wird von Browsern NIE an einen Server geschickt. Der Worker sieht nur
 * verschlüsselte Päckchen und löscht sie nach 15 Minuten.
 *
 * Päckchen-Format: base64url( IV[12 Byte] || AES-GCM-Chiffrat ) eines JSON.
 * Die App (src/utils/uebergabe.ts) benutzt exakt dasselbe Format.
 */
(function (w) {
  'use strict';

  var LOKAL = /^(localhost|127\.0\.0\.1)$/.test(w.location.hostname);
  var BASIS = (LOKAL ? 'http://localhost:8799' : 'https://behoerdenklar-proxy.behoerdenbrief.workers.dev') + '/uebergabe/';

  function b64u(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function ausB64u(text) {
    var s = atob(text.replace(/-/g, '+').replace(/_/g, '/'));
    var b = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
    return b;
  }
  function zufall(n) { return w.crypto.getRandomValues(new Uint8Array(n)); }
  function schluessel(roh) {
    return w.crypto.subtle.importKey('raw', roh, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
  }

  /** Neue Übergabe: { id, k, key } — k ist der Schlüssel als Text für den QR-Code. */
  async function neu() {
    var roh = zufall(32);
    return { id: b64u(zufall(16)), k: b64u(roh), key: await schluessel(roh) };
  }

  /** Übergabe aus ID + Schlüsseltext (aus dem QR-Code) öffnen. */
  async function oeffne(id, k) {
    if (!/^[A-Za-z0-9_-]{22}$/.test(id || '') || !/^[A-Za-z0-9_-]{43}$/.test(k || '')) return null;
    return { id: id, k: k, key: await schluessel(ausB64u(k)) };
  }

  async function verschluesseln(ue, daten) {
    var iv = zufall(12);
    var klar = new TextEncoder().encode(JSON.stringify(daten));
    var ct = new Uint8Array(await w.crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, ue.key, klar));
    var alles = new Uint8Array(iv.length + ct.length);
    alles.set(iv, 0); alles.set(ct, iv.length);
    return b64u(alles);
  }

  /** Entschlüsseln; null, wenn das Päckchen nicht von dieser Übergabe stammt. */
  async function entschluesseln(ue, text) {
    try {
      var b = ausB64u(text);
      var klar = await w.crypto.subtle.decrypt({ name: 'AES-GCM', iv: b.slice(0, 12) }, ue.key, b.slice(12));
      return JSON.parse(new TextDecoder().decode(klar));
    } catch (e) { return null; }
  }

  /** Päckchen in ein Fach legen (z. B. „status", „ergebnis"). */
  async function senden(ue, fach, daten) {
    var r = await fetch(BASIS + ue.id + '/' + fach, { method: 'PUT', body: await verschluesseln(ue, daten) });
    if (!r.ok) throw new Error('Übergabe fehlgeschlagen (' + r.status + ')');
  }

  /** Alle Fächer holen und entschlüsseln: { status: {...}, ergebnis: {...} }. */
  async function holen(ue) {
    var r = await fetch(BASIS + ue.id, { cache: 'no-store' });
    if (!r.ok) throw new Error('Übergabe nicht erreichbar (' + r.status + ')');
    var faecher = (await r.json()).faecher || {};
    var aus = {};
    for (var f in faecher) {
      var d = await entschluesseln(ue, faecher[f]);
      if (d) aus[f] = d;
    }
    return aus;
  }

  function loeschen(ue) {
    return fetch(BASIS + ue.id, { method: 'DELETE' }).catch(function () {});
  }

  /** Adresse für den QR-Code. `werte` landet komplett hinter dem `#`. */
  function adresse(werte) {
    var teile = [];
    for (var k in werte) if (werte[k] !== undefined && werte[k] !== null && werte[k] !== '') {
      teile.push(k + '=' + encodeURIComponent(werte[k]));
    }
    return w.location.origin + w.location.pathname + '#' + teile.join('&');
  }

  /** Werte hinter dem `#` lesen (oder null, wenn keine da sind). */
  function ausAdresse() {
    var h = w.location.hash.replace(/^#/, '');
    if (!h) return null;
    var werte = {};
    h.split('&').forEach(function (t) {
      var i = t.indexOf('=');
      if (i > 0) werte[t.slice(0, i)] = decodeURIComponent(t.slice(i + 1));
    });
    return werte;
  }

  /** QR-Code als SVG-Text (braucht qrcode.js). */
  function qrSvg(text) {
    var qr = w.qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
  }

  w.BKUebergabe = {
    neu: neu, oeffne: oeffne, senden: senden, holen: holen, loeschen: loeschen,
    adresse: adresse, ausAdresse: ausAdresse, qrSvg: qrSvg,
    LEBENSDAUER_MIN: 15,
  };
})(window);
