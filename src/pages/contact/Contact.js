import React, {Component} from "react";
import {connect} from "react-redux";
import clsx from "clsx";
import {
  Box, Button,
  Card, CardContent,
  CardMedia,
  Container, Typography,
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import desc3 from "./desc3.png";
import lady_boss from "./lady_boss.jpg";
import boss from "./boss.png";
import styles from "./styles";
import Header from "../../components/Header";

class Contact extends Component {

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Header/>
        <Container className={classes.container} maxWidth="md">
          <Card className={clsx(classes.card, classes.introduction)}>
            <CardContent>
              <Box
                flexDirection="row"
                display="flex"
              >
                <Box width={3 / 4} component="span">
                  <Typography gutterBottom variant="h5" component="h2">
                    老板微信
                  </Typography>
                </Box>
                <Box width={1 / 4} component="span">
                  <Button variant="contained" color="primary" className={classes.downloadButton} href={boss}>
                    下载
                  </Button>
                </Box>
              </Box>
            </CardContent>
            <CardMedia
              className={clsx(classes.introductionMedia)}
              image={boss}
            />

          </Card>
          <Card className={clsx(classes.card, classes.introduction)}>
            <CardContent>
              <Box
                flexDirection="row"
                display="flex"
              >
                <Box width={3 / 4} component="span">
                  <Typography gutterBottom variant="h5" component="h2">
                    老板娘微信
                  </Typography>
                </Box>
                <Box width={1 / 4} component="span">
                  <Button variant="contained" color="primary" className={classes.downloadButton} href={lady_boss}>
                    下载
                  </Button>
                </Box>
              </Box>
            </CardContent>
            <CardMedia
              className={clsx(classes.introductionMedia)}
              image={lady_boss}
            />

          </Card>
          <Card className={clsx(classes.card, classes.introduction)}>
            <CardMedia
              className={clsx(classes.introductionMedia)}
              image={desc3}
            />
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Contact));
