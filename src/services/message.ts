// message.ts
import { Message, Reply } from '../types/message';

export async function sendMessage({ apiKey, sessionId, text, tone, tier }) {
  const res = await fetch('https://api.hua.ai.kr/api/lite-hua', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      session_id: sessionId,
      tone,
      tier,
      text,
    }),
  });
  return res.json();
}
