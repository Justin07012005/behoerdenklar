# Wie BehördenKlar gegenüber einem allgemeinen KI-Chatbot nützlicher wird

> **Zweck dieses Dokuments:** Eine konkrete Produktthese und ein kleiner, testbarer Plan. Das ist keine Behauptung, dass BehördenKlar schon alle beschriebenen Fähigkeiten hat. Es trennt den heutigen Funktionsumfang von möglichen nächsten Schritten.

## Kurzfassung

BehördenKlar sollte nicht versuchen, „ein besserer ChatGPT“ zu sein. Ein allgemeiner Chatbot kann bereits Briefe erklären, übersetzen und Antworttexte formulieren. Diese Fähigkeiten allein sind deshalb kein überzeugender Unterschied.

Die Produktchance liegt darin, Menschen **vom unverständlichen Brief zum nachvollziehbaren nächsten Schritt** zu begleiten:

1. Was steht nachweisbar im Brief?
2. Was soll die Person tun und bis wann?
3. Welche Information ist unklar oder fehlt?
4. Was kann die Person jetzt tun — etwa den Brief prüfen, eine Rückfrage vorbereiten oder Hilfe holen?
5. Woran kann sie jede wichtige Aussage überprüfen?

**Produktversprechen als Arbeitshypothese:**

> BehördenKlar macht aus einem Behördenbrief einen verständlichen, überprüfbaren Handlungsplan — und sagt ehrlich, wenn der Brief nicht genug Informationen enthält.

Das Versprechen muss durch Nutzertests belegt werden. Es ist kein Anspruch, Rechtsberatung zu leisten oder Entscheidungen der Behörde vorherzusagen.

## Warum „Die KI erfindet nichts“ allein nicht reicht

Nicht zu raten ist wichtig für Vertrauen und Sicherheit. Für Beratende beantwortet es aber noch nicht die zentrale Frage: **Welche Arbeit wird dadurch einfacher oder besser?** Ein Chatbot kann ebenfalls angewiesen werden, vorsichtig zu antworten.

Darum sollte die Aussage in einen konkreten Arbeitsnutzen übersetzt werden:

> Wenn ein Brief eine Anforderung offenlässt, markiert BehördenKlar die Lücke, zeigt den relevanten Wortlaut und hilft, eine gezielte Rückfrage vorzubereiten. Die App behauptet nicht, die fehlenden Anforderungen zu kennen.

Der mögliche Nutzen ist weniger Zeit beim Sortieren eines Briefes, schnelleres Erkennen offener Punkte und eine bessere Grundlage für das Gespräch zwischen ratsuchender Person und Beratung. Ob das tatsächlich Zeit spart, muss ein Pilot zeigen.

## Was heute schon da ist — und was noch nicht

Laut aktuellem Projektumfang kann BehördenKlar unter anderem einen Brief analysieren, eine kurze und ausführliche Erklärung anzeigen, Fristen und Checklistenpunkte herausziehen, übersetzen, vorlesen und beim Erstellen eines Antwortentwurfs helfen. Es gibt zudem eine Fristenübersicht und ein Archiv.

Das ist eine gute Grundlage. Es bedeutet aber **nicht automatisch**, dass die App Anforderungen zuverlässig mit konkreten Textstellen belegt, Dokumente auf Vollständigkeit prüft oder einen Antrag durchgehend begleitet. Diese Fähigkeiten sollten nicht versprochen werden, bevor sie umgesetzt und getestet sind.

Der erste Produktfortschritt muss daher nicht „mehr KI“ sein. Er kann darin bestehen, die vorhandenen Ergebnisse als klaren Ablauf zu ordnen und Unsicherheit sichtbar zu machen.

## Ein konkreter Anwendungsfall

Ein Brief enthält den Satz:

> „Bitte reichen Sie geeignete Nachweise ein.“

Der Brief sagt aber nicht, welche Nachweise geeignet sind.

Ein allgemeiner Chatbot könnte eine plausible Liste nennen. Das kann hilfreich klingen, wäre aber ohne weitere Informationen möglicherweise falsch. BehördenKlar sollte stattdessen unterscheiden zwischen dem, was im Brief steht, dem, was sich daraus nicht ergibt, und den möglichen nächsten Schritten.

### Beispiel für die Darstellung

