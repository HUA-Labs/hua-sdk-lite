// message.ts
export async function sendMessage(sessionId: string, text: string) {
  return { sessionId, reply: `🤖 감응 응답: ${text}` };
}
