import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';

const Layout = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      {props.children}
    </React.Fragment>
  );
}

export default Layout;