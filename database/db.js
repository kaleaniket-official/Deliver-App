 const pool = require("pg").Pool;

 const dbConnect = new pool({
     user: "postgres",
     password: "@fourtech",
     database: "mustangDB",
     host: "localhost",
     port: 5433
 })

 module.exports = dbConnect;