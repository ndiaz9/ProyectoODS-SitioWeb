import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import commons from "../commons"

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    padding: "5px",
    background: "#69B470",
    marginBottom: "5px",
  },
  titleText: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  coordTitle: {
    fontSize: "13px",
  },
  coordContent: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#004346",
  },
  container: {
    background: "#F1F1E6",
    minWidth: "250px",
    position: "absolute",
    top: "20px",
    right: "20px",
    zIndex: "1",
    paddingBottom: "5px",
  },
  menuitem: {
    textTransform: "capitalize",
  },
}));

const InfoCard = (props) => {
  const classes = useStyles();
  const selectedCoord = props.coord;
  const year = props.year;
  const variable = props.variable;

  const [anchorElYear, setAnchorElYear] = useState(null);
  const [anchorElVariable, setAnchorElVariable] = useState(null);

  const handleYear = (year) => {
    props.onYearChange(year);
    setAnchorElYear(null);
  };

  const handleYearClick = (event) => {
    setAnchorElYear(event.currentTarget);
  };

  const handleVariable = (variable) => {
    props.onVariableChange(variable);
    setAnchorElVariable(null);
  };

  const handleVariableClick = (event) => {
    setAnchorElVariable(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElVariable(null);
    setAnchorElYear(null);
  };

  return (
    <Card className={classes.container}>
      <Grid container className={classes.titleContainer}>
        <Typography className={classes.titleText}>MAPA ACTUAL</Typography>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Button
            aria-controls="year-menu"
            aria-haspopup="true"
            onClick={handleYearClick}
          >
            {year}
          </Button>
          <Menu
            id="year-menu"
            keepMounted
            open={Boolean(anchorElYear)}
            onClose={handleClose}
            anchorEl={anchorElYear}
          >
            {commons.years.map((year) => (
              <MenuItem
                className={classes.menuitem}
                key={year}
                onClick={() => handleYear(year)}
              >
                {year}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        <Grid item>
          <Button
            aria-controls="variables-menu"
            aria-haspopup="true"
            onClick={handleVariableClick}
          >
            {variable}
          </Button>
          <Menu
            id="variables-menu"
            keepMounted
            open={Boolean(anchorElVariable)}
            onClose={handleClose}
            anchorEl={anchorElVariable}
          >
            {commons.variables.map((variable) => (
              <MenuItem
                className={classes.menuitem}
                key={variable}
                onClick={() => handleVariable(variable)}
              >
                {variable}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      <Grid container className={classes.titleContainer}>
        <Typography className={classes.titleText}>
          SITIO SELECCIONADO
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Typography align="center" className={classes.coordTitle}>
            LATITUD
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" className={classes.coordTitle}>
            LONGITUD
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Typography align="center" className={classes.coordContent}>
            {selectedCoord[0] === 0 ? "--" : commons.round2(selectedCoord[1])}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" className={classes.coordContent}>
            {selectedCoord[1] === 0 ? "--" : commons.round2(selectedCoord[0])}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InfoCard;
