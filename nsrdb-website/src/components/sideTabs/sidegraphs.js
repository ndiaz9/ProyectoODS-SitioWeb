import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";
import YearlyGraph from "../graphs/yearlyGraph";
import MonthlyGraph from "../graphs/monthlyGraph";
import SingleYearGraph from "../graphs/singleYearGraph";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  graphMenu: {
    padding: "5px",
    paddingTop: "15px",
  },
  errorContainer: {
    padding: "25px",
  },
  alertText: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#69B470",
  },
}));

const Graphs = (props) => {
  const classes = useStyles();
  switch (props.graphID) {
    case 11:
      return (
        <SingleYearGraph coord={props.coord} variable="GHI" year={props.year} />
      );
    case 12:
      return <YearlyGraph coord={props.coord} variable="GHI" />;
    case 13:
      return <MonthlyGraph coord={props.coord} variable="GHI" />;
    case 21:
      return (
        <SingleYearGraph coord={props.coord} variable="DHI" year={props.year} />
      );
    case 22:
      return <YearlyGraph coord={props.coord} variable="DHI" />;
    case 23:
      return <MonthlyGraph coord={props.coord} variable="DHI" />;
    case 31:
      return (
        <SingleYearGraph coord={props.coord} variable="DNI" year={props.year} />
      );
    case 32:
      return <YearlyGraph coord={props.coord} variable="DNI" />;
    case 33:
      return <MonthlyGraph coord={props.coord} variable="DNI" />;
    case 41:
      return (
        <SingleYearGraph
          coord={props.coord}
          variable="Temperature"
          year={props.year}
        />
      );
    case 42:
      return <YearlyGraph coord={props.coord} variable="Temperature" />;
    case 43:
      return <MonthlyGraph coord={props.coord} variable="Temperature" />;
    case 51:
      return (
        <SingleYearGraph
          coord={props.coord}
          variable="Wind Speed"
          year={props.year}
        />
      );
    case 52:
      return <YearlyGraph coord={props.coord} variable="Wind Speed" />;
    case 53:
      return <MonthlyGraph coord={props.coord} variable="Wind Speed" />;
    default:
      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.errorContainer}
        >
          <Typography className={classes.alertText} align="center">
            Seleccione un punto en el mapa y un gráfico.
          </Typography>
        </Grid>
      );
  }
};

const SideGraphs = (props) => {
  const classes = useStyles();
  const coord = props.coord;
  const year = props.year;

  const [graphID, setGraphID] = useState("");
  const handleGraphChange = (event) => {
    setGraphID(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={2} className={classes.graphMenu}>
        <Grid item>
          <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel htmlFor="grouped-select">Gráfico</InputLabel>
            <Select
              id="grouped-select"
              value={graphID}
              onChange={handleGraphChange}
              disabled={coord[0] === 0 && coord[1] === 0}
            >
              <ListSubheader>Radiación</ListSubheader>
              <MenuItem value={11}>Global Horizontal - {year}</MenuItem>
              <MenuItem value={12}>Global Horizontal - Anual</MenuItem>
              <MenuItem value={13}>Global Horizontal - Mensual</MenuItem>
              <MenuItem value={21}>Difusa Horizontal - {year}</MenuItem>
              <MenuItem value={22}>Difusa Horizontal - Anual</MenuItem>
              <MenuItem value={23}>Difusa Horizontal - Mensual</MenuItem>
              <MenuItem value={31}>Directa Normal - {year}</MenuItem>
              <MenuItem value={32}>Directa Normal - Anual</MenuItem>
              <MenuItem value={33}>Directa Normal - Mensual</MenuItem>
              <ListSubheader>Temperatura</ListSubheader>
              <MenuItem value={41}>Temperatura Promedio - {year}</MenuItem>
              <MenuItem value={42}>Temperatura Promedio - Anual</MenuItem>
              <MenuItem value={43}>Temperatura Promedio - Mensual</MenuItem>
              <ListSubheader>Viento</ListSubheader>
              <MenuItem value={51}>Velocidad de Viento - {year}</MenuItem>
              <MenuItem value={52}>Velocidad de Viento - Anual</MenuItem>
              <MenuItem value={53}>Velocidad de Viento - Mensual</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Graphs graphID={graphID} coord={coord} year={year} />
      </Grid>
    </div>
  );
};

export default SideGraphs;
