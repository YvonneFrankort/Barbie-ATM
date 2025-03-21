// const mysql = require('mysql2');
// const ConnectionString = 'mysql://root:Pimitefr123!@localhost:3306/bank_14_3';
        // msql://username:password@host:port/database
// const connection = mysql.createPool(ConnectionString);
// module.exports = connection;

const mysql = require("mysql2");
// const dotenv = require("dotenv");
// dotenv.config(); // Load environment variables from .env file

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pimitefr123!',
    database: 'bank_14_3'
});

// Connect to the database
connection.connect((err) => {
    if(err){
        console.error("Error connecting to the database: ", err);
    }
    else{
        console.log("Connected to the database");
    }
});

module.exports = connection;

/* Create a user with rights 
CREATE USER bankuser@localhost identified by 'bankpass'
GRANT ALL ON bank_14_3.* TO bankuser@localohst;
 */ 