import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import { ResponsiveBar } from "@nivo/bar";
import constants from "../../utils/constants";
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
    height: "290px",
    padding: "20px",
  },
  loadingContainer: {
    paddingTop: "30px",
  },
}));

const SummaryGraph = (props) => {
  const classes = useStyles();
  if (props.graphdata === null) {
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
            <Typography className={classes.titleText}>{strings.GHI}</Typography>
          </Grid>
          <div className={classes.graphContainer}>
            <ResponsiveBar
              data={props.graphData}
              keys={["DHI", "DNI"]}
              indexBy="month"
              margin={{ top: 10, right: 10, bottom: 80, left: 50 }}
              padding={0.3}
              valueScale={{ type: "linear", round: true }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "paired" }}
              enableLabel={true}
              isInteractive={true}
              axisTop={null}
              axisRight={null}
              axisBottom={constants.months}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: strings.radiationWithUnits,
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
                  translateY: 50,
                  itemsSpacing: 50,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                },
              ]}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
};

export default SummaryGraph;
