export type ProductVariant = {
  slug: string;
  name: string;
  summary: string;
  applications: string[];
  specs: string[];
};

export type ProductLine = {
  slug: string;
  name: string;
  description: string;
  differentiators: string[];
  variants: ProductVariant[];
};

export const productLines: ProductLine[] = [
  {
    slug: "switchgear-systems",
    name: "Switchgear Systems",
    description:
      "MV and LV switchgear assemblies engineered for uptime-critical facilities with complete compliance to IEC/IS standards.",
    differentiators: [
      "Arc fault containment with proven type-test reports",
      "Compact footprints through modular busbar engineering",
      "Factory acceptance testing with digital QA records",
    ],
    variants: [
      {
        slug: "metal-clad-switchgear",
        name: "Metal Clad Switchgear",
        summary: "Indoor MV assemblies up to 33kV with withdrawable circuit breakers.",
        applications: ["Industrial substations", "Utility incomers", "Critical process plants"],
        specs: ["Rated up to 4000A", "Internal arc classification AFLR", "Remote racking option"],
      },
      {
        slug: "compact-substation",
        name: "Compact Substation",
        summary: "Outdoor-ready prefabricated enclosures with integrated protection relays.",
        applications: ["Smart campuses", "Urban infrastructure", "Renewable interconnections"],
        specs: ["IP54 enclosure rating", "Plug-and-play commissioning", "SCADA integration"],
      },
    ],
  },
  {
    slug: "energy-monitoring",
    name: "Energy Monitoring",
    description:
      "Hardware and cloud stack delivering plant-wide visibility into energy consumption, power quality, and ESG reporting.",
    differentiators: [
      "Edge analytics for real-time anomaly detection",
      "Open APIs for ERP, BMS, and CMMS integrations",
      "Cyber-hardened architecture aligned to ISA/IEC 62443",
    ],
    variants: [
      {
        slug: "rolta-insight-gateways",
        name: "Rolta Insight Gateways",
        summary: "DIN-rail gateways aggregating multi-protocol metering data into secure MQTT streams.",
        applications: ["Manufacturing units", "Data centers", "Utility substations"],
        specs: ["Supports Modbus, Profibus, BACnet", "AES-256 encrypted communication", "Dual SIM failover"],
      },
      {
        slug: "energy-cloud-suite",
        name: "Energy Cloud Suite",
        summary: "SaaS dashboards for benchmarking, auditing, and sustainability reporting.",
        applications: ["Corporate campuses", "Retail networks", "Hospital chains"],
        specs: ["ISO 50001 ready templates", "AI-driven demand forecasting", "Multi-site benchmarking"],
      },
    ],
  },
  {
    slug: "automation-panels",
    name: "Automation Panels",
    description:
      "PLC, DCS, and MCC panels integrating multi-OEM hardware with lifecycle documentation and remote diagnostics.",
    differentiators: [
      "UL/CE compliant assembly lines",
      "Digital twin documentation of wiring and I/O mapping",
      "Rapid serviceability with labelled harnessing",
    ],
    variants: [
      {
        slug: "intelligent-mcc",
        name: "Intelligent MCC",
        summary: "Motor control centers with smart starters, draw-out feeders, and condition monitoring.",
        applications: ["Process industries", "HVAC plants", "Material handling"],
        specs: ["Built to Form 3b / Form 4b", "Integrated arc flash mitigation", "Ethernet/IP ready"],
      },
      {
        slug: "hybrid-plc-panels",
        name: "Hybrid PLC Panels",
        summary: "Hybrid control panels interfacing discrete sensors and process instrumentation.",
        applications: ["Pharma automation", "Water treatment", "Specialty chemicals"],
        specs: ["Redundant power supplies", "Remote diagnostics via VPN", "Segmented I/O for ease of expansion"],
      },
    ],
  },
];
