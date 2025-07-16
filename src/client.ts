// 🌟 HUA SDK Lite v2.0.0 - API 클라이언트
// 리듬이의 마음처럼 사용자를 배려하는 섬세한 클라이언트 💖

import {
  ChatRequest,
  ChatResponse,
  HUALiteConfig,
  DEFAULT_CONFIG,
  TONE_PRESETS,
  MODE_PRESETS,
  TIER_PRESETS,
  SUPPORTED_LANGS,
  LLM_PROVIDERS,
  HUAEvent,
  EventListener
} from './types';

import {
  HUAError,
  MissingApiKeyError,
  ValidationError,
  MissingMessageError,
  InvalidToneError,
  InvalidModeError,
  InvalidTierError,
  InvalidLanguageError,
  NetworkError,
  TimeoutError,
  ServerError,
  RetryLimitExceededError,
  createErrorFromResponse,
  isRetryableError
} from './errors';

// ===== API 클라이언트 클래스 =====
export class HUALiteClient {
  private apiKey: string;
  private config: Required<HUALiteConfig>;
  private eventListeners: Map<string, EventListener[]> = new Map();

  constructor(apiKey: string, config: HUALiteConfig = {}) {
    if (!apiKey || apiKey.trim().length === 0) {
      throw new MissingApiKeyError();
    }

    // API 키 형식 검증 추가
    const trimmedKey = apiKey.trim();
    if (trimmedKey.length < 10) {
      throw new ValidationError(`API 키는 최소 10자 이상이어야 합니다. 현재 길이: ${trimmedKey.length}`);
    }

    // API 키 형식 검증
    // 게스트 키: 64자리 랜덤 문자열
    // 회원가입 키: hua_ + 랜덤 문자열
    const guestKeyPattern = /^[A-Za-z0-9\-_]{64}$/;
    const userKeyPattern = /^hua_[A-Za-z0-9]{20,}$/;
    
    if (!guestKeyPattern.test(trimmedKey) && !userKeyPattern.test(trimmedKey)) {
      throw new ValidationError('API 키는 64자리 랜덤 문자열(게스트) 또는 "hua_"로 시작하는 문자열(회원가입)이어야 합니다.');
    }

    this.apiKey = trimmedKey;
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ===== 이벤트 시스템 =====
  on(event: string, listener: EventListener): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(listener);
  }

  off(event: string, listener: EventListener): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: HUAEvent): void {
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.error('Event listener error:', error);
        }
      });
    }
  }

  // ===== 입력 검증 =====
  private validateChatRequest(request: ChatRequest): void {
    const errors: string[] = [];

    // 메시지 검증
    if (!request.message || request.message.trim().length === 0) {
      throw new MissingMessageError();
    }

    if (request.message.length > 1000) {
      errors.push('메시지는 1000자를 초과할 수 없습니다.');
    }

    // 톤 검증
    if (request.tone && !TONE_PRESETS.includes(request.tone)) {
      throw new InvalidToneError(request.tone);
    }

    // 모드 검증
    if (request.mode && !MODE_PRESETS.includes(request.mode)) {
      throw new InvalidModeError(request.mode);
    }

    // 등급 검증
    if (request.tier && !TIER_PRESETS.includes(request.tier)) {
      throw new InvalidTierError(request.tier);
    }

    // 언어 검증
    if (request.lang && !SUPPORTED_LANGS.includes(request.lang)) {
      throw new InvalidLanguageError(request.lang);
    }

    // 제공자 검증
    if (request.provider && !LLM_PROVIDERS.includes(request.provider)) {
      errors.push(`지원하지 않는 제공자입니다: ${request.provider}. 지원 제공자: ${LLM_PROVIDERS.join(', ')}`);
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join('; '));
    }
  }

  // ===== HTTP 요청 유틸리티 =====
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers
      },
      ...options
    };

    // 이벤트 발생
    this.emit({
      type: 'request',
      timestamp: new Date(),
      data: { url, method: requestOptions.method }
    });

    let lastError: HUAError | null = null;

    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          ...requestOptions,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // 응답 이벤트 발생
        this.emit({
          type: 'response',
          timestamp: new Date(),
          data: { status: response.status, url }
        });

        if (!response.ok) {
          let errorData: any;
          try {
            errorData = await response.json();
          } catch {
            errorData = { error: 'UNKNOWN_ERROR', message: `HTTP ${response.status}` };
          }

          const error = createErrorFromResponse(errorData, response.status);
          
          // 재시도 가능한 에러인지 확인
          const retryableStatus = [502, 503, 504];
          if (
            attempt < this.config.retries &&
            (isRetryableError(error) || retryableStatus.includes(response.status))
          ) {
            lastError = error;
            // 재시도 이벤트 발생
            this.emit({
              type: 'retry',
              timestamp: new Date(),
              data: { attempt: attempt + 1, error: error.code }
            });
            // 지수 백오프
            const delay = this.config.retryDelay * Math.pow(2, attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }

          throw error;
        }

        const data = await response.json();
        return data as T;

      } catch (error) {
        if (error instanceof HUAError) {
          throw error;
        }

        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new TimeoutError();
          }
          
          if (error.message.includes('fetch') || error.message.includes('network')) {
            if (attempt < this.config.retries) {
              lastError = new NetworkError(error.message);
              await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
              continue;
            }
            throw new NetworkError(error.message);
          }
        }

        throw new ServerError('알 수 없는 오류가 발생했습니다.');
      }
    }

    // 모든 재시도 실패
    throw new RetryLimitExceededError(lastError?.message);
  }

  // ===== 메인 API 메서드 =====
  async chat(request: ChatRequest): Promise<ChatResponse> {
    try {
      // 입력 검증
      this.validateChatRequest(request);

      // 요청 데이터 준비
      const requestData = {
        message: request.message.trim(),
        tone: request.tone || 'gentle',
        mode: request.mode || 'empathy',
        tier: request.tier || 1.0,
        lang: request.lang || 'ko',
        provider: request.provider || 'openai',
        ...(request.llmApiKey && { llmApiKey: request.llmApiKey })
      };

      // API 호출
      const response = await this.makeRequest<ChatResponse>('/api/lite', {
        body: JSON.stringify(requestData)
      });

      return response;

    } catch (error) {
      // 에러 이벤트 발생
      this.emit({
        type: 'error',
        timestamp: new Date(),
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });

      throw error;
    }
  }

  // ===== API 키 발급 =====
  async issueKey(): Promise<string> {
    try {
      const response = await this.makeRequest<{ apiKey: string }>('/api/issue-key', {
        headers: {
          'Authorization': '' // API 키 발급은 인증 불필요
        }
      });

      return response.apiKey;
    } catch (error) {
      this.emit({
        type: 'error',
        timestamp: new Date(),
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });

      throw error;
    }
  }

  // ===== 유틸리티 메서드 =====
  getApiKey(): string {
    return this.apiKey;
  }

  getConfig(): Required<HUALiteConfig> {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<HUALiteConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
} 