// @ts-nocheck

import type { MessagePayload } from 'firebase/messaging';
import { onMessage as onMessage_ } from 'firebase/messaging';
import { useEffect } from 'react';
import { getFCMToken, messaging } from './helper';

const vapidKey = 'Your Vapid Key';

export function useFCM({
  onMessage,
  onToken,
}: {
  onMessage?: (payload: MessagePayload) => void;
  onToken?: (token: string) => void;
}) {
  useEffect(() => {
    getFCMToken({
      vapidKey,
    }).then((token) => {
      if (token) {
        onToken?.(token);
      }
    });
  }, [onToken]);

  useEffect(() => {
    if (!onMessage) {
      return;
    }
    const unsubscribe = onMessage_(messaging(), onMessage);
    return () => unsubscribe();
  }, [onMessage]);
}
