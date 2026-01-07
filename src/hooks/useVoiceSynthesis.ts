"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export interface UseVoiceSynthesisReturn {
  isSpeaking: boolean;
  isSupported: boolean;
  error: string | null;
  speak: (text: string) => void;
  stop: () => void;
  voices: SpeechSynthesisVoice[];
}

export function useVoiceSynthesis(): UseVoiceSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) {
        setError("Sintesi vocale non supportata in questo browser");
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "it-IT";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Try to find an Italian voice
      const italianVoice = voices.find(
        (voice) =>
          voice.lang.startsWith("it") &&
          (voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("alice") ||
            voice.name.toLowerCase().includes("federica"))
      );

      const anyItalianVoice = voices.find((voice) =>
        voice.lang.startsWith("it")
      );

      if (italianVoice) {
        utterance.voice = italianVoice;
      } else if (anyItalianVoice) {
        utterance.voice = anyItalianVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setError(null);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error("[SPEECH_SYNTHESIS_ERROR]", event);
        setError(`Errore sintesi vocale: ${event.error}`);
        setIsSpeaking(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, voices]
  );

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    isSpeaking,
    isSupported,
    error,
    speak,
    stop,
    voices,
  };
}
