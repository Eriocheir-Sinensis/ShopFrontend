import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress, ListItem, ListItemText, List, Container
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "../../components/Snackbar";
import Header from "../../components/Header";
import { checkPhone, checkPassword } from "../../common/checker";
import { showError } from "../../store/errorbar/action";
import { loginAccount, getAccountInfo, logOutAccount } from "../../store/auth/action";
import { getAllOrders } from "../../store/order/action";
import styles from "./styles";
import Loading from "../../components/Loading";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      address: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.user) this.props.getAccountInfo();
    if (!this.props.orders) this.props.getAllOrders();
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (!checkPhone(this.state.phone)) {
      this.props.showError("请输入正确的手机号");
      return;
    }
    console.log(this.state);
  }

  renderOrders() {
    const { classes } = this.props;
    return (
      this.props.orders !== null ? (
        <Card className={classes.orderCard}>
          <CardHeader
            title="订单详情"
          />
          <Divider />
          <CardContent>
          <List disablePadding>
            {this.props.orders.map(order => (
              <ListItem className={classes.listItem} key={order.id}>
                <ListItemText primary={`${order.count}件商品共¥${order.total}`} />
                {
                  order.status === '未付款' ? (
                    <Button variant="contained" color="primary" className={classes.downloadButton}
                      onClick={() => this.props.goToMoney(order.id)}>
                      去付款
                    </Button>
                  ) : order.status === '完成' ? (
                    <Typography variant="body2" color="error">
                      {order.status}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="secondary">
                      {order.status}
                    </Typography>
                  )
                }
              </ListItem>
            ))}
          </List>
          </CardContent>
        </Card>
      ) : (
        <Loading/>
      )
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Snackbar />
        <Container className={classes.container} maxWidth="xs">
        {this.renderOrders()}
        {this.props.user ? (
          <Card className={classes.meCard}>
            <form autoComplete="off" noValidate>
              <CardHeader
                title="修改信息"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="姓名"
                      margin="dense"
                      name="name"
                      onChange={this.handleChange}
                      required
                      value={this.state.name}
                      defaultValue={this.props.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="电话"
                      margin="dense"
                      name="phone"
                      onChange={this.handleChange}
                      value={this.state.phone}
                      defaultValue={this.props.phone}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="地址"
                      margin="dense"
                      name="address"
                      multiline
                      rows="2"
                      onChange={this.handleChange}
                      value={this.state.address}
                      defaultValue={this.props.address}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button color="primary" variant="contained" onClick={this.handleSubmit}>
                  保存修改
                </Button>
                <Button color="secondary" variant="contained" onClick={() => this.props.logout()}>
                  登出账号
                </Button>
              </CardActions>
            </form>
          </Card>
        ) : (
          <Loading />
        )}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { auth, order } = state;
  return { user: auth.user, token: auth.token, orders: order.orders };
};

const mapDispatchToProps = dispatch => ({
  showError: msg => dispatch(showError(msg)),
  getAccountInfo: (route = null) => dispatch(getAccountInfo(route)),
  logout: () => dispatch(logOutAccount()),
  getAllOrders: () => dispatch(getAllOrders()),
  goToMoney: (order_id) => dispatch(push(`/money/?id=${order_id}`)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
