//import configs
require("dotenv/config");
const requireDir = require("require-dir");

//import ORM
const Sequelize = require("sequelize");

//import server params
var express = require("express");
const cors = require("cors");
const http = require("http");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

//db
const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_DATABASE_HOST,
    dialect: "mysql"
  }
);

module.exports = {
  sequelize
};

sequelize
  .authenticate()
  .then(() => {
    //console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

//init app
app.use(cors());
app.use(express.json());

requireDir("./app/models");

app.use("/api", require("./routes"));

server.listen(process.env.APP_PORT);
