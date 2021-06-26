
const connectDB = require("../database/db");

var createTenant = async (tenantJson) => {
    return new Promise(async (resolve, reject) => {
        try{
            const {tenantUserName, tenantName, email, phoneNumber, password} = tenantJson;
            const existingTenant = await getTenantByUserName(tenantUserName);
            if(existingTenant && existingTenant.message){
                const insertQuery = "INSERT into public.tenant(tenantUserName, tenantName, email, "
                +"phoneNumber, password, created_date, updated_date) values($1, $2, $3, $4, crypt($5, gen_salt('md5')), now(), now())";
                const data = await connectDB.query(insertQuery, [tenantUserName, tenantName, email, phoneNumber, password]);
                if(data && data.rowCount > 0 ){
                    return resolve({message: "tenant created successfully!",statusCode: 200});
                }
            }else{
                return resolve({message: `Tenant with username ${tenantUserName} already exists.`, statusCode: 412});
            }
        }catch(err){
            console.error(err.message);
            return reject({error: err.message});
        }
    })
}

var getTenants = async () => {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await connectDB.query("SELECT * from public.tenant");
            if(data){
                if(data.rows.length > 0){
                    return resolve(data.rows);
                }else{
                    return resolve({message: "No Tenant data found",statusCode: 404});
                }
            };
        }catch(err){
            console.error(err.message);
            return reject({error: "Failed to fetch tenants. "+err.message});
        }
    })
}

var getTenantById = async (tenantId) => {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await connectDB.query("SELECT * from public.tenant where tenantId = $1",[tenantId]);
            if(data){
                if(data.rows.length > 0){
                    return resolve(data.rows[0]);
                }else{
                    return resolve({message: "No Tenant data found", statusCode: 404});
                }
            }
        }catch(err){
            console.error(err.message);
            return reject({error:"Failed to get tenant by ID. "+err.message});
        }
    })
}

var getTenantByUserName = async (userName) => {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await connectDB.query("SELECT * from public.tenant where tenantUserName = $1",[userName]);
            if(data){
                if(data.rows.length > 0){
                    return resolve(data.rows[0]);
                }else{
                    return resolve({message: "No Tenant data found",statusCode: 404});
                }
            }
        }catch(err){
            console.error(err.message);
            return reject({error: "Failed to get tenant by username. "+err.message});
    
        }
    })
}

var setIsAadharVerified = async (tenantId,isAadharVerified) => {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await connectDB.query("UPDATE public.tenant SET isaadharverified = $1 where tenantid= $2",[isAadharVerified,tenantId]);
            if(data && data.rowCount > 0){
                return resolve(`Updated Tenant with ID ${tenantId}, set aadhar verified to: ${isAadharVerified}`) ;
            }
            else{
                return resolve({message: "Tenant not present with id: "+tenantId, statusCode: 404});
            }
        }catch(err){
            console.error(err.message);
            return reject({error: "Failed to update tenant with ID: "+tenantId+". "+err.message});
        }
    })
}
module.exports = {
     getTenants: getTenants,
     getTenantById: getTenantById,
     getTenantByUserName: getTenantByUserName,
     createTenant: createTenant,
     setIsAadharVerified: setIsAadharVerified
}