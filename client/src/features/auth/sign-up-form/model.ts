import Joi from 'joi';
import { composeFields } from 'composable-forms';
import { createEvent, createStore, sample } from 'effector';

import { createControl } from '@lm-client/shared/libs/forms';

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

export const signUpForm = composeFields({
  fields: { email, phoneNumber, username, password },
});

export const formSubmitted = createEvent();

sample({
  clock: formSubmitted,
  source: signUpForm.$value,
  filter: signUpForm.$hasErrors.map((is) => !is),
  // target: ,
});

export const toggledPasswordField = createEvent();
export const $passwordFieldType = createStore<'password' | 'text'>(
  'password'
).on(toggledPasswordField, (fieldType) =>
  fieldType === 'password' ? 'text' : 'password'
);
