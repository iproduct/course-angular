/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

"use strict";

const express = require("express");
const path = require("path");
// const favicon = require('serve-favicon');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

// const rootPath = path.normalize(path.join(__dirname, '..'));
const testRoutes = require("./routes/test.routes");
const userRoutes = require("./routes/user.routes");

const SERVER_PORT = 9000;
const app = express();

// uncomment after placing your favicon in /public
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/tests", testRoutes);
app.use("/api/users", userRoutes);

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json("error", {
      message: err.message,
      error: {}
    });
  });
}

// Connection URL to db
const url = "mongodb://localhost:27017/tests";

// Wait for MongoDB to start
setTimeout(() => {
  // Use connect to connect to db
  MongoClient.connect(url, { w: 1 })
    .then(db => {
      // assert.equal(null, err);
      console.log(`Successfully connected to MongoDB server at: ${url}`);

      // Add db as app local property
      app.locals.db = db;

      // Starting the server
      app.listen(SERVER_PORT, err => {
        if (err) {
          throw err;
        }
        console.log(`Example app listening on port ${SERVER_PORT}!`);
      });
    })
    .catch(err => {
      console.log(err);
    });
}, 4000);
