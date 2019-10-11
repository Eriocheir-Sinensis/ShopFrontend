import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router'
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { getCartDetail } from "../store/cart/action";


class BadgedShoppingCartIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCartDetail();
  }

  render() {
    const { classes } = this.props;
    return (
        <Badge variant={this.props.cart.badgeVariant} badgeContent={this.props.cart.count} color="secondary">
          <ShoppingCartIcon onClick={() => this.props.goToCart()}/>
        </Badge>
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;
  return { cart: cart };
};

const mapDispatchToProps = dispatch => ({
    getCartDetail: () => dispatch(getCartDetail()),
    goToCart: () => dispatch(push('/cart')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgedShoppingCartIcon);
