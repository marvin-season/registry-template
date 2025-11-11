import { describe, expect, test, vi } from 'vitest';

import { ConcurrentRunner } from './index';

describe('ConcurrentRunner', () => {
  test('执行多个任务并保持结果顺序', async () => {
    const runner = new ConcurrentRunner({ concurrency: 2, retryDelay: 10 });
    const tasks = [vi.fn(async () => 'task 1'), vi.fn(async () => 'task 2'), vi.fn(async () => 'task 3')];

    const results = await runner.run(tasks);
    console.log('results', results);
    expect(results).toEqual(['task 1', 'task 2', 'task 3']);
    tasks.forEach((task) => {
      expect(task).toHaveBeenCalledTimes(1);
    });
  });

  test('任务失败后自动重试直至成功', async () => {
    const runner = new ConcurrentRunner({ concurrency: 1, retryDelay: 10 });
    let attempt = 0;
    const task = vi.fn(async () => {
      attempt += 1;
      if (attempt < 3) {
        throw new Error('temporary error');
      }
      return 'success';
    });

    const results = await runner.run([task]);

    expect(results).toEqual(['success']);
    expect(task).toHaveBeenCalledTimes(3);
  });

  test('超过最大重试次数后抛出错误', async () => {
    const runner = new ConcurrentRunner({ concurrency: 1, retryDelay: 10 });
    const error = new Error('persistent error');
    const task = vi.fn(async () => {
      throw error;
    });

    await expect(runner.run([task])).rejects.toBe(error);
    expect(task).toHaveBeenCalledTimes(4);
  });
});
