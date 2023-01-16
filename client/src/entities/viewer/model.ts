import { createEvent, createStore, sample } from 'effector';
import * as api from '@lm-client/shared/api';
import type { User } from '@lm-client/shared/types';

export const $viewer = createStore<User | null>(null);
export const $isAuthenticated = $viewer.map(Boolean);

export const viewerLoggedIn = createEvent<User>();

sample({
  clock: viewerLoggedIn,
  target: $viewer,
});

sample({
  clock: api.getViewerFx.doneData,
  target: $viewer,
});
