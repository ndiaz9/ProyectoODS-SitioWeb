import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import { Card, Grid, Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import commons from "../commons";

const useStyles = makeStyles((theme) => ({
  errorContainer: {
    padding: "25px",
  },
  errorIcon: {
    width: "120px",
    height: "120px",
    color: "#69B470",
  },
  alertText: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#69B470",
  },
  contentContainer: {
    background: "#F1F1E6",
    height: "85vh",
    width: "40vw",
    position: "absolute",
    marginTop: "11vh",
    left: "20px",
    zIndex: "1",
    overflowY: "auto",
  },
  contentHeader: {
    fontSize: "30px",
    textAlign: "center",
    padding: "15px",
  },
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
    background: "#318F6C",
    color: "#FFFFFF",
  },
  graphContainer: {
    height: "390px",
    padding: "20px",
  },
  variablesContainer: {
    padding: "10px",
    width: "100%",
  },
  variableCard: {
    background: "#D9E5E1",
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
    <Card className={classes.variableCard}>
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

const BasicModel = (props) => {
  return (
    <div>
      <Grid item>
        <Grid container className={props.classes.titleContainer}>
          <Typography className={props.classes.titleText}>
            Características de la instalación - Modelo Básico
          </Typography>
        </Grid>
        <Grid
          container
          className={props.classes.formContainer}
          alignItems="center"
          spacing={1}
        >
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={props.classes.fieldContainer}
          >
            <Grid item xs={6}>
              <Typography className={props.classes.formtext}>
                Tipo de montaje
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
                {commons.setups.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {commons.basicModelVariables.map((basicvar) => (
            <Grid
              container
              spacing={1}
              alignItems="center"
              className={props.classes.fieldContainer}
              key={"grid" + basicvar.value}
            >
              <Grid item xs={6}>
                <Typography className={props.classes.formtext}>
                  {basicvar.label}
                </Typography>
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
          <Grid item xs={12} className={props.classes.buttonContainer}>
            <Button
              variant="contained"
              className={props.classes.submitButton}
              onClick={props.handleButtonClick}
            >
              Calcular Generación del Sistema
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const AdvancedModel = (props) => {
  return (
    <div>
      <Grid item>
        <Grid container className={props.classes.titleContainer}>
          <Typography className={props.classes.titleText}>
            Características de la instalación - Modelo Avanzado
          </Typography>
        </Grid>
        <Grid
          container
          className={props.classes.formContainer}
          alignItems="center"
          spacing={1}
        >
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={props.classes.fieldContainer}
          >
            <Grid item xs={6}>
              <Typography className={props.classes.formtext}>
                Tipo de montaje
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
                {commons.setups.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {commons.advancedModelVariables.map((advar) => (
            <Grid
              container
              spacing={1}
              alignItems="center"
              className={props.classes.fieldContainer}
              key={"grid" + advar.value}
            >
              <Grid item xs={6}>
                <Typography className={props.classes.formtext}>
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
          <Grid item xs={12} className={props.classes.buttonContainer}>
            <Button
              variant="contained"
              className={props.classes.submitButton}
              onClick={props.handleButtonClick}
            >
              Calcular Generación del Sistema
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const MonthlyGraph = (props) => {
  const classes = useStyles();
  if (props.data === null) {
    return null;
  } else {
    var dates = [];
    props.data.forEach((day) => {
      var dateData = {
        date: commons.dayToDate(props.year, day.x),
        y: day.y,
      };
      dates.push(dateData);
    });
    var groups = dates.reduce((previous, current) => {
      var month = current.date.getMonth();
      var monthKey = commons.months[month];
      previous[monthKey]
        ? previous[monthKey].data.push(current)
        : (previous[monthKey] = { data: [current] });
      return previous;
    }, {});
    var means = [];
    commons.months.forEach((month) => {
      var monthData = groups[month];
      var length = monthData.data.length;
      var sum = monthData.data.reduce((a, b) => a + b.y, 0);
      means.push({ month: month, Potencia: commons.round2(sum / length) || 0 });
    });
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>{props.title}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={1}
            justify="center"
            className={classes.variablesContainer}
          >
            <Grid item xs={4}>
              <VariableCard
                title="Mínimo"
                value={commons.round2(props.min) + " kW/día"}
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                title="Máximo"
                value={commons.round2(props.max) + " kW/día"}
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCard
                title="Factor de Planta"
                value={
                  isFinite(props.CF)
                    ? commons.round2(props.CF * 100) + "%"
                    : "--"
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.graphContainer}>
            <ResponsiveBar
              data={means}
              keys={["Potencia"]}
              indexBy="month"
              margin={{ top: 10, right: 10, bottom: 20, left: 50 }}
              padding={0.3}
              valueScale={{ type: "linear", round: true }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "paired" }}
              enableLabel={false}
              axisTop={null}
              axisRight={null}
              axisBottom={commons.months}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Potencia (kW)",
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

const DailyGraphPopup = (props) => {
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
              Gráfica Detallada
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
            <div className={classes.graphContainer}>
              <ResponsiveLine
                data={graphData}
                margin={{ top: 10, right: 10, bottom: 80, left: 50 }}
                colors={{ scheme: "category10" }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "kW",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={props.handleCloseDailyGraph}
              color="primary"
              autoFocus
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

const GenerationForm = (props) => {
  const year = props.year;
  const coord = props.coord;

  const classes = useStyles();

  const [dailyGraphData, setdailyGraphData] = useState(null);
  const [dailyData, setdailyData] = useState(null);
  const [model, setModel] = useState("basic");
  const [setup, setSetup] = useState("isolated");
  const [openDailyGraph, setOpenDailyGraph] = useState(false);
  const [capacityFactor, setCapacityFactor] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const [formData, setFormData] = useState({
    N: commons.basicModelVariables[0].defaultValue,
    Pmp: commons.basicModelVariables[1].defaultValue,
    gamma: commons.basicModelVariables[2].defaultValue,
    beta: commons.basicModelVariables[3].defaultValue,
    n: commons.basicModelVariables[4].defaultValue,
    PT: commons.basicModelVariables[5].defaultValue,
    src: commons.basicModelVariables[6].defaultValue,
  });
  const [advancedFormData, setAdvancedFormData] = useState({
    s: commons.advancedModelVariables[0].defaultValue,
    beta: commons.advancedModelVariables[1].defaultValue,
    iscref: commons.advancedModelVariables[2].defaultValue,
    vocref: commons.advancedModelVariables[3].defaultValue,
    impref: commons.advancedModelVariables[4].defaultValue,
    vmpref: commons.advancedModelVariables[5].defaultValue,
    alphaisc: commons.advancedModelVariables[6].defaultValue,
    betavoc: commons.advancedModelVariables[7].defaultValue,
    n: commons.advancedModelVariables[8].defaultValue,
    PT: commons.advancedModelVariables[9].defaultValue,
    src: commons.advancedModelVariables[10].defaultValue,
  });

  const handleClickOpenDailyGraph = () => {
    setOpenDailyGraph(true);
  };

  const handleCloseDailyGraph = () => {
    setOpenDailyGraph(false);
  };

  const handleFormDataChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: parseFloat(event.target.value) });
  };
  const handleAdvancedFormDataChange = (prop) => (event) => {
    setAdvancedFormData({
      ...advancedFormData,
      [prop]: parseFloat(event.target.value),
    });
  };
  const handleModelChange = (event) => {
    setModel(event.target.value);
    setdailyGraphData(null);
  };
  const handleSetupChange = (event) => {
    setSetup(event.target.value);
  };
  const handleButtonClick = () => {
    setdailyGraphData(null);
    setOpenDailyGraph(false);
    if (model === "basic") {
      const PAC_bas = commons.getBasicPowerGeneration(
        commons.round2(coord[1]),
        dailyData,
        setup,
        formData.N,
        formData.gamma,
        formData.beta,
        formData.Pmp,
        formData.n,
        formData.PT
      );
      var sumCF = 0;
      var min_bas = Infinity;
      var max_bas = 0;
      PAC_bas.forEach((day) => {
        sumCF += day.y;
        if (day.y >= max_bas) {
          max_bas = day.y;
        }
        if (day.y <= min_bas) {
          min_bas = day.y;
        }
      });
      const CF = commons.getCapacityFactor(sumCF, formData.src);
      setCapacityFactor(CF);
      setMin(min_bas);
      setMax(max_bas);
      setdailyGraphData(PAC_bas);
    } else {
      const PAC_adv = commons.getAdvancedPowerGeneration(
        commons.round2(coord[1]),
        dailyData,
        setup,
        advancedFormData.s,
        advancedFormData.beta,
        advancedFormData.iscref,
        advancedFormData.vocref,
        advancedFormData.impref,
        advancedFormData.vmpref,
        advancedFormData.alphaisc,
        advancedFormData.betavoc,
        advancedFormData.n,
        advancedFormData.PT
      );
      var sumCFadv = 0;
      var min_adv = Infinity;
      var max_adv = 0;
      PAC_adv.forEach((day) => {
        sumCFadv += day.y;
        if (day.y >= max_adv) {
          max_adv = day.y;
        }
        if (day.y <= min_adv) {
          min_adv = day.y;
        }
      });
      const CFadv = commons.getCapacityFactor(sumCFadv, formData.src);
      setCapacityFactor(CFadv);
      setMin(min_adv);
      setMax(max_adv);
      setdailyGraphData(PAC_adv);
    }
  };

  useEffect(() => {
    if (coord[0] !== 0 && coord[1] !== 0) {
      const getLon = commons.round2(coord[0]);
      const getLat = commons.round2(coord[1]);
      axios
        .get(
          commons.backendURL + "/api/d/" + year + "/" + getLat + "+" + getLon
        )
        .then((result) => {
          if (result.status === 200) {
            setdailyData(result.data[0]);
            setdailyGraphData(null);
          }
        });
    }
  }, [year, coord]);

  if (dailyData === null) {
    return (
      <Card className={classes.contentContainer}>
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.errorContainer}
        >
          <Grid item>
            <NotListedLocationIcon className={classes.errorIcon} />
          </Grid>
          <Grid item>
            <Typography className={classes.alertText} align="center">
              Haga click sobre un punto del mapa para usar la herramienta de
              cálculo.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  } else {
    return (
      <Card className={classes.contentContainer}>
        <Grid container direction="column">
          <Grid item>
            <Grid container className={classes.titleContainer}>
              <Typography className={classes.titleText}>
                Seleccione modelo de generación
              </Typography>
            </Grid>
            <Grid container justify="center">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="model"
                  name="model-radio"
                  value={model}
                  onChange={handleModelChange}
                >
                  <FormControlLabel
                    value="basic"
                    control={<Radio />}
                    label="Básico"
                  />
                  <FormControlLabel
                    value="advanced"
                    control={<Radio />}
                    label="Avanzado"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          {model === "basic" ? (
            <BasicModel
              classes={classes}
              setup={setup}
              handleSetupChange={handleSetupChange}
              handleFormDataChange={handleFormDataChange}
              handleButtonClick={handleButtonClick}
            />
          ) : (
            <AdvancedModel
              classes={classes}
              setup={setup}
              handleSetupChange={handleSetupChange}
              handleAdvancedFormDataChange={handleAdvancedFormDataChange}
              handleButtonClick={handleButtonClick}
            />
          )}
          <Grid item>
            <MonthlyGraph
              title={"Potencia Generada por mes [kW] - " + year}
              data={dailyGraphData}
              year={year}
              CF={capacityFactor}
              min={min}
              max={max}
            />
            <DailyGraphPopup
              title={"Potencia Generada por día [kW] - " + year}
              data={dailyGraphData}
              handleClickOpenDailyGraph={handleClickOpenDailyGraph}
              openDailyGraph={openDailyGraph}
              handleCloseDailyGraph={handleCloseDailyGraph}
            />
          </Grid>
        </Grid>
      </Card>
    );
  }
};

export default GenerationForm;
