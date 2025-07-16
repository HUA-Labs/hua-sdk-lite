import { HUALite } from '../src/index';

describe('HUALite SDK', () => {
  let hua: HUALite;
  const testApiKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  beforeEach(() => {
    hua = new HUALite(testApiKey);
  });

  describe('Constructor', () => {
    it('should create HUALite instance with API key', () => {
      expect(hua).toBeInstanceOf(HUALite);
      expect(hua.getApiKey()).toBe(testApiKey);
    });

    it('should create instance with custom config', () => {
      const config = {
        baseUrl: 'https://custom-api.example.com',
        timeout: 10000,
        retries: 3
      };
      const customHua = new HUALite(testApiKey, config);
      expect(customHua.getConfig()).toMatchObject(config);
    });
  });

  describe('Validation Methods', () => {
    it('should validate tone correctly', () => {
      expect(hua.validateTone('gentle')).toBe(true);
      expect(hua.validateTone('warm')).toBe(true);
      expect(hua.validateTone('invalid-tone')).toBe(false);
    });

    it('should validate mode correctly', () => {
      expect(hua.validateMode('empathy')).toBe(true);
      expect(hua.validateMode('analysis')).toBe(true);
      expect(hua.validateMode('invalid-mode')).toBe(false);
    });

    it('should validate tier correctly', () => {
      expect(hua.validateTier(1.0)).toBe(true);
      expect(hua.validateTier(2.0)).toBe(true);
      expect(hua.validateTier(3.0)).toBe(true);
      expect(hua.validateTier(4.0)).toBe(false);
    });

    it('should validate language correctly', () => {
      expect(hua.validateLanguage('ko')).toBe(true);
      expect(hua.validateLanguage('en')).toBe(true);
      expect(hua.validateLanguage('invalid-lang')).toBe(false);
    });
  });

  describe('Info Methods', () => {
    it('should return available tones', () => {
      const tones = hua.getAvailableTones();
      expect(Array.isArray(tones)).toBe(true);
      expect(tones).toContain('gentle');
      expect(tones).toContain('warm');
    });

    it('should return available modes', () => {
      const modes = hua.getAvailableModes();
      expect(Array.isArray(modes)).toBe(true);
      expect(modes).toContain('empathy');
      expect(modes).toContain('analysis');
    });

    it('should return available tiers', () => {
      const tiers = hua.getAvailableTiers();
      expect(Array.isArray(tiers)).toBe(true);
      expect(tiers).toContain(1.0);
      expect(tiers).toContain(2.0);
      expect(tiers).toContain(3.0);
    });

    it('should return supported languages', () => {
      const langs = hua.getSupportedLanguages();
      expect(Array.isArray(langs)).toBe(true);
      expect(langs).toContain('ko');
      expect(langs).toContain('en');
    });

    it('should return preset information', () => {
      const presetInfo = hua.getPresetInfo();
      expect(presetInfo).toHaveProperty('gentle');
      expect(presetInfo.gentle).toHaveProperty('name');
      expect(presetInfo.gentle).toHaveProperty('description');
    });

    it('should return mode information', () => {
      const modeInfo = hua.getModeInfo();
      expect(modeInfo).toHaveProperty('empathy');
      expect(modeInfo.empathy).toHaveProperty('name');
      expect(modeInfo.empathy).toHaveProperty('description');
    });

    it('should return tier information', () => {
      const tierInfo = hua.getTierInfo();
      expect(Object.keys(tierInfo)).toContain('1.0');
      expect(tierInfo['1.0']).toHaveProperty('name');
      expect(tierInfo['1.0']).toHaveProperty('creditCost');
    });
  });
}); 