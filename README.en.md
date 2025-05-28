# hua-sdk-lite (English)

[한국어 README](./README.md)

---
> This is the **English version** of the documentation. For Korean, see [README.md](./README.md).
---
[![npm version](https://img.shields.io/npm/v/hua-sdk-lite?color=blue)](https://www.npmjs.com/package/hua-sdk-lite)
[![npm downloads](https://img.shields.io/npm/dm/hua-sdk-lite.svg)](https://www.npmjs.com/package/hua-sdk-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-✔️-3178c6?logo=typescript)](https://www.typescriptlang.org/)

## **What is HUA SDK Lite?**

**HUA SDK Lite** is a lightweight TypeScript/JavaScript SDK designed to help you easily integrate emotion-based conversational AI features into your applications. It simplifies interaction with the SUM Chat (HUA System) API, providing session management, message sending, and preset utilization capabilities.

---

## **Main Features**

*   **Easy Session Management**: Effortlessly start and manage user-specific conversation sessions with the `createSession` function.
*   **Intelligent Message Sending**: Receive empathic AI responses based on session settings using the `sendMessage` function.
*   **Preset Utilization**: Retrieve descriptions for defined `tone` and `mode` presets with the `loadPreset` function.
*   **TypeScript Support**: All functionalities are typed for robust development.
*   **Lightweight**: Core-feature focused for quick installation and use.

---

## **Installation**

```bash
npm install hua-sdk-lite
# or yarn add hua-sdk-lite
```

---

## **API Key Setup**

To use the `sendMessage` function in this SDK, a HUA API Key is required. The API Key must be set as an **environment variable named `HUA_API_KEY`**. The `sendMessage` function within the SDK refers to this environment variable.

```bash
export HUA_API_KEY="<YOUR_API_KEY_HERE>"
```
(Please set the environment variable according to your application's execution environment, e.g., in an `.env` file or server environment variables.)

---

## **Quick Start: SDK Usage Flow**

The following demonstrates the basic flow for using HUA SDK Lite.

```typescript
import { createSession, sendMessage, loadPreset } from 'hua-sdk-lite';

async function demoApp() {
  // 1. API Key Check (In a real application, set this once at startup)
  if (!process.env.HUA_API_KEY) {
    console.error("Error: HUA_API_KEY environment variable is not set.");
    console.log("Please set the API key before running the demo.");
    console.log("Example: HUA_API_KEY=your_key_here npm run demo (see package.json scripts)");
    return;
  }
  console.log("HUA_API_KEY loaded successfully.");

  try {
    // 2. Create a session
    // Start a session by setting tone, mode, and tier along with a userId.
    const userId = 'user-quickstart-en-001';
    const sessionOptions = {
      tone: 'gentle',    // AI's response tone (e.g., 'gentle', 'energetic', 'neutral')
      mode: 'companion', // AI's conversational role (e.g., 'companion', 'coach', 'listener')
      tier: 'F2'         // Response style/complexity (e.g., 'F2', 'S1', 'B1')
    };
    
    const session = await createSession(userId, sessionOptions);
    console.log('
[Session Created]');
    console.log('Session ID:', session.id);
    console.log('Set Tone:', session.tone);
    console.log('Set Mode:', session.mode);
    console.log('Set Tier:', session.tier);
    // Expected output: [Session Created] { id: 'session-xxxx', userId: 'user-quickstart-en-001', tone: 'gentle', mode: 'companion', tier: 'F2' }


    // 3. Send a message
    // Pass the created session's ID and the user's message.
    // Tone, mode, and tier will be used from the session settings.
    const userMessage = 'I had a really tough day today, can you comfort me?'; // Example message in English
    console.log(`
[Sending Message] "${userMessage}" (Session ID: ${session.id})`);
    
    const empathicReply = await sendMessage(session.id, userMessage);
    console.log('[AI Empathic Reply]', empathicReply); 
    // Expected reply format: "[AI Empathic Reply] 🤖 감응 응답: [Actual Korean empathic response from API]"
    // Note: API responses are in Korean.

    // 4. (Optional) Loading Preset Information
    console.log("
[Preset Loading Example]");
    const gentleToneInfo = await loadPreset('tone', 'gentle');
    console.log("Tone 'gentle' Description:", gentleToneInfo); // Output will be in Korean: "부드러운 톤입니다."
    
    const companionModeInfo = await loadPreset('mode', 'companion');
    console.log("Mode 'companion' Description:", companionModeInfo); // Output will be in Korean: "동반자 모드입니다."

    // Attempting to load a non-existent preset (error handling example)
    try {
      await loadPreset('tone', 'nonexistent_tone');
    } catch (e) {
      // Type assertion (as Error) to access e.message
      console.error("Preset loading error:", (e as Error).message); // "존재하지 않는 프리셋입니다" (Error message also in Korean)
    }

  } catch (error) {
    // Type assertion (as Error) to access error.message and error.stack
    console.error('
[SDK Demo Error]', (error as Error).message);
    if ((error as Error).stack) {
      console.error((error as Error).stack);
    }
  }
}

demoApp();
```

---

## **Preset List**

The SDK and API use the following preset values. You can set these via the `options` object when calling `createSession`.

*   **`tone`**: Determines the overall emotional feeling of the response.
    *   `gentle`: A soft and mild tone.
    *   `energetic`: A vibrant and enthusiastic tone.
    *   `neutral`: A neutral and calm tone.
*   **`mode`**: Sets the conversational role of the AI.
    *   `companion`: A comfortable, friend-like conversation partner.
    *   `coach`: A goal-oriented role that provides advice.
    *   `listener`: A role that primarily listens and empathizes with the user.
*   **`tier`**: Indicates the style or complexity of the response.
    *   `F2`, `S1`, `B1`

*Note: If invalid or unsupported values are passed for the `tone`, `mode`, or `tier` parameters, the API system may process that parameter with an internal default value ("default") to generate a response.* (Information based on API documentation)

---
(The rest of the English README, like "API Endpoint", "Usage Limits", "Example Response (Korean)", "Contact / Issues", should be kept as they are, as they mostly describe the API service.)