```text
WAS DIE BEHÖRDE VERLANGT

„Bitte reichen Sie geeignete Nachweise ein.“

Welche Nachweise genau gemeint sind, steht in diesem Brief nicht.

Frist erkannt: 18. November
Bitte am Originalbrief prüfen.

Mögliche nächste Schritte
[Älteren Brief hinzufügen]
[Frage an die Behörde vorbereiten]
[Mit einer Beratungsstelle besprechen]

Warum zeigt die App das?
[Wortlaut im Brief ansehen]
```

Falls der Brief auf ein früheres Schreiben oder eine Anlage verweist, kann die App das kenntlich machen und fragen, ob dieses Dokument vorliegt. Sie sollte keine Unterlagenliste als persönliche Anforderung ausgeben, nur weil sie für einen ähnlichen Fall typisch wäre.

Eine Rückfrage könnte als **prüfbarer Entwurf** angeboten werden:

> Betreff: Rückfrage zu Ihrem Schreiben vom [Datum]  
> In Ihrem Schreiben bitten Sie mich, geeignete Nachweise einzureichen. Können Sie mir bitte mitteilen, welche konkreten Unterlagen Sie benötigen? Mein Aktenzeichen lautet [Aktenzeichen].

Die Person muss den Entwurf prüfen und selbst entscheiden, ob sie ihn verwendet und versendet.

## Abgrenzung zu einem allgemeinen Chatbot

| Allgemeiner Chatbot | Möglicher Schwerpunkt von BehördenKlar |
|---|---|
| Beantwortet eine eingegebene Frage | Führt durch einen wiederkehrenden Ablauf vom Brief bis zum nächsten Schritt |
| Nutzer muss oft selbst erkennen, was wichtig ist | Hebt Handlung, Frist und offene Frage getrennt hervor |
| Antwort kann überzeugend klingen, ohne sichtbar am Brief belegt zu sein | Verknüpft wichtige Aussagen mit dem Wortlaut im Brief — sofern diese Verknüpfung technisch verlässlich umgesetzt ist |
| Gespräch und Aufgaben können auseinanderfallen | Hält offene und erledigte Schritte beim jeweiligen Brief fest — falls diese Speicherung ergänzt wird |
| Kann allgemeine Informationen liefern | Macht sichtbar, ob etwas ausdrücklich im Brief steht, nur allgemeine Orientierung ist oder offenbleibt |

Das ist kein uneinholbarer technischer Schutzwall. Andere Produkte können ähnliche Funktionen bauen. Ein langfristiger Vorteil müsste aus einer zuverlässig gepflegten Informationsbasis, einem gut getesteten Ablauf, Zugänglichkeit, Vertrauen und echter Nutzung in einem bestimmten Umfeld entstehen. Diese Dinge muss BehördenKlar erst aufbauen.

## Vorschlag für die Produktstruktur

Die bestehende Grundnavigation mit Übersicht/Fristen, Scan und Archiv kann zunächst bleiben. Statt eine große neue Plattform zu bauen, sollte zuerst die Detailseite eines analysierten Briefes handlungsorientierter werden.

### 1. Übersicht: Was ist als Nächstes offen?

Die Fristenübersicht könnte offene Vorgänge zeigen, nicht nur Briefe nach Datum:

```text
ALS NÄCHSTES
Unterlagen nachreichen
Frist aus dem Brief erkannt: 18. November
[Brief öffnen] [Als erledigt markieren]

WEITERE OFFENE PUNKTE
• Rückfrage zu einem Bescheid vorbereiten
• Termin am 2. Dezember

[+ Brief scannen]
```

Eine Aufgabe darf nur dann mit einer konkreten Handlung benannt werden, wenn die Analyse diese Handlung aus dem Brief belegen kann. Bei Unsicherheit muss die Übersicht „Bitte prüfen“ oder „Anforderung unklar“ anzeigen statt Gewissheit vorzutäuschen.

### 2. Briefdetail: Handlung zuerst, Erklärung bei Bedarf

Vorgeschlagene Reihenfolge:

1. **Nächster Schritt** — höchstens ein kurzer Satz.
2. **Frist oder Termin** — mit Datum und Hinweis, ob erkannt oder manuell bestätigt.
3. **Offene Punkte** — konkret, antippbar und als offen/erledigt speicherbar.
4. **Warum zeigt die App das?** — relevanter Originalwortlaut und Möglichkeit, den Briefabschnitt anzusehen.
5. **Was bedeutet der Brief?** — kurze Erklärung; ausführlichere Erklärung einklappbar.
6. **Werkzeuge** — Übersetzung, Vorlesen, Glossar und Antwortentwurf.

