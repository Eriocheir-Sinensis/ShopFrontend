import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getCrabDetail } from "../../store/products/action";

class Index extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={this.props.product.images[0]}
          title={this.props.product.name}
        />
        <Typography>{this.props.product.name}</Typography>
      </Card>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <main>
          <Container className={classes.container} maxWidth="md">
              { this.props.product === null ?
                this.renderLoading()
                :
                Object.keys(this.props.product).length === 0 ?
                  this.render404()
                  :
                  this.renderProduct()
              }
                    {/*<CardMedia*/}
                    {/*  className={classes.cardMedia}*/}
                    {/*  image={this.props.product.images[0]}*/}
                    {/*  title={this.props.product.name}*/}
                    {/*/>*/}
                    {/*<CardContent className={classes.cardContent}>*/}
                    {/*  <Typography*/}
                    {/*    gutterBottom*/}
                    {/*    variant="h5"*/}
                    {/*    className={classes.cardContentTitle}*/}
                    {/*    noWrap*/}
                    {/*  >*/}
                    {/*    {crab.name}*/}
                    {/*  </Typography>*/}
                    {/*  <Typography*/}
                    {/*    variant="caption"*/}
                    {/*    className={classes.cardContentSubtitle}*/}
                    {/*    color="textSecondary"*/}
                    {/*    noWrap*/}
                    {/*  >*/}
                    {/*    {crab.size}*/}
                    {/*  </Typography>*/}
                    {/*</CardContent>*/}
                    {/*<CardActions className={classes.cardActions}>*/}
                    {/*  <Typography className={classes.cardContentPrice}>*/}
                    {/*    {crab.original_price ? (*/}
                    {/*      <React.Fragment>*/}
                    {/*        <span className={classes.cardContentOriginalPrice}>*/}
                    {/*          {crab.original_price}*/}
                    {/*        </span>*/}
                    {/*        &nbsp;*/}
                    {/*      </React.Fragment>*/}
                    {/*    ) : (*/}
                    {/*      {}*/}
                    {/*    )}*/}
                    {/*    {crab.price}*/}
                    {/*    {crab.net}*/}
                    {/*  </Typography>*/}
                    {/*  <div className={classes.grow} />*/}
                    {/*  <IconButton aria-label="加入购物车" color="inherit" onClick={()=>{console.log("add")}}>*/}
                    {/*    <AddShoppingCartIcon className={classes.cart} />*/}
                    {/*  </IconButton>*/}
                    {/*</CardActions>*/}
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
  getCrabDetail: (crab_id) => dispatch(getCrabDetail(crab_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
