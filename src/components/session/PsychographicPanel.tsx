"use client";

import { OCEANTraits, TraitSignal } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  ClipboardCheck,
  Users,
  Heart,
  AlertTriangle,
} from "lucide-react";

interface PsychographicPanelProps {
  traits: Partial<OCEANTraits>;
  signals: TraitSignal[];
}

const traitConfig: Record<
  keyof OCEANTraits,
  {
    label: string;
    description: string;
    lowLabel: string;
    highLabel: string;
    icon: React.ElementType;
    color: string;
  }
> = {
  O: {
    label: "Apertura",
    description: "Apertura a nuove esperienze",
    lowLabel: "Tradizionale",
    highLabel: "Curioso",
    icon: Lightbulb,
    color: "bg-purple-500",
  },
  C: {
    label: "Coscienziosità",
    description: "Organizzazione e attenzione ai dettagli",
    lowLabel: "Spontaneo",
    highLabel: "Metodico",
    icon: ClipboardCheck,
    color: "bg-emerald-500",
  },
  E: {
    label: "Estroversione",
    description: "Socievolezza e assertività",
    lowLabel: "Riservato",
    highLabel: "Estroverso",
    icon: Users,
    color: "bg-yellow-500",
  },
  A: {
    label: "Amicalità",
    description: "Cooperazione e fiducia",
    lowLabel: "Critico",
    highLabel: "Collaborativo",
    icon: Heart,
    color: "bg-green-500",
  },
  N: {
    label: "Nevroticismo",
    description: "Tendenza all'ansia e preoccupazione",
    lowLabel: "Tranquillo",
    highLabel: "Ansioso",
    icon: AlertTriangle,
    color: "bg-red-500",
  },
};

function TraitBar({
  trait,
  value,
}: {
  trait: keyof OCEANTraits;
  value: number | undefined;
}) {
  const config = traitConfig[trait];
  const Icon = config.icon;
  const displayValue = value !== undefined ? Math.round(value * 100) : null;
  const isRevealed = displayValue !== null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{config.label}</span>
        </div>
        {isRevealed && (
          <Badge variant="outline" className="text-xs">
            {displayValue}%
          </Badge>
        )}
      </div>

      <div className="relative">
        {isRevealed ? (
          <Progress
            value={displayValue}
            className={cn("h-2", "[&>div]:transition-all [&>div]:duration-500")}
          />
        ) : (
          <div className="h-2 w-full rounded-full bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-pulse" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-muted-foreground">
              ?
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{config.lowLabel}</span>
        <span>{config.highLabel}</span>
      </div>
    </div>
  );
}

export function PsychographicPanel({
  traits,
  signals,
}: PsychographicPanelProps) {
  const recentSignals = signals.slice(-5);

  return (
    <Card className="h-full flex flex-col shadow-soft border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
            <Lightbulb className="h-4 w-4 text-purple-500" />
          </div>
          Profilo Psicografico
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Big Five (OCEAN) - I tratti emergono durante la conversazione
        </p>
      </CardHeader>
      <CardContent className="flex-1 space-y-6 pt-6">
        <div className="space-y-5">
          {(Object.keys(traitConfig) as (keyof OCEANTraits)[]).map((trait) => (
            <TraitBar key={trait} trait={trait} value={traits[trait]} />
          ))}
        </div>

        {recentSignals.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Segnali recenti
            </h4>
            <div className="space-y-2">
              {recentSignals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2"
                >
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full mt-1 flex-shrink-0",
                      traitConfig[signal.trait].color
                    )}
                  />
                  <span className="leading-relaxed">{signal.signal}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
