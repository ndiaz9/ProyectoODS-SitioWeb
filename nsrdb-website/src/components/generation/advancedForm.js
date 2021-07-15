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
  buttonContainer: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  submitButton: {
    background: colors.buttonBackground,
    color: colors.buttonText,
  },
  popovertext: {
    fontSize: "12px",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const AdvancedForm = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState({
    setupType: null,
    N: null,
    s: null,
    beta: null,
    iscref: null,
    vocref: null,
    impref: null,
    vmpref: null,
    alphaisc: null,
    betavoc: null,
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
    s: Boolean(anchorEl.s),
    beta: Boolean(anchorEl.beta),
    iscref: Boolean(anchorEl.iscref),
    vocref: Boolean(anchorEl.vocref),
    impref: Boolean(anchorEl.impref),
    vmpref: Boolean(anchorEl.vmpref),
    alphaisc: Boolean(anchorEl.alphaisc),
    betavoc: Boolean(anchorEl.betavoc),
    n: Boolean(anchorEl.n),
    PT: Boolean(anchorEl.PT),
  };

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
                <Typography className={classes.popovertext}>
                  {strings.setupTypeDescription}
                </Typography>
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
          {constants.advancedModelVariables.map((advar) => (
            <Grid
              container
              spacing={1}
              alignItems="center"
              className={classes.fieldContainer}
              key={"grid" + advar.value}
            >
              <Grid item xs={5}>
                <Typography className={classes.formtext}>
                  {advar.label}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <HelpIcon
                  fontSize="small"
                  style={{ color: colors.buttonBackground }}
                  aria-owns={
                    open[advar.value]
                      ? "mouse-over-popover" + advar.value
                      : undefined
                  }
                  aria-haspopup="true"
                  onMouseEnter={handlePopover(advar.value, true)}
                  onMouseLeave={handlePopover(advar.value, false)}
                />
                <Popover
                  id={"mouse-over-popover" + advar.value}
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open[advar.value]}
                  anchorEl={anchorEl[advar.value]}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  onClose={handlePopover(advar.value, false)}
                  disableRestoreFocus
                >
                  <Typography className={classes.popovertext}>
                    {advar.description}
                  </Typography>
                </Popover>
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
