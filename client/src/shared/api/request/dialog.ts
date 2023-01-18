import { createEffect } from 'effector';
import { handledRequestFx } from './base';
import type { ApiError, Dialog } from '@lm-client/shared/types';

export const createDialogFx = createEffect<
  { recipientId: number; message: string },
  Dialog,
  ApiError
>(
  (createDialogPayload) =>
    handledRequestFx({
      path: new URL(
        'dialog/create',
        import.meta.env.VITE_BASE_API_URL
      ).toString(),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: createDialogPayload,
    }) as Promise<Dialog>
);

export const getDialogByIdFx = createEffect<number, Dialog, ApiError>(
  (dialogId) =>
    handledRequestFx({
      path: new URL(
        `dialog/${dialogId}`,
        import.meta.env.VITE_BASE_API_URL
      ).toString(),
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }) as Promise<Dialog>
);

export const getDialogsFx = createEffect<void, Dialog[], ApiError>(
  () =>
    handledRequestFx({
      path: new URL('dialog/all', import.meta.env.VITE_BASE_API_URL).toString(),
      credentials: 'include',
      method: 'GET',
    }) as Promise<Dialog[]>
);

export const deleteDialogFx = createEffect<
  number,
  { message: string; statusCode: number },
  ApiError
>(
  (dialogId) =>
    handledRequestFx({
      path: new URL(
        `dialog/${dialogId}`,
        import.meta.env.VITE_BASE_API_URL
      ).toString(),
      credentials: 'include',
      method: 'DELETE',
    }) as Promise<{ message: string; statusCode: number }>
);
