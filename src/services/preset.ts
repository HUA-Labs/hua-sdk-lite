// preset.ts
import type { PresetType, Preset, SupportedLang } from '../types/preset';
import tonePresets from '../presets/tone.json';
import modePresets from '../presets/mode.json';
import tierPresets from '../presets/tier.json';

export let customPresets: Partial<Record<PresetType, Preset[]>> = {};

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

const supportedLangs: SupportedLang[] = ['en', 'in-en', 'ko', 'pt-br', 'zh', 'fr'];

export async function loadPreset(
  type: PresetType,
  key: string,
  lang: SupportedLang = 'ko'
): Promise<string> {
  const preset = getPresetMap()[type].find(p => p.key === key);
  if (preset) {
    // description 우선, 없으면 이름 반환
    if (preset.description && preset.description[lang]) {
      return preset.description[lang]!;
    }
    // description에 해당 언어가 없으면 ko로 fallback
    if (preset.description && preset.description['ko']) {
      return preset.description['ko']!;
    }
    // 이름 필드 반환 (description이 없을 때)
    if (preset[lang]) {
      return preset[lang]!;
    }
    if (preset['ko']) {
      return preset['ko']!;
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
