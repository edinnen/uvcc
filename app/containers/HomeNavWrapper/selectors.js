import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeNavWrapper state domain
 */

const selectHomeNavWrapperDomain = state =>
  state.get('homeNavWrapper', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeNavWrapper
 */

const makeSelectHomeNavWrapper = () =>
  createSelector(selectHomeNavWrapperDomain, substate => substate.toJS());

export default makeSelectHomeNavWrapper;
export { selectHomeNavWrapperDomain };
