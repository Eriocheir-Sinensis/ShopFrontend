import React from "react";
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Link as ReactLink } from 'react-router-dom';
import {
  Avatar,
  Button,
  Box,
  TextField,
  Link,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {withStyles} from "@material-ui/core/styles";
import Header from "../../components/Header";
import Snackbar from "../../components/Snackbar";
import { checkPhone, checkPassword } from "../../common/checker";
import {showError} from "../../store/errorbar/action";
import {loginAccount, getAccountInfo} from "../../store/auth/action";
import styles from './styles';
import Copyright from "../../components/Copyright";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAccountInfo('/');
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit(event) {
    event.preventDefault();
    if (!checkPhone(this.state.phone)) {
      this.props.showError("请输入正确的手机号");
      return;
    }
    if (!checkPassword(this.state.password)) {
      this.props.showError("密码格式不正确");
      return;
    }
    this.props.loginAccount({phone: this.state.phone, password: this.state.password});
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Header />
        <Snackbar/>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              登录帐号
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="手机号"
                name="phone"
                autoComplete="phone"
                autoFocus
                value={this.state.phone}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {/*<FormControlLabel*/}
              {/*  control={<Checkbox value="remember" color="primary"/>}*/}
              {/*  label="Remember me"*/}
              {/*/>*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                登录
              </Button>
              <Grid container>
                {/*<Grid item xs>*/}
                {/*  <Link href="#" variant="body2">*/}
                {/*    Forgot password?*/}
                {/*  </Link>*/}
                {/*</Grid>*/}
                <Grid item>
                  <Link component={ReactLink} to="/signup" variant="body2">
                    {"没有帐号？点击注册"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright/>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {auth} = state;
  return {user: auth.user, token: auth.token}
};

const mapDispatchToProps = dispatch => ({
  showError: (msg) => dispatch(showError(msg)),
  loginAccount: (data) => dispatch(loginAccount(data)),
  getAccountInfo: (route=null) => dispatch(getAccountInfo(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
