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
import Divider from '@material-ui/core/Divider';
import YearlyGraph from "../graphs/yearlyGraph";
import MonthlyGraph from "../graphs/monthlyGraph";
import SingleYearGraph from "../graphs/singleYearGraph";
import SingleDayGraph from "../graphs/singleDayGraph";
import YearlyByHourGraph from "../graphs/yearlyByHourGraph";

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
      return (<SingleYearGraph coord={props.coord} variable="GHI" year={props.year} />);
    case 12:
      return (<SingleDayGraph coord={props.coord} variable="GHI" year={props.year} />);
    case 13:
      return <YearlyGraph coord={props.coord} variable="GHI" />;
    case 14:
      return <MonthlyGraph coord={props.coord} variable="GHI" />;
    case 15:
      return <YearlyByHourGraph coord={props.coord} variable="GHI" />;

    case 21:
      return (<SingleYearGraph coord={props.coord} variable="DHI" year={props.year} />);
    case 22:
      return (<SingleDayGraph coord={props.coord} variable="DHI" year={props.year} />);
    case 23:
      return <YearlyGraph coord={props.coord} variable="DHI" />;
    case 24:
      return <MonthlyGraph coord={props.coord} variable="DHI" />;
    case 25:
      return <YearlyByHourGraph coord={props.coord} variable="DHI" />;

    case 31:
      return (<SingleYearGraph coord={props.coord} variable="DNI" year={props.year} />);
    case 32:
      return (<SingleDayGraph coord={props.coord} variable="DNI" year={props.year} />);
    case 33:
      return <YearlyGraph coord={props.coord} variable="DNI" />;
    case 34:
      return <MonthlyGraph coord={props.coord} variable="DNI" />;
    case 35:
      return <YearlyByHourGraph coord={props.coord} variable="DNI" />;

    case 41:
      return (<SingleYearGraph coord={props.coord} variable="Temperature" year={props.year} />);
    case 42:
      return (<SingleDayGraph coord={props.coord} variable="Temperature" year={props.year} />);
    case 43:
      return <YearlyGraph coord={props.coord} variable="Temperature" />;
    case 44:
      return <MonthlyGraph coord={props.coord} variable="Temperature" />;
    case 45:
      return <YearlyByHourGraph coord={props.coord} variable="Temperature" />;

    case 51:
      return (<SingleYearGraph coord={props.coord} variable="Wind Speed" year={props.year} />);
    case 52:
      return (<SingleDayGraph coord={props.coord} variable="Wind Speed" year={props.year} />);
    case 53:
      return <YearlyGraph coord={props.coord} variable="Wind Speed" />;
    case 54:
      return <MonthlyGraph coord={props.coord} variable="Wind Speed" />;
    case 55:
      return <YearlyByHourGraph coord={props.coord} variable="Wind Speed" />;


    
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
      <Grid container className={classes.graphMenu}>
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
              <MenuItem value={11}>Global Horizontal - Ciclo Mensual {year}</MenuItem>
              <MenuItem value={12}>Global Horizontal - Ciclo por Horas {year}</MenuItem>
              <MenuItem value={13}>Global Horizontal - Histórico Anual</MenuItem>
              <MenuItem value={14}>Global Horizontal - Histórico Mensual</MenuItem>
              <MenuItem value={15}>Global Horizontal - Histórico por Horas</MenuItem>
              <Divider/>
              <MenuItem value={21}>Difusa Horizontal - Ciclo Mensual {year}</MenuItem>
              <MenuItem value={22}>Difusa Horizontal - Ciclo por Horas {year}</MenuItem>
              <MenuItem value={23}>Difusa Horizontal - Histórico Anual</MenuItem>
              <MenuItem value={24}>Difusa Horizontal - Histórico Mensual</MenuItem>
              <MenuItem value={25}>Difusa Horizontal - Histórico por Horas</MenuItem>
              <Divider/>
              <MenuItem value={31}>Directa Normal - Ciclo Mensual {year}</MenuItem>
              <MenuItem value={32}>Directa Normal - Ciclo por Horas {year}</MenuItem>
              <MenuItem value={33}>Directa Normal - Histórico Anual</MenuItem>
              <MenuItem value={34}>Directa Normal - Histórico Mensual</MenuItem>
              <MenuItem value={35}>Directa Normal - Histórico por Horas</MenuItem>

              <ListSubheader>Temperatura</ListSubheader>
              <MenuItem value={41}>Temperatura Promedio - Ciclo Mensual {year}</MenuItem>
              <MenuItem value={42}>Temperatura Promedio - Ciclo por Horas {year}</MenuItem>
              <MenuItem value={43}>Temperatura Promedio - Histórico Anual</MenuItem>
              <MenuItem value={44}>Temperatura Promedio - Histórico Mensual</MenuItem>
              <MenuItem value={45}>Temperatura Promedio - Histórico por Horas</MenuItem>
     
              <ListSubheader>Viento</ListSubheader>
              <MenuItem value={51}>Velocidad del Viento - Ciclo Mensual {year}</MenuItem>
              <MenuItem value={52}>Velocidad del Viento - Ciclo por Horas {year}</MenuItem>
              <MenuItem value={53}>Velocidad del Viento - Histórico Anual</MenuItem>
              <MenuItem value={54}>Velocidad del Viento - Histórico Mensual</MenuItem>
              <MenuItem value={55}>Velocidad del Viento - Histórico por Horas</MenuItem>
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
