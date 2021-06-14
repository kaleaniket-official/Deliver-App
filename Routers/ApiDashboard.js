const express =  require('express');
const router = express.Router();
const loginService = require('../Service/LoginService');
const tenantService = require('../Service/TenantService');


router.post('/login', loginService.login);
router.get('/getTenants', loginService.auth, tenantService.getTenants)


module.exports = router;