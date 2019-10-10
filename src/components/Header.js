import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import {mergeClasses} from '@material-ui/styles';
import HeaderBar from "./HeaderBar";
import CartHeaderBar from "./CartHeaderBar";
import CheckOutHeaderBar from "./CheckOutHeaderBar";
import MeHeaderBar from "./MeHeaderBar";
import MoneyHeader from "./MoneyHeader";
import AuthPageHeaderBar from "./AuthPageHeaderBar";
import ProductDetailHeaderBar from "./ProductDetailHeaderBar";
import ContactHeader from "./ContactHeader";

const styles = theme => ({
  header: {
    height: theme.spacing(7)
  }
});

class Header extends React.Component {
  render() {
    const {classes} = this.props;
    console.log(this.props.pathname);
    return (
      <header className={mergeClasses.header}>
        {this.props.pathname === '/goods' ?
          (<ProductDetailHeaderBar/>)
          :
          this.props.pathname === '/cart' ?
            (<CartHeaderBar/>)
            :
            this.props.pathname === '/checkout' ?
              (<CheckOutHeaderBar/>)
              :
              this.props.pathname === '/me' ?
                (<MeHeaderBar/>)
                :
                this.props.pathname === '/contact' ?
                  (<ContactHeader/>)
                  :
                this.props.pathname === '/money/' || this.props.pathname === '/money' ?
                  (<MoneyHeader/>) :
                  (this.props.pathname === '/login' || this.props.pathname === '/signup') ?
                    (<AuthPageHeaderBar/>)
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
