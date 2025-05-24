// demo.ts - 사용 예제

import { createSession } from '../src/services/session';
import { sendMessage } from '../src/services/message';

async function run() {
  const session = await createSession('user-123', {
    tone: 'gentle',
    mode: 'companion'
  });

  console.log('[세션 생성]', session);

  const reply = await sendMessage({ sessionId: session.id, text: '요즘 너무 지쳤어...' });
  console.log('[GPT 감응 응답]', reply);
}

run();
