import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {ButtonGroup, Toolbar, Box} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from "@material-ui/core/SvgIcon/SvgIcon";
import TextField from "@material-ui/core/TextField";
import {
  getCrabDetail,
  setCurrentAmount
} from "../../store/products/action";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1
    }
  }

  componentDidMount() {
    const crab_id = new URLSearchParams(this.props.location.search).get('id');
    this.props.getCrabDetail(crab_id);
  }

  renderLoading() {
    return (
      <Typography>商品加载中</Typography>
    );
  }

  render404() {
    return (
      <Typography>商品未找到</Typography>
    );
  }

  renderProduct() {
    const {classes} = this.props;
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
            <div className={classes.grow}/>
            <Box flexDirection="row" display="flex" className={classes.buttonGroup}>
              <Box width={1 / 3} component="span">
                <IconButton aria-label="minus" size="small"
                            onClick={() => this.props.setCurrentAmount(this.props.product.amount-1)}>
                  <RemoveIcon/>
                </IconButton>
              </Box>
              <Box width={1 / 3} component="span">
                <TextField
                  id="amount"
                  name="amount"
                  rowsMax={1}
                  value={this.props.product.amount}
                  onChange={(e) => { this.props.setCurrentAmount(e.target.value) }}
                  inputProps={{className: classes.numInput }}
                />
              </Box>
              <Box width={1 / 3} component="span">
                <IconButton aria-label="add" size="small"
                            onClick={() => this.props.setCurrentAmount(this.props.product.amount+1)}>
                  <AddIcon/>
                </IconButton>
              </Box>
            </Box>
          </CardActions>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" className={classes.cardTitle}>{this.props.product.name}</Typography>
            <Typography varient="caption" className={classes.cardCaption}>{this.props.product.size}</Typography>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Header/>
        <main>
          <Container className={classes.container} maxWidth="md">
            {this.props.product === null ?
              this.renderLoading()
              :
              Object.keys(this.props.product).length === 0 ?
                this.render404()
                :
                this.renderProduct()
            }
          </Container>
        </main>
        <Footer/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {products} = state;
  return {product: products.current};
};

const mapDispatchToProps = dispatch => ({
  getCrabDetail: (crab_id) => dispatch(getCrabDetail(crab_id)),
  setCurrentAmount: (amount) => dispatch(setCurrentAmount(amount)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
