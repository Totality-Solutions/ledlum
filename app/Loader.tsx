"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Loader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const previousPath = useRef(pathname);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only show loader when pathname actually changes (not on initial load)
    if (pathname !== previousPath.current) {
      // Start loading
      setIsLoading(true);
      
      // Force page to top and disable scroll
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      // Clear any existing timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      // Stop loading after a delay to simulate data loading
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        
        // Re-enable scroll
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.style.touchAction = "";
        
        // Update previous path
        previousPath.current = pathname;
      }, 800);
    }

    return () => {
      // Cleanup timeout if component unmounts
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      
      // Ensure scroll is re-enabled on cleanup
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [pathname, searchParams]);

  return (
    <div className={`loader-overlay ${!isLoading ? "hidden-loader" : ""}`}>
      <div className="loader-animated-svg">
        <Image
          src="/images/logo/loader_logo.svg"
          alt="Loading..."
          width={120}
          height={120}
          priority
        />
      </div>
    </div>
  );
}