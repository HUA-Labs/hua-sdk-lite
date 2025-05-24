// preset.ts
export async function loadPreset(type: 'tone' | 'mode', key: string): Promise<string> {
  const presets = {
    tone: { gentle: '부드러운 톤입니다.' },
    mode: { companion: '동반자 모드입니다.' }
  };

  const presetValue = presets[type]?.[key];

  if (presetValue) {
    return presetValue;
  } else {
    throw new Error('존재하지 않는 프리셋입니다');
  }
}
