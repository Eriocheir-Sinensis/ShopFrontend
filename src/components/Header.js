import React from 'react';
import { connect } from 'react-redux';
import HeaderBar from "./HeaderBar";
import ProductDetailHeaderBar from "./ProductDetailHeaderBar";


class Header extends React.Component {
  render() {
    if (this.props.pathname === '/goods') {
      return (<ProductDetailHeaderBar/>)
    } else {
      return (<HeaderBar/>)
    }
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

export default connect(mapStateToProps)(Header);
