const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8080,
    user: 'root',
    password: '',
    database: "company_db"
});

connection.connect((err) => {
    if(err) {
        console.error(`error connecting ${err.stack}`);
    };
    console.log(`connected as id ${connection.threadId}`);

});

connection.query - util.promisify(connection.query);

module.exports = connection; 


