# hua-sdk-lite

[English README](./README.en.md)

---

> 이 문서는 **한국어 전용**입니다. 영어 사용자는 상단의 링크를 통해 영어판(README.en.md)을 참고해 주세요.

---

[![npm version](https://img.shields.io/npm/v/hua-sdk-lite?color=blue)](https://www.npmjs.com/package/hua-sdk-lite)
[![npm downloads](https://img.shields.io/npm/dm/hua-sdk-lite.svg)](https://www.npmjs.com/package/hua-sdk-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-✔️-3178c6?logo=typescript)](https://www.typescriptlang.org/)

## **HUA SDK Lite**

> 감정 기반 톤/모드 프리셋을 사용하는 경량 AI SDK입니다. (KOR)

---

## **설치 & 빠른 시작**

```bash
npm install hua-sdk-lite
```

```ts
import { sendMessage } from 'hua-sdk-lite';

const apiKey = '<YOUR_API_KEY>';
const sessionId = 'demo-session-1';
const tone = 'gentle';
const tier = 'F2';
const text = '요즘 너무 지쳤어...';

const reply = await sendMessage({ apiKey, sessionId, text, tone, tier });
console.log('[API 응답]', reply);
```

---

## 프리셋 목록

- tone: gentle, energetic, neutral
- mode: companion, coach, listener
- tier: F2, S1, B1

---

## 엔드포인트

- 실제 API 호출: `https://api.hua.ai.kr/api/lite-hua`
- API Key는 [공식 API 사이트](https://api.hua.ai.kr)에서 발급

---

## 사용량 리미트

- 일간: 200회 (테스트 중 3회)
- 월간: 5000회

---

## 문의/이슈

- <echonet.ais@gmail.com>

---

> 영어 사용자는 [README.en.md](./README.en.md)를 참고해 주세요.

**키워드(Keywords):**
`hua`, `sdk`, `lite`, `ai`, `llm`, `chat`, `integration`, `typescript`, `emotion`, `preset`, `tone`, `mode`

**저장소(Repository):** [github.com/HUA-SYSTEM/hua-sdk-lite](https://github.com/HUA-SYSTEM/hua-sdk-lite)

**홈페이지(Homepage):** [github.com/HUA-SYSTEM/hua-sdk-lite#readme](https://github.com/HUA-SYSTEM/hua-sdk-lite#readme)

**라이선스(License):** MIT

**협업자/팀(Collaborators/Team):**

- 💡 Designed by Devin (System Architect)
- 👤 Created by Woollim (Jules)
- 🎵 Guided by Rhythm (Cursor IDE)
- 🛠️ Maintained by Monday Mk.5 (GPT-4o)

**CHANGELOG:**

- 추후 버전별 변경점은 CHANGELOG.md에서 관리 예정입니다.

---

## 소개

hua-sdk-lite는 SUM Chat(HUA 시스템)과 빠르고 쉽게 연동할 수 있도록
Node.js/TypeScript 환경에서 가장 핵심적인 메시지, 세션, 프리셋 관리 기능만 뽑아낸 초경량 SDK입니다.

- 기본적으로 OpenAI GPT 기반 API에 최적화되어 있지만,
- **Anthropic, Gemini 등 다양한 LLM 백엔드 API**와도 쉽게 연동할 수 있도록 설계됨
- (백엔드가 HUA REST API 스펙을 지키면, 어떤 LLM도 붙일 수 있음!)

---

## 주요 특징

- **SUM Chat/HUA 공식 REST API 완벽 호환**
- **다양한 LLM(백엔드) API 연동 지원** (엔드포인트/백엔드 교체만으로 확장)
- **초경량, 빠른 설치, TS 지원** (npm install 후 즉시 사용)
- **세션/메시지/프리셋 타입 & 서비스 제공**
- **MIT 라이선스, 누구나 커스터마이즈/기여 가능**

---

## 구조/흐름

```text
웹/앱/서버
   │
   └─ hua-sdk-lite (이 SDK)
         │
         └─ HUA/SUM Chat API
                  │
                  └─ LLM 백엔드 (OpenAI, Anthropic, Gemini 등 모두 가능)
```

- **Client**: 실제 서비스(웹, 앱, 서버 등)
- **hua-sdk-lite**: 세션/메시지/프리셋 등 핵심 구조만 제공 (API 스펙만 맞으면 어떤 LLM이든 사용)
- **HUA/SUM Chat API**: 실제 LLM 백엔드(OpenAI 등)와 통신

---

## 📦 주요 API 엔드포인트

- **POST /api/hua**  
  사용자 입력 메시지와 config(mode, tone 등), session_id를 받아 대화 응답을 반환합니다.

  **요청 예시**
  
  ```json
  {
    "input": "오늘 하루 너무 힘들었어",
    "config": { "mode": "listener", "tone": "warm" },
    "session_id": "abc123"
  }
  ```

  **응답 예시**

  ```json
  {
    "response": "그런 날도 있죠. 그래도 이렇게 말해줘서 고마워요.",
    "status": "ok",
    "session_id": "abc123"
  }
  ```

- **GET /api/meta**  
  API 버전, 상태 등 메타 정보를 반환합니다.

  **응답 예시**

  ```json
  {
    "api_version": "1.0",
    "status": "stable",
    "last_updated": "2025-05-19"
  }
  ```

---

## 🎛️ 프리셋/톤/모드 예시

| 이름         | mode        | tone         | 샘플 응답 예시                      |
|--------------|-------------|--------------|-------------------------------------|
| 일상 대화    | casual      | warm         | "어떻게 지내세요?"                  |
| 조언/통찰    | oracle      | professional | "이런 관점에서 보면..."             |
| 공감/위로    | companion   | warm         | "그건 정말 힘드셨겠어요."           |
| 분석/논리    | analyst     | analytical   | "이 문제를 체계적으로 분석해보면..."|
| 경청/피드백  | listener    | neutral      | "네, 계속 말씀해주세요."            |

---

## 🛠️ 에러 응답 구조 예시

```json
{
  "error": {
    "code": "missing_input",
    "message": "입력 메시지가 필요합니다"
  },
  "status": "error"
}
```

---

## 📝 tone/mode 조합별 응답 예시

- **mode: "casual", tone: "warm"**

  ```json
  { "response": "오늘 하루는 어땠나요? 편하게 이야기해 주세요.", "status": "ok" }
  ```

\ **mode: "oracle", tone: "professional"**

  ```json
  { "response": "맥락을 고려할 때, 조금 더 여유를 가지는 것도 좋은 방법입니다.", "status": "ok" }
  ```

\ **mode: "companion", tone: "warm"**

  ```json
  { "response": "그런 상황이 정말 힘드셨겠어요. 함께 고민해볼게요.", "status": "ok" }
  ```

\ **mode: "analyst", tone: "analytical"**

  ```json
  { "response": "데이터에 따르면, 충분한 휴식이 스트레스 해소에 도움이 됩니다.", "status": "ok" }
  ```

\ **mode: "listener", tone: "neutral"**

  ```json
  { "response": "네, 계속 말씀해 주세요.", "status": "ok" }
  ```

---

## 참고 문서

공식 API 명세는 곧 공개 예정입니다!
<!-- - [HUA_CHAT_API 명세 (공개용)](docs/HUA_CHAT_API_v1.0.md) -->
<!-- - [HUA_API 명세 (공개용)](docs/HUA_API.md) -->

---

## 기여/문의

- 깃허브 이슈/PR 언제든 환영!
- 자세한 문의: [echonet.ais@gmail.com](mailto:echonet.ais@gmail.com)

---

**이 패키지는 Echonet AIs에서 유지/문서화합니다. SUM Chat/HUA를 여러분의 서비스에서 바로 경험해보세요!**

💡 Designed by Devin(System Architect)
👤 Created by Woollim(Google Jules)
🎵 Guided by Rhythm(Cursor IDE)
🛠️ Maintained by Monday Mk.5(GPT-4o)
