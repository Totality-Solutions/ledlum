"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { GetInTouch } from "@/components/layout/footer/GetInTouch";
import Section from "@/components/layout/Section";
import { Linkedin } from "lucide-react";

import TeamBg from "@/public/images/about/ledlumbox.png";

export default function Team() {

  const team = [
    {
      name: "Sumeet Malhotra",
      role: "Director & Founder - Ledlum",
      image: "https://placehold.co/400x400.png?text=Sumeet+Malhotra",
    },
    {
      name: "Abheek Malhotra",
      role: "Director & Founder - Astara",
      image: "https://placehold.co/400x400.png?text=Abheek+Malhotra",
    },
    {
      name: "Abhav Malhotra",
      role: "Director & Founder - Volaris",
      image: "https://placehold.co/400x400.png?text=Abhav+Malhotra",
    },
    {
      name: "Pooja Malhotra",
      role: "Director & Founder - Ledlum/Artizan",
      image: "https://placehold.co/400x400.png?text=Pooja+Malhotra",
    },
    {
      name: "Sanjay Sethi",
      role: "",
      image: "https://placehold.co/400x400.png?text=Sanjay+Sethi",
    },
  ];

  return (
    <Section className="relative text-white overflow-hidden ">

      {/* Background Image Layer (same approach as Achievements section) */}
      <Image
        src={TeamBg}
        alt="Background"
        fill
        priority
        className="object-cover -z-[20]"
      />

      <Container className="relative z-10 space-y-5 ">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-start pt-10 pr-4 w-full">
              <h2 className="font-bai leading-tight text-white mb-6">
                <span className="block text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
                  Meet Our.
                </span>
                <span className="block text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white">
                  Visionaries.
                </span>
              </h2>

              <p className="text-white lg:text-desk-section font-regular tracking-none font-pop max-w-[380px]">
                A multidisciplinary team of lighting specialists focused on delivering architectural lighting systems engineered for performance and design excellence.
              </p>
            </div>
            <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-[25px]"
          >
            <source src="/videos/about.mp4" type="video/mp4" />
          </video>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* HEADER */}

          {/* TEAM CARDS */}
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative bg-[#111111] p-6 md:p-8 flex flex-col rounded-[25px]"
            >
              {/* IMAGE */}
              {/* <div className="relative aspect-square overflow-hidden mb-6 rounded-[24px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div> */}

              {/* TEXT */}
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-white lg:text-desk-section font-medium tracking-none font-pop mb-1">
                    {member.name}
                  </h4>

                  <p className="lg:text-body-sm font-regular font-pop text-zinc-500 font-light">
                    {member.role}
                  </p>
                </div>

                {/* LINKEDIN */}
                {/* <a
                  href="#"
                  className="bg-[#0077B5] p-1.5 rounded-sm mb-1 hover:scale-110 transition-transform flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn Profile`}
                >
                  <Linkedin className="w-3.5 h-3.5 text-white fill-current" />
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}