"use client";

import { useState, useRef, useEffect } from "react";
import { Nav } from "@/components/nav";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MeditationPage() {
  // State management
  const [isMeditating, setIsMeditating] = useState(false);
  const [timer, setTimer] = useState(0);
  const [breathState, setBreathState] = useState("Breathe In");
  const [selectedVideo, setSelectedVideo] = useState("/meditation-video1.mp4");

  const videoRef = useRef<HTMLVideoElement>(null);

  // Video options
  const videoOptions = [
    { value : "/sea1.mp4", label: "Calm Ocean Waves" },
    { value: "/meditation-video2.mp4", label: "Forest Ambience" },
    { value: "/meditation-video3.mp4", label: "Guided Breathing Exercise" },
    // Uncomment and adjust path to include your uploaded video:
    // { value: "/WhatsApp Video 2025-03-09 at 00.59.54_316a2ad1.mp4", label: "Uploaded Meditation Video" },
  ];

  // Timer and breathing logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isMeditating) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev + 1);
        setBreathState((prevBreath) => {
          if (timer % 5 === 0) {
            if (prevBreath === "Breathe In") return "Hold";
            if (prevBreath === "Hold") return "Breathe Out";
            return "Breathe In";
          }
          return prevBreath;
        });
      }, 1000);
    } else {
      setTimer(0);
      setBreathState("Breathe In");
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isMeditating, timer]);

  // Start meditation
  const startMeditation = () => {
    setIsMeditating(true);
    videoRef.current?.play();
  };

  // Stop meditation
  const stopMeditation = () => {
    setIsMeditating(false);
    videoRef.current?.pause();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="max-w-4xl mx-auto p-8">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Meditation & Its Benefits</h1>
          <p className="text-lg">
            Meditation helps calm your mind, reduce stress, and improve focus.
            Dedicate a few minutes daily to mindfulness for enhanced mental clarity and emotional stability.
          </p>
        </section>

        <Card className="bg-gray-800 shadow-lg rounded-lg p-6 bg-transparent border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Start Your Meditation Session</CardTitle>
            <p className="text-center text-gray-400">Select a video and begin your journey to inner peace.</p>
          </CardHeader>

          <CardContent>
            {/* Video selection */}
            <div className="mb-4">
              <label htmlFor="video-select" className="block text-gray-300 font-medium mb-2">
                Choose Your Meditation Video:
              </label>
              <select
                id="video-select"
                value={selectedVideo}
                onChange={(e) => setSelectedVideo(e.target.value)}
                className="w-full border border-gray-600 rounded-lg p-2 bg-black text-white"
              >
                {videoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Video player */}
            <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
              <video
                ref={videoRef}
                src={selectedVideo}
                controls
                className="object-cover w-full h-full"
                style={{ maxHeight: "500px" }}
              />
            </div>

            {/* Breathing animation */}
            {isMeditating && (
              <div className="breathing-container">
                <div className="outer-circle">
                  <div className="inner-circle">
                    <span className="breathing-text">{breathState}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Timer display */}
            <div className="text-center text-gray-400 mb-4">
              {isMeditating ? (
                <>
                  Meditation in progress...<br />
                  Session Duration: {timer} seconds
                </>
              ) : (
                "Press Start to begin your meditation session."
              )}
            </div>
          </CardContent>

          {/* Control buttons */}
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={startMeditation} disabled={isMeditating}>
              Start Meditation
            </Button>
            <Button onClick={stopMeditation} disabled={!isMeditating} variant="outline">
              Stop Meditation
            </Button>
          </CardFooter>
        </Card>
      </main>

      {/* Breathing animation styles */}
      <style jsx>{`
        .breathing-container {
          width: 200px;
          height: 200px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .outer-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: breatheAnimation 7.5s infinite ease-in-out;
        }
        .inner-circle {
          width: 80%;
          height: 80%;
          background-color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .breathing-text {
          color: #333;
          font-size: 1.2rem;
          font-weight: bold;
        }
        @keyframes breatheAnimation {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
