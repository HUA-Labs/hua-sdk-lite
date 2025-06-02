# HUA SDK Lite

Lightweight AI session/preset SDK for rapid prototyping and production.

[한국어 설명 보기 (README.ko.md)](./README.ko.md)

## Features

- Multi-language (i18n) support (en/ko)
- Session/preset management (tone, mode, tier)
- TypeScript support
- Customizable presets

## Installation

```bash
npm install hua-sdk-lite
```

## Environment Variables

Set your API key as `HUA_API_KEY` in your environment or `.env` file.

## Quick Start

```ts
import { createSession, sendMessage } from 'hua-sdk-lite';

const session = await createSession('user-id', {
  tone: 'gentle',
  mode: 'companion',
  lang: 'en',
});
const reply = await sendMessage(session.id, 'Hello!');
```

## Documentation & Examples

- [Full Docs & Advanced Usage](./docs/)
- [Changelog](./CHANGELOG.md)
- [Demo App](https://github.com/HUA-Labs/hua-demo-template)

## License

MIT
