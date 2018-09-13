import { fromJS } from 'immutable';
import homeNavWrapperReducer from '../reducer';

describe('homeNavWrapperReducer', () => {
  it('returns the initial state', () => {
    expect(homeNavWrapperReducer(undefined, {})).toEqual(fromJS({}));
  });
});
