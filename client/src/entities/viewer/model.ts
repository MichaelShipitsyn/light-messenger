import { createEvent, createStore, sample } from 'effector';
import { chainAuthorized, routes } from '@lm-client/shared/routes';
import { chainRoute } from 'atomic-router';
import * as api from '@lm-client/shared/api';
import type { User } from '@lm-client/shared/types';
import { socketEmitFx, socketFx } from '@lm-client/shared/api';

export const $viewer = createStore<User | null>(null);
export const $viewerId = $viewer.map((viewer) => (viewer ? viewer.id : null));

export const viewerLoggedIn = createEvent<User>();

sample({
  clock: viewerLoggedIn,
  target: $viewer,
});

sample({
  clock: api.getViewerFx.doneData,
  target: $viewer,
});

export const viewerLoadedRoute = chainRoute({
  route: chainAuthorized(routes.app.root),
  beforeOpen: {
    effect: api.getViewerFx,
    mapParams: (params) => params,
  },
});

sample({
  clock: viewerLoadedRoute.opened,
  target: socketFx,
});

sample({
  clock: socketFx.doneData,
  source: $viewer,
  filter: (viewer): viewer is User => viewer !== null,
  fn: (viewer) => ({ eventName: 'CLIENT:JOIN_MESSENGER', payload: viewer?.id }),
  target: socketEmitFx,
});
