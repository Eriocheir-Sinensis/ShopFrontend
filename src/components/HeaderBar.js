import React from 'react';
import { connect } from 'react-redux';
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
        <AppBar>
          <Toolbar>
            <Typography variant="h6" noWrap>Scroll to Elevate App Bar</Typography>
            <div className={classes.grow} />
            <div>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
  );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(HeaderBar);
