const MongoUtils = require("../lib/MongoUtils");

const getYearlyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-yearly")
      .find({ latitude: latitude, longitude: longitude })
      .toArray((err, data) => {
        callback(data);
      });
  });
};

const yearlyData = { getYearlyData };

module.exports = yearlyData;
