const { MongoClient } = require("mongodb");

//const uri = "mongodb://192.168.1.17:27017/access";
const uri = "mongodb://localhost:27017/access";
const conn = MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = conn;
