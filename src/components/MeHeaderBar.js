import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BadgedShoppingCartIcon from "./BadgedShoppingCartIcon";

const styles = theme => ({
  appbar: {
  },
  grow: {
    flexGrow: 1
  },
  title: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: theme.spacing(6),
    right: theme.spacing(6),
    textAlign: 'center',
    marginTop: theme.spacing(1.5),
  },
  backButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  }
});

class MeHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.backButton}
            color="inherit"
            aria-label="go back"
            onClick={() => this.props.goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            账号详情
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(push("/")),
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(MeHeader));
