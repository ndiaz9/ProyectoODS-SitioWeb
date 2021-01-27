const MongoUtils = require("../lib/MongoUtils");

const getMonthlyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-monthly")
      .find({ latitude: latitude, longitude: longitude })
      .toArray((err, data) => {
        callback(data);
      });
  });
};

const monthlyData = { getMonthlyData };

module.exports = monthlyData;
