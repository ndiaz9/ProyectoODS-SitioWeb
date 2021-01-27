import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Card } from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import { ResponsiveBar } from "@nivo/bar";
import commons from "../../commons";

const useStyles = makeStyles((theme) => ({
  errorContainer: {
    padding: "25px",
  },
  errorIcon: {
    width: "120px",
    height: "120px",
    color: "#69B470",
  },
  alertText: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#69B470",
  },
  titleContainer: {
    padding: "5px",
    background: "#69B470",
    marginBottom: "5px",
    width: "100%",
  },
  titleText: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  variablesContainer: {
    padding: "10px",
    width: "100%",
  },
  variableCard: {
    background: "#D9E5E1",
    padding: "5px",
    minHeight: "90%",
  },
  variableCardSelected: {
    background: "#ABD86F",
    padding: "5px",
    minHeight: "90%",
  },
  variableCardTitle: {
    fontSize: "13px",
    textTransform: "uppercase",
  },
  variableCardValue: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  graphContainer: {
    height: "290px",
    padding: "20px",
  },
}));

const VariableCard = (props) => {
  const classes = useStyles();
  return (
    <Card
      className={
        props.name === props.selected
          ? classes.variableCardSelected
          : classes.variableCard
      }
    >
      <Grid container direction="column" justify="center">
        <Grid item>
          <Typography align="center" className={classes.variableCardTitle}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" className={classes.variableCardValue}>
            {props.value}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

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
            Haga click sobre un punto del mapa para obtener información.
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    var graphData = [];
    props.monthlyData.map((data) =>
      graphData.push({
        month: commons.months[data.month - 1],
        DHI: commons.round2(data.DHI),
        DNI: commons.round2(data.DNI),
      })
    );
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
                name="latitude"
                selected={props.variable}
                title="Latitud"
                value={commons.round2(props.yearlyData[0].latitude) + "°"}
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                name="longitude"
                selected={props.variable}
                title="Longitud"
                value={commons.round2(props.yearlyData[0].longitude) + "°"}
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                name="elevation"
                selected={props.variable}
                title="Elevación"
                value={commons.round2(props.yearlyData[0].elevation) + " msnm"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              Radiación Anual Promedio - {props.year}
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
                name="GHI"
                selected={props.variable}
                title="Global Horizontal"
                value={commons.round2(props.yearlyData[0].GHI) + " w/m2"}
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                name="DHI"
                selected={props.variable}
                title="Difusa Horizontal"
                value={commons.round2(props.yearlyData[0].DHI) + " w/m2"}
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                name="DNI"
                selected={props.variable}
                title="Directa Normal"
                value={commons.round2(props.yearlyData[0].DNI) + " w/m2"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              Información Meteorológica Promedio
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
                name="Wind Speed"
                selected={props.variable}
                title="Velocidad del viento"
                value={
                  commons.round2(props.yearlyData[0]["Wind Speed"]) + "m/s"
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                name="Solar Zenith Angle"
                selected={props.variable}
                title="Elevación solar"
                value={
                  commons.round2(props.yearlyData[0]["Solar Zenith Angle"]) +
                  "°"
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                name="Temperature"
                selected={props.variable}
                title="Temperatura Promedio"
                value={commons.round2(props.yearlyData[0].Temperature) + "°C"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              Radiación Global Horizontal
            </Typography>
          </Grid>
          <div className={classes.graphContainer}>
            <ResponsiveBar
              data={graphData}
              keys={["DHI", "DNI"]}
              indexBy="month"
              margin={{ top: 10, right: 10, bottom: 80, left: 50 }}
              padding={0.3}
              valueScale={{ type: "linear", round: true }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "paired" }}
              enableLabel={false}
              axisTop={null}
              axisRight={null}
              axisBottom={commons.months}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Radiación (w/m2)",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 60,
                  itemsSpacing: 1,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </div>
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

  useEffect(() => {
    if (coord[0] !== 0 && coord[1] !== 0) {
      const getLon = commons.round2(coord[0]);
      const getLat = commons.round2(coord[1]);
      axios
        .get(commons.backendURL + "/m/" + year + "/" + getLat + "_" + getLon)
        .then((result) => {
          setmonthlyData(result.data);
        });
      axios
        .get(commons.backendURL + "/y/" + year + "/" + getLat + "_" + getLon)
        .then((result) => {
          setyearlyData(result.data);
        });
    }
  }, [year, coord]);

  return (
    <InnerContent
      year={year}
      coord={coord}
      variable={variable}
      yearlyData={yearlyData}
      monthlyData={monthlyData}
    />
  );
};

export default SideSummary;
