var mySQL = require("mysql");
//var mySQL = require("mysql2/promise");

var connection = mySQL.createConnection({
    host: 'localhost',
    database: 'mitrdb',
    user: 'root',
    password: 'root'
});

module.exports = connection;