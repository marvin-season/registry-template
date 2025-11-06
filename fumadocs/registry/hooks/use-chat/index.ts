import { useCallback, useState } from 'react';
import { type Updater, useImmer } from 'use-immer';
import type { ZodSchema } from 'zod';
import { MessageParser, SSEMessageGenerator } from '~/registry/utils/stream';

interface IMessage {
  id: string;
}

type IStatus = 'idle' | 'running' | 'paused' | 'stopped';
interface IUseChatProps<T extends IMessage> {
  schema: ZodSchema<T>;
  initialMessages?: T[];
  adapter: (updater: Updater<T[]>, data: T) => void;
  getReadableStream: () => ReadableStream;
}
export default function useChat<T extends IMessage>(props: IUseChatProps<T>) {
  const { initialMessages = [], adapter, getReadableStream, schema } = props;

  const [messages, setMessages] = useImmer<T[]>(initialMessages);
  const [_status, setStatus] = useState<IStatus>('idle');

  const start = useCallback(async () => {
    setStatus('running');
    const generator = SSEMessageGenerator(getReadableStream());

    for await (const message of generator) {
      const result = MessageParser(message, schema);

      if (!result) {
        continue;
      }
      adapter(setMessages, result);
    }
    setStatus('idle');
  }, [setMessages, adapter, schema, getReadableStream]); // TODO: Implement start

  const stop = useCallback(() => {
    setStatus('stopped');
  }, []); // TODO: Implement stop

  const resume = useCallback(() => {
    setStatus('running');
  }, []); // TODO: Implement resume

  const pause = useCallback(() => {
    setStatus('paused');
  }, []); // TODO: Implement pause

  return {
    messages,
    start,
    stop,
    resume,
    pause,
  };
}