Das reduziert nicht die verfügbare Hilfe, sondern zeigt zuerst das, was für die nächste Handlung gebraucht wird.

### 3. Unsicherheit als eigener Zustand

Nicht jede Analyse passt in „Aufgabe erkannt“ oder „keine Aufgabe“. Denkbare Zustände:

- **Im Brief klar genannt:** Wortlaut und erkannte Handlung anzeigen.
- **Teilweise klar:** Handlung anzeigen, aber fehlende Einzelheiten ausdrücklich benennen.
- **Unklar:** keine konkrete Dokumentenanforderung erfinden; Rückfrage oder Beratung anbieten.
- **Erkennung unsicher:** Originalstelle prüfen lassen, bevor eine Frist oder Handlung als verlässlich dargestellt wird.
- **Keine Frist gefunden:** nicht automatisch behaupten, dass es keine Frist gibt; „In der Analyse wurde keine Frist erkannt“ ist präziser.

Die konkrete Sprache und Darstellung müssen mit Nutzenden getestet werden. Farben allein reichen nicht; Unsicherheit muss zusätzlich mit verständlichem Text erklärt werden.

## Funktionsideen nach Priorität

### Priorität 1: Vorhandenes in einen klaren Handlungsablauf verwandeln

- Eine Karte „Dein nächster Schritt“ an den Anfang der Analyse setzen.
- Frist, Handlung und Erklärung visuell voneinander trennen.
- Lange Erklärung, Fachbegriffe und weitere Details zunächst einklappen.
- Unklare oder unsichere Ergebnisse ausdrücklich kennzeichnen.
- Aufgabenstatus (offen/erledigt) dauerhaft beim Brief speichern und in der Übersicht zeigen.

### Priorität 2: Aussagen überprüfbar machen

- Für erkannte Fristen und Handlungen die passende Textstelle im Originalbrief zugänglich machen.
- Erkennt die App keine zuverlässige Stelle, darf sie keinen Quellenbeleg vortäuschen.
- Unterschied zwischen „steht im Brief“ und „allgemeine Orientierung“ klar beschriften.
- Korrekturen durch Nutzende ermöglichen, zum Beispiel ein Datum ändern oder eine Aufgabe als nicht zutreffend markieren.

### Priorität 3: Bei fehlenden Informationen sinnvoll weiterhelfen

- Verweise wie „siehe unser Schreiben vom …“ erkennen und nach dem früheren Brief fragen.
- Eine neutrale Rückfrage mit Aktenzeichen und Bezug zum Schreiben vorbereiten.
- Bei knapper Frist oder besonders folgenreichen/unklaren Situationen auf menschliche Unterstützung hinweisen.
- Vor dem Teilen oder Übermitteln sensibler Dokumente ausdrücklich erklären, was wohin gesendet wird, und Einwilligung einholen.

### Später prüfen: Eng begrenzte Hilfe für einen bestimmten Antrag

Eine Schritt-für-Schritt-Begleitung für einen bestimmten Antrag könnte später sinnvoll sein. Sie sollte erst nach Gesprächen mit Betroffenen und Beratenden ausgewählt werden — nicht allein nach technischer Machbarkeit.

Für einen Pilot müssten mindestens feststehen:

- ein bestimmter Antrag und ein klar abgegrenztes Gebiet;
- offizielle, aktuelle Quellen und eine verantwortliche Pflege der Inhalte;
- klare Trennung zwischen allgemeinen Voraussetzungen und Anforderungen im Einzelfall;
- ein Verfahren für Änderungen, Ausnahmen und Fälle, die nicht in den Standardablauf passen;
- Datenschutz-, Barrierefreiheits- und fachliche Prüfung.

Die App sollte nicht behaupten, einen Anspruch verbindlich festzustellen oder einen Antrag garantiert vollständig zu machen.

## Wie die Idee Beratenden vorgestellt werden kann

Nicht mit einer langen Funktionsliste anfangen. Einen konkreten Brief zeigen und sagen:

