const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/job');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require("express-session");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//Connection to MongoDB
const uri = "mongodb://kaaj:111@138.49.185.168:27017/job_database"
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
//End of connection to MongoDB

//Session managment (cookie session lasts for 1 hour)
app.use(session({
  secret : 'JoesJobSearchApplication',
  resave : false,
  saveUninitialized : true,
  cookie : { maxAge : 3600000 }
}));

app.use('/api/v1', indexRouter);
app.use('/api/v1', jobRouter);
app.use('/api/v1', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
