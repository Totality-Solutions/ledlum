import type { LegalContent } from "@/lib/cms/defaults";

// Body of the Privacy / Terms modals, edited under Admin → Site settings & SEO.
export default function LegalSections({ sections }: { sections: LegalContent["sections"] }) {
  return (
    <>
      {(sections || []).map((section, i) => (
        <section key={i} className="space-y-4">
          {section.heading && <h3 className="text-xl font-semibold text-white">{section.heading}</h3>}
          {String(section.body || "")
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean)
            .map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          {section.bullets?.length > 0 && (
            <ul className="list-disc pl-5 space-y-2 text-white/60">
              {section.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}
