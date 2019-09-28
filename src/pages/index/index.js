import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import HeaderBar from "../../components/HeaderBar";
import Layout from "../../components/Layout";
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles";
import FooterBar from "../../components/FooterBar";
import { getCrabList } from "../../store/products/action";


class Index extends Component {

  componentDidMount() {
    this.props.getCrabList();
  }

  render() {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const { classes } = this.props;
    return (
      <Layout>
        <HeaderBar/>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Album layout
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Main call to action
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary action
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.props.crabs.map(crab => (
                <Grid item key={crab.id} xs={6} sm={4} md={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={crab.images[0]}
                      title={crab.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="subtitle2">
                        { crab.name }
                      </Typography>
                      <Typography variant="caption">
                        { crab.size }
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <FooterBar/>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state;
  return { crabs: products.crabs } 
}

const mapDispatchToProps = (dispatch) => ({
  getCrabList: () => dispatch(getCrabList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index));
