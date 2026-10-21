// Infinite horizontal scroller. Content is duplicated once; the copy is hidden from screen readers.
export default function Marquee({ children, label }) {
  return (
    <div className="marquee overflow-hidden" role="region" aria-label={label} tabIndex={0}>
      <div className="marquee-track gap-4 py-2">
        <ul className="flex min-w-[100vw] shrink-0 justify-around gap-4">{children}</ul>
        <ul className="flex min-w-[100vw] shrink-0 justify-around gap-4" aria-hidden="true">{children}</ul>
      </div>
    </div>
  )
}
