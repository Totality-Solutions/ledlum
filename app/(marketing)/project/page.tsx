import ProjectGallery from "@/components/sections/project/ProjectGallery";
import { getContent } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata() {
  return buildCmsMetadata("project", { title: "Projects", canonical: "/project" });
}

export default async function ProjectPage() {
  return <ProjectGallery content={await getContent("projects")} />;
}
