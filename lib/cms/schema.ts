import type { CmsKey } from "./defaults";

// Field definitions that drive the generic admin editor
// (components/admin/SectionEditor.tsx). Each section's fields must match the
// shape of its entry in lib/cms/defaults.ts.

type BaseField = { name: string; label: string; help?: string };

export type Field =
  | (BaseField & { type: "text" | "textarea" | "url" })
  | (BaseField & { type: "image" | "video" | "file" })
  | (BaseField & { type: "boolean" })
  | (BaseField & { type: "select"; options: { value: string; label: string }[] })
  | (BaseField & { type: "stringList"; itemLabel?: string })
  | (BaseField & {
      type: "list";
      itemLabel: string;
      // Field whose value is shown as each item's collapsed title.
      titleField?: string;
      fields: Field[];
    });

export type SectionDef = {
  key: CmsKey;
  label: string;
  description?: string;
  fields: Field[];
};

export type SectionGroup = {
  slug: string;
  label: string;
  // Public page to open for a preview after saving.
  previewPath?: string;
  sections: SectionDef[];
};

const linkList = (name: string, label: string): Field => ({
  type: "list",
  name,
  label,
  itemLabel: "Link",
  titleField: "title",
  fields: [
    { type: "text", name: "title", label: "Label" },
    { type: "text", name: "href", label: "Link (e.g. /about or https://…)" },
  ],
});

const twoLineTitle: Field[] = [
  { type: "text", name: "title1", label: "Heading (line 1)" },
  { type: "text", name: "title2", label: "Heading (line 2)" },
];

const legalFields: Field[] = [
  { type: "text", name: "title", label: "Title" },
  { type: "text", name: "effectiveDate", label: "Subtitle / effective date" },
  {
    type: "list",
    name: "sections",
    label: "Sections",
    itemLabel: "Section",
    titleField: "heading",
    fields: [
      { type: "text", name: "heading", label: "Heading" },
      { type: "textarea", name: "body", label: "Text", help: "Leave a blank line between paragraphs." },
      { type: "stringList", name: "bullets", label: "Bullet points", itemLabel: "Bullet" },
    ],
  },
];

const COLLECTIONS_SECTION: SectionDef = {
  key: "collections",
  label: "Collections",
  description:
    "Hidden collections are removed from the home page catalog row and their page returns 404. Header/footer menu links are edited under Header & footer.",
  fields: [
    {
      type: "list",
      name: "items",
      label: "Collections",
      itemLabel: "Collection",
      titleField: "name",
      fields: [
        { type: "text", name: "name", label: "Name" },
        { type: "text", name: "slug", label: "URL slug", help: "Must match the products' collection value, e.g. indoor → /product/indoor" },
        { type: "boolean", name: "visible", label: "Visible on the website" },
        { type: "text", name: "heroTitle", label: "Page title (SEO)" },
        { type: "textarea", name: "description", label: "Description (SEO)" },
        { type: "image", name: "bannerImage", label: "Collection page banner" },
        { type: "image", name: "catalogImage", label: "Catalog card image (home page)" },
        { type: "file", name: "catalogPdf", label: "Catalog PDF" },
      ],
    },
  ],
};

