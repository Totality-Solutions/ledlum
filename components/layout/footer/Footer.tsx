

"use client";

import { Container } from "@/components/layout/Container";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Send } from "lucide-react";
import logo from "../../../public/images/logo/ledlum-logo-footer.png";
import PrivacyModal from "@/components/layout/common/PrivacyModal";
import TermsModal from "@/components/layout/common/TermsModal"; // Import your new Terms Modal
import { useEffect, useState } from "react";

const footerColumns = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
    ],
  },
  {
    title: "Our Products",
    links: [
      { name: "LED Lum Outdoor", href: "/product/outdoor" },
      { name: "LED Lum Indoor", href: "/product/indoor" },
      { name: "Artizan", href: "/product/artizan" },
      { name: "Astara", href: "/product/astara" },
      { name: "Volaris", href: "/product/volaris" },
      { name: "Klewe", href: "/product/klewe" },
    ],
  },
];

const socialIcons = [
  { Icon: Instagram, href: "https://instagram.com/yourprofile" },
  { Icon: Send, href: "mailto:hello@ledlum.com" },
  { Icon: Linkedin, href: "https://linkedin.com/company/yourprofile" },
  { Icon: Facebook, href: "https://facebook.com/yourprofile" },
];

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false); // New Terms State

  // Unified Scroll Lock Effect
  useEffect(() => {
    if (isPrivacyOpen || isTermsOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isPrivacyOpen, isTermsOpen]);

  return (
    <footer className="rounded-[24px] relative pt-6 md:pt-10 px-4 md:px-6 overflow-hidden flex flex-col lg:min-h-[90vh] transition-colors duration-500">
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
        <div className="rounded-[24px] absolute inset-0 pointer-events-none opacity-80 mix-blend-multiply">
          <Image src="/images/about/footercard.png" alt="Texture" fill className="object-cover" />
        </div>

        <Container className="relative z-20 py-12 md:py-16 lg:py-20 !max-w-none px-6 md:px-[6vw]">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24">
            {/* Left Section */}
            <div className="flex flex-col justify-between max-w-sm w-full">
              <div>
                <Link href="/" className="inline-block mb-8 hover:opacity-90 transition">
                  <Image src={logo} alt="Ledlum Logo" width={200} height={50} className="object-contain" priority />
                </Link>
                <p className="text-body-sm leading-relaxed text-white font-pop font-regular max-w-[320px]">
                  Enhancing environments through energy efficiency, aesthetic appeal,
                  and high-performance architectural lighting solutions.
                </p>
                <div className="flex gap-6 mt-10">
                  {socialIcons.map((social, i) => (
                    <Link key={i} href={social.href} className="text-white hover:opacity-60 transition" target="_blank">
                      <social.Icon className="w-6 h-6" strokeWidth={1.5} />
                    </Link>
                  ))}
                </div>
              </div>
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
                      <li key={link.name}>
                        {/* Logic for Modal Triggers */}
                        {link.name === "Privacy Policy" ? (
                          <button
                            onClick={() => setIsPrivacyOpen(true)}
                            className="text-body-sm text-white/70 hover:text-white transition-colors font-pop font-regular text-left"
                          >
                            {link.name}
                          </button>
                        ) : link.name === "Terms & Conditions" ? (
                          <button
                            onClick={() => setIsTermsOpen(true)}
                            className="text-body-sm text-white/70 hover:text-white transition-colors font-pop font-regular text-left"
                          >
                            {link.name}
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-body-sm text-white/70 hover:text-white transition-colors font-pop font-regular"
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile Copyright */}
            <div className="md:hidden w-full mt-4 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-5 items-center">
                <p className="text-body-xxs tracking-wide text-white/70 font-pop font-medium">© 2026 LEDLUM. All rights reserved.</p>
                <p className="text-body-xxs tracking-wide text-white/70 font-pop font-medium">
                  Designed by <span className="text-white"><a href="https://www.totality.solutions/" target="_blank">Totality Solutions</a></span>
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Copyright */}
          <div className="hidden md:block">
            <div className="flex justify-between mt-7">
              <p className="text-body-xxs tracking-wide text-white/70 font-pop font-medium">© 2026 LEDLUM. All rights reserved.</p>
              <p className="text-right text-body-xxs tracking-wide text-white/70 font-pop font-medium">
                Designed by <span className="text-white"><a href="https://www.totality.solutions/" target="_blank">Totality Solutions</a></span>
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="flex-grow min-h-[50px] lg:min-h-[100px]" />

      {/* Modals */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </footer>
  );
}