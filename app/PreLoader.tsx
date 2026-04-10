// "use client";

// import { useEffect, useState } from "react";

// export default function Preloader({ onComplete }: { onComplete: () => void }) {
//   const [showVideo, setShowVideo] = useState<boolean | null>(null);
//   const [isExiting, setIsExiting] = useState(false);

//   useEffect(() => {
//     const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

//     if (hasSeenIntro) {
//       setShowVideo(false);
//       onComplete(); // Reveal site immediately
//     } else {
//       setShowVideo(true);
//       document.documentElement.classList.add("no-scroll");
//     }
//   }, [onComplete]);

//   const handleVideoEnd = () => {
//     setIsExiting(true);
//     setTimeout(() => {
//       sessionStorage.setItem("hasSeenIntro", "true");
//       setShowVideo(false);
//       document.documentElement.classList.remove("no-scroll");
//       onComplete(); // Reveal site after video
//     }, 500);
//   };

//   if (showVideo === null || showVideo === false) return null;

//   return (
//     <div className={`preloader-video-container ${isExiting ? "exit-fade" : ""}`} style={{ backgroundColor: '#000'  }}>
//       <video
//         autoPlay
//         muted
//         playsInline
//         onEnded={handleVideoEnd}
//         className="fullscreen-video"
//       >
//         <source src="/videos/Preloader.mp4" type="video/mp4" />
//       </video>
//     </div>
//   );
// }



"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finishLoading = useCallback(() => {
    if (isExiting) return; // Prevent double triggers
    setIsExiting(true);
    
    // Snappier transition: 400ms instead of 800ms
    setTimeout(() => {
      sessionStorage.setItem("hasSeenIntro", "true");
      setShowVideo(false);
      document.documentElement.classList.remove("no-scroll");
      onComplete();
    }, 400);
  }, [isExiting, onComplete]);

  useEffect(() => {
    if (sessionStorage.getItem("hasSeenIntro")) {
      onComplete();
    } else {
      setShowVideo(true);
      document.documentElement.classList.add("no-scroll");
    }
  }, [onComplete]);

  // Speed boost: Increase playback speed once the video starts
  const handleMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.95; // Play 25% faster
    }
  };

  if (!showVideo) return null;

  return (
    <div 
      className={`preloader-video-container ${isExiting ? "exit-fade" : ""}`} 
      style={{ 
        backgroundColor: '#000', 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9999,
        cursor: 'pointer' // Hint to the user they can click
      }}
      onClick={finishLoading} // FASTEST OPTION: Allow user to click to skip
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onLoadedMetadata={handleMetadata}
        onEnded={finishLoading}
        className="fullscreen-video"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        {/* The #t=0.1 trick forces the browser to load the first frame immediately */}
        <source src="/videos/Preloader.mp4#t=0.1" type="video/mp4" />
      </video>

      {/* Skip Hint */}
      {/* <div style={{ 
        position: 'absolute', bottom: '30px', width: '100%', 
        textAlign: 'center', color: 'rgba(255,255,255,0.4)', 
        fontSize: '12px', letterSpacing: '1px' 
      }}>
        TAP TO SKIP
      </div> */}
    </div>
  );
}


