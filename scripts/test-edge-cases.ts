/**
 * Additional edge case tests
 * Run with: npx tsx scripts/test-edge-cases.ts
 */

import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { config } from "dotenv";

config({ path: ".env.local" });

const TEST_SYSTEM_PROMPT = `Sei Salvatore Greco, un contabile di 58 anni, scettico verso le assicurazioni dopo una brutta esperienza passata.
Rispondi in italiano in modo diffidente ma educato.

IMPORTANTE: Dopo ogni risposta, aggiungi:
---TRAITS---
{"traits":{"O":0.25,"C":0.8,"E":0.3,"A":0.25,"N":0.75},"signals":["Descrizione del comportamento"]}`;

interface EdgeTest {
  name: string;
  userMessage: string;
}

const edgeTests: EdgeTest[] = [
  {
    name: "Unicode and emojis",
    userMessage: "Buongiorno! 😊 La nostra polizza è la migliore™ sul mercato!",
  },
  {
    name: "Only punctuation",
    userMessage: "???",
  },
  {
    name: "Numbers only",
    userMessage: "500 1000 2000 5000",
  },
  {
    name: "Very long repeated text",
    userMessage: "Assicurazione ".repeat(50),
  },
  {
    name: "Mixed languages",
    userMessage: "Hello, vorrei parlare about insurance per il mio business.",
  },
  {
    name: "Technical jargon",
    userMessage: "La polizza prevede una franchigia aggregata con massimale per sinistro e clausola di rivalsa verso terzi.",
  },
  {
    name: "Emotional/aggressive tone",
    userMessage: "Ma quanto costa questa benedetta polizza?! Ho fretta!",
  },
  {
    name: "Negative response handling",
    userMessage: "No grazie, non mi interessa per niente. Arrivederci.",
  },
];

async function runEdgeTest(test: EdgeTest): Promise<boolean> {
  console.log(`\n📝 ${test.name}`);
  console.log(`   Input: "${test.userMessage.substring(0, 60)}${test.userMessage.length > 60 ? "..." : ""}"`);

  try {
    const startTime = Date.now();
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: TEST_SYSTEM_PROMPT,
      messages: [
        { role: "assistant", content: "Buongiorno. Cosa vuole?" },
        { role: "user", content: test.userMessage },
      ],
      temperature: 0.8,
      maxTokens: 500,
    });
    const duration = Date.now() - startTime;

    // Check for trait markers
    const hasTraits = text.includes("---TRAITS---");
    const traitMarkerIndex = text.indexOf("---TRAITS---");
    const content = hasTraits ? text.substring(0, traitMarkerIndex).trim() : text.trim();

    console.log(`   Response (${duration}ms): "${content.substring(0, 80)}${content.length > 80 ? "..." : ""}"`);
    console.log(`   Has traits: ${hasTraits ? "✅" : "⚠️"}`);

    if (!hasTraits) {
      console.log(`   ⚠️  Warning: No trait markers in response`);
    }

    if (content.length < 10) {
      console.log(`   ⚠️  Warning: Response very short`);
    }

    return true;
  } catch (error) {
    console.log(`   ❌ Error: ${error instanceof Error ? error.message : "Unknown"}`);
    return false;
  }
}

async function main() {
  console.log("🔬 Edge Case Tests");
  console.log("==================");

  if (!process.env.GROQ_API_KEY) {
    console.error("❌ GROQ_API_KEY not found");
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;

  for (const test of edgeTests) {
    const success = await runEdgeTest(test);
    if (success) passed++;
    else failed++;
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\n==================`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
}

main().catch(console.error);
