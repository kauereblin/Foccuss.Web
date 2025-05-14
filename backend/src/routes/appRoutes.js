const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController');

router.get('/', controller.hello);

router.get('/blocked-apps', controller.getBlockedAppsByPlatform);
router.post('/blocked-apps', controller.saveBlockedApps);
//router.patch('/blocked-apps', controller.toggleApp);

router.post('/block-time-settings', controller.saveTimeSettings);


module.exports = router;
