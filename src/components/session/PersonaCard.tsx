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
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              <User className="h-6 w-6" />
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
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 bg-primary">
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
            <p className="text-sm text-muted-foreground">
              {persona.description}
            </p>
            {showDetails && (
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                {persona.background}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
