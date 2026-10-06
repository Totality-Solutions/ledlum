import ContactSection from "@/components/sections/contact/hero";
import { getContent } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata() {
  return buildCmsMetadata("contact", { title: "Contact Us", canonical: "/contact" });
}

export default async function ContactPage() {
  return (
    <div>
      <ContactSection content={await getContent("contact.page")} />
    </div>
  );
}
