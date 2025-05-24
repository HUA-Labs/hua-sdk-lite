// session.ts
export async function createSession(userId: string, options: { tone: string; mode: string }) {
  return { id: `session-${Date.now()}`, userId, ...options };
}
