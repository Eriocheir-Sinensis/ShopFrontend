const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  card: {},
  cardMedia: {
    paddingTop: "90%"
  },
  gridDetails: {},
  gridDetailsCardContent: {
    paddingTop: "0.2rem",
    paddingBottom: "0.2rem",
    "&:last-child": {
      paddingBottom: "0.2rem"
    }
  },
  cardContentPrice: {
    fontSize: "14px",
    color: theme.palette.primary.main,
    "@media (max-width: 320px)": {
      fontSize: "9px"
    }
  },
  cardContentOriginalPrice: {
    color: "#DDD",
    fontSize: "11px",
    textDecoration: "line-through"
  },
  cardContent: {
    flex: "1 0 auto"
  },
  cardControls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  gridContainer: {},
  gridDetailsBox: {
    width: "5rem"
  },
  gridDetailsLineItem: {
      position: "relative",
  },
  cardContentTitle: {
  },
  gridDetailsDeleteButton: {
    position: "absolute",
    top: "0.1rem",
    right: "0.1rem",
  },
  grow: {
    flexGrow: 1
  },
  iconButton: {
    fontSize: "1.5rem"
  },
  gridDetailsNumBox: {
    textAlign: "center",
  },
  gridDetailsIconButton: {
    marginTop: "0.1rem",
  },
});

export default styles;
