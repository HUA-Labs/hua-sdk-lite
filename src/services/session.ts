// session.ts
import { Session, SessionOptions } from '../types/session';

// In-memory store for session data

interface StoredSessionDetails {
  userId: string;
  tone: string;
  mode: string;
  tier?: string; // Re-added tier
  lang: string;
}

const sessionStore: Record<string, StoredSessionDetails> = {};

// Function to retrieve session details (will be used by sendMessage)
export function getSessionDetails(sessionId: string): StoredSessionDetails | undefined {
  return sessionStore[sessionId];
}

export async function createSession(userId: string, options: { tone: string, mode: string, tier?: string, lang?: string }) {
  const id = `session-${Date.now()}-${Math.floor(Math.random() * 1e4)}`;
  sessionStore[id] = {
    userId,
    tone: options.tone,
    mode: options.mode,
    tier: options.tier,
    lang: options.lang || 'ko',
  };
  return { id, ...sessionStore[id] };
}
