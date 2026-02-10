export type ServiceCapability = {
  title: string;
  description: string;
};

export type ServiceOffering = {
  slug: string;
  name: string;
  summary: string;
  outcomes: string[];
  capabilities: ServiceCapability[];
  deliverables: string[];
};

export const serviceOfferings: ServiceOffering[] = [
  {
    slug: "consulting-engineering",
    name: "Consulting & Engineering",
    summary:
      "Front-end advisory, electrical studies, and multi-disciplinary design that derisks capital programs before ground is broken.",
    outcomes: [
      "Optimized energy distribution and system architecture",
      "Code-compliant documentation and statutory approvals",
      "Up to 15% savings through early value engineering",
    ],
    capabilities: [
      {
        title: "Power System Studies",
        description: "Load flow, fault level, and protection coordination assessments for reliable network design.",
      },
      {
        title: "Detailed Engineering",
        description: "BIM-ready schematics, GA drawings, and single-line diagrams covering LV to EHV infrastructure.",
      },
      {
        title: "Energy & Sustainability Advisory",
        description: "Solar feasibility, HVAC electrification, and ESG-aligned roadmaps for green certifications.",
      },
    ],
    deliverables: [
      "Feasibility & concept reports",
      "Detailed project reports (DPR) with cost models",
      "Compliance binder with BOQs, datasheets, and schedules",
    ],
  },
  {
    slug: "epc-projects",
    name: "EPC Project Delivery",
    summary:
      "Turnkey execution of substations, industrial plants, and smart campuses with single-point accountability.",
    outcomes: [
      "Compression of commissioning timelines by 20%",
      "Integrated quality and safety governance",
      "Lower lifecycle ownership cost through resilient design",
    ],
    capabilities: [
      {
        title: "Program Management",
        description: "Digital-first scheduling, procurement, and vendor orchestration across multi-site deployments.",
      },
      {
        title: "Electrical & ELV Installation",
        description: "AIS/GIS substations, cabling, lighting, and intelligent building systems executed to global standards.",
      },
      {
        title: "Testing & Commissioning",
        description: "Factory and site acceptance testing with calibrated instruments and sign-off-ready documentation.",
      },
    ],
    deliverables: [
      "Integrated master schedule with milestone tracking",
      "QA/QC records and safety compliance dossier",
      "As-built drawings and digital twins for handover",
    ],
  },
  {
    slug: "automation-digital",
    name: "Automation & Digital Systems",
    summary:
      "Industry 4.0 enablement through PLC/SCADA, energy analytics, and IIoT platforms tailored to operations.",
    outcomes: [
      "Real-time visibility into production KPIs",
      "Predictive maintenance programs that reduce downtime",
      "Cyber-secure control infrastructures",
    ],
    capabilities: [
      {
        title: "Control Panel Engineering",
        description: "Design and assembly of PLC, MCC, and DCS panels compliant with UL/IEC standards.",
      },
      {
        title: "SCADA & MES Integration",
        description: "Data acquisition, historian setup, and integrations with ERP/CMMS ecosystems.",
      },
      {
        title: "Industrial IoT Platforms",
        description: "Sensor retrofits, edge gateways, and cloud dashboards for distributed assets.",
      },
    ],
    deliverables: [
      "Functional design specification (FDS)",
      "Validated control logic and FAT/SAT reports",
      "User training and cyber security hardening guides",
    ],
  },
  {
    slug: "operations-maintenance",
    name: "Operations & Maintenance",
    summary:
      "Lifecycle services that sustain uptime across electrical and automation assets with predictive interventions.",
    outcomes: [
      "Mean time between failure (MTBF) improvement",
      "Regulatory and insurance compliance readiness",
      "Lowered energy cost through continuous optimization",
    ],
    capabilities: [
      {
        title: "Annual Maintenance Contracts",
        description: "24/7 service desk, spare-part strategy, and OEM liaison to guarantee SLA adherence.",
      },
      {
        title: "Reliability Engineering",
        description: "Thermography, power quality audits, and CBM analytics for critical assets.",
      },
      {
        title: "Retrofit & Upgrades",
        description: "Life-extension programs, relay retrofits, and digital overlays without disrupting production.",
      },
    ],
    deliverables: [
      "Condition monitoring dashboards",
      "Compliance reports aligned to ISO/NFPA",
      "Planned shutdown playbooks and resource plans",
    ],
  },
];
