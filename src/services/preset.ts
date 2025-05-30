// preset.ts
import type { PresetType, Preset, SupportedLang } from '../types/preset';
import tonePresets from '../presets/tone.json';
import modePresets from '../presets/mode.json';
import tierPresets from '../presets/tier.json';

let customPresets: Partial<Record<PresetType, Preset[]>> = {};

// Node.js 환경에서만 커스텀 프리셋 로딩
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
      // 타입 추론: tone/mode/tier 중 어디에 속하는지 key로 구분 불가하므로, 사용자가 명시해야 함
      // 여기서는 key prefix로 구분하거나, 예시에서는 tone만 지원
      // 실제 서비스에서는 tone/mode/tier별로 분리된 custom 파일을 쓰는 것도 추천
      // 여기서는 key가 tone/mode/tier에 모두 있을 수 있으므로, 각 타입별로 머지
      for (const type of ['tone', 'mode', 'tier'] as PresetType[]) {
        if (!customPresets[type]) customPresets[type] = [];
        customPresets[type]!.push(preset);
      }
    }
  }
} catch (e) {
  // 브라우저 환경 등에서는 무시
}

function mergePresets(base: Preset[], custom?: Preset[]): Preset[] {
  if (!custom || custom.length === 0) return base;
  const map = new Map(base.map(p => [p.key, p]));
  for (const c of custom) {
    map.set(c.key, { ...map.get(c.key), ...c });
  }
  return Array.from(map.values());
}

function getPresetMap(): Record<PresetType, Preset[]> {
  return {
    tone: mergePresets(tonePresets as Preset[], customPresets.tone),
    mode: mergePresets(modePresets as Preset[], customPresets.mode),
    tier: mergePresets(tierPresets as Preset[], customPresets.tier),
  };
}

const supportedLangs: SupportedLang[] = ['en', 'in-en', 'kr', 'pt-br', 'zh', 'fr'];

export async function loadPreset(
  type: PresetType,
  key: string,
  lang: SupportedLang = 'kr'
): Promise<string> {
  const preset = getPresetMap()[type].find(p => p.key === key);
  if (preset) {
    // description 우선, 없으면 이름 반환
    if (preset.description && preset.description[lang]) {
      return preset.description[lang]!;
    }
    // description에 해당 언어가 없으면 kr로 fallback
    if (preset.description && preset.description['kr']) {
      return preset.description['kr']!;
    }
    // 이름 필드 반환 (description이 없을 때)
    if (preset[lang]) {
      return preset[lang]!;
    }
    if (preset['kr']) {
      return preset['kr']!;
    }
    return preset.key;
  } else {
    throw new Error(lang === 'en' ? 'Preset not found.' : '존재하지 않는 프리셋입니다');
  }
}

export function getPresets(type: PresetType): Preset[] {
  return getPresetMap()[type];
}

export function getPresetKeys(type: PresetType): string[] {
  return getPresetMap()[type].map(p => p.key);
}

export function getTonePresets() {
  return getPresetKeys('tone');
}

export function getModePresets() {
  return getPresetKeys('mode');
}

export function getTierPresets() {
  return getPresetKeys('tier');
}
