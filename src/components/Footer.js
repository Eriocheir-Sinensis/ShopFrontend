import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import FooterBar from "./FooterBar";
import ProductDetailFooterBar from "./ProductDetailFooterBar";
import { mergeClasses } from "@material-ui/styles";

const styles = theme => ({
  footer: {
    top: 'auto',
    bottom: 0,
  }
});

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <footer position="fixed" className={mergeClasses.footer}>
        {this.props.pathname === "/goods" ? (
          <ProductDetailFooterBar />
        ) : (
          <FooterBar />
        )}
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash
});

export default connect(mapStateToProps)(withStyles(styles)(Footer));
