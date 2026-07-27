export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M16 29V13" />
      <path d="M16 13c0-4 3-7 7-7 0 4-3 7-7 7z" fill="currentColor" fillOpacity={0.15} />
      <path d="M16 17c0-4-3-7-7-7 0 4 3 7 7 7z" fill="currentColor" fillOpacity={0.15} />
      <path d="M16 23c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6z" fill="currentColor" fillOpacity={0.15} />
    </svg>
  );
}
