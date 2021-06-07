 const mongoose = require("mongoose");

 const connectDB = async () => {

    const conn = mongoose.connect(process.env.DB_URL, {

        useNewUrlParser : true,
        useCreateIndex : true,
        useFindAndModify : false,
        useUnifiedTopology : true
    },() =>{
        console.log(`MondoDB connected!!!`)
    })
 }

 module.exports = connectDB;