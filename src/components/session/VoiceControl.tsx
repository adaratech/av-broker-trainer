"use client";

import { Mic, MicOff, VolumeX, Loader2, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceControlProps {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  isSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopSpeaking: () => void;
  error?: string | null;
}

export function VoiceControl({
  isListening,
  isSpeaking,
  isProcessing,
  isSupported,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  error,
}: VoiceControlProps) {
  if (!isSupported) {
    return (
      <div className="flex flex-col items-center gap-3 p-5 rounded-lg border border-destructive/30 bg-destructive/5">
        <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
          <MicOff className="h-5 w-5 text-destructive" />
        </div>
        <div className="text-destructive text-sm text-center">
          Il riconoscimento vocale non è supportato.
          <br />
          <span className="text-destructive/70">Prova con Chrome o Edge.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg border bg-card overflow-hidden">
      {/* Gradient top bar */}
      <div
        className={cn(
          "h-1 transition-all duration-300",
          isListening
            ? "bg-gradient-to-r from-red-500 via-red-400 to-red-500"
            : isSpeaking
              ? "bg-gradient-to-r from-primary via-primary/70 to-primary"
              : "bg-gradient-to-r from-muted via-muted-foreground/20 to-muted"
        )}
      />

      <div className="p-6">
        <div className="flex items-center justify-center gap-8">
          {/* Mic button */}
          <div className="relative">
            {/* Ripple effects when listening */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ripple" />
                <div
                  className="absolute inset-0 rounded-full bg-red-500/15 animate-ripple"
                  style={{ animationDelay: "0.4s" }}
                />
                <div
                  className="absolute inset-0 rounded-full bg-red-500/10 animate-ripple"
                  style={{ animationDelay: "0.8s" }}
                />
              </>
            )}

            <button
              onClick={isListening ? onStopListening : onStartListening}
              disabled={isProcessing || isSpeaking}
              className={cn(
                "relative h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
                isListening
                  ? "bg-red-500 text-white scale-110 mic-glow-recording focus:ring-red-500"
                  : "bg-primary text-primary-foreground hover:scale-105 focus:ring-primary",
                (isProcessing || isSpeaking) && "opacity-50 cursor-not-allowed"
              )}
            >
              {isProcessing ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : isListening ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Status area */}
          <div className="flex-1 max-w-xs">
            <div className="text-sm">
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                  <div>
                    <span className="font-medium">Elaborazione</span>
                    <span className="block text-xs text-muted-foreground">
                      Attendere...
                    </span>
                  </div>
                </div>
              ) : isListening ? (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  </div>
                  <div>
                    <span className="font-medium text-red-600">Registrando</span>
                    <span className="block text-xs text-muted-foreground">
                      Rilascia per inviare
                    </span>
                  </div>
                </div>
              ) : isSpeaking ? (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Radio className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <div>
                    <span className="font-medium text-primary">In riproduzione</span>
                    <span className="block text-xs text-muted-foreground">
                      Il cliente sta parlando
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="font-medium">Pronto</span>
                    <span className="block text-xs text-muted-foreground">
                      Tieni premuto{" "}
                      <kbd className="px-1 py-0.5 bg-background rounded text-[10px] font-mono border">
                        K
                      </kbd>{" "}
                      per parlare
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stop speaking button */}
          {isSpeaking && (
            <Button
              size="sm"
              variant="outline"
              onClick={onStopSpeaking}
              className="gap-2"
            >
              <VolumeX className="h-4 w-4" />
              Stop
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="px-6 pb-4">
          <div className="text-destructive text-xs text-center bg-destructive/5 border border-destructive/20 px-3 py-2 rounded">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}
