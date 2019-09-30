import React from "react";
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
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "../../components/Snackbar";
import { checkPhone, checkPassword } from "../../common/checker";
import { showError } from "../../store/errorbar/action";
import { loginAccount, getAccountInfo } from "../../store/auth/action";
import styles from "./styles";

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
    this.props.getAccountInfo();
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

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Snackbar />
        {this.props.user ? (
          <Card className={classes.root}>
            <form autoComplete="off" noValidate>
              <CardHeader
                title="账户信息"
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
              </CardActions>
            </form>
          </Card>
        ) : (
          <CircularProgress className={classes.progress} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return { user: auth.user, token: auth.token };
};

const mapDispatchToProps = dispatch => ({
  showError: msg => dispatch(showError(msg)),
  getAccountInfo: (route = null) => dispatch(getAccountInfo(route))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
