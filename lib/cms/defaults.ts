import { cdnImg } from "@/lib/cdn";

// Defaults for every editable CMS section — this is the content the site
// shipped with before the CMS existed. A section with no row in the
// cms_content table renders exactly these values, and a saved row is merged
// over them (see lib/cms/content.ts), so a newly added field always has a
// value even on rows saved before the field existed.
//
// Client-safe on purpose: the admin editor imports these for "Reset to default".

const LEGAL_PRIVACY = {
  title: "Privacy Policy",
  effectiveDate: "Effective Date: March 2026",
  sections: [
    {
      heading: "1. Introduction",
      body: "At LEDLUM, we prioritize the protection of your personal data. This policy outlines how we collect, use, and safeguard your information when you interact with our architectural lighting services.",
      bullets: [] as string[],
    },
    {
      heading: "2. Information Collection",
      body: "We may collect personal identification information including, but not limited to, name, email address, and project specifications when you fill out contact forms or request energy audits.",
      bullets: [
        "Usage data and cookie identifiers",
        "Contact information provided via forms",
        "Professional project requirements",
      ],
    },
    {
      heading: "3. Data Usage",
      body: "Collected data is used strictly to enhance our energy efficiency solutions, provide bespoke design consultations, and ensure technical support delivery.",
      bullets: [],
    },
    {
      heading: "4. Your Rights",
      body: "Users have the right to request access to their data, seek corrections, or request deletion of their personal information at any time by contacting our privacy team.",
      bullets: [],
    },
  ],
};

const LEGAL_TERMS = {
  title: "Terms & Conditions",
  effectiveDate: "",
  sections: [
    {
      heading: "1. Agreement to Terms",
      body: "By accessing and using the services provided by LEDLUM, you agree to be bound by these Terms and Conditions. These terms apply to all visitors, users, and others who access or use our architectural lighting solutions and digital platforms.",
      bullets: [] as string[],
    },
    {
      heading: "2. Intellectual Property",
      body: "The content, designs, custom fabrication techniques, and technical documentation found on this website are the exclusive property of LEDLUM. You may not reproduce, distribute, or create derivative works without explicit written consent.",
      bullets: [],
    },
    {
      heading: "3. Use License",
      body: "Permission is granted to temporarily download one copy of the materials on LEDLUM's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
      bullets: [
        "You may not modify or copy the materials.",
        "You may not use the materials for any commercial purpose.",
        "You may not attempt to reverse engineer any software or design.",
      ],
    },
    {
      heading: "4. Disclaimer",
      body: "The materials on LEDLUM's website are provided on an 'as is' basis. LEDLUM makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.",
      bullets: [],
    },
    {
      heading: "5. Limitations",
      body: "In no event shall LEDLUM or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.",
      bullets: [],
    },
  ],
};

