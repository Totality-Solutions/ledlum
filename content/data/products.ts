// content/data/products.js

export const PRODUCT_DATABASE = {
  "llf-103": {
    hero: {
      category: "LED COB Spotlight",
      name: "LLF-103",
      description: "Experience the perfect blend of form and function with the LLF-103. Sleek, modern, and versatile.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-103+Hero", 
    },
    config: {
      models: ["LLF-103", "LLF-103-S", "LLF-103-M"],
      voltage: ["220-240V", "110-120V"],
      dimensions: ["Ø100x92mm", "Ø130x116mm"],
      watts: ["7W", "12W", "15W"],
      cct: [
        { label: "2700K", color: "#F5E6BE" },
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Dark Gray", "White"],
      beamAngles: ["15°", "24°", "36°"],
      ipRating: ["IP20"],
      cutoutSizes: ["Ø90mm"],
      ledChip: ["CREE COB"],
      luminous: ["800lm", "1200lm", "1500lm"],
      cri: ["≥90"]
    },
    permutations: [
      // Isme har config option kam se kam ek baar 'selectable' hai
      { voltage: "220-240V", watts: "7W", dimensions: "Ø100x92mm", bodyColor: "White", beamAngles: "15°", ledChip: "CREE COB", luminous: "800lm", cri: "≥90", cct: "2700K" },
      { voltage: "220-240V", watts: "12W", dimensions: "Ø100x92mm", bodyColor: "Dark Gray", beamAngles: "24°", ledChip: "CREE COB", luminous: "1200lm", cri: "≥90", cct: "3000K" },
      { voltage: "110-120V", watts: "15W", dimensions: "Ø130x116mm", bodyColor: "White", beamAngles: "36°", ledChip: "CREE COB", luminous: "1500lm", cri: "≥90", cct: "4000K" },
      { voltage: "110-120V", watts: "7W", dimensions: "Ø100x92mm", bodyColor: "Dark Gray", beamAngles: "15°", ledChip: "CREE COB", luminous: "800lm", cri: "≥90", cct: "3000K" }
    ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail"
    ]
  },

  "llf-104": {
    hero: {
      category: "Recessed Downlight",
      name: "LLF-104",
      description: "The LLF-104 Series provides deep-recessed visual comfort with ultra-low UGR.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-104+Hero",
    },
    config: {
      models: ["LLF-104 Fixed", "LLF-104 Tilt"],
      voltage: ["220-240V"],
      dimensions: ["Ø85x110mm", "Ø110x140mm"],
      watts: ["10W", "20W", "30W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "Dim-to-Warm", color: "#FFB366" }
      ],
      bodyColors: ["Dark Gray", "White"],
      beamAngles: ["24°", "38°", "60°"],
      ipRating: ["IP44"],
      cutoutSizes: ["Ø75mm"],
      ledChip: ["Bridgelux"],
      luminous: ["1000lm", "2100lm", "3200lm"],
      cri: ["≥80", "≥95"]
    },
    permutations: [
      { voltage: "220-240V", watts: "10W", dimensions: "Ø85x110mm", bodyColor: "White", beamAngles: "24°", ledChip: "Bridgelux", luminous: "1000lm", cri: "≥80", cct: "3000K" },
      { voltage: "220-240V", watts: "20W", dimensions: "Ø85x110mm", bodyColor: "Dark Gray", beamAngles: "38°", ledChip: "Bridgelux", luminous: "2100lm", cri: "≥95", cct: "4000K" },
      { voltage: "220-240V", watts: "30W", dimensions: "Ø110x140mm", bodyColor: "White", beamAngles: "60°", ledChip: "Bridgelux", luminous: "3200lm", cri: "≥95", cct: "Dim-to-Warm" },
      { voltage: "220-240V", watts: "10W", dimensions: "Ø110x140mm", bodyColor: "Dark Gray", beamAngles: "24°", ledChip: "Bridgelux", luminous: "1000lm", cri: "≥80", cct: "4000K" }
    ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail"
    ]  },

  "llf-205": {
    hero: {
      category: "Track Light System",
      name: "LLF-205",
      description: "Professional-grade track-mounted luminaire for art galleries and retail.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-205+Hero",
    },
    config: {
      models: ["LLF-205 Narrow", "LLF-205 Wide"],
      voltage: ["24V DC", "48V DC"],
      dimensions: ["Ø60x150mm"],
      watts: ["15W", "25W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" }
      ],
      bodyColors: ["Dark Gray", "White"],
      beamAngles: ["10°", "20°", "45°"],
      ipRating: ["IP20"],
      cutoutSizes: ["N/A"],
      ledChip: ["Citizen COB"],
      luminous: ["1350lm", "2250lm"],
      cri: ["≥97"]
    },
    permutations: [
      { voltage: "24V DC", watts: "15W", dimensions: "Ø60x150mm", bodyColor: "White", beamAngles: "10°", ledChip: "Citizen COB", luminous: "1350lm", cri: "≥97", cct: "3000K" },
      { voltage: "48V DC", watts: "25W", dimensions: "Ø60x150mm", bodyColor: "Dark Gray", beamAngles: "45°", ledChip: "Citizen COB", luminous: "2250lm", cri: "≥97", cct: "4000K" },
      { voltage: "48V DC", watts: "15W", dimensions: "Ø60x150mm", bodyColor: "White", beamAngles: "20°", ledChip: "Citizen COB", luminous: "1350lm", cri: "≥97", cct: "4000K" }
    ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail"
    ]
  },

  "llf-m20": {
    hero: {
      category: "Magnetic Track System",
      name: "LLF-M20",
      description: "Ultra-slim magnetic modules offering tool-free installation.",
      image: "https://placehold.co/800x800/1a1a1a/ffffff?text=LLF-M20+Hero",
    },
    config: {
      models: ["Linear-M20", "Dot-M20", "Adjust-M20"],
      voltage: ["48V DC"],
      dimensions: ["300x20x45mm", "600x20x45mm"],
      watts: ["10W", "20W"],
      cct: [
        { label: "3000K", color: "#F5D68C" },
        { label: "4000K", color: "#F5F5F5" },
        { label: "Tunable", color: "#FFB366" }
      ],
      bodyColors: ["Dark Gray", "White"],
      beamAngles: ["15°", "30°", "Wall Wash"],
      ipRating: ["IP20"],
      cutoutSizes: ["N/A"],
      ledChip: ["Luminus"],
      luminous: ["900lm", "1800lm"],
      cri: ["≥90"]
    },
    permutations: [
      { voltage: "48V DC", watts: "10W", dimensions: "300x20x45mm", bodyColor: "White", beamAngles: "15°", ledChip: "Luminus", luminous: "900lm", cri: "≥90", cct: "3000K" },
      { voltage: "48V DC", watts: "20W", dimensions: "600x20x45mm", bodyColor: "Dark Gray", beamAngles: "Wall Wash", ledChip: "Luminus", luminous: "1800lm", cri: "≥90", cct: "Tunable" },
      { voltage: "48V DC", watts: "10W", dimensions: "600x20x45mm", bodyColor: "White", beamAngles: "30°", ledChip: "Luminus", luminous: "900lm", cri: "≥90", cct: "4000K" }
    ],
    gallery: [
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail",
      "https://placehold.co/437x531/101010/ffffff?text=LLF-M20+Detail"
    ]
  }
};