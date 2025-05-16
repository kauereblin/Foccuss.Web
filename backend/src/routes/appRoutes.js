const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController');

router.get('/', controller.hello);

router.get('/android', controller.getAllAndroid);

router.get('/blocked-apps/android', controller.getAndroidBlockedApps);
router.post('/blocked-apps/android', controller.saveAndroidBlockedApps);
router.patch('/blocked-apps/android', controller.toggleAndroidApp);

router.get('/block-time-settings/android', controller.getAndroidTimeSettings);
router.post('/block-time-settings/android', controller.saveAndroidTimeSettings);

module.exports = router;
