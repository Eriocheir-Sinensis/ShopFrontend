import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import Grow from '@material-ui/core/Grow';
import {showNothing} from "../store/errorbar/action";

const styles = theme => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  root: {
    // position: "absolute",
    // top: theme.spacing(6),
    backgroundColor: 'darkred',
    borderRadius: '4px',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
});

class ErrorBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    const {classes} = this.props;
    return (
      <Snackbar
        className={classes.root}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={this.props.open}
        onClose={this.props.showNothing}
        TransitionComponent={this.props.Transition}
        autoHideDuration={2000}
        ContentProps={{
          'aria-describedby': 'snackbar-message',
        }}
      >
        <SnackbarContent
          className={classes.root}
          message={
            <span id="snackbar-message" className={classes.message}>
          <ErrorIcon className={classes.icon}/>
              {this.props.msg}
        </span>}
        />
      </Snackbar>
    );
  }
}

const mapStateToProps = (state) => {
  const {error} = state;
  return {open: error.open, msg: error.msg, Transition: Grow}
};

const mapDispatchToProps = dispatch => ({
  showNothing: () => dispatch(showNothing()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ErrorBar));
