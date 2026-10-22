/**
 * QR-Code vom Beratungs-PC scannen (Übergabe Handy ↔ PC).
 *
 * Zwei Wege, beide Ende-zu-Ende verschlüsselt:
 *  - „senden":    ein Brief aus dem Archiv erscheint am PC (der PC zeigt dafür
 *                 auf behoerdenklar.de/demo „Lieber mit dem Handy fotografieren")
 *  - „empfangen": das Ergebnis vom PC landet im Archiv, mit Erinnerungen
 *                 (der PC zeigt dafür „Ergebnis aufs Handy mitnehmen")
 *
 * Ohne Kamera (Simulator, Erlaubnis verweigert) kann man den Link einfügen.
 */
import React, { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppStore, neueId } from '../store/useAppStore';
import { planeErinnerungen } from '../services/erinnerungen';
import { holeAusUebergabe, loescheUebergabe, oeffneUebergabe, sendeAnUebergabe } from '../services/uebergabe';
import { briefZuWebPaket, leseUebergabeLink, webPaketZuBrief, WebPaket } from '../utils/uebergabeFormat';
import { GrossButton } from '../components/GrossButton';
import { Ikone } from '../components/Ikone';
import { farben, schrift, abstand, schriftart, ecke, kartenSchatten } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Verbinden'>;

type Zustand =
  | { art: 'scannen' }
  | { art: 'arbeitet'; text: string }
  | { art: 'fertig'; text: string }
  | { art: 'fehler'; text: string };

