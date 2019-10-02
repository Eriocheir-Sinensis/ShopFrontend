import React from 'react';
import { connect } from 'react-redux';
import FooterBar from "./FooterBar";
import ProductDetailFooterBar from "./ProductDetailFooterBar";


class Footer extends React.Component {
  render() {
    if (this.props.pathname === '/goods') {
      return (<ProductDetailFooterBar/>)
    } else {
      return (<FooterBar/>)
    }
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

export default connect(mapStateToProps)(Footer);
