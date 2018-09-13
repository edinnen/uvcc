/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SELECT_PAGE } from './constants';

export const initialState = fromJS({
  page: null,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SELECT_PAGE:
      return state.set('page', action.page);
    default:
      return state;
  }
}

export default homePageReducer;
