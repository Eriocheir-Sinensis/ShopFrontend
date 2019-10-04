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
import ArrowBackIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {addCurrentToCart} from "../store/products/action";

const styles = theme => ({
  appbar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white"
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
    console.log(this.props)
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
            className={classes.backButton}
            color="inherit"
            aria-label="go back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            商品详情
          </Typography>
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
  addCurrentToCart: () => dispatch(addCurrentToCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FooterBar));
