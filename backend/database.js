//<<<<<<< meri
const mysql=require('mysql2');
const ConnectionString= 'mysql://bankuser:bankpass@127.0.0.1:3306/bank';
const connection=mysql.createPool(ConnectionString);

module.exports=connection;

/*
LUODAAN TUNNUS JA ANNETAAN OIKEUDET WORKBENCHISSA
CREATE USER bankuser@localhost IDENTIFIED BY 'bankpass';
GRANT ALL ON bank.* TO bankuser@localhost;

*/
//=======
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
//>>>>>>> main
