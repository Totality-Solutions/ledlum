"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [showVideo, setShowVideo] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if this is the first time visiting the site
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    
    if (!hasSeenIntro) {
      // Show preloader immediately on first load
      setShowVideo(true);
      // Prevent scrolling during preloader
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }
  }, []);

  const handleVideoEnd = () => {
    setIsExiting(true);

    setTimeout(() => {
      // Mark that user has seen the intro
      sessionStorage.setItem("hasSeenIntro", "true");
      setShowVideo(false);
      // Re-enable scrolling
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }, 800);
  };

  // Don't render anything if preloader shouldn't show
  if (!showVideo) return null;

  return (
    <div className={`preloader-video-container ${isExiting ? "exit-fade" : ""}`}>
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="fullscreen-video"
      >
        <source src="/videos/Preloader.mp4" type="video/mp4" />
      </video>
    </div>
  );
}