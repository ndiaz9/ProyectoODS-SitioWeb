import React from "react";
import axios from "axios";
import ObjectsToCsv from "objects-to-csv";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Card, Button } from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import commons from "../../commons";

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
  button: {
    background: "#318F6C",
    color: "#FFFFFF",
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

const SideDownloads = (props) => {
  const classes = useStyles();
  const coord = props.coord;

  const handleYearlyDownload = () => {
    var requests = [];
    commons.years.forEach((year) => {
      const req = axios.get(
        commons.backendURL +
          "/api/y/" +
          year +
          "/" +
          commons.round2(coord[1]) +
          "+" +
          commons.round2(coord[0])
      );
      requests.push(req);
    });

    axios.all(requests).then(
      axios.spread((...responses) => {
        var error = false;
        responses.forEach((response) => {
          if (response.status !== 200) {
            error = true;
          }
        });
        if (!error) {
          var newData = [];
          commons.years.forEach((year, index) => {
            newData.push({
              year: year,
              GHI: responses[index].data[0]["GHI"],
              DHI: responses[index].data[0]["DHI"],
              DNI: responses[index].data[0]["DNI"],
              "Wind Speed": responses[index].data[0]["Wind Speed"],
              Temperature: responses[index].data[0]["Temperature"],
              "Solar Zenith Angle":
                responses[index].data[0]["Solar Zenith Angle"],
            });
          });
          (async () => {
            const csv = new ObjectsToCsv(newData);
            var hiddenElement = document.createElement("a");
            hiddenElement.href =
              "data:text/csv;charset=utf-8," + encodeURI(await csv.toString());
            hiddenElement.target = "_blank";
            hiddenElement.download =
              commons.round2(coord[0]) +
              "_" +
              commons.round2(coord[0]) +
              "_anual.csv";
            hiddenElement.click();
          })();
        }
      })
    );
  };

  const handleMonthlyDownload = () => {
    var requests = [];
    commons.years.forEach((year) => {
      const req = axios.get(
        commons.backendURL +
          "/api/m/" +
          year +
          "/" +
          commons.round2(coord[1]) +
          "+" +
          commons.round2(coord[0])
      );
      requests.push(req);
    });

    axios.all(requests).then(
      axios.spread((...responses) => {
        var error = false;
        responses.forEach((response) => {
          if (response.status !== 200) {
            error = true;
          }
        });
        if (!error) {
          var newData = [];
          commons.years.forEach((year, index) => {
            const lengthData = responses[index].data[0]["GHI"].length;
            for (var i = 0; i < lengthData; i++) {
              newData.push({
                year: year,
                month: i + 1,
                GHI: responses[index].data[0]["GHI"][i],
                DHI: responses[index].data[0]["DHI"][i],
                DNI: responses[index].data[0]["DNI"][i],
                "Wind Speed": responses[index].data[0]["Wind Speed"][i],
                Temperature: responses[index].data[0]["Temperature"][i],
                "Solar Zenith Angle":
                  responses[index].data[0]["Solar Zenith Angle"][i],
              });
            }
          });
          (async () => {
            const csv = new ObjectsToCsv(newData);
            var hiddenElement = document.createElement("a");
            hiddenElement.href =
              "data:text/csv;charset=utf-8," + encodeURI(await csv.toString());
            hiddenElement.target = "_blank";
            hiddenElement.download =
              commons.round2(coord[0]) +
              "_" +
              commons.round2(coord[0]) +
              "_mensual.csv";
            hiddenElement.click();
          })();
        }
      })
    );
  };

  const handleDailyDownload = () => {
    var requests = [];
    commons.years.forEach((year) => {
      const req = axios.get(
        commons.backendURL +
          "/api/d/" +
          year +
          "/" +
          commons.round2(coord[1]) +
          "+" +
          commons.round2(coord[0])
      );
      requests.push(req);
    });

    axios.all(requests).then(
      axios.spread((...responses) => {
        var error = false;
        responses.forEach((response) => {
          if (response.status !== 200) {
            error = true;
          }
        });
        if (!error) {
          var newData = [];
          commons.years.forEach((year, index) => {
            const lengthData = responses[index].data[0]["GHI"].length;
            for (var i = 0; i < lengthData; i++) {
              newData.push({
                year: year,
                day: i + 1,
                GHI: responses[index].data[0]["GHI"][i],
                DHI: responses[index].data[0]["DHI"][i],
                DNI: responses[index].data[0]["DNI"][i],
                "Wind Speed": responses[index].data[0]["Wind Speed"][i],
                Temperature: responses[index].data[0]["Temperature"][i],
                "Solar Zenith Angle":
                  responses[index].data[0]["Solar Zenith Angle"][i],
              });
            }
          });
          (async () => {
            const csv = new ObjectsToCsv(newData);
            var hiddenElement = document.createElement("a");
            hiddenElement.href =
              "data:text/csv;charset=utf-8," + encodeURI(await csv.toString());
            hiddenElement.target = "_blank";
            hiddenElement.download =
              commons.round2(coord[0]) +
              "_" +
              commons.round2(coord[0]) +
              "_diario.csv";
            hiddenElement.click();
          })();
        }
      })
    );
  };

  const handleHourlyDownload = () => {
    var requests = [];
    commons.years.forEach((year) => {
      const req = axios.get(
        commons.backendURL +
          "/api/h/" +
          year +
          "/" +
          commons.round2(coord[1]) +
          "+" +
          commons.round2(coord[0])
      );
      requests.push(req);
    });

    axios.all(requests).then(
      axios.spread((...responses) => {
        var error = false;
        responses.forEach((response) => {
          if (response.status !== 200) {
            error = true;
          }
        });
        if (!error) {
          var newData = [];
          commons.years.forEach((year, index) => {
            const lengthData = responses[index].data[0]["GHI"].length;
            for (var i = 0; i < lengthData; i++) {
              newData.push({
                year: year,
                hour: i,
                GHI: responses[index].data[0]["GHI"][i],
                DHI: responses[index].data[0]["DHI"][i],
                DNI: responses[index].data[0]["DNI"][i],
                "Wind Speed": responses[index].data[0]["Wind Speed"][i],
                Temperature: responses[index].data[0]["Temperature"][i],
                "Solar Zenith Angle":
                  responses[index].data[0]["Solar Zenith Angle"][i],
              });
            }
          });
          (async () => {
            const csv = new ObjectsToCsv(newData);
            var hiddenElement = document.createElement("a");
            hiddenElement.href =
              "data:text/csv;charset=utf-8," + encodeURI(await csv.toString());
            hiddenElement.target = "_blank";
            hiddenElement.download =
              commons.round2(coord[0]) +
              "_" +
              commons.round2(coord[0]) +
              "_hora.csv";
            hiddenElement.click();
          })();
        }
      })
    );
  };

  if (coord[0] === 0 && coord[1] === 0) {
    return (
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
            Haga click sobre un punto del mapa para descargar datos.
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <div>
        <Grid
          container
          spacing={1}
          justify="center"
          className={classes.variablesContainer}
        >
          <Grid item xs={6}>
            <VariableCard
              title="Latitud"
              value={commons.round2(coord[1]) + "°"}
            />
          </Grid>
          <Grid item xs={6}>
            <VariableCard
              title="Longitud"
              value={commons.round2(coord[0]) + "°"}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.titleContainer}>
          <Typography className={classes.titleText}>
            Datos disponibles
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={1}
        >
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">Valores anuales</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleYearlyDownload}
                >
                  Descargar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">Valores anuales por hora</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleHourlyDownload}
                >
                  Descargar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">Valores mensuales</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleMonthlyDownload}
                >
                  Descargar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">Valores diarios</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleDailyDownload}
                >
                  Descargar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default SideDownloads;
