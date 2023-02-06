import { attach, combine, createEvent, createStore, sample } from 'effector';
import { routes } from '@lm-client/shared/routes';
import * as dialogModel from '@lm-client/entities/dialog';
import * as api from '@lm-client/shared/api';

const sendMessageFx = attach({ effect: api.sendMessageFx });

export const messageTextChanged = createEvent<string>();
export const textFormSubmitted = createEvent();
export const $messageText = createStore('');

sample({
  clock: messageTextChanged,
  target: $messageText,
});

sample({
  clock: textFormSubmitted,
  source: combine(
    [$messageText, routes.app.dialog.$params],
    ([text, { dialogId }]) => ({ text, dialogId })
  ),
  filter: ({ text }) => text.length > 0,
  target: sendMessageFx,
});

//@ts-expect-error
sample({
  clock: textFormSubmitted,
  target: $messageText.reinit,
});

sample({
  clock: sendMessageFx.doneData,
  target: dialogModel.newMessageSended,
});
