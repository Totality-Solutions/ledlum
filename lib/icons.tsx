interface IconProps { size?: number; className?: string; strokeWidth?: number; }

const base = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function X({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke="currentColor" strokeWidth={strokeWidth} className={className}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}

export function ChevronLeft({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke="currentColor" strokeWidth={strokeWidth} className={className}><polyline points="15 18 9 12 15 6" /></svg>;
}

export function ChevronRight({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke="currentColor" strokeWidth={strokeWidth} className={className}><polyline points="9 18 15 12 9 6" /></svg>;
}

export function ChevronUp({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke="currentColor" strokeWidth={strokeWidth} className={className}><polyline points="18 15 12 9 6 15" /></svg>;
}

export function Instagram({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
}

export function Facebook({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
}

export function Linkedin({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
}

export function Send({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke="currentColor" strokeWidth={strokeWidth} className={className}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>;
}

export function ArrowDown({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke="currentColor" strokeWidth={strokeWidth} className={className}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>;
}

export function ArrowRight({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke="currentColor" strokeWidth={strokeWidth} className={className}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
}

export function Search({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke="currentColor" strokeWidth={strokeWidth} className={className}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
}
