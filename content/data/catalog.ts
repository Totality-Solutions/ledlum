export type CatalogAsset = {
  slug: string;
  title: string;
  description: string;
  category: "brochure" | "case-study" | "spec-sheet" | "playbook";
  downloadUrl: string;
  publishedAt: string;
};

export const catalogAssets: CatalogAsset[] = [
  {
    slug: "enterprise-services-handbook",
    title: "Enterprise Services Handbook",
    description: "Comprehensive overview of Rolta Electricals' consulting, EPC, automation, and lifecycle offerings.",
    category: "brochure",
    downloadUrl: "/downloads/rolta-enterprise-services.pdf",
    publishedAt: "2025-01-15",
  },
  {
    slug: "smart-campus-electrification",
    title: "Smart Campus Electrification Playbook",
    description: "End-to-end execution framework for high availability campuses spanning substations, solar, and building automation.",
    category: "playbook",
    downloadUrl: "/downloads/rolta-smart-campus-playbook.pdf",
    publishedAt: "2024-10-02",
  },
  {
    slug: "energy-analytics-spec",
    title: "Energy Analytics Platform Specification",
    description: "Technical specifications and deployment considerations for the Rolta Energy Cloud Suite.",
    category: "spec-sheet",
    downloadUrl: "/downloads/rolta-energy-analytics-spec.pdf",
    publishedAt: "2024-06-20",
  },
  {
    slug: "pharma-automation-case",
    title: "Pharmaceutical Automation Case Study",
    description: "Validated automation deployment for a regulated pharma facility with US FDA Part 11 compliance.",
    category: "case-study",
    downloadUrl: "/downloads/rolta-pharma-case-study.pdf",
    publishedAt: "2024-03-12",
  },
];
