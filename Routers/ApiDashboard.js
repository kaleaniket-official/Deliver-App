const express =  require('express');
const router = express.Router();
const loginService = require('../Service/LoginService');
const tenantService = require('../Service/TenantService');


router.post('/login', loginService.login);
router.get('/getTenants', loginService.auth, tenantService.getTenants);
router.post('/createTenant', tenantService.createTenant);
router.get('/getTenantByUserName/:userName', loginService.auth, tenantService.getTenantByUserName);
router.get('/getTenantById/:id', loginService.auth, tenantService.getTenantById)

module.exports = router;