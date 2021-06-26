const express =  require('express');
const router = express.Router();
const loginService = require('../Service/LoginService');
const tenantServiceController = require('../controlers/TenantServiceControler');


router.post('/v1/login', loginService.login);
router.get('/v1/getTenants', loginService.auth, tenantServiceController.getTenants);
router.post('/v1/createTenant', tenantServiceController.createTenant);
router.get('/v1/getTenantByUserName/:userName', loginService.auth, tenantServiceController.getTenantByUserName);
router.get('/v1/getTenantById/:id', loginService.auth, tenantServiceController.getTenantById)
router.put('/v1/setIsAadharVerified', loginService.auth, tenantServiceController.setIsAadharVerified)

module.exports = router;