// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database:'node-complete',
//     password:'S##48k@qirt'
// })

// module.exports = pool.promise();

const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "S##48k@qirt", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
