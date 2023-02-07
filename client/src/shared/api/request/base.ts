import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { persist } from 'effector-storage/local';
import { waitFor } from '@lm-client/shared/libs';
import type { ApiError } from '@lm-client/shared/types';

export interface Request {
  path: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
  body?: Record<string, unknown> | null | void;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  credentials?: 'include' | 'omit' | 'same-origin';
}

export const tokenReceived = createEvent();
export const tokenErased = createEvent();

export const $token = createStore('');
export const $isAuthorized = $token.map(Boolean);
const $signal = createStore(new AbortController());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isApiError = (err: any): err is ApiError => {
  return err.statusCode !== undefined;
};

export const baseRequestFx = attach({
  source: $signal,
  async effect(
    { signal },
    { path, method, headers, body, credentials }: Request
  ) {
    const res = await fetch(path, {
      method,
      headers,
      credentials,
      ...(Boolean(body) && { body: JSON.stringify(body) }),
      signal,
    });

    if (!res.ok) {
      const error = (await res.json()) as ApiError;

      if (error.statusCode) {
        throw error;
      }
      throw Error(res.status.toString());
    }

    return res.json();
  },
});

export const abortFx = attach({
  source: $signal,
  effect(ctrl) {
    ctrl.abort();
  },
});

$signal.on(abortFx.done, () => new AbortController());

const authenticateRequestFx = attach({
  source: $token,
  async effect(token, { path, method, headers, body, credentials }: Request) {
    return await baseRequestFx({
      path,
      method,
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body,
      credentials,
    });
  },
});

const updateTokenFx = createEffect<void, { token: string }>(async () => {
  const path = new URL(
    'auth/local/refresh',
    import.meta.env.VITE_BASE_API_URL
  ).toString();

  const res = await fetch(path, {
    method: 'POST',
    credentials: 'include',
  });

  return res.json();
});

export const handledRequestFx = createEffect<
  Request & { tries?: number },
  unknown
>(
  async ({
    path,
    method,
    headers,
    body,
    credentials,
    tries = 3,
  }): Promise<unknown> => {
    try {
      return await authenticateRequestFx({
        path,
        method,
        headers,
        body,
        credentials,
      });
    } catch (error) {
      await abortFx();
      if (isApiError(error)) {
        if (error.statusCode === 401 && tries > 0) {
          await waitFor(3000);
          await updateTokenFx();
          return await handledRequestFx({
            path,
            method,
            headers,
            body,
            credentials,
            tries: tries - 1,
          });
        } else {
          throw error;
        }
      }
      throw error;
    }
  }
);

sample({
  clock: updateTokenFx.doneData,
  fn: (response) => response.token,
  target: [$token, tokenReceived],
});

persist({
  store: $token,
  key: 'token',
});
