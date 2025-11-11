import { describe, expect, test } from 'vitest';
import { requestClient } from './index';

type Notification = {
  title: string;
  data: {
    taskId: string;
    chatId: string;
    event: string;
  };
  readAt?: Date;
};
describe('request', () => {
  test('should return a json object', async () => {
    const user = requestClient.get<{ name: string }>('/objects');
    expect(user).toBeDefined();
  });
});

describe('reduce', () => {
  test('should return a json object', async () => {
    const notifications: Notification[] = [
      {
        title: 'Notification 1',
        data: {
          taskId: 'a',
          chatId: '1',
          event: 'success',
        },
      },
      {
        title: 'Notification 1',
        data: {
          taskId: 'a',
          chatId: '1',
          event: 'pending',
        },
      },
      {
        title: 'Notification 1',
        data: {
          taskId: 'aa',
          chatId: '1',
          event: 'pending',
        },
      },
      {
        title: 'Notification 1',
        data: {
          taskId: 'aa',
          chatId: '1',
          event: 'success',
        },
        readAt: new Date(),
      },
      {
        title: 'Notification 1',
        data: {
          taskId: 'b',
          chatId: '2',
          event: 'pending',
        },
      },
      {
        title: 'Notification 1',
        data: {
          taskId: 'b',
          chatId: '2',
          event: 'failed',
        },
      },
      {
        title: 'Notification 1',
        data: {
          taskId: 'bb',
          chatId: '2',
          event: 'pending',
        },
        readAt: new Date(),
      },
      {
        title: 'Notification 1',
        data: {
          taskId: 'bb',
          chatId: '2',
          event: 'success',
        },
        readAt: new Date(),
      },
      {
        title: 'Notification 1',
        data: {
          taskId: 'c',
          chatId: '3',
          event: 'pending',
        },
        readAt: new Date(),
      },
    ];

    console.log(reduceByChatId(notifications));
  });
});

function reduceByChatId(notifications: Notification[]): Record<string, Notification[]> {
  return notifications.reduce(
    (acc, notification) => {
      if (acc[notification.data.chatId]) {
        const existingTaskIndex = acc[notification.data.chatId].findIndex(
          (n) => n.data.taskId === notification.data.taskId,
        );
        if (existingTaskIndex !== -1) {
          const existingTask = acc[notification.data.chatId][existingTaskIndex];
          if (existingTask.data.event === 'pending') {
            acc[notification.data.chatId][existingTaskIndex] = notification;
          }
        } else {
          acc[notification.data.chatId].push(notification);
        }
      } else {
        acc[notification.data.chatId] = [notification];
      }
      return acc;
    },
    {} as Record<string, Notification[]>,
  );
}
