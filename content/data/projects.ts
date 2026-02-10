export type ProjectCaseStudy = {
  slug: string;
  name: string;
  industry: string;
  location: string;
  summary: string;
  outcomes: string[];
  metrics: { label: string; value: string }[];
};

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "smart-campus-electrification",
    name: "Global Tech Smart Campus Electrification",
    industry: "Commercial Campuses",
    location: "Hyderabad, India",
    summary:
      "End-to-end MV/LV distribution, building automation, and solar integration for a 2.5 million sq.ft technology campus delivered within 14 months.",
    outcomes: [
      "Integrated command center with SCADA visualizing 12 utility buildings",
      "Energy intensity reduced by 28% via analytics-led optimization",
      "Green building platinum certification achieved in first audit",
    ],
    metrics: [
      { label: "Load Handled", value: "76 MVA" },
      { label: "CO₂ Avoided", value: "12,400 t/yr" },
      { label: "Project Duration", value: "14 months" },
    ],
  },
  {
    slug: "pharma-plant-automation",
    name: "Pharmaceutical Plant Digitization",
    industry: "Life Sciences",
    location: "Ahmedabad, India",
    summary:
      "Validated automation and clean-room monitoring infrastructure aligned to US FDA 21 CFR Part 11 for a greenfield formulations facility.",
    outcomes: [
      "Single-pane-of-glass dashboard for 600+ critical I/O points",
      "Electronic batch records integrated with SAP for lot genealogy",
      "Predictive maintenance playbooks reducing MTTR by 34%",
    ],
    metrics: [
      { label: "Panels Delivered", value: "110" },
      { label: "Downtime Reduction", value: "34%" },
      { label: "Regulatory Deviations", value: "0" },
    ],
  },
  {
    slug: "metro-substation-upgrade",
    name: "Metro Substation Upgrade",
    industry: "Urban Infrastructure",
    location: "Pune, India",
    summary:
      "Retrofit of urban substations with arc-flash safe switchgear, digital relays, and integrated energy monitoring across a 42 km metro corridor.",
    outcomes: [
      "Zero unplanned outages during phased cutovers",
      "Centralized control room with real-time SCADA alerts",
      "Lifecycle O&M contract enabling 99.97% system availability",
    ],
    metrics: [
      { label: "Stations Covered", value: "18" },
      { label: "Availability", value: "99.97%" },
      { label: "Safety Incidents", value: "0" },
    ],
  },
];
