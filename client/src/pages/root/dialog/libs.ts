import { Dialog } from '@lm-client/shared/types';
import { combine, Store } from 'effector';

export const getMessages = (
  $dialogs: Store<Dialog[]>,
  $params: Store<{
    dialogId: string;
  }>
) => {
  return combine([$dialogs, $params], ([dialogs, { dialogId }]) => {
    return (
      dialogs.find((dialog) => dialog.id === parseInt(dialogId))?.messages ?? []
    );
  });
};
