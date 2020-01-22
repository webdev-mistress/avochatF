const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'leyrus',
    password: '55667788',
    database: 'avochat',
});

con.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('Connected games!');
});

module.exports = con;
