import { analyzeIntent } from '../src/services/analyze';

const testCasesKo = [
  '나 진짜 지쳤어',
  '오늘 너무 행복해!',
  '이 문제 어떻게 해결하지?',
  '고마워, 덕분에 힘이 나',
  '별다른 감정이 없어',
];

const testCasesEn = [
  'I am so tired today.',
  'Congratulations on your promotion!',
  'How can I solve this problem?',
  'Thank you so much, I feel great!',
  'Nothing special.',
];

console.log('--- 한글 인텐트 테스트 ---');
testCasesKo.forEach(text => {
  const result = analyzeIntent(text, 'ko');
  console.log(`입력: "${text}" → 추천:`, result);
});

console.log('\n--- English Intent Test ---');
testCasesEn.forEach(text => {
  const result = analyzeIntent(text, 'en');
  console.log(`Input: "${text}" → Suggestion:`, result);
}); 