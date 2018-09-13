/**
 *
 * Executive
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import sanity from 'utils/sanity';
import ExecutiveCard from 'components/ExecutiveCard';

/* eslint-disable react/prefer-stateless-function */
export class Executive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      executives: [],
      data: {},
    };
  }

  componentWillMount() {
    sanity.fetch('*[_type == "executive"]').then(res => {
        this.createExecutives(res);
    });
  }

  createExecutives = (data) => {
    const { executives } = this.state;
    data.forEach((exec) => {
      console.log(exec);
      executives.push(<ExecutiveCard data={exec} />);
    });
    console.log(executives);
    this.setState({ executives });
  }

  render() {
    const { executives } = this.state;
    console.log(executives);
    return executives;
  }
}

Executive.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Executive);
