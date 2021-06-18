import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
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
    height: "390px",
    padding: "20px",
  },
  loadingContainer: {
    paddingTop: "30px",
  },
}));

const GenerationGraph = (props) => {
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
      <div className={classes.graphContainer}>
        <ResponsiveBar
          data={props.graphData}
          keys={["Potencia"]}
          indexBy="month"
          margin={{ top: 10, right: 10, bottom: 20, left: 50 }}
          padding={0.3}
          valueScale={{ type: "linear", round: true }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: props.colors }}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisBottom={constants.months}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: strings.powerWithUnits,
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
        />
      </div>
    );
  }
};

export default GenerationGraph;
