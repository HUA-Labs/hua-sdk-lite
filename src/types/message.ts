// message.ts - 메시지 전송 타입 정의

export interface Message {
  sessionId: string;
  text: string;
}

export interface Reply {
  sessionId: string;
  reply: string;
}
