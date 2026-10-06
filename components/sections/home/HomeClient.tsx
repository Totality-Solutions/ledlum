"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Achievements from "./Achievements";
import ProjectSection from "./ProjectSection";
import AutoCarousel from "./AutoCarousel";
import { PopupForm } from "@/components/common/PopupForm";

// --- ASSETS ---
import { cdnImg } from "@/lib/cdn";
import TestimonialSection from "./TesimonialSection";
import type { CmsContent } from "@/lib/cms/defaults";

type HomeClientProps = {
  achievements: CmsContent<"home.achievements">;
  projects: CmsContent<"projects">;
  blogCarousel: CmsContent<"home.blogCarousel">;
  posts: { image: string; slug: string }[];
  testimonials: CmsContent<"home.testimonials">;
  social: { instagram: string; linkedin: string; facebook: string };
};

const HomeClient = ({ achievements, projects, blogCarousel, posts, testimonials, social }: HomeClientProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleTriggerForm = useCallback(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* --- SHARED BACKGROUND LAYER --- */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <Image
          src={blogCarousel.backgroundImage || cdnImg("/images/home/home-bg3.webp")}
          alt="Background"
          fill
          loading="lazy"
          className="object-cover"
        />
      </div>

      {/* --- SHARED TEXTURE OVERLAY --- */}
      {/* <div className="absolute inset-0 -z-10 pointer-events-none opacity-10 md:opacity-30">
        <Image 
          src={cdnImg("/images/about/ledlumline.webp")}
          alt="background texture"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div> */}

      {/* --- CONTENT LAYER --- */}
      {/* Wrapping these 3 ensures they all sit on top of the same background */}
      <div className="relative z-10">
        <Achievements onTriggerForm={handleTriggerForm} content={achievements} />
        <ProjectSection content={projects} social={social} />
        <AutoCarousel content={blogCarousel} posts={posts} />
        <TestimonialSection content={testimonials} />
      </div>

      {/* FLOATING POPUP */}
      {/* {showForm && (
        <div className="fixed bottom-6 right-6 z-[50]">
          <PopupForm 
            isVisible={showForm} 
            onClose={() => setShowForm(false)} 
          />
        </div>
      )} */}
    </div>
  );
};

export default HomeClient;