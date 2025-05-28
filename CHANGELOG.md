# CHANGELOG — hua-sdk-lite

## [1.2.0] - 2025-05-28

### SDK 핵심 기능 및 구조 정립 (v0.1 온보딩 가이드 기반)

- **세션 관리 기능 (`createSession`) 도입:**
  - `createSession(userId: string, options: SessionOptions): Promise<Session>` 함수를 통해 세션을 명시적으로 생성합니다.
  - `SessionOptions`에는 `tone: string`, `mode: string`, `tier?: string` (선택적) 파라미터를 포함합니다.
  - 생성된 세션 정보(ID, 사용자 ID, tone, mode, tier)는 SDK 내부 메모리 저장소에 기록되어 `sendMessage` 호출 시 활용됩니다.
  - 반환되는 `Session` 객체는 `{ id, userId, tone, mode, tier }` 구조를 가집니다.

- **메시지 전송 기능 (`sendMessage`) 개선:**
  - `sendMessage(sessionId: string, message: string): Promise<string>` 시그니처로 변경되었습니다.
  - `sessionId`를 통해 현재 활성화된 세션의 `tone`, `mode`, `tier` 설정을 내부적으로 조회하여 API 요청에 자동으로 포함합니다.
  - API Key 인증 방식 변경: 기존 직접 전달 방식에서 `process.env.HUA_API_KEY` 환경 변수를 사용하도록 수정되었습니다. (SDK 사용자 측에서 환경 변수 설정 필요)
  - API 응답 문자열에 "🤖 감응 응답: " 접두어가 일괄적으로 추가되어 반환됩니다.
  - 필수 정보(API 키, 유효한 세션 ID) 누락 시 명확한 오류 메시지를 반환하도록 오류 처리가 강화되었습니다.

- **프리셋 로딩 기능 (`loadPreset`) 도입:**
  - `loadPreset(type: 'tone' | 'mode', key: string): Promise<string>` 함수를 통해 특정 `tone` 또는 `mode` 프리셋에 대한 설명을 불러올 수 있습니다.
  - 존재하지 않는 프리셋 요청 시 오류를 반환합니다.

- **타입 정의 업데이트:**
  - `SessionOptions`, `Session` 등 SDK 전반의 타입 정의가 실제 사용 파라미터 (`tone`, `mode`, `tier?`)를 명확히 반영하도록 업데이트되었습니다.

- **`tier` 파라미터 지원 정식화:**
  - API 명세 및 사용자 피드백을 반영하여, `tier` 파라미터를 세션 생성 옵션 및 API 호출 데이터에 정식으로 포함하도록 재통합 및 안정화되었습니다.

- **예제 코드 (`examples/demo.ts`) 전면 개편:**
  - 새로운 SDK 사용 흐름 (`createSession` -> `sendMessage`)을 명확히 보여줍니다.
  - `loadPreset` 및 `tier` 사용법을 포함한 다양한 시나리오 예시를 제공합니다.
  - API 키 환경 변수 설정 가이드를 포함합니다.

---

## [1.1.0] - 2025-05-26

### 최초 실사용 버전 공개
- 기존 목업 구조 제거, 실제 감응 응답 API와 연동
- tone/mode/tier 프리셋 대응 로직 정상 작동
- POST 응답 예시 및 대화 흐름 적용 시작

### 기능 개선
- `sendMessage()` 파라미터 유효성 검증 강화
- 응답 메시지 tone/mode별 분기 구조 반영
- API `baseUrl` 기본값 자동 설정

### 문서 수정
- README.md 내용과 실제 기능 동기화
- 사용 예시, 오류 대응 로직 예제 추가

---

## [1.0.1] - 2025-05-25

### 임시 핫픽스
- README 기반 사용자 혼동 해소용 오류 메시지 수정
- 내부 구조 정비 목적의 가벼운 조정

---

## [1.0.0] - 2025-05-24

### 초기 릴리즈 (목업 기반)
- `sendMessage()` 함수 정의
- tone/mode/tier 구조 선언만 존재, 실제 응답 없음
- README.md와 기능 간 차이 존재

## [1.2.1] - 2025-05-29

### 패키징/배포 자동화 및 타입스크립트 빌드 개선
- npm 패키지 구조 최적화: `dist/` 빌드 산출물만 포함, README/LISENCE만 추가
- TypeScript 빌드 및 타입 선언(.d.ts) 자동 생성 구조 확립 (`tsconfig.json` 신규 작성)
- Node.js 환경 타입(@types/node) 명시적 도입, process.env 등 타입 에러 해결
- 프리셋 서비스 타입 명확화로 TypeScript 인덱싱 에러 해결
- package.json: main/types/scripts/files 등 npm 배포 표준에 맞게 정비
- prepublishOnly 스크립트로 배포 전 자동 빌드
- 기타: 내부 예제/문서/테스트 등은 패키지에서 제외
```
