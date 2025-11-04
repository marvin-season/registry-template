import Link from "next/link";
const conversations = [
  {
    id: "1",
    title: "Conversation 1",
  },
  {
    id: "2",
    title: "Conversation 2",
  },
];

export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ">
      <div className="w-[300px] flex flex-col gap-2">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/playground/conversation/${conversation.id}`}
          >
            {conversation.title}
          </Link>
        ))}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
