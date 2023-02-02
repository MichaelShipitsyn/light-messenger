import { routes } from '@lm-client/shared/routes';
import { redirect } from 'atomic-router';
import { createEvent } from 'effector';

export const profileButtonClicked = createEvent();

redirect({
  clock: profileButtonClicked,
  route: routes.app.profile,
});
