import { attach, restore, sample } from 'effector';
import { status } from 'patronum/status';
import { viewerLoadedRoute } from '@lm-client/entities/viewer';
import * as api from '@lm-client/shared/api';

const getDialogsFx = attach({ effect: api.getDialogsFx });
export const $dialogs = restore(getDialogsFx.doneData, []);
export const $dialogsStatus = status({ effect: getDialogsFx });

sample({
  clock: viewerLoadedRoute.opened,
  target: getDialogsFx,
});
