// base de datos mysql2
const mysql = require('mysql2/promise');
// Create the connection to database

//mysql://root:DbYUiJhRqoTwYBLLCiLKFuYFoiddSMvy@junction.proxy.rlwy.net:41946/railway
const connection = mysql.createPool({
    host: process.env.HOSTDB ||'localhost',
    user: process.env.USERDB ||'root',
    database: process.env.DB ||'login',
    password: process.env.PASSWORDDB || '',
    port: process.env.PORTDB || 3307,
});

module.exports = connection;