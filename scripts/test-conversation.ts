/**
 * Test script for conversation functionality
 * Run with: npx tsx scripts/test-conversation.ts
 */

import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface TestCase {
  name: string;
  messages: Message[];
  expectedBehavior: string;
}

// Simplified system prompt for testing
const TEST_SYSTEM_PROMPT = `Sei Francesca Rossi, una cliente italiana di 45 anni, proprietaria di un negozio di abbigliamento.
Stai parlando con un broker assicurativo. Rispondi in italiano in modo naturale e cordiale.

IMPORTANTE: Dopo ogni risposta, aggiungi su una nuova riga:
---TRAITS---
{"traits":{"O":0.5,"C":0.5,"E":0.8,"A":0.8,"N":0.3},"signals":["Descrizione del comportamento"]}`;

const testCases: TestCase[] = [
  {
    name: "Normal greeting",
    messages: [
      { id: "1", role: "assistant", content: "Buongiorno! Sono Francesca, come posso aiutarla?", timestamp: new Date() },
      { id: "2", role: "user", content: "Buongiorno, sono un broker assicurativo. Vorrei parlarle delle nostre polizze.", timestamp: new Date() },
    ],
    expectedBehavior: "Should respond naturally in Italian with trait markers",
  },
  {
    name: "Empty message handling",
    messages: [
      { id: "1", role: "assistant", content: "Buongiorno!", timestamp: new Date() },
      { id: "2", role: "user", content: "", timestamp: new Date() },
    ],
    expectedBehavior: "Should handle empty message gracefully",
  },
  {
    name: "Very short message",
    messages: [
      { id: "1", role: "assistant", content: "Buongiorno!", timestamp: new Date() },
      { id: "2", role: "user", content: "Sì", timestamp: new Date() },
    ],
    expectedBehavior: "Should respond appropriately to minimal input",
  },
  {
    name: "Long message with details",
    messages: [
      { id: "1", role: "assistant", content: "Buongiorno!", timestamp: new Date() },
      { id: "2", role: "user", content: "Buongiorno signora Rossi, mi chiamo Marco e lavoro per Assicurazioni Italia. Oggi vorrei presentarle una polizza completa che copre il suo negozio da furti, incendi, danni da acqua e responsabilità civile. Abbiamo anche opzioni per la copertura delle merci e dei dipendenti. Sarebbe interessata a sentire i dettagli?", timestamp: new Date() },
    ],
    expectedBehavior: "Should engage with the detailed proposal",
  },
  {
    name: "Special characters and numbers",
    messages: [
      { id: "1", role: "assistant", content: "Buongiorno!", timestamp: new Date() },
      { id: "2", role: "user", content: "Il premio è di €500/anno con franchigia di 200€. C'è uno sconto del 15% per i nuovi clienti!", timestamp: new Date() },
    ],
    expectedBehavior: "Should handle special characters and currency symbols",
  },
  {
    name: "Question about pricing",
    messages: [
      { id: "1", role: "assistant", content: "Mi parli di questa polizza.", timestamp: new Date() },
      { id: "2", role: "user", content: "Quanto costa esattamente? Quali sono le condizioni?", timestamp: new Date() },
    ],
    expectedBehavior: "Should ask clarifying questions as the persona",
  },
  {
    name: "Multi-turn conversation",
    messages: [
      { id: "1", role: "assistant", content: "Buongiorno!", timestamp: new Date() },
      { id: "2", role: "user", content: "Buongiorno, sono qui per parlarle di assicurazioni.", timestamp: new Date() },
      { id: "3", role: "assistant", content: "Ah, assicurazioni! Ne ho già una per il negozio, ma dimmi pure.", timestamp: new Date() },
      { id: "4", role: "user", content: "Capisco. La sua polizza attuale copre anche i danni da eventi naturali?", timestamp: new Date() },
    ],
    expectedBehavior: "Should maintain context across multiple turns",
  },
];

