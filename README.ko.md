# HUA SDK Lite

경량 AI 세션/프리셋 체험용 SDK (오픈소스, 실전 서비스/배포용)

[View in English (README.md)](./README.md)

## 주요 특징

- 다국어(i18n) 지원 (한/영)
- 세션/프리셋(tone, mode, tier) 관리
- TypeScript 지원
- 커스터마이즈 프리셋

## 설치

```bash
npm install hua-sdk-lite
```

## 환경 변수

.env 또는 환경 변수에 `HUA_API_KEY`를 설정하세요.

## 빠른 시작

```ts
import { createSession, sendMessage } from 'hua-sdk-lite';

const session = await createSession('user-id', {
  tone: 'gentle',
  mode: 'companion',
  lang: 'ko',
});
const reply = await sendMessage(session.id, '안녕!');
```

## 문서 & 예제

- [상세 문서/고급 예제](./docs/)
- [변경 이력](./CHANGELOG.md)
- [데모 앱](https://github.com/HUA-Labs/hua-demo-template)

## 라이선스

MIT
