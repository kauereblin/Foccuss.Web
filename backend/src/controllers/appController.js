const db = require('../database/database');

exports.hello = (req, res) => {
  res.json({ message: 'aopa, mundo!' });
};

exports.getAllAndroid = async (req, res) => {
  try {
    const blockedApps = await db.allAsync(`SELECT * FROM blocked_apps WHERE platform = 'android'`);
    const settings = await db.allAsync(`SELECT * FROM block_time_settings WHERE platform = 'android'`);
    settings[0].monday    = settings[0].monday    == 1;
    settings[0].tuesday   = settings[0].tuesday   == 1;
    settings[0].wednesday = settings[0].wednesday == 1;
    settings[0].thursday  = settings[0].thursday  == 1;
    settings[0].friday    = settings[0].friday    == 1;
    settings[0].saturday  = settings[0].saturday  == 1;
    settings[0].sunday    = settings[0].sunday    == 1;
    settings[0].isActive  = settings[0].isActive  == 1;
    
    return res.status(200).json({ blockTimeSettings: settings[0], blockedApps: blockedApps});
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAndroidBlockedApps = async (req, res) => {
  try {
    const blockedApps = await db.allAsync(`SELECT * FROM blocked_apps WHERE platform = 'android'`);
    return res.status(200).json(blockedApps);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.saveAndroidBlockedApps = async (req, res) => {
  const blockedAppDtos = req.body;
  if (blockedAppDtos.length === 0) {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }
  
  try {
    for (let idxApp = 0; idxApp < blockedAppDtos.length; idxApp++) {
      const app = blockedAppDtos[idxApp];
      await db.runAsync(
        `INSERT OR REPLACE INTO blocked_apps (platform, appName, appPath, isBlocked) VALUES ('android', ?, ?, ?)`,
        [app.appName, app.packageName, app.isBlocked]
      );
    }
    return res.status(201).json({ success: true, message: "Created" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleAndroidApp = async (req, res) => {
  const { appPath } = req.body;
  try {
    const result = await db.runAsync(
      `UPDATE blocked_apps SET isBlocked = NOT isBlocked WHERE platform = 'android' AND appPath = ?`, 
      [appPath]
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.saveAndroidTimeSettings = async (req, res) => {
  const settings = req.body;
  try {
    await db.runAsync(
      `INSERT OR REPLACE INTO block_time_settings (
        platform, startHour, startMinute, endHour, endMinute, 
        monday, tuesday, wednesday, thursday, friday, saturday, sunday, isActive)
      VALUES ('android', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        settings.startHour, settings.startMinute, settings.endHour, settings.endMinute, 
        settings.monday, settings.tuesday, settings.wednesday, settings.thursday, 
        settings.friday, settings.saturday, settings.sunday, settings.isActive
      ]
    );
    return res.status(201).json({ success: true, message: "Ok" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAndroidTimeSettings = async (req, res) => {
  try {
    const settings = await db.allAsync(`SELECT * FROM block_time_settings WHERE platform = 'android'`);
    settings[0].monday    = settings[0].monday    == 1;
    settings[0].tuesday   = settings[0].tuesday   == 1;
    settings[0].wednesday = settings[0].wednesday == 1;
    settings[0].thursday  = settings[0].thursday  == 1;
    settings[0].friday    = settings[0].friday    == 1;
    settings[0].saturday  = settings[0].saturday  == 1;
    settings[0].sunday    = settings[0].sunday    == 1;
    settings[0].isActive  = settings[0].isActive  == 1;
    return res.status(200).json(settings[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Windows
exports.getAllWindows = async (req, res) => {
  try {
    const blockedApps = await db.allAsync(`SELECT * FROM blocked_apps WHERE platform = 'windows'`);
    const settings = await db.allAsync(`SELECT * FROM block_time_settings WHERE platform = 'windows'`);
    settings[0].monday    = settings[0].monday    == 1;
    settings[0].tuesday   = settings[0].tuesday   == 1;
    settings[0].wednesday = settings[0].wednesday == 1;
    settings[0].thursday  = settings[0].thursday  == 1;
    settings[0].friday    = settings[0].friday    == 1;
    settings[0].saturday  = settings[0].saturday  == 1;
    settings[0].sunday    = settings[0].sunday    == 1;
    settings[0].isActive  = settings[0].isActive  == 1;
    
    return res.status(200).json({ blockTimeSettings: settings[0], blockedApps: blockedApps});
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getWindowsBlockedApps = async (req, res) => {
  try {
    const blockedApps = await db.allAsync(`SELECT * FROM blocked_apps WHERE platform = 'windows'`);
    return res.status(200).json(blockedApps);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.saveWindowsBlockedApps = async (req, res) => {
  const blockedAppDtos = req.body;
  if (blockedAppDtos.length === 0) {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }
  
  try {
    for (let idxApp = 0; idxApp < blockedAppDtos.length; idxApp++) {
      const app = blockedAppDtos[idxApp];
      await db.runAsync(
        `INSERT OR REPLACE INTO blocked_apps (platform, appName, appPath, isBlocked) VALUES ('windows', ?, ?, ?)`,
        [app.appName, app.appPath, app.isBlocked]
      );
    }
    return res.status(201).json({ success: true, message: "Created" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleWindowsApp = async (req, res) => {
  const { appPath } = req.body;
  try {
    const result = await db.runAsync(
      `UPDATE blocked_apps SET isBlocked = NOT isBlocked WHERE platform = 'windows' AND appPath = ?`, 
      [appPath]
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.saveWindowsTimeSettings = async (req, res) => {
  const settings = req.body;
  try {
    await db.runAsync(
      `INSERT OR REPLACE INTO block_time_settings (
        platform, startHour, startMinute, endHour, endMinute, 
        monday, tuesday, wednesday, thursday, friday, saturday, sunday, isActive)
      VALUES ('windows', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        settings.startHour, settings.startMinute, settings.endHour, settings.endMinute, 
        settings.monday, settings.tuesday, settings.wednesday, settings.thursday, 
        settings.friday, settings.saturday, settings.sunday, settings.isActive
      ]
    );
    return res.status(201).json({ success: true, message: "Ok" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getWindowsTimeSettings = async (req, res) => {
  try {
    const settings = await db.allAsync(`SELECT * FROM block_time_settings WHERE platform = 'windows'`);
    settings[0].monday    = settings[0].monday    == 1;
    settings[0].tuesday   = settings[0].tuesday   == 1;
    settings[0].wednesday = settings[0].wednesday == 1;
    settings[0].thursday  = settings[0].thursday  == 1;
    settings[0].friday    = settings[0].friday    == 1;
    settings[0].saturday  = settings[0].saturday  == 1;
    settings[0].sunday    = settings[0].sunday    == 1;
    settings[0].isActive  = settings[0].isActive  == 1;
    return res.status(200).json(settings[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Linux
exports.getAllLinux = async (req, res) => {
  try {
    const blockedApps = await db.allAsync(`SELECT * FROM blocked_apps WHERE platform = 'linux'`);
    const settings = await db.allAsync(`SELECT * FROM block_time_settings WHERE platform = 'linux'`);
    settings[0].monday    = settings[0].monday    == 1;
    settings[0].tuesday   = settings[0].tuesday   == 1;
    settings[0].wednesday = settings[0].wednesday == 1;
    settings[0].thursday  = settings[0].thursday  == 1;
    settings[0].friday    = settings[0].friday    == 1;
    settings[0].saturday  = settings[0].saturday  == 1;
    settings[0].sunday    = settings[0].sunday    == 1;
    settings[0].isActive  = settings[0].isActive  == 1;
    
    return res.status(200).json({ blockTimeSettings: settings[0], blockedApps: blockedApps});
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getLinuxBlockedApps = async (req, res) => {
  try {
    const blockedApps = await db.allAsync(`SELECT * FROM blocked_apps WHERE platform = 'linux'`);
    return res.status(200).json(blockedApps);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.saveLinuxBlockedApps = async (req, res) => {
  const blockedAppDtos = req.body;
  if (blockedAppDtos.length === 0) {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }
  
  try {
    for (let idxApp = 0; idxApp < blockedAppDtos.length; idxApp++) {
      const app = blockedAppDtos[idxApp];
      await db.runAsync(
        `INSERT OR REPLACE INTO blocked_apps (platform, appName, appPath, isBlocked) VALUES ('linux', ?, ?, ?)`,
        [app.appName, app.appPath, app.isBlocked]
      );
    }
    return res.status(201).json({ success: true, message: "Created" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleLinuxApp = async (req, res) => {
  const { appPath } = req.body;
  try {
    const result = await db.runAsync(
      `UPDATE blocked_apps SET isBlocked = NOT isBlocked WHERE platform = 'linux' AND appPath = ?`, 
      [appPath]
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.saveLinuxTimeSettings = async (req, res) => {
  const settings = req.body;
  try {
    await db.runAsync(
      `INSERT OR REPLACE INTO block_time_settings (
        platform, startHour, startMinute, endHour, endMinute, 
        monday, tuesday, wednesday, thursday, friday, saturday, sunday, isActive)
      VALUES ('linux', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        settings.startHour, settings.startMinute, settings.endHour, settings.endMinute, 
        settings.monday, settings.tuesday, settings.wednesday, settings.thursday, 
        settings.friday, settings.saturday, settings.sunday, settings.isActive
      ]
    );
    return res.status(201).json({ success: true, message: "Ok" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getLinuxTimeSettings = async (req, res) => {
  try {
    const settings = await db.allAsync(`SELECT * FROM block_time_settings WHERE platform = 'linux'`);
    settings[0].monday    = settings[0].monday    == 1;
    settings[0].tuesday   = settings[0].tuesday   == 1;
    settings[0].wednesday = settings[0].wednesday == 1;
    settings[0].thursday  = settings[0].thursday  == 1;
    settings[0].friday    = settings[0].friday    == 1;
    settings[0].saturday  = settings[0].saturday  == 1;
    settings[0].sunday    = settings[0].sunday    == 1;
    settings[0].isActive  = settings[0].isActive  == 1;
    return res.status(200).json(settings[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
