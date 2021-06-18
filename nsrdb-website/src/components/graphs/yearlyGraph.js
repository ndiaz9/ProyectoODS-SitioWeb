import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress, Card } from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";
import WarningIcon from "@material-ui/icons/Warning";
import constants from "../../utils/constants";
import functions from "../../utils/functions";
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
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
  graphContainer: {
    height: "390px",
    padding: "10px",
  },
  loadingContainer: {
    paddingTop: "30px",
  },
  warningCard: {
    background: colors.warningBackground,
    padding: "15px",
    margin: "15px",
  },
  warningText: {
    fontSize: "12px",
  },
  squareHist: {
    height: "20px",
    width: "20px",
    background: colors.pointHistorical,
  },
  squarePred: {
    height: "20px",
    width: "20px",
    background: colors.pointPrediction,
  },
  labeltext: {
    fontSize: "12px",
  },
}));

const InnerContent = (props) => {
  const classes = useStyles();
  if (props.data === null) {
    return (
      <Grid container justify="center" className={classes.loadingContainer}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  } else {
    const graphData = [
      {
        id: props.variable,
        data: props.data,
      },
    ];
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              {constants.variableTitles[props.variable]} (
              {constants.variableMeasurements[props.variable]})
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Card className={classes.warningCard}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={1}>
                <WarningIcon fontSize="large" color="action" />
              </Grid>
              <Grid item xs={11}>
                <Typography align="justify" className={classes.warningText}>
                  {strings.warningText}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item>
          <div className={classes.graphContainer}>
            <ResponsiveLine
              data={graphData}
              margin={{ top: 10, right: 50, bottom: 60, left: 50 }}
              colors={{ scheme: "category10" }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: "Año",
                legendOffset: 50,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              enablePointLabel={true}
              pointSize={10}
              pointSymbol={(e) => {
                let color = colors.pointHistorical;
                if (e.datum.changecolor === 1) {
                  color = colors.pointPrediction;
                }
                return (
                  <circle
                    cx="0"
                    cy="0"
                    r="5"
                    stroke={color}
                    strokeWidth="2"
                    fill={color}
                  />
                );
              }}
              pointBorderWidth={2}
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </div>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={2}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <div className={classes.squareHist} />
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.labeltext}>
                  {strings.historicalData}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <div className={classes.squarePred} />
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.labeltext}>
                  {strings.prediction2030}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

const YearlyGraph = (props) => {
  const coord = props.coord;
  const variable = props.variable;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (coord[0] !== 0 && coord[1] !== 0) {
      const getLon = functions.round2(coord[0]);
      const getLat = functions.round2(coord[1]);
      setData(null);

      var requests = [];
      constants.years.forEach((year) => {
        const req = axios.get(
          constants.backendURL + "/api/y/" + year + "/" + getLat + "+" + getLon
        );
        requests.push(req);
      });
      requests.push(
        axios.get(constants.backendURL + "/api/y/2030/" + getLat + "+" + getLon)
      );

      axios.all(requests).then(
        axios.spread((...responses) => {
          var error = false;
          responses.forEach((response) => {
            if (response.status !== 200) {
              error = true;
            }
          });
          if (!error) {
            var newData = [];
            constants.years.forEach((year, index) => {
              newData.push({
                changecolor: 0,
                x: year,
                y: functions.round2(responses[index].data[0][variable]),
              });
            });
            newData.push({
              changecolor: 1,
              x: 2030,
              y: functions.round2(
                responses[responses.length - 1].data[0][variable]
              ),
            });
            setData(newData);
          }
        })
      );
    }
  }, [coord, variable]);

  return <InnerContent coord={coord} variable={variable} data={data} />;
};

export default YearlyGraph;
