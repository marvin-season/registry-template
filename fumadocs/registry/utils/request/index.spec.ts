import { describe, expect, test } from 'vitest';
import { request } from './index';

describe('request', () => {
  test('should return a json object', async () => {
    const user = await request<{ name: string }>('https://api.restful-api.dev/objects', {}, {});
    expect(user).toBeDefined();
  });

  test('should return a stream when type is stream', async () => {
    const stream = await request(
      'https://api.restful-api.dev/objects',
      {},
      {
        type: 'stream',
      },
    );
    expect(stream).toBeDefined();
  });
});
