const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    database : 'fss',
    user : 'root',
    password : ''
});

const pool = mysql.createPool({
    host : 'localhost',
    database : 'fss',
    user : 'root',
    password : ''
});

module.exports = {connection, pool};
