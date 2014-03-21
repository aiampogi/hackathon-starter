/**
* Module dependencies.
*/

var express = require('express');
var path = require('path');
var middleware = require('./middleware');
var routes = require('./routes');
var db = require('./database');
var serverConfig = require('../config/server');

function initAndStartApp() {
  // Create express server
  var app = express();

  // Mongoose configuration.
  db.init();

  // Express configuration.
  serverConfig(app);

  // Hook middlewares
  middleware(app);

  // Application routes.
  routes.application(app);
  routes.api(app);


  // Start express server
  app.listen(app.get('port'), function() {
    console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
  });
}

module.exports = initAndStartApp;
