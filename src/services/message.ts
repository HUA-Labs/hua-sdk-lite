// message.ts
// import { Message, Reply } from '../types/message'; // Keep if types are still relevant, or remove.
import { getSessionDetails } from './session'; // Ensure correct path

export async function sendMessage(sessionId: string, message: string): Promise<string> {
  const sessionDetails = getSessionDetails(sessionId);
  if (!sessionDetails) {
    throw new Error(`Session not found for ID: ${sessionId}`);
  }

  let apiKey: string | undefined;

  if (typeof window !== 'undefined') {
    // 브라우저 환경: Vite의 환경변수 사용
    apiKey = (import.meta as any).env.VITE_HUA_API_KEY;
  } else {
    // Node.js 환경
    apiKey = process.env.HUA_API_KEY;
  }

  if (!apiKey) {
    throw new Error('HUA_API_KEY environment variable is not set.');
  }

  const { tone, mode, tier, lang } = sessionDetails; // Extract tier and lang

  // Construct payload, conditionally adding tier and lang if they exist
  const payload: any = {
    session_id: sessionId,
    text: message,
    tone,
    mode,
  };

  if (tier !== undefined) { // Only add tier to payload if it has a value
    payload.tier = tier;
  }

  if (lang !== undefined) {
    payload.lang = lang;
  }

  const res = await fetch('https://api.hua.ai.kr/api/lite-hua', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload), // Send the constructed payload
  });

  if (!res.ok) {
    const errorText = await res.text(); // Get more error info if possible
    throw new Error(`API request failed: ${res.status} ${res.statusText}. Details: ${errorText}`);
  }

  const data = await res.json();

  // Assuming the API response structure from README: { "response": "...", "status": "ok" }
  if (!data || typeof data.response !== 'string') {
    throw new Error('Invalid API response structure. Missing "response" field.');
  }

  return `🤖 감응 응답: ${data.response}`;
}
