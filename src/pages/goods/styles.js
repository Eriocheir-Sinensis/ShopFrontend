
const styles = theme => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: 0,
    paddingRight: 0,
  },
  card: {
    borderRadius: 0,
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
});

export default styles;
