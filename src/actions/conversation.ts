"use server";

import { generateText } from "ai";
import { Message, Persona, OCEANTraits } from "@/types";
import { generateSystemPrompt } from "@/lib/ai/system-prompts";
import { getAIProvider } from "@/lib/ai/provider";

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
): Promise<ConversationResult> {
  const systemPrompt = generateSystemPrompt(persona);

  const formattedMessages = messages.map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));

  try {
    const { model, name } = getAIProvider();
    console.log(`[SERVER] Calling ${name}...`);
    console.log("[SERVER] Messages count:", formattedMessages.length);

    const { text: fullText } = await generateText({
      model,
      system: systemPrompt,
      messages: formattedMessages,
      temperature: 0.8,
      maxTokens: 500,
    });

    console.log("[SERVER] Got full text (length):", fullText?.length);
    console.log("[SERVER] Full response:", fullText);

    const parsedResult = parseAIResponse(fullText || "");
    console.log("[SERVER] Parsed result:", JSON.stringify(parsedResult));

    return parsedResult;
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    throw error;
  }
}
