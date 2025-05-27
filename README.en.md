# hua-sdk-lite (English)

> This is the **English version** of the documentation. For Korean, see [README.md](./README.md).

---

**Note:**

- All API responses are in Korean. Please use a translation tool if you need English responses.
- (예시 응답은 한글로 반환됩니다. 번역이 필요하면 Papago, DeepL, Google Translate 등을 사용하세요!)

---

## **Install & Quick Start**

```bash
npm install hua-sdk-lite
```

```ts
import { sendMessage } from 'hua-sdk-lite';

const apiKey = '<YOUR_API_KEY>';
const sessionId = 'demo-session-1';
const tone = 'gentle';
const tier = 'F2';
const text = '요즘 너무 지쳤어...'; // (Korean)

const reply = await sendMessage({ apiKey, sessionId, text, tone, tier });
console.log('[API Response]', reply);
```

---

## Presets

- tone: gentle, energetic, neutral
- mode: companion, coach, listener
- tier: F2, S1, B1

---

## API Endpoint

- Production: `https://api.hua.ai.kr/api/lite-hua`
- Get your API Key at [api.hua.ai.kr](https://api.hua.ai.kr)

---

## Usage Limits

- Daily: 200 calls (3 for testing)
- Monthly: 5000 calls
- 429 error if exceeded

---

## Example Response (Korean)

```json
{
  "response": "오늘은 조금 쉬어가도 괜찮아요.",
  "status": "ok",
  "session_id": "demo-session-1"
}
```

> All responses are in Korean. Please translate as needed!

---

## Contact / Issues

- <echonet.ais@gmail.com>

---

For more details, see the [Korean README](./README.md).
