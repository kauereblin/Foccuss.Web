const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController');

router.get('/', controller.hello);

// Android
router.get('/android', controller.getAllAndroid);

router.get('/blocked-apps/android', controller.getAndroidBlockedApps);
router.post('/blocked-apps/android', controller.saveAndroidBlockedApps);
router.patch('/blocked-apps/android', controller.toggleAndroidApp);

router.get('/block-time-settings/android', controller.getAndroidTimeSettings);
router.post('/block-time-settings/android', controller.saveAndroidTimeSettings);

// Windows
router.get('/windows', controller.getAllWindows);

router.get('/blocked-apps/windows', controller.getWindowsBlockedApps);
router.post('/blocked-apps/windows', controller.saveWindowsBlockedApps);
router.patch('/blocked-apps/windows', controller.toggleWindowsApp);

router.get('/block-time-settings/windows', controller.getWindowsTimeSettings);
router.post('/block-time-settings/windows', controller.saveWindowsTimeSettings);

// Linux
router.get('/linux', controller.getAllLinux);

router.get('/blocked-apps/linux', controller.getLinuxBlockedApps);
router.post('/blocked-apps/linux', controller.saveLinuxBlockedApps);
router.patch('/blocked-apps/linux', controller.toggleLinuxApp);

router.get('/block-time-settings/linux', controller.getLinuxTimeSettings);
router.post('/block-time-settings/linux', controller.saveLinuxTimeSettings);

module.exports = router;