export function VerbindenScreen({ navigation, route }: Props) {
  const modus = route.params.modus;
  const briefId = route.params.modus === 'senden' ? route.params.briefId : null;
  const brief = useAppStore((s) => s.briefe.find((b) => b.id === briefId));
  const addBrief = useAppStore((s) => s.addBrief);
  const [erlaubnis, frageErlaubnis] = useCameraPermissions();
  const [zustand, setZustand] = useState<Zustand>({ art: 'scannen' });
  const [eingefuegt, setEingefuegt] = useState('');
  const beschaeftigt = useRef(false); // Kamera meldet denselben Code mehrfach

  async function verarbeite(text: string) {
    if (beschaeftigt.current) return;
    beschaeftigt.current = true;
    try {
      const link = leseUebergabeLink(text);
      if (!link) {
        setZustand({ art: 'fehler', text: 'Das ist kein QR-Code von BehördenKlar. Bitte den Code auf dem Bildschirm der Beratung scannen.' });
        return;
      }
      if (link.art === 'g') {
        setZustand({ art: 'fehler', text: 'Dieser Code ist für die Webseite gedacht. Öffnen Sie ihn mit der normalen Handy-Kamera.' });
        return;
      }

      if (modus === 'senden') {
        if (link.art !== 'k') {
          setZustand({ art: 'fehler', text: 'Dieser Code ist zum Mitnehmen. Gehen Sie dafür ins Archiv auf „Vom Computer übernehmen".' });
          return;
        }
        if (!brief) {
          setZustand({ art: 'fehler', text: 'Der Brief wurde nicht gefunden.' });
          return;
        }
        setZustand({ art: 'arbeitet', text: 'Der Brief wird verschlüsselt geschickt …' });
        const u = await oeffneUebergabe(link);
        await sendeAnUebergabe(u, 'status', { schritt: 'verbunden' });
        await sendeAnUebergabe(u, 'ergebnis', briefZuWebPaket(brief));
        setZustand({ art: 'fertig', text: 'Fertig. Der Brief ist jetzt auf dem Bildschirm der Beratung zu sehen.' });
        return;
      }

      // empfangen
      if (link.art !== 'm') {
        setZustand({ art: 'fehler', text: 'Dieser Code wartet auf einen Brief. Öffnen Sie dafür den Brief und tippen Sie auf „Am Computer zeigen".' });
        return;
      }
      setZustand({ art: 'arbeitet', text: 'Das Ergebnis wird geholt …' });
      const u = await oeffneUebergabe(link);
      const faecher = await holeAusUebergabe(u);
      const paket = faecher.ergebnis as WebPaket | undefined;
      if (!paket?.analyse) {
        setZustand({ art: 'fehler', text: 'Dieser Code ist abgelaufen oder wurde schon benutzt (er gilt 15 Minuten und nur einmal). Bitte am Computer einen neuen erzeugen.' });
        return;
      }
      loescheUebergabe(u);
      const neu = webPaketZuBrief(paket, neueId(), new Date());
      await addBrief(neu);
      planeErinnerungen(neu).catch(() => {});
      navigation.replace('Analyse', { briefId: neu.id });
    } catch {
      setZustand({ art: 'fehler', text: 'Keine Verbindung. Bitte prüfen Sie das Internet und versuchen Sie es noch einmal.' });
    } finally {
      beschaeftigt.current = false;
    }
  }

  const titel = modus === 'senden' ? 'Am Computer zeigen' : 'Vom Computer übernehmen';
  const anleitung =
    modus === 'senden'
      ? 'Die Beratung öffnet behoerdenklar.de/demo und tippt auf „Lieber mit dem Handy fotografieren". Scannen Sie den QR-Code, dann erscheint Ihr Brief auf dem Bildschirm.'
      : 'Die Beratung tippt am Computer auf „Ergebnis aufs Handy mitnehmen". Scannen Sie den QR-Code, dann landet der Brief verschlüsselt in Ihrem Archiv.';

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: abstand.m, paddingBottom: abstand.xl }} keyboardShouldPersistTaps="handled">
      <Text style={styles.titel}>{titel}</Text>
      <Text style={styles.text}>{anleitung}</Text>

      {zustand.art === 'scannen' && (
        <View style={styles.kameraRahmen}>
          {erlaubnis?.granted ? (
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onBarcodeScanned={({ data }) => verarbeite(data)}
            />
          ) : (
            <View style={styles.kameraLeer}>
              <Text style={styles.text}>Für den QR-Code braucht die App kurz die Kamera.</Text>
              <GrossButton titel="Kamera erlauben" ikone="kamera" onPress={frageErlaubnis} />
            </View>
          )}
        </View>
      )}

      {zustand.art === 'arbeitet' && (
        <View style={styles.meldung}>
          <ActivityIndicator color={farben.primaer} />
          <Text style={styles.text}>{zustand.text}</Text>
        </View>
      )}
      {zustand.art === 'fertig' && (
        <View style={styles.meldung}>
          <Ikone name="checkAn" groesse={28} farbe={farben.ampelGruen} />
          <Text style={styles.text}>{zustand.text}</Text>
          <GrossButton titel="Zurück zum Brief" onPress={() => navigation.goBack()} />
        </View>
      )}
      {zustand.art === 'fehler' && (
        <View style={styles.meldung}>
          <Ikone name="warnung" groesse={26} farbe={farben.fehler} />
          <Text style={styles.text}>{zustand.text}</Text>
          <GrossButton titel="Noch einmal scannen" variante="sekundaer" onPress={() => setZustand({ art: 'scannen' })} />
        </View>
      )}

      <View style={styles.schutzZeile}>
        <Ikone name="schloss" groesse={13} farbe={farben.textTertiaer} />
        <Text style={styles.schutzText}>Ende-zu-Ende verschlüsselt · nach 15 Minuten gelöscht</Text>
      </View>

      {zustand.art === 'scannen' && (
        <View style={{ marginTop: abstand.l }}>
          <Text style={styles.klein}>Kein Scannen möglich? Link hier einfügen:</Text>
          <TextInput
            style={styles.feld}
            value={eingefuegt}
            onChangeText={setEingefuegt}
            placeholder="https://behoerdenklar.de/demo#…"
            placeholderTextColor={farben.textTertiaer}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Link vom Computer einfügen"
          />
          <GrossButton titel="Link verwenden" variante="sekundaer" deaktiviert={!eingefuegt.trim()} onPress={() => verarbeite(eingefuegt)} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: farben.hintergrund },
  titel: { fontFamily: schriftart.serif, fontSize: schrift.titel, fontWeight: '700', color: farben.text, marginBottom: abstand.s },
  text: { fontFamily: schriftart.serif, fontSize: schrift.basis, color: farben.text, lineHeight: 26 },
  klein: { fontFamily: schriftart.serif, fontSize: schrift.klein, color: farben.textSekundaer, marginBottom: abstand.s },
  kameraRahmen: {
    marginTop: abstand.m, height: 300, borderRadius: ecke, overflow: 'hidden',
    backgroundColor: farben.flaecheSekundaer,
  },
  kameraLeer: { flex: 1, justifyContent: 'center', padding: abstand.m, gap: abstand.m },
  meldung: { ...kartenSchatten, marginTop: abstand.m, gap: abstand.m, padding: abstand.m, borderRadius: ecke, backgroundColor: farben.flaeche },
  schutzZeile: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: abstand.m },
  schutzText: { fontFamily: schriftart.serif, fontSize: 13, color: farben.textTertiaer },
  feld: { fontFamily: schriftart.serif,
    backgroundColor: farben.flaeche, borderRadius: ecke, padding: 14, fontSize: schrift.klein,
    color: farben.text, borderWidth: 1, borderColor: farben.rand, marginBottom: abstand.s,
  },
});
