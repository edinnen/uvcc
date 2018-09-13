/**
 *
 * SocialSection
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import axios from 'axios';
import StackGrid from 'react-stack-grid';
import InstagramEmbed from 'react-instagram-embed';

import Wrapper from './Wrapper';
import Container from './Container';

/* eslint-disable react/prefer-stateless-function */
class SocialSection extends React.Component {
  state = {
    posts: [],
    socialItems: [],
  };

  // Get the instagram data from the API
  componentWillMount() {
    axios.get('/api/insta').then(res => {
      this.setState({ posts: res.data });
      this.getItems();
    });
  }

  // Update the grid on resize, but throttle it for preformance
  componentDidMount() {
    window.scrollTop = 0;
    this.interval = setInterval(() => this.grid.updateLayout(), 300);
  }

  // Clear the resize checker
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Create all the InstagramEmbed elements from each post we got
  getItems() {
    const { posts } = this.state;
    const out = posts.map((post, i) => {
      const regex = /\/p\/(.*)\//g;
      const instaID = regex.exec(post.link)[1];
      const theURL = `https://instagr.am/p/${instaID}`;
      return (
        <InstagramEmbed
          key={i.toString()}
          url={theURL}
          maxWidth={438}
          hideCaption={false}
          containerTagName="div"
        />
      );
    });
    this.setState({ socialItems: out });
  }

  render() {
    const { socialItems } = this.state;
    return (
      <Wrapper>
        <Container>
          <StackGrid
            gridRef={grid => (this.grid = grid)} // eslint-disable-line
            columnWidth={350}
            gutterWidth={40}
            gutterHeight={35}
            style={{ textAlign: 'center', marginBottom: 40 }}
          >
            {socialItems}
          </StackGrid>
        </Container>
      </Wrapper>
    );
  }
}

SocialSection.propTypes = {};

export default SocialSection;
