import { loadPreset } from '../src/services/preset';
import type { PresetType } from '../src/types/preset';

async function testPresetI18n() {
  const langs = ['en', 'in-en', 'ko', 'pt-br', 'zh', 'fr'] as const;
  const types: { type: PresetType; key: string }[] = [
    { type: 'tone', key: 'gentle' },
    { type: 'mode', key: 'companion' },
    { type: 'tier', key: 'B1' },
  ];

  for (const lang of langs) {
    for (const { type, key } of types) {
      const desc = await loadPreset(type, key, lang);
      console.log(`[${type}:${key}] (${lang}) →`, desc);
    }
  }
}

testPresetI18n();