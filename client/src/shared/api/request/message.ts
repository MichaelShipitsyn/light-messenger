import { createEffect } from 'effector';
import type { ApiError, Dialog } from '@lm-client/shared/types';
import { handledRequestFx } from './base';

export const sendMessageFx = createEffect<
  {
    text: string;
    dialogId: string;
  },
  Dialog,
  ApiError
>(({ text, dialogId }) => {
  const url = new URL('message/create', import.meta.env.VITE_BASE_API_URL);

  url.searchParams.set('dialogId', dialogId);

  return handledRequestFx({
    path: url.toString(),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: { text },
  }) as Promise<Dialog>;
});
