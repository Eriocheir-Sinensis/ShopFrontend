
const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1,
    paddingBottom: '10px'
  },
  cardContentTitle: {
    fontSize: "16px"
  },
  cardContentSubtitle: {
    fontSize: "10px"
  },
  cardContentPrice: {
    fontSize: "14px",
    color: theme.palette.primary.main,
    '@media (max-width: 320px)': {
      fontSize: "9px"
    }
  },
  cardContentOriginalPrice: {
    color: '#DDD',
    textDecoration: 'line-through',
  },
  grow: {
    flexGrow: 1
  },
  cart: {
    color: theme.palette.primary.main
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
});

export default styles;
