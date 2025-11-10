import { notFound } from 'next/navigation';
import ConversationPageClient from './conversation-page-client';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const AVAILABLE_CONVERSATIONS = [{ id: '1' }, { id: '2' }];

export const dynamicParams = false;

export function generateStaticParams() {
  return AVAILABLE_CONVERSATIONS;
}

export default async function ConversationPage({ params }: PageProps) {
  const { id } = await params;
  const conversation = AVAILABLE_CONVERSATIONS.find((item) => item.id === id);

  if (!conversation) {
    notFound();
  }

  return <ConversationPageClient id={id} />;
}
