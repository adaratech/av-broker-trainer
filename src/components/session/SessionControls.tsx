"use client";

import { Button } from "@/components/ui/button";
import { Play, Square, RotateCcw } from "lucide-react";

interface SessionControlsProps {
  status: "idle" | "active" | "ended";
  onStart: () => void;
  onEnd: () => void;
  onRestart: () => void;
}

export function SessionControls({
  status,
  onStart,
  onEnd,
  onRestart,
}: SessionControlsProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "idle" && (
        <Button onClick={onStart} className="gap-2">
          <Play className="h-4 w-4" />
          Inizia sessione
        </Button>
      )}

      {status === "active" && (
        <Button onClick={onEnd} variant="destructive" className="gap-2">
          <Square className="h-4 w-4" />
          Termina sessione
        </Button>
      )}

      {status === "ended" && (
        <Button onClick={onRestart} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Nuova sessione
        </Button>
      )}
    </div>
  );
}
