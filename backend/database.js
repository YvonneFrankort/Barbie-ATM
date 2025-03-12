const mysql=require('mysql2');
const ConnectionString= 'mysql://bankuser:bankpass@127.0.0.1:3306/bank';
const connection=mysql.createPool(ConnectionString);

module.exports=connection;

/*
LUODAAN TUNNUS JA ANNETAAN OIKEUDET WORKBENCHISSA
CREATE USER bankuser@localhost IDENTIFIED BY 'bankpass';
GRANT ALL ON bank.* TO bankuser@localhost;

*/
