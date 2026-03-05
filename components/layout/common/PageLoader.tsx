"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);

      // Disable scroll
        // Force page to top
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    };

    const handleStop = () => {
      setTimeout(() => {
        setIsLoading(false);

        // Enable scroll again
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.style.touchAction = "";
      }, 800);
    };

    handleStart();
    handleStop();

    return () => {
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