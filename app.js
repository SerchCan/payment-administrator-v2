var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var signup = require('./routes/Auth/signup');
var login = require('./routes/Auth/login');
var logout = require('./routes/Auth/logout');

var usersRouter = require('./routes/users');

var plattform = require('./routes/operations/Plattforms');
var Payments = require('./routes/operations/payments');

var Dashboard = require('./routes/Dashboard/dash');
//var test = require('./routes/test');


process.env.SECRET_KEY = "PAYMENT_ADMIN";
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/profile', usersRouter);
app.use('/dashboard', Dashboard);
app.use('/plat', plattform);
app.use('/pay', Payments);
//app.use('/t0', test)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;