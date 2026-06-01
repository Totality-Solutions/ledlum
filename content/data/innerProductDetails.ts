// @/content/data/innerProductDetails.ts

export interface InnerProductDetail {
  category: string;
  series: string;
  group: string;
  dimming: "Dali" | "Non - Dimming" | "DP";
  collection: "indoor";
  hero: {
    category: string;
    name: string;
    description: string;
    image: string;
  };
  config: {
    models: string[];
    voltage?: string[];
    dimensions: string[];
    watts: string[];
    cct: Array<{ label: string; color: string }>;
    bodyColors: string[];
    beamAngles: string[];
    ipRating: string[];
    cutoutSizes: string[];
    ledChip: string[];
    luminous: string[];
    cri: string[];
  };
  permutations?: Array<Record<string, string>>;
  gallery: string[];
}

export const INDOOR_INNER_DETAILS: Record<string, InnerProductDetail> = {
  // === LED SMD CONCEALED DOWNLIGHT 
  "llf-216": {
    category: "LED SMD Concealed Downlight",
    series: "llf-216",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-216",
      description: "Recessed SMD modular luminaire featuring clean low-profile visual borders and exceptional architectural integration capabilities.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-216+Series"
    },
    config: {
      models: ["LLF-216", "LLF-217", "LLF-218", "LLF-219"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø60x50mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["90°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø55mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "5W", dimensions: "Ø60x50mm", cutoutSizes: "Ø55mm", bodyColor: "White", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" },
    //   { voltage: "220-240V AC", watts: "12W", dimensions: "Ø90x60mm", cutoutSizes: "Ø85mm", bodyColor: "Black", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-216+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-216+Detail+2"
    ]
  },

  "llf-217": {
    category: "LED SMD Concealed Downlight",
    series: "llf-217",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-217",
      description: "Recessed SMD modular luminaire featuring clean low-profile visual borders and exceptional architectural integration capabilities.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-217+Series"
    },
    config: {
      models: ["LLF-216", "LLF-217", "LLF-218", "LLF-219"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø80x54mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["90°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø75mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "5W", dimensions: "Ø60x50mm", cutoutSizes: "Ø55mm", bodyColor: "White", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" },
    //   { voltage: "220-240V AC", watts: "12W", dimensions: "Ø90x60mm", cutoutSizes: "Ø85mm", bodyColor: "Black", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-217+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-217+Detail+2"
    ]
  },

  "llf-218": {
    category: "LED SMD Concealed Downlight",
    series: "llf-218",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-218",
      description: "Recessed SMD modular luminaire featuring clean low-profile visual borders and exceptional architectural integration capabilities.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-218+Series"
    },
    config: {
      models: ["LLF-216", "LLF-217", "LLF-218", "LLF-219"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø90x60mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["90°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø85mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "5W", dimensions: "Ø60x50mm", cutoutSizes: "Ø55mm", bodyColor: "White", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" },
    //   { voltage: "220-240V AC", watts: "12W", dimensions: "Ø90x60mm", cutoutSizes: "Ø85mm", bodyColor: "Black", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-218+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-218+Detail+2"
    ]
  },

  "llf-219": {
    category: "LED SMD Concealed Downlight",
    series: "llf-219",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-219",
      description: "Recessed SMD modular luminaire featuring clean low-profile visual borders and exceptional architectural integration capabilities.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-219+Series"
    },
    config: {
      models: ["LLF-216", "LLF-217", "LLF-218", "LLF-219"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø100x60mm"],
      watts: ["20W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["90°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø95mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "5W", dimensions: "Ø60x50mm", cutoutSizes: "Ø55mm", bodyColor: "White", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" },
    //   { voltage: "220-240V AC", watts: "12W", dimensions: "Ø90x60mm", cutoutSizes: "Ø85mm", bodyColor: "Black", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-219+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-219+Detail+2"
    ]
  },

  "llf-306a": {
    category: "LED SMD Concealed Downlight",
    series: "llf-306a",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-306A",
      description: "Premium recessed lighting with versatile trim color options for modern interior designs.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-306A+Series"
    },
    config: {
      models: ["LLF-306A", "LLF-307A", "LLF-308A"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø65x49mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Matt Black", "Silver", "Copper", "Gun Black"],
      beamAngles: ["90°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø55mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "7W", dimensions: "Ø65x49mm", cutoutSizes: "Ø55mm", bodyColor: "Gun Black", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-306A+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-306A+Detail+2"
    ]
  },

  "llf-307a": {
    category: "LED SMD Concealed Downlight",
    series: "llf-307a",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-307A",
      description: "Premium recessed lighting with versatile trim color options for modern interior designs.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-307A+Series"
    },
    config: {
      models: ["LLF-306A", "LLF-307A", "LLF-308A"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø79x59mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Matt Black", "Silver", "Copper", "Gun Black"],
      beamAngles: ["90°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø75mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "12W", dimensions: "Ø79x59mm", cutoutSizes: "Ø75mm", bodyColor: "Matt Black", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-307A+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-307A+Detail+2"
    ]
  },

  "llf-308a": {
    category: "LED SMD Concealed Downlight",
    series: "llf-308a",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-308A",
      description: "Premium recessed lighting with versatile trim color options for modern interior designs.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-308A+Series"
    },
    config: {
      models: ["LLF-306A", "LLF-307A", "LLF-308A"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø92x68mm"],
      watts: ["18W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Matt Black", "Silver", "#C47A4A", "Gun Black"],
      beamAngles: ["90°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø85mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "18W", dimensions: "Ø92x68mm", cutoutSizes: "Ø85mm", bodyColor: "White", beamAngles: "90°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "6000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-308A+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-308A+Detail+2"
    ]
  },

  "llf-350": {
    category: "LED SMD Concealed Downlight",
    series: "llf-350",
    group: "Ribbed Prismatic Diffuser",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-350",
      description: "High-lumen concealed downlight with a ribbed prismatic diffuser and double-layer optical lens for superior light dispersion.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-350+Series"
    },
    config: {
      models: ["LLF-350", "LLF-351", "LLF-352", "LLF-353"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø114x40mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["120°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø100mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["130lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "12W", dimensions: "Ø114x40mm", cutoutSizes: "Ø100mm", bodyColor: "White", beamAngles: "120°", ledChip: "BRIDGELUX", luminous: "130lm/W", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-350+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-350+Detail+2"
    ]
  },

  "llf-351": {
    category: "LED SMD Concealed Downlight",
    series: "llf-351",
    group: "Ribbed Prismatic Diffuser",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-351",
      description: "High-lumen concealed downlight with a ribbed prismatic diffuser and double-layer optical lens for superior light dispersion.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-351+Series"
    },
    config: {
      models: ["LLF-350", "LLF-351", "LLF-352", "LLF-353"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø138x40mm"],
      watts: ["16W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["120°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø125mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["140lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "16W", dimensions: "Ø138x40mm", cutoutSizes: "Ø125mm", bodyColor: "White", beamAngles: "120°", ledChip: "BRIDGELUX", luminous: "140lm/W", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-351+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-351+Detail+2"
    ]
  },

  "llf-352": {
    category: "LED SMD Concealed Downlight",
    series: "llf-352",
    group: "Ribbed Prismatic Diffuser",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-352",
      description: "High-lumen concealed downlight with a ribbed prismatic diffuser and double-layer optical lens for superior light dispersion.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-352+Series"
    },
    config: {
      models: ["LLF-350", "LLF-351", "LLF-352", "LLF-353"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø158x40mm"],
      watts: ["22W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["120°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø150mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["150lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "22W", dimensions: "Ø158x40mm", cutoutSizes: "Ø150mm", bodyColor: "White", beamAngles: "120°", ledChip: "BRIDGELUX", luminous: "150lm/W", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-352+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-352+Detail+2"
    ]
  },

  "llf-353": {
    category: "LED SMD Concealed Downlight",
    series: "llf-353",
    group: "Ribbed Prismatic Diffuser",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED SMD Concealed Downlight",
      name: "LLF-353",
      description: "High-lumen concealed downlight with a ribbed prismatic diffuser and double-layer optical lens for superior light dispersion.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-353+Series"
    },
    config: {
      models: ["LLF-350", "LLF-351", "LLF-352", "LLF-353"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø208x40mm"],
      watts: ["28W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["120°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø200mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["160lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "28W", dimensions: "Ø208x40mm", cutoutSizes: "Ø200mm", bodyColor: "White", beamAngles: "120°", ledChip: "BRIDGELUX", luminous: "160lm/W", cri: ">80", cct: "6000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-353+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-353+Detail+2"
    ]
  },

  // === LED COB CONCEALED DOWNLIGHT 
  "llf-137": {
    category: "LED COB Concealed Downlight",
    series: "llf-137",
    group: "Special Series - Narrow Body",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-137",
      description: "Architectural directional point-source COB fixture providing high lumen accentuation thresholds with deep dark-light anti-glare control profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-137+Series"
    },
    config: {
      models: ["LLF-137", "LLF-137A", "LLF-137B", "LLF-138", "LLF-138A", "LLF-138B", "LLF-139", "LLF-139A", "LLF-139B"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø46x59mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Rose Gold"],
      beamAngles: ["18°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø40mm"],
      ledChip: ["TEEN"],
      luminous: ["400lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "5W", dimensions: "Ø46x59mm", cutoutSizes: "Ø40mm", bodyColor: "Rose Gold", beamAngles: "18°", ledChip: "TEEN", luminous: "400lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-137+Detail+1",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-137+Detail+2"
    ]
  },

  "llf-137a": {
    category: "LED COB Concealed Downlight",
    series: "llf-137a",
    group: "Special Series - Narrow Body",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-137A",
      description: "Architectural directional point-source COB fixture providing high lumen accentuation thresholds with deep dark-light anti-glare control profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-137A+Series"
    },
    config: {
      models: ["LLF-137", "LLF-137A", "LLF-137B", "LLF-138", "LLF-138A", "LLF-138B", "LLF-139", "LLF-139A", "LLF-139B"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø60x82mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Rose Gold"],
      beamAngles: ["15°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø52mm"],
      ledChip: ["TEEN"],
      luminous: ["960lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "12W", dimensions: "Ø60x82mm", cutoutSizes: "Ø52mm", bodyColor: "Rose Gold", beamAngles: "15°", ledChip: "TEEN", luminous: "960lm", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-137A+Detail+1"
    ]
  },

  "llf-137b": {
    category: "LED COB Concealed Downlight",
    series: "llf-137b",
    group: "Special Series - Narrow Body",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-137B",
      description: "Architectural directional point-source COB fixture providing high lumen accentuation thresholds with deep dark-light anti-glare control profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-137B+Series"
    },
    config: {
      models: ["LLF-137", "LLF-137A", "LLF-137B", "LLF-138", "LLF-138A", "LLF-138B", "LLF-139", "LLF-139A", "LLF-139B"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø70x85mm"],
      watts: ["16W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Rose Gold"],
      beamAngles: ["15°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø60mm"],
      ledChip: ["TEEN"],
      luminous: ["1280lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "16W", dimensions: "Ø70x85mm", cutoutSizes: "Ø60mm", bodyColor: "Rose Gold", beamAngles: "15°", ledChip: "TEEN", luminous: "1280lm", cri: ">90", cct: "6000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-137B+Detail+1"
    ]
  },

  "llf-138": {
    category: "LED COB Concealed Downlight",
    series: "llf-138",
    group: "Special Series - Narrow Body",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-138",
      description: "Architectural directional point-source COB fixture providing high lumen accentuation thresholds with deep dark-light anti-glare control profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-138+Series"
    },
    config: {
      models: ["LLF-137", "LLF-137A", "LLF-137B", "LLF-138", "LLF-138A", "LLF-138B", "LLF-139", "LLF-139A", "LLF-139B"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø46x59mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["18°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø40mm"],
      ledChip: ["TEEN"],
      luminous: ["400lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "5W", dimensions: "Ø46x59mm", cutoutSizes: "Ø40mm", bodyColor: "White", beamAngles: "18°", ledChip: "TEEN", luminous: "400lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-138+Detail+1"
    ]
  },

  "llf-138a": {
    category: "LED COB Concealed Downlight",
    series: "llf-138a",
    group: "Special Series - Narrow Body",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-138A",
      description: "Architectural directional point-source COB fixture providing high lumen accentuation thresholds with deep dark-light anti-glare control profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-138A+Series"
    },
    config: {
      models: ["LLF-137", "LLF-137A", "LLF-137B", "LLF-138", "LLF-138A", "LLF-138B", "LLF-139", "LLF-139A", "LLF-139B"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø60x82mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["15°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø52mm"],
      ledChip: ["TEEN"],
      luminous: ["960lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "12W", dimensions: "Ø60x82mm", cutoutSizes: "Ø52mm", bodyColor: "White", beamAngles: "15°", ledChip: "TEEN", luminous: "960lm", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-138A+Detail+1"
    ]
  },

  "llf-138b": {
    category: "LED COB Concealed Downlight",
    series: "llf-138b",
    group: "Special Series - Narrow Body",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-138B",
      description: "Architectural directional point-source COB fixture providing high lumen accentuation thresholds with deep dark-light anti-glare control profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-138B+Series"
    },
    config: {
      models: ["LLF-137", "LLF-137A", "LLF-137B", "LLF-138", "LLF-138A", "LLF-138B", "LLF-139", "LLF-139A", "LLF-139B"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø70x85mm"],
      watts: ["16W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["15°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø60mm"],
      ledChip: ["TEEN"],
      luminous: ["1280lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "16W", dimensions: "Ø70x85mm", cutoutSizes: "Ø60mm", bodyColor: "White", beamAngles: "15°", ledChip: "TEEN", luminous: "1280lm", cri: ">90", cct: "6000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-138B+Detail+1"
    ]
  },

  "llf-139": {
    category: "LED COB Concealed Downlight",
    series: "llf-139",
    group: "Special Series - Narrow Body",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-139",
      description: "Architectural directional point-source COB fixture providing high lumen accentuation thresholds with deep dark-light anti-glare control profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-139+Series"
    },
    config: {
      models: ["LLF-137", "LLF-137A", "LLF-137B", "LLF-138", "LLF-138A", "LLF-138B", "LLF-139", "LLF-139A", "LLF-139B"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø46x59mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black"],
      beamAngles: ["18°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø40mm"],
      ledChip: ["TEEN"],
      luminous: ["400lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "5W", dimensions: "Ø46x59mm", cutoutSizes: "Ø40mm", bodyColor: "Black", beamAngles: "18°", ledChip: "TEEN", luminous: "400lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-139+Detail+1"
    ]
  },

  "llf-139a": {
    category: "LED COB Concealed Downlight",
    series: "llf-139a",
    group: "Special Series - Narrow Body",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-139A",
      description: "Architectural directional point-source COB fixture providing high lumen accentuation thresholds with deep dark-light anti-glare control profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-139A+Series"
    },
    config: {
      models: ["LLF-137", "LLF-137A", "LLF-137B", "LLF-138", "LLF-138A", "LLF-138B", "LLF-139", "LLF-139A", "LLF-139B"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø60x82mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black"],
      beamAngles: ["15°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø52mm"],
      ledChip: ["TEEN"],
      luminous: ["960lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "12W", dimensions: "Ø60x82mm", cutoutSizes: "Ø52mm", bodyColor: "Black", beamAngles: "15°", ledChip: "TEEN", luminous: "960lm", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-139A+Detail+1"
    ]
  },

  "llf-139b": {
    category: "LED COB Concealed Downlight",
    series: "llf-139b",
    group: "Special Series - Narrow Body",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-139B",
      description: "Architectural directional point-source COB fixture providing high lumen accentuation thresholds with deep dark-light anti-glare control profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-139B+Series"
    },
    config: {
      models: ["LLF-137", "LLF-137A", "LLF-137B", "LLF-138", "LLF-138A", "LLF-138B", "LLF-139", "LLF-139A", "LLF-139B"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø70x85mm"],
      watts: ["16W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black"],
      beamAngles: ["15°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø60mm"],
      ledChip: ["TEEN"],
      luminous: ["1280lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { voltage: "220-240V AC", watts: "16W", dimensions: "Ø70x85mm", cutoutSizes: "Ø60mm", bodyColor: "Black", beamAngles: "15°", ledChip: "TEEN", luminous: "1280lm", cri: ">90", cct: "6000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-139B+Detail+1"
    ]
  },

  "llf-210": {
    category: "LED COB Concealed Downlight",
    series: "llf-210",
    group: "S.P.O",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-210",
      description: "Architectural point-source COB fixture engineered for specific light distributions and premium visual comfort.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-210"
    },
    config: {
      models: ["LLF-210", "LLF-211", "LLF-212", "LLF-213", "LLF-214", "LLF-215"],
      dimensions: ["52x32x40mm"],
      watts: ["3W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["30°"],
      ipRating: ["IP20"],
      cutoutSizes: ["48x27.5mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["210-225lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "3W", dimensions: "52x32x40mm", cutoutSizes: "48x27.5mm", bodyColor: "White", beamAngles: "30°", ledChip: "BRIDGELUX", luminous: "210-225lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-210+Detail+1"
    ]
  },

  "llf-211": {
    category: "LED COB Concealed Downlight",
    series: "llf-211",
    group: "S.P.O",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-211",
      description: "Architectural point-source COB fixture engineered for specific light distributions and premium visual comfort.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-211"
    },
    config: {
      models: ["LLF-210", "LLF-211", "LLF-212", "LLF-213", "LLF-214", "LLF-215"],
      dimensions: ["62x32x40mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["30°"],
      ipRating: ["IP20"],
      cutoutSizes: ["57x27.5mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["350-375lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "62x32x40mm", cutoutSizes: "57x27.5mm", bodyColor: "White", beamAngles: "30°", ledChip: "BRIDGELUX", luminous: "350-375lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-211+Detail+1"
    ]
  },

  "llf-212": {
    category: "LED COB Concealed Downlight",
    series: "llf-212",
    group: "S.P.O",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-212",
      description: "Architectural point-source COB fixture engineered for specific light distributions and premium visual comfort.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-212"
    },
    config: {
      models: ["LLF-210", "LLF-211", "LLF-212", "LLF-213", "LLF-214", "LLF-215"],
      dimensions: ["52x52x40mm"],
      watts: ["8W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["30°"],
      ipRating: ["IP20"],
      cutoutSizes: ["48x48mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["420-600lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "8W", dimensions: "52x52x40mm", cutoutSizes: "48x48mm", bodyColor: "White", beamAngles: "30°", ledChip: "BRIDGELUX", luminous: "420-600lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-212+Detail+1"
    ]
  },

  "llf-213": {
    category: "LED COB Concealed Downlight",
    series: "llf-213",
    group: "S.P.O",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-213",
      description: "Architectural point-source COB fixture engineered for specific light distributions and premium visual comfort.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-213"
    },
    config: {
      models: ["LLF-210", "LLF-211", "LLF-212", "LLF-213", "LLF-214", "LLF-215"],
      dimensions: ["109x32x40mm"],
      watts: ["10W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["30°"],
      ipRating: ["IP20"],
      cutoutSizes: ["104x27.5mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["700-750lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "10W", dimensions: "109x32x40mm", cutoutSizes: "104x27.5mm", bodyColor: "White", beamAngles: "30°", ledChip: "BRIDGELUX", luminous: "700-750lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-213+Detail+1"
    ]
  },

  "llf-214": {
    category: "LED COB Concealed Downlight",
    series: "llf-214",
    group: "S.P.O",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-214",
      description: "Architectural point-source COB fixture engineered for specific light distributions and premium visual comfort.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-214"
    },
    config: {
      models: ["LLF-210", "LLF-211", "LLF-212", "LLF-213", "LLF-214", "LLF-215"],
      dimensions: ["71x71x40mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["30°"],
      ipRating: ["IP20"],
      cutoutSizes: ["68x68mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["840-900lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "12W", dimensions: "71x71x40mm", cutoutSizes: "68x68mm", bodyColor: "White", beamAngles: "30°", ledChip: "BRIDGELUX", luminous: "840-900lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-214+Detail+1"
    ]
  },

  "llf-215": {
    category: "LED COB Concealed Downlight",
    series: "llf-215",
    group: "S.P.O",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-215",
      description: "Architectural point-source COB fixture engineered for specific light distributions and premium visual comfort.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-215"
    },
    config: {
      models: ["LLF-210", "LLF-211", "LLF-212", "LLF-213", "LLF-214", "LLF-215"],
      dimensions: ["205x32x40mm"],
      watts: ["20W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["30°"],
      ipRating: ["IP20"],
      cutoutSizes: ["200x27.5mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["1260-1350lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "20W", dimensions: "205x32x40mm", cutoutSizes: "200x27.5mm", bodyColor: "White", beamAngles: "30°", ledChip: "BRIDGELUX", luminous: "1260-1350lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-215+Detail+1"
    ]
  },

  "llf-263": {
    category: "LED COB Concealed Downlight",
    series: "llf-263",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-263",
      description: "High-quality COB concealed fixture combining discrete aesthetics with exceptional light output.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-263"
    },
    config: {
      models: ["LLF-263", "LLF-263A", "LLF-264", "LLF-265", "LLF-265A", "LLF-266", "LLF-267"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø60x50mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["24°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø55mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["405-450lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "Ø60x50mm", cutoutSizes: "Ø55mm", bodyColor: "Matt White", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "405-450lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-263+Detail+1"
    ]
  },

  "llf-263a": {
    category: "LED COB Concealed Downlight",
    series: "llf-263a",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-263A",
      description: "High-quality COB concealed fixture combining discrete aesthetics with exceptional light output.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-263A"
    },
    config: {
      models: ["LLF-263", "LLF-263A", "LLF-264", "LLF-265", "LLF-265A", "LLF-266", "LLF-267"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø60x32mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["50°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø55mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["405-450lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "Ø60x32mm", cutoutSizes: "Ø55mm", bodyColor: "Matt Black", beamAngles: "50°", ledChip: "BRIDGELUX", luminous: "405-450lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-263A+Detail+1"
    ]
  },

  "llf-264": {
    category: "LED COB Concealed Downlight",
    series: "llf-264",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-264",
      description: "High-quality COB concealed fixture combining discrete aesthetics with exceptional light output and deep baffle design.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-264"
    },
    config: {
      models: ["LLF-263", "LLF-263A", "LLF-264", "LLF-265", "LLF-265A", "LLF-266", "LLF-267"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø60x100mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["24°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø55mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["415-480lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "Ø60x100mm", cutoutSizes: "Ø55mm", bodyColor: "Matt White", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "415-480lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-264+Detail+1"
    ]
  },

  "llf-265": {
    category: "LED COB Concealed Downlight",
    series: "llf-265",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-265",
      description: "High-quality COB concealed fixture combining discrete aesthetics with exceptional light output.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-265"
    },
    config: {
      models: ["LLF-263", "LLF-263A", "LLF-264", "LLF-265", "LLF-265A", "LLF-266", "LLF-267"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø82x60mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black", "Gold"],
      beamAngles: ["24°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø75mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["545-645lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "7W", dimensions: "Ø82x60mm", cutoutSizes: "Ø75mm", bodyColor: "Gold", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "545-645lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-265+Detail+1"
    ]
  },

  "llf-265a": {
    category: "LED COB Concealed Downlight",
    series: "llf-265a",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-265A",
      description: "High-quality COB concealed fixture combining discrete aesthetics with exceptional light output.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-265A"
    },
    config: {
      models: ["LLF-263", "LLF-263A", "LLF-264", "LLF-265", "LLF-265A", "LLF-266", "LLF-267"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø83x44mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black", "Gold"],
      beamAngles: ["38°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø75mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["500-560lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "7W", dimensions: "Ø83x44mm", cutoutSizes: "Ø75mm", bodyColor: "Matt Black", beamAngles: "38°", ledChip: "BRIDGELUX", luminous: "500-560lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-265A+Detail+1"
    ]
  },

  "llf-266": {
    category: "LED COB Concealed Downlight",
    series: "llf-266",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-266",
      description: "High-quality COB concealed fixture combining discrete aesthetics with exceptional light output.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-266"
    },
    config: {
      models: ["LLF-263", "LLF-263A", "LLF-264", "LLF-265", "LLF-265A", "LLF-266", "LLF-267"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø82x105mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black", "Gold"],
      beamAngles: ["24°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø75mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["450-635lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "7W", dimensions: "Ø82x105mm", cutoutSizes: "Ø75mm", bodyColor: "Matt White", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "450-635lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-266+Detail+1"
    ]
  },

  "llf-267": {
    category: "LED COB Concealed Downlight",
    series: "llf-267",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-267",
      description: "High-quality COB concealed fixture combining discrete aesthetics with exceptional light output and deep baffle design.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-267"
    },
    config: {
      models: ["LLF-263", "LLF-263A", "LLF-264", "LLF-265", "LLF-265A", "LLF-266", "LLF-267"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø82x150mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black", "Gold"],
      beamAngles: ["24°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø75mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["535-620lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "7W", dimensions: "Ø82x150mm", cutoutSizes: "Ø75mm", bodyColor: "Gold", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "535-620lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-267+Detail+1"
    ]
  },

  "llf-241": {
    category: "LED COB Concealed Downlight",
    series: "llf-241",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-241",
      description: "Premium CREE COB lighting featuring advanced heat dissipation and precise optics.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-241"
    },
    config: {
      models: ["LLF-241", "LLF-242", "LLF-243"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø74x63mm"],
      watts: ["9W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["38°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø65mm"],
      ledChip: ["CREE"],
      luminous: ["720lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "9W", dimensions: "Ø74x63mm", cutoutSizes: "Ø65mm", bodyColor: "White", beamAngles: "38°", ledChip: "CREE", luminous: "720lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-241+Detail+1"
    ]
  },

  "llf-242": {
    category: "LED COB Concealed Downlight",
    series: "llf-242",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-242",
      description: "Premium CREE COB lighting featuring advanced heat dissipation and precise optics with a deeper housing profile.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-242"
    },
    config: {
      models: ["LLF-241", "LLF-242", "LLF-243"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø74x100mm"],
      watts: ["8W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["40°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø65mm"],
      ledChip: ["CREE"],
      luminous: ["640lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "8W", dimensions: "Ø74x100mm", cutoutSizes: "Ø65mm", bodyColor: "Black", beamAngles: "40°", ledChip: "CREE", luminous: "640lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-242+Detail+1"
    ]
  },

  "llf-243": {
    category: "LED COB Concealed Downlight",
    series: "llf-243",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-243",
      description: "Premium CREE COB lighting featuring advanced heat dissipation and precise optics with a deeper housing profile.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-243"
    },
    config: {
      models: ["LLF-241", "LLF-242", "LLF-243"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø74x100mm"],
      watts: ["8W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White"],
      beamAngles: ["40°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø65mm"],
      ledChip: ["CREE"],
      luminous: ["640lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "8W", dimensions: "Ø74x100mm", cutoutSizes: "Ø65mm", bodyColor: "White", beamAngles: "40°", ledChip: "CREE", luminous: "640lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-243+Detail+1"
    ]
  },

  "llf-244": {
    category: "LED COB Concealed Downlight",
    series: "llf-244",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-244",
      description: "Premium CREE COB lighting featuring advanced heat dissipation and precise optics in a square profile.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-244"
    },
    config: {
      models: ["LLF-244", "LLF-245", "LLF-246", "LLF-247"],
    //   voltage: ["220-240V AC"],
      dimensions: ["79x79x88mm"],
      watts: ["9W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["38°"],
      ipRating: ["IP20"],
      cutoutSizes: ["72x72mm"],
      ledChip: ["CREE"],
      luminous: ["720lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "9W", dimensions: "79x79x88mm", cutoutSizes: "72x72mm", bodyColor: "White", beamAngles: "38°", ledChip: "CREE", luminous: "720lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-244+Detail+1"
    ]
  },

  "llf-245": {
    category: "LED COB Concealed Downlight",
    series: "llf-245",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-245",
      description: "Premium CREE COB lighting featuring advanced heat dissipation and precise optics in a square profile.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-245"
    },
    config: {
      models: ["LLF-244", "LLF-245", "LLF-246", "LLF-247"],
    //   voltage: ["220-240V AC"],
      dimensions: ["79x79x94mm"],
      watts: ["15W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["38°"],
      ipRating: ["IP20"],
      cutoutSizes: ["72x72mm"],
      ledChip: ["CREE"],
      luminous: ["1200lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "15W", dimensions: "79x79x94mm", cutoutSizes: "72x72mm", bodyColor: "White", beamAngles: "38°", ledChip: "CREE", luminous: "1200lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-245+Detail+1"
    ]
  },

  "llf-246": {
    category: "LED COB Concealed Downlight",
    series: "llf-246",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-246",
      description: "Premium dual-head CREE COB lighting featuring advanced heat dissipation and precise optics in a rectangular profile.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-246"
    },
    config: {
      models: ["LLF-244", "LLF-245", "LLF-246", "LLF-247"],
    //   voltage: ["220-240V AC"],
      dimensions: ["155x79x88mm"],
      watts: ["2x9W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["38°"],
      ipRating: ["IP20"],
      cutoutSizes: ["148x72mm"],
      ledChip: ["CREE"],
      luminous: ["1440lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "2x9W", dimensions: "155x79x88mm", cutoutSizes: "148x72mm", bodyColor: "White", beamAngles: "38°", ledChip: "CREE", luminous: "1440lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-246+Detail+1"
    ]
  },

  "llf-247": {
    category: "LED COB Concealed Downlight",
    series: "llf-247",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-247",
      description: "Premium dual-head CREE COB lighting featuring advanced heat dissipation and precise optics in a rectangular profile.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-247"
    },
    config: {
      models: ["LLF-244", "LLF-245", "LLF-246", "LLF-247"],
    //   voltage: ["220-240V AC"],
      dimensions: ["155x79x94mm"],
      watts: ["2x15W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White"],
      beamAngles: ["38°"],
      ipRating: ["IP20"],
      cutoutSizes: ["148x72mm"],
      ledChip: ["CREE"],
      luminous: ["2400lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "2x15W", dimensions: "155x79x94mm", cutoutSizes: "148x72mm", bodyColor: "White", beamAngles: "38°", ledChip: "CREE", luminous: "2400lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-247+Detail+1"
    ]
  },

  "llf-248": {
    category: "LED COB Concealed Downlight",
    series: "llf-248",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-248",
      description: "High-performance fixture offering selective beam angles (15°/24°/36°) for tailored illumination.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-248"
    },
    config: {
      models: ["LLF-248", "LLF-249", "LLF-250", "LLF-251", "LLF-252"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø69x84mm"],
      watts: ["10W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["15°", "24°", "36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø61mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["900-1350lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "10W", dimensions: "Ø69x84mm", cutoutSizes: "Ø61mm", bodyColor: "Matt White", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "900-1350lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-248+Detail+1"
    ]
  },

  "llf-249": {
    category: "LED COB Concealed Downlight",
    series: "llf-249",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-249",
      description: "High-performance fixture offering selective beam angles (15°/24°/36°) for tailored illumination.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-249"
    },
    config: {
      models: ["LLF-248", "LLF-249", "LLF-250", "LLF-251", "LLF-252"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø84x91mm"],
      watts: ["15W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["15°", "24°", "36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø76mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["1350-1800lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "15W", dimensions: "Ø84x91mm", cutoutSizes: "Ø76mm", bodyColor: "Matt Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "1350-1800lm", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-249+Detail+1"
    ]
  },

  "llf-250": {
    category: "LED COB Concealed Downlight",
    series: "llf-250",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-250",
      description: "High-performance fixture offering selective beam angles (15°/24°/36°) for tailored illumination.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-250"
    },
    config: {
      models: ["LLF-248", "LLF-249", "LLF-250", "LLF-251", "LLF-252"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø95.5x110mm"],
      watts: ["20W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["15°", "24°", "36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø85.5mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["1800-2200lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "20W", dimensions: "Ø95.5x110mm", cutoutSizes: "Ø85.5mm", bodyColor: "Matt White", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "1800-2200lm", cri: ">90", cct: "6000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-250+Detail+1"
    ]
  },

  "llf-251": {
    category: "LED COB Concealed Downlight",
    series: "llf-251",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-251",
      description: "High-performance fixture offering selective beam angles (15°/24°/36°) for tailored illumination.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-251"
    },
    config: {
      models: ["LLF-248", "LLF-249", "LLF-250", "LLF-251", "LLF-252"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø112x112mm"],
      watts: ["30W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["15°", "24°", "36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø102mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["2700-3150lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "30W", dimensions: "Ø112x112mm", cutoutSizes: "Ø102mm", bodyColor: "Matt Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "2700-3150lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-251+Detail+1"
    ]
  },

  "llf-252": {
    category: "LED COB Concealed Downlight",
    series: "llf-252",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-252",
      description: "High-performance fixture offering selective beam angles (15°/24°/36°) for tailored illumination.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-252"
    },
    config: {
      models: ["LLF-248", "LLF-249", "LLF-250", "LLF-251", "LLF-252"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø136x129mm"],
      watts: ["40W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["15°", "24°", "36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø125mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["3600-4500lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "40W", dimensions: "Ø136x129mm", cutoutSizes: "Ø125mm", bodyColor: "Matt White", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "3600-4500lm", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-252+Detail+1"
    ]
  },

  "llf-253": {
    category: "LED COB Concealed Downlight",
    series: "llf-253",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-253",
      description: "Architectural directional point-source COB fixture providing precise beam delivery and high structural integration capabilities.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-253"
    },
    config: {
      models: ["LLF-253", "LLF-254", "LLF-255", "LLF-255AMINI"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø65x100mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø55mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["390-430lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "Ø65x100mm", cutoutSizes: "Ø55mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "390-430lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-253+Detail+1"
    ]
  },

  "llf-254": {
    category: "LED COB Concealed Downlight",
    series: "llf-254",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-254",
      description: "Architectural directional point-source COB fixture providing precise beam delivery and high structural integration capabilities.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-254"
    },
    config: {
      models: ["LLF-253", "LLF-254", "LLF-255", "LLF-255AMINI"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø85x110mm"],
      watts: ["10W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø75mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["670-750lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "10W", dimensions: "Ø85x110mm", cutoutSizes: "Ø75mm", bodyColor: "Matt Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "670-750lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-254+Detail+1"
    ]
  },

  "llf-255": {
    category: "LED COB Concealed Downlight",
    series: "llf-255",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-255",
      description: "Architectural directional point-source COB fixture providing precise beam delivery and high structural integration capabilities.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-255"
    },
    config: {
      models: ["LLF-253", "LLF-254", "LLF-255", "LLF-255AMINI"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø100x110mm"],
      watts: ["15W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø90mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["1040-1100lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "15W", dimensions: "Ø100x110mm", cutoutSizes: "Ø90mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "1040-1100lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-255+Detail+1"
    ]
  },

  "llf-255amini": {
    category: "LED COB Concealed Downlight",
    series: "llf-255amini",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-255AMINI",
      description: "Compact architectural downlight offering strong performance threshold values in a downscaled body format.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-255AMINI"
    },
    config: {
      models: ["LLF-253", "LLF-254", "LLF-255", "LLF-255AMINI"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø75x72x88mm"],
      watts: ["9W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø62mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "9W", dimensions: "Ø75x72x88mm", cutoutSizes: "Ø62mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-255AMINI+Detail+1"
    ]
  },

  "llf-253a": {
    category: "LED COB Concealed Downlight",
    series: "llf-253a",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-253A",
      description: "Miniature architectural COB fixture engineered for discrete point-source illumination and high design integration.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-253A"
    },
    config: {
      models: ["LLF-253A", "LLF-254A", "LLF-254B", "LLF-253AA"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø43x43x88mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø35mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["70lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "Ø43x43x88mm", cutoutSizes: "Ø35mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "70lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-253A+Detail+1"
    ]
  },

  "llf-245a": {
    category: "LED COB Concealed Downlight",
    series: "llf-244a",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-244A",
      description: "Architectural COB fixture engineered for discrete point-source illumination with an extended deep baffle body formatting.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-244A"
    },
    config: {
      models: ["LLF-253A", "LLF-254A", "LLF-254B", "LLF-253AA"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø43x53x95mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø45mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["75lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "7W", dimensions: "Ø43x53x95mm", cutoutSizes: "Ø45mm", bodyColor: "Matt Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "75lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-244A+Detail+1"
    ]
  },

  "llf-254b": {
    category: "LED COB Concealed Downlight",
    series: "llf-254b",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-254B",
      description: "Dual-headed architectural downlight engineered for linear multi-directional accentuation threshold delivery profiles.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-254B"
    },
    config: {
      models: ["LLF-253A", "LLF-254A", "LLF-254B", "LLF-253AA"],
    //   voltage: ["220-240V AC"],
      dimensions: ["88x168x95mm"],
      watts: ["2x12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["73x153mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["70lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "2x12W", dimensions: "88x168x95mm", cutoutSizes: "73x153mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "70lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-254B+Detail+1"
    ]
  },

  "llf-253aa": {
    category: "LED COB Concealed Downlight",
    series: "llf-253aa",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-253AA",
      description: "Ultra-compact profile point-source COB engine providing high-efficiency low threshold lighting parameters.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-253AA"
    },
    config: {
      models: ["LLF-253A", "LLF-254A", "LLF-254B", "LLF-253AA"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø30x58x58mm"],
      watts: ["3W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø50mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["70lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "3W", dimensions: "Ø30x58x58mm", cutoutSizes: "Ø50mm", bodyColor: "Matt Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "70lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-253AA+Detail+1"
    ]
  },

  "llf-360": {
    category: "LED COB Concealed Downlight",
    series: "llf-360",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-360",
      description: "IP44-rated architectural concealed downlight designed for enhanced protection and premium visual performance.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-360"
    },
    config: {
      models: ["LLF-360", "LLF-361", "LLF-362", "LLF-363"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø50x58mm"],
      watts: ["2W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White + White", "Black + Black"],
      beamAngles: ["36°"],
      ipRating: ["IP44"],
      cutoutSizes: ["Ø30mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "2W", dimensions: "Ø50x58mm", cutoutSizes: "Ø30mm", bodyColor: "White + White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-360+Detail+1"
    ]
  },

  "llf-361": {
    category: "LED COB Concealed Downlight",
    series: "llf-361",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-361",
      description: "IP44-rated architectural concealed downlight designed for enhanced protection and premium visual performance.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-361"
    },
    config: {
      models: ["LLF-360", "LLF-361", "LLF-362", "LLF-363"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø71x32x66mm"],
      watts: ["6W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White + White", "Black + Black"],
      beamAngles: ["36°"],
      ipRating: ["IP44"],
      cutoutSizes: ["Ø64x25mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "6W", dimensions: "Ø71x32x66mm", cutoutSizes: "Ø64x25mm", bodyColor: "White + White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-361+Detail+1"
    ]
  },

  "llf-362": {
    category: "LED COB Concealed Downlight",
    series: "llf-362",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-362",
      description: "IP44-rated architectural concealed downlight designed for enhanced protection and premium visual performance.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-362"
    },
    config: {
      models: ["LLF-360", "LLF-361", "LLF-362", "LLF-363"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø111x32x66mm"],
      watts: ["10W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White + White", "Black + Black"],
      beamAngles: ["36°"],
      ipRating: ["IP44"],
      cutoutSizes: ["Ø104x25mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "10W", dimensions: "Ø111x32x66mm", cutoutSizes: "Ø104x25mm", bodyColor: "Black + Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-362+Detail+1"
    ]
  },

  "llf-363": {
    category: "LED COB Concealed Downlight",
    series: "llf-363",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-363",
      description: "IP44-rated architectural concealed downlight designed for enhanced protection and premium visual performance.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-363"
    },
    config: {
      models: ["LLF-360", "LLF-361", "LLF-362", "LLF-363"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø211x32x66mm"],
      watts: ["20W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White + White", "Black + Black"],
      beamAngles: ["36°"],
      ipRating: ["IP44"],
      cutoutSizes: ["Ø204x25mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "20W", dimensions: "Ø211x32x66mm", cutoutSizes: "Ø204x25mm", bodyColor: "White + White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-363+Detail+1"
    ]
  },

  "llf-256": {
    category: "LED COB Concealed Downlight",
    series: "llf-256",
    group: "S.P.O Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-256",
      description: "Compact modular point-source fixture engineered for square architectural environments providing high structural integration.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-256"
    },
    config: {
      models: ["LLF-256", "LLF-257", "LLF-258", "LLF-259", "LLF-260"],
    //   voltage: ["220-240V AC"],
      dimensions: ["45x45x42mm"],
      watts: ["3W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["35x35mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["105-110lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "3W", dimensions: "45x45x42mm", cutoutSizes: "35x35mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "105-110lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-256+Detail+1"
    ]
  },

  "llf-257": {
    category: "LED COB Concealed Downlight",
    series: "llf-257",
    group: "S.P.O Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-257",
      description: "Low-profile circular point-source fixture engineered for discrete high-performance ceiling cutouts.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-257"
    },
    config: {
      models: ["LLF-256", "LLF-257", "LLF-258", "LLF-259", "LLF-260"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø85x38mm"],
      watts: ["10W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø75mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["440-530lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "10W", dimensions: "Ø85x38mm", cutoutSizes: "Ø75mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "440-530lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-257+Detail+1"
    ]
  },

  "llf-258": {
    category: "LED COB Concealed Downlight",
    series: "llf-258",
    group: "S.P.O Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-258",
      description: "Mid-size square point-source architectural downlight blending high lumen delivery with minimalist edge lines.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-258"
    },
    config: {
      models: ["LLF-256", "LLF-257", "LLF-258", "LLF-259", "LLF-260"],
    //   voltage: ["220-240V AC"],
      dimensions: ["75x75x42mm"],
      watts: ["10W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["65x65mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["500-560lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "10W", dimensions: "75x75x42mm", cutoutSizes: "65x65mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "500-560lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-258+Detail+1"
    ]
  },

  "llf-259": {
    category: "LED COB Concealed Downlight",
    series: "llf-259",
    group: "S.P.O Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-259",
      description: "Linear multi-cell architectural profile delivering unified multi-point orientation accent thresholds.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-259"
    },
    config: {
      models: ["LLF-256", "LLF-257", "LLF-258", "LLF-259", "LLF-260"],
    //   voltage: ["220-240V AC"],
      dimensions: ["147x45x42mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["137x35mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["610-730lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "12W", dimensions: "147x45x42mm", cutoutSizes: "137x35mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "610-730lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-259+Detail+1"
    ]
  },

  "llf-260": {
    category: "LED COB Concealed Downlight",
    series: "llf-260",
    group: "S.P.O Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-260",
      description: "Extended linear multi-cell configuration for deep architectural glare-control configurations.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-260"
    },
    config: {
      models: ["LLF-256", "LLF-257", "LLF-258", "LLF-259", "LLF-260"],
    //   voltage: ["220-240V AC"],
      dimensions: ["280x45x42mm"],
      watts: ["24W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["270x35mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["1150-1350lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "24W", dimensions: "280x45x42mm", cutoutSizes: "270x35mm", bodyColor: "Matt Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "1150-1350lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-260+Detail+1"
    ]
  },

  "llf-259a": {
    category: "LED COB Concealed Downlight",
    series: "llf-259a",
    group: "Rimless S.P.O Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-259A RIMLESS",
      description: "Premium rimless conceal fixture offering seamless architectural ceiling integration with high-efficiency output.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-259A+Rimless"
    },
    config: {
      models: ["LLF-259A", "LLF-260A"],
    //   voltage: ["220-240V AC"],
      dimensions: ["205x150x42mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["205x150mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["610-730lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "12W", dimensions: "205x150x42mm", cutoutSizes: "205x150mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "610-730lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-259A+Detail+1"
    ]
  },

  "llf-260a": {
    category: "LED COB Concealed Downlight",
    series: "llf-260a",
    group: "Rimless S.P.O Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-260A RIMLESS",
      description: "Premium rimless conceal fixture offering seamless architectural ceiling integration with high-efficiency output.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-260A+Rimless"
    },
    config: {
      models: ["LLF-259A", "LLF-260A"],
    //   voltage: ["220-240V AC"],
      dimensions: ["336x280x42mm"],
      watts: ["24W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["205x150mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["1150-1350lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "24W", dimensions: "336x280x42mm", cutoutSizes: "205x150mm", bodyColor: "Matt Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "1150-1350lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-260A+Detail+1"
    ]
  },

  "llf-261": {
    category: "LED COB Concealed Downlight",
    series: "llf-261",
    group: "Wallwasher Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-261 WALLWASHER",
      description: "Asymmetrical architectural wallwasher designed for uniform vertical surface illumination and excellent glare control.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-261+Wallwasher"
    },
    config: {
      models: ["LLF-261", "LLF-262"],
    //   voltage: ["220-240V AC"],
      dimensions: ["153x50x48mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["148x43mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["605-710lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "12W", dimensions: "153x50x48mm", cutoutSizes: "148x43mm", bodyColor: "Matt White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "605-710lm", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-261+Detail+1"
    ]
  },

  "llf-262": {
    category: "LED COB Concealed Downlight",
    series: "llf-262",
    group: "Wallwasher Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-262 WALLWASHER",
      description: "Extended asymmetrical architectural wallwasher engineered for high-output uniform vertical surface distribution.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-262+Wallwasher"
    },
    config: {
      models: ["LLF-261", "LLF-262"],
    //   voltage: ["220-240V AC"],
      dimensions: ["287x50x48mm"],
      watts: ["24W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Matt White", "Matt Black"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["282x45mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["1275-1460lm"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "24W", dimensions: "287x50x48mm", cutoutSizes: "282x45mm", bodyColor: "Matt Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "1275-1460lm", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-262+Detail+1"
    ]
  },

  "llf-354": {
    category: "LED COB Concealed Downlight",
    series: "llf-354",
    group: "Linear Reflector Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-354",
      description: "Miniature linear architectural downlight featuring a low-profile multi-cell glare-reduction reflector system.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-354"
    },
    config: {
      models: ["LLF-354", "LLF-355", "LLF-356"],
    //   voltage: ["220-240V AC"],
      dimensions: ["110x20x29mm"],
      watts: ["6W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White with Black Reflector", "Black with Black Reflector"],
      beamAngles: ["45°"],
      ipRating: ["IP20"],
      cutoutSizes: ["105x15mm"],
      ledChip: ["TIANDIAN 2835"],
      luminous: ["363lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "6W", dimensions: "110x20x29mm", cutoutSizes: "105x15mm", bodyColor: "White with Black Reflector", beamAngles: "45°", ledChip: "TIANDIAN 2835", luminous: "363lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-354+Detail+1"
    ]
  },

  "llf-355": {
    category: "LED COB Concealed Downlight",
    series: "llf-355",
    group: "Linear Reflector Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-355",
      description: "Linear architectural multi-cell downlight configured with a contrast reflector setup for modern accent layouts.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-355"
    },
    config: {
      models: ["LLF-354", "LLF-355", "LLF-356"],
    //   voltage: ["220-240V AC"],
      dimensions: ["210x20x29mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White with Black Reflector", "Black with Black Reflector"],
      beamAngles: ["45°"],
      ipRating: ["IP20"],
      cutoutSizes: ["205x15mm"],
      ledChip: ["TIANDIAN 2835"],
      luminous: ["654lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "12W", dimensions: "210x20x29mm", cutoutSizes: "205x15mm", bodyColor: "Black with Black Reflector", beamAngles: "45°", ledChip: "TIANDIAN 2835", luminous: "654lm", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-355+Detail+1"
    ]
  },

  "llf-356": {
    category: "LED COB Concealed Downlight",
    series: "llf-356",
    group: "Linear Reflector Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-356",
      description: "Extended linear multi-cell downlight maximizing light delivery with a specialized low-glare dual-color trim profile.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-356"
    },
    config: {
      models: ["LLF-354", "LLF-355", "LLF-356"],
    //   voltage: ["220-240V AC"],
      dimensions: ["307x20x29mm"],
      watts: ["18W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White with Black Reflector", "Black with Black Reflector"],
      beamAngles: ["45°"],
      ipRating: ["IP20"],
      cutoutSizes: ["301x15mm"],
      ledChip: ["TIANDIAN 2835"],
      luminous: ["936lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "18W", dimensions: "307x20x29mm", cutoutSizes: "301x15mm", bodyColor: "White with Black Reflector", beamAngles: "45°", ledChip: "TIANDIAN 2835", luminous: "936lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-356+Detail+1"
    ]
  },

  "llf-357": {
    category: "LED COB Concealed Downlight",
    series: "llf-357",
    group: "Linear Reflector Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-357",
      description: "Architectural multi-cell linear downlight engineered with enhanced width housing and a high-contrast dark reflector system.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-357"
    },
    config: {
      models: ["LLF-357", "LLF-358", "LLF-359"],
    //   voltage: ["220-240V AC"],
      dimensions: ["120x28.5x34mm"],
      watts: ["6W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White with Black Reflector", "Black with Black Reflector"],
      beamAngles: ["45°"],
      ipRating: ["IP20"],
      cutoutSizes: ["110x26mm"],
      ledChip: ["TIANDIAN 2835"],
      luminous: ["363lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "6W", dimensions: "120x28.5x34mm", cutoutSizes: "110x26mm", bodyColor: "White with Black Reflector", beamAngles: "45°", ledChip: "TIANDIAN 2835", luminous: "363lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-357+Detail+1"
    ]
  },

  "llf-358": {
    category: "LED COB Concealed Downlight",
    series: "llf-358",
    group: "Linear Reflector Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-358",
      description: "Architectural multi-cell linear downlight engineered with enhanced width housing and a high-contrast dark reflector system.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-358"
    },
    config: {
      models: ["LLF-357", "LLF-358", "LLF-359"],
    //   voltage: ["220-240V AC"],
      dimensions: ["218x28.5x34mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White with Black Reflector", "Black with Black Reflector"],
      beamAngles: ["45°"],
      ipRating: ["IP20"],
      cutoutSizes: ["210x26mm"],
      ledChip: ["TIANDIAN 2835"],
      luminous: ["654lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "12W", dimensions: "218x28.5x34mm", cutoutSizes: "210x26mm", bodyColor: "Black with Black Reflector", beamAngles: "45°", ledChip: "TIANDIAN 2835", luminous: "654lm", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-358+Detail+1"
    ]
  },

  "llf-359": {
    category: "LED COB Concealed Downlight",
    series: "llf-359",
    group: "Linear Reflector Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-359",
      description: "Architectural multi-cell linear downlight engineered with enhanced width housing and a high-contrast dark reflector system.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-359"
    },
    config: {
      models: ["LLF-357", "LLF-358", "LLF-359"],
    //   voltage: ["220-240V AC"],
      dimensions: ["316x28.5x34mm"],
      watts: ["18W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["White with Black Reflector", "Black with Black Reflector"],
      beamAngles: ["45°"],
      ipRating: ["IP20"],
      cutoutSizes: ["308x26mm"],
      ledChip: ["TIANDIAN 2835"],
      luminous: ["936lm"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "18W", dimensions: "316x28.5x34mm", cutoutSizes: "308x26mm", bodyColor: "White with Black Reflector", beamAngles: "45°", ledChip: "TIANDIAN 2835", luminous: "936lm", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-359+Detail+1"
    ]
  },

  "llf-1047": {
    category: "LED COB Concealed Downlight",
    series: "llf-1047",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-1047",
      description: "Linear architectural multi-cell COB fixture offering refined glare control profiles and exceptional spectral purity across multiple CCT thresholds.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-1047"
    },
    config: {
      models: ["LLF-1047", "LLF-1048", "LLF-1049", "LLF-1050"],
    //   voltage: ["220-240V AC"],
      dimensions: ["68x29x43mm"],
      watts: ["5W"],
      cct: [
        { label: "2700K", color: "#F5C469" },
        { label: "3000K", color: "#F5D68C" },
        { label: "3500K", color: "#F5E3A1" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "5000K", color: "#EAF2F8" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["63x24mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "68x29x43mm", cutoutSizes: "63x24mm", bodyColor: "White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-1047+Detail+1"
    ]
  },

  "llf-1048": {
    category: "LED COB Concealed Downlight",
    series: "llf-1048",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-1048",
      description: "Linear architectural multi-cell COB fixture offering refined glare control profiles and exceptional spectral purity across multiple CCT thresholds.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-1048"
    },
    config: {
      models: ["LLF-1047", "LLF-1048", "LLF-1049", "LLF-1050"],
    //   voltage: ["220-240V AC"],
      dimensions: ["108x29x43mm"],
      watts: ["10W"],
      cct: [
        { label: "2700K", color: "#F5C469" },
        { label: "3000K", color: "#F5D68C" },
        { label: "3500K", color: "#F5E3A1" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "5000K", color: "#EAF2F8" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["103x24mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "10W", dimensions: "108x29x43mm", cutoutSizes: "103x24mm", bodyColor: "Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-1048+Detail+1"
    ]
  },

  "llf-1049": {
    category: "LED COB Concealed Downlight",
    series: "llf-1049",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-1049",
      description: "Linear architectural multi-cell COB fixture offering refined glare control profiles and exceptional spectral purity across multiple CCT thresholds.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-1049"
    },
    config: {
      models: ["LLF-1047", "LLF-1048", "LLF-1049", "LLF-1050"],
    //   voltage: ["220-240V AC"],
      dimensions: ["211x32x43mm"],
      watts: ["15W"],
      cct: [
        { label: "2700K", color: "#F5C469" },
        { label: "3000K", color: "#F5D68C" },
        { label: "3500K", color: "#F5E3A1" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "5000K", color: "#EAF2F8" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["203x25mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "15W", dimensions: "211x32x43mm", cutoutSizes: "203x25mm", bodyColor: "White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-1049+Detail+1"
    ]
  },

  "llf-1050": {
    category: "LED COB Concealed Downlight",
    series: "llf-1050",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-1050",
      description: "Linear architectural multi-cell COB fixture offering refined glare control profiles and exceptional spectral purity across multiple CCT thresholds.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-1050"
    },
    config: {
      models: ["LLF-1047", "LLF-1048", "LLF-1049", "LLF-1050"],
    //   voltage: ["220-240V AC"],
      dimensions: ["211x32x43mm"],
      watts: ["20W"],
      cct: [
        { label: "2700K", color: "#F5C469" },
        { label: "3000K", color: "#F5D68C" },
        { label: "3500K", color: "#F5E3A1" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "5000K", color: "#EAF2F8" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["203x25mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "20W", dimensions: "211x32x43mm", cutoutSizes: "203x25mm", bodyColor: "Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-1050+Detail+1"
    ]
  },

  "llf-1051": {
    category: "LED COB Concealed Downlight",
    series: "llf-1051",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-1051",
      description: "Linear architectural multi-cell COB fixture offering refined glare control profiles and exceptional spectral purity across multiple CCT thresholds.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-1051"
    },
    config: {
      models: ["LLF-1051", "LLF-1052", "LLF-1053", "LLF-1054"],
    //   voltage: ["220-240V AC"],
      dimensions: ["77x42x43mm"],
      watts: ["5W"],
      cct: [
        { label: "2700K", color: "#F5C469" },
        { label: "3000K", color: "#F5D68C" },
        { label: "3500K", color: "#F5E3A1" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "5000K", color: "#EAF2F8" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["70x36mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "77x42x43mm", cutoutSizes: "70x36mm", bodyColor: "White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-1051+Detail+1"
    ]
  },

  "llf-1052": {
    category: "LED COB Concealed Downlight",
    series: "llf-1052",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-1052",
      description: "Linear architectural multi-cell COB fixture offering refined glare control profiles and exceptional spectral purity across multiple CCT thresholds.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-1052"
    },
    config: {
      models: ["LLF-1051", "LLF-1052", "LLF-1053", "LLF-1054"],
    //   voltage: ["220-240V AC"],
      dimensions: ["117x42x43mm"],
      watts: ["10W"],
      cct: [
        { label: "2700K", color: "#F5C469" },
        { label: "3000K", color: "#F5D68C" },
        { label: "3500K", color: "#F5E3A1" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "5000K", color: "#EAF2F8" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["110x36mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "10W", dimensions: "117x42x43mm", cutoutSizes: "110x36mm", bodyColor: "Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-1052+Detail+1"
    ]
  },

  "llf-1053": {
    category: "LED COB Concealed Downlight",
    series: "llf-1053",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-1053",
      description: "Linear architectural multi-cell COB fixture offering refined glare control profiles and exceptional spectral purity across multiple CCT thresholds.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-1053"
    },
    config: {
      models: ["LLF-1051", "LLF-1052", "LLF-1053", "LLF-1054"],
    //   voltage: ["220-240V AC"],
      dimensions: ["217x45x43mm"],
      watts: ["15W"],
      cct: [
        { label: "2700K", color: "#F5C469" },
        { label: "3000K", color: "#F5D68C" },
        { label: "3500K", color: "#F5E3A1" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "5000K", color: "#EAF2F8" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["211x37mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "15W", dimensions: "217x45x43mm", cutoutSizes: "211x37mm", bodyColor: "White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-1053+Detail+1"
    ]
  },

  "llf-1054": {
    category: "LED COB Concealed Downlight",
    series: "llf-1054",
    group: "LED COB Concealed Downlight",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-1054",
      description: "Linear architectural multi-cell COB fixture offering refined glare control profiles and exceptional spectral purity across multiple CCT thresholds.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-1054"
    },
    config: {
      models: ["LLF-1051", "LLF-1052", "LLF-1053", "LLF-1054"],
    //   voltage: ["220-240V AC"],
      dimensions: ["217x45x43mm"],
      watts: ["20W"],
      cct: [
        { label: "2700K", color: "#F5C469" },
        { label: "3000K", color: "#F5D68C" },
        { label: "3500K", color: "#F5E3A1" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "5000K", color: "#EAF2F8" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["211x37mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "20W", dimensions: "217x45x43mm", cutoutSizes: "211x37mm", bodyColor: "Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-1054+Detail+1"
    ]
  },

  "llf-275": {
    category: "LED COB Concealed Downlight",
    series: "llf-275",
    group: "Fixed Deep Series with Honeycomb Louvre",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-275",
      description: "Fixed deep architectural COB downlight featuring an integrated honeycomb louvre for advanced glare reduction and micro-point precision mapping.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-275"
    },
    config: {
      models: ["LLF-275", "LLF-275A", "LLF-276", "LLF-276A"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø41x85mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["24°", "40°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø34mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "7W", dimensions: "Ø41x85mm", cutoutSizes: "Ø34mm", bodyColor: "White", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-275+Detail+1"
    ]
  },

  "llf-275a": {
    category: "LED COB Concealed Downlight",
    series: "llf-275a",
    group: "Fixed Deep Series with Honeycomb Louvre",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-275A",
      description: "Movable deep architectural COB downlight featuring an adjustable orientation setup and integrated honeycomb louvre for precision shielding.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-275A"
    },
    config: {
      models: ["LLF-275", "LLF-275A", "LLF-276", "LLF-276A"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø50x85mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["24°", "40°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø43mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "7W", dimensions: "Ø50x85mm", cutoutSizes: "Ø43mm", bodyColor: "Black", beamAngles: "40°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-275A+Detail+1"
    ]
  },

  "llf-276": {
    category: "LED COB Concealed Downlight",
    series: "llf-276",
    group: "Fixed Deep Series with Honeycomb Louvre",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-276",
      description: "Fixed deep architectural COB downlight featuring an integrated honeycomb louvre for advanced glare reduction and micro-point precision mapping.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-276"
    },
    config: {
      models: ["LLF-275", "LLF-275A", "LLF-276", "LLF-276A"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø55x100mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["24°", "40°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø47mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "12W", dimensions: "Ø55x100mm", cutoutSizes: "Ø47mm", bodyColor: "White", beamAngles: "24°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-276+Detail+1"
    ]
  },

  "llf-276a": {
    category: "LED COB Concealed Downlight",
    series: "llf-276a",
    group: "Fixed Deep Series with Honeycomb Louvre",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-276A",
      description: "Movable deep architectural COB downlight featuring an adjustable orientation setup and integrated honeycomb louvre for precision shielding.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-276A"
    },
    config: {
      models: ["LLF-275", "LLF-275A", "LLF-276", "LLF-276A"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø65x100mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Black"],
      beamAngles: ["24°", "40°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø58mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "12W", dimensions: "Ø65x100mm", cutoutSizes: "Ø58mm", bodyColor: "Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-276A+Detail+1"
    ]
  },

  "llf-286": {
    category: "LED COB Concealed Downlight",
    series: "llf-286",
    group: "Low Depth Honeycomb Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-286",
      description: "Low-profile architectural point-source fixture combining a shallow recess depth with an integrated honeycomb louvre for exceptional glare shielding.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-286"
    },
    config: {
      models: ["LLF-286", "LLF-287", "LLF-288"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø60x44mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Matt Black", "Rose Gold", "Black Chrome", "Chrome", "Bronze"],
      beamAngles: ["38°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø50mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "Ø60x44mm", cutoutSizes: "Ø50mm", bodyColor: "White", beamAngles: "38°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">80", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-286+Detail+1"
    ]
  },

  "llf-287": {
    category: "LED COB Concealed Downlight",
    series: "llf-287",
    group: "Low Depth Honeycomb Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-287",
      description: "Low-profile architectural point-source fixture combining a shallow recess depth with an integrated honeycomb louvre for exceptional glare shielding.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-287"
    },
    config: {
      models: ["LLF-286", "LLF-287", "LLF-288"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø70x48mm"],
      watts: ["7W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Matt Black", "Rose Gold", "Black Chrome", "Chrome", "Bronze"],
      beamAngles: ["38°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø60mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "7W", dimensions: "Ø70x48mm", cutoutSizes: "Ø60mm", bodyColor: "Matt Black", beamAngles: "38°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">80", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-287+Detail+1"
    ]
  },

  "llf-288": {
    category: "LED COB Concealed Downlight",
    series: "llf-288",
    group: "Low Depth Honeycomb Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-288",
      description: "Low-profile architectural point-source fixture combining a shallow recess depth with an integrated honeycomb louvre for exceptional glare shielding.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-288"
    },
    config: {
      models: ["LLF-286", "LLF-287", "LLF-288"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø80x48mm"],
      watts: ["12W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["White", "Matt Black", "Rose Gold", "Black Chrome", "Chrome", "Bronze"],
      beamAngles: ["38°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø70mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["80lm/W"],
      cri: [">80"]
    },
    // permutations: [
    //   { watts: "12W", dimensions: "Ø80x48mm", cutoutSizes: "Ø70mm", bodyColor: "White", beamAngles: "38°", ledChip: "BRIDGELUX", luminous: "80lm/W", cri: ">80", cct: "6000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-288+Detail+1"
    ]
  },

  "llf-289": {
    category: "LED COB Concealed Downlight",
    series: "llf-289",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-289",
      description: "Miniature architectural point-source COB downlight engineered for discrete, high-efficiency spotlighting installations.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-289"
    },
    config: {
      models: ["LLF-289", "LLF-290", "LLF-291"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø40x48.5mm"],
      watts: ["3W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø35mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["60lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "3W", dimensions: "Ø40x48.5mm", cutoutSizes: "Ø35mm", bodyColor: "White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "60lm/W", cri: ">90", cct: "3000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-289+Detail+1"
    ]
  },

  "llf-290": {
    category: "LED COB Concealed Downlight",
    series: "llf-290",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-290",
      description: "Architectural point-source COB downlight offering precise beam control and optimal thermal management in a compact form factor.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-290"
    },
    config: {
      models: ["LLF-289", "LLF-290", "LLF-291"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø50x70mm"],
      watts: ["5W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø45mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["60lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "5W", dimensions: "Ø50x70mm", cutoutSizes: "Ø45mm", bodyColor: "Black", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "60lm/W", cri: ">90", cct: "4000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-290+Detail+1"
    ]
  },

  "llf-291": {
    category: "LED COB Concealed Downlight",
    series: "llf-291",
    group: "Special Series",
    dimming: "Non - Dimming",
    collection: "indoor",
    hero: {
      category: "LED COB Concealed Downlight",
      name: "LLF-291",
      description: "High-efficiency architectural COB downlight providing excellent luminous intensity and deep glare control.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-291"
    },
    config: {
      models: ["LLF-289", "LLF-290", "LLF-291"],
    //   voltage: ["220-240V AC"],
      dimensions: ["Ø60x86mm"],
      watts: ["9W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "6000K", color: "#D6E4F0" }
      ],
      bodyColors: ["Black", "White"],
      beamAngles: ["36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø55mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["60lm/W"],
      cri: [">90"]
    },
    // permutations: [
    //   { watts: "9W", dimensions: "Ø60x86mm", cutoutSizes: "Ø55mm", bodyColor: "White", beamAngles: "36°", ledChip: "BRIDGELUX", luminous: "60lm/W", cri: ">90", cct: "6000K" }
    // ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-291+Detail+1"
    ]
  },

  

};

/**
 * Fallback generator function that maps any item ID requested by the 
 * inner page context dynamically if a dedicated object isn't predefined yet.
 */
export function getProductInnerDetails(id: string): InnerProductDetail {
  const key = id.toLowerCase().trim();

  if (INDOOR_INNER_DETAILS[key]) {
    return INDOOR_INNER_DETAILS[key];
  }

  // Pure programmatic generation engine matching your exact data patterns cleanly
  const normalizedId = id.toUpperCase();

  let discoveredCategory = "LED COB Concealed Downlight";
  let assignedDimming: "Dali" | "Non - Dimming" | "DP" = "Non - Dimming";
  let defaultGroup = "LED COB Concealed Downlight";

  if (normalizedId.startsWith("LMT")) {
    discoveredCategory = "Slim Magnetic Track";
    assignedDimming = "DP";
    defaultGroup = "Slim Magnetic Track";
  } else if (normalizedId.startsWith("LRT")) {
    discoveredCategory = "Flexible Track Suspended";
    assignedDimming = "DP";
    defaultGroup = "Flexible Track Suspended";
  } else if (normalizedId.startsWith("LLS")) {
    discoveredCategory = "LED COB Surface Fixtures";
    defaultGroup = "LED COB Surface Fixtures";
  }

  return {
    category: discoveredCategory,
    series: id.split("-")[0] || "General",
    group: defaultGroup,
    dimming: assignedDimming,
    collection: "indoor",
    hero: {
      category: discoveredCategory,
      name: normalizedId,
      description: `Premium architectural series ${normalizedId} high-efficiency specifications. Engineered for maximum luminous intensity output and smooth integration thresholds.`,
      image: `https://placehold.co/800x800/1a1a1a/ffffff?text=${normalizedId}+Hero`
    },
    config: {
      models: [normalizedId],
      voltage: ["220-240V AC"],
      dimensions: ["Ø85x90mm", "Ø100x120mm"],
      watts: ["10W", "15W", "20W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Matt White", "Satin Black"],
      beamAngles: ["24°", "36°", "60°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø75mm", "Ø90mm"],
      ledChip: ["BRIDGELUX"],
      luminous: ["90lm/W"],
      cri: ["≥90"]
    },
    permutations: [
      {
        voltage: "220-240V AC",
        watts: "10W",
        dimensions: "Ø85x90mm",
        bodyColor: "Matt White",
        beamAngles: "24°",
        ledChip: "BRIDGELUX",
        luminous: "90lm/W",
        cri: "≥90",
        cct: "3000K"
      }
    ],
    gallery: [
      `https://placehold.co/437x531/101010/ffffff?text=${normalizedId}+Detail+1`
    ]
  };
}