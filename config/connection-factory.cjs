var mysql = require("mysql2");

module.exports = function(){
    return mysql.createConnection({
        host: "viaduct.proxy.rlwy.net",
        user: "root",
        password: "cdAe2hAcFadcEa65CCCGda52AeAHBc1A",
        database: "railway",
        port: 13385
    })
}