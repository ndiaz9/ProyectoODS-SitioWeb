import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Card } from "@material-ui/core";
import colors from "../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
  variableCard: {
    background: colors.cardBackground,
    padding: "5px",
    minHeight: "90%",
  },
  variableCardSelected: {
    background: colors.cardBackgroundSelected,
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
}));

const VariableCard = (props) => {
  const classes = useStyles();

  return (
    <Card
      className={
        props.selected ? classes.variableCardSelected : classes.variableCard
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

export default VariableCard;
