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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="font-semibold">Sessione di Training</h1>
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
      <main className="container mx-auto px-4 py-6">
        {session.status === "idle" ? (
          // Idle State
          <div className="max-w-2xl mx-auto text-center py-16">
            <h2 className="text-2xl font-bold mb-4">
              Pronto per iniziare il training?
            </h2>
            <p className="text-muted-foreground mb-8">
              Premi il pulsante qui sopra per iniziare una nuova sessione.
              <br />
              Un cliente virtuale con personalità casuale ti accoglierà.
            </p>
            <div className="p-8 border rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-4">Suggerimenti:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                <li>
                  • Assicurati che il microfono sia attivo e funzionante
                </li>
                <li>• Usa Chrome o Edge per la migliore esperienza</li>
                <li>• Parla chiaramente e attendi la risposta del cliente</li>
                <li>
                  • Osserva il pannello psicografico per adattare il tuo
                  approccio
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
                <div className="text-center p-8 border rounded-lg bg-muted/30">
                  <h3 className="font-semibold mb-2">Sessione terminata</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Hai completato la conversazione con {session.persona?.name}.
                    <br />
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
