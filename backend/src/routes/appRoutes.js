const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController');

router.get('/', controller.hello);
router.post('/blocked-apps', controller.saveBlockedApps);
router.put('/block-time-settings', controller.blockApp);
router.patch('/apps/:id', controller.unblockApp);

module.exports = router;
