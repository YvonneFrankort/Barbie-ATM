require("dotenv").config(); // Load environment variables from .env file

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routes
var indexRouter = require('./routes/index');
//<<<<<<< meri
var customerRouter = require('./routes/customer');
// =======
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/accountRoutes'); // router for bank-related API
var customerRouter = require('./routes/customerRoutes'); // router for customer-related API
var cardRouter = require('./routes/cardRoutes'); // router for card-related API
var transactionRouter = require('./routes/transactionRoutes'); // router for transaction-related API
var cardaccountRouter = require('./routes/cardaccountRoutes'); // router for cardaccount-related API
//>>>>>>> main

var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
//<<<<<<< meri
app.use('/customer', customerRouter);
//=======
app.use('/users', usersRouter);
app.use('/accounts', accountRouter); // New route for banking operations
app.use('/customers', customerRouter); // New route for customer operations
app.use('/cards', cardRouter); // New route for card operations 
app.use('/cardaccounts', cardaccountRouter); // New route for cardaccount operations
app.use('/transactions', transactionRouter); // New route for transaction operations

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);;
});
//>>>>>>> main

module.exports = app;
