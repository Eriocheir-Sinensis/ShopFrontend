import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";


export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'版权所有 © '}
      <Link color="inherit" href="https://xie.2cn.io/">
        一品蟹煌
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
