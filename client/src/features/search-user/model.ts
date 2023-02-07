import { createEvent, createStore, sample } from 'effector';
import { debounce } from 'patronum/debounce';
import * as userModel from '@lm-client/entities/user';

const DEBOUNCE_TIMEOUT_IN_MS = 300;

export const searchInputChanged = createEvent<string>();
export const $searchInput = createStore('');
export const searchFormSubmitted = createEvent();

sample({
  clock: searchInputChanged,
  target: $searchInput,
});

const searchInputDebounced = debounce({
  source: searchInputChanged,
  timeout: DEBOUNCE_TIMEOUT_IN_MS,
});

sample({
  clock: [searchInputDebounced, searchFormSubmitted],
  source: $searchInput,
  filter: (searchText) => searchText.trim().length > 0,
  target: userModel.searchUsersFx,
});
