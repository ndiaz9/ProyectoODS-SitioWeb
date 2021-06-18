import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import VariableCard from "../variableCard";
import SummaryGraph from "../graphs/summaryGraph";
import constants from "../../utils/constants";
import functions from "../../utils/functions";
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
  errorContainer: {
    padding: "25px",
  },
  errorIcon: {
    width: "120px",
    height: "120px",
    color: colors.mainTheme,
  },
  alertText: {
    fontWeight: "bold",
    fontSize: "20px",
    color: colors.mainTheme,
  },
  titleContainer: {
    padding: "5px",
    background: colors.mainTheme,
    marginBottom: "5px",
    width: "100%",
  },
  titleText: {
    fontSize: "15px",
    fontWeight: "bold",
    color: colors.textBright,
  },
  variablesContainer: {
    padding: "10px",
    width: "100%",
  },
}));

const InnerContent = (props) => {
  const classes = useStyles();
  if (props.monthlyData === null || props.yearlyData === null) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.errorContainer}
      >
        <Grid item>
          <NotListedLocationIcon className={classes.errorIcon} />
        </Grid>
        <Grid item>
          <Typography className={classes.alertText} align="center">
            {strings.clickGetInformation}
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    var graphData = [];
    for (var i = 0; i < 12; i++) {
      graphData.push({
        month: constants.months[i],
        DHI: functions.round2(props.monthlyData.DHI[i]),
        DNI: functions.round2(props.monthlyData.DNI[i]),
      });
    }
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid
            container
            spacing={1}
            justify="center"
            className={classes.variablesContainer}
          >
            <Grid item xs={4}>
              <VariableCard
                selected={"latitude" === props.variable}
                title={strings.latitude}
                value={
                  functions.round2(props.yearlyData.latitude) +
                  constants.variableMeasurements.latitude
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                selected={"longitude" === props.variable}
                title={strings.longitude}
                value={
                  functions.round2(props.yearlyData.longitude) +
                  constants.variableMeasurements.longitude
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                selected={constants.variables[6] === props.variable}
                title={strings.elevation}
                value={
                  functions.round2(props.elevation.elevation) +
                  constants.variableMeasurements.elevation
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              {strings.yearlyAverageRadiation} - {props.year}
            </Typography>
          </Grid>
          <Grid
            container
            spacing={1}
            justify="center"
            className={classes.variablesContainer}
          >
            <Grid item xs={4}>
              <VariableCard
                selected={constants.variables[0] === props.variable}
                title={strings.globalHorizontal}
                value={
                  functions.round2(props.yearlyData.GHI) +
                  " " +
                  constants.variableMeasurements.GHI
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                selected={constants.variables[1] === props.variable}
                title={strings.diffuseHorizontal}
                value={
                  functions.round2(props.yearlyData.DHI) +
                  " " +
                  constants.variableMeasurements.DHI
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                selected={constants.variables[2] === props.variable}
                title={strings.directNormal}
                value={
                  functions.round2(props.yearlyData.DNI) +
                  " " +
                  constants.variableMeasurements.DNI
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              {strings.averageMeteorologicalData}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={1}
            justify="center"
            className={classes.variablesContainer}
          >
            <Grid item xs={4}>
              <VariableCard
                selected={constants.variables[3] === props.variable}
                title={strings.windSpeed}
                value={
                  functions.round2(props.yearlyData["Wind Speed"]) +
                  " " +
                  constants.variableMeasurements["Wind Speed"]
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                selected={constants.variables[4] === props.variable}
                title={strings.solarZenithAngle}
                value={
                  functions.round2(props.yearlyData["Solar Zenith Angle"]) +
                  constants.variableMeasurements["Solar Zenith Angle"]
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                selected={constants.variables[5] === props.variable}
                title={strings.averageTemperature}
                value={
                  functions.round2(props.yearlyData.Temperature) +
                  constants.variableMeasurements.Temperature
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <SummaryGraph graphData={graphData} />
        </Grid>
      </Grid>
    );
  }
};

const SideSummary = (props) => {
  const year = props.year;
  const coord = props.coord;
  const variable = props.variable;

  const [yearlyData, setyearlyData] = useState(null);
  const [monthlyData, setmonthlyData] = useState(null);
  const [elevation, setElevation] = useState(0);

  useEffect(() => {
    if (coord[0] !== 0 && coord[1] !== 0) {
      const getLon = functions.round2(coord[0]);
      const getLat = functions.round2(coord[1]);

      var requests = [
        axios.get(
          constants.backendURL + "/api/m/" + year + "/" + getLat + "+" + getLon
        ),
        axios.get(
          constants.backendURL + "/api/y/" + year + "/" + getLat + "+" + getLon
        ),
        axios.get(constants.backendURL + "/api/c/" + getLat + "+" + getLon),
      ];

      axios.all(requests).then(
        axios.spread((...responses) => {
          if (
            responses[0].status === 200 &&
            responses[1].status === 200 &&
            responses[2].status === 200
          ) {
            setmonthlyData(responses[0].data[0]);
            setyearlyData(responses[1].data[0]);
            setElevation(responses[2].data[0]);
          }
        })
      );
    }
  }, [year, coord]);

  return (
    <InnerContent
      year={year}
      coord={coord}
      variable={variable}
      yearlyData={yearlyData}
      monthlyData={monthlyData}
      elevation={elevation}
    />
  );
};

export default SideSummary;
