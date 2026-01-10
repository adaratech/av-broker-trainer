"use client";

import { Mic, MicOff, VolumeX, Loader2 } from "lucide-react";
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
      <div className="flex flex-col items-center gap-2 p-4">
        <div className="text-destructive text-sm text-center">
          Il riconoscimento vocale non è supportato in questo browser.
          <br />
          Prova con Chrome o Edge.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6 rounded-lg border bg-card">
      <div className="relative">
        {/* Pulse animation when listening */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse-ring" />
            <div
              className="absolute inset-0 rounded-full bg-destructive/15 animate-pulse-ring"
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}

        <Button
          size="lg"
          variant={isListening ? "destructive" : "default"}
          className={cn(
            "relative h-20 w-20 rounded-full transition-all duration-200",
            isListening && "scale-105",
            isProcessing && "opacity-70 cursor-not-allowed"
          )}
          onClick={isListening ? onStopListening : onStartListening}
          disabled={isProcessing || isSpeaking}
        >
          {isProcessing ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : isListening ? (
            <MicOff className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>
      </div>

      <div className="text-sm text-center min-h-[20px]">
        {isProcessing ? (
          <span className="text-muted-foreground flex items-center gap-2">
            <Loader2 className="h-3 w-3 animate-spin" />
            Elaborazione...
          </span>
        ) : isListening ? (
          <span className="text-destructive flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            In ascolto...
          </span>
        ) : isSpeaking ? (
          <span className="text-primary flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Il cliente sta parlando...
          </span>
        ) : (
          <span className="text-muted-foreground">
            Premi per parlare o tieni premuto <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono border">K</kbd>
          </span>
        )}
      </div>

      {isSpeaking && (
        <Button
          size="sm"
          variant="outline"
          onClick={onStopSpeaking}
          className="gap-2"
        >
          <VolumeX className="h-4 w-4" />
          Interrompi
        </Button>
      )}

      {error && (
        <div className="text-destructive text-sm text-center max-w-xs bg-destructive/10 px-3 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
