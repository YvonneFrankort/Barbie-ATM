require("dotenv").config(); // Load environment variables from .env file

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routes
var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customer');
var accountRouter = require('./routes/account');
var cardaccountRouter = require('./routes/cardaccount');
var cardRouter = require('./routes/card');
var transactionRouter = require('./routes/transaction');
var depositRouter = require('./routes/deposit');
var balanceRouter = require('./routes/balance');

var loginRouter = require('./routes/login');
var jwt = require('jsonwebtoken');
const deposit = require("./models/deposit_model");

var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
//suojatut reitit
app.use(authenticateToken);
app.use('/customer', customerRouter);
app.use('/account', accountRouter);
app.use('/cardaccount', cardaccountRouter);
app.use('/card', cardRouter);
app.use('/transaction', transactionRouter);
app.use('/deposit', depositRouter);
app.use('/balance', balanceRouter);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log("token = "+token);
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.MY_TOKEN, function(err, user) {

      if (err) return res.sendStatus(403)

      req.user = user

      next()
    })
  }


/* const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
*/


module.exports = app;
