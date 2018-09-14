/**
 *
 * HomeNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
// import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import PersonModal from 'components/PersonModal';
import PreCacheImg from 'react-precache-img';
import FacebookIcon from 'images/icons/facebook.svg';
import InstagramIcon from 'images/icons/instagram.svg';
import Logo from 'images/logo.svg';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import MarkdownWrapper from './MarkdownWrapper';

import Wrapper from './Wrapper';
import Menu from './Menu';
import A from './A';
import SocialIcons from './SocialIcons';
import Img from './Img';
import LogoWrapper from './LogoWrapper';
import ArrowWrapper from './ArrowWrapper';

const styles = () => ({
  paper: {
    overflowX: 'hidden',
  },
  paperWidthSm: {
    maxWidth: 750,
  },
  paperFullScreen: {
    maxWidth: '100% !important',
  },
  root: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  buttonRoot: {
    backgroundColor: '#ffd600',
    width: 100,
    marginLeft: 13,
    marginBottom: 10,
  },
});

/* eslint-disable react/prefer-stateless-function */
class HomeNav extends React.Component {
  state = {
    selected: 0,
    initialLoad: true,
    pages: this.props.pages,
    gearOpen: false,
    executivesOpen: false,
    execSelect: false,
  };

  componentWillMount() {
    this.sortPages();
  }

  handleGear = () => {
    this.setState({ gearOpen: !this.state.gearOpen });
  };

  handleExecutives = () => {
    this.setState({ executivesOpen: !this.state.executivesOpen });
  };

  showExecSelect = () => {
    this.setState({ execSelect: !this.state.execSelect });
  };

  scrollInsta = () => {
    const insta = document.getElementById('instagram-grid');
    insta.scrollIntoView({ behaviour: 'smooth', block: 'start' });
  };

  sortPages = () => {
    let { pages } = this.state;

    const schedule = pages.find(x => x.slug === 'semesterly-caving-schedule');
    const executives = pages.find(x => x.slug === 'meet-our-executives');
    const suggested = pages.find(x => x.slug === 'suggested-gear');

    const bcsf = pages.find(x => x.slug === 'bcsf');
    const nonUvic = pages.find(x => x.slug === 'non-uvic');
    const rescue = pages.find(x => x.slug === 'rescue');

    pages = pages.filter(x => {
      let bool = true;
      if (
        x.slug === 'meet-our-executives' ||
        x.slug === 'semesterly-caving-schedule' ||
        x.slug === 'suggested-gear' ||
        x.slug === 'bcsf' ||
        x.slug === 'non-uvic' ||
        x.slug === 'rescue'
      )
        bool = !bool;
      return bool;
    });

    pages.unshift(schedule, suggested, executives);
    pages.push(rescue, nonUvic, bcsf);
    this.setState({ pages });
  };

  selectPage = selected => {
    this.setState({ selected, initialLoad: false });
  };

  navTo = selected => {
    const { pages } = this.state;
    const page = pages[selected];
    switch (page.type) {
      case 'External Link':
        window.open(page.externalUrl, '_blank');
        break;
      case 'Link to document':
        window.open(page.document.url, '_blank');
        break;
      case 'Internal body copy':
        this.handleGear();
        break;
      case 'Executives':
        this.showExecSelect();
        break;
      default:
        break;
    }
  };

  render() {
    const { pages, selected, initialLoad, execSelect, gearOpen } = this.state;
    const { fullScreen, classes, executives } = this.props;

    const { copy } = pages.find(x => x.slug === 'suggested-gear');
    const pageImageURLs = pages.map(page => page.image.url);
    const executiveImageURLs = executives.map(exec => exec.image.url);
    const imageURLs = [...pageImageURLs, ...executiveImageURLs];

    return (
      <Wrapper
        imageUrl={
          !this.props.hide
            ? pages[selected].image.url
            : pages.find(x => x.slug === 'suggested-gear').image.url
        }
      >
        {pages[selected].imageAttribution !== null ? (
          <span id="attribution">
            Photo Credit: {pages[selected].imageAttribution}
          </span>
        ) : ''} {/* eslint-disable-line */}
        <PreCacheImg images={imageURLs} />
        <Menu hide={this.props.hide}>
          {/* eslint-disable */}
          {execSelect ? (
            <div style={{ display: 'flex', flexDirection: 'column', width: 85 }}>
              <Button variant="contained" className={classNames(classes.buttonRoot)} onClick={() => this.showExecSelect()}>Go Back</Button>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {executives.map((exec, i) => <PersonModal person={exec} key={`person-${i.toString()}`} />)} {/* eslint-disable-line */}
              </div>
            </div>
          )
            : pages.map((page, i) => (
              <span
                key={`page-${i.toString()}`}
                className={selected === i && !initialLoad ? 'selected navItem' : 'navItem'}
                onMouseOver={() => this.selectPage(i)}
                onFocus={() => this.selectPage(i)}
                onClick={() => this.navTo(i)}
                onKeyPress={() => this.navTo(i)}
                role="menuitem"
                tabIndex={0}
              >
                {page.title}
              </span>
          ))}
          {/* eslint-enable */}
        </Menu>
        <SocialIcons
          style={execSelect ? { display: 'none' } : { display: 'block' }}
        >
          <A
            href="https://www.facebook.com/groups/UvicCavingClub/"
            target="_blank"
          >
            <img
              src={FacebookIcon}
              style={{ width: 18, margin: '10px 15px 10px 0' }}
              alt="Facebook"
            />
          </A>
          <A href="http://www.instagram.com/uviccaving" target="_blank">
            <img
              src={InstagramIcon}
              style={{ width: 31, margin: '10px 15px 10px 0' }}
              alt="Instagram"
            />
          </A>
        </SocialIcons>
        {!execSelect ? (
          <LogoWrapper>
            <Img src={Logo} alt="University of Victoria Caving Club" />
          </LogoWrapper>
        ) : (
          ''
        )}
        <ArrowWrapper>
          <div style={{ display: 'block', margin: '0 auto', width: 48 }}>
            <IconButton onClick={this.scrollInsta}>
              <ArrowDownward />
            </IconButton>
          </div>
        </ArrowWrapper>
        <Dialog
          fullScreen={fullScreen}
          open={gearOpen}
          onClose={this.handleGear}
          area-labelledby="suggested-gear"
        >
          <DialogTitle id="responsive-dialog-title">
            Suggested Gear
            <IconButton classes={classes} onClick={this.handleGear}>
              <ClearIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <MarkdownWrapper>
              <ReactMarkdown source={copy} />
            </MarkdownWrapper>
          </DialogContent>
        </Dialog>
      </Wrapper>
    );
  }
}

HomeNav.propTypes = {
  pages: PropTypes.array.isRequired,
  hide: PropTypes.bool,
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  executives: PropTypes.array,
};

export default compose(
  withMobileDialog(),
  withStyles(styles),
)(HomeNav);
