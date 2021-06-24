
const connectDB = require("../database/db");

var createTenant = async (req,res) => {
    try{
        const {tenantUserName, tenantName, email, phoneNumber, aadharNumber, password} = req.body;

        const insertQuery = "INSERT into public.tenant(tenantUserName, tenantName, email, "
            +"phoneNumber, password, created_date, updated_date) values($1, $2, $3, $4, crypt($6, gen_salt('md5')), now(), now())";
        const data = await connectDB.query(insertQuery, [tenantUserName, tenantName, email, phoneNumber, aadharNumber, password]);
        res.status(200).send({message: "tenant created!!"});
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: "Failed to create tenant."});
    }
}


var getTenants = async (req,res) => {
    try{
        const data = await connectDB.query("SELECT * from public.tenant");
        res.send(data.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: "Failed to fetch tenants."});
    }
}

var getTenantById = async (req,res) => {
    try{
        const id = req.params.id;
        const data = await connectDB.query("SELECT * from public.tenant where tenantId = $1",[id]);
        if(data.rows && data.rows.length > 0){
            res.send(data.rows[0]);
        }
        else{
            res.status(404).send({message: "Tenant not present with ID: "+id});
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: "Failed to get tenant by ID."});
    }
}

var getTenantByUserName = async (req,res) => {
    try{
        const userName = req.params.userName;
        const data = await connectDB.query("SELECT * from public.tenant where tenantUserName = $1",[userName]);
        if(data.rows && data.rows.length > 0){
            res.send(data.rows[0]);
        }
        else{
            res.status(404).send({message: "Tenant not present with username: "+userName});
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: "Failed to get tenant by username."});

    }
}

var setIsAadharVerified = async (req,res) => {
    try{
        const isAadharVerified = req.body.isAadharVerified;
        const tenantId = req.body.tenantId;
        const data = await connectDB.query("UPDATE public.tenant SET isaadharverified = $1 where tenantid= $2",[isAadharVerified,tenantId]);
        if(data.rowCount && data.rowCount > 0){
            res.status(200).send({message: `Updated Tenant with ID ${tenantId}, set aadhar verified to: ${isAadharVerified}`}) ;
        }
        else{
            res.status(404).send({message: "Tenant not present with id: "+tenantId});
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: "Failed to update tenant with ID: "+tenantId});

    }
}
module.exports = {
     getTenants: getTenants,
     getTenantById: getTenantById,
     getTenantByUserName: getTenantByUserName,
     createTenant: createTenant,
     setIsAadharVerified: setIsAadharVerified
}