const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'foccuss.db');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS blocked_apps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL CHECK(platform IN ('android', 'linux', 'windows')),
      app_name TEXT NOT NULL,
      app_path TEXT NOT NULL,
      is_blocked BOOLEAN NOT NULL,
      UNIQUE(platform, app_path)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS block_time_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL CHECK(platform IN ('android', 'linux', 'windows')),
      start_hour INTEGER NOT NULL,
      start_minute INTEGER NOT NULL,
      end_hour INTEGER NOT NULL,
      end_minute INTEGER NOT NULL,
      monday BOOLEAN,
      tuesday BOOLEAN,
      wednesday BOOLEAN,
      thursday BOOLEAN,
      friday BOOLEAN,
      saturday BOOLEAN,
      sunday BOOLEAN,
      is_active BOOLEAN NOT NULL
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
          platform, start_hour, start_minute, end_hour, end_minute, 
          monday, tuesday, wednesday, thursday, friday, 
          saturday, sunday, is_active)
          VALUES
          ('android', 0, 0, 0, 0, 
          1, 1, 1, 1, 1, 
          0, 0, 1),
          ('linux', 0, 0, 0, 0, 
          1, 1, 1, 1, 1, 
          0, 0, 1),
          ('windows', 0, 0, 0, 0, 
          1, 1, 1, 1, 1, 
          0, 0, 1)
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
