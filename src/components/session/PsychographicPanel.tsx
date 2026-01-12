"use client";

import { OCEANTraits, TraitSignal } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Eye,
  ClipboardList,
  MessageSquare,
  Heart,
  AlertCircle,
} from "lucide-react";

interface PsychographicPanelProps {
  traits: Partial<OCEANTraits>;
  signals: TraitSignal[];
}

const traitConfig: Record<
  keyof OCEANTraits,
  {
    label: string;
    letter: string;
    description: string;
    lowLabel: string;
    highLabel: string;
    icon: React.ElementType;
    gradient: string;
    color: string;
  }
> = {
  O: {
    label: "Apertura",
    letter: "O",
    description: "Apertura a nuove esperienze",
    lowLabel: "Tradizionale",
    highLabel: "Curioso",
    icon: Eye,
    gradient: "from-violet-500/20 to-purple-500/5",
    color: "text-violet-600",
  },
  C: {
    label: "Coscienziosità",
    letter: "C",
    description: "Organizzazione e attenzione",
    lowLabel: "Spontaneo",
    highLabel: "Metodico",
    icon: ClipboardList,
    gradient: "from-emerald-500/20 to-green-500/5",
    color: "text-emerald-600",
  },
  E: {
    label: "Estroversione",
    letter: "E",
    description: "Socievolezza e assertività",
    lowLabel: "Riservato",
    highLabel: "Estroverso",
    icon: MessageSquare,
    gradient: "from-amber-500/20 to-yellow-500/5",
    color: "text-amber-600",
  },
  A: {
    label: "Amicalità",
    letter: "A",
    description: "Cooperazione e fiducia",
    lowLabel: "Critico",
    highLabel: "Collaborativo",
    icon: Heart,
    gradient: "from-rose-500/20 to-pink-500/5",
    color: "text-rose-600",
  },
  N: {
    label: "Nevroticismo",
    letter: "N",
    description: "Tendenza all'ansia",
    lowLabel: "Tranquillo",
    highLabel: "Ansioso",
    icon: AlertCircle,
    gradient: "from-red-500/20 to-orange-500/5",
    color: "text-red-600",
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
    <div className="group">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={cn(
            "h-8 w-8 rounded-md flex items-center justify-center bg-gradient-to-br transition-all duration-300",
            config.gradient,
            isRevealed ? "scale-100" : "scale-95 opacity-50"
          )}
        >
          <Icon className={cn("h-4 w-4", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{config.label}</span>
            {isRevealed ? (
              <Badge
                variant="outline"
                className="text-[10px] font-mono px-1.5 py-0"
              >
                {displayValue}%
              </Badge>
            ) : (
              <span className="text-[10px] text-muted-foreground font-mono">
                ???
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="ml-11">
        {isRevealed ? (
          <div className="trait-progress">
            <div
              className="trait-progress-fill"
              style={{ width: `${displayValue}%` }}
            />
          </div>
        ) : (
          <div className="h-1.5 w-full rounded-full bg-muted relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer-sweep" />
          </div>
        )}

        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground">
            {config.lowLabel}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {config.highLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PsychographicPanel({
  traits,
  signals,
}: PsychographicPanelProps) {
  const recentSignals = signals.slice(-4);
  const revealedCount = Object.values(traits).filter(
    (v) => v !== undefined
  ).length;

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-3 border-b bg-gradient-to-r from-primary/5 to-transparent">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="flex-1">
            <span>Profilo Psicografico</span>
            <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">
              Big Five (OCEAN)
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  i < revealedCount ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-5 space-y-5">
        <div className="space-y-4">
          {(Object.keys(traitConfig) as (keyof OCEANTraits)[]).map((trait) => (
            <TraitBar key={trait} trait={trait} value={traits[trait]} />
          ))}
        </div>

        {recentSignals.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Segnali rilevati
            </h4>
            <div className="space-y-2">
              {recentSignals.map((signal, index) => {
                const config = traitConfig[signal.trait];
                return (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-xs p-2 rounded-md bg-muted/50 border border-border/50"
                  >
                    <div
                      className={cn(
                        "h-4 w-4 rounded flex-shrink-0 flex items-center justify-center text-[8px] font-bold",
                        `bg-gradient-to-br ${config.gradient}`
                      )}
                    >
                      <span className={config.color}>{config.letter}</span>
                    </div>
                    <span className="text-muted-foreground leading-relaxed flex-1">
                      {signal.signal}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {recentSignals.length === 0 && revealedCount === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground max-w-[200px]">
              I tratti emergeranno durante la conversazione
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
