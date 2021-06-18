import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";
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
  formContainer: {
    padding: "15px",
  },
  fieldContainer: {
    paddingBottom: "5px",
  },
  formtext: {
    fontSize: "15px",
  },
  buttonContainer: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  submitButton: {
    background: colors.buttonBackground,
    color: colors.buttonText,
  },
}));

const AdvancedForm = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Grid item>
        <Grid container className={classes.titleContainer}>
          <Typography className={classes.titleText}>
            {strings.setupCharacteristics} - {strings.advancedModel}
          </Typography>
        </Grid>
        <Grid
          container
          className={classes.formContainer}
          alignItems="center"
          spacing={1}
        >
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.fieldContainer}
          >
            <Grid item xs={6}>
              <Typography className={classes.formtext}>
                {strings.setupType}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="panelSetup"
                select
                value={props.setup}
                onChange={props.handleSetupChange}
                variant="outlined"
                size="small"
                fullWidth
              >
                {constants.setups.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {constants.advancedModelVariables.map((advar) => (
            <Grid
              container
              spacing={1}
              alignItems="center"
              className={classes.fieldContainer}
              key={"grid" + advar.value}
            >
              <Grid item xs={6}>
                <Typography className={classes.formtext}>
                  {advar.label}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id={advar.value}
                  key={advar.value}
                  type="number"
                  variant="outlined"
                  size="small"
                  defaultValue={advar.defaultValue}
                  onChange={props.handleAdvancedFormDataChange(advar.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={props.handleButtonClick}
            >
              {strings.estimateGeneration}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdvancedForm;
