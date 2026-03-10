export interface BlogSection {
  title: string;
  text: string;
  image: string;
}

export const CATEGORY_EXTENDED_CONTENT: Record<string, BlogSection[]> = {
  "Architectural lighting": [
    {
      title: "Structural Accentuation",
      text: "Our architectural solutions focus on the intersection of form and function. By utilizing advanced ray-tracing simulations, we ensure every structural detail—from cantilevered beams to textured masonry—is accentuated with intent.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=75&w=1200"
    },
    {
      title: "Circadian Integration",
      text: "We integrate tunable white technology to create environments that adapt to natural circadian rhythms. This biological approach to lighting enhances human comfort and focus while maintaining strict energy compliance.",
      image: "https://images.unsplash.com/photo-1507652313519-d4511f7c46bc?q=75&w=1200"
    },
    {
      title: "Sustainable Performance",
      text: "Beyond simple LED retrofitting, we optimize power density and implement daylight harvesting, reducing operational costs significantly through intelligent automation and optical precision.",
      image: "https://images.unsplash.com/photo-1518005020251-58296d421c14?q=75&w=1200"
    }
  ],
  "Commercial projects": [
    {
      title: "The Modern Workspace",
      text: "Efficiency meets branding. We design glare-free environments that prioritize visual comfort for long-duration tasks, utilizing micro-prismatic optics to eliminate screen reflection.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=75&w=1200"
    },
    {
      title: "Adaptive Zoning",
      text: "Commercial spaces require flexibility. Our DALI-2 controlled systems allow for dynamic rezoning of office layouts without the need for physical rewiring, supporting agile business growth.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=75&w=1200"
    },
    {
      title: "Lobby & Experience",
      text: "First impressions are light-driven. We use high-output wall washing and hospitality-grade color rendering to create warm, inviting entryways that represent corporate identity.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=75&w=1200"
    }
  ],
  "Residential systems": [
    {
      title: "Intimate Sanctuaries",
      text: "Transforming living spaces through discrete lighting layers. We focus on 'hidden' light sources that provide warmth and intimacy without the clutter of visible fixtures.",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=75&w=1200"
    },
    {
      title: "Smart Living Control",
      text: "Seamless integration with home automation protocols. Control your entire environment through voice, sensors, or scheduled 'scenes' that mirror your lifestyle.",
      image: "https://images.unsplash.com/photo-1556912177-c54030639a6d?q=75&w=1200"
    },
    {
      title: "Artistic Illumination",
      text: "Specialized high-CRI spot lighting designed for private galleries. Protect and showcase your investments with UV-free LEDs that reveal the true depth of every pigment.",
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=75&w=1200"
    }
  ],
  "Energy efficiency": [
    {
      title: "The Green Footprint",
      text: "Our systems prioritize lumens-per-watt without sacrificing light quality. By utilizing high-efficiency drivers, we reduce parasitic power consumption across large-scale installations.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=75&w=1200"
    },
    {
      title: "Occupancy Intelligence",
      text: "Sensors are the brain of efficiency. Our PIR and ultrasonic hybrid sensors ensure that light is only delivered when and where it is needed, cutting waste by up to 60%.",
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=75&w=1200"
    }
  ],
  "Product insights": [
    {
      title: "Optical Engineering",
      text: "A look into the science of beam angles. We develop custom TIR lenses that provide sharp cut-offs and uniform light distribution.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=75&w=1200"
    },
    {
      title: "Thermal Management",
      text: "Longevity is determined by heat. Our heat sinks ensure that LED junctions remain cool, extending the life-cycle to over 100,000 hours.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=75&w=1200"
    }
  ],
  "All": [
    {
      title: "The Future of Light",
      text: "Explore our holistic approach to illuminating the world's most ambitious projects where light defines the space.",
      image: "https://images.unsplash.com/photo-1505373633562-2289f636838a?q=75&w=1200"
    }
  ]
};