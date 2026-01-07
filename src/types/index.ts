/** Big Five (OCEAN) personality traits */
export interface OCEANTraits {
  /** Openness to Experience (0-1) */
  O: number;
  /** Conscientiousness (0-1) */
  C: number;
  /** Extraversion (0-1) */
  E: number;
  /** Agreeableness (0-1) */
  A: number;
  /** Neuroticism (0-1) */
  N: number;
}

/** Trait signal extracted from AI response */
export interface TraitSignal {
  trait: keyof OCEANTraits;
  value: number;
  signal: string;
}

/** Virtual customer persona definition */
export interface Persona {
  id: string;
  name: string;
  avatar: string;
  description: string;
  background: string;
  traits: OCEANTraits;
  behaviors: string[];
  objections: string[];
}

/** Chat message in conversation */
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

/** Training session state */
export interface Session {
  id: string;
  status: "idle" | "active" | "ended";
  persona: Persona | null;
  messages: Message[];
  revealedTraits: Partial<OCEANTraits>;
  traitSignals: TraitSignal[];
  startedAt: Date | null;
  endedAt: Date | null;
}

/** AI response with trait analysis */
export interface AIResponse {
  content: string;
  traits: Partial<OCEANTraits>;
  signals: string[];
}

/** Voice input state */
export interface VoiceInputState {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  error: string | null;
}

/** Voice synthesis state */
export interface VoiceSynthesisState {
  isSpeaking: boolean;
  isSupported: boolean;
  error: string | null;
}
