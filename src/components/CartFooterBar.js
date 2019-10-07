import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ButtonGroup,
  Button
} from "@material-ui/core";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
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
  total: {
    paddingRight: "1rem",
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
            onClick={() => this.props.push('/')}
          >
            <HomeOutlinedIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.weChatButton}
            color="inherit"
            aria-label="联系"
            onClick={() => this.props.push('/contact')}
          >
            <WeChatIcon />
          </IconButton>
          <div className={classes.grow} />
          <Typography
            color="primary"
            className={classes.total}
          >
            总价：¥{this.props.cart.total}
          </Typography>
          <ButtonGroup aria-label="outlined primary button group">
            <Button
              className={classes.buyButton}
              onClick={() => this.props.push('/checkout')}
            >
              确认订单
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
  addCurrentToCart: () => dispatch(addCurrentToCart()),
  push: (r) => dispatch(push(r)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FooterBar));
