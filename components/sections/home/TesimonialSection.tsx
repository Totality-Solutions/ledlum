"use client";

import React from "react";
import PressGrid from "@/components/common/PressGrid";

function getYouTubeThumbnail(url: string): string {
  try {
    // Regular expression to match various YouTube URL formats and capture the 11-character ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }
  } catch {
    // Fallback if processing fails
  }
  return "/images/fallback-thumbnail.jpg";
}

const RAW_INTERVIEW_DATA = [
  {
    category: "Designers",
    title: "Illuminating Spaces with LMT Series",
    author: "LEDLUM LIGHTING SOLUTIONS",
    date: "12 Mar, 2026",
    slug: "https://youtu.be/m7-HN9NkJVE?si=bWPSxtvVszWKw2WG"
  },
  {
    category: "Architects",
    title: "Pendant Lights",
    author: "LEDLUM LIGHTING SOLUTIONS",
    date: "05 Mar, 2026",
    slug: "https://youtu.be/92gcYZd5tGs?si=ZeSN0wDSGhr5N8qN"
  },
  {
    category: "Visionaries",
    title: "Automation",
    author: "LEDLUM LIGHTING SOLUTIONS",
    date: "28 Feb, 2026",
    slug: "https://youtu.be/QO4PFtIbBQc?si=P7I7_co_st0U64M2"
  },
  {
    category: "Builders",
    title: "Chennai Experience Center",
    author: "LEDLUM LIGHTING SOLUTIONS",
    date: "20 Feb, 2026",
    slug: "https://youtu.be/wnJTR2609UM?si=-V3zK7EjaC2rpmpC"
  },
  {
    category: "Builders",
    title: "Overseas Showroom in Riyadh",
    author: "LEDLUM LIGHTING SOLUTIONS",
    date: "20 Feb, 2026",
    slug: "https://youtu.be/paGEqsMGKGo?si=LwOEx7LF_QNF7sqZ"
  },
];

const TESTIMONIAL_DATA = RAW_INTERVIEW_DATA.map((item) => ({
  ...item,
  image: getYouTubeThumbnail(item.slug),
}));

export default function TestimonialSection() {
  return (
    <PressGrid
      data={TESTIMONIAL_DATA}
      titleMain="Testimonials"
      rightLabel="Dialogue Series"
    />
  );
}