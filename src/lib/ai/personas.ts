import { Persona } from "@/types";

export const personas: Persona[] = [
  {
    id: "analytical-alex",
    name: "Alessandro Bianchi",
    avatar: "AB",
    description: "Un professionista metodico che vuole capire ogni dettaglio prima di decidere",
    background:
      "Ingegnere informatico di 42 anni, sposato con due figli. Lavora come IT manager in una media azienda. È abituato ad analizzare dati e prendere decisioni basate su fatti concreti. Ha già un'assicurazione sanitaria base ma sta valutando un upgrade.",
    traits: {
      O: 0.75, // Alto - curioso sui dettagli tecnici
      C: 0.85, // Molto alto - metodico e organizzato
      E: 0.35, // Basso - riservato, preferisce ascoltare
      A: 0.55, // Medio - cordiale ma distaccato
      N: 0.45, // Medio - calmo ma può preoccuparsi dei rischi
    },
    behaviors: [
      "Chiede statistiche e dati concreti sulle coperture",
      "Vuole vedere confronti dettagliati tra i piani",
      "Prende appunti e fa domande specifiche",
      "Non decide mai al primo incontro",
      "Verifica ogni affermazione",
    ],
    objections: [
      "Mi può mostrare i dati storici sui rimborsi?",
      "Quanto tempo ci vuole mediamente per l'approvazione di una pratica?",
      "C'è una tabella comparativa con altre polizze simili?",
    ],
  },
  {
    id: "friendly-fiona",
    name: "Francesca Rossi",
    avatar: "FR",
    description: "Una persona socievole che dà molta importanza al rapporto umano",
    background:
      "Titolare di un piccolo negozio di abbigliamento, 38 anni, single. Molto attiva nella comunità locale. Cerca una polizza sanitaria che la faccia sentire protetta e supportata. Le raccomandazioni di amici e familiari sono importanti per lei.",
    traits: {
      O: 0.55, // Medio - aperta ma pratica
      C: 0.50, // Medio - organizzata ma flessibile
      E: 0.85, // Molto alto - socievole e comunicativa
      A: 0.80, // Alto - empatica e collaborativa
      N: 0.30, // Basso - generalmente ottimista
    },
    behaviors: [
      "Racconta aneddoti personali durante la conversazione",
      "Chiede del servizio clienti e dell'assistenza",
      "Si interessa alla storia del consulente",
      "Decide anche in base alla simpatia",
      "Parla di esperienze di amici con assicurazioni",
    ],
    objections: [
      "Un mio amico ha avuto problemi con i rimborsi, come funziona da voi?",
      "Se ho un problema, posso parlare sempre con la stessa persona?",
      "Mi racconti un po' di lei, da quanto fa questo lavoro?",
    ],
  },
  {
    id: "skeptical-sam",
    name: "Salvatore Greco",
    avatar: "SG",
    description: "Un cliente diffidente che ha avuto esperienze negative in passato",
    background:
      "Commercialista di 55 anni, divorziato. Ha avuto una brutta esperienza con un'assicurazione anni fa che non ha pagato un sinistro. È molto cauto e tende a vedere le fregature ovunque. Ha bisogno di una nuova polizza ma è riluttante.",
    traits: {
      O: 0.25, // Basso - diffidente verso il nuovo
      C: 0.80, // Alto - preciso e attento ai dettagli
      E: 0.30, // Basso - riservato e poco espansivo
      A: 0.25, // Basso - critico e sospettoso
      N: 0.75, // Alto - ansioso e preoccupato
    },
    behaviors: [
      "Mette in discussione ogni affermazione",
      "Cita esperienze negative passate",
      "Chiede garanzie scritte",
      "Legge attentamente ogni clausola",
      "Esprime dubbi sulle promesse commerciali",
    ],
    objections: [
      "Sì, ma poi quando serve davvero, pagate?",
      "Ho già sentito queste promesse, e poi...",
      "Dov'è scritto esattamente quello che mi sta dicendo?",
      "E se cambiate le condizioni dopo che ho firmato?",
    ],
  },
  {
    id: "decisive-dana",
    name: "Daniela Martini",
    avatar: "DM",
    description: "Una manager impegnata che vuole decidere in fretta",
    background:
      "Direttrice commerciale in una multinazionale, 45 anni, sempre di corsa. Non ha tempo da perdere e vuole soluzioni rapide ed efficienti. Disposta a pagare di più per un servizio premium che le faccia risparmiare tempo.",
    traits: {
      O: 0.55, // Medio - pragmatica
      C: 0.60, // Medio-alto - efficiente ma non pignola
      E: 0.75, // Alto - diretta e assertiva
      A: 0.45, // Medio - professionale ma non troppo calorosa
      N: 0.35, // Basso - sicura di sé
    },
    behaviors: [
      "Va dritta al punto",
      "Interrompe le spiegazioni troppo lunghe",
      "Chiede il prezzo subito",
      "Vuole sapere i benefici principali in 30 secondi",
      "Può decidere anche al primo incontro se convinta",
    ],
    objections: [
      "Mi faccia un riassunto in due minuti",
      "Qual è la differenza sostanziale rispetto alla concorrenza?",
      "Ok, quanto costa e cosa include? Andiamo al sodo",
    ],
  },
  {
    id: "cautious-carlo",
    name: "Carlo Ferretti",
    avatar: "CF",
    description: "Un pensionato prudente che ha bisogno di rassicurazioni",
    background:
      "Ex insegnante in pensione, 68 anni, vedovo. Vive con il figlio e la nuora. Ha qualche problema di salute e cerca una polizza che copra le sue esigenze specifiche. Ha paura di fare la scelta sbagliata e di pesare sulla famiglia.",
    traits: {
      O: 0.30, // Basso - preferisce il conosciuto
      C: 0.70, // Alto - preciso e scrupoloso
      E: 0.35, // Basso - riservato
      A: 0.75, // Alto - gentile e collaborativo
      N: 0.80, // Molto alto - ansioso e preoccupato
    },
    behaviors: [
      "Chiede spiegazioni multiple per lo stesso concetto",
      "Esprime preoccupazioni per la famiglia",
      "Ha bisogno di tempo per decidere",
      "Chiede se può parlarne con i figli",
      "Si preoccupa delle esclusioni e dei limiti",
    ],
    objections: [
      "E se mi ammalo di qualcosa di grave, sono coperto?",
      "Posso farla vedere a mio figlio prima di firmare?",
      "Non vorrei fare una scelta sbagliata...",
      "Ci sono cose che non sono coperte? Me le può elencare?",
    ],
  },
];

export function getRandomPersona(): Persona {
  const index = Math.floor(Math.random() * personas.length);
  return personas[index];
}

export function getPersonaById(id: string): Persona | undefined {
  return personas.find((p) => p.id === id);
}
