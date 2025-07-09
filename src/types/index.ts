// 🎭 HUA SDK Lite v2.0.0 - 감정 인식 AI 챗봇 타입 정의
// 리듬이의 마음처럼 따뜻하고 섬세한 타입들 💖

// ===== 기본 프리셋 타입 =====
export type Tone = 'gentle' | 'warm' | 'cheerful' | 'quirky' | 'delicate';
export type Mode = 'empathy' | 'analysis' | 'suggestion' | 'praise' | 'playful';
export type Tier = 1.0 | 2.0 | 3.0;
export type SupportedLang = 'ko' | 'en';
export type LLMProvider = 'openai' | 'mock';

// ===== API 요청 타입 =====
export interface ChatRequest {
  message: string;                    // 필수: 사용자 메시지
  tone?: Tone;                       // 선택: 감정 톤
  mode?: Mode;                       // 선택: 대화 모드
  tier?: Tier;                       // 선택: 응답 등급 (크레딧 차감량)
  lang?: SupportedLang;              // 선택: 언어 설정
  provider?: LLMProvider;            // 선택: LLM 제공자
  llmApiKey?: string;                // 선택: 사용자 OpenAI API 키
}

// ===== API 응답 타입 =====
export interface UsageInfo {
  total_tokens: number;
  input_tokens: number;
  output_tokens: number;
}

export interface CreditInfo {
  used: number;
  remaining: number;
  tier: string;
}

export interface ApiKeyUsageInfo {
  total_requests: number;
  is_guest: boolean;
  limit_exceeded: boolean;
}

export interface ChatResponseData {
  message: string;                   // AI 응답 메시지
  usage: UsageInfo;                  // 토큰 사용량
  tier: string;                      // 사용된 등급
  mode: string;                      // 사용된 모드
  tone: string;                      // 사용된 톤
  authenticated: boolean;            // 인증 여부
  userId: string;                    // 사용자 ID
  note: string;                      // 시스템 노트
  credits?: CreditInfo;              // 크레딧 정보 (회원만)
  api_key_usage?: ApiKeyUsageInfo;   // API 키 사용량 정보
}

export interface ChatResponse {
  success: boolean;
  data: ChatResponseData;
}

// ===== API 키 발급 응답 =====
export interface IssueKeyResponse {
  apiKey: string;
}

// ===== 에러 타입 =====
export interface HUAError {
  error: string;
  message: string;
  details?: string;
}

// ===== SDK 설정 타입 =====
export interface HUALiteConfig {
  baseUrl?: string;                  // API 기본 URL
  timeout?: number;                  // 요청 타임아웃 (ms)
  retries?: number;                  // 재시도 횟수
  retryDelay?: number;               // 재시도 간격 (ms)
}

// ===== SDK 클래스 타입 =====
export interface HUALiteInterface {
  chat(request: ChatRequest): Promise<ChatResponse>;
  issueKey(): Promise<string>;
}

// ===== 프리셋 설명 타입 =====
export interface PresetDescription {
  name: string;
  description: string;
  examples: string[];
}

export interface PresetInfo {
  gentle: PresetDescription;
  warm: PresetDescription;
  cheerful: PresetDescription;
  quirky: PresetDescription;
  delicate: PresetDescription;
}

// ===== 모드 설명 타입 =====
export interface ModeDescription {
  name: string;
  description: string;
  useCases: string[];
}

export interface ModeInfo {
  empathy: ModeDescription;
  analysis: ModeDescription;
  suggestion: ModeDescription;
  praise: ModeDescription;
  playful: ModeDescription;
}

// ===== 등급 설명 타입 =====
export interface TierDescription {
  name: string;
  description: string;
  creditCost: number;
  maxTokens: number;
}

export interface TierInfo {
  '1.0': TierDescription;
  '2.0': TierDescription;
  '3.0': TierDescription;
}

// ===== 상수 정의 =====
export const TONE_PRESETS: Tone[] = ['gentle', 'warm', 'cheerful', 'quirky', 'delicate'];
export const MODE_PRESETS: Mode[] = ['empathy', 'analysis', 'suggestion', 'praise', 'playful'];
export const TIER_PRESETS: Tier[] = [1.0, 2.0, 3.0];
export const SUPPORTED_LANGS: SupportedLang[] = ['ko', 'en'];
export const LLM_PROVIDERS: LLMProvider[] = ['openai', 'mock'];

// ===== 기본값 =====
export const DEFAULT_CONFIG: Required<HUALiteConfig> = {
  baseUrl: 'https://api.hua.com',
  timeout: 30000,
  retries: 2,
  retryDelay: 1000
};

// ===== 유틸리티 타입 =====
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ===== 이벤트 타입 =====
export interface HUAEvent {
  type: 'request' | 'response' | 'error' | 'retry';
  timestamp: Date;
  data: any;
}

export type EventListener = (event: HUAEvent) => void; 