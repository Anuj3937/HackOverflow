const express = require("express");
const db = require("./database");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// API endpoint to save video metadata
app.post("/api/videos", (req, res) => {
  const { filepath, title, primary_mood, mood_data } = req.body;
  db.run(
    `INSERT INTO videos (filepath, title, primary_mood, mood_data) VALUES (?, ?, ?, ?)`,
    [filepath, title, primary_mood, mood_data],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        message: "Video saved successfully",
        id: this.lastID,
      });
    }
  );
});

// API endpoint to get all videos
app.get("/api/videos", (req, res) => {
  db.all(`SELECT * FROM videos ORDER BY recorded_at DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Configure storage for uploaded videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/videos/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `video-${uniqueSuffix}.mp4`);
  },
});

const upload = multer({ storage: storage });

// API endpoint to handle video upload
app.post("/api/save-video", upload.single("video"), (req, res) => {
  try {
    const { title, primary_mood, mood_data } = req.body;
    const filepath = `/videos/${req.file.filename}`;

    db.run(
      `INSERT INTO videos (filepath, title, primary_mood, mood_data) VALUES (?, ?, ?, ?)`,
      [filepath, title, primary_mood, mood_data],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({
          success: true,
          id: this.lastID,
          filepath,
        });
      }
    );
  } catch (error) {
    console.error("Error saving video:", error);
    res.status(500).json({ error: "Failed to save video" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
