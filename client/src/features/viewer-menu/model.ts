import { routes } from '@lm-client/shared/routes';
import { createEvent, createStore, sample } from 'effector';

export const $viewerMenuState = createStore(false);
export const viewerMenuOpened = createEvent<boolean>();

sample({
  clock: viewerMenuOpened,
  target: $viewerMenuState,
});

// reinit undefined ?
sample({
  clock: [routes.home.closed],
  target: $viewerMenuState.reinit!,
});
