var express = require('express');
// var partials = require('express-partials');
var morgan = require('morgan');
var cors = require('cors');
var dbController = require('./services/controllers');
// require the routes file 
var inRouter = require('./routes/in');
var outRouter = require('./routes/out');
var path = require('path');

inRouter = inRouter(dbController);
outRouter = outRouter(dbController)

var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/in', inRouter);
app.use('/api/out', outRouter);

app.use(express.static(path.join(__dirname, '/../client')));

module.exports = app;