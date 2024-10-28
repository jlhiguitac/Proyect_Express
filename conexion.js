// base de datos mysql2
const mysql = require('mysql2/promise');
// Create the connection to database

const connection = mysql.createPool({
    host: process.env.HOSTDB ||'localhost',
    user: process.env.USERDB ||'root',
    database: process.env.DB ||'login',
    password: process.env.PASSWORDDB || '',
    port: process.envPORTDB || 3306,
});

module.exports = connection;