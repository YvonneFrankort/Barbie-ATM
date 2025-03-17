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