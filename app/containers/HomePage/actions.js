/*
 *
 * HomePage actions
 *
 */

import { DEFAULT_ACTION, SELECT_PAGE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function selectPage(page) {
  return {
    type: SELECT_PAGE,
    page,
  };
}
