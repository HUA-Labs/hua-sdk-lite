# HUA SDK Lite v2.0.0

HUA Lite API를 위한 TypeScript SDK입니다. 감정 인식 AI 챗봇과 쉽게 통합할 수 있습니다.

[![npm version](https://badge.fury.io/js/hua-sdk-lite.svg)](https://badge.fury.io/js/hua-sdk-lite)
[![npm downloads](https://img.shields.io/npm/dm/hua-sdk-lite.svg)](https://www.npmjs.com/package/hua-sdk-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/HUA-Labs/hua-sdk-lite/releases/tag/v2.0.0)

[English Documentation (README.en.md)](./README.en.md)

## 주요 기능

- 🎯 **간단한 API 통합** - 몇 줄의 코드로 HUA Lite API 사용
- 🎨 **감정 기반 응답** - tone, mode, tier로 다양한 감정 설정
- 🌍 **다국어 지원** - 한국어/영어 지원
- 🔑 **API 키 관리** - 간편한 인증 시스템
- 💰 **크레딧 시스템** - 사용량 추적 및 관리
- 📊 **사용량 통계** - 토큰 사용량 및 크레딧 정보

## 설치

```bash
npm install hua-sdk-lite@2.0.0
```

## 빠른 시작

```typescript
import { HUALite } from 'hua-sdk-lite';

// SDK 초기화
const hua = new HUALite('YOUR_API_KEY');

// 챗봇과 대화
const response = await hua.chat({
  message: "오늘 하루 힘들었어, 위로해줘!",
  tone: "gentle",
  mode: "empathy",
  tier: 1.0,
  provider: "openai"
});

console.log(response.data.message);
// "정말 힘드셨겠어요... 오늘 하루도 잘 버텨내셨네요. 당신의 노력을 알아봐요. 내일은 더 좋은 하루가 될 거예요! 💕"
```

## API 키 발급

```typescript
// 게스트 API 키 발급
const apiKey = await HUALite.issueKey();
console.log(apiKey); // "hua_abc123def456..."
```

## 고급 사용법

```typescript
// 사용자 정의 설정
const hua = new HUALite('YOUR_API_KEY', {
  baseUrl: 'https://api.hua.ai.kr',
  timeout: 30000
});

// 다양한 감정 설정으로 대화
const responses = await Promise.all([
  hua.chat({ message: "안녕!", tone: "gentle", mode: "empathy" }),
  hua.chat({ message: "힘내!", tone: "energetic", mode: "coach" }),
  hua.chat({ message: "고마워", tone: "warm", mode: "praise" })
]);
```

## 지원하는 옵션

### Tone (톤)

- `gentle` - 부드럽고 따뜻한
- `warm` - 따뜻하고 친근한
- `cheerful` - 밝고 활기찬
- `quirky` - 독특하고 재미있는
- `delicate` - 섬세하고 정중한

### Mode (모드)

- `empathy` - 공감적
- `analysis` - 분석적
- `suggestion` - 제안적
- `praise` - 칭찬적
- `playful` - 장난스러운

### Tier (등급)

- `1.0` - 기본 (1 크레딧)
- `2.0` - 고급 (2 크레딧)
- `3.0` - 프리미엄 (3 크레딧)

## 응답 구조

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

## 에러 처리

```typescript
try {
  const response = await hua.chat({ message: "Hello!" });
} catch (error) {
  if (error.code === 'INSUFFICIENT_CREDITS') {
    console.log('크레딧이 부족합니다.');
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    console.log('요청 한도를 초과했습니다.');
  }
}
```

## 문서

- [API 문서](https://api.hua.com/docs)
- [온라인 데모](https://api.hua.com/api-test)
- [API 키 관리](https://api.hua.com/api-key)

## 라이선스

MIT License

## 지원

- 이슈: [GitHub Issues](https://github.com/HUA-Labs/hua-sdk-lite/issues)
- 이메일: <echonet.ais@gmail.com>
