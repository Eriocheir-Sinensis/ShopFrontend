import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  IconButton,
  Container,
  TextField,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import styles from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getCartDetail, updateCart, removeFromCart } from "../../store/cart/action";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteConfirmShow: false,
      pendingDelete: null
    };
    this.goToDetail = this.goToDetail.bind(this);
    this.handleDeleteConfirmOpen = this.handleDeleteConfirmOpen.bind(this);
    this.handleDeleteConfirmClose = this.handleDeleteConfirmClose.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
  }

  componentDidMount() {
    this.props.getCartDetail();
  }

  goToDetail(item) {
    this.props.history.push(`/goods?id=${item.id}`);
  }

  handleDeleteConfirmOpen(item) {
    this.setState({
      deleteConfirmShow: true,
      pendingDelete: item
    });
  }
  handleDeleteConfirmClose() {
    this.setState({ deleteConfirmShow: false });
  }
  handleDeleteConfirm() {
    this.props.removeFromCart(this.state.pendingDelete.crab.id);
    this.setState({ deleteConfirmShow: false });
  }

  renderDialog() {
    return (
      <Dialog
        open={this.state.deleteConfirmShow}
        onClose={this.handleDeleteConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {this.state.pendingDelete ? (
          <React.Fragment>
            <DialogTitle id="alert-dialog-title">
                确定删除？
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {this.state.pendingDelete.crab.name}
                共{this.state.pendingDelete.amount}件
              </DialogContentText>
            </DialogContent>
          </React.Fragment>
        ) : (
          <DialogTitle id="alert-dialog-title">
              未选中待删除商品
          </DialogTitle>
        )}
        <DialogActions>
          <Button onClick={this.handleDeleteConfirmClose} color="primary">
            取消
          </Button>
          <Button
            onClick={this.handleDeleteConfirm}
            color="primary"
            autoFocus
          >
            确认
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderSimplifiedItem(item) {
    const { classes } = this.props;
    return (
      <Grid item key={item.id} xs={12}>
        <Card className={classes.card}>
          <Paper className={classes.paper} />
        </Card>
      </Grid>
    );
  }

  renderDetailedItem(item, index) {
    const { classes } = this.props;
    const { crab } = item;
    return (
      <Grid item key={item.id} xs={12}>
        <Card className={classes.card}>
          <Grid container item={true} xs={12}>
            <Grid item xs={4}>
              <CardMedia
                className={classes.cardMedia}
                image={crab.images[0]}
                title={crab.name}
              />
            </Grid>
            <Grid container item={true} xs={8} className={classes.gridDetails}>
              <Grid item xs={12} className={classes.gridDetailsLineItem}>
                <IconButton
                  size="small"
                  className={classes.gridDetailsDeleteButton}
                  onClick={() => this.handleDeleteConfirmOpen(item)}
                >
                  <DeleteOutlineOutlinedIcon color="primary" />
                </IconButton>
                <CardContent className={classes.gridDetailsCardContent}>
                  <Typography
                    gutterBottom
                    variant="body1"
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
              </Grid>
              <Grid item xs={12}>
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
                  <Box
                    flexDirection="row"
                    display="flex"
                    className={classes.gridDetailsBox}
                  >
                    <Box width={1 / 3} component="span">
                      <IconButton
                        aria-label="minus"
                        size="small"
                        onClick={() => {
                            return this.props.items[index].amount === 1 ?
                            this.handleDeleteConfirmOpen(item)
                            :
                            this.props.updateCart(crab.id, this.props.items[index].amount - 1)
                        }
                        }
                      >
                        <RemoveIcon className={classes.iconButton} />
                      </IconButton>
                    </Box>
                    <Box
                      width={1 / 3}
                      component="span"
                      className={classes.gridDetailsNumBox}
                    >
                      <TextField
                        type="number"
                        id="amount"
                        name="amount"
                        rowsMax={1}
                        value={this.props.items[index].amount}
                        onChange={e => {
                          this.props.updateCart(crab.id, e.target.value);
                        }}
                        inputProps={{ className: classes.numInput }}
                        className={classes.gridDetailsNumTextField}
                      />
                    </Box>
                    <Box width={1 / 3} component="span">
                      <IconButton
                        aria-label="add"
                        size="small"
                        onClick={() =>
                          this.props.updateCart(
                            crab.id,
                            this.props.items[index].amount + 1
                          )
                        }
                      >
                        <AddIcon className={classes.iconButton} />
                      </IconButton>
                    </Box>
                  </Box>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <main>
          <Container className={classes.cardGrid} maxWidth="xs">
            {this.renderDialog()}
            <Grid container spacing={2} className={classes.gridContainer}>
              {this.props.items.map((item, index) => {
                return Number.isInteger(item.crab)
                  ? this.renderSimplifiedItem(item)
                  : this.renderDetailedItem(item, index);
              })}
            </Grid>
          </Container>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;
  return { items: cart.items };
};

const mapDispatchToProps = dispatch => ({
  getCartDetail: () => dispatch(getCartDetail(true)),
  updateCart: (item_id, amount) => dispatch(updateCart(item_id, amount, true)),
  removeFromCart: (item_id) => dispatch(removeFromCart(item_id, true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
