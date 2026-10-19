export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hamiLogo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="8" r="4.2" fill="url(#hamiLogo)" />
      <path
        d="M20 36 C10 29 5 23 5 17.5 C5 13.6 8 11 11.4 11 C14.6 11 17 13 20 16.6 C23 13 25.4 11 28.6 11 C32 11 35 13.6 35 17.5 C35 23 30 29 20 36Z"
        fill="none" stroke="url(#hamiLogo)" strokeWidth="3.4" strokeLinejoin="round"
      />
      <path d="M13 20.5h4l2-3.5 3 7 2-3.5h3" fill="none" stroke="#F5C76B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
