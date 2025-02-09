const mysql = require('mysql2');
require('dotenv').config();
// Se establece la conexion con la base de datos
const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})
// Se convierten a todas las consultas en promesas
const mysqlPromise = mysqlPool.promise();
// Se exporta el método mysqlPool para toda la estructura y elementos del backend
module.exports = mysqlPromise;



