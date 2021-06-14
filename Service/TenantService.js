
const connectDB = require("../database/db");

var getTenants = async (req,res) => {
    try{
        const data = await connectDB.query("SELECT * from public.tenant");
        //console.log(res.userContext);
        res.send(data.rows);
    }catch(err){
        console.error(err.message);
    }
}

module.exports = {
     getTenants: getTenants
}