
const connectDB = require("../database/db");
const tenantService = require('../Service/TenantService');
const constants = require("../constants");

var createTenant = async (req,res) => {
    try{
        const resData = await tenantService.createTenant(req.body);
        res.status(resData.statusCode).send({message: resData.message});
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: "Failed to create tenant. "+err.message});
    }
}


var getTenants =  async (req,res) => {
    try{
        const resData =  await tenantService.getTenants();
        if(resData.error)
            res.status(500).send(resData);
        if(resData.message){
            res.status(resData.statusCode).send({message: resData.message});
        }else{
            res.status(constants.RESPONSE_STATUS.SUCCESS).send(resData);
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: "Failed to fetch tenants. "+err.message});
    }
}

var getTenantById = async (req,res) => {
    try{
        const id = req.params.id;
        const resData = await tenantService.getTenantById(id);
        if(resData.error)
            res.status(500).send(resData);
        if(resData.message){
            res.status(resData.statusCode).send({message: resData.message});
        }else{ 
             res.status(constants.RESPONSE_STATUS.SUCCESS).send(resData);
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: "Failed to get tenant by ID. "+err.message});
    }
}

var getTenantByUserName = async (req,res) => {
    try{
        const userName = req.params.userName;
        const resData = await tenantService.getTenantByUserName(userName);
        if(resData.error)
            res.status(500).send(resData);
        if(resData.message){
            res.status(resData.statusCode).send({message: resData.message});
        }else{ 
            res.status(constants.RESPONSE_STATUS.SUCCESS).send(resData);
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
        const resData = await tenantService.setIsAadharVerified(tenantId,isAadharVerified,);

        if(resData.error)
            res.status(500).send(resData);
        if(resData.message){
            res.status(resData.statusCode).send({message: resData.message});
        }else{ 
            res.status(constants.RESPONSE_STATUS.SUCCESS).send({message: resData});
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send({message: "Failed to update tenant. "+err.message});

    }
}
module.exports = {
     getTenants: getTenants,
     getTenantById: getTenantById,
     getTenantByUserName: getTenantByUserName,
     createTenant: createTenant,
     setIsAadharVerified: setIsAadharVerified
}