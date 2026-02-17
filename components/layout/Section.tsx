import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement>;

export default function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-16 sm:py-24 px-3 md:px-6", className)} {...props} />;
}
