"use server";

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { Message, Persona, OCEANTraits } from "@/types";
import { generateSystemPrompt } from "@/lib/ai/system-prompts";

export interface ConversationResult {
  content: string;
  traits: Partial<OCEANTraits>;
  signals: string[];
}

function parseAIResponse(fullResponse: string): ConversationResult {
  const traitMarker = "---TRAITS---";
  const markerIndex = fullResponse.indexOf(traitMarker);

  if (markerIndex === -1) {
    return {
      content: fullResponse.trim(),
      traits: {},
      signals: [],
    };
  }

  const content = fullResponse.substring(0, markerIndex).trim();
  const jsonPart = fullResponse.substring(markerIndex + traitMarker.length).trim();

  try {
    const parsed = JSON.parse(jsonPart);
    return {
      content,
      traits: parsed.traits || {},
      signals: parsed.signals || [],
    };
  } catch {
    return {
      content,
      traits: {},
      signals: [],
    };
  }
}

export async function continueConversation(
  messages: Message[],
  persona: Persona
) {
  const stream = createStreamableValue("");
  let fullResponse = "";

  const systemPrompt = generateSystemPrompt(persona);

  const formattedMessages = messages.map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));

  (async () => {
    try {
      const { textStream } = streamText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        messages: formattedMessages,
        temperature: 0.8,
        maxTokens: 500,
      });

      for await (const text of textStream) {
        fullResponse += text;

        // Only stream the content part (before ---TRAITS---)
        const traitMarker = "---TRAITS---";
        if (!fullResponse.includes(traitMarker)) {
          stream.update(fullResponse);
        } else {
          // Stop updating once we hit the trait marker
          const contentPart = fullResponse.substring(
            0,
            fullResponse.indexOf(traitMarker)
          );
          stream.update(contentPart.trim());
        }
      }

      stream.done();
    } catch (error) {
      console.error("[CONVERSATION_ERROR]", error);
      stream.error(error instanceof Error ? error : new Error("Unknown error"));
    }
  })();

  return {
    stream: stream.value,
    getResult: async (): Promise<ConversationResult> => {
      // Wait a bit for the stream to complete
      await new Promise((resolve) => setTimeout(resolve, 100));
      return parseAIResponse(fullResponse);
    },
  };
}

export async function generateResponse(
  messages: Message[],
  persona: Persona
): Promise<ConversationResult> {
  const systemPrompt = generateSystemPrompt(persona);

  const formattedMessages = messages.map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));

  try {
    const { text } = await streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages: formattedMessages,
      temperature: 0.8,
      maxTokens: 500,
    });

    const fullText = await text;
    return parseAIResponse(fullText);
  } catch (error) {
    console.error("[GENERATE_RESPONSE_ERROR]", error);
    throw error;
  }
}
