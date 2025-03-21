const mysql = require("mysql2");

const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Treis56253',
    database: process.env.DB_NAME || 'bank_14_3',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Connect to the database
connection.getConnection((err, conn) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database");
        conn.release(); // Release the connection back to the pool
    }
});
module.exports = connection; 