import React from "react";
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

const Layout = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <CssBaseline />
      {props.children}
    </React.Fragment>
  );
};

export default Layout;
