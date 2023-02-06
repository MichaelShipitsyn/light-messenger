import { routes } from '@lm-client/shared/routes';
import { redirect } from 'atomic-router';
import { hotkey } from 'effector-hotkey';

export const escapePressed = hotkey({ key: 'Escape', type: 'keydown' });

redirect({
  clock: escapePressed,
  route: routes.app.root,
});
