"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { User, MessageCircle } from "lucide-react";

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
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="pb-3 border-b bg-gradient-to-r from-muted/30 to-transparent">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-3.5 w-3.5 text-primary" />
          </div>
          <span>Conversazione</span>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground">
            {messages.length} msg
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea
          ref={scrollRef}
          className="h-full"
          style={{ maxHeight: "calc(100% - 1rem)" }}
        >
          <div className="px-4 py-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                      <span className="text-xs font-serif font-medium text-primary">
                        {personaName.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[80%] relative group",
                    message.role === "user"
                      ? "message-user text-primary-foreground px-4 py-3"
                      : "message-assistant px-4 py-3"
                  )}
                >
                  <div
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-wider mb-1.5",
                      message.role === "user"
                        ? "text-primary-foreground/60"
                        : "text-primary/70"
                    )}
                  >
                    {message.role === "user" ? "Tu" : personaName}
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  <span className="absolute -bottom-4 text-[9px] text-muted-foreground/50 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    #{index + 1}
                  </span>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Streaming AI response */}
            {streamingContent && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10 animate-pulse">
                    <span className="text-xs font-serif font-medium text-primary">
                      {personaName.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="max-w-[80%] message-assistant px-4 py-3">
                  <div className="text-[10px] font-medium uppercase tracking-wider mb-1.5 text-primary/70">
                    {personaName}
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {streamingContent}
                    <span className="inline-block w-1.5 h-4 bg-primary/60 ml-0.5 animate-cursor rounded-sm" />
                  </p>
                </div>
              </div>
            )}

            {/* Interim transcript (what user is saying) */}
            {interimTranscript && (
              <div className="flex gap-3 justify-end">
                <div className="max-w-[80%] rounded-lg px-4 py-3 bg-primary/5 border-2 border-dashed border-primary/30">
                  <div className="text-[10px] font-medium uppercase tracking-wider mb-1.5 text-primary/60">
                    Ascoltando...
                  </div>
                  <p className="text-sm italic text-foreground/70 leading-relaxed">
                    {interimTranscript}
                    <span className="inline-block w-1 h-3 bg-primary/40 ml-1 animate-pulse rounded-sm" />
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 border-2 border-dashed border-primary/40 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
            )}

            {/* Empty state */}
            {messages.length === 0 && !streamingContent && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  La conversazione apparirà qui
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
