"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ConversationPanelProps {
  messages: Message[];
  interimTranscript?: string;
  streamingContent?: string;
  personaName?: string;
}

export function ConversationPanel({
  messages,
  interimTranscript,
  streamingContent,
  personaName = "Cliente",
}: ConversationPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, interimTranscript, streamingContent]);

  return (
    <Card className="flex flex-col h-full border">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          Conversazione
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea
          ref={scrollRef}
          className="h-full px-5 py-4"
          style={{ maxHeight: "calc(100% - 1rem)" }}
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2.5",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className={cn(
                    "text-xs font-medium mb-1",
                    message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {message.role === "user" ? "Tu (Broker)" : personaName}
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {/* Streaming AI response */}
            {streamingContent && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="max-w-[80%] rounded-lg px-4 py-2.5 bg-muted">
                  <div className="text-xs font-medium mb-1 text-muted-foreground">
                    {personaName}
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {streamingContent}
                    <span className="inline-block w-1.5 h-4 bg-primary/50 animate-pulse ml-1 rounded-sm" />
                  </p>
                </div>
              </div>
            )}

            {/* Interim transcript (what user is saying) */}
            {interimTranscript && (
              <div className="flex gap-3 justify-end">
                <div className="max-w-[80%] rounded-lg px-4 py-2.5 bg-accent border border-primary/20">
                  <div className="text-xs font-medium mb-1 text-primary/70">
                    Tu (Broker)
                  </div>
                  <p className="text-sm italic text-foreground/70 leading-relaxed">
                    {interimTranscript}...
                  </p>
                </div>
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
