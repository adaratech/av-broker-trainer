# AV Broker Trainer Architecture

## Project Overview

AV Broker Trainer is a voice-based training simulator for insurance brokers. It enables real-time voice conversations with AI-powered virtual customers, displaying the customer's Big Five (OCEAN) psychographic profile as personality traits emerge during the interaction.

## Design Principles

1. **Voice-First UX**: Primary interaction via voice, making training feel like a real customer call
2. **Progressive Disclosure**: Psychographic traits are revealed gradually as they manifest in conversation
3. **Stateless Simplicity**: No database - each session is independent for MVP simplicity
4. **Browser-Native**: Uses Web Speech API for voice, minimizing external dependencies

## System Architecture

```mermaid
flowchart TD
    subgraph Browser["Browser (Client)"]
        STT[Speech Recognition<br/>Web Speech API]
        TTS[Speech Synthesis<br/>Web Speech API]
        UI[React UI Components]
        State[Session State<br/>useSession Hook]
    end

    subgraph Server["Next.js Server"]
        Action[Server Action<br/>continueConversation]
        Prompt[System Prompt<br/>Generator]
        Parser[Trait Parser]
    end

    subgraph External["External Services"]
        LLM[Configurable LLM<br/>Groq/Google/OpenAI/Anthropic]
    end

    STT -->|transcript| State
    State -->|user message| Action
    Action -->|persona prompt| Prompt
    Prompt -->|messages| LLM
    LLM -->|response| Action
    Action -->|response + traits| Parser
    Parser -->|parsed data| State
    State -->|display text| TTS
    State -->|update| UI
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 16.1.1 (App Router) | SSR, Server Actions, Routing |
| Language | TypeScript 5.7 (strict) | Type safety |
| Styling | Tailwind CSS 3.4 | Utility-first CSS |
| UI Components | shadcn/ui (custom) | Accessible, customizable components |
| AI Integration | Vercel AI SDK 6.x | LLM responses via generateText |
| LLM | Configurable (Groq/Google/OpenAI/Anthropic) | Virtual customer conversations |
| Voice STT | Web Speech API | Browser-native speech recognition |
| Voice TTS | Web Speech API | Browser-native speech synthesis |
| Linting | ESLint 9 (flat config) | Code quality enforcement |

## File Structure

```
av-broker-trainer/
├── ARCHITECTURE.md              # This file
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.ts              # Next.js configuration
├── eslint.config.mjs           # ESLint flat configuration
├── .env.local                  # Environment variables (AI_PROVIDER, API keys)
├── scripts/
│   ├── test-conversation.ts    # Conversation flow test suite
│   └── test-edge-cases.ts      # Edge case test suite
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles + CSS variables
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page (landing)
│   │   └── session/
│   │       └── page.tsx        # Training session page (main app)
│   ├── components/
│   │   ├── ui/                 # shadcn/ui base components
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── progress.tsx
│   │   │   └── scroll-area.tsx
│   │   └── session/            # Session-specific components
│   │       ├── VoiceControl.tsx       # Mic button + status
│   │       ├── ConversationPanel.tsx  # Chat transcript
│   │       ├── PsychographicPanel.tsx # OCEAN traits display
│   │       ├── PersonaCard.tsx        # Customer info card
│   │       └── SessionControls.tsx    # Start/end buttons
│   ├── lib/
│   │   ├── utils.ts            # cn() helper for classnames
│   │   └── ai/
│   │       ├── provider.ts     # Multi-provider abstraction (Groq/Google/OpenAI/Anthropic)
│   │       ├── personas.ts     # 5 persona definitions
│   │       └── system-prompts.ts # AI prompt generation
│   ├── hooks/
│   │   ├── useVoiceInput.ts    # Speech recognition wrapper
│   │   ├── useVoiceSynthesis.ts # Speech synthesis wrapper
│   │   └── useSession.ts       # Session state management
│   ├── actions/
│   │   └── conversation.ts     # Server action for AI chat
│   └── types/
│       └── index.ts            # TypeScript type definitions
```

## Customer Personas

Five distinct Italian personas with predefined Big Five trait profiles:

| ID | Name | O | C | E | A | N | Archetype |
|----|------|---|---|---|---|---|-----------|
| analytical-alex | Alessandro Bianchi | 0.75 | 0.85 | 0.35 | 0.55 | 0.45 | IT Manager, data-driven |
| friendly-fiona | Francesca Rossi | 0.55 | 0.50 | 0.85 | 0.80 | 0.30 | Shop owner, relationship-focused |
| skeptical-sam | Salvatore Greco | 0.25 | 0.80 | 0.30 | 0.25 | 0.75 | Accountant, past bad experience |
| decisive-dana | Daniela Martini | 0.55 | 0.60 | 0.75 | 0.45 | 0.35 | Sales director, time-pressed |
| cautious-carlo | Carlo Ferretti | 0.30 | 0.70 | 0.35 | 0.75 | 0.80 | Retired teacher, needs reassurance |

## Data Flow

### Conversation Flow

1. **User speaks** → SpeechRecognition captures audio and converts to text
2. **Transcript captured** → Text added to conversation history via `useSession`
3. **Server action called** → `continueConversation` sends history + persona context to configured LLM
4. **AI responds** → LLM generates response as the persona character
5. **Response parsed** → Extract spoken text and OCEAN trait signals from response
6. **UI updated** → Conversation panel shows new message, trait panel updates
7. **TTS speaks** → SpeechSynthesis reads the response aloud

### AI Response Format

The AI is instructed to append structured JSON after its natural response:

```
[Natural conversational response in Italian as the persona]

