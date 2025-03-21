import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import db from "../../lib/database"; // Adjust path as needed

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

// Configure storage for uploaded videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/videos/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `video-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const multerUpload = upload.single("video");

  multerUpload(req, res, function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: err.message });
    }

    try {
      const { title, primary_mood, mood_data } = req.body;
      const filepath = `/videos/${req.file.filename}`;

      // Insert into database
      db.run(
        `INSERT INTO videos (filepath, title, primary_mood, mood_data) VALUES (?, ?, ?, ?)`,
        [filepath, title, primary_mood, mood_data],
        function (err) {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
          }

          res.status(200).json({
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
}
