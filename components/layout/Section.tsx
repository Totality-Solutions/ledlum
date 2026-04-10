

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement>;

// Use forwardRef to allow the component to receive a 'ref' prop
const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <section 
        ref={ref} // Attach the forwarded ref here
        className={cn("py-12 lg:py-16 px-3 lg:px-14", className)} 
        {...props} 
      />
    );
  }
);

// Setting a displayName is a best practice when using forwardRef for debugging
Section.displayName = "Section";

export default Section;