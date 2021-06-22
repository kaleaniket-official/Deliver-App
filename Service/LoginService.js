const jwt = require('jsonwebtoken');
const connectDB = require("../database/db");

var login = async (req, res) => {

    //TODO : Chk DB for tenant data
    try{
        const {username, password} = req.body;
        const sql = "SELECT tenantId, tenantname, email FROM public.tenant WHERE tenantUserName = $1 "
                    +"AND password = crypt($2, password)"
        const data = await connectDB.query(sql, [username, password]);
        if(data && data.rowCount === 1){
            const token = jwt.sign(req.body,process.env.TOKEN_SECRET_KEY);
            res.header('auth-token',token).json({json_web_token: token, data: data.rows});
        }else{
            res.status(401).send('Access denied!');
            //throw new Error("User does not exists, please enter valid credentials"); 
        }   
    }catch(err){
        res.send(err.message)
    }
}

var auth = (req,res,next) =>{
  
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access denied!');

    try{
         const tokens = token.split(' ');
        const verified = jwt.verify(tokens[1] , process.env.TOKEN_SECRET_KEY);
        req.useContext - verified;
    }catch(err){
         res.status(400).send('Invalid token!')
    }
   next();
}

module.exports = {
    login: login,
    auth: auth
}
