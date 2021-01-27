import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import { ResponsiveHeatMap } from "@nivo/heatmap";
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
    height: "500px",
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
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              {commons.variableTitles[props.variable]} (
              {commons.variableMeasurements[props.variable]})
            </Typography>
          </Grid>
          <div className={classes.graphContainer}>
            <ResponsiveHeatMap
              data={props.data}
              keys={commons.months}
              indexBy="year"
              margin={{ top: 0, right: 5, bottom: 40, left: 40 }}
              forceSquare={false}
              colors="GnBu"
              axisBottom={{
                orient: "top",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: "",
                legendOffset: 36,
              }}
              axisRight={null}
              axisTop={null}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              cellOpacity={1}
              cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
              defs={[
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(0, 0, 0, 0.1)",
                  rotation: -45,
                  lineWidth: 4,
                  spacing: 7,
                },
              ]}
              fill={[{ id: "lines" }]}
              animate={true}
              motionConfig="wobbly"
              motionStiffness={80}
              motionDamping={9}
              hoverTarget="cell"
              cellHoverOthersOpacity={0.25}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
};

const MonthlyGraph = (props) => {
  const coord = props.coord;
  const variable = props.variable;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (coord[0] !== 0 && coord[1] !== 0) {
      const getLon = commons.round2(coord[0]);
      const getLat = commons.round2(coord[1]);
      setData(null);

      var requests = [];
      commons.years.forEach((year) => {
        const req = axios.get(
          commons.backendURL + "/m/" + year + "/" + getLat + "_" + getLon
        );
        requests.push(req);
      });

      axios.all(requests).then(
        axios.spread((...responses) => {
          var newData = [];
          commons.years.forEach((year, index) => {
            var yearData = {
              year: year,
            };
            responses[index].data.forEach((monthData) => {
              yearData[commons.months[monthData.month - 1]] = commons.round2(
                monthData[variable]
              );
            });
            newData.push(yearData);
          });
          setData(newData);
        })
      );
    }
  }, [coord, variable]);

  return <InnerContent coord={coord} variable={variable} data={data} />;
};

export default MonthlyGraph;
