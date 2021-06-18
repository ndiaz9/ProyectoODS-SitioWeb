import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GenerationDetailGraph from "../graphs/generationDetailGraph";
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  submitButton: {
    background: colors.buttonBackground,
    color: colors.buttonText,
  },
}));

const GenerationPopup = (props) => {
  const classes = useStyles();
  if (props.data === null) {
    return null;
  } else {
    const graphData = [
      {
        id: props.title,
        data: props.data,
      },
    ];
    return (
      <div>
        <Grid container>
          <Grid item xs={12} className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={props.handleClickOpenDailyGraph}
            >
              {strings.detailedGraph}
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={props.openDailyGraph}
          onClose={props.handleCloseDailyGraph}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="xl"
        >
          <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
          <DialogContent>
            <GenerationDetailGraph graphData={graphData} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={props.handleCloseDailyGraph}
              color="primary"
              autoFocus
            >
              {strings.close}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default GenerationPopup;
