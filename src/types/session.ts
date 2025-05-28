// session.ts - 세션 타입 정의

export interface SessionOptions {
  tone: string;
  mode: string;
  tier?: string; // Re-added tier
}

export interface Session {
  id: string;
  userId: string;
  tone: string;
  mode: string;
  tier?: string; // Re-added tier
}
