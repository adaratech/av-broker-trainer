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
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Conversazione</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea
          ref={scrollRef}
          className="h-full px-6 pb-4"
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
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="text-xs font-medium mb-1 opacity-70">
                    {message.role === "user" ? "Tu (Broker)" : personaName}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {/* Streaming AI response */}
            {streamingContent && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                  <div className="text-xs font-medium mb-1 opacity-70">
                    {personaName}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">
                    {streamingContent}
                    <span className="inline-block w-2 h-4 bg-foreground/50 animate-pulse ml-1" />
                  </p>
                </div>
              </div>
            )}

            {/* Interim transcript (what user is saying) */}
            {interimTranscript && (
              <div className="flex gap-3 justify-end">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-primary/50 text-primary-foreground">
                  <div className="text-xs font-medium mb-1 opacity-70">
                    Tu (Broker)
                  </div>
                  <p className="text-sm italic opacity-80">
                    {interimTranscript}...
                  </p>
                </div>
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/50 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
