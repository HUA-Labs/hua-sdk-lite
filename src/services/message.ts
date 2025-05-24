// message.ts
import { Message, Reply } from '../types/message';

export async function sendMessage(message: Message): Promise<Reply> {
  return { sessionId: message.sessionId, reply: `🤖 감응 응답: ${message.text}` };
}
