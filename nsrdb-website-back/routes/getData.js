var express = require("express");
var router = express.Router();
const getData = require("../controllers/getData");

router.get("/y/:year/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getYearlyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/m/:year/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getMonthlyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/d/:year/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getDailyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/h/:year/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getHourlyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/c/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getCoordinates(latitude, longitude, (result, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (!result || !result.length) res.status(404).send("Data not found");
      else return res.send(result);
    }
  });
});

router.get("/c/near/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getNearCoordinates(latitude, longitude, (result, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (!result || !result.length) res.status(404).send("Data not found");
      else return res.send(result);
    }
  });
});

router.get("/map/:year", function (req, res, next) {
  getData.getMapData(parseInt(req.params.year), (result, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (!result || !result.length) res.status(404).send("Data not found");
      else return res.send(result);
    }
  });
});

module.exports = router;
