import React, { Component } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  TextField,
  IconButton,
  Container,
  Toolbar,
  Paper
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/core/SvgIcon/SvgIcon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { withStyles } from "@material-ui/core/styles";
import desc1 from "./desc1.png";
import desc2 from "./desc2.png";
import styles from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { getCrabDetail, setCurrentAmount } from "../../store/products/action";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1
    };
  }

  componentDidMount() {
    const crab_id = new URLSearchParams(this.props.location.search).get("id");
    this.props.getCrabDetail(crab_id);
  }

  renderLoading() {
    return <Typography>商品加载中</Typography>;
  }

  render404() {
    return <Typography>商品未找到</Typography>;
  }

  renderProduct() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={this.props.product.images[0]}
            title={this.props.product.name}
          />
          <CardActions className={classes.cardActions}>
            <Typography className={classes.cardContentPrice}>
              {this.props.product.original_price ? (
                <React.Fragment>
                  <span className={classes.cardContentOriginalPrice}>
                    {this.props.product.original_price}
                  </span>
                  &nbsp;
                </React.Fragment>
              ) : (
                {}
              )}
              {this.props.product.price}
              {this.props.product.net}
            </Typography>
            <div className={classes.grow} />
            <Box
              flexDirection="row"
              display="flex"
              className={classes.buttonGroup}
            >
              <Box width={1 / 3} component="span">
                <IconButton
                  aria-label="minus"
                  size="small"
                  onClick={() =>
                    this.props.setCurrentAmount(this.props.product.amount - 1)
                  }
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
              <Box width={1 / 3} component="span">
                <TextField
                  type="number"
                  id="amount"
                  name="amount"
                  rowsMax={1}
                  value={this.props.product.amount}
                  onChange={e => {
                    this.props.setCurrentAmount(e.target.value);
                  }}
                  inputProps={{ className: classes.numInput }}
                />
              </Box>
              <Box width={1 / 3} component="span">
                <IconButton
                  aria-label="add"
                  size="small"
                  onClick={() =>
                    this.props.setCurrentAmount(this.props.product.amount + 1)
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </CardActions>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" className={classes.cardTitle}>
              {this.props.product.name}
            </Typography>
            <Typography varient="caption" className={classes.cardCaption}>
              {this.props.product.size}
            </Typography>
          </CardContent>
        </Card>
        <Card className={clsx(classes.card, classes.shipping)}>
          <CardContent className={classes.cardContent}>
            <Typography
              color="primary"
              variant="body1"
              className={classes.shippingWord}
            >
              <FiberManualRecordIcon
                className={classes.shippingWordIcon}
                color="secondary"
              />
              死蟹包赔
              <FiberManualRecordIcon
                className={classes.shippingWordIcon}
                color="secondary"
              />
              无黄包赔
            </Typography>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography
              color="primary"
              variant="body1"
              className={classes.shippingWord}
            >
              <FiberManualRecordIcon
                className={classes.shippingWordIcon}
                color="secondary"
              />
              保证正宗
              <FiberManualRecordIcon
                className={classes.shippingWordIcon}
                color="secondary"
              />
              昆山阳澄湖发货
            </Typography>
          </CardContent>
        </Card>
        {this.props.product.description ? (
          <Card className={clsx(classes.card, classes.description)}>
            <CardContent className={classes.cardContent}>
              <Typography>{this.props.product.description}</Typography>
            </CardContent>
          </Card>
        ) : (
          {}
        )}
        <Card className={clsx(classes.card, classes.introduction)}>
          <CardMedia
            className={clsx(classes.introductionMedia)}
            image={desc1}
            />
        </Card>
        <Card className={clsx(classes.card, classes.introduction)}>
          <CardMedia
            className={clsx(classes.introductionMedia)}
            image={desc2}
            />
        </Card>
      </React.Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <main>
          <Container className={classes.container} maxWidth="md">
            {this.props.product === null
              ? this.renderLoading()
              : Object.keys(this.props.product).length === 0
              ? this.render404()
              : this.renderProduct()}
          </Container>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { products } = state;
  return { product: products.current };
};

const mapDispatchToProps = dispatch => ({
  getCrabDetail: crab_id => dispatch(getCrabDetail(crab_id)),
  setCurrentAmount: amount => dispatch(setCurrentAmount(amount))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
