import { notFound } from "next/navigation";
import { findSectionGroup } from "@/lib/cms/schema";
import SectionEditor from "@/components/admin/SectionEditor";
import { PageHeader } from "@/components/admin/ui";

export default async function EditPageGroup({ params }: { params: Promise<{ group: string }> }) {
  const { group: slug } = await params;
  const group = findSectionGroup(slug);
  if (!group) notFound();

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <PageHeader
        title={group.label}
        description="Each block saves on its own. Changes go live as soon as you save."
        actions={
          group.previewPath && (
            <a
              href={group.previewPath}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-md text-sm bg-neutral-800 border border-neutral-700 hover:bg-neutral-700"
            >
              View page ↗
            </a>
          )
        }
      />
      {group.sections.length > 1 && (
        <nav className="flex flex-wrap gap-2 mb-6">
          {group.sections.map((s) => (
            <a
              key={s.key}
              href={`#${s.key}`}
              className="text-xs px-2.5 py-1 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600"
            >
              {s.label}
            </a>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-6">
        {group.sections.map((section) => (
          <div key={section.key} id={section.key} className="scroll-mt-20">
            <SectionEditor section={section} />
          </div>
        ))}
      </div>
    </div>
  );
}
