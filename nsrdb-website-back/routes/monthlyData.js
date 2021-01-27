var express = require("express");
var router = express.Router();
const monthlyData = require("../controllers/monthlyData");

/* GET users listing. */
router.get("/:year/:latlong", function (req, res, next) {
  latitude = req.params.latlong.split("_")[0];
  longitude = req.params.latlong.split("_")[1];
  monthlyData.getMonthlyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result) => {
      console.log(result);
      if (result) res.send(result);
      else return res.status(404).send("Data not found");
    }
  );
});

module.exports = router;
