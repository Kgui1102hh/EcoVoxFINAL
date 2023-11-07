var mysql = require("mysql");

module.exports = function(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "17022006",
        database: "ecovox",
        port: 3306
    })
}