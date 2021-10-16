var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/bookModel')
config = require('config');



mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var routes = require('./api/routes/bookRoutes');
routes(app);


app.listen(port);


console.log('Book Api server started on: ' + port);

module.exports = app;