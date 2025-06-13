const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'foccuss.db');

const db = new sqlite3.Database(dbPath);

db.runAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
};

db.getAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

db.allAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS blocked_apps (
      appPath TEXT PRIMARY KEY,
      platform TEXT NOT NULL CHECK(platform IN ('android', 'linux', 'windows')),
      appName TEXT NOT NULL,
      isBlocked BOOLEAN NOT NULL,
      UNIQUE(platform, appPath)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS block_time_settings (
      platform TEXT PRIMARY KEY CHECK(platform IN ('android', 'linux', 'windows')),
      startHour INTEGER NOT NULL,
      startMinute INTEGER NOT NULL,
      endHour INTEGER NOT NULL,
      endMinute INTEGER NOT NULL,
      monday BOOLEAN,
      tuesday BOOLEAN,
      wednesday BOOLEAN,
      thursday BOOLEAN,
      friday BOOLEAN,
      saturday BOOLEAN,
      sunday BOOLEAN,
      isActive BOOLEAN NOT NULL
    )
  `);

  db.get("SELECT COUNT(*) as count FROM block_time_settings", (err, row) => {
    if (err) {
      console.error("Error checking for existing settings:", err);
      return;
    }
    
    if (row.count === 0) {
      db.run(`
        INSERT INTO block_time_settings (
          platform, startHour, startMinute, endHour, endMinute, 
          monday, tuesday, wednesday, thursday, friday, 
          saturday, sunday, isActive)
          VALUES
          ('android', 8, 0, 17, 0, 
          1, 1, 1, 1, 1, 
          0, 0, 1),
          ('linux', 8, 0, 17, 0, 
          0, 1, 1, 1, 0, 
          0, 0, 0),
          ('windows', 9, 30, 20, 55, 
          0, 0, 0, 0, 0, 
          1, 1, 1)
      `, (err) => {
        if (err) {
          console.error("Error inserting default settings:", err);
        } else {
          console.log("Default block time settings inserted successfully");
        }
      });
    }
  });
});

module.exports = db;