export const CMS_DEFAULTS = {
  // ---------------- Site-wide ----------------
  "site.settings": {
    siteName: " Ledlum ",
    legalName: "Rolta Electricals Private Limited",
    siteUrl: "https://www.roltaelectricals.com",
    seoDescription:
      "Rolta Electricals is an enterprise engineering partner delivering turnkey electrical, automation, and infrastructure projects across industrial and commercial sectors.",
    keywords: [
      "electrical engineering",
      "industrial automation",
      "project management",
      "solar energy integration",
      "panel manufacturing",
      "smart infrastructure",
    ],
    defaultOgImage: "https://pub-72e9e5cfa7cc4ff0a9cc7ba22a9d2341.r2.dev/ledlum/og-default.png",
    headerLogo: cdnImg("/images/logo/LEDLUM - Logo.webp"),
    secondaryLogo: cdnImg("/images/logo/SECONDARY_LOGO.png"),
    secondaryLogoUrl: "https://allhome.in/",
    instagram: "https://www.instagram.com/ledlumlighting/",
    linkedin: "https://www.linkedin.com/company/95175675/admin/dashboard/",
    facebook: "https://www.facebook.com/ledlumlightingsolutions",
  },

  navigation: {
    primary: [
      { title: "Outdoor", href: "/product/outdoor" },
      { title: "Indoor", href: "/product/indoor" },
      { title: "Artizan", href: "/product/artizan" },
      { title: "Volaris", href: "/product/volaris" },
      { title: "Klewe", href: "/product/klewe" },
    ],
    side: [
      { title: "Home", href: "/" },
      { title: "About Us", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Project", href: "/project" },
      { title: "Contact Us", href: "/contact" },
    ],
  },

  footer: {
    logo: cdnImg("/images/logo/ledlum-logo-footer.png"),
    tagline:
      "Design that inspires. Spaces that come alive. Every project reflects precision, innovation, and a thoughtful touch",
    columns: [
      {
        title: "Quick Links",
        links: [
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about" },
          { name: "Blog", href: "/blog" },
          { name: "Project", href: "/project" },
          { name: "Contact Us", href: "/contact" },
          { name: "Privacy Policy", href: "#privacy" },
          { name: "Terms & Conditions", href: "#terms" },
        ],
      },
      {
        title: "Our Products",
        links: [
          { name: "Outdoor", href: "/product/outdoor" },
          { name: "Indoor", href: "/product/indoor" },
          { name: "Artizan", href: "/product/artizan" },
          { name: "Volaris", href: "/product/volaris" },
          { name: "Klewe", href: "/product/klewe" },
        ],
      },
    ],
    copyright: "© 2026 LEDLUM. All rights reserved.",
  },

  getInTouch: {
    title: "Get In Touch",
    subtitle: "With Our Lighting Specialists.",
    buttonLabel: "Our Story",
    buttonHref: "/contact",
  },

  "seo.pages": {
    homeTitle: "LEDLUM | Futuristic LED Solutions",
    homeDescription:
      "LedLum believes lighting is the ultimate intersection of technology and design. Our premium, futuristic LED solutions transform everyday experiences into moments of luxury, defining the mood, ambience, and personality of your space.",
    aboutTitle: "",
    aboutDescription: "",
    projectTitle: "",
    projectDescription: "",
    blogTitle: "",
    blogDescription: "",
    contactTitle: "",
    contactDescription: "",
  },

  "legal.privacy": LEGAL_PRIVACY,
  "legal.terms": LEGAL_TERMS,

  // ---------------- Home ----------------
  "home.hero": {
    type: "video" as "video" | "image",
    video: cdnImg("/videos/home.mp4"),
    image: cdnImg("/images/home/home-hero.webp"),
  },

  "home.products": {
    title1: "Designed In-House.",
    title2: "Built to Last.",
    bestsellersLabel: "Bestsellers",
    backgroundImage: cdnImg("/images/about/ledlumbox.webp"),
    bestsellers: [
      { title: "Indoor Lights", lightImg: cdnImg("/images/home/bestseller/Indoor2.jpeg"), darkImg: cdnImg("/images/home/bestseller/Indoor1.jpeg") },
      { title: "Outdoor Lights", lightImg: cdnImg("/images/home/bestseller/Outdoor2.jpeg"), darkImg: cdnImg("/images/home/bestseller/Outdoor1.jpeg") },
      { title: "Volaris Fans", lightImg: cdnImg("/images/home/bestseller/Volaris2.png"), darkImg: cdnImg("/images/home/bestseller/Volaris1.png") },
      { title: "Klewe Lights", lightImg: cdnImg("/images/home/bestseller/Klewe2.jpeg"), darkImg: cdnImg("/images/home/bestseller/Klewe1.jpeg") },
    ],
    collectionLabel: "Product Collection",
    catalogLabel: "Product Catalog",
  },

  "home.about": {
    title1: "Who.",
    title2: "We Are.",
    body:
      "Founded in 2005, LedLum creates LED lighting that transforms spaces into experiences. We combine design, technology, and efficiency to illuminate interiors, exteriors, and landscapes with precision and style. Our solutions are crafted to enhance every corner, highlight architectural beauty, and create moods that resonate. With every project, we redefine how light interacts with space, turning vision into reality.",
    buttonLabel: "Our Story",
    buttonHref: "/our-story",
    backgroundImage: cdnImg("/images/home/home-bg2.webp"),
  },

  "home.achievements": {
    title1: "Our.",
    title2: "Achievements.",
    backgroundImage: cdnImg("/images/home/home-bg4.webp"),
    items: [
      { value: "23+", label: "YEARS OF EXPERIENCE", image: cdnImg("/images/home/achievment1.png") },
      { value: "400+", label: "PARTNERS", image: cdnImg("/images/home/achievment2.webp") },
      { value: "1,100+", label: "PRODUCTS", image: cdnImg("/images/home/achievment3.webp") },
      { value: "30,000+", label: "BURNING HOURS", image: cdnImg("/images/home/achievment4.webp") },
    ],
  },

  "home.blogCarousel": {
    title1: "Blogs",
    title2: "that defines the space.",
    buttonLabel: "View Article",
    backgroundImage: cdnImg("/images/home/home-bg3.webp"),
  },

  "home.testimonials": {
    title: "Testimonials",
    rightLabel: "Dialogue Series",
    items: [
      { category: "Designers", title: "Illuminating Spaces with LMT Series", author: "LEDLUM LIGHTING SOLUTIONS", date: "12 Mar, 2026", videoUrl: "https://youtu.be/m7-HN9NkJVE?si=bWPSxtvVszWKw2WG" },
      { category: "Architects", title: "Pendant Lights", author: "LEDLUM LIGHTING SOLUTIONS", date: "05 Mar, 2026", videoUrl: "https://youtu.be/92gcYZd5tGs?si=ZeSN0wDSGhr5N8qN" },
      { category: "Visionaries", title: "Automation", author: "LEDLUM LIGHTING SOLUTIONS", date: "28 Feb, 2026", videoUrl: "https://youtu.be/QO4PFtIbBQc?si=P7I7_co_st0U64M2" },
      { category: "Builders", title: "Chennai Experience Center", author: "LEDLUM LIGHTING SOLUTIONS", date: "20 Feb, 2026", videoUrl: "https://youtu.be/wnJTR2609UM?si=-V3zK7EjaC2rpmpC" },
      { category: "Builders", title: "Overseas Showroom in Riyadh", author: "LEDLUM LIGHTING SOLUTIONS", date: "20 Feb, 2026", videoUrl: "https://youtu.be/paGEqsMGKGo?si=LwOEx7LF_QNF7sqZ" },
    ],
  },

  // Shared by the home "Our Projects" marquee and the /project gallery.
  projects: {
    title1: "Our.",
    title2: "Projects.",
    exploreLabel: "Explore Projects",
    images: Array.from({ length: 11 }, (_, i) => ({
      image: cdnImg(`/images/home/project/project${i + 1}.jpeg`),
    })),
  },

  // ---------------- About ----------------
  "about.hero": {
    title1: "Illuminating Spaces",
    title2: "- Inspiring Lives",
    subtitle:
      "Advancing architectural lighting through thoughtful design, precision engineering, and forward-thinking innovation.",
    image: cdnImg("/images/home/about-new.webp"),
    cards: [
      { title: "Who We Are", desc: "LEDLUM develops architectural lighting systems tailored for modern design environments. Our solutions are created to enhance spatial experience while maintaining technical reliability." },
      { title: "Since When", desc: "Built on years of lighting expertise, LEDLUM continues to evolve with changing architectural needs and emerging technologies." },
      { title: "What We Do", desc: "We design and manufacture architectural luminaires that integrate seamlessly into contemporary spaces — delivering both visual comfort and performance." },
      { title: "Core Expertise", desc: "Architectural lighting systems, optical engineering, custom project solutions, design-led product development." },
    ],
  },

  "about.visionMission": {
    visionTitle: "Vision.",
    visionText:
      "To redefine architectural lighting through refined design, advanced technology, and meaningful spatial impact.",
    missionTitle: "Mission.",
    missionText:
      "To collaborate with architects and designers in delivering lighting systems that balance aesthetics, performance, and longevity.",
    valuesTitle: "Core Values.",
    backgroundImage: cdnImg("/images/about/mission2.webp"),
    value1: "Performance Reliability",
    value2: "Design-led Innovation",
    value3: "Architectural Harmony",
    value4: "Precision Engineering",
  },

  "about.journey": {
    title1: "Our",
    title2: "Journey",
    steps: [
      { year: "1989", title: "The Beginning", desc: "Establishing the foundation of specialized lighting expertise." },
      { year: "2007", title: "ABBA Lighting is Born", desc: "Sumeet founded ABBA Lighting for mid to high-end spaces." },
      { year: "2017", title: "Enter Ledlum Lighting", desc: "Expanding with architectural designs and high-performance fixtures." },
      { year: "2020", title: "Artizan by Ledlum", desc: "Launching a curated collection focusing on artisanal craftsmanship." },
      { year: "2022", title: "Astara by Ledlum", desc: "Introducing innovative smart lighting solutions." },
      { year: "2023", title: "Volaris by Ledlum", desc: "Sustainable, high-efficiency lighting for global markets." },
      { year: "2026", title: " AllHome Affiliation", desc: "Expanded through AllHome partnership." },
    ],
  },

  "about.team": {
    title1: "Meet Our.",
    title2: "Visionaries.",
    intro:
      "A multidisciplinary team of lighting specialists focused on delivering architectural lighting systems engineered for performance and design excellence.",
    video: cdnImg("/videos/about.mp4"),
    backgroundImage: cdnImg("/images/about/ledlumbox.webp"),
    members: [
      { name: "Sumeet Malhotra", role: "Director & Founder - Ledlum", image: "" },
      { name: "Abheek Malhotra", role: "Director & Founder - Astara", image: "" },
      { name: "Abhav Malhotra", role: "Director & Founder - Volaris", image: "" },
      { name: "Pooja Malhotra", role: "Director & Founder - Ledlum/Artizan", image: "" },
      { name: "Sanjay Sethi", role: "", image: "" },
    ],
  },

  // ---------------- Contact ----------------
  "contact.page": {
    title1: "Get.",
    title2: "in Touch.",
    intro: "Reach out to LEDLUM Lighting for premium architectural lighting solutions.",
    email: "ledlumlighting@gmail.com",
    phone: "+91 96631 02951",
    whatsappLabel: "Msg on Whatsapp",
    whatsappHours: "10:00 am to 6:00 pm",
  },

  // ---------------- Blog ----------------
  "blog.page": {
    title1: "Insights.",
    title2: "That illuminate.",
    categories: [
      "Architectural lighting",
      "Commercial projects",
      "Residential systems",
      "Energy efficiency",
      "Product insights",
    ],
    latestTitle: "Current insights & innovations.",
    stayTitle: "Stay Updated.",
    staySubtitle: "Timeless insights from our journey.",
  },

  // ---------------- Product collections ----------------
  collections: {
    items: [
      { slug: "outdoor", name: "Outdoor", visible: true, heroTitle: "Outdoor Collection", description: "The Outdoor Collection delivers rugged, weather-resistant lighting solutions—from bollards and wall lites to floodlights and underground fixtures—built for durability and architectural elegance.", bannerImage: cdnImg("/images/home/product/Outdoor.jpeg"), catalogImage: cdnImg("/images/home/product/Outdoor_Catalogue.jpg"), catalogPdf: cdnImg("/pdf/OUTDOOR.pdf") },
      { slug: "indoor", name: "Indoor", visible: true, heroTitle: "Indoor Collection", description: "The Indoor Series focuses on refined illumination for interiors—delivering ambient, task, and accent lighting that blends seamlessly into modern architectural spaces.", bannerImage: cdnImg("/images/home/product/Indoor.jpeg"), catalogImage: cdnImg("/images/home/product/Indoor_Catalogue.jpg"), catalogPdf: cdnImg("/pdf/INDOOR.pdf") },
      { slug: "artizan", name: "Artizan", visible: true, heroTitle: "Artizan Collection", description: "Explore our artizan lighting collection — designed for quality and performance.", bannerImage: cdnImg("/images/home/product/Indoor.jpeg"), catalogImage: cdnImg("/images/home/product/Artizan_Catalogue.jpg"), catalogPdf: cdnImg("/pdf/ARTIZAN.pdf") },
      { slug: "astara", name: "Astara", visible: false, heroTitle: "Astara Collection", description: "Explore our astara lighting collection — designed for quality and performance.", bannerImage: cdnImg("/images/home/product/Indoor.jpeg"), catalogImage: cdnImg("/images/home/product/Astara_Catalogue.jpg"), catalogPdf: cdnImg("/pdf/ASTARA.pdf") },
      { slug: "volaris", name: "Volaris", visible: true, heroTitle: "Volaris Collection", description: "Explore our volaris lighting collection — designed for quality and performance.", bannerImage: cdnImg("/images/home/product/Indoor.jpeg"), catalogImage: cdnImg("/images/home/product/Volaris_Catalogue.jpg"), catalogPdf: cdnImg("/pdf/VOLARIS.pdf") },
      { slug: "klewe", name: "Klewe", visible: true, heroTitle: "Klewe Collection", description: "Explore our klewe lighting collection — designed for quality and performance.", bannerImage: cdnImg("/images/home/product/Indoor.jpeg"), catalogImage: cdnImg("/images/home/product/Klewe_Catalogue.jpg"), catalogPdf: cdnImg("/pdf/KLEWE.pdf") },
    ],
  },
};

export type CmsKey = keyof typeof CMS_DEFAULTS;
export type CmsContent<K extends CmsKey> = (typeof CMS_DEFAULTS)[K];

export type SiteSettings = CmsContent<"site.settings">;
export type NavigationContent = CmsContent<"navigation">;
export type FooterContent = CmsContent<"footer">;
export type LegalContent = CmsContent<"legal.privacy">;
export type CollectionItem = CmsContent<"collections">["items"][number];
