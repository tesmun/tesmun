export function YoutubeIcon({ size = 19, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21.6 7.2c-.23-.86-.9-1.53-1.76-1.76C18.25 5 12 5 12 5s-6.25 0-7.84.44c-.86.23-1.53.9-1.76 1.76C2 8.79 2 12 2 12s0 3.21.4 4.8c.23.86.9 1.53 1.76 1.76C5.75 19 12 19 12 19s6.25 0 7.84-.44c.86-.23 1.53-.9 1.76-1.76.4-1.59.4-4.8.4-4.8s0-3.21-.4-4.8z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M10 9.5l4.5 2.5-4.5 2.5v-5z" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 19, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M15 8.5h2V5.5h-2c-1.93 0-3.5 1.57-3.5 3.5v2H9.5v3H11.5v7.5h3V13.5h2.1l.4-3H14.5V9c0-.28.22-.5.5-.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
