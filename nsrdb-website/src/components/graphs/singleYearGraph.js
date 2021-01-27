import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";
import commons from "../../commons";

const useStyles = makeStyles((theme) => ({
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
  graphContainer: {
    height: "290px",
    padding: "10px",
  },
  loadingContainer: {
    paddingTop: "30px",
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
              {commons.variableTitles[props.variable]} - {props.year} (
              {commons.variableMeasurements[props.variable]})
            </Typography>
          </Grid>
          <div className={classes.graphContainer}>
            <ResponsiveLine
              data={graphData}
              margin={{ top: 10, right: 10, bottom: 80, left: 50 }}
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
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
};

const SingleYearGraph = (props) => {
  const coord = props.coord;
  const variable = props.variable;
  const year = props.year;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (coord[0] !== 0 && coord[1] !== 0) {
      const getLon = commons.round2(coord[0]);
      const getLat = commons.round2(coord[1]);
      setData(null);

      axios
        .get(commons.backendURL + "/m/" + year + "/" + getLat + "_" + getLon)
        .then((result) => {
          var newData = [];
          result.data.forEach((monthData) => {
            newData.push({
              x: commons.months[monthData.month - 1],
              y: commons.round2(monthData[variable]),
            });
          });
          setData(newData);
        });
    }
  }, [coord, variable, year]);

  return (
    <InnerContent coord={coord} variable={variable} data={data} year={year} />
  );
};

export default SingleYearGraph;
