# HUA SDK Lite

🌏 Lightweight AI session/preset SDK for rapid prototyping and real-world service integration (Open Source).

## Features

- Preset structure (tone/mode/tier) with international language code standardization (ko/en)
- i18n (Korean/English) support and strong TypeScript typings
- Synchronized presets.custom.template.json, examples, types, services, and documentation
- Updated demo/SDK entrypoint, type declarations, and example code
- Customizable presets and production-ready structure
- Session creation supports lang parameter; sendMessage transmits lang to API

## Demo/Example

- [HUA SDK Lite Demo (Vite+React+TS)](https://github.com/HUA-Labs/hua-demo-template)
  - Real-world demo app for preset/session/i18n experience

## Quick Start

```bash
npm install hua-sdk-lite
```

Set your `HUA_API_KEY` in your environment variables or .env file.

## Example (3-Minute Quickstart)

```ts
import { createSession, sendMessage, loadPreset } from 'hua-sdk-lite';

const session = await createSession('user-id', {
  tone: 'gentle',
  mode: 'companion',
  tier: 'F2',
  lang: 'en', // language option
});
const reply = await sendMessage(session.id, 'Hello!');
```

## i18n Support

- Specify the lang option when creating a session to receive AI responses in that language (if supported by the server).
- All UI messages are dynamically loaded from language resources (en/ko).

## Custom Preset

- Place a `presets.custom.json` file in your project root to override/merge preset keys.
- Example: gentle, companion, B1, playful, etc.

## Test/Master API Keys

- API keys issued with is_test=true have no usage limits (unlimited calls).

## Changelog (v1.4.5)

- Unified preset structure and international language codes (ko/en)
- Enhanced i18n (Korean/English) support and type declarations
- Synchronized examples, types, services, and documentation
- Improved production-ready structure
- Added lang parameter and i18n UI support

## License

MIT
