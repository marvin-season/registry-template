"use client";

import useChat from "~/registry/hooks/use-chat";
import { Button } from "@/components/ui/button";
import z from "zod";

function getReadableStream() {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(
        'data: {"id": "3", "content": "Hello, ", "role": "user"}\n\ndata: {"id": "3", "content": "world!", "role": "user"}\n\n',
      );
      controller.enqueue(
        'data: {"id": "4", "content": "Hello, ", "role": "assistant"}\n\ndata: {"id": "4", "content": "world!", "role": "assistant"}\n\n',
      );
      controller.close();
    },
  });
}

export default function ConversationPage() {
  const { messages, start, stop, resume, pause } = useChat({
    schema: z.object({
      id: z.string(),
      content: z.string(),
      role: z.enum(["user", "assistant"]),
    }),
    initialMessages: [
      { id: "1", content: "Hello, how are you?", role: "user" },
      { id: "2", content: "I'm fine, thank you!", role: "assistant" },
    ],
    adapter: (updater, data) => {
      updater((draft) => {
        const message = draft.find((m) => m.id === data.id);
        if (message) {
          message.content += data.content;
        } else {
          draft.push(data);
        }
      });
    },
    getReadableStream,
  });
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            start();
          }}
        >
          Start
        </Button>
      </div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.role}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
