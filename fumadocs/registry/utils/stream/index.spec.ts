// test the ParseReadableStream function
import z from "zod";
import { MessageParser, SSEMessageGenerator } from ".";
import { expect, test } from 'vitest'

test('SSEMessageGenerator', async () => {
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue('data: {"message": "Hello, "}\n\ndata: {"message": "world!"}\n\n');
      controller.close();
    },
  });
  const generator = SSEMessageGenerator(readableStream);
  const messages = [];
  for await (const message of generator) {
    messages.push(message);
  }
  expect(messages).toEqual(['{"message": "Hello, "}', '{"message": "world!"}']);
});

test('MessageParser', async () => {
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue('data: {"message": "Hello, "}\n\ndata: {"message": "world!"}\n\n');
      controller.close();
    },
  });
  const generator = SSEMessageGenerator(readableStream);

  const results = [];
  const schema = z.object({ message: z.string() });
  for await (const message of generator) {
    const result = MessageParser(message, schema);
    results.push(result);
  }

  expect(results).toEqual([{ message: "Hello, " }, { message: "world!" }]);
});