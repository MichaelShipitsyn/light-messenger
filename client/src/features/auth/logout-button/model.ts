import { attach, createEvent, sample } from 'effector';
import * as api from '@lm-client/shared/api';
import { reset } from 'patronum/reset';
import { redirect } from 'atomic-router';
import { routes } from '@lm-client/shared/routes';

export const logoutFx = attach({ effect: api.logoutFx });

export const buttonClicked = createEvent();

sample({
  clock: buttonClicked,
  target: logoutFx,
});

redirect({
  clock: logoutFx.doneData,
  route: routes.signIn,
});

reset({
  clock: api.logoutFx.doneData,
  target: api.$token,
});
