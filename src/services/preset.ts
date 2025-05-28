// preset.ts
import type { PresetType, Preset } from '../types/preset';
import tonePresets from '../presets/tone.json';
import modePresets from '../presets/mode.json';
import tierPresets from '../presets/tier.json';

const presetMap: Record<PresetType, Preset[]> = {
  tone: tonePresets as Preset[],
  mode: modePresets as Preset[],
  tier: tierPresets as Preset[],
};

export async function loadPreset(type: PresetType, key: string, lang: 'ko' | 'en' = 'ko'): Promise<string> {
  const preset = presetMap[type].find(p => p.key === key);
  if (preset) {
    // lang이 있으면 해당 언어 설명, 없으면 기본값(ko)
    return preset.description[lang] || preset.description.ko;
  } else {
    throw new Error(lang === 'en' ? 'Preset not found.' : '존재하지 않는 프리셋입니다');
  }
}

export function getPresets(type: PresetType): Preset[] {
  return presetMap[type];
}

export function getPresetKeys(type: PresetType): string[] {
  return presetMap[type].map(p => p.key);
}

export function getTonePresets() {
  return ["gentle", "energetic", "neutral"];
}

export function getModePresets() {
  return ["companion", "coach", "listener"];
}

export function getTierPresets() {
  return ["F2", "S1", "B1"];
}
