import Joi from 'joi';
import { composeFields } from 'composable-forms';
import { attach, createEvent, createStore, sample } from 'effector';
import { redirect } from 'atomic-router';

import * as viewerModel from '@lm-client/entities/viewer';
import * as api from '@lm-client/shared/api';
import { createControl } from '@lm-client/shared/libs/forms';
import { routes } from '@lm-client/shared/routes';

export const signInFx = attach({ effect: api.signInFx });

export const email = createControl({
  initialValue: '',
  schema: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label('Email'),
});

export const password = createControl({
  initialValue: '',
  schema: Joi.string().required().label('Password'),
});

export const toggledPasswordField = createEvent();
export const $passwordFieldType = createStore<'password' | 'text'>('password');

sample({
  clock: toggledPasswordField,
  source: $passwordFieldType,
  fn: (type) => (type === 'password' ? 'text' : 'password'),
  target: $passwordFieldType,
});

export const signInForm = composeFields({
  fields: { email, password },
});

export const formSubmitted = createEvent();

export const $disabledSubmitButton = createStore(false);

const $formHasErrors = signInForm.$hasErrors;

export const $signInFailureMessage = createStore('');

sample({
  clock: [$formHasErrors, signInFx.pending],
  target: $disabledSubmitButton,
});

sample({
  clock: formSubmitted,
  source: signInForm.$value,
  filter: signInForm.$hasErrors.map((is) => !is),
  target: signInFx,
});

sample({
  clock: signInFx.doneData,
  fn: ({ user }) => user,
  target: viewerModel.viewerLoggedIn,
});

sample({
  clock: signInFx.doneData,
  fn: ({ token }) => token,
  target: api.$token,
});

sample({
  clock: signInFx.failData,
  fn: ({ message }) => message,
  target: $signInFailureMessage,
});

redirect({
  clock: signInFx.doneData,
  route: routes.app.root,
});
