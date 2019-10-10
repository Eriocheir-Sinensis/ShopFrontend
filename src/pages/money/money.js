import React from "react";
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Link as ReactLink } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Button,
  Box,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress, CardActions
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import GetAppIcon from '@material-ui/icons/GetApp';
import Header from "../../components/Header";
import Snackbar from "../../components/Snackbar";
import { checkPhone, checkPassword } from "../../common/checker";
import {showError} from "../../store/errorbar/action";
import {loginAccount, getAccountInfo} from "../../store/auth/action";
import styles from './styles';
import Copyright from "../../components/Copyright";
import {getMoney} from "../../store/money/action";
import {getOrderDetails} from "../../store/order/action";
import Loading from "../../components/Loading";
import EditIcon from "@material-ui/core/SvgIcon/SvgIcon";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


class Money extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.money === null) this.props.getMoney();
    const order_id = new URLSearchParams(this.props.location.search).get("id");
    if (order_id) this.props.getOrderDetails(order_id);
  }

  handleChange = (e, v) => {
    this.setState({value: v})
  };

  renderLoading() {
    return (<Loading/>)
  }

  renderMoney() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
          {
            this.props.money.map((m, i) => (
              <Tab label={m.name} key={i} {...a11yProps(i)} />
            ))
          }
        </Tabs>
        {
          this.props.money.map((m, i) => (
            <TabPanel key={i} value={this.state.value} index={i}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  {
                    this.props.order ?
                      this.props.order.status === '未付款' ? (
                      <Typography gutterBottom variant="body2">
                        订单总{this.props.order.count}件总计{this.props.order.total}元
                      </Typography>
                    ) : (
                        <Typography gutterBottom variant="caption">
                          订单已完成支付请勿重复付款
                        </Typography>
                      ) :
                      (<div />)
                  }
                  <Box
                    flexDirection="row"
                    display="flex"
                  >
                    <Box width={3 / 4} component="span">
                      <Typography gutterBottom variant="h5" component="h2">
                        {m.description}
                      </Typography>
                    </Box>
                    <Box width={1 / 4} component="span">
                      <Button variant="contained" color="primary" className={classes.downloadButton} href={m.image}>
                          下载
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                <CardMedia
                  className={classes.media}
                  image={m.image}
                  title={m.description}
                />
              </Card>
            </TabPanel>
          ))
        }
      </React.Fragment>
    )
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Header />
        <Snackbar/>
        <Container component="main" maxWidth="xs" className={classes.container}>
          {this.props.money ? this.renderMoney() : this.renderLoading()}
          <Box mt={5}>
            <Copyright/>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {money, order} = state;
  return {money: money.money, order: order.current}
};

const mapDispatchToProps = dispatch => ({
  getMoney: () => dispatch(getMoney()),
  download: (img) => dispatch(push(img)),
  getOrderDetails: (order_id) => dispatch(getOrderDetails(order_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Money));
