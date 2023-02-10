const mysql = require('mysql2');

module.exports = mysql.createConnection({
    user:'root',
    host:'localhost', 
    password:'Sena@2003',
    database:'foodmanagement'
});