'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useChat from '~/registry/hooks/use-chat';

const ConversationList = dynamic(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return import('./_components/list');
  },
  {
    loading: () => (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    ),
    ssr: false,
  },
);

const schema = z.object({
  id: z.string(),
  content: z.string(),
  role: z.string(),
});

export type TMessage = z.infer<typeof schema>;

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

type ConversationPageClientProps = {
  id: string;
};

export default function ConversationPageClient({ id }: ConversationPageClientProps) {
  const router = useRouter();
  const initialMessages = useMemo(
    () => [
      { id: '1', content: `Conversation ${id}: Hello, how are you?`, role: 'user' as const },
      { id: '2', content: "I'm fine, thank you!", role: 'assistant' as const },
    ],
    [id],
  );

  const { messages, start } = useChat({
    schema,
    initialMessages,
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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            router.push('/playground/conversation');
          }}
        >
          Home
        </Button>
        <Button
          onClick={() => {
            start();
          }}
        >
          Start
        </Button>
        <span className="text-sm text-muted-foreground">Current conversation: {id}</span>
      </div>
      <ConversationList messages={messages} />
    </div>
  );
}
