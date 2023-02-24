import { attach, createEvent, restore, sample } from 'effector';
import { status } from 'patronum/status';
import { viewerLoadedRoute } from '@lm-client/entities/viewer';
import * as api from '@lm-client/shared/api';
import type { Dialog } from '@lm-client/shared/types';

const getDialogsFx = attach({ effect: api.getDialogsFx });
export const $dialogs = restore(getDialogsFx.doneData, []);
export const $dialogsStatus = status({ effect: getDialogsFx });
export const newMessageSended = createEvent<Dialog>();
export const dialogCreated = createEvent<Dialog>();

sample({
  clock: viewerLoadedRoute.opened,
  target: getDialogsFx,
});

$dialogs.on(newMessageSended, (dialogs, updatedDialog) => {
  return dialogs.map((dialog) => {
    if (dialog.id === updatedDialog.id) {
      return updatedDialog;
    }
    return dialog;
  });
});

$dialogs.on(dialogCreated, (dialogs, newDialog) => {
  console.log(newDialog);
  return [...dialogs, newDialog];
});
