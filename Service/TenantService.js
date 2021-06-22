
const connectDB = require("../database/db");

var createTenant = async (req,res) => {
    try{
        const {tenantUserName, tenantName, email, phoneNumber, aadharNumber, password} = req.body;

        const insertQuery = "INSERT into public.tenant(tenantUserName, tenantName, email, "
            +"phoneNumber, aadharNumber, password, created_date, updated_date) values($1, $2, $3, $4, $5, crypt($6, gen_salt('md5')), now(), now())";
        const data = await connectDB.query(insertQuery, [tenantUserName, tenantName, email, phoneNumber, aadharNumber, password]);
        res.status(200).send({message: "tenant created!!"});
    }catch(err){
        console.error(err.message);
    }
}


var getTenants = async (req,res) => {
    try{
        const data = await connectDB.query("SELECT * from public.tenant");
        res.send(data.rows);
    }catch(err){
        console.error(err.message);
    }
}

var getTenantById = async (req,res) => {
    try{
        const id = req.params.id;
        const data = await connectDB.query("SELECT * from public.tenant where tenantId = $1",[id]);
        res.send(data.rows);
    }catch(err){
        console.error(err.message);
    }
}

var getTenantByUserName = async (req,res) => {
    try{
        const userName = req.params.userName;
        const data = await connectDB.query("SELECT * from public.tenant where tenantUserName = $1",[userName]);
        res.send(data.rows[0]);
    }catch(err){
        console.error(err.message);
    }
}
module.exports = {
     getTenants: getTenants,
     getTenantById: getTenantById,
     getTenantByUserName: getTenantByUserName,
     createTenant: createTenant
}