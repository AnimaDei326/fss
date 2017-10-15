const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    database : 'fss',
    user : 'root',
    password : '1111'
});

const pool = mysql.createPool({
    host : 'localhost',
    database : 'fss',
    user : 'root',
    password : '1111'
});

module.exports = {connection, pool};
