const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// importing environment variables from our variables.env file
require('dotenv').config({path: 'variables.env'});

// Importing custom Modules
const InitiateMongoServer = require('./utilities/db');
const routes = require('./routes/index');
const helpers = require('./utilities/helperFunctions');

// connecting to our database and handling errors if any
InitiateMongoServer();
mongoose.Promise  = global.Promise;

const PORT = process.env.PORT || 5000;

// Importing models
require('./models/user');

// Creating the express app
const app = express();

// using the modules
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieParser());

// passing variables to all requests
app.use((req, res, next) => {
  res.locals.helpers = helpers;
  res.locals.currentPath = req.path;
  next();
});

// handling the request
app.use('/', routes);

app.get('/events', (req, res) => {
    res.send(events);
})

// starting the app
app.listen(PORT, () => {
    console.log(`Express server running at : http://localhost:${PORT}`);
})