---TRAITS---
{"traits":{"O":0.7,"C":0.8},"signals":["Comunicazione diretta","Ha chiesto dati specifici"]}
```

## UI/UX Design System

The application uses a clean, editorial design language that prioritizes readability and professionalism.

### Design Philosophy

- **Typography-first**: Instrument Serif for headings, Inter for body text
- **Minimal decoration**: Clean borders instead of heavy shadows/glows
- **Unified color**: Single green palette (HSL 152) without competing accent colors
- **Editorial layout**: Asymmetric, content-focused sections
- **Subtle interactions**: Border color changes on hover instead of transforms

### Design Tokens (globals.css)

| Token | Purpose |
|-------|---------|
| `--primary` | Primary brand color (green, HSL 152 60% 32%) |
| `--accent` | Light green for backgrounds (HSL 152 45% 92%) |
| `--background` | Off-white with subtle green tint |
| `--card` | Pure white card surfaces |
| `--muted` | Subdued backgrounds for messages |

### Typography

| Font | Usage |
|------|-------|
| Instrument Serif | Headings (h1, h2, h3) for editorial feel |
| Inter | Body text, UI elements, labels |

### Visual Effects

| Class | Effect |
|-------|--------|
| `.shadow-subtle` | Minimal box-shadow for cards |
| `.shadow-card` | Slightly elevated cards |
| `.underline-accent` | Green underline text decoration |
| `.border-accent-left` | 3px green left border |
| `.card-hover` | Border color change on hover |

### Animations

| Animation | Usage |
|-----------|-------|
| `pulse-ring` | Two-layer pulse for listening mic |
| `shimmer` | Loading skeleton shimmer |

### Component Styling Patterns

- **Cards**: `border bg-card rounded-lg` with clean borders
- **Buttons**: Solid primary color, no gradients
- **Headers**: Sticky with solid `bg-card border-b`
- **Icons**: Wrapped in `bg-accent rounded-lg` containers
- **Messages**: Solid primary for user, muted for assistant
- **Numbered steps**: Circular outlined numbers with serif font

## Key Components

### VoiceControl (`src/components/session/VoiceControl.tsx`)
- Push-to-talk button (20×20) with solid primary color
- Two-layer pulse ring animation when listening
- Status indicators with small animated dots
- Keyboard hint showing "K" key for push-to-talk
- Clean border container wrapping the control

### Keyboard Controls

| Key | Action |
|-----|--------|
| `K` (hold) | Push-to-talk: hold to capture voice, release to send |

The keyboard listener is active only during an active session and ignores keypresses in input fields.

### ConversationPanel (`src/components/session/ConversationPanel.tsx`)
- Scrollable chat with rounded-lg message bubbles
- Solid primary background for user, muted for assistant
- Small green indicator dot in header
- Streaming response with cursor animation

### PsychographicPanel (`src/components/session/PsychographicPanel.tsx`)
- Five OCEAN trait progress bars with icons
- Unknown traits show animated placeholder
- Recent signals in styled cards with trait-colored dots

### PersonaCard (`src/components/session/PersonaCard.tsx`)
- Solid primary top border accent (3px)
- Avatar with primary background
- Background details in muted container

### SessionControls (`src/components/session/SessionControls.tsx`)
- Solid primary button colors
- Clean, minimal styling

### useSession Hook (`src/hooks/useSession.ts`)
- Manages session state (idle, active, ended)
- Handles persona selection (random)
- Tracks conversation history
- Merges and accumulates revealed traits

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `AI_PROVIDER` | LLM provider: `openai`, `groq`, `google`, or `anthropic` | No (default: `openai`) |
| `GROQ_API_KEY` | Groq API key for Llama 3.3 | Yes (if using Groq) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key for Gemini | Yes (if using Google) |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o | Yes (if using OpenAI) |
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude | Yes (if using Anthropic) |

### Switching Providers

To switch between LLM providers, update `.env.local`:

```bash
# Use OpenAI GPT-4o (default - requires billing)
AI_PROVIDER=openai
OPENAI_API_KEY=your-key-here

# Use Groq Llama 3.3 (free tier - for testing)
AI_PROVIDER=groq
GROQ_API_KEY=your-key-here

# Use Google Gemini (free tier)
AI_PROVIDER=google
GOOGLE_GENERATIVE_AI_API_KEY=your-key-here

# Use Anthropic Claude (requires billing)
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=your-key-here
```

No code changes required - just update the env vars and restart the server.

## Browser Compatibility

Web Speech API support:
- **Chrome/Edge**: Full support (recommended)
- **Safari**: Partial support
- **Firefox**: Limited support (may require flags)

The app displays a compatibility warning if Speech API is unavailable.

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local

# Add your OpenAI API key to .env.local as OPENAI_API_KEY
# Get one at https://platform.openai.com/api-keys

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Testing

Run conversation tests to verify the AI integration:

```bash
# Test normal conversation flows (7 tests)
npx tsx scripts/test-conversation.ts

# Test edge cases (8 tests)
npx tsx scripts/test-edge-cases.ts
```

### Test Coverage

| Category | Tests | Status |
|----------|-------|--------|
| Normal greeting | ✅ | Responds naturally in Italian |
| Empty message | ✅ | Handles gracefully |
| Short message | ✅ | Responds appropriately |
| Long detailed message | ✅ | Engages with content |
| Special characters (€, %) | ✅ | Parses correctly |
| Multi-turn conversation | ✅ | Maintains context |
| Unicode/emojis | ✅ | Handles correctly |
| Mixed languages | ✅ | Responds in Italian |
| Technical jargon | ✅ | Persona stays in character |
| Aggressive tone | ✅ | Handles professionally |
| Rejection handling | ✅ | Responds politely |

## ADR Log

| Date | Decision | Context | Consequences |
|------|----------|---------|--------------|
| 2025-01-07 | Use Web Speech API | Free, browser-native, sufficient for MVP | Limited browser support, less accurate than cloud APIs |
| 2025-01-07 | Use GPT-4o | High quality roleplay, Vercel AI SDK compatible | API costs, requires OpenAI account |
| 2025-01-07 | Big Five (OCEAN) model | Scientific standard, well-documented | More abstract than sales-specific frameworks |
| 2025-01-07 | Stateless MVP | Faster development, simpler architecture | No session history, analytics, or progress tracking |
| 2025-01-07 | Italian personas | Target market is Italian insurance brokers | Prompts and UI in Italian |
| 2025-01-07 | Trait extraction via JSON markers | Reliable parsing, avoids regex on natural language | Slightly more complex prompting |
| 2026-01-07 | Add ESLint flat config | Code quality and consistency | Requires ESLint 9+, catches unused variables |
| 2026-01-07 | Upgrade to Next.js 16.1.1 | Latest stable version with Turbopack | Improved build performance, React 19 support |
| 2026-01-07 | Fix Server Action serialization | Functions can't be passed to Client Components | Use streamable value for result instead of callback function |
| 2026-01-07 | Fix result stream emission | Streamable value must be updated before done() | Call update() before done() to emit the parsed result |
| 2026-01-07 | Fix AI SDK 4.x streaming | textStream/fullStream not working | Use generateText for non-streaming, need to fix streaming later |
| 2026-01-07 | Identify API quota issue | OpenAI API returning quota exceeded error | User needs to add billing credits to OpenAI account |
| 2026-01-07 | Switch from OpenAI to Claude | OpenAI quota exceeded, Claude available | Better cost control, same quality roleplay |
| 2026-01-07 | Make speech synthesis non-blocking | WSL/browser may not support TTS | Warning instead of error, app continues working |
| 2026-01-07 | Upgrade to AI SDK 6.x | ai/rsc module removed in v6, RSC streaming helpers unavailable | Simplified to Promise-based server action, removed streaming complexity |
| 2026-01-07 | Multi-provider abstraction | Need free testing option, want easy provider switching | Created provider.ts, switch via AI_PROVIDER env var, no code changes needed |
| 2026-01-08 | Add Groq as default provider | Google Gemini quota issues on new API keys | Groq has reliable free tier, fast inference with Llama 3.3 70B |
| 2026-01-08 | Add conversation test suite | Need automated testing for AI integration | 15 tests covering normal flows and edge cases, all passing |
| 2026-01-08 | Set OpenAI as default provider | Production-ready configuration | Users add their own OPENAI_API_KEY, Groq available for free testing |
| 2026-01-10 | Modern UI styling overhaul | Improve visual polish and UX | Glass morphism, gradients, shadows, animations; professional look |
| 2026-01-10 | Change primary color to green | User preference for green theme | Updated all color tokens and gradient references from blue to emerald/green |
| 2026-01-10 | Add push-to-talk K key | Hands-free voice input control | Hold K to record, release to send; works alongside mic button |
| 2026-01-10 | Editorial UI redesign | Make UI more unique, less "AI-generated" looking | Added Instrument Serif for headings, removed gradients/glows/floating orbs, unified to single green palette, cleaner borders |
