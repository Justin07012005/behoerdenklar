/**
 * Großer, barrierefreier Button nach iOS-Vorbild:
 * - primär:   gefüllt mit der Marken-Tintfarbe (wie "prominente" iOS-Buttons)
 * - sekundär: hellgraue Fläche mit Tint-Text (wie Apples "graue Taste" —
 *             bewusst keine Umrandung, das wirkt nativer)
 * - gefahr:   rot gefüllt
 * Min. 56px hoch, große Schrift, System-Icons statt Emojis.
 */
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { farben, schrift, abstand, TOUCH_TARGET, schriftart, ecke } from '../theme';
import { Ikone, IkonenName } from './Ikone';

interface Props {
  titel: string;
  onPress: () => void;
  variante?: 'primaer' | 'sekundaer' | 'gefahr';
  deaktiviert?: boolean;
  laedt?: boolean;
  ikone?: IkonenName;
}

export function GrossButton({
  titel,
  onPress,
  variante = 'primaer',
  deaktiviert = false,
  laedt = false,
  ikone,
}: Props) {
  const istPrimaer = variante === 'primaer';
  const istGefahr = variante === 'gefahr';
  // Wie `.cta` der Webseite: Amtsblau gefüllt bzw. weißes Blatt mit blauer Schrift
  const inhaltsFarbe = istPrimaer ? farben.primaerText : istGefahr ? farben.fehler : farben.primaer;
  return (
    <Pressable
      onPress={onPress}
      disabled={deaktiviert || laedt}
      accessibilityRole="button"
      accessibilityLabel={titel}
      style={({ pressed }) => [
        styles.button,
        istPrimaer && styles.primaer,
        variante === 'sekundaer' && styles.sekundaer,
        istGefahr && styles.gefahr,
        (deaktiviert || laedt) && styles.deaktiviert,
        pressed && !(deaktiviert || laedt) && styles.gedrueckt,
      ]}
    >
      {laedt ? (
        <ActivityIndicator color={inhaltsFarbe} />
      ) : (
        <View style={styles.zeile}>
          {ikone ? <Ikone name={ikone} farbe={inhaltsFarbe} /> : null}
          <Text style={[styles.text, { color: inhaltsFarbe }]}>{titel}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: TOUCH_TARGET,
    borderRadius: ecke,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: abstand.l,
    paddingVertical: abstand.s,
  },
  zeile: { flexDirection: 'row', alignItems: 'center', gap: abstand.xs + 2 },
  // Tinten-Rahmen + harter Versatz-Schatten wie `.cta` auf der Webseite;
  // beim Drücken rutscht der Knopf in den Schatten (wie dort beim Hover)
  primaer: { backgroundColor: farben.primaerFuellung, borderWidth: 2, borderColor: farben.tinte, boxShadow: '4px 4px 0px #21211D' },
  sekundaer: { backgroundColor: farben.flaeche, borderWidth: 2, borderColor: farben.tinte, boxShadow: '4px 4px 0px #21211D' },
  gefahr: { backgroundColor: farben.flaeche, borderWidth: 2, borderColor: farben.fehler },
  deaktiviert: { opacity: 0.4, boxShadow: 'none' },
  gedrueckt: { transform: [{ translateX: 2 }, { translateY: 2 }], boxShadow: '2px 2px 0px #21211D' },
  text: { fontFamily: schriftart.serif, fontSize: schrift.gross, fontWeight: '700', textAlign: 'center' },
});
