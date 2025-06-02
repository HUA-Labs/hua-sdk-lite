import { PresetType, Preset } from '../types/preset';
import { customPresets } from './preset';

function loadCustomPresets() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    const customPath = path.resolve(process.cwd(), 'presets.custom.json');
    if (fs.existsSync(customPath)) {
      const raw = fs.readFileSync(customPath, 'utf-8');
      const arr = JSON.parse(raw) as Preset[];
      for (const preset of arr) {
        if (!preset.key) continue;
        for (const type of ['tone', 'mode', 'tier'] as PresetType[]) {
          if (!customPresets[type]) customPresets[type] = [];
          customPresets[type]!.push(preset);
        }
      }
    }
  } catch (e) {
    // Node.js 환경에서만 에러 무시
  }
}

// Node.js 환경에서만 실행
if (typeof window === 'undefined') {
  loadCustomPresets();
} 