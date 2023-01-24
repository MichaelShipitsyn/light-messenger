import {
  chainRoute,
  createRoute,
  redirect,
  RouteInstance,
  RouteParams,
} from 'atomic-router';
import * as api from '@lm-client/shared/api';

export const routes = {
  signUp: createRoute(),
  signIn: createRoute(),
  home: createRoute(),
  profile: createRoute(),
  dialog: createRoute<{ dialogId: string }>(),
};

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>
) {
  redirect({
    clock: api.getViewerFx.failData,
    route: routes.signIn,
  });

  return chainRoute({
    route,
    beforeOpen: {
      effect: api.getViewerFx,
      mapParams: (params) => params,
    },
    openOn: api.getViewerFx.doneData,
    cancelOn: api.getViewerFx.failData,
  });
}

export const authorizedHome = chainAuthorized(routes.home);
