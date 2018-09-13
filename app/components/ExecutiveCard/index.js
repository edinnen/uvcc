/**
 *
 * ExecutiveCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import sanity from 'utils/sanity';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url';
const builder = imageUrlBuilder(sanity);

/* eslint-disable react/prefer-stateless-function */
class ExecutiveCard extends React.Component {
  componentWillMount() {
    console.log(this.props.data);
  }

  urlFor = source => builder.image(source);

  render() {
    const { data } = this.props;
    return (
      <div>
        <img
          src={this.urlFor(data.image)
            .width(250)
            .url()}
          alt={data.name}
        />
        <span>{data.name}</span>
        <p>
          <BlockContent
            blocks={data.bio}
            imageOptions={{ w: 320, h: 240, fit: 'max' }}
            projectId={sanity.clientConfig.projectId}
            dataset={sanity.clientConfig.dataset}
          />
        </p>
      </div>
    );
  }
}

ExecutiveCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ExecutiveCard;
