const express =  require('express');
const router = express.Router();
const loginService = require('../Service/LoginService');
const tenantService = require('../Service/TenantService');


router.post('/v1/login', loginService.login);
router.get('/v1/getTenants', loginService.auth, tenantService.getTenants);
router.post('/v1/createTenant', tenantService.createTenant);
router.get('/v1/getTenantByUserName/:userName', loginService.auth, tenantService.getTenantByUserName);
router.get('/v1/getTenantById/:id', loginService.auth, tenantService.getTenantById)
router.put('/v1/setIsAadharVerified', loginService.auth, tenantService.setIsAadharVerified)

module.exports = router;