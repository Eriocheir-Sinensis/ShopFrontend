import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
const useStyles = makeStyles(theme => ({
  appbar: {
    alignItems: 'center'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function HeaderBar(props) {
  const classes = useStyles();
  return (
      <ElevationScroll {...props}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" noWrap>一品蟹煌阳澄湖大闸蟹</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
  );
}


export default HeaderBar;
