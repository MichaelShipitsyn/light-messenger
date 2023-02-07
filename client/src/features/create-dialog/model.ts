import { attach, createEvent, createStore, sample } from 'effector';
import { routes } from '@lm-client/shared/routes';
import * as api from '@lm-client/shared/api';
import { redirect } from 'atomic-router';

const createDialogFx = attach({ effect: api.createDialogFx });

export const messageTextChanged = createEvent<string>();
export const textFormSubmitted = createEvent<number>();
export const $messageText = createStore('');

sample({
  clock: messageTextChanged,
  target: $messageText,
});

sample({
  clock: textFormSubmitted,
  source: $messageText,
  filter: (text) => text.length > 0,
  fn: (text, recipientId) => ({ message: text, recipientId }),
  target: createDialogFx,
});

//@ts-expect-error
sample({
  clock: textFormSubmitted,
  target: $messageText.reinit,
});

redirect({
  clock: createDialogFx.doneData,
  route: routes.app.dialog,
  params: (dialog) => ({ dialogId: dialog.id.toString() }),
});
