"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [showVideo, setShowVideo] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    if (!hasSeenIntro) {
      setShowVideo(true);
      document.documentElement.classList.add("no-scroll"); 
    }
  }, []);

  const handleVideoEnd = () => {
    setIsExiting(true);

    setTimeout(() => {
      sessionStorage.setItem("hasSeenIntro", "true");
      setShowVideo(false);
      document.documentElement.classList.remove("no-scroll");
    }, 800);
  };

  if (!showVideo) return null;

  return (
    <div className={`preloader-video-container ${isExiting ? "exit-fade" : ""} overflow-y-none hide-scrollbar no-scroll`}>
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