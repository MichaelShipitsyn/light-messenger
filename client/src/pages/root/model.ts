import * as api from '@lm-client/shared/api';
import { chainAuthorized, routes } from '@lm-client/shared/routes';
import { chainRoute } from 'atomic-router';

export const viewerLoadedRoute = chainRoute({
  route: chainAuthorized(routes.app.root),
  beforeOpen: {
    effect: api.getViewerFx,
    mapParams: (params) => params,
  },
});
