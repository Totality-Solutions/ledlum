"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "@/lib/icons";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

import { cdnImg } from "@/lib/cdn";

const PROJECTS = [
  { id: 1, img: cdnImg("/images/home/project/project1.jpeg") },
  { id: 2, img: cdnImg("/images/home/project/project2.jpeg") },
  { id: 3, img: cdnImg("/images/home/project/project3.jpeg") },
  { id: 4, img: cdnImg("/images/home/project/project4.jpeg") },
  { id: 5, img: cdnImg("/images/home/project/project5.jpeg") },
  { id: 6, img: cdnImg("/images/home/project/project6.jpeg") },
  { id: 7, img: cdnImg("/images/home/project/project7.jpeg") },
  { id: 8, img: cdnImg("/images/home/project/project8.jpeg") },
  { id: 9, img: cdnImg("/images/home/project/project9.jpeg") },
  { id: 10, img: cdnImg("/images/home/project/project10.jpeg") },
  { id: 11, img: cdnImg("/images/home/project/project11.jpeg") },
];

const ASPECT_RATIOS = [3 / 4, 1 / 1, 4 / 5, 3 / 4, 2 / 3, 4 / 3, 3 / 4, 1 / 1, 3 / 5, 4 / 5, 3 / 4];

export default function ProjectGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const open = (id: number) => setSelected(id);
  const close = () => setSelected(null);

  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const goNext = useCallback(() => {
    setSelected((prev) => {
      if (prev === null) return null;
      const next = prev + 1;
      return next > PROJECTS.length ? 1 : next;
    });
  }, []);

  const goPrev = useCallback(() => {
    setSelected((prev) => {
      if (prev === null) return null;
      const prevId = prev - 1;
      return prevId < 1 ? PROJECTS.length : prevId;
    });
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, goNext, goPrev]);

  const current = PROJECTS.find((p) => p.id === selected);

  return (
    <Section className="bg-black min-h-screen">
      <Container>
        <div className="mb-14">
          <h1 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
            Our.
          </h1>
          <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white">
            Projects.
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {PROJECTS.map((project) => {
            const ratio = ASPECT_RATIOS[project.id - 1] || 3 / 4;
            return (
              <button
                key={project.id}
                onClick={() => open(project.id)}
                className="break-inside-avoid mb-4 relative w-full overflow-hidden group cursor-pointer focus:outline-none rounded-[12px]"
                style={{ aspectRatio: ratio }}
              >
                <Image
                  src={project.img}
                  alt="Project"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-[12px]" />
              </button>
            );
          })}
        </div>
      </Container>

      {selected !== null && current && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={24} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={28} className="text-white" />
          </button>

          <div
            className="relative w-[90vw] h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.img}
              alt="Project"
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </Section>
  );
}
