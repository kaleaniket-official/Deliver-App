
const jwt = require('jsonwebtoken');

var login = (req, res) => {

    //TODO : Chk DB for tenant data
    try{
        const token = jwt.sign(req.body,process.env.TOKEN_SECRET_KEY);
        res.header('auth-token',token).json({json_web_token: token});
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
