// 감정/상황별 키워드 기반 tone/mode 추천 유틸

export interface AnalyzeResult {
  tone: string;
  mode: string;
  reason?: string;
  matchedKeyword?: string;
}

const intentKeywordMap = {
  ko: [
    {
      keywords: ['지쳤', '피곤', '힘들', '고단', '우울', '슬프', '눈물', '버겁'],
      tone: 'gentle',
      mode: 'listener',
      reason: '피로/슬픔/지침 키워드 감지 (규칙 기반 목업)'
    },
    {
      keywords: ['축하', '기뻐', '행복', '좋아', '즐거', '감사', '신남', '신나게'],
      tone: 'energetic',
      mode: 'companion',
      reason: '기쁨/축하/긍정 키워드 감지 (규칙 기반 목업)'
    },
    {
      keywords: ['조언', '도움', '해결', '방법', '어떻게', '고민', '문제'],
      tone: 'neutral',
      mode: 'coach',
      reason: '문제해결/조언/고민 키워드 감지 (규칙 기반 목업)'
    }
  ],
  en: [
    {
      keywords: ['tired', 'exhausted', 'worn out', 'burned out', 'drained', 'down', 'blue', 'rough day'],
      tone: 'gentle',
      mode: 'listener',
      reason: 'Fatigue/sadness keyword detected (rule-based mockup)'
    },
    {
      keywords: ['congrats', 'congratulations', 'happy', 'joy', 'delighted', 'excited', 'grateful', 'thank you', 'awesome', 'great'],
      tone: 'energetic',
      mode: 'companion',
      reason: 'Joy/celebration/positive keyword detected (rule-based mockup)'
    },
    {
      keywords: ['advice', 'help', 'solution', 'how to', 'problem', 'trouble', 'worry', 'question'],
      tone: 'neutral',
      mode: 'coach',
      reason: 'Advice/solution/worry keyword detected (rule-based mockup)'
    },
    {
      keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"],
      tone: "neutral",
      mode: "companion",
      reason: "Greeting keyword detected (rule-based mockup)"
    }
  ]
};

export function analyzeIntent(text: string, lang: 'ko' | 'en' = 'ko'): AnalyzeResult {
  const normalized = text.toLowerCase();
  const map = intentKeywordMap[lang] || intentKeywordMap['ko'];
  for (const rule of map) {
    for (const kw of rule.keywords) {
      if (normalized.includes(kw)) {
        return {
          tone: rule.tone,
          mode: rule.mode,
          reason: rule.reason,
          matchedKeyword: kw
        };
      }
    }
  }
  return {
    tone: 'neutral',
    mode: 'listener',
    reason: lang === 'en' ? 'No matching keyword (rule-based mockup)' : '매칭되는 감정/상황 키워드 없음'
  };
} 