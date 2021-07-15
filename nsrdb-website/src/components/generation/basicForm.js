import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  Popover,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
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
  popovertext: {
    fontSize: "12px",
  },
  buttonContainer: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  submitButton: {
    background: colors.buttonBackground,
    color: colors.buttonText,
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const BasicForm = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState({
    setupType: null,
    N: null,
    Pmp: null,
    gamma: null,
    beta: null,
    n: null,
    PT: null,
  });
  const handlePopover = (prop, open) => (event) => {
    if (open) {
      setAnchorEl({ ...anchorEl, [prop]: event.currentTarget });
    } else {
      setAnchorEl({ ...anchorEl, [prop]: null });
    }
  };

  const open = {
    setupType: Boolean(anchorEl.setupType),
    N: Boolean(anchorEl.N),
    Pmp: Boolean(anchorEl.Pmp),
    gamma: Boolean(anchorEl.gamma),
    beta: Boolean(anchorEl.beta),
    n: Boolean(anchorEl.n),
    PT: Boolean(anchorEl.PT),
  };

  return (
    <div>
      <Grid item>
        <Grid container className={classes.titleContainer}>
          <Typography className={classes.titleText}>
            {strings.setupCharacteristics} - {strings.basicModel}
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
            <Grid item xs={5}>
              <Typography className={classes.formtext}>
                {strings.setupType}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <HelpIcon
                fontSize="small"
                style={{ color: colors.buttonBackground }}
                aria-owns={
                  open.setupType ? "mouse-over-popoversetuptype" : undefined
                }
                aria-haspopup="true"
                onMouseEnter={handlePopover("setupType", true)}
                onMouseLeave={handlePopover("setupType", false)}
              />
              <Popover
                id="mouse-over-popoversetuptype"
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={open.setupType}
                anchorEl={anchorEl.setupType}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                onClose={handlePopover("setupType", false)}
                disableRestoreFocus
              >
                <Typography className={classes.popovertext}>{strings.setupTypeDescription}</Typography>
              </Popover>
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
          {constants.basicModelVariables.map((basicvar) => (
            <Grid
              container
              spacing={1}
              alignItems="center"
              className={classes.fieldContainer}
              key={"grid" + basicvar.value}
            >
              <Grid item xs={5}>
                <Typography className={classes.formtext}>
                  {basicvar.label}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <HelpIcon
                  fontSize="small"
                  style={{ color: colors.buttonBackground }}
                  aria-owns={
                    open[basicvar.value]
                      ? "mouse-over-popover" + basicvar.value
                      : undefined
                  }
                  aria-haspopup="true"
                  onMouseEnter={handlePopover(basicvar.value, true)}
                  onMouseLeave={handlePopover(basicvar.value, false)}
                />
                <Popover
                  id={"mouse-over-popover" + basicvar.value}
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open[basicvar.value]}
                  anchorEl={anchorEl[basicvar.value]}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  onClose={handlePopover(basicvar.value, false)}
                  disableRestoreFocus
                >
                  <Typography className={classes.popovertext}>
                    {basicvar.description}
                  </Typography>
                </Popover>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id={basicvar.value}
                  key={basicvar.value}
                  type="number"
                  variant="outlined"
                  size="small"
                  defaultValue={basicvar.defaultValue}
                  onChange={props.handleFormDataChange(basicvar.value)}
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

export default BasicForm;
