"use client";

import { useState, useCallback } from "react";
import { Session, Message, Persona, OCEANTraits, TraitSignal } from "@/types";
import { getRandomPersona } from "@/lib/ai/personas";
import { generateInitialGreeting } from "@/lib/ai/system-prompts";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function mergeTraits(
  existing: Partial<OCEANTraits>,
  newTraits: Partial<OCEANTraits>
): Partial<OCEANTraits> {
  const merged = { ...existing };

  for (const key of Object.keys(newTraits) as (keyof OCEANTraits)[]) {
    const newValue = newTraits[key];
    if (newValue !== undefined) {
      const existingValue = merged[key];
      if (existingValue !== undefined) {
        // Average with existing value, weighted towards more recent
        merged[key] = existingValue * 0.4 + newValue * 0.6;
      } else {
        merged[key] = newValue;
      }
    }
  }

  return merged;
}

export interface UseSessionReturn {
  session: Session;
  startSession: () => void;
  endSession: () => void;
  addUserMessage: (content: string) => Message;
  addAssistantMessage: (content: string) => Message;
  updateTraits: (traits: Partial<OCEANTraits>, signals: string[]) => void;
  isActive: boolean;
}

export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<Session>({
    id: generateId(),
    status: "idle",
    persona: null,
    messages: [],
    revealedTraits: {},
    traitSignals: [],
    startedAt: null,
    endedAt: null,
  });

  const startSession = useCallback(() => {
    const persona = getRandomPersona();
    const greeting = generateInitialGreeting(persona);
    const greetingMessage: Message = {
      id: generateId(),
      role: "assistant",
      content: greeting,
      timestamp: new Date(),
    };

    setSession({
      id: generateId(),
      status: "active",
      persona,
      messages: [greetingMessage],
      revealedTraits: {},
      traitSignals: [],
      startedAt: new Date(),
      endedAt: null,
    });
  }, []);

  const endSession = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      status: "ended",
      endedAt: new Date(),
    }));
  }, []);

  const addUserMessage = useCallback((content: string): Message => {
    const message: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setSession((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    return message;
  }, []);

  const addAssistantMessage = useCallback((content: string): Message => {
    const message: Message = {
      id: generateId(),
      role: "assistant",
      content,
      timestamp: new Date(),
    };

    setSession((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    return message;
  }, []);

  const updateTraits = useCallback(
    (traits: Partial<OCEANTraits>, signals: string[]) => {
      setSession((prev) => {
        const newSignals: TraitSignal[] = [];

        for (const key of Object.keys(traits) as (keyof OCEANTraits)[]) {
          const value = traits[key];
          if (value !== undefined) {
            const signalText =
              signals.length > 0
                ? signals[0]
                : `Tratto ${key} rilevato`;
            newSignals.push({
              trait: key,
              value,
              signal: signalText,
            });
          }
        }

        return {
          ...prev,
          revealedTraits: mergeTraits(prev.revealedTraits, traits),
          traitSignals: [...prev.traitSignals, ...newSignals].slice(-20), // Keep last 20 signals
        };
      });
    },
    []
  );

  return {
    session,
    startSession,
    endSession,
    addUserMessage,
    addAssistantMessage,
    updateTraits,
    isActive: session.status === "active",
  };
}
