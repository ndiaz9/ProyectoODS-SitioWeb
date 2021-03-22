import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Tooltip, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TimelineIcon from "@material-ui/icons/Timeline";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import commons from "../commons";

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
    width: "250px",
    position: "absolute",
    marginTop: "11vh",
    right: "20px",
    zIndex: "1",
    paddingBottom: "5px",
  },
  menuitem: {
    textTransform: "capitalize",
  },
  searchContainer: {
    padding: "10px",
    paddingTop: "5px",
  },
  searchBar: {
    width: "100%",
  },
  searchButton: {
    background: "#318F6C",
    color: "#FFFFFF",
  },
}));

const verifyLat = (latitude) => {
  var error = false;
  if (latitude < -90 || latitude > 90) {
    error = true;
  }
  return error;
};

const verifyLon = (longitude) => {
  var error = false;
  if (longitude < -180 || longitude > 180) {
    error = true;
  }
  return error;
};

const disableButton = (lon, lat) => {
  var disable = false;
  if (
    verifyLat(lat) ||
    verifyLon(lon) ||
    lat === 0 ||
    lon === 0 ||
    lat === null ||
    lon === null
  ) {
    disable = true;
  }
  return disable;
};

const InfoCard = (props) => {
  const classes = useStyles();
  const selectedCoord = props.coord;
  const year = props.year;
  const variable = props.variable;
  const reloadMap = props.reloadMap;

  const [anchorElYear, setAnchorElYear] = useState(null);
  const [anchorElVariable, setAnchorElVariable] = useState(null);
  const [showSearchMenu, setSearchMenu] = useState(false);
  const [searchCoords, setSearchCoords] = useState({ lat: 0, lon: 0 });
  const [openError, setOpenError] = useState(false);

  const handleCloseError = () => {
    setOpenError(false);
  };

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

  const handleContentClick = (content) => {
    props.onContentChange(content);
  };

  const handleSearchCoordsChange = (prop) => (event) => {
    setSearchCoords({
      ...searchCoords,
      [prop]: parseFloat(event.target.value),
    });
  };

  const handleSearchButtonClick = () => {
    if (searchCoords.lat !== 0 && searchCoords.lon !== 0) {
      axios
        .get(
          commons.backendURL +
            "/api/c/near/" +
            searchCoords.lat +
            "+" +
            searchCoords.lon
        )
        .then(
          (result) => {
            props.onCoordChange(result.data[0].location.coordinates);
            props.onReloadMap(!reloadMap);
          },
          () => setOpenError(true)
        );
    }
  };

  return (
    <Card className={classes.container}>
      <Grid container className={classes.titleContainer}>
        <Typography className={classes.titleText}>RECURSOS</Typography>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Tooltip title="Datos Meteorológicos">
            <IconButton
              aria-label="delete"
              onClick={() => handleContentClick(0)}
            >
              <TimelineIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Generación Eléctrica Fotovoltaica">
            <IconButton
              aria-label="delete"
              onClick={() => handleContentClick(1)}
            >
              <WbIncandescentIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Buscar Coordenadas">
            <IconButton
              aria-label="delete"
              onClick={() => setSearchMenu(!showSearchMenu)}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
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
            {commons.variables.map((variable) => {
              if (variable !== "elevation") {
                return (
                  <MenuItem
                    className={classes.menuitem}
                    key={variable}
                    onClick={() => handleVariable(variable)}
                  >
                    {variable}
                  </MenuItem>
                );
              } else {
                return null;
              }
            })}
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
      {showSearchMenu ? (
        <div>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>BUSCAR</Typography>
          </Grid>
          <Grid
            container
            alignItems="center"
            spacing={1}
            className={classes.searchContainer}
          >
            <Grid item xs={6} align="center">
              <TextField
                id="latSearch"
                type="number"
                variant="outlined"
                size="small"
                label="Latitud"
                error={verifyLat(searchCoords.lat)}
                className={classes.searchBar}
                onChange={handleSearchCoordsChange("lat")}
              />
            </Grid>
            <Grid item xs={6} align="center">
              <TextField
                id="lonSearch"
                type="number"
                variant="outlined"
                size="small"
                label="Longitud"
                error={verifyLon(searchCoords.lon)}
                className={classes.searchBar}
                onChange={handleSearchCoordsChange("lon")}
              />
            </Grid>
            <Grid container justify="center">
              <Button
                variant="contained"
                className={classes.searchButton}
                onClick={handleSearchButtonClick}
                disabled={disableButton(searchCoords.lon, searchCoords.lat)}
              >
                Buscar
              </Button>
              <Dialog
                open={openError}
                onClose={handleCloseError}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Error</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    No se ha encontrado un punto a 5km alrededor de las
                    coordenadas ingresadas. Por favor, ingrese otras
                    coordenadas.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseError} color="primary" autoFocus>
                    Cerrar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </Card>
  );
};

export default InfoCard;
