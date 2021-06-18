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
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";

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
    color: colors.mainTheme,
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
            {strings.selectAPointAndGraph}
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
            <InputLabel htmlFor="grouped-select">{strings.graph}</InputLabel>
            <Select
              id="grouped-select"
              value={graphID}
              onChange={handleGraphChange}
              disabled={coord[0] === 0 && coord[1] === 0}
            >
              <ListSubheader>{strings.radiation}</ListSubheader>
              <MenuItem value={11}>{strings.globalHorizontal} - {strings.monthlyCycle} {year}</MenuItem>
              <MenuItem value={12}>{strings.globalHorizontal} - {strings.hourlyCycle} {year}</MenuItem>
              <MenuItem value={13}>{strings.globalHorizontal} - {strings.yearlyHistorical}</MenuItem>
              <MenuItem value={14}>{strings.globalHorizontal} - {strings.monthlyHistorical}</MenuItem>
              <MenuItem value={15}>{strings.globalHorizontal} - {strings.hourlyHistorical}</MenuItem>
              <Divider/>
              <MenuItem value={21}>{strings.diffuseHorizontal} - {strings.monthlyCycle} {year}</MenuItem>
              <MenuItem value={22}>{strings.diffuseHorizontal} - {strings.hourlyCycle} {year}</MenuItem>
              <MenuItem value={23}>{strings.diffuseHorizontal} - {strings.yearlyHistorical}</MenuItem>
              <MenuItem value={24}>{strings.diffuseHorizontal} - {strings.monthlyHistorical}</MenuItem>
              <MenuItem value={25}>{strings.diffuseHorizontal} - {strings.hourlyHistorical}</MenuItem>
              <Divider/>
              <MenuItem value={31}>{strings.directNormal} - {strings.monthlyCycle} {year}</MenuItem>
              <MenuItem value={32}>{strings.directNormal} - {strings.hourlyCycle} {year}</MenuItem>
              <MenuItem value={33}>{strings.directNormal} - {strings.yearlyHistorical}</MenuItem>
              <MenuItem value={34}>{strings.directNormal} - {strings.monthlyHistorical}</MenuItem>
              <MenuItem value={35}>{strings.directNormal} - {strings.hourlyHistorical}</MenuItem>

              <ListSubheader>{strings.temperature}</ListSubheader>
              <MenuItem value={41}>{strings.averageTemperature} - {strings.monthlyCycle} {year}</MenuItem>
              <MenuItem value={42}>{strings.averageTemperature} - {strings.hourlyCycle} {year}</MenuItem>
              <MenuItem value={43}>{strings.averageTemperature} - {strings.yearlyHistorical}</MenuItem>
              <MenuItem value={44}>{strings.averageTemperature} - {strings.monthlyHistorical}</MenuItem>
              <MenuItem value={45}>{strings.averageTemperature} - {strings.hourlyHistorical}</MenuItem>
     
              <ListSubheader>{strings.wind}</ListSubheader>
              <MenuItem value={51}>{strings.windSpeed} - {strings.monthlyCycle} {year}</MenuItem>
              <MenuItem value={52}>{strings.windSpeed} - {strings.hourlyCycle} {year}</MenuItem>
              <MenuItem value={53}>{strings.windSpeed} - {strings.yearlyHistorical}</MenuItem>
              <MenuItem value={54}>{strings.windSpeed} - {strings.monthlyHistorical}</MenuItem>
              <MenuItem value={55}>{strings.windSpeed} - {strings.hourlyHistorical}</MenuItem>
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
