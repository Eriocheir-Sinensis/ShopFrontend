import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
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
import { getCrabList } from "../../store/products/action";
import { addToCart } from "../../store/cart/action";

class Index extends Component {
  constructor(props) {
    super(props);
    this.goToDetail = this.goToDetail.bind(this);
  }

  componentDidMount() {
    this.props.getCrabList();
  }

  goToDetail(crab) {
    this.props.history.push(`/goods?id=${crab.id}`);
  }

  render() {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.props.crabs.map(crab => (
                <Grid item key={crab.id} xs={6} sm={4} md={3}>
                  <Card className={classes.card}>
                    <CardActionArea onClick={event => this.goToDetail(crab)}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={crab.images[0]}
                      title={crab.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        className={classes.cardContentTitle}
                        noWrap
                      >
                        {crab.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.cardContentSubtitle}
                        color="textSecondary"
                        noWrap
                      >
                        {crab.size}
                      </Typography>
                    </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}>
                      <Typography className={classes.cardContentPrice}>
                        {crab.original_price ? (
                          <React.Fragment>
                            <span className={classes.cardContentOriginalPrice}>
                              {crab.original_price}
                            </span>
                            &nbsp;
                          </React.Fragment>
                        ) : (
                          {}
                        )}
                        {crab.price}
                        {crab.net}
                      </Typography>
                      <div className={classes.grow} />
                      <IconButton aria-label="加入购物车" color="inherit" onClick={()=>{this.props.addToCart(crab.id, 1)}}>
                        <AddShoppingCartIcon className={classes.cart} />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { products } = state;
  return { crabs: products.crabs };
};

const mapDispatchToProps = dispatch => ({
  getCrabList: () => dispatch(getCrabList()),
  addToCart: (item_id, amount) => dispatch(addToCart(item_id, amount)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
