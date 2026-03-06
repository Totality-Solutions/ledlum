"use client";

import React, { memo, useState } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import CTABtn from "@/components/layout/common/CTABtn";

/**
 * CONTACT PAGE
 * Responsive version (mobile + tablet optimized)
 */
const ContactSection = memo(function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 2000);
  };

  return (
    <Section className="relative min-h-full bg-transparent font-pop selection:bg-[#8D794E] selection:text-black overflow-hidden">

      <main className="relative z-10 mx-auto min-h-full flex items-center">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-0 items-start w-full">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8">

            <header className="space-y-6 md:space-y-8">
              <h1 className=" text-[#DBDCDD] tracking-wide font-pop">

                <span className="text-4xl md:text-5xl lg:text-6xl block">
                  Get.
                </span>

                <span className="text-2xl md:text-3xl lg:text-4xl block text-gray">
                  in Touch.
                </span>

              </h1>
            </header>

            <p className="text-base md:text-lg font-[0.9rem] text-[#DBDCDD] max-w-sm leading-relaxed tracking-wider">
              A practical guide to selecting efficient, high-performance lighting systems for offices.
            </p>

            <div className="space-y-4 w-full md:w-[85%] lg:w-[80%]">
              <ContactLink
                label="E-mail"
                value="info@ledlum.com"
                iconType="mail"
              />
              <ContactLink
                label="Call us"
                value="+91 96631 02951"
                iconType="phone"
              />
              <ContactLink
                label="Msg on Whatsapp"
                value="10:00 am to 6:00 pm"
                iconType="whatsapp"
              />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full h-full px-4 sm:px-6 lg:px-0">

            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between h-full gap-8 lg:gap-6"
            >

              {/* INPUTS */}
              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full bg-white/5 border border-[#DBDCDD] rounded-full px-6 md:px-8 py-4 md:py-6 font-extralight text-base md:text-lg tracking-wider focus:outline-none focus:border-[#8D794E]/50 transition-all placeholder:text-[#DBDCDD] text-white"
                />

                <input
                  type="email"
                  placeholder="E-mail / Contact no."
                  required
                  className="w-full bg-white/5 border border-[#DBDCDD] rounded-full px-6 md:px-8 py-4 md:py-6 font-extralight text-base md:text-lg tracking-wider focus:outline-none focus:border-[#8D794E]/50 transition-all placeholder:text-[#DBDCDD] text-white"
                />

                <textarea
                  placeholder="Message"
                  rows={5}
                  required
                  className="w-full bg-white/5 border border-[#DBDCDD] rounded-[30px] md:rounded-[40px] px-6 md:px-8 py-5 md:py-8 font-extralight text-base md:text-lg tracking-wider focus:outline-none focus:border-[#8D794E]/50 transition-all placeholder:text-[#DBDCDD] text-white resize-none"
                />

              </div>

              {/* BUTTONS */}
              <div className="flex flex-row items-center justify-between gap-4 w-full">
                <CTABtn
                  label="Reset"
                  btnBg="var(--bg-dark)"
                  btnHoverBg="black"
                  iconType="reset"
                  textColor="white"
                />

                <CTABtn
                  label={isSubmitting ? "..." : "Submit"}
                  disabled={isSubmitting}
                />

              </div>

            </form>
          </div>
        </div>
      </main>
    </Section>
  );
});


/**
 * CONTACT LINK
 */
const ContactLink = memo(function ContactLink({
  label,
  value,
  iconType
}: {
  label: string;
  value: string;
  iconType: "mail" | "phone" | "whatsapp";
}) {

  const icons = {
    mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    phone:
      "M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
    whatsapp:
      "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2"
  };

  return (
    <div className="group flex items-center justify-between p-2 rounded-full border border-[#DBDCDD] bg-white/[0.03] hover:bg-white/[0.07] transition-all cursor-pointer font-pop w-full">

      <div className="flex items-center gap-4 md:gap-5 pl-1">

        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#8D794E] flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-95">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
            <path d={icons[iconType]} />
          </svg>
        </div>

        <div className="space-y-0.5 tracking-wider">
          <p className="button-xs text-white capitalize leading-none font-normal">
            {label}
          </p>
          <p className="text-xs md:text-sm text-[#DBDCDD] font-extralight tracking-wide lowercase">
            {value}
          </p>
        </div>

      </div>

      <div className="mr-2 md:mr-3 w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#8D794E] flex items-center justify-center text-white transition-colors">

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="group-hover:rotate-45 transition-transform"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>

      </div>
    </div>
  );
});

export default ContactSection;