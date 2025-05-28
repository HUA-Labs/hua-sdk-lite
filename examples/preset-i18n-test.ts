import { loadPreset } from '../src/services/preset';

async function testPresetI18n() {
  console.log(await loadPreset('tone', 'gentle', 'ko')); // 부드럽고 온화한 톤입니다.
  console.log(await loadPreset('tone', 'gentle', 'en')); // A soft and gentle tone.
  console.log(await loadPreset('mode', 'coach', 'ko'));  // 목표 지향적이고 조언을 제공하는 역할.
  console.log(await loadPreset('mode', 'coach', 'en'));  // A goal-oriented and advice-giving role.
  console.log(await loadPreset('tier', 'B1', 'ko'));     // 가장 상세하고 긴 답변.
  console.log(await loadPreset('tier', 'B1', 'en'));     // Most detailed and lengthy answers.
}

testPresetI18n();