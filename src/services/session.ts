// session.ts
import { Session, SessionOptions } from '../types/session';

// In-memory store for session data
const sessionStore: Record<string, { userId: string, tone: string, mode: string }> = {};

// Function to retrieve session details (will be used by sendMessage)
export function getSessionDetails(sessionId: string): { userId: string, tone: string, mode: string } | undefined {
  return sessionStore[sessionId];
}

export async function createSession(userId: string, options: SessionOptions): Promise<Session> {
  const id = `session-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  
  // Store session details in the sessionStore
  sessionStore[id] = {
    userId,
    tone: options.tone,
    mode: options.mode,
  };
  
  // Return the session object
  return {
    id,
    userId,
    tone: options.tone,
    mode: options.mode,
  };
}
