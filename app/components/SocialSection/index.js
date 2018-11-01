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
// import InstagramLoader from 'components/InstagramLoader';
// import InstagramEmbed from 'react-instagram-embed';

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
      const posts = res.data.sort(
        (a, b) =>
          /* eslint-disable */
          a.created_time > b.created_time
            ? 1
            : b.create_time > a.created_time
              ? -1
              : 0,
          /* eslint-enable */
      );
      this.setState({ posts });
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
    const socialItems = [];
    posts.map((post, i) => {
      const regex = /\/p\/(.*)\//g;
      const instaID = regex.exec(post.link)[1];
      const theURL = `https://instagr.am/p/${instaID}`;
      axios
        .get(`https://api.instagram.com/oembed?url=${theURL}&omitscript=true`)
        .then(res => {
          const newEl = (
            <span
              dangerouslySetInnerHTML={{ __html: res.data.html }} // eslint-disable-line
              key={i.toString()}
            />
          );
          socialItems.push(newEl);
          this.setState({ socialItems });
          if (i === posts.length - 1) window.instgrm.Embeds.process();
        });
      return true;
    });
  }

  render() {
    const { socialItems } = this.state;
    return (
      <Wrapper>
        <Container id="instagram-grid">
          <StackGrid
            gridRef={grid => (this.grid = grid)} // eslint-disable-line
            columnWidth={window.innerWidth > 768 ? 350 : '100%'}
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
