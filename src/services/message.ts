// message.ts
// import { Message, Reply } from '../types/message'; // Keep if types are still relevant, or remove.
import { getSessionDetails } from './session'; // Ensure correct path

export async function sendMessage(sessionId: string, message: string): Promise<string> {
  const sessionDetails = getSessionDetails(sessionId);
  if (!sessionDetails) {
    throw new Error(`Session not found for ID: ${sessionId}`);
  }

  const apiKey = process.env.HUA_API_KEY;
  if (!apiKey) {
    throw new Error('HUA_API_KEY environment variable is not set.');
  }

  const { tone, mode } = sessionDetails;

  const res = await fetch('https://api.hua.ai.kr/api/lite-hua', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      session_id: sessionId,
      text: message, // 'text' is the field name the API expects
      tone,
      mode, // Added mode
      // 'tier' is omitted as per plan
    }),
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
