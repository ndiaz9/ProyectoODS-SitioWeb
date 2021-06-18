import React from "react";
import axios from "axios";
import ObjectsToCsv from "objects-to-csv";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button } from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import VariableCard from "../variableCard";
import constants from "../../utils/constants";
import functions from "../../utils/functions";
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
  errorContainer: {
    padding: "25px",
  },
  errorIcon: {
    width: "120px",
    height: "120px",
    color: colors.mainTheme,
  },
  alertText: {
    fontWeight: "bold",
    fontSize: "20px",
    color: colors.mainTheme,
  },
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
  variablesContainer: {
    padding: "10px",
    width: "100%",
  },
  button: {
    background: colors.buttonBackground,
    color: colors.buttonText,
  },
}));

const SideDownloads = (props) => {
  const classes = useStyles();
  const coord = props.coord;

  const handleYearlyDownload = () => {
    var requests = [];
    constants.years.forEach((year) => {
      const req = axios.get(
        constants.backendURL +
          "/api/y/" +
          year +
          "/" +
          functions.round2(coord[1]) +
          "+" +
          functions.round2(coord[0])
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
          constants.years.forEach((year, index) => {
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
              functions.round2(coord[0]) +
              "_" +
              functions.round2(coord[1]) +
              "_anual.csv";
            hiddenElement.click();
          })();
        }
      })
    );
  };

  const handleMonthlyDownload = () => {
    var requests = [];
    constants.years.forEach((year) => {
      const req = axios.get(
        constants.backendURL +
          "/api/m/" +
          year +
          "/" +
          functions.round2(coord[1]) +
          "+" +
          functions.round2(coord[0])
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
          constants.years.forEach((year, index) => {
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
              functions.round2(coord[0]) +
              "_" +
              functions.round2(coord[1]) +
              "_mensual.csv";
            hiddenElement.click();
          })();
        }
      })
    );
  };

  const handleDailyDownload = () => {
    var requests = [];
    constants.years.forEach((year) => {
      const req = axios.get(
        constants.backendURL +
          "/api/d/" +
          year +
          "/" +
          functions.round2(coord[1]) +
          "+" +
          functions.round2(coord[0])
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
          constants.years.forEach((year, index) => {
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
              functions.round2(coord[0]) +
              "_" +
              functions.round2(coord[1]) +
              "_diario.csv";
            hiddenElement.click();
          })();
        }
      })
    );
  };

  const handleHourlyDownload = () => {
    var requests = [];
    constants.years.forEach((year) => {
      const req = axios.get(
        constants.backendURL +
          "/api/h/" +
          year +
          "/" +
          functions.round2(coord[1]) +
          "+" +
          functions.round2(coord[0])
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
          constants.years.forEach((year, index) => {
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
              functions.round2(coord[0]) +
              "_" +
              functions.round2(coord[1]) +
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
            {strings.clickDownloadData}
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
              selected={false}
              title={strings.latitude}
              value={functions.round2(coord[1]) + "°"}
            />
          </Grid>
          <Grid item xs={6}>
            <VariableCard
              selected={false}
              title={strings.longitude}
              value={functions.round2(coord[0]) + "°"}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.titleContainer}>
          <Typography className={classes.titleText}>
            {strings.availableData}
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
                <Typography align="right">{strings.yearlyValues}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleYearlyDownload}
                >
                  {strings.download}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">
                  {strings.yearlyValuesPerHour}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleHourlyDownload}
                >
                  {strings.download}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">{strings.monthlyValues}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleMonthlyDownload}
                >
                  {strings.download}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">{strings.dailyValues}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleDailyDownload}
                >
                  {strings.download}
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
