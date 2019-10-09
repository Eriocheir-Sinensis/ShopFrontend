import React from 'react';
import {connect} from 'react-redux';
import {Link as ReactLink} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {checkPhone, checkPassword} from "../../common/checker";
import Copyright from "../../components/Copyright";
import styles from './styles';
import Header from "../../components/Header";
import Snackbar from "../../components/Snackbar";
import {showError} from "../../store/errorbar/action";
import {registerAccount} from "../../store/auth/action";


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      address: '',
      password: '',
      repeated_password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!checkPhone(this.state.phone)) {
      this.props.showError("请输入正确的手机号");
      this.setState({phone: ''});
      return;
    }
    if (!checkPassword(this.state.password)) {
      this.props.showError("密码格式不正确");
      this.setState({password: '', repeated_password: ''});
      return;
    }
    if (this.state.password !== this.state.repeated_password) {
      this.props.showError("两次密码不一致");
      this.setState({password: '', repeated_password: ''});
      return;
    }
    this.props.registerAccount(this.state);
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Header/>
        <Snackbar/>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="姓名"
                    name="name"
                    autoComplete="name"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    id="phone"
                    label="电话"
                    name="phone"
                    autoComplete="phone"
                    error={this.state.phone ? !checkPhone(this.state.phone) : false}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    multiline
                    rows="2"
                    fullWidth
                    id="address"
                    label="地址"
                    name="address"
                    autoComplete="address"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="密码"
                    type="password"
                    id="password"
                    autoComplete="password"
                    error={this.state.password ? !checkPassword(this.state.password) : false}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="repeated_password"
                    label="重复密码"
                    type="password"
                    id="repeated_password"
                    autoComplete="repeated_password"
                    error={this.state.repeated_password ?
                      !(this.state.repeated_password === this.state.password) : false}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                注册
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link component={ReactLink} to="/login" variant="body2">
                    已经有帐号？登录
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
  registerAccount: (data) => dispatch(registerAccount(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
