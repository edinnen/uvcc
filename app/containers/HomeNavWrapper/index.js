/**
 *
 * HomeNavWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import getData from 'graphql/queries/getData.graphql';
import LoadingIndicator from 'components/LoadingIndicator';
import HomeNav from 'components/HomeNav';

import injectReducer from 'utils/injectReducer';
import makeSelectHomeNavWrapper from './selectors';
import reducer from './reducer';

function HomeNavWrapper({ data: { pages, executives }, history, hide }) {
  if (pages === undefined) return <LoadingIndicator />;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <HomeNav
        pages={pages}
        executives={executives}
        history={history}
        hide={hide}
      />
    </div>
  );
}

HomeNavWrapper.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object,
  hide: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  homenavwrapper: makeSelectHomeNavWrapper(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homenavwrapper', reducer });

const withGraphql = graphql(getData);

export default compose(
  withReducer,
  withConnect,
  withGraphql,
)(HomeNavWrapper);
