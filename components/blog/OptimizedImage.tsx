"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: string;
  sizes?: string;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  priority = false, 
  className = "", 
  aspectRatio = "aspect-[16/10]",
  sizes = "(max-width: 390px) 100vw, (max-width: 768px) 50vw, 33vw"
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Generate a simple blur data URL for placeholder
  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A";

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${aspectRatio} ${className}`}>
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
          <div className="text-zinc-600 text-sm">Image unavailable</div>
        </div>
      ) : (
        <>
          {/* Loading skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
          )}
          
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-all duration-700 ${
              isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={blurDataURL}
            onLoad={() => setIsLoading(false)}
            onError={() => setError(true)}
          />
        </>
      )}
    </div>
  );
}
