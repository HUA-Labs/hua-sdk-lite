# CHANGELOG — hua-sdk-lite

## [1.5.0] - 2025-06-02

Added

- SDK, Demo, API 전체 다국어(i18n) 지원: 영어/한국어 UI 및 메시지, `lang` 파라미터, 언어 파일 분리, 다국어 프롬프트/에러/로딩 메시지
- 브라우저 환경에서 환경 변수 처리 개선: `process.env` → `import.meta.env.VITE_HUA_API_KEY`로 변경, 관련 문서/예제/에러 메시지 동기화
- Node.js 전용 코드(`fs`, `path` 등) 분리: `preset.node.ts`로 이동, 브라우저 번들에서 Node.js 의존성 완전 제거
- 테스트/마스터 API Key 무제한 호출: `is_test` 플래그가 있는 키는 사용량 제한(429) 없이 호출 가능

Changed

- 모든 안내/에러/로딩 메시지가 선택 언어로 표시되도록 개선
- 인텐트 분석(의도 매칭) 로직 확장: 영어 인사 및 주요 키워드 매칭 강화, 영어 모드에서 자연스러운 응답 제공
- README 및 문서 최신화: 환경 변수, 다국어 지원, 개발/테스트 방법 등 반영

Fixed

- npm link/file: 경로 문제: 로컬 SDK 개발 및 데모 연동 시 발생하던 의존성, 빌드, 캐싱 문제 해결
- API Key 누락/오류 안내: 키가 없거나 잘못된 경우, 명확한 다국어 안내 메시지 제공

Known Issues

- AI 영어 응답: 현재 백엔드에서 `lang` 파라미터를 받아도 항상 한국어로 응답함(향후 개선 예정)

## [1.4.5] - 2025-05-30

Added

- 프리셋 tone/mode/tier 구조 및 국제 표준 언어코드(ko/en) 통일
- i18n(한/영) 지원 및 타입 선언 강화
- presets.custom.template.json, 예제, 타입, 서비스, 문서 전체 동기화

Changed

- 데모/SDK 엔트리포인트, 타입 선언, 예제 코드 최신화
- tsconfig, index, preset 서비스 등 실전 배포 구조로 개선

Fixed

- 기타 불필요 파일 정리 및 패키지 버전 1.4.4로 업데이트

Note

- 향후 기여자/서비스별 프리셋 확장, 다국어 추가, 에러 구조 표준화 등 확장 기반 마련

## [1.4.4] - 2025-05-30

Added

- 프리셋 tone/mode/tier 구조 및 국제 표준 언어코드(ko/en) 통일
- i18n(한/영) 지원 및 타입 선언 강화
- presets.custom.template.json, 예제, 타입, 서비스, 문서 전체 동기화

Changed

- 데모/SDK 엔트리포인트, 타입 선언, 예제 코드 최신화
- tsconfig, index, preset 서비스 등 실전 배포 구조로 개선

Fixed

- 기타 불필요 파일 정리 및 패키지 버전 1.4.4로 업데이트

Note

- 향후 기여자/서비스별 프리셋 확장, 다국어 추가, 에러 구조 표준화 등 확장 기반 마련

## [1.4.0] - 2024-05-30

Added

- 엔트리포인트(index.ts)에서 analyzeIntent, PresetType 등 주요 유틸/타입 export
- 프리셋(tone/mode/tier) 구조 외부 JSON 분리 및 다국어(i18n) 지원 강화
- loadPreset 함수가 lang 파라미터로 다국어 설명 반환 가능

Changed

- 타입 선언(d.ts) 및 엔트리포인트 import 구조 개선
- README/예제 코드 최신화 (3분 완성 예제, 다국어 프리셋 사용법 등)

Fixed

- 프리셋 타입/서비스 코드 리팩토링 및 타입 일관성 강화

Note

- 향후 기여자/서비스별 프리셋 확장, 다국어 추가, 에러 구조 표준화 등 확장 기반 마련

## [1.3.0] - 2025-05-30

Added

- tone/mode/tier 프리셋 정보를 외부 JSON 파일로 분리, 유지보수 및 확장성 강화
- 각 프리셋에 한글/영문 등 다국어 설명 및 뉘앙스 정보 포함
- loadPreset 함수가 언어 파라미터(lang)를 받아 다국어 설명 반환 가능
- 프리셋 타입(Preset, PresetDescription 등) 및 서비스 코드 리팩토링
- README 및 예제 코드에 프리셋 다국어 사용법 추가

Note

- (향후) 기여자/서비스별 프리셋 확장, 다국어 추가, 에러 구조 표준화 등 확장 기반 마련

## [1.2.1] - 2025-05-29

Added

- npm 패키지 구조 최적화: `dist/` 빌드 산출물만 포함, README/LISENCE만 추가
- TypeScript 빌드 및 타입 선언(.d.ts) 자동 생성 구조 확립 (`tsconfig.json` 신규 작성)
- Node.js 환경 타입(@types/node) 명시적 도입, process.env 등 타입 에러 해결
- 프리셋 서비스 타입 명확화로 TypeScript 인덱싱 에러 해결
- package.json: main/types/scripts/files 등 npm 배포 표준에 맞게 정비
- prepublishOnly 스크립트로 배포 전 자동 빌드

Changed

- 기타: 내부 예제/문서/테스트 등은 패키지에서 제외

## [1.2.0] - 2025-05-28

Added

- 세션 관리 기능 (`createSession`)
- 메시지 전송 기능 개선 (`sendMessage`)
- 프리셋 로딩 기능 (`loadPreset`)
- 타입 정의 업데이트
- `tier` 파라미터 지원 정식화
- 예제 코드 전면 개편

Changed

- API Key 인증 방식 변경: 직접 전달 → 환경 변수(`process.env.HUA_API_KEY`)
- 오류 메시지 및 응답 구조 개선

Fixed

- 필수 정보 누락 시 명확한 오류 메시지 반환

## [1.1.0] - 2025-05-26

Added

- 최초 실사용 버전 공개: 기존 목업 구조 제거, 실제 감응 응답 API와 연동
- tone/mode/tier 프리셋 대응 로직 정상 작동
- POST 응답 예시 및 대화 흐름 적용 시작

Changed

- `sendMessage()` 파라미터 유효성 검증 강화
- 응답 메시지 tone/mode별 분기 구조 반영
- API `baseUrl` 기본값 자동 설정

Fixed

- README.md 내용과 실제 기능 동기화
- 사용 예시, 오류 대응 로직 예제 추가

## [1.0.1] - 2025-05-25

Fixed

- README 기반 사용자 혼동 해소용 오류 메시지 수정
- 내부 구조 정비 목적의 가벼운 조정

## [1.0.0] - 2025-05-24

Added

- `sendMessage()` 함수 정의
- tone/mode/tier 구조 선언만 존재, 실제 응답 없음

Note

- README.md와 기능 간 차이 존재
