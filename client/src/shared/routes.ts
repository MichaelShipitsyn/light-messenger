import {
  chainRoute,
  createRoute,
  redirect,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
} from 'atomic-router';
import * as api from '@lm-client/shared/api';
import { createEvent, sample } from 'effector';

export const routes = {
  signUp: createRoute(),
  signIn: createRoute(),
  app: {
    root: createRoute(),
    dialog: createRoute<{ dialogId: string }>(),
    profile: createRoute(),
  },
};

export const chainAuthorized = <Params extends RouteParams>(
  route: RouteInstance<Params>
) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    filter: api.$isAuthorized,
  });

  redirect({
    clock: api.getViewerFx.failData,
    route: routes.signIn,
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthorized, api.tokenReceived],
  });
};

export const authorizedRoot = chainAuthorized(routes.app.root);
