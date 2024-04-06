var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hbs = require('express-hbs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

var crypto = require('crypto');



//const privateRoutes = require('./routes/private'); // Import private routes


const { connectToDatabase } = require('./db'); // Require MongoDB connection


var app = express();


connectToDatabase();

let encryptionMethod = 'AES-256-CBC';
let secret = "ClubZTutoring2020PKSEncryption19"; //must be 32 char length
let iv = secret.substr(0,16);

 encryption = function(text){
   var encryptValue ='';
   if(text != '' && text != null){
      var encryptor = crypto.createCipheriv(encryptionMethod, secret, iv);
      encryptValue = encryptor.update(text, 'utf8', 'base64') + encryptor.final('base64');
    }
  return encryptValue;
}

decryption = function(text){
  var decryptedMessage ='';
  if(text != '' && text != null){
    var decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
    decryptedMessage = decryptor.update(text, 'base64', 'utf8') + decryptor.final('utf8');
  }
  return decryptedMessage;
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  extName: '.hbs'
}));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'max',saveUninitialized: false, resave: false,cookie: {maxAge: 864000*100 }}));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator());

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/private', privateRoutes); // Mount private routes at '/private'


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
  res.render('error');
});

app.listen(8080);

module.exports = app;