function parseResponse(response: string): { content: string; traits: Record<string, number>; signals: string[] } {
  const traitMarker = "---TRAITS---";
  const markerIndex = response.indexOf(traitMarker);

  if (markerIndex === -1) {
    return { content: response.trim(), traits: {}, signals: [] };
  }

  const content = response.substring(0, markerIndex).trim();
  const jsonPart = response.substring(markerIndex + traitMarker.length).trim();

  try {
    const parsed = JSON.parse(jsonPart);
    return {
      content,
      traits: parsed.traits || {},
      signals: parsed.signals || [],
    };
  } catch {
    return { content, traits: {}, signals: [] };
  }
}

async function runTest(testCase: TestCase): Promise<{ success: boolean; error?: string; result?: unknown }> {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`TEST: ${testCase.name}`);
  console.log(`Expected: ${testCase.expectedBehavior}`);
  console.log(`${"=".repeat(60)}`);

  try {
    const formattedMessages = testCase.messages.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    console.log("\nInput messages:");
    formattedMessages.forEach((m, i) => console.log(`  ${i + 1}. [${m.role}]: ${m.content.substring(0, 50)}...`));

    const startTime = Date.now();
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: TEST_SYSTEM_PROMPT,
      messages: formattedMessages,
      temperature: 0.8,
      maxTokens: 500,
    });
    const duration = Date.now() - startTime;

    const parsed = parseResponse(text);

    console.log(`\nResponse (${duration}ms):`);
    console.log(`  Content: ${parsed.content.substring(0, 100)}...`);
    console.log(`  Traits: ${JSON.stringify(parsed.traits)}`);
    console.log(`  Signals: ${parsed.signals.join(", ")}`);

    // Validation checks
    const issues: string[] = [];

    if (!parsed.content || parsed.content.length < 5) {
      issues.push("Response content is too short or empty");
    }

    if (Object.keys(parsed.traits).length === 0) {
      issues.push("No traits were parsed from response");
    }

    if (parsed.signals.length === 0) {
      issues.push("No behavioral signals detected");
    }

    // Check for Italian language (basic check)
    const italianWords = ["buon", "sono", "che", "per", "con", "una", "del", "grazie", "prego", "certo"];
    const hasItalian = italianWords.some((word) => parsed.content.toLowerCase().includes(word));
    if (!hasItalian && parsed.content.length > 20) {
      issues.push("Response may not be in Italian");
    }

    if (issues.length > 0) {
      console.log(`\n⚠️  WARNINGS: ${issues.join("; ")}`);
    } else {
      console.log(`\n✅ PASSED`);
    }

    return { success: issues.length === 0, result: { parsed, duration, issues } };
  } catch (error) {
    console.log(`\n❌ FAILED: ${error instanceof Error ? error.message : "Unknown error"}`);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

async function main() {
  console.log("🧪 AV Broker Trainer - Conversation Test Suite");
  console.log(`📅 ${new Date().toISOString()}`);
  console.log(`🤖 Provider: Groq (Llama 3.3 70B)`);

  if (!process.env.GROQ_API_KEY) {
    console.error("❌ GROQ_API_KEY not found in environment");
    process.exit(1);
  }

  const results: { name: string; success: boolean; error?: string }[] = [];

  for (const testCase of testCases) {
    const result = await runTest(testCase);
    results.push({ name: testCase.name, success: result.success, error: result.error });

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Summary
  console.log(`\n${"=".repeat(60)}`);
  console.log("📊 TEST SUMMARY");
  console.log(`${"=".repeat(60)}`);

  const passed = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  results.forEach((r) => {
    const icon = r.success ? "✅" : "❌";
    console.log(`${icon} ${r.name}${r.error ? ` - ${r.error}` : ""}`);
  });

  console.log(`\nTotal: ${passed} passed, ${failed} failed out of ${results.length} tests`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
