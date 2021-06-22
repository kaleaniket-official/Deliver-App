 const pool = require("pg").Pool;

 const dbConnect = new pool({
     user: "postgres",
     password: "afourtech",
     database: "mustangDB",
     host: "mustang-db.cbzurvwqgpyf.ap-south-1.rds.amazonaws.com",
     port: 5432
 })

 module.exports = dbConnect;