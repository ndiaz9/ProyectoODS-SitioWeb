const MongoUtils = require("../lib/MongoUtils");

const getYearlyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-y")
      .find({ latitude: latitude, longitude: longitude })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getMonthlyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-m")
      .find({ latitude: latitude, longitude: longitude })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getDailyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-d")
      .find({ latitude, longitude })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getHourlyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-h")
      .find({ latitude: latitude, longitude: longitude })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getNearCoordinates = (latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("coordinates_data")
      .find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 5000,
          },
        },
      })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getCoordinates = (latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("coordinates_data")
      .find({
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getMapData = (year, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("map_data")
      .find({ year })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getData = {
  getYearlyData,
  getMonthlyData,
  getDailyData,
  getHourlyData,
  getNearCoordinates,
  getCoordinates,
  getMapData,
};

module.exports = getData;
