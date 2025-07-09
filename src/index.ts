// 🌟 HUA SDK Lite v2.0.0 - 메인 SDK 클래스
// 리듬이의 마음처럼 사용자를 배려하는 따뜻한 SDK 💖

import { HUALiteClient } from './client';
import {
  ChatRequest,
  ChatResponse,
  HUALiteConfig,
  HUALiteInterface,
  Tone,
  Mode,
  Tier,
  SupportedLang,
  LLMProvider,
  TONE_PRESETS,
  MODE_PRESETS,
  TIER_PRESETS,
  SUPPORTED_LANGS,
  LLM_PROVIDERS,
  PresetInfo,
  ModeInfo,
  TierInfo
} from './types';

import {
  HUAError,
  MissingApiKeyError,
  ValidationError,
  NetworkError,
  TimeoutError,
  ServerError
} from './errors';

// ===== 프리셋 정보 =====
const PRESET_INFO: PresetInfo = {
  gentle: {
    name: '부드러운',
    description: '따뜻하고 위로가 되는 부드러운 톤',
    examples: ['힘들 때 위로받고 싶어요', '마음이 아파요', '조용히 들어주세요']
  },
  warm: {
    name: '따뜻한',
    description: '친근하고 따뜻한 느낌의 톤',
    examples: ['친구처럼 대화하고 싶어요', '편안하게 이야기해요', '따뜻한 조언이 필요해요']
  },
  cheerful: {
    name: '밝은',
    description: '활기차고 긍정적인 톤',
    examples: ['기분을 좋게 해주세요', '힘내고 싶어요', '긍정적인 마음이 필요해요']
  },
  quirky: {
    name: '독특한',
    description: '재미있고 독특한 톤',
    examples: ['재미있게 대화하고 싶어요', '창의적인 답변이 필요해요', '특별한 관점을 원해요']
  },
  delicate: {
    name: '섬세한',
    description: '정중하고 섬세한 톤',
    examples: ['정중하게 대화하고 싶어요', '예의 바른 답변이 필요해요', '공식적인 톤을 원해요']
  }
};

const MODE_INFO: ModeInfo = {
  empathy: {
    name: '공감',
    description: '사용자의 감정에 공감하며 위로하는 모드',
    useCases: ['위로가 필요할 때', '감정을 나누고 싶을 때', '공감받고 싶을 때']
  },
  analysis: {
    name: '분석',
    description: '상황을 분석하고 객관적인 관점을 제공하는 모드',
    useCases: ['문제를 분석하고 싶을 때', '객관적인 조언이 필요할 때', '상황을 정리하고 싶을 때']
  },
  suggestion: {
    name: '제안',
    description: '구체적인 해결책이나 제안을 제공하는 모드',
    useCases: ['해결책이 필요할 때', '방향을 제시받고 싶을 때', '실행 가능한 조언을 원할 때']
  },
  praise: {
    name: '칭찬',
    description: '긍정적인 부분을 찾아 칭찬하고 격려하는 모드',
    useCases: ['자신감이 필요할 때', '성취를 축하받고 싶을 때', '긍정적인 에너지가 필요할 때']
  },
  playful: {
    name: '장난스러운',
    description: '재미있고 가벼운 대화를 나누는 모드',
    useCases: ['기분 전환이 필요할 때', '재미있는 대화를 원할 때', '스트레스를 풀고 싶을 때']
  }
};

const TIER_INFO: TierInfo = {
  '1.0': {
    name: '기본',
    description: '간단하고 핵심적인 응답',
    creditCost: 1,
    maxTokens: 300
  },
  '2.0': {
    name: '고급',
    description: '상세하고 풍부한 응답',
    creditCost: 2,
    maxTokens: 500
  },
  '3.0': {
    name: '프리미엄',
    description: '매우 상세하고 정서서적인 응답',
    creditCost: 3,
    maxTokens: 800
  }
};

// ===== 메인 SDK 클래스 =====
export class HUALite implements HUALiteInterface {
  private client: HUALiteClient;

  constructor(apiKey: string, config: HUALiteConfig = {}) {
    this.client = new HUALiteClient(apiKey, config);
  }

  // ===== 메인 API 메서드 =====
  async chat(request: ChatRequest): Promise<ChatResponse> {
    return this.client.chat(request);
  }

  async issueKey(): Promise<string> {
    return this.client.issueKey();
  }

  // ===== 편의 메서드 =====
  async gentleChat(message: string, options: Partial<ChatRequest> = {}): Promise<ChatResponse> {
    return this.chat({
      message,
      tone: 'gentle',
      mode: 'empathy',
      ...options
    });
  }

  async warmChat(message: string, options: Partial<ChatRequest> = {}): Promise<ChatResponse> {
    return this.chat({
      message,
      tone: 'warm',
      mode: 'empathy',
      ...options
    });
  }

