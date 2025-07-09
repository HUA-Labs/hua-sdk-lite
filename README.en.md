# HUA SDK Lite v2.0.0

TypeScript SDK for HUA Lite API - Emotional AI Chatbot Integration

[![npm version](https://badge.fury.io/js/hua-sdk-lite.svg)](https://badge.fury.io/js/hua-sdk-lite)
[![npm downloads](https://img.shields.io/npm/dm/hua-sdk-lite.svg)](https://www.npmjs.com/package/hua-sdk-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/HUA-Labs/hua-sdk-lite/releases/tag/v2.0.0)

[한국어 설명 보기 (README.md)](./README.md)

## ✨ Key Features

- 🎯 **Simple API Integration** - Use HUA Lite API with just a few lines of code
- 🎨 **Emotion-Based Responses** - Set various emotions with tone, mode, and tier
- 🌍 **Multi-language Support** - Korean/English support
- 🔑 **API Key Management** - Simple authentication system
- 💰 **Credit System** - Usage tracking and management
- 📊 **Usage Statistics** - Token usage and credit information

## 📦 Installation

```bash
npm install hua-sdk-lite@2.0.0
```

## 🚀 Quick Start

```typescript
import { HUALite } from 'hua-sdk-lite';

// Initialize SDK
const hua = new HUALite('YOUR_API_KEY');

// Chat with AI
const response = await hua.chat({
  message: "I had a tough day today, please comfort me!",
  tone: "gentle",
  mode: "empathy",
  tier: 1.0,
  provider: "openai"
});

console.log(response.data.message);
// "I'm so sorry you had a tough day... You've been through so much today. I can see how hard you've been working. Tomorrow will be a better day! 💕"
```

## 🔑 API Key Issuance

```typescript
// Issue guest API key
const apiKey = await HUALite.issueKey();
console.log(apiKey); // "hua_abc123def456..."
```

## 🎯 Advanced Usage

```typescript
// Custom configuration
const hua = new HUALite('YOUR_API_KEY', {
  baseUrl: 'https://api.hua.com',
  timeout: 30000
});

// Chat with different emotions
const responses = await Promise.all([
  hua.chat({ message: "Hello!", tone: "gentle", mode: "empathy" }),
  hua.chat({ message: "Cheer me up!", tone: "energetic", mode: "coach" }),
  hua.chat({ message: "Thank you", tone: "warm", mode: "praise" })
]);
```

## 🎨 Supported Options

### Tone

- `gentle` - Soft and comforting
- `warm` - Friendly and warm
- `cheerful` - Bright and positive
- `quirky` - Fun and unique
- `delicate` - Polite and refined

### Mode

- `empathy` - Empathetic and understanding
- `analysis` - Analytical and objective
- `suggestion` - Helpful and solution-oriented
- `praise` - Encouraging and positive
- `playful` - Fun and lighthearted

### Tier

- `1.0` - Basic (1 credit)
- `2.0` - Advanced (2 credits)
- `3.0` - Premium (3 credits)

## 📋 Response Structure

```typescript
interface ChatResponse {
  success: boolean;
  data: {
    message: string;
    usage: {
      total_tokens: number;
      input_tokens: number;
      output_tokens: number;
    };
    credits: {
      used: number;
      remaining: number;
      tier: string;
    };
    tier: string;
    mode: string;
    tone: string;
    authenticated: boolean;
    userId?: string;
  };
}
```

## ⚠️ Error Handling

```typescript
try {
  const response = await hua.chat({ message: "Hello!" });
} catch (error) {
  if (error.code === 'INSUFFICIENT_CREDITS') {
    console.log('Insufficient credits.');
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    console.log('Rate limit exceeded.');
  }
}
```

## 🎯 Convenience Methods

```typescript
// Pre-configured chat methods
await hua.gentleChat("I'm feeling sad today");
await hua.warmChat("I need some advice");
await hua.cheerfulChat("Make me happy!");
await hua.analyzeChat("Help me understand this situation");
await hua.suggestChat("I need solutions for my problem");
```

## 🔧 Configuration

```typescript
const hua = new HUALite('YOUR_API_KEY', {
  baseUrl: 'https://api.hua.ai.kr',    // API base URL
  timeout: 30000,                    // Request timeout (ms)
  retries: 2,                        // Retry attempts
  retryDelay: 1000                   // Retry delay (ms)
});
```

## 📊 Event System

```typescript
// Listen to SDK events
hua.on('request', (event) => {
  console.log('Request sent:', event.data.url);
});

hua.on('response', (event) => {
  console.log('Response received:', event.data.status);
});

hua.on('error', (event) => {
  console.log('Error occurred:', event.data.error);
});
```

## 🧪 Validation

```typescript
// Validate inputs
if (hua.validateTone('gentle')) {
  // Valid tone
}

if (hua.validateMode('empathy')) {
  // Valid mode
}

if (hua.validateTier(1.0)) {
  // Valid tier
}
```

## 📚 Documentation

- [API Documentation](https://api.hua.com/docs)
- [Online Demo](https://api.hua.com/api-test)
- [API Key Management](https://api.hua.com/api-key)

## 🤝 Examples

### Basic Chatbot

```typescript
import { HUALite } from 'hua-sdk-lite';

const hua = new HUALite('YOUR_API_KEY');

async function chatWithUser(userMessage: string) {
  try {
    const response = await hua.chat({
      message: userMessage,
      tone: 'gentle',
      mode: 'empathy',
      tier: 1.0
    });
    
    return response.data.message;
  } catch (error) {
    console.error('Chat error:', error.message);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
```

### Multi-language Support

```typescript
// Korean
const koreanResponse = await hua.chat({
  message: "오늘 하루 힘들었어요",
  lang: "ko",
  tone: "gentle"
});

// English
const englishResponse = await hua.chat({
  message: "I had a tough day",
  lang: "en",
  tone: "warm"
});
```

### Batch Processing

```typescript
const messages = [
  "Hello, how are you?",
  "I need some advice",
  "Thank you for your help"
];

const responses = await hua.batchChat(
  messages.map(msg => ({ message: msg, tone: 'gentle' }))
);
```

## 📄 License

MIT License

## 🆘 Support

- Issues: [GitHub Issues](https://github.com/HUA-Labs/hua-sdk-lite/issues)
- Email: <echonet.ais@gmail.com>

---

> **Made with 💖 by the HUA-LABS**
