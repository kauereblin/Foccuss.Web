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
// router.get('/linux', controller.getAllLinux);

// router.get('/blocked-apps/linux', controller.getLinuxBlockedApps);
// router.post('/blocked-apps/linux', controller.saveLinuxBlockedApps);
// router.patch('/blocked-apps/linux', controller.toggleLinuxApp);

// router.get('/block-time-settings/linux', controller.getLinuxTimeSettings);
// router.post('/block-time-settings/linux', controller.saveLinuxTimeSettings);

module.exports = router;

// i need to create an API to export the local data. This application is mirrored in multiple platforms, Android and Windows. I made a web application to centralize it and need the data of this linux app to be available in the web to be possible to configure the platforms from anywhere. How can i create an API to export this data base to save it on web? The application must syncronize the blocked app list when it changes and when blocked time settings are saved too. My endpoints are /blocked-apps/linux and /block-time-settings/linux

// i need to create a request method in the launch of the app to request the up to date data of the app list and time settings in the web server. and i need to create a button in the mainactivity to syncronize the data from the web, overriding the local data with the web data that is most up to date.