  async cheerfulChat(message: string, options: Partial<ChatRequest> = {}): Promise<ChatResponse> {
    return this.chat({
      message,
      tone: 'cheerful',
      mode: 'praise',
      ...options
    });
  }

  async analyzeChat(message: string, options: Partial<ChatRequest> = {}): Promise<ChatResponse> {
    return this.chat({
      message,
      tone: 'delicate',
      mode: 'analysis',
      ...options
    });
  }

  async suggestChat(message: string, options: Partial<ChatRequest> = {}): Promise<ChatResponse> {
    return this.chat({
      message,
      tone: 'warm',
      mode: 'suggestion',
      ...options
    });
  }

  // ===== 정보 조회 메서드 =====
  getPresetInfo(): PresetInfo {
    return PRESET_INFO;
  }

  getModeInfo(): ModeInfo {
    return MODE_INFO;
  }

  getTierInfo(): TierInfo {
    return TIER_INFO;
  }

  getAvailableTones(): Tone[] {
    return [...TONE_PRESETS];
  }

  getAvailableModes(): Mode[] {
    return [...MODE_PRESETS];
  }

  getAvailableTiers(): Tier[] {
    return [...TIER_PRESETS];
  }

  getSupportedLanguages(): SupportedLang[] {
    return [...SUPPORTED_LANGS];
  }

  getAvailableProviders(): LLMProvider[] {
    return [...LLM_PROVIDERS];
  }

  // ===== 유틸리티 메서드 =====
  getApiKey(): string {
    return this.client.getApiKey();
  }

  getConfig() {
    return this.client.getConfig();
  }

  updateConfig(newConfig: Partial<HUALiteConfig>): void {
    this.client.updateConfig(newConfig);
  }

  // ===== 이벤트 시스템 =====
  on(event: string, listener: (event: any) => void): void {
    this.client.on(event, listener);
  }

  off(event: string, listener: (event: any) => void): void {
    this.client.off(event, listener);
  }

  // ===== 검증 메서드 =====
  validateTone(tone: string): tone is Tone {
    return TONE_PRESETS.includes(tone as Tone);
  }

  validateMode(mode: string): mode is Mode {
    return MODE_PRESETS.includes(mode as Mode);
  }

  validateTier(tier: number): tier is Tier {
    return TIER_PRESETS.includes(tier as Tier);
  }

  validateLanguage(lang: string): lang is SupportedLang {
    return SUPPORTED_LANGS.includes(lang as SupportedLang);
  }

  validateProvider(provider: string): provider is LLMProvider {
    return LLM_PROVIDERS.includes(provider as LLMProvider);
  }

  // ===== 배치 처리 =====
  async batchChat(requests: ChatRequest[]): Promise<ChatResponse[]> {
    const promises = requests.map(request => this.chat(request));
    return Promise.all(promises);
  }

  // ===== 스트림 처리 (향후 확장) =====
  async *streamChat(request: ChatRequest): AsyncGenerator<string> {
    // 현재는 일반 응답을 스트림으로 변환
    const response = await this.chat(request);
    yield response.data.message;
  }
}

// ===== 정적 메서드 =====
export namespace HUALite {
  // 정적 API 키 발급
  export async function issueKey(baseUrl?: string): Promise<string> {
    const client = new HUALiteClient('dummy', { baseUrl });
    return client.issueKey();
  }

  // 검증 유틸리티
  export function validateApiKey(apiKey: string): boolean {
    return Boolean(apiKey && apiKey.trim().length > 0 && apiKey.startsWith('hua_'));
  }

  // 프리셋 정보
  export const presets = {
    tones: PRESET_INFO,
    modes: MODE_INFO,
    tiers: TIER_INFO
  };

  // 상수
  export const constants = {
    TONE_PRESETS,
    MODE_PRESETS,
    TIER_PRESETS,
    SUPPORTED_LANGS,
    LLM_PROVIDERS
  };
}

// ===== 타입 재내보내기 =====
export * from './types';
export { 
  HUAError,
  MissingApiKeyError,
  ValidationError,
  NetworkError,
  TimeoutError,
  ServerError,
  AuthenticationError,
  InvalidApiKeyError,
  GuestKeyLimitExceededError,
  RateLimitExceededError,
  InsufficientCreditsError,
  MissingMessageError,
  InvalidToneError,
  InvalidModeError,
  InvalidTierError,
  InvalidLanguageError,
  OpenAIApiError,
  ConfigurationError,
  RetryLimitExceededError,
  createErrorFromResponse,
  isHUAError,
  isRetryableError,
  formatErrorMessage
} from './errors';

// ===== 기본 내보내기 =====
export default HUALite; 