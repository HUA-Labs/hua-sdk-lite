# HUA SDK Lite

🌏 경량 AI 세션/프리셋 체험용 SDK (오픈소스, 실전 서비스/배포용)

## 주요 특징

- 프리셋 tone/mode/tier 구조 및 국제 표준 언어코드(ko/en) 통일
- i18n(한/영) 지원 및 타입 선언 강화
- presets.custom.template.json, 예제, 타입, 서비스, 문서 전체 동기화
- 데모/SDK 엔트리포인트, 타입 선언, 예제 코드 최신화
- 커스터마이즈 프리셋 적용 및 실전 배포 구조
- 세션 생성 시 lang 옵션 지원, sendMessage에서 lang이 API로 전달됨

## 데모/예제

- [HUA SDK Lite Demo (Vite+React+TS)](https://github.com/HUA-Labs/hua-demo-template)
  - 실전 프리셋/세션/다국어(i18n) 체험용 데모 앱

## 빠른 시작

```bash
npm install hua-sdk-lite
```

.env 또는 환경변수에 `HUA_API_KEY`를 설정하세요.

## 예제 코드 (3분 완성)

```ts
import { createSession, sendMessage, loadPreset } from 'hua-sdk-lite';

const session = await createSession('user-id', {
  tone: 'gentle',
  mode: 'companion',
  tier: 'F2',
  lang: 'en', // 언어 옵션 추가
});
const reply = await sendMessage(session.id, 'Hello!');
```

## 다국어(i18n) 지원

- 세션 생성 시 lang 옵션을 지정하면, 해당 언어로 AI 응답을 받을 수 있습니다. (서버 지원 필요)
- UI 안내 메시지는 언어별 리소스에서 동적으로 불러옵니다.

## 커스터마이즈 프리셋 적용

- 프로젝트 루트에 presets.custom.json 파일을 두면, 해당 key의 프리셋이 override/merge 됩니다.
- 예: gentle, companion, B1, playful 등

## 테스트/마스터 API 키

- is_test=true로 발급된 API 키는 usage 제한 없이 무제한 호출이 가능합니다.

## 주요 변경점 (v1.4.5)

- 프리셋 구조 및 국제 표준 언어코드(ko/en) 통일
- i18n(한/영) 지원 및 타입 선언 강화
- 예제, 타입, 서비스, 문서 전체 동기화
- 실전 배포 구조로 개선
- lang 파라미터 및 다국어 안내(i18n) 지원

## 라이선스

MIT

### hua-sdk-lite

[English README](./README.en.md)

---

> 이 문서는 **한국어 전용**입니다. 영어 사용자는 상단의 링크를 통해 영어판(README.en.md)을 참고해 주세요.

---

[![npm version](https://img.shields.io/npm/v/hua-sdk-lite?color=blue)](https://www.npmjs.com/package/hua-sdk-lite)
[![npm downloads](https://img.shields.io/npm/dm/hua-sdk-lite.svg)](https://www.npmjs.com/package/hua-sdk-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-✔️-3178c6?logo=typescript)](https://www.typescriptlang.org/)

## 🆕 v1.4.0 주요 변경점

- analyzeIntent, PresetType 등 주요 유틸/타입을 엔트리포인트(index.ts)에서 export
- 프리셋(tone/mode/tier) 구조 외부 JSON 분리 및 다국어(i18n) 지원 강화
- loadPreset 함수가 lang 파라미터로 다국어 설명 반환 가능
- 타입 선언(d.ts) 및 엔트리포인트 import 구조 개선

## **HUA SDK Lite란?**

**HUA SDK Lite**는 감정 기반 대화형 AI 기능을 애플리케이션에 쉽게 통합할 수 있도록 도와주는 경량 TypeScript/JavaScript SDK입니다. SUM Chat (HUA 시스템) API와 간편하게 연동하여, 세션 관리, 메시지 전송, 프리셋 활용 기능을 제공합니다.

---

## **주요 기능**

- **간편한 세션 관리**: `createSession` 함수로 사용자별 대화 세션을 손쉽게 시작하고 관리합니다.
- **지능형 메시지 전송**: `sendMessage` 함수를 통해 세션 설정을 바탕으로 감응형 AI 응답을 받습니다.
- **프리셋 활용**: `loadPreset` 함수로 정의된 `tone` 및 `mode` 프리셋 정보를 조회합니다.
- **TypeScript 지원**: 모든 기능은 타입이 정의되어 있어 안정적인 개발이 가능합니다.
- **경량화**: 핵심 기능 중심으로 가볍고 빠르게 설치하여 사용할 수 있습니다.

---

## **설치**

```bash
npm install hua-sdk-lite
# 또는 yarn add hua-sdk-lite
```

---

## **API 키 설정**

본 SDK를 사용하여 `sendMessage` 함수를 호출하려면 HUA API 키가 필요합니다. API 키는 **환경 변수 `HUA_API_KEY`**에 설정해야 합니다. SDK 내부의 `sendMessage` 함수가 이 환경 변수를 참조합니다.

```bash
export HUA_API_KEY="<YOUR_API_KEY_HERE>"
```

(애플리케이션 실행 환경에 맞게 환경 변수를 설정해주세요. 예: `.env` 파일 또는 서버 환경 변수)

---

## **빠른 시작: SDK 사용 흐름**

다음은 HUA SDK Lite를 사용하는 기본적인 흐름입니다.

```typescript
import { createSession, sendMessage, loadPreset } from 'hua-sdk-lite';

async function demoApp() {
  // 1. API 키 확인 (실제 애플리케이션에서는 시작 시 한 번만 설정)
  if (!process.env.HUA_API_KEY) {
    console.error("오류: HUA_API_KEY 환경 변수가 설정되지 않았습니다.");
    console.log("데모를 실행하기 전에 API 키를 설정해주세요.");
    console.log("예: HUA_API_KEY=your_key_here npm run demo (package.json 스크립트 참고)");
    return;
  }
  console.log("HUA_API_KEY가 성공적으로 로드되었습니다.");

  try {
    // 2. 세션 생성
    // 사용자 ID와 함께 tone, mode, tier를 설정하여 세션을 시작합니다.
    const userId = 'user-quickstart-001';
    const sessionOptions = {
      tone: 'gentle',    // AI의 응답 어조 (예: 'gentle', 'energetic', 'neutral')
      mode: 'companion', // AI의 대화 역할 (예: 'companion', 'coach', 'listener')
      tier: 'F2'         // 응답 스타일/복잡성 (예: 'F2', 'S1', 'B1')
    };
    
    const session = await createSession(userId, sessionOptions);
    console.log('세션 생성 완료');
    console.log('세션 ID:', session.id);
    console.log('설정된 Tone:', session.tone);
    console.log('설정된 Mode:', session.mode);
    console.log('설정된 Tier:', session.tier);
    // 예상 출력: [세션 생성 완료] { id: 'session-xxxx', userId: 'user-quickstart-001', tone: 'gentle', mode: 'companion', tier: 'F2' }

    // 3. 메시지 전송
    // 생성된 세션의 ID와 사용자 메시지를 전달합니다.
    // tone, mode, tier는 세션에 저장된 값을 사용합니다.
    const userMessage = '오늘 하루 정말 힘들었어, 위로해 줄 수 있을까?';
    console.log(`[메시지 전송] "${userMessage}" (세션 ID: ${session.id})`);
    
    const empathicReply = await sendMessage(session.id, userMessage);
    console.log('[AI 감응 응답]', empathicReply); 
    // 예상 출력: [AI 감응 응답] 🤖 감응 응답: [API 실제 응답]

    // 4. (선택 사항) 프리셋 정보 로딩
    console.log("[프리셋 정보 로딩 예시]");
    const gentleToneInfo = await loadPreset('tone', 'gentle');
    console.log("Tone 'gentle' 설명:", gentleToneInfo); // "부드러운 톤입니다."
    
    const companionModeInfo = await loadPreset('mode', 'companion');
    console.log("Mode 'companion' 설명:", companionModeInfo); // "동반자 모드입니다."

    // 존재하지 않는 프리셋 로딩 시도 (오류 처리 예시)
    try {
      await loadPreset('tone', 'nonexistent_tone');
    } catch (e) {
      // 타입 단언(as Error)을 사용하여 e.message에 접근
      console.error("프리셋 로딩 오류:", (e as Error).message); // "존재하지 않는 프리셋입니다"
    }

  } catch (error) {
    // 타입 단언(as Error)을 사용하여 error.message 및 error.stack에 접근
    console.error('[SDK 데모 실행 중 오류 발생]', (error as Error).message);
    if ((error as Error).stack) {
      console.error((error as Error).stack);
    }
  }
}

demoApp();
```

---

## **프리셋 목록**

SDK 및 API는 다음과 같은 프리셋 값을 사용합니다. `createSession` 시 `options` 객체를 통해 설정할 수 있습니다.

- **`tone` (어조)**: 응답의 전반적인 감정적 느낌
  - `gentle`: 부드럽고 온화한 톤
  - `energetic`: 활기차고 열정적인 톤
  - `neutral`: 중립적이고 차분한 톤
- **`mode` (모드)**: AI의 대화 역할
  - `companion`: 친구처럼 편안한 대화 상대
  - `coach`: 목표 지향적이고 조언을 제공하는 역할
  - `listener`: 주로 사용자의 이야기를 듣고 공감하는 역할
- **`tier` (티어)**: 응답의 스타일이나 복잡성 (예: 응답 길이, 사용 어휘 수준)
  - `F2`
  - `S1`
  - `B1`

*참고: `tone`, `mode`, `tier` 파라미터에 유효하지 않거나 지원되지 않는 값을 전달하면, API 시스템은 해당 파라미터를 내부 기본값("default")으로 처리하여 응답을 생성할 수 있습니다.* (API 문서 기반 정보)

---

## **프리셋 구조 및 다국어(i18n) 지원**

hua-sdk-lite는 tone/mode/tier 프리셋 정보를 외부 JSON 파일로 관리하며, 한글/영문 등 다국어 설명을 지원합니다.

- 프리셋 구조 예시 (src/presets/tone.json):

  ```json
  [
    {
      "key": "gentle",
      "ko": "부드러운 톤",
      "en": "Gentle tone",
      "description": {
        "ko": "상대방의 마음을 어루만지는, 따뜻하고 배려 깊은 톤입니다.",
        "en": "A warm, considerate tone that soothes and comforts the listener."
      }
    }
  ]
  ```

- SDK 함수에서 원하는 언어로 프리셋 설명을 조회할 수 있습니다.

### **프리셋 다국어 예제**

```typescript
import { loadPreset } from 'hua-sdk-lite';

async function testPresetI18n() {
  console.log(await loadPreset('tone', 'gentle', 'ko')); // 부드럽고 온화한 톤입니다.
  console.log(await loadPreset('tone', 'gentle', 'en')); // A soft and gentle tone.
  console.log(await loadPreset('mode', 'coach', 'ko'));  // 목표 지향적이고 조언을 제공하는 역할.
  console.log(await loadPreset('mode', 'coach', 'en'));  // A goal-oriented and advice-giving role.
  console.log(await loadPreset('tier', 'B1', 'ko'));     // 가장 상세하고 긴 답변.
  console.log(await loadPreset('tier', 'B1', 'en'));     // Most detailed and lengthy answers.
}

testPresetI18n();
```

---

## 엔드포인트

- 실제 API 호출: `https://api.hua.ai.kr/api/lite-hua`
- API Key는 [공식 API 사이트](https://api.hua.ai.kr)에서 발급

---

### 3분 완성! 누구나 해볼 수 있는 초간단 데모

아래 순서대로 따라하면 바로 HUA SDK Lite의 감응형 AI 기능을 체험할 수 있습니다!

---

## 1. 설치

```bash
npm install hua-sdk-lite
# 또는 yarn add hua-sdk-lite
```

## 2. API 키 설정

공식 사이트에서 발급받은 API 키를 환경 변수로 등록하세요.

```bash
export HUA_API_KEY="<YOUR_API_KEY_HERE>"
```

- 윈도우 CMD: `set HUA_API_KEY=<YOUR_API_KEY_HERE>`
- .env 파일 사용 시: `HUA_API_KEY=your_key_here`

## 3. 최소 예제 코드 (복붙해서 실행!)

```typescript
import { createSession, sendMessage } from 'hua-sdk-lite';

async function quickDemo() {
  if (!process.env.HUA_API_KEY) {
    console.error('API 키가 설정되지 않았어요!');
    return;
  }
  // 1. 세션 생성
  const session = await createSession('demo-user', {
    tone: 'gentle',
    mode: 'companion',
    tier: 'F2',
  });
  // 2. 메시지 전송
  const reply = await sendMessage(session.id, '오늘 하루 힘들었어, 위로해줘!');
  console.log('AI 응답:', reply);
}

quickDemo();
```

## 4. 실행법

```bash
node demo.js # 또는 ts-node demo.ts
```

---
