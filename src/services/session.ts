// session.ts
import { Session, SessionOptions } from '../types/session';

// In-memory store for session data

interface StoredSessionDetails {
  userId: string;
  tone: string;
  mode: string;
  tier?: string; // Re-added tier
}

const sessionStore: Record<string, StoredSessionDetails> = {};

// Function to retrieve session details (will be used by sendMessage)
export function getSessionDetails(sessionId: string): StoredSessionDetails | undefined {
  return sessionStore[sessionId];
}

export async function createSession(userId: string, options: SessionOptions): Promise<Session> {
  const id = `session-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  
  // Store session details in the sessionStore
  sessionStore[id] = {
    userId,
    tone: options.tone,
    mode: options.mode,
    tier: options.tier, // Added tier
  };
  
  // Return the session object, including tier
  return {
    id,
    userId,
    tone: options.tone,
    mode: options.mode,
    tier: options.tier, // Added tier
  };
}
