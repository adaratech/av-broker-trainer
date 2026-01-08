import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";
import { LanguageModelV1 } from "ai";

export type AIProvider = "openai" | "anthropic" | "google" | "groq";

interface ProviderConfig {
  provider: AIProvider;
  model: LanguageModelV1;
  name: string;
}

const PROVIDER_CONFIGS: Record<AIProvider, () => ProviderConfig> = {
  openai: () => ({
    provider: "openai",
    model: openai("gpt-4o"),
    name: "OpenAI GPT-4o",
  }),
  anthropic: () => ({
    provider: "anthropic",
    model: anthropic("claude-sonnet-4-20250514"),
    name: "Anthropic Claude Sonnet 4",
  }),
  google: () => ({
    provider: "google",
    model: google("gemini-2.0-flash"),
    name: "Google Gemini 2.0 Flash",
  }),
  groq: () => ({
    provider: "groq",
    model: groq("llama-3.3-70b-versatile"),
    name: "Groq Llama 3.3 70B",
  }),
};

export function getAIProvider(): ProviderConfig {
  const providerEnv = process.env.AI_PROVIDER as AIProvider | undefined;
  const provider: AIProvider = providerEnv || "openai"; // Default to OpenAI

  if (!PROVIDER_CONFIGS[provider]) {
    console.warn(`[AI_PROVIDER] Unknown provider "${provider}", falling back to Google`);
    return PROVIDER_CONFIGS.google();
  }

  const config = PROVIDER_CONFIGS[provider]();
  console.log(`[AI_PROVIDER] Using ${config.name}`);
  return config;
}

export function getAvailableProviders(): AIProvider[] {
  return Object.keys(PROVIDER_CONFIGS) as AIProvider[];
}
