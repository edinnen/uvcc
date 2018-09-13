/**
 *
 * InstagramLoader
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InstagramEmbed from 'react-instagram-embed';

export default class InstagramLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };

    this.onLoad = this.onLoad.bind(this);
    this.loadInstagram = this.loadInstagram.bind(this);
  }

  loadInstagram() {
    if (!window.instgrm) {
      const s = document.createElement('script');
      s.async = true;
      s.defer = true;
      s.src = `https://platform.instagram.com/en_US/embeds.js`;
      s.id = 'react-instagram-embed-script';
      s.onload = this.onLoad;
      const body = document.body || null;
      if (body) {
        body.appendChild(s);
      }
    }
  }

  onLoad() {
    this.setState({
      isLoaded: true,
    });
  }

  componentDidMount() {
    this.loadInstagram();
  }

  render() {
    const {
      url = '',
      hideCaption = false,
      maxWidth = '',
      containerTagName = 'div',
      protocol = '',
      onLoading = () => {},
      onSuccess = () => {},
      onAfterRender = () => {},
      onFailure = () => {},
    } = this.props;
    const { isLoaded } = this.state;

    const css = {
      outer: {},
      blank: {
        padding: 12,
      },
    };

    return (
      <div style={css.outer}>
        {url.length > 0 && isLoaded ? (
          <InstagramEmbed
            key={url}
            url={url}
            hideCaption={hideCaption}
            maxWidth={maxWidth}
            containerTagName={containerTagName}
            protocol={protocol}
            onLoading={onLoading}
            onSuccess={onSuccess}
            onAfterRender={onAfterRender}
            onFailure={onFailure}
          />
        ) : (
          <div style={css.blank}>Instagram URL not provided</div>
        )}
      </div>
    );
  }
}

InstagramLoader.propTypes = {
  url: PropTypes.string,
  hideCaption: PropTypes.bool,
  maxWidth: PropTypes.any,
  containerTagName: PropTypes.string,
  protocol: PropTypes.string,
  onLoading: PropTypes.func,
  onSuccess: PropTypes.func,
  onAfterRender: PropTypes.func,
  onFailure: PropTypes.func,
};
