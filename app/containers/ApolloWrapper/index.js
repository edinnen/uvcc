/**
 *
 * ApolloWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

// Set up the Apollo clients to interface with our GraphQL endpoints
const client = new ApolloClient({ uri: `${window.location.origin}/graphql` });

// eslint-disable-next-line
export class ApolloWrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <ApolloProvider client={client}>
        <div style={{ width: '100%', height: '100%' }}>
          {this.props.children}
        </div>
      </ApolloProvider>
    );
  }
}

ApolloWrapper.propTypes = {
  children: PropTypes.array.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapDispatchToProps);

const withReducer = injectReducer({ key: 'apolloWrapper', reducer });

export default compose(
  withReducer,
  withConnect,
)(ApolloWrapper);
