import { serviceOfferings, type ServiceOffering } from "@/content/data/services";

export function getAllServices(): ServiceOffering[] {
  return serviceOfferings;
}

export function getServiceBySlug(slug: string): ServiceOffering | undefined {
  return serviceOfferings.find((service) => service.slug === slug);
}
