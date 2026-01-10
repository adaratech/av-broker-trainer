"use client";

import { useState, useCallback, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useSession } from "@/hooks/useSession";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { useVoiceSynthesis } from "@/hooks/useVoiceSynthesis";
import { continueConversation } from "@/actions/conversation";

import { Button } from "@/components/ui/button";
import { VoiceControl } from "@/components/session/VoiceControl";
import { ConversationPanel } from "@/components/session/ConversationPanel";
import { PsychographicPanel } from "@/components/session/PsychographicPanel";
import { PersonaCard } from "@/components/session/PersonaCard";
import { SessionControls } from "@/components/session/SessionControls";

export default function SessionPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");

  const {
    session,
    startSession,
    endSession,
    addUserMessage,
    addAssistantMessage,
    updateTraits,
  } = useSession();

  const {
    isListening,
    isSupported: isVoiceInputSupported,
    transcript,
    interimTranscript,
    error: voiceError,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceInput();

  const {
    isSpeaking,
    isSupported: isVoiceSynthesisSupported,
    speak,
    stop: stopSpeaking,
  } = useVoiceSynthesis();

  // Speak the initial greeting when session starts
  useEffect(() => {
    if (session.status === "active" && session.messages.length === 1) {
      const greeting = session.messages[0];
      if (greeting.role === "assistant") {
        speak(greeting.content);
      }
    }
  }, [session.status, session.messages, speak]);

  // Handle sending message to AI
  const handleSendMessage = useCallback(
    async (userText: string) => {
      if (!session.persona || !userText.trim() || isProcessing) return;

      setIsProcessing(true);
      setStreamingContent("");

      // Add user message
      addUserMessage(userText.trim());

      try {
        const allMessages = [
          ...session.messages,
          {
            id: "temp",
            role: "user" as const,
            content: userText.trim(),
            timestamp: new Date(),
          },
        ];

        // Show loading indicator
        setStreamingContent("...");

        const result = await continueConversation(
          allMessages,
          session.persona
        );

        console.log("[CLIENT] Got result:", result);

        if (result) {
          // Add assistant message
          console.log("[CLIENT] Adding message with content:", result.content);
          addAssistantMessage(result.content);
          setStreamingContent("");

          // Update traits
          if (Object.keys(result.traits).length > 0) {
            updateTraits(result.traits, result.signals);
          }

          // Speak the response
          speak(result.content);
        }
      } catch (error) {
        console.error("[SEND_MESSAGE_ERROR]", error);
        setStreamingContent("");
      } finally {
        setIsProcessing(false);
      }
    },
    [
      session.persona,
      session.messages,
      isProcessing,
      addUserMessage,
      addAssistantMessage,
      updateTraits,
      speak,
    ]
  );

  // Handle voice input completion
  const handleStopListening = useCallback(() => {
    stopListening();
    if (transcript.trim()) {
      handleSendMessage(transcript);
      resetTranscript();
    }
  }, [stopListening, transcript, handleSendMessage, resetTranscript]);

  // Handle session restart
  const handleRestart = useCallback(() => {
    stopSpeaking();
    resetTranscript();
    setStreamingContent("");
    startSession();
  }, [stopSpeaking, resetTranscript, startSession]);

  // Push-to-talk with K key
  useEffect(() => {
    if (session.status !== "active") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // K key to start listening
      if (e.key.toLowerCase() === "k" && !e.repeat && !isListening && !isProcessing && !isSpeaking) {
        e.preventDefault();
        startListening();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // K key released - stop listening and send
      if (e.key.toLowerCase() === "k" && isListening) {
        e.preventDefault();
        handleStopListening();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [session.status, isListening, isProcessing, isSpeaking, startListening, handleStopListening]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <div className="h-5 w-px bg-border" />
            <h1 className="font-serif text-lg">Sessione di Training</h1>
          </div>
          <SessionControls
            status={session.status}
            onStart={startSession}
            onEnd={endSession}
            onRestart={handleRestart}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {session.status === "idle" ? (
          // Idle State
          <div className="max-w-xl mx-auto text-center py-16">
            <div className="h-16 w-16 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-8">
              <ArrowLeft className="h-8 w-8 text-primary rotate-180" />
            </div>
            <h2 className="font-serif text-3xl mb-4">
              Pronto per iniziare?
            </h2>
            <p className="text-muted-foreground mb-10">
              Premi il pulsante qui sopra per iniziare una nuova sessione.
              Un cliente virtuale con personalità casuale ti accoglierà.
            </p>
            <div className="p-6 rounded-lg border bg-card text-left">
              <h3 className="font-semibold mb-4">Suggerimenti</h3>
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Tieni premuto <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono border">K</kbd> per parlare
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Usa Chrome o Edge per la migliore esperienza
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Parla chiaramente e attendi la risposta del cliente
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Osserva il pannello psicografico per adattare il tuo approccio
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Active/Ended State
          <div className="grid lg:grid-cols-[1fr_350px] gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Persona Card */}
              <PersonaCard
                persona={session.persona}
                showDetails={session.status === "ended"}
              />

              {/* Conversation Panel */}
              <div className="h-[400px]">
                <ConversationPanel
                  messages={session.messages}
                  interimTranscript={isListening ? interimTranscript : undefined}
                  streamingContent={streamingContent || undefined}
                  personaName={session.persona?.name}
                />
              </div>

              {/* Voice Control */}
              {session.status === "active" && (
                <VoiceControl
                  isListening={isListening}
                  isSpeaking={isSpeaking}
                  isProcessing={isProcessing}
                  isSupported={isVoiceInputSupported && isVoiceSynthesisSupported}
                  onStartListening={startListening}
                  onStopListening={handleStopListening}
                  onStopSpeaking={stopSpeaking}
                  error={voiceError}
                />
              )}

              {/* Session Ended Message */}
              {session.status === "ended" && (
                <div className="text-center p-8 rounded-lg border bg-card">
                  <div className="h-12 w-12 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-6">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl mb-3">Sessione terminata</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Hai completato la conversazione con <span className="font-medium text-foreground">{session.persona?.name}</span>.
                    Rivedi il profilo psicografico emerso durante l&apos;interazione.
                  </p>
                  <Button onClick={handleRestart} className="gap-2">
                    Inizia nuova sessione
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column - Psychographic Panel */}
            <div className="lg:h-[calc(100vh-200px)] lg:sticky lg:top-24">
              <PsychographicPanel
                traits={session.revealedTraits}
                signals={session.traitSignals}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