> „BehördenKlar versucht nicht, Ihre fachliche Einschätzung zu ersetzen. Es bereitet den Brief vor: Was wird ausdrücklich verlangt, welche Frist wurde erkannt und was bleibt unklar? Bei einer offenen Anforderung wie ‚geeignete Nachweise‘ erfindet es keine Liste, sondern zeigt die Lücke und kann eine gezielte Rückfrage vorbereiten. Würde dieser Ablauf in einem Ihrer echten Gespräche Zeit sparen — und an welcher Stelle wäre er noch zusätzliche Arbeit?“

Dann sollten Beratende einen konkreten, datenschutzgerecht vorbereiteten Fall mit einem klickbaren Prototyp durchspielen. Die wichtigste Frage ist nicht, ob die Idee grundsätzlich gut klingt, sondern ob der Ablauf eine reale Aufgabe erleichtert.

## Validierungsplan vor größerer Entwicklung

### Gespräche und Beobachtung

Mit Beratenden und — soweit passend und freiwillig — Ratsuchenden konkrete Situationen besprechen:

- Welche Briefe erzeugen besonders häufig Rückfragen?
- Welche Schritte kosten in der Beratung am meisten Zeit?
- Was muss eine beratende Person auf jeden Fall selbst kontrollieren?
- Wann hilft eine einfache Erklärung, und wann ist sie nur mehr Text?
- Wie wird heute mit unklaren Anforderungen und fehlenden Vorbriefen umgegangen?
- Wäre eine vorbereitete Rückfrage nützlich, oder wird sie ohnehin schnell selbst formuliert?

Keine sensiblen echten Briefe ohne geeignete Einwilligung und Datenschutzvorkehrungen sammeln oder in Tests verwenden.

### Prototyp-Test

Einen klickbaren Prototyp mit mindestens drei Fällen testen:

1. klare Handlung und klare Frist;
2. fehlende Details, etwa „geeignete Nachweise“;
3. möglicher Verweis auf ein früheres Schreiben oder unsicher erkannte Frist.

Beobachten, ob die Person ohne lange Erklärung erkennt:

- was laut Brief verlangt wird;
- was unklar bleibt;
- was sie als Nächstes tun kann;
- welche Information sie vor einer Entscheidung prüfen muss.

### Erfolg nicht nur an KI-Nutzung messen

Mögliche Pilot-Kennzahlen:

- Zeit bis die Person den nächsten Schritt in eigenen Worten erklären kann;
- Anteil der kritischen Aussagen, die korrekt zur passenden Briefstelle führen;
- Anteil erkannter Fristen, die im Original bestätigt werden;
- wie oft die App eine unklare Anforderung korrekt als unklar kennzeichnet;
- wie oft Nutzende oder Beratende die vorgeschlagene nächste Handlung ändern müssen;
- ob der Ablauf im Beratungsgespräch tatsächlich Zeit spart oder zusätzliche Arbeit erzeugt.

Vor dem Pilot sollten Ausgangswerte und ein realistisches Ziel mit den Beteiligten vereinbart werden. Keine Erfolgszahlen erfinden oder aus einer kleinen Demo verallgemeinern.

## Nicht als Erstes bauen

- Einen freien Chatbot, der „alles über Behörden“ beantworten soll.
- Eine Liste typischer Dokumente als scheinbar persönliche Anforderung ausgeben.
- Einen kompletten Antrag für viele Ämter und Regionen gleichzeitig.
- Automatisches Absenden von Schreiben ohne bewusste Prüfung und Freigabe.
- Eine Garantie, dass Fristen, Ansprüche oder Unterlagen vollständig und rechtlich korrekt erkannt werden.
- Weitere KI-Funktionen hinzufügen, bevor klar ist, welche konkrete Aufgabe sie verbessern.

## Nächste drei Schritte

1. Mit zwei bis fünf Beratenden je einen konkreten Fall und den heutigen Ablauf besprechen.
2. Eine einzige Ergebnisansicht als klickbaren Prototyp bauen: **Nächster Schritt / Frist / offen oder unklar / Originalstelle / passende Aktion**.
3. Den Prototyp mit klaren, unklaren und fehleranfälligen Beispielen testen und nur dann implementieren, wenn er den Ablauf nachweisbar verbessert.

## Leitlinie

> BehördenKlar ist nicht nützlicher, weil es KI verwendet oder verspricht, nichts zu erfinden. Es wird nützlicher, wenn Menschen schneller verstehen, was ein Brief ausdrücklich sagt, was offenbleibt und welchen überprüfbaren nächsten Schritt sie gehen können.
