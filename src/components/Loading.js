import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, CircularProgress} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(8),
    left: 0,
    right: 0,
    margin: "auto",
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CircularProgress className={classes.progress} />
    </Container>
  );
}
