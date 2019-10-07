const styles = theme => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  card: {},
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  gridOrderCardContent: {
    position: "relative",
  },
  gridOrderEdit: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "0.2rem",
    right: "0.2rem",
  },
  gridOrderEditIcon: {
    fontSize: "0.8rem",
  },
  gridConfirm: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  confirmButton: {

  },
  grow: {
    flexGrow: 1
  },
});

export default styles;
