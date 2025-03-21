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

var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/account', accountRouter);
app.use('/cardaccount', cardaccountRouter);
app.use('/card', cardRouter);
app.use('/transaction', transactionRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);;
});


module.exports = app;
