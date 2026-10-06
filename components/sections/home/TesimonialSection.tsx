"use client";

import React from "react";
import PressGrid from "@/components/common/PressGrid";
import { cdnImg } from "@/lib/cdn";
import type { CmsContent } from "@/lib/cms/defaults";

function getYouTubeThumbnail(url: string): string {
  try {
    // Regular expression to match various YouTube URL formats and capture the 11-character ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (videoId) {
      // hqdefault (480×360) stays sharp at the larger card size; mqdefault
      // (320×180) looked blurry. Its letterbox bars are cropped by object-cover.
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  } catch {
    // Fallback if processing fails
  }
  return cdnImg("/images/fallback-thumbnail.jpg");
}

export default function TestimonialSection({ content }: { content: CmsContent<"home.testimonials"> }) {
  const data = (content.items || []).map((item) => ({
    category: item.category,
    title: item.title,
    author: item.author,
    date: item.date,
    slug: item.videoUrl,
    image: getYouTubeThumbnail(item.videoUrl),
  }));

  return (
    <PressGrid
      data={data}
      titleMain={content.title}
      rightLabel={content.rightLabel}
    />
  );
}
