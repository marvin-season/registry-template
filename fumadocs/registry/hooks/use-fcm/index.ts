// @ts-nocheck

import { useCallback, useEffect } from 'react';
import { useDebounceFn } from 'ahooks';
import { onMessage as onMessage_ } from 'firebase/messaging';

import { getFCMToken, messaging } from './helper';
import type { MessagePayload } from 'firebase/messaging';

const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;

export function useFCM({
	onMessage,
	onSaveToken,
}: {
	onMessage?: (payload: MessagePayload) => void;
	onSaveToken?: (token: string) => void;
}) {
	const getAndSaveToken = useCallback(async () => {
		const token = await getFCMToken({
			vapidKey,
		});

		if (token) {
			onSaveToken?.(token);
		}
	}, [onSaveToken]);

	const { run: runGetAndSaveToken } = useDebounceFn(getAndSaveToken, {
		wait: 1000,
	});

	useEffect(() => {
		runGetAndSaveToken();
	}, [runGetAndSaveToken]);

	useEffect(() => {
		if (!onMessage) {
			return;
		}
		const unsubscribe = onMessage_(messaging(), onMessage);
		return () => unsubscribe();
	}, [onMessage]);
}