export const SECTION_GROUPS: SectionGroup[] = [
  {
    slug: "home",
    label: "Home page",
    previewPath: "/",
    sections: [
      {
        key: "home.hero",
        label: "Hero banner",
        description: "The full-width banner at the top of the home page. On phones the image is shown instead of the video.",
        fields: [
          {
            type: "select",
            name: "type",
            label: "Banner type",
            options: [
              { value: "video", label: "Video" },
              { value: "image", label: "Image" },
            ],
          },
          { type: "video", name: "video", label: "Video (MP4)" },
          { type: "image", name: "image", label: "Image (also the video poster and mobile banner)" },
        ],
      },
      {
        key: "home.products",
        label: "Bestsellers & catalog labels",
        description: "The catalog cards themselves are edited in the “Product catalog” section below.",
        fields: [
          ...twoLineTitle,
          { type: "text", name: "bestsellersLabel", label: "Bestsellers label" },
          { type: "image", name: "backgroundImage", label: "Background image" },
          {
            type: "list",
            name: "bestsellers",
            label: "Bestseller cards",
            itemLabel: "Card",
            titleField: "title",
            fields: [
              { type: "text", name: "title", label: "Title" },
              { type: "image", name: "lightImg", label: "Image (light on)" },
              { type: "image", name: "darkImg", label: "Image (light off)" },
            ],
          },
          { type: "text", name: "collectionLabel", label: "Catalog row label (left)" },
          { type: "text", name: "catalogLabel", label: "Catalog row label (right)" },
        ],
      },
      { ...COLLECTIONS_SECTION, label: "Product catalog (collections)" },
      {
        key: "home.about",
        label: "Who we are",
        fields: [
          ...twoLineTitle,
          { type: "textarea", name: "body", label: "Text" },
          { type: "text", name: "buttonLabel", label: "Button label" },
          { type: "text", name: "buttonHref", label: "Button link" },
          { type: "image", name: "backgroundImage", label: "Background image" },
        ],
      },
      {
        key: "home.achievements",
        label: "Achievements",
        fields: [
          ...twoLineTitle,
          { type: "image", name: "backgroundImage", label: "Background image" },
          {
            type: "list",
            name: "items",
            label: "Achievements",
            itemLabel: "Achievement",
            titleField: "label",
            fields: [
              { type: "text", name: "value", label: "Number (e.g. 23+)" },
              { type: "text", name: "label", label: "Label" },
              { type: "image", name: "image", label: "Image" },
            ],
          },
        ],
      },
      {
        key: "home.blogCarousel",
        label: "Blog carousel",
        description: "Slides are the published blog posts.",
        fields: [
          ...twoLineTitle,
          { type: "text", name: "buttonLabel", label: "Button label" },
          { type: "image", name: "backgroundImage", label: "Background image (behind achievements, projects & blogs)" },
        ],
      },
      {
        key: "home.testimonials",
        label: "Testimonials (videos)",
        fields: [
          { type: "text", name: "title", label: "Heading" },
          { type: "text", name: "rightLabel", label: "Right-side label" },
          {
            type: "list",
            name: "items",
            label: "Videos",
            itemLabel: "Video",
            titleField: "title",
            fields: [
              { type: "text", name: "title", label: "Title" },
              { type: "text", name: "category", label: "Category" },
              { type: "text", name: "author", label: "Author" },
              { type: "text", name: "date", label: "Date (e.g. 12 Mar, 2026)" },
              { type: "url", name: "videoUrl", label: "YouTube link", help: "The thumbnail is taken from YouTube automatically." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "projects",
    label: "Projects",
    previewPath: "/project",
    sections: [
      {
        key: "projects",
        label: "Project gallery",
        description: "Used on the Projects page and the home page projects strip.",
        fields: [
          ...twoLineTitle,
          { type: "text", name: "exploreLabel", label: "Home page link label" },
          {
            type: "list",
            name: "images",
            label: "Project images",
            itemLabel: "Image",
            fields: [{ type: "image", name: "image", label: "Image" }],
          },
        ],
      },
    ],
  },
  {
    slug: "about",
    label: "About page",
    previewPath: "/about",
    sections: [
      {
        key: "about.hero",
        label: "Intro",
        fields: [
          ...twoLineTitle,
          { type: "textarea", name: "subtitle", label: "Subtitle" },
          { type: "image", name: "image", label: "Wide image" },
          {
            type: "list",
            name: "cards",
            label: "Info columns",
            itemLabel: "Column",
            titleField: "title",
            fields: [
              { type: "text", name: "title", label: "Title" },
              { type: "textarea", name: "desc", label: "Text" },
            ],
          },
        ],
      },
      {
        key: "about.visionMission",
        label: "Vision, mission & values",
        fields: [
          { type: "text", name: "visionTitle", label: "Vision heading" },
          { type: "textarea", name: "visionText", label: "Vision text" },
          { type: "text", name: "missionTitle", label: "Mission heading" },
          { type: "textarea", name: "missionText", label: "Mission text" },
          { type: "image", name: "backgroundImage", label: "Glow background image" },
          { type: "text", name: "valuesTitle", label: "Core values heading" },
          { type: "text", name: "value1", label: "Core value 1 (left)" },
          { type: "text", name: "value2", label: "Core value 2" },
          { type: "text", name: "value3", label: "Core value 3" },
          { type: "text", name: "value4", label: "Core value 4 (right)" },
        ],
      },
      {
        key: "about.journey",
        label: "Journey timeline",
        fields: [
          ...twoLineTitle,
          {
            type: "list",
            name: "steps",
            label: "Milestones",
            itemLabel: "Milestone",
            titleField: "year",
            fields: [
              { type: "text", name: "year", label: "Year" },
              { type: "text", name: "title", label: "Title" },
              { type: "textarea", name: "desc", label: "Description" },
            ],
          },
        ],
      },
      {
        key: "about.team",
        label: "Team",
        fields: [
          ...twoLineTitle,
          { type: "textarea", name: "intro", label: "Intro text" },
          { type: "video", name: "video", label: "Video (MP4)" },
          { type: "image", name: "backgroundImage", label: "Background image" },
          {
            type: "list",
            name: "members",
            label: "Team members",
            itemLabel: "Member",
            titleField: "name",
            fields: [
              { type: "text", name: "name", label: "Name" },
              { type: "text", name: "role", label: "Role" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact page",
    previewPath: "/contact",
    sections: [
      {
        key: "contact.page",
        label: "Contact details",
        fields: [
          ...twoLineTitle,
          { type: "textarea", name: "intro", label: "Intro text" },
          { type: "text", name: "email", label: "Email" },
          { type: "text", name: "phone", label: "Phone" },
          { type: "text", name: "whatsappLabel", label: "WhatsApp label" },
          { type: "text", name: "whatsappHours", label: "WhatsApp hours" },
        ],
      },
    ],
  },
  {
    slug: "blog-page",
    label: "Blog page",
    previewPath: "/blog",
    sections: [
      {
        key: "blog.page",
        label: "Blog listing page",
        description: "Posts themselves are managed under Blog posts.",
        fields: [
          ...twoLineTitle,
          { type: "stringList", name: "categories", label: "Category filters", itemLabel: "Category" },
          { type: "text", name: "latestTitle", label: "Latest posts heading" },
          { type: "text", name: "stayTitle", label: "Archive heading" },
          { type: "text", name: "staySubtitle", label: "Archive subheading" },
        ],
      },
    ],
  },
  {
    slug: "collections",
    label: "Product collections",
    previewPath: "/",
    sections: [
      COLLECTIONS_SECTION,
    ],
  },
  {
    slug: "layout",
    label: "Header & footer",
    previewPath: "/",
    sections: [
      {
        key: "navigation",
        label: "Menus",
        fields: [
          linkList("primary", "Header menu (desktop centre)"),
          linkList("side", "Side menu (menu button)"),
        ],
      },
      {
        key: "footer",
        label: "Footer",
        fields: [
          { type: "image", name: "logo", label: "Footer logo" },
          { type: "textarea", name: "tagline", label: "Tagline" },
          {
            type: "list",
            name: "columns",
            label: "Link columns",
            itemLabel: "Column",
            titleField: "title",
            fields: [
              { type: "text", name: "title", label: "Column title" },
              {
                type: "list",
                name: "links",
                label: "Links",
                itemLabel: "Link",
                titleField: "name",
                fields: [
                  { type: "text", name: "name", label: "Label" },
                  { type: "text", name: "href", label: "Link", help: "Use #privacy or #terms to open the policy pop-ups." },
                ],
              },
            ],
          },
          { type: "text", name: "copyright", label: "Copyright line" },
        ],
      },
      {
        key: "getInTouch",
        label: "“Get in touch” banner",
        description: "Shown on the About and Blog pages.",
        fields: [
          { type: "text", name: "title", label: "Heading" },
          { type: "text", name: "subtitle", label: "Subheading" },
          { type: "text", name: "buttonLabel", label: "Button label" },
          { type: "text", name: "buttonHref", label: "Button link" },
        ],
      },
    ],
  },
  {
    slug: "settings",
    label: "Site settings & SEO",
    previewPath: "/",
    sections: [
      {
        key: "site.settings",
        label: "Brand, social & default SEO",
        fields: [
          { type: "text", name: "siteName", label: "Site name" },
          { type: "text", name: "legalName", label: "Legal / company name" },
          { type: "url", name: "siteUrl", label: "Website URL", help: "Used for canonical links, sitemap and social previews." },
          { type: "textarea", name: "seoDescription", label: "Default SEO description" },
          { type: "stringList", name: "keywords", label: "SEO keywords", itemLabel: "Keyword" },
          { type: "image", name: "defaultOgImage", label: "Default social share image (1200×630)" },
          { type: "image", name: "headerLogo", label: "Header logo" },
          { type: "image", name: "secondaryLogo", label: "Secondary header logo" },
          { type: "url", name: "secondaryLogoUrl", label: "Secondary logo link" },
          { type: "url", name: "instagram", label: "Instagram URL" },
          { type: "url", name: "linkedin", label: "LinkedIn URL" },
          { type: "url", name: "facebook", label: "Facebook URL" },
        ],
      },
      {
        key: "seo.pages",
        label: "Page SEO",
        description: "Leave a field empty to use the default site description.",
        fields: [
          { type: "text", name: "homeTitle", label: "Home – title" },
          { type: "textarea", name: "homeDescription", label: "Home – description" },
          { type: "text", name: "aboutTitle", label: "About – title" },
          { type: "textarea", name: "aboutDescription", label: "About – description" },
          { type: "text", name: "projectTitle", label: "Projects – title" },
          { type: "textarea", name: "projectDescription", label: "Projects – description" },
          { type: "text", name: "blogTitle", label: "Blog – title" },
          { type: "textarea", name: "blogDescription", label: "Blog – description" },
          { type: "text", name: "contactTitle", label: "Contact – title" },
          { type: "textarea", name: "contactDescription", label: "Contact – description" },
        ],
      },
      { key: "legal.privacy", label: "Privacy policy", fields: legalFields },
      { key: "legal.terms", label: "Terms & conditions", fields: legalFields },
    ],
  },
];

export function findSectionGroup(slug: string): SectionGroup | undefined {
  return SECTION_GROUPS.find((g) => g.slug === slug);
}

export function findSection(key: string): SectionDef | undefined {
  for (const group of SECTION_GROUPS) {
    const section = group.sections.find((s) => s.key === key);
    if (section) return section;
  }
  return undefined;
}
