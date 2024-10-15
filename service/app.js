var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const tokenMiddleware = require("./middleware/token");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var companyRouter = require("./routes/companys");

const fs = require('fs');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 中间件
app.use(tokenMiddleware);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/companies", companyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 根据当前的环境加载不同的 .env 文件
const env = process.env.NODE_ENV || 'production';  // 默认是 development
const envFilePath = path.resolve(__dirname, 'env', `.env.${env}`);

if (fs.existsSync(envFilePath)) {
  require('dotenv').config({ path: envFilePath });
}
console.log("NODE_ENV:", process.env.NODE_ENV);

// Cors Middleware
const cors = require("cors");
app.use(cors());
app.options("*", cors());

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
