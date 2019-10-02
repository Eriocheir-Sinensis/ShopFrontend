
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
    paddingTop: "56.25%", // 16:9
    height: "8rem"
  },
  cardContent: {
    flexGrow: 1,
    padding: '0.5rem 0.5rem 0.1rem 0.5rem'
  },
  cardContentTitle: {
    fontSize: "14px"
  },
  cardContentSubtitle: {
    fontSize: "9px"
  },
  cardActions: {
    padding: "0 0.5rem 0 0.5rem"
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
    fontSize: "11px",
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
