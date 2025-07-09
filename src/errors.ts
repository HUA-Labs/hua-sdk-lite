// 💔 HUA SDK Lite v2.0.0 - 에러 처리
// 리듬이의 마음처럼 사용자를 이해하고 따뜻하게 안내하는 에러들 💖

import { HUAError as HUAErrorType } from './types';

// ===== 기본 HUA 에러 클래스 =====
export class HUAError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: string;
  public readonly isHUAError = true;

  constructor(code: string, message: string, statusCode: number = 500, details?: string) {
    super(message);
    this.name = 'HUAError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }

  // 에러를 JSON 형태로 변환
  toJSON(): HUAErrorType {
    return {
      error: this.code,
      message: this.message,
      details: this.details
    };
  }
}

// ===== 인증 관련 에러 =====
export class AuthenticationError extends HUAError {
  constructor(message: string = '인증에 실패했습니다. API 키를 확인해주세요.', details?: string) {
    super('AUTHENTICATION_ERROR', message, 401, details);
    this.name = 'AuthenticationError';
  }
}

export class MissingApiKeyError extends HUAError {
  constructor(message: string = 'API 키가 필요합니다. Authorization 헤더에 Bearer 토큰을 포함해주세요.') {
    super('MISSING_API_KEY', message, 401);
    this.name = 'MissingApiKeyError';
  }
}

export class InvalidApiKeyError extends HUAError {
  constructor(message: string = '유효하지 않은 API 키입니다.') {
    super('INVALID_API_KEY', message, 401);
    this.name = 'InvalidApiKeyError';
  }
}

export class GuestKeyLimitExceededError extends HUAError {
  constructor(message: string = '게스트 키 사용 한도를 초과했습니다. 새로운 키를 발급받아주세요.') {
    super('GUEST_KEY_LIMIT_EXCEEDED', message, 401);
    this.name = 'GuestKeyLimitExceededError';
  }
}

// ===== 요청 제한 관련 에러 =====
export class RateLimitExceededError extends HUAError {
  constructor(message: string = '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.', details?: string) {
    super('RATE_LIMIT_EXCEEDED', message, 429, details);
    this.name = 'RateLimitExceededError';
  }
}

export class InsufficientCreditsError extends HUAError {
  constructor(message: string = '크레딧이 부족합니다. 더 많은 크레딧을 충전해주세요.', details?: string) {
    super('INSUFFICIENT_CREDITS', message, 402, details);
    this.name = 'InsufficientCreditsError';
  }
}

// ===== 입력 검증 관련 에러 =====
export class ValidationError extends HUAError {
  constructor(message: string = '입력 데이터가 올바르지 않습니다.', details?: string) {
    super('VALIDATION_FAILED', message, 400, details);
    this.name = 'ValidationError';
  }
}

export class MissingMessageError extends HUAError {
  constructor(message: string = '메시지가 필요합니다.') {
    super('MISSING_MESSAGE', message, 400);
    this.name = 'MissingMessageError';
  }
}

export class InvalidToneError extends HUAError {
  constructor(tone: string, message: string = `유효하지 않은 톤입니다: ${tone}. 사용 가능한 톤: gentle, warm, cheerful, quirky, delicate`) {
    super('INVALID_TONE', message, 400);
    this.name = 'InvalidToneError';
  }
}

export class InvalidModeError extends HUAError {
  constructor(mode: string, message: string = `유효하지 않은 모드입니다: ${mode}. 사용 가능한 모드: empathy, analysis, suggestion, praise, playful`) {
    super('INVALID_MODE', message, 400);
    this.name = 'InvalidModeError';
  }
}

export class InvalidTierError extends HUAError {
  constructor(tier: number, message: string = `유효하지 않은 등급입니다: ${tier}. 사용 가능한 등급: 1.0, 2.0, 3.0`) {
    super('INVALID_TIER', message, 400);
    this.name = 'InvalidTierError';
  }
}

export class InvalidLanguageError extends HUAError {
  constructor(lang: string, message: string = `지원하지 않는 언어입니다: ${lang}. 지원 언어: ko, en`) {
    super('INVALID_LANGUAGE', message, 400);
    this.name = 'InvalidLanguageError';
  }
}

// ===== 네트워크 관련 에러 =====
export class NetworkError extends HUAError {
  constructor(message: string = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.', details?: string) {
    super('NETWORK_ERROR', message, 0, details);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends HUAError {
  constructor(message: string = '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.', details?: string) {
    super('TIMEOUT_ERROR', message, 408, details);
    this.name = 'TimeoutError';
  }
}

// ===== 서버 관련 에러 =====
export class ServerError extends HUAError {
  constructor(message: string = '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', details?: string) {
    super('SERVER_ERROR', message, 500, details);
    this.name = 'ServerError';
  }
}

export class OpenAIApiError extends HUAError {
  constructor(message: string = 'OpenAI API 오류가 발생했습니다.', details?: string) {
    super('OPENAI_API_ERROR', message, 500, details);
    this.name = 'OpenAIApiError';
  }
}

// ===== SDK 관련 에러 =====
export class ConfigurationError extends HUAError {
  constructor(message: string = 'SDK 설정이 올바르지 않습니다.', details?: string) {
    super('CONFIGURATION_ERROR', message, 500, details);
    this.name = 'ConfigurationError';
  }
}

export class RetryLimitExceededError extends HUAError {
  constructor(message: string = '최대 재시도 횟수를 초과했습니다.', details?: string) {
    super('RETRY_LIMIT_EXCEEDED', message, 500, details);
    this.name = 'RetryLimitExceededError';
  }
}

// ===== 에러 팩토리 함수 =====
export function createErrorFromResponse(response: any, statusCode: number): HUAError {
  const errorCode = response?.error || 'UNKNOWN_ERROR';
  const message = response?.message || '알 수 없는 오류가 발생했습니다.';
  const details = response?.details;

  switch (errorCode) {
    case 'MISSING_API_KEY':
      return new MissingApiKeyError(message);
    case 'INVALID_API_KEY':
      return new InvalidApiKeyError(message);
    case 'GUEST_KEY_LIMIT_EXCEEDED':
      return new GuestKeyLimitExceededError(message);
    case 'RATE_LIMIT_EXCEEDED':
      return new RateLimitExceededError(message, details);
    case 'INSUFFICIENT_CREDITS':
      return new InsufficientCreditsError(message, details);
    case 'VALIDATION_FAILED':
      return new ValidationError(message, details);
    case 'MISSING_MESSAGE':
      return new MissingMessageError(message);
    case 'OPENAI_API_ERROR':
      return new OpenAIApiError(message, details);
    case 'SERVER_CONFIG_ERROR':
      return new ServerError(message, details);
    default:
      return new HUAError(errorCode, message, statusCode, details);
  }
}

// ===== 에러 유틸리티 함수 =====
export function isHUAError(error: any): error is HUAError {
  return error && error.isHUAError === true;
}

export function isRetryableError(error: HUAError): boolean {
  const retryableCodes = [
    'NETWORK_ERROR',
    'TIMEOUT_ERROR',
    'SERVER_ERROR',
    'OPENAI_API_ERROR'
  ];
  return retryableCodes.includes(error.code);
}

// ===== 에러 메시지 포맷팅 =====
export function formatErrorMessage(error: HUAError, lang: 'ko' | 'en' = 'ko'): string {
  if (lang === 'en') {
    return `${error.message}${error.details ? ` (${error.details})` : ''}`;
  }
  return `${error.message}${error.details ? ` (${error.details})` : ''}`;
} 