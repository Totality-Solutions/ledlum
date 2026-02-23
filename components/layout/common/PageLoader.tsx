"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If it's the very first load, we let the Preloader (video) handle it.
    // We only trigger this SVG loader on actual navigation changes.
    const handleStart = () => {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    };

    const handleStop = () => {
      // Small delay to ensure the new page has actually rendered
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
      }, 800);
    };

    handleStart();
    handleStop();

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [pathname, searchParams]);

  return (
    <div className={`loader-overlay ${!isLoading ? "hidden-loader" : ""} overflow-y-none hide-scrollbar no-scroll `}>
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