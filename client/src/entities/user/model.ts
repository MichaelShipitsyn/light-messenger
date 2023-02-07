import * as api from '@lm-client/shared/api';
import { attach, restore } from 'effector';

export const searchUsersFx = attach({ effect: api.searchUsersFx });
export const $users = restore(searchUsersFx.doneData, []);
