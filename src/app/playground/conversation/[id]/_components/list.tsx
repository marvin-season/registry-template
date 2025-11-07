import type { TMessage } from '@/app/playground/conversation/[id]/page';

export default function ConversationList({ messages }: { messages: TMessage[] }) {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
    </div>
  );
}
