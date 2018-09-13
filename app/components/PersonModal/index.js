/**
 *
 * PersonModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { compose } from 'redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ReactMarkdown from 'react-markdown';
import Divider from './Divider';
import Person from './Person';
import Img from './Img';

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
    '&#actions': {
      marginTop: 3,
      marginRight: -1,
    },
  },
});

class PersonModal extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    open: this.props.active,
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { person, fullScreen, classes } = this.props;

    return (
      <div>
        <Person onClick={this.handleToggle}>
          <Img src={person.image.url} />
          <div
            style={{
              color: '#ffd600',
              fontSize: 24,
              fontWeight: 300,
              letterSpacing: '2.57px',
              lineHeight: '35px',
              maxWidth: 255,
              textShadow: '2px 2px 2px black',
            }}
          >
            {person.name}
          </div>
          <Divider />
          <div style={{ maxWidth: 255 }}>
            <span className="bold" style={{ textShadow: '2px 2px 2px black' }}>
              {person.role}
            </span>
          </div>
        </Person>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleToggle}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={classes}
        >
          <DialogActions classes={classes} id="actions">
            <IconButton onClick={this.handleToggle}>
              <ClearIcon />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <Person className="embed">
              <Img src={person.image.url} inModal />
              <div
                style={{
                  color: '#ffd600',
                  fontSize: 24,
                  fontWeight: 300,
                  letterSpacing: '2.57px',
                  lineHeight: '35px',
                  maxWidth: 255,
                }}
              >
                {person.name}
              </div>
              <Divider />
              <div style={{ maxWidth: 255 }}>
                <span className="bold">{person.role}</span>
              </div>
            </Person>
            <div style={{ margin: 15 }}>
              <ReactMarkdown source={person.bio} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

PersonModal.propTypes = {
  person: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  active: PropTypes.bool,
};

export default compose(
  withMobileDialog(),
  withStyles(styles),
)(PersonModal);
