"use client";

import { Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react";
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
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative">
        {/* Pulse animation when listening */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse-ring" />
            <div
              className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse-ring"
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}

        <Button
          size="lg"
          variant={isListening ? "destructive" : "default"}
          className={cn(
            "relative h-20 w-20 rounded-full transition-all duration-200",
            isListening && "scale-110",
            isProcessing && "opacity-50 cursor-not-allowed"
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

      <div className="text-sm text-muted-foreground text-center min-h-[20px]">
        {isProcessing ? (
          "Elaborazione in corso..."
        ) : isListening ? (
          <span className="text-red-500 font-medium">In ascolto...</span>
        ) : isSpeaking ? (
          <span className="text-blue-500">Il cliente sta parlando...</span>
        ) : (
          "Premi per parlare"
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
        <div className="text-destructive text-sm text-center max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
}
