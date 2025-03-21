"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/get-videos");
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading video entries...</div>;
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          No video diary entries yet.
        </p>
        <p>Record your first video diary entry to see it here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video, index) => {
        // Safely parse mood_data
        let moodData = {};
        try {
          if (video.mood_data && typeof video.mood_data === "string") {
            moodData = JSON.parse(video.mood_data);
          }
        } catch (e) {
          console.error("Error parsing mood data:", e);
        }

        return (
          <Card key={index} className="overflow-hidden">
            <video
              src={video.filepath}
              controls
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">
                  {new Date(video.recorded_at || new Date()).toLocaleString()}
                </h3>
                <Badge>{video.primary_mood || "Unknown"}</Badge>
              </div>

              {/* Display insights safely */}
              <div className="text-sm text-muted-foreground">
                {moodData.insights && typeof moodData.insights === "string"
                  ? moodData.insights
                  : "Mood analysis completed"}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
