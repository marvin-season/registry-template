type Task<T> = () => Promise<T>;

export interface ConcurrentRunnerOptions {
  /**
   * 最大并发数，默认无限制。
   */
  concurrency?: number;
  /**
   * 每个任务允许的最大重试次数（不含首次执行），默认 3 次。
   */
  maxRetries?: number;
  /**
   * 每次重试之间的等待时长，单位毫秒，默认 3000ms。
   */
  retryDelay?: number;
}

export class ConcurrentRunner {
  private readonly concurrency: number;
  private readonly maxRetries: number;
  private readonly retryDelay: number;

  constructor(options: ConcurrentRunnerOptions = {}) {
    const { concurrency = Number.POSITIVE_INFINITY, maxRetries = 3, retryDelay = 3_000 } = options;

    if (!Number.isFinite(concurrency) || concurrency <= 0) {
      throw new Error('concurrency must be a positive finite number');
    }

    this.concurrency = Math.floor(concurrency);
    this.maxRetries = Math.max(0, Math.floor(maxRetries));
    this.retryDelay = Math.max(0, Math.floor(retryDelay));
  }

  async run<T>(tasks: Task<T>[]): Promise<T[]> {
    if (!Array.isArray(tasks)) {
      throw new Error('tasks must be an array of promise-returning functions');
    }

    const total = tasks.length;
    if (total === 0) {
      return [];
    }

    const results: T[] = new Array(total);
    let cursor = 0;

    const worker = async () => {
      while (true) {
        const index = cursor++;
        if (index >= total) {
          return;
        }

        const task = tasks[index];
        if (typeof task !== 'function') {
          throw new Error(`task at index ${index} is not a function`);
        }

        results[index] = await this.executeWithRetry(task);
      }
    };

    const workerCount = Math.min(total, this.concurrency);
    await Promise.all(Array.from({ length: workerCount }, () => worker()));

    return results;
  }

  private async executeWithRetry<T>(task: Task<T>): Promise<T> {
    let attempt = 0;
    let lastError: unknown;

    while (attempt <= this.maxRetries) {
      try {
        return await task();
      } catch (error) {
        lastError = error;
        attempt += 1;

        if (attempt > this.maxRetries) {
          break;
        }

        if (this.retryDelay > 0) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, this.retryDelay);
          });
        }
      }
    }

    throw lastError;
  }
}
