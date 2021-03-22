import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import { ResponsiveBar } from "@nivo/bar";
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
    height: "390px",
    padding: "10px",
    paddingRight: "20px",
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
            <ResponsiveBar
              data={props.data}
              keys={["Variable"]}
              indexBy="hour"
              margin={{ top: 10, right: 10, bottom: 80, left: 50 }}
              padding={0.3}
              valueScale={{ type: "linear", round: true }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "dark2" }}
              enableLabel={true}
              isInteractive={true}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: "Hora",
                legendOffset: 50,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
};

const SingleDayGraph = (props) => {
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
        .get(
          commons.backendURL + "/api/h/" + year + "/" + getLat + "+" + getLon
        )
        .then((result) => {
          if (result.status === 200) {
            var newData = [];
            result.data[0][variable].forEach((hourData, index) => {
              newData.push({
                hour: commons.hours[index],
                Variable: commons.round2(hourData),
              });
            });
            setData(newData);
          }
        });
    }
  }, [coord, variable, year]);

  return (
    <InnerContent coord={coord} variable={variable} data={data} year={year} />
  );
};

export default SingleDayGraph;
