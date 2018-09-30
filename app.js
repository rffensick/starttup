require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const dbConnect = require("./utils/dbConnect");

const app = express();
app.use(cors());
app.set("trust proxy", "loopback");
app.use(helmet());
app.use(helmet.noCache());

//app.use(favicon(path.join(__dirname, 'public/assets/img/', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

require("./routes")(app);

async function initApp() {
  await dbConnect.connect();
}

initApp();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // render the error page
  res.status(err.status || 500);
  res.json({ code: 1 });
});

module.exports = app;
