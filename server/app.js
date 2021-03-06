const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("dotenv").config();

const { initializeAuthentication } = require("./middleware/authenticate");

const mongodbUri = process.env.MONGODB_URI;
const mongoose = require("mongoose");

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const profileRouter = require("./routes/profile");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const requestRouter = require("./routes/request");
const paymentRouter = require("./routes/payment");

const { json, urlencoded } = express;

let app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(initializeAuthentication());

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/profile", profileRouter);
app.use("/user", userRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/upload", uploadRouter);
app.use("/request", requestRouter);
app.use("/payment", paymentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
