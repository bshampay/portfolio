const LINKS = [
  {
    label: "Email",
    href: "mailto:bshampay@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/beckyshampay",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/BeckyShampay",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.94 10.86L20.34 3h-1.52l-5.56 6.83L8.98 3H3l6.71 9.62L3 21h1.52l5.87-7.22L15.02 21H21l-7.06-10.14zm-2.08 2.56l-.68-.97L5.6 4.2h2.33l4.36 6.24.68.97 5.67 8.11h-2.33l-4.65-6.66z" />
      </svg>
    ),
  },
];

function SocialLinks() {
  return (
    <div className="hero__socials">
      {LINKS.map(({ label, href, icon }) => (
        <a
          key={label}
          className="hero__social-link"
          href={href}
          aria-label={label}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
