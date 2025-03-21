const sqlite3 = require("sqlite3").verbose();

// Open a database connection
const db = new sqlite3.Database("./video_diary.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create the videos table
db.run(
  `CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filepath TEXT NOT NULL,
  title TEXT NOT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  primary_mood TEXT,
  mood_data TEXT
)`,
  (err) => {
    if (err) {
      console.error("Error creating table", err);
    } else {
      console.log("Videos table created or already exists.");
    }
  }
);

module.exports = db;
