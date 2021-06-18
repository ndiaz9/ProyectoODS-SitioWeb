import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import GenerationGraph from "../graphs/generationGraph";
import VariableCard from "../variableCard";
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
    padding: "20px",
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
  variablesContainer: {
    padding: "10px",
    width: "100%",
  },
}));

const GenerationResult = (props) => {
  const classes = useStyles();
  if (props.data === null) {
    return null;
  } else {
    var dates = [];
    props.data.forEach((day) => {
      var dateData = {
        date: functions.dayToDate(props.year, day.x),
        y: day.y,
      };
      dates.push(dateData);
    });
    var groups = dates.reduce((previous, current) => {
      var month = current.date.getMonth();
      var monthKey = constants.months[month];
      previous[monthKey]
        ? previous[monthKey].data.push(current)
        : (previous[monthKey] = { data: [current] });
      return previous;
    }, {});
    var means = [];
    constants.months.forEach((month) => {
      var monthData = groups[month];
      var length = monthData.data.length;
      var sum = monthData.data.reduce((a, b) => a + b.y, 0);
      means.push({
        month: month,
        Potencia: functions.round2(sum / length) || 0,
      });
    });
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>{props.title}</Typography>
          </Grid>
        </Grid>
        {props.isPredict ? (
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
        ) : null}
        <Grid item>
          <Grid
            container
            spacing={1}
            justify="center"
            className={classes.variablesContainer}
          >
            <Grid item xs={4}>
              <VariableCard
                selected={false}
                title={strings.minimum}
                value={functions.round2(props.min) + " " + strings.kwPerDay}
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                selected={false}
                title={strings.maximum}
                value={functions.round2(props.max) + " " + strings.kwPerDay}
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                selected={false}
                title={strings.capacityFactor}
                value={
                  isFinite(props.CF)
                    ? functions.round2(props.CF * 100) + "%"
                    : "--"
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <GenerationGraph graphData={means} colors={props.colors} />
        </Grid>
      </Grid>
    );
  }
};

export default GenerationResult;
