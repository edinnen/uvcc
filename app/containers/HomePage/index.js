/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import HomeNavWrapper from 'containers/HomeNavWrapper';
import SocialSection from 'components/SocialSection/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

import Wrapper from './Wrapper';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  render() {
    const isGear = this.props.match.params.slug === 'suggested-gear';
    return (
      <Wrapper>
        <Helmet>
          <title>University of Victoria Caving Club - UVic Caving</title>
          <meta
            name="description"
            content="The University of Victoria Caving Club. The UVic Caving Club runs trips on Vancouver Island and teaches students all they need to be proficient underground."
          />
          <meta
            name="keywords"
            content="caving uvic university victoria vancouver island caves VICEG vikes rec"
          />
        </Helmet>
        <HomeNavWrapper
          history={this.props.history}
          hide={isGear}
          scrollFunc={this.scrollInsta}
        />
        <SocialSection />
      </Wrapper>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
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

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
