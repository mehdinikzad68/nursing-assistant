import type { SVGProps, ReactNode } from 'react';

type IconName = 'search' | 'arrow' | 'close' | 'lock' | 'phone' | 'check' | 'send' | 'spark' | 'chart' | 'scale' | 'shield';
type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 24, ...props }: Props) {
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    arrow: <><path d="M20 12H4m6-6-6 6 6 6" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" /></>,
    phone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 5h4m-3 14h2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    send: <><path d="m21 3-7 18-3-8-8-3L21 3Zm0 0L11 13" /></>,
    spark: <path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z" />,
    chart: <><path d="M5 20V13m7 7V8m7 12V3" /><path d="m3 8 6-4 5 2 7-4" /></>,
    scale: <><path d="M12 3v18m-6 0h12M4 7l8-3 8 3M4 7l-3 7h6L4 7Zm16 0-3 7h6l-3-7Z" /></>,
    shield: <><path d="m12 2 8 3v6c0 5-5 9-8 11-3-2-8-6-8-11V5l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>{paths[name]}</svg>;
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return <span className={`brand ${compact ? 'brand--compact' : ''}`}>
    <svg className="brand-mark" viewBox="0 0 56 64" fill="none" aria-hidden="true">
      <circle cx="28" cy="10" r="5" stroke="var(--gold)" strokeWidth="3.5" />
      <path d="M28 34C24 27 15 17 10 22 4 28 19 47 28 56c9-9 24-28 18-34-5-5-14 5-18 12Zm0 0v22" stroke="var(--cyan)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    {!compact && <span>حامی درمان</span>}
  </span>;
}
