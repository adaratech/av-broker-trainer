"use client";

import { useState, useCallback, useEffect } from "react";
import { ArrowLeft, Leaf, Play, RotateCcw, CheckCircle } from "lucide-react";
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
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
                <Leaf className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <span className="font-serif text-sm sm:text-base">Sessione di Training</span>
                <span className="hidden sm:block text-[10px] text-muted-foreground -mt-0.5">
                  {session.status === "active" && session.persona?.name}
                </span>
              </div>
            </div>
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
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 mb-6">
                <Play className="h-7 w-7 text-primary ml-1" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">
                Pronto per iniziare?
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Premi il pulsante qui sopra per iniziare una nuova sessione.
                Un cliente virtuale con personalità unica ti accoglierà.
              </p>
            </div>

            <div className="paper-card rounded-lg p-6 corner-accent">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-5 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Come funziona
              </h3>
              <ul className="space-y-4">
                {[
                  { key: "K", text: "Tieni premuto per parlare" },
                  { key: "Browser", text: "Usa Chrome o Edge per la migliore esperienza" },
                  { key: "Voice", text: "Parla chiaramente e attendi la risposta" },
                  { key: "OCEAN", text: "Osserva il pannello psicografico" },
                ].map((item, i) => (
                  <li key={item.key} className="flex items-start gap-4">
                    <div className="number-marker flex-shrink-0 h-6 w-6 text-xs">
                      <span>{i + 1}</span>
                    </div>
                    <div className="pt-0.5">
                      {item.key === "K" ? (
                        <span className="text-sm text-muted-foreground">
                          Tieni premuto{" "}
                          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono border">
                            K
                          </kbd>{" "}
                          per parlare
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">{item.text}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          // Active/Ended State
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              {/* Persona Card */}
              <PersonaCard
                persona={session.persona}
                showDetails={session.status === "ended"}
              />

              {/* Conversation Panel */}
              <div className="h-[380px] lg:h-[420px]">
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
                <div className="relative rounded-lg border bg-card overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500" />
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-green-500/10 border border-green-500/20 mb-5">
                      <CheckCircle className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="font-serif text-xl mb-2">Sessione completata</h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                      Hai completato la conversazione con{" "}
                      <span className="font-medium text-foreground">
                        {session.persona?.name}
                      </span>
                      . Rivedi il profilo psicografico emerso.
                    </p>
                    <Button onClick={handleRestart} className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Nuova sessione
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Psychographic Panel */}
            <div className="lg:h-[calc(100vh-160px)] lg:sticky lg:top-24">
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
