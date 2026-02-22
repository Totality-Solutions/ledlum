// Service data types and functions
export interface ServiceOffering {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

// Mock service data
const serviceOfferings: ServiceOffering[] = [
  {
    id: "1",
    slug: "lighting-consultation",
    title: "Lighting Consultation",
    description: "Professional lighting design and consultation services",
    features: ["Site Analysis", "Design Planning", "Energy Optimization"],
    image: "/images/services/consultation.jpg"
  }
];

export function getAllServices(): ServiceOffering[] {
  return serviceOfferings;
}

export function getServiceBySlug(slug: string): ServiceOffering | undefined {
  return serviceOfferings.find((service) => service.slug === slug);
}
