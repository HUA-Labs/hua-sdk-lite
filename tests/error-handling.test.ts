import { HUALite } from '../src/index';

// fetch를 모킹
global.fetch = jest.fn();

describe('Error Handling', () => {
  let hua: HUALite;
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    hua = new HUALite('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_');
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockClear();
  });

  describe('Constructor Errors', () => {
    it('should throw error for empty API key', () => {
      expect(() => new HUALite('')).toThrow();
    });

    it('should throw error for invalid API key format', () => {
      expect(() => new HUALite('invalid-key')).toThrow();
    });

    it('should accept valid guest API key format (64 characters)', () => {
      // 게스트 키: 64자리 랜덤 문자열
      const validGuestKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      expect(() => new HUALite(validGuestKey)).not.toThrow();
    });

    it('should accept valid user API key format (hua_ prefix)', () => {
      // 회원가입 키: hua_ + 랜덤 문자열
      const validUserKey = 'hua_wut4p3hneulrt2ud3mi9rn';
      expect(() => new HUALite(validUserKey)).not.toThrow();
    });

    it('should throw error for API key shorter than 64 characters', () => {
      const shortKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      expect(() => new HUALite(shortKey)).toThrow();
    });

    it('should throw error for API key longer than 64 characters', () => {
      const longKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      expect(() => new HUALite(longKey)).toThrow();
    });

    it('should throw error for API key with invalid characters', () => {
      const invalidKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-@';
      expect(() => new HUALite(invalidKey)).toThrow();
    });
  });

  describe('Network Errors', () => {
    it('should handle timeout errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('timeout'));

      await expect(hua.chat({
        message: 'Hello',
        tone: 'gentle',
        mode: 'empathy'
      })).rejects.toThrow();
    });

    it('should handle connection refused', async () => {
      mockFetch.mockRejectedValueOnce(new Error('ECONNREFUSED'));

      await expect(hua.chat({
        message: 'Hello',
        tone: 'gentle',
        mode: 'empathy'
      })).rejects.toThrow();
    });
  });

  describe('API Response Errors', () => {
    it('should handle 401 Unauthorized', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: async () => 'Invalid API key'
      } as Response);

      await expect(hua.chat({
        message: 'Hello',
        tone: 'gentle',
        mode: 'empathy'
      })).rejects.toThrow('HTTP 401');
    });

    it('should handle 429 Rate Limited', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        text: async () => 'Rate limit exceeded'
      } as Response);

      await expect(hua.chat({
        message: 'Hello',
        tone: 'gentle',
        mode: 'empathy'
      })).rejects.toThrow('HTTP 429');
    });

    it('should handle 500 Server Error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Server error'
      } as Response);

      await expect(hua.chat({
        message: 'Hello',
        tone: 'gentle',
        mode: 'empathy'
      })).rejects.toThrow('HTTP 500');
    });
  });

  describe('Validation Errors', () => {
    it('should handle invalid tone', async () => {
      await expect(hua.chat({
        message: 'Hello',
        tone: 'invalid-tone' as any,
        mode: 'empathy'
      })).rejects.toThrow();
    });

    it('should handle invalid mode', async () => {
      await expect(hua.chat({
        message: 'Hello',
        tone: 'gentle',
        mode: 'invalid-mode' as any
      })).rejects.toThrow();
    });

    it('should handle empty message', async () => {
      await expect(hua.chat({
        message: '',
        tone: 'gentle',
        mode: 'empathy'
      })).rejects.toThrow();
    });

    it('should handle very long message', async () => {
      const longMessage = 'a'.repeat(10001); // 10,000자 초과
      await expect(hua.chat({
        message: longMessage,
        tone: 'gentle',
        mode: 'empathy'
      })).rejects.toThrow();
    });
  });

  describe('Retry Logic', () => {
    it('should retry on temporary failures', async () => {
      // 첫 번째 호출 실패, 두 번째 호출 성공
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable'
      } as Response);

      const mockResponse = {
        success: true,
        data: {
          message: 'Hello there!',
          usage: { total_tokens: 10, input_tokens: 5, output_tokens: 5 },
          tier: '1.0',
          mode: 'empathy',
          tone: 'gentle',
          authenticated: true,
          userId: 'test',
          note: ''
        }
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await hua.chat({
        message: 'Hello',
        tone: 'gentle',
        mode: 'empathy'
      });

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
}); 