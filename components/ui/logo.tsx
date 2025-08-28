export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      fill="currentColor"
      viewBox="0 0 33 33"
    >
      {/* Tree trunk/base */}
      <rect x="14.5" y="25" width="4" height="6" rx="2" />
      {/* Main connecting node */}
      <circle cx="16.5" cy="16.5" r="3" />
      {/* Branch connections - representing links */}
      <path
        d="M16.5 13.5V8.5M16.5 8.5L12 4M16.5 8.5L21 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13.5 16.5H8.5M8.5 16.5L4 12M8.5 16.5L4 21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M19.5 16.5H24.5M24.5 16.5L29 12M24.5 16.5L29 21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Link endpoints - small circles representing individual links */}
      <circle cx="12" cy="4" r="2" />
      <circle cx="21" cy="4" r="2" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="4" cy="21" r="2" />
      <circle cx="29" cy="12" r="2" />
      <circle cx="29" cy="21" r="2" />

      {/* Additional decorative elements suggesting customization */}
      <circle
        cx="16.5"
        cy="16.5"
        r="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}
