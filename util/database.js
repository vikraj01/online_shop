const mysql = require('mysql2')


const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database:'node-complete',
    password:'S##48k@qirt'
})

module.exports = pool.promise();