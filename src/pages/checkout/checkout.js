import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Container,
  TextField,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import styles from "./styles";
import Header from "../../components/Header";
import {
  getCartDetail,
  updateCart,
  removeFromCart
} from "../../store/cart/action";
import { getAccountInfo } from "../../store/auth/action";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      address: "",
      orderConfirmShow: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.user === null) this.props.getAccountInfo();
    this.props.getCartDetail();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name.length === 0 && this.props.user) {
      this.setState({ name: this.props.user.name });
    }
    if (prevState.phone.length === 0 && this.props.user) {
      this.setState({ phone: this.props.user.phone });
    }
    if (prevState.address.length === 0 && this.props.user) {
      this.setState({ address: this.props.user.address });
    }
  }

  handleOrderConfirmClose = () => {
    this.setState({ orderConfirmShow: false });
  }
  handleOrderConfirm = () => {
    console.log("!!!!!!!");
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  renderDialog() {
    return (
      <Dialog
        open={this.state.orderConfirmShow}
        onClose={this.handleOrderConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            确定订单？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            订单共{this.props.cart.count}件，
            总计¥{this.props.cart.total}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            送货至：{this.state.address}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            收货人：{this.state.name}，{this.state.phone}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleOrderConfirmClose} color="secondary">
            再修改一下
          </Button>
          <Button
            onClick={this.handleOrderConfirm}
            color="primary"
          >
            确认
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <main>
          { this.renderDialog() }
          <Container className={classes.container} maxWidth="xs">
            <Grid container spacing={2} className={classes.grid}>
              <Grid item xs={12} className={classes.gridAddress}>
                <Card className={classes.gridAddressCard}>
                  <CardContent className={classes.gridAddressCardContent}>
                    <Typography variant="h6" gutterBottom>
                      送货信息
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="name"
                          name="name"
                          label="收货人姓名"
                          fullWidth
                          autoComplete="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="phone"
                          name="phone"
                          label="收货人电话"
                          fullWidth
                          autoComplete="phone"
                          value={this.state.phone}
                          onChange={this.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="address"
                          name="address"
                          rows="2"
                          label="送货地址"
                          multiline
                          fullWidth
                          autoComplete="address"
                          value={this.state.address}
                          onChange={this.handleChange}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} className={classes.gridOrder}>
                <Card className={classes.gridOrderCard}>
                  <CardContent className={classes.gridOrderCardContent}>
                    <Typography variant="body2" className={classes.gridOrderEdit}
                      onClick={() => this.props.goToCart()}
                    >
                      <EditIcon color="primary" className={classes.gridOrderEditIcon}/>修改
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      订单信息
                    </Typography>
                    <List disablePadding>
                      {this.props.cart.items.map(item => (
                        <ListItem className={classes.listItem} key={item.id}>
                          {Number.isInteger(item.crab) ? (
                            <ListItemText primary={`${item.amount}件商品`} />
                          ) : (
                            <ListItemText
                              primary={`${item.crab.name} * ${item.amount}`}
                              secondary={item.crab.size}
                            />
                          )}
                          <Typography variant="body2">
                            ¥{item.subtotal}
                          </Typography>
                        </ListItem>
                      ))}
                      <ListItem className={classes.listItem}>
                        <ListItemText primary="共计" />
                        <Typography
                          variant="subtitle1"
                          className={classes.total}
                        >
                          ¥{this.props.cart.total}
                        </Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} className={classes.gridConfirm}>
                <Button
                  onClick={() => this.setState({ orderConfirmShow: true })}
                  color="primary"
                  autoFocus
                  variant="contained"
                  className={classes.confirmButton}
                >
                  确认
                </Button>
              </Grid>
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { cart, auth } = state;
  return { cart: cart, user: auth.user };
};

const mapDispatchToProps = dispatch => ({
  goToCart: () => dispatch(push("/cart")),
  getAccountInfo: () => dispatch(getAccountInfo()),
  getCartDetail: () => dispatch(getCartDetail(true)),
  updateCart: (item_id, amount) => dispatch(updateCart(item_id, amount, true)),
  removeFromCart: item_id => dispatch(removeFromCart(item_id, true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
