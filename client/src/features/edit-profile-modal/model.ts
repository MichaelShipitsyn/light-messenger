import { attach, createEvent, restore, sample } from 'effector';
import { routes } from '@lm-client/shared/routes';
import * as viewerModel from '@lm-client/entities/viewer';
import * as api from '@lm-client/shared/api';
import { redirect } from 'atomic-router';

export const editProfileFx = attach({ effect: api.editProfileFx });
export const profileBioChanged = createEvent<string>();
export const profileBioSaved = createEvent();
export const $profileBio = restore(profileBioChanged, '');
export const editModalClosed = createEvent();

sample({
  clock: viewerModel.$viewer,
  source: viewerModel.$viewer.map((viewer) => viewer?.profile?.bio ?? ''),
  filter: routes.app.profile.$isOpened,
  target: $profileBio,
});

sample({
  clock: profileBioSaved,
  source: $profileBio,
  filter: (bio) => bio.length > 0,
  fn: (bio) => ({ bio, avatar: '' }),
  target: editProfileFx,
});

redirect({
  clock: editModalClosed,
  route: routes.app.root,
});
