// pages/api/get-videos.js
import db from "../../lib/database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const videos = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM videos ORDER BY recorded_at DESC", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
