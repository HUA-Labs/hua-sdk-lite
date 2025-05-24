// preset.ts
export function loadPreset(type: 'tone' | 'mode', key: string) {
  const presets = {
    tone: { gentle: '부드러운 톤입니다.' },
    mode: { companion: '동반자 모드입니다.' }
  };
  return presets[type][key] || '프리셋 없음';
}
