const db = require('../database/database');

exports.hello = (req, res) => {
  res.json({ message: 'aopa, mundo!' });
};

exports.getAllAppsByPlatform = (req, res) => {
  const { platform } = req.body;
  db.run(`SELECT * FROM blocked_apps WHERE platform = ?`, [platform], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.saveBlockedApps = (req, res) => {
  const { blockedAppDtos } = req.body;
  if (blockedAppDtos.length > 0) {
    for (let idxApp = 0; idxApp < blockedAppDtos.length; idxApp++) {
      const app = blockedAppDtos[idxApp];

      db.run(`INSERT OR REPLACE INTO blocked_apps (platform, app_name, app_path, is_blocked) VALUES (?, ?, ?, ?)`,
        [app.platform, app.appName, app.packageName, app.isBlocked], (err, rows) => {
          if (err) return res.status(500).json({ success: false, message: err.message });
          return res.status(201).json({ success: true, message: rows });
        }
      )
    }
  } else {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }
}

exports.blockApp = (req, res) => {
  const { id } = req.params;
  db.run(`UPDATE blocked_apps SET is_blocked = 1 WHERE id = ?`, [id], function (err, rows) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json();
  });
};

exports.unblockApp = (req, res) => {
  const { id } = req.params;
  db.run('UPDATE blocked_apps SET is_blocked = 0 WHERE id = ?', [id], function (err, rows) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json();
  });
};
