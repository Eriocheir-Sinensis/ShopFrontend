import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import HeaderBar from "./HeaderBar";
import ProductDetailHeaderBar from "./ProductDetailHeaderBar";
import { mergeClasses } from '@material-ui/styles';

const styles = theme => ({
  header: {
    height: theme.spacing(7)
  }
});

class Header extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <header className={mergeClasses.header}>
      {this.props.pathname === '/goods' ?
        (<ProductDetailHeaderBar/>)
        :
        (<HeaderBar/>)
      }
      </header>
    )
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

export default connect(mapStateToProps)(withStyles(styles)(Header));
