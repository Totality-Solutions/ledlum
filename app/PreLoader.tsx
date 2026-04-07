"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [showVideo, setShowVideo] = useState<boolean | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    if (hasSeenIntro) {
      setShowVideo(false);
      onComplete(); // Reveal site immediately
    } else {
      setShowVideo(true);
      document.documentElement.classList.add("no-scroll");
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    setIsExiting(true);
    setTimeout(() => {
      sessionStorage.setItem("hasSeenIntro", "true");
      setShowVideo(false);
      document.documentElement.classList.remove("no-scroll");
      onComplete(); // Reveal site after video
    }, 800);
  };

  if (showVideo === null || showVideo === false) return null;

  return (
    <div className={`preloader-video-container ${isExiting ? "exit-fade" : ""}`} style={{ backgroundColor: '#000'  }}>
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


