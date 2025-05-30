// preset.ts - 프리셋 다국어/설명 타입 정의

export type PresetType = 'tone' | 'mode' | 'tier';

export type SupportedLang = 'en' | 'in-en' | 'ko' | 'pt-br' | 'zh' | 'fr';

export type PresetDescription = {
  [lang in SupportedLang]?: string;
};

export interface Preset {
  key: string;
  en?: string;
  'in-en'?: string;
  ko?: string;
  'pt-br'?: string;
  zh?: string;
  fr?: string;
  description: PresetDescription;
} 