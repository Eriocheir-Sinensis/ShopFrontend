import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import BadgedShoppingCartIcon from "./BadgedShoppingCartIcon";
import WeChatIcon from "./WeChatIcon";

const styles = theme => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0
  }
});

class FooterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: -1 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
      <BottomNavigation
        value={this.state.value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          component={Link}
          to="/contact"
          label="联系我们"
          icon={<WeChatIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/cart"
          label="购物车"
          icon={<BadgedShoppingCartIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/me"
          label="我的"
          icon={<PermIdentityIcon />}
        />
      </BottomNavigation>
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;
  return { cart: cart };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FooterBar));
