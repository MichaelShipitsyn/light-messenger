import { createEffect } from 'effector';
import type { ApiError, User, UserProfile } from '@lm-client/shared/types';
import { handledRequestFx } from './base';

export const getViewerFx = createEffect<void, User, ApiError>(
  () =>
    handledRequestFx({
      path: new URL('user/me', import.meta.env.VITE_BASE_API_URL).toString(),
      method: 'GET',
    }) as Promise<User>
);

export const editProfileFx = createEffect<
  {
    avatar?: string;
    bio?: string;
  },
  UserProfile,
  ApiError
>(
  (profile) =>
    handledRequestFx({
      path: new URL(
        'user/profile',
        import.meta.env.VITE_BASE_API_URL
      ).toString(),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: profile,
    }) as Promise<UserProfile>
);

export const searchUsersFx = createEffect<string, User[], ApiError>(
  (username) => {
    const url = new URL('user/search', import.meta.env.VITE_BASE_API_URL);

    url.searchParams.set('username', username);

    return handledRequestFx({
      path: url.toString(),
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }) as Promise<User[]>;
  }
);
