import Joi from 'joi';
import { composeFields } from 'composable-forms';
import { attach, combine, createEvent, createStore, sample } from 'effector';
import { redirect } from 'atomic-router';

import * as viewerModel from '@lm-client/entities/viewer';
import * as api from '@lm-client/shared/api';
import { createControl } from '@lm-client/shared/libs/forms';
import { routes } from '@lm-client/shared/routes';

export const signUpFx = attach({ effect: api.signUpFx });

export const email = createControl({
  initialValue: '',
  schema: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label('Email'),
});

export const phoneNumber = createControl({
  initialValue: '',
  schema: Joi.string()
    .pattern(/^\+[7] \(\d{3}\) \d{4} \d{3}$/)
    .required()
    .messages({
      'string.pattern.base': `"Phone number" must be valid`,
    })
    .label('Phone number'),
});

export const username = createControl({
  initialValue: '',
  schema: Joi.string().required().min(3).label('Username'),
});

export const password = createControl({
  initialValue: '',
  schema: Joi.string().required().min(6).label('Password'),
});

export const toggledPasswordField = createEvent();
export const $passwordFieldType = createStore<'password' | 'text'>('password');

sample({
  clock: toggledPasswordField,
  source: $passwordFieldType,
  fn: (type) => (type === 'password' ? 'text' : 'password'),
  target: $passwordFieldType,
});

export const signUpForm = composeFields({
  fields: { email, phoneNumber, username, password },
});

export const formSubmitted = createEvent();

export const $disabledSubmitButton = createStore(false);

const $formHasErrors = combine(
  [
    email.$hasErrors,
    phoneNumber.$hasErrors,
    username.$hasErrors,
    password.$hasErrors,
  ],
  (formHasErrors) => formHasErrors.some(Boolean)
);

export const $signUpFailureMessage = createStore('');

sample({
  clock: [$formHasErrors, signUpFx.pending],
  target: $disabledSubmitButton,
});

sample({
  clock: formSubmitted,
  source: signUpForm.$value,
  filter: signUpForm.$hasErrors.map((is) => !is),
  target: signUpFx,
});

sample({
  clock: signUpFx.doneData,
  fn: ({ user }) => user,
  target: viewerModel.viewerLoggedIn,
});

sample({
  clock: signUpFx.doneData,
  fn: ({ token }) => token,
  target: api.$token,
});

sample({
  clock: signUpFx.failData,
  fn: ({ message }) => message,
  target: $signUpFailureMessage,
});

redirect({
  clock: signUpFx.doneData,
  route: routes.app.root,
});
