// session.ts
import { Session, SessionOptions } from '../types/session';

export function createSession(userId: string, options: SessionOptions): Session {
  // 간단한 UUID 생성 (timestamp 기반)
  const id = `session-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return {
    id,
    userId,
    ...options,
  };
}
