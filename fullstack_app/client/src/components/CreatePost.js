import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
// import { postPost } from '../redux/actions/dataActions';

const styles = {
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
};

class CreatePost extends Component {
  state = {
    open: false,
    body: '',
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    // alert("this.state.body:" +this.state.body);
    // this.props.postPost({ body: this.state.body });
    // console.log("this.state.body: "+JSON.stringify(this.state.body));
    const post_content = this.state.body;
    this.props.postPost({ body: post_content });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Create a post!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Post!"
                multiline
                rows="3"
                placeholder="Share your thoughts"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(mapStateToProps)(withStyles(styles)(CreatePost));