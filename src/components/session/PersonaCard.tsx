"use client";

import { Persona } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface PersonaCardProps {
  persona: Persona | null;
  showDetails?: boolean;
}

export function PersonaCard({ persona, showDetails = false }: PersonaCardProps) {
  if (!persona) {
    return (
      <Card className="border">
        <CardContent className="flex items-center gap-4 p-5">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-muted-foreground">
              Nessun cliente
            </div>
            <div className="text-sm text-muted-foreground">
              Avvia una sessione per iniziare
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border overflow-hidden">
      <div className="h-1 bg-primary" />
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {persona.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{persona.name}</span>
              <Badge variant="secondary" className="text-xs">
                Cliente virtuale
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {persona.description}
            </p>
            {showDetails && (
              <p className="text-xs text-muted-foreground mt-3 bg-muted rounded p-2">
                {persona.background}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
