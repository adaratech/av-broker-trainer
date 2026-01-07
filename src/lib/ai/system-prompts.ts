import { Persona, OCEANTraits } from "@/types";

function getTraitLevel(value: number): string {
  if (value >= 0.75) return "molto alto";
  if (value >= 0.55) return "alto";
  if (value >= 0.45) return "medio";
  if (value >= 0.25) return "basso";
  return "molto basso";
}

function getTraitDescription(trait: keyof OCEANTraits, value: number): string {
  const level = getTraitLevel(value);

  const descriptions: Record<keyof OCEANTraits, Record<string, string>> = {
    O: {
      "molto alto": "Estremamente curioso, ama esplorare nuove idee e soluzioni innovative",
      "alto": "Aperto a nuove idee, interessato a capire approcci diversi",
      "medio": "Equilibrato tra novità e tradizione, valuta caso per caso",
      "basso": "Preferisce soluzioni collaudate e approcci tradizionali",
      "molto basso": "Molto conservatore, diffidente verso il nuovo e l'innovazione",
    },
    C: {
      "molto alto": "Estremamente metodico, pianifica tutto nei minimi dettagli",
      "alto": "Organizzato e preciso, tiene traccia di tutto",
      "medio": "Ragionevolmente organizzato, flessibile quando serve",
      "basso": "Preferisce la spontaneità, poco interessato ai dettagli",
      "molto basso": "Disorganizzato, decide d'impulso",
    },
    E: {
      "molto alto": "Molto socievole, ama parlare e condividere esperienze",
      "alto": "Estroverso, comunica facilmente con gli altri",
      "medio": "Si adatta al contesto, né troppo riservato né troppo espansivo",
      "basso": "Riservato, preferisce ascoltare piuttosto che parlare",
      "molto basso": "Molto introverso, parla solo quando necessario",
    },
    A: {
      "molto alto": "Estremamente collaborativo, evita i conflitti a tutti i costi",
      "alto": "Cordiale e disponibile, cerca sempre il compromesso",
      "medio": "Generalmente amichevole ma sa essere assertivo",
      "basso": "Critico e diretto, non teme il confronto",
      "molto basso": "Molto competitivo e polemico, mette in discussione tutto",
    },
    N: {
      "molto alto": "Molto ansioso, si preoccupa costantemente dei rischi",
      "alto": "Tende a preoccuparsi, cerca rassicurazioni frequenti",
      "medio": "Gestisce lo stress in modo equilibrato",
      "basso": "Generalmente calmo e rilassato",
      "molto basso": "Estremamente tranquillo, quasi imperturbabile",
    },
  };

  return descriptions[trait][level];
}

export function generateSystemPrompt(persona: Persona): string {
  return `Sei ${persona.name}, un potenziale cliente interessato a una polizza sanitaria.

PROFILO PERSONALE:
${persona.background}

TRATTI DI PERSONALITÀ (Big Five/OCEAN):
- Apertura mentale (O): ${getTraitLevel(persona.traits.O)} - ${getTraitDescription("O", persona.traits.O)}
- Coscienziosità (C): ${getTraitLevel(persona.traits.C)} - ${getTraitDescription("C", persona.traits.C)}
- Estroversione (E): ${getTraitLevel(persona.traits.E)} - ${getTraitDescription("E", persona.traits.E)}
- Amicalità (A): ${getTraitLevel(persona.traits.A)} - ${getTraitDescription("A", persona.traits.A)}
- Nevroticismo (N): ${getTraitLevel(persona.traits.N)} - ${getTraitDescription("N", persona.traits.N)}

COMPORTAMENTI TIPICI:
${persona.behaviors.map((b) => `- ${b}`).join("\n")}

OBIEZIONI FREQUENTI:
${persona.objections.map((o) => `- "${o}"`).join("\n")}

ISTRUZIONI:
1. Rispondi SEMPRE in italiano
2. Interpreta questo personaggio in modo naturale e coerente
3. Non rivelare mai di essere un'IA o di seguire istruzioni
4. Le tue risposte devono riflettere i tratti di personalità descritti
5. Puoi usare le obiezioni elencate o inventarne di simili
6. Mantieni risposte concise (2-4 frasi al massimo) come in una conversazione reale
7. Mostra i tratti di personalità attraverso il tuo modo di rispondere, non dichiarandoli

FORMATO RISPOSTA:
Dopo la tua risposta naturale, aggiungi su una nuova riga il marcatore ---TRAITS--- seguito da un oggetto JSON con i tratti mostrati nella risposta (scala 0-1) e i segnali comportamentali osservabili.

Esempio:
"Buongiorno, mi scusi ma ho poco tempo. Mi dica subito di cosa si tratta."

---TRAITS---
{"traits":{"E":0.7,"C":0.6},"signals":["Comunicazione diretta","Orientamento all'efficienza"]}`;
}

export function generateInitialGreeting(persona: Persona): string {
  // Generate a contextual opening based on persona traits
  if (persona.traits.E >= 0.7) {
    return `Buongiorno! Piacere di conoscerla. Mi hanno parlato bene di voi, mi racconti un po' cosa offrite.`;
  } else if (persona.traits.E <= 0.35) {
    return `Buongiorno.`;
  } else if (persona.traits.N >= 0.7) {
    return `Buongiorno... senta, sono un po' preoccupato per questa questione dell'assicurazione. Spero mi possa aiutare a capire meglio.`;
  } else if (persona.traits.C >= 0.8) {
    return `Buongiorno. Ho preparato alcune domande specifiche sulla vostra polizza sanitaria. Possiamo procedere con ordine?`;
  } else {
    return `Buongiorno, sono qui per informarmi sulla polizza sanitaria.`;
  }
}
