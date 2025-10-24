// test the ParseReadableStream function
import { SSEMessageGenerator } from "./stream";
import { expect, test } from 'vitest'

test('SSEMessageGenerator', async () => {
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue('data: {"message": "Hello, world!"}\n\n');
      controller.close();
    },
  });
  const generator = SSEMessageGenerator<{ message: string }>(readableStream);
  const messages = [];
  for await (const message of generator) {
    messages.push(message.message);
  }
  expect(messages).toEqual(['Hello, world!']);
});