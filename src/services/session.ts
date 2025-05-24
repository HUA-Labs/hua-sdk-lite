// session.ts
import { Session, SessionOptions } from '../types/session';

export async function createSession(userId: string, options: SessionOptions): Promise<Session> {
  return { id: `session-${Date.now()}`, userId, ...options };
}
