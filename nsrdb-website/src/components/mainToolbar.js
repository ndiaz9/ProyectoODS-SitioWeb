import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import uniandesLogo from "../assets/images/logouniandes_0.png";
import strings from "../strings/es.json";
import colors from "../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: colors.mainTheme,
    opacity: "0.9",
  },
  menuButton: {
    marginRight: "20px",
  },
  link: {
    color: colors.textBright,
    textDecoration: "none",
  },
  mainLogo: {
    height: "6vh",
    padding: "1vh",
    marginRight: "50px",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MainToolbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar variant="dense">
          <img
            src={uniandesLogo}
            alt="Uniandes Logo"
            className={classes.mainLogo}
          ></img>
          <Button color="inherit" className={classes.menuButton}>
            <Link className={classes.link} to="/">
              {strings.solarExplorer}
            </Link>
          </Button>
          <Button color="inherit" className={classes.menuButton}>
            <Link className={classes.link} to="/docs">
              {strings.documentation}
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
