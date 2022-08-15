//requieres
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");

//instances
const app = express();

//express config
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

//express routes
app.use("/api", require("./routes/devices.js"));
app.use("/api", require("./routes/users.js"));
app.use("/api", require("./routes/templates.js"));
app.use("/api", require("./routes/webhooks.js"));

module.exports = app;

//listener
app.listen(3001, () => {
  console.log("API server listening port: 3001");
});

//mongo connection
const mongoUserName = "skyark";
const mongoPassword = "pocho21";
const mongoHost = "localhost";
const mongoPort = "27017";
const mongoDatabase = "iotify";

//mongodb://skyark:pocho21@10.29.15.5:27017/?authMechanism=DEFAULT
var uri =
  "mongodb://" +
  mongoUserName +
  ":" +
  mongoPassword +
  "@" +
  mongoHost +
  ":" +
  mongoPort +
  "/" +
  mongoDatabase;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  authSource: "admin",
};

mongoose.connect(uri, options).then(
  () => {
    console.log("\n");
    console.log("**********************************".green);
    console.log("* ✔  Mongo Succesfully Connected *".green);
    console.log("**********************************".green);
    console.log("\n");
  },
  (err) => {
    console.log("\n");
    console.log("***********************************".red);
    console.log("*     Mongo Connection Failed     *".red);
    console.log("***********************************".red);
    console.log("\n");
    console.log(err);
  }
);
