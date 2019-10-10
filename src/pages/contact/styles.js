
const styles = theme => ({
  container: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(8),
    paddingLeft: 0,
    paddingRight: 0,
  },
  buttonGroup: {
    width: theme.spacing(12),
    height: theme.spacing(4),
    fontSize: 'small',
  },
  numInput: {
    textAlign: 'center'
  },
  card: {
    borderRadius: "0",
  },
  cardContent: {
    padding: "0.5rem 1rem 0.5rem 1rem"
  },
  shipping: {
  },
  shippingWord: {
  },
  shippingWordIcon: {
    fontSize: "0.9rem",
  },
  cardTitle: {

  },
  cardCaption: {
    color: "#6A6A6A"
  },
  cardContentPrice: {
    fontSize: "20px",
    color: theme.palette.primary.main,
  },
  cardContentOriginalPrice: {
    color: '#DDD',
    fontSize: "16px",
    textDecoration: 'line-through',
  },
  cardMedia: {
    width: '100%',
    paddingTop: '75%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
  },
  grow: {
    flexGrow: 1
  },
  description: {
    backgroundColor: theme.palette.background.paper
  },
  introduction: {
    borderRadius: "0.5rem",
    marginBottom: "0.5rem",
  },
  introductionMedia: {
    paddingTop: '120%',
  },
});

export default styles;
