const mysql=require('mysql2');
const ConnectionString='mysql://atm:atmpass@127.0.0.1:3306/atmdb';
const connection=mysql.createPool(connectionString);

module.exports=connection;