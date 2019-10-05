import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import SvgIcon from "@material-ui/core/SvgIcon";

const useStyles = makeStyles(theme => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2)
    }
  },
  iconHover: {
    "&:hover": {
      color: red[800]
    }
  },
  line: {
    fill: "none",
    stroke: "#303c42",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }
}));

export default function WeChatIcon() {
  const classes = useStyles();
  return (
    <SvgIcon >
      <circle
        cx="6"
        cy="7"
        data-name="&lt;Path&gt;"
        id="_Path_"
        r="0.5"
        className={classes.line}
      />
      <circle
        cx="11"
        cy="7"
        data-name="&lt;Path&gt;"
        id="_Path_2"
        r="0.5"
        className={classes.line}
      />
      <path
        d="M23.5,15c0-3-3.13-5.5-7-5.5S9.5,12,9.5,15s3.13,5.5,7,5.5a8.69,8.69,0,0,0,2.35-.32L21.5,21.5l-.83-2.09A5.22,5.22,0,0,0,23.5,15Z"
        data-name="&lt;Path&gt;"
        id="_Path_3"
        className={classes.line}
      />
      <circle
        cx="14"
        cy="13"
        data-name="&lt;Path&gt;"
        id="_Path_4"
        r="0.5"
        className={classes.line}
      />
      <circle
        cx="19"
        cy="13"
        data-name="&lt;Path&gt;"
        id="_Path_5"
        r="0.5"
        className={classes.line}
      />
      <path
        d="M17,9.52v0c0-3.87-3.69-7-8.25-7S.5,5.63.5,9.5A6.68,6.68,0,0,0,3.73,15L2.5,17.5l2.85-1.63a9.46,9.46,0,0,0,3.4.63,9.75,9.75,0,0,0,1-.06"
        data-name="&lt;Path&gt;"
        id="_Path_6"
        className={classes.line}
      />
    </SvgIcon>
  );
}
