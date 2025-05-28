// preset.ts - 프리셋 다국어/설명 타입 정의

export type PresetType = 'tone' | 'mode' | 'tier';

export interface PresetDescription {
  ko: string;
  en: string;
}

export interface Preset {
  key: string;
  ko: string;
  en: string;
  description: PresetDescription;
} 