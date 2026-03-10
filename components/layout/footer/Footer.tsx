"use client";

import { Container } from "@/components/layout/Container";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Send } from "lucide-react";
import logo from "../../../public/images/logo/ledlum-logo-footer.png";

const footerColumns = [
  {
    title: "About us",
    links: ["Contact", "Our Work", "Studio Notes", "About the Studio"],
  },
  {
    title: "Our Services",
    links: [
      "Architectural Lighting",
      "Industrial Solutions",
      "Smart Controls",
      "Sustainability",
    ],
  },
  {
    title: "Our Services",
    links: [
      "Bespoke Design",
      "Energy Audits",
      "Custom Fabrication",
      "Technical Support",
    ],
  },
];

const socialIcons = [Instagram, Send, Linkedin, Facebook];

export default function Footer() {
  return (
    <footer className="relative pt-6 md:pt-10 px-4 md:px-6 overflow-hidden flex flex-col min-h-screen lg:min-h-[90vh] transition-colors duration-500">

      {/* Watermark Logo */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/images/about/footer-logo.png"
          alt="Ledlum Watermark"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* Footer Card */}
      <div className="relative z-10 w-full mx-auto rounded-[24px] max-w-[96%] overflow-hidden bg-[#9d9272] shadow-2xl mb-10 md:mb-20">

        {/* Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-80 mix-blend-multiply">
          <Image
            src="/images/about/footercard.png"
            alt="Texture"
            fill
            className="object-cover"
          />
        </div>

        <Container className="relative z-20 py-12 md:py-16 lg:py-20 !max-w-none px-6 md:px-[6vw]">

          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24">

            {/* Left Section */}
            <div className="flex flex-col justify-between max-w-sm w-full">

              <div>

                <Link href="/" className="inline-block mb-8 hover:opacity-90 transition">
                  <Image
                    src={logo}
                    alt="Ledlum Logo"
                    width={200}
                    height={50}
                    className="object-contain"
                    priority
                  />
                </Link>

                <p className="text-body-sm leading-relaxed text-white font-pop font-regular max-w-[320px]">
                  Enhancing environments through energy efficiency, aesthetic appeal,
                  and high-performance architectural lighting solutions.
                </p>

                {/* Social Icons */}
                <div className="flex gap-6 mt-10">
                  {socialIcons.map((Icon, i) => (
                    <Link key={i} href="#" className="text-white hover:opacity-60 transition">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </Link>
                  ))}
                </div>

              </div>

              {/* Desktop Copyright */}
              <p className="hidden lg:block mt-7 text-body-xxs tracking-wide text-white/70 font-pop font-medium">
                © 2026 LEDLUM. All rights reserved.
              </p>

            </div>

            {/* Right Columns */}
            <div className="flex flex-wrap md:flex-nowrap gap-x-12 lg:gap-x-20 gap-y-12 w-full lg:w-auto">

              {footerColumns.map((column, i) => (
  <div key={i} className="min-w-[140px]">
                  <h4 className="text-body font-medium mb-6 font-pop text-white tracking-wide font-pop font-regular">
                    {column.title}
                  </h4>

                  <ul className="space-y-4">
                    {column.links.map((link) => (
                      <li key={link}>
                        <Link
                          href="#"
                          className="text-body-sm text-white/70 hover:text-white transition-colors font-pop font-regular"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>

                </div>
              ))}

            </div>

            {/* Mobile Copyright */}
            <div className="lg:hidden w-full mt-4 pt-8 border-t border-white/10">
              <p className="text-body-xxs tracking-wide text-white/70 font-pop font-medium">
                © 2026 LEDLUM. Technical Brilliance.
              </p>
            </div>

          </div>

        </Container>

      </div>

      <div className="flex-grow min-h-[50px] lg:min-h-[100px]" />

    </footer>
  );
}