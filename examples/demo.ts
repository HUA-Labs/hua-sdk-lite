// demo.ts - 실제 API 호출 예제
import { sendMessage } from '../src/services/message';

async function run() {
  const apiKey = process.env.HUA_API_KEY || '<YOUR_API_KEY_HERE>';
  const sessionId = 'demo-session-1';
  const tone = 'gentle';
  const tier = 'F2';
  const text = '요즘 너무 지쳤어...';

  const reply = await sendMessage({ apiKey, sessionId, text, tone, tier });
  console.log('[API 응답]', reply);
}

run();
