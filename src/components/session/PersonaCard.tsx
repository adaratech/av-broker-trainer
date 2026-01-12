"use client";

import { Persona } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonaCardProps {
  persona: Persona | null;
  showDetails?: boolean;
}

export function PersonaCard({ persona, showDetails = false }: PersonaCardProps) {
  if (!persona) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground">
                Nessun cliente
              </div>
              <div className="text-xs text-muted-foreground">
                Avvia una sessione per iniziare
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden relative">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary/70 to-primary/40" />

      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
              <span className="text-xl font-serif font-medium text-primary">
                {persona.avatar}
              </span>
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-card flex items-center justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <span className="font-semibold text-lg leading-tight block">
                  {persona.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Cliente virtuale
                </span>
              </div>
              <Badge
                variant="outline"
                className="text-[10px] px-2 py-0.5 bg-primary/5 border-primary/20 text-primary"
              >
                <Briefcase className="h-3 w-3 mr-1" />
                Attivo
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              {persona.description}
            </p>
          </div>
        </div>

        {/* Details section */}
        {showDetails && persona.background && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-start gap-2 p-3 rounded-md bg-muted/50 border border-border/50">
              <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Background
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {persona.background}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
      </div>
    </Card>
  );
}
