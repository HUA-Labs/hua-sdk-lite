import { HUALite } from '../src/index';

// fetch를 모킹
global.fetch = jest.fn();

describe('HUALite Chat API', () => {
  let hua: HUALite;
  let mockFetch: jest.MockedFunction<typeof fetch>;
  const testApiKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  beforeEach(() => {
    hua = new HUALite(testApiKey);
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockClear();
  });

  describe('chat method', () => {
    it('should send chat request successfully', async () => {
      const mockResponse = {
        response: '안녕하세요! 기분이 어떠신가요?',
        status: 'ok',
        credits_used: 1,
        tier: 1.0
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await hua.chat({
        message: '안녕하세요',
        tone: 'gentle',
        mode: 'empathy',
        tier: 1.0,
        lang: 'ko'
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.hua.com/api/lite',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': expect.any(String),
          }),
          body: expect.stringContaining('"message":"안녕하세요"'),
        })
      );

      expect(result).toEqual(mockResponse);
    });

    it('should throw error when API request fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: async () => 'Invalid API key',
      } as Response);

      await expect(hua.chat({
        message: 'Hello',
        tone: 'gentle',
        mode: 'empathy'
      })).rejects.toThrow('HTTP 401');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(hua.chat({
        message: 'Hello',
        tone: 'gentle',
        mode: 'empathy'
      })).rejects.toThrow('알 수 없는 오류가 발생했습니다.');
    });
  });

  describe('convenience methods', () => {
    beforeEach(() => {
      const mockResponse = {
        response: 'Test response',
        status: 'ok',
        credits_used: 1,
        tier: 1.0
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);
    });

    it('should use gentleChat with correct defaults', async () => {
      await hua.gentleChat('안녕하세요');

      const callArgs = mockFetch.mock.calls[0][1];
      const body = JSON.parse(callArgs?.body as string);

      expect(body.tone).toBe('gentle');
      expect(body.mode).toBe('empathy');
      expect(body.message).toBe('안녕하세요');
    });

    it('should use warmChat with correct defaults', async () => {
      await hua.warmChat('안녕하세요');

      const callArgs = mockFetch.mock.calls[0][1];
      const body = JSON.parse(callArgs?.body as string);

      expect(body.tone).toBe('warm');
      expect(body.mode).toBe('empathy');
    });

    it('should use cheerfulChat with correct defaults', async () => {
      await hua.cheerfulChat('안녕하세요');

      const callArgs = mockFetch.mock.calls[0][1];
      const body = JSON.parse(callArgs?.body as string);

      expect(body.tone).toBe('cheerful');
      expect(body.mode).toBe('praise');
    });

    it('should use analyzeChat with correct defaults', async () => {
      await hua.analyzeChat('분석해주세요');

      const callArgs = mockFetch.mock.calls[0][1];
      const body = JSON.parse(callArgs?.body as string);

      expect(body.tone).toBe('delicate');
      expect(body.mode).toBe('analysis');
    });

    it('should use suggestChat with correct defaults', async () => {
      await hua.suggestChat('조언해주세요');

      const callArgs = mockFetch.mock.calls[0][1];
      const body = JSON.parse(callArgs?.body as string);

      expect(body.tone).toBe('warm');
      expect(body.mode).toBe('suggestion');
    });
  });

  describe('batchChat method', () => {
    it('should handle multiple chat requests', async () => {
      const mockResponse = {
        response: 'Test response',
        status: 'ok',
        credits_used: 1,
        tier: 1.0
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const requests = [
        { message: '첫 번째 메시지', tone: 'gentle' as const, mode: 'empathy' as const },
        { message: '두 번째 메시지', tone: 'warm' as const, mode: 'praise' as const }
      ];

      const results = await hua.batchChat(requests);

      expect(results).toHaveLength(2);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
}); 