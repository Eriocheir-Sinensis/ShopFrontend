import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ButtonGroup,
  Button
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import WeChatIcon from "./WeChatIcon";
import { addCurrentToCart } from "../store/products/action";

const styles = theme => ({
  appbar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white"
  },
  homeButton: {
    color: "#303c42"
  },
  weChatButton: {
    color: "#303c42"
  },
  grow: {
    flexGrow: 1
  },
  addToCartButton: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main
  },
  buyButton: {
    color: "white",
    backgroundColor: theme.palette.primary.main
  }
});

class FooterBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    console.log(this.props);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.homeButton}
            aria-label="主页"
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.weChatButton}
            color="inherit"
            aria-label="联系"
          >
            <WeChatIcon />
          </IconButton>
          <div className={classes.grow} />
          <ButtonGroup aria-label="outlined primary button group">
            <Button
              className={classes.addToCartButton}
              onClick={() => this.props.addCurrentToCart()}
            >
              加入购物车
            </Button>
            <Button
              className={classes.buyButton}
              // startIcon={<ShoppingCartIcon />}
            >
              立即购买
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;
  return { cart: cart };
};

const mapDispatchToProps = dispatch => ({
  addCurrentToCart: () => dispatch(addCurrentToCart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FooterBar));
