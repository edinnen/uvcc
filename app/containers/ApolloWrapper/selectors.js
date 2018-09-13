import { createSelector } from 'reselect';

/**
 * Direct selector to the apolloWrapper state domain
 */
const selectApolloWrapperDomain = state => state.get('apolloWrapper');

/**
 * Default selector used by ApolloWrapper
 */

const makeSelectApolloWrapper = () =>
  createSelector(selectApolloWrapperDomain, substate => substate.toJS());

export default makeSelectApolloWrapper;
export { selectApolloWrapperDomain };
