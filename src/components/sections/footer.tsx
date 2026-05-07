import Link from "next/link";

const socialLinks = [
  { name: "GitHub", href: "#" },
  { name: "X", href: "#" },
  { name: "LinkedIn", href: "#" },
];

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-card-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-accent">
            NexusAI
          </span>
        </div>
        <nav aria-label="Footer navigation" className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <div suppressHydrationWarning className="mx-auto mt-8 max-w-6xl text-center text-xs text-muted">
        &copy; {new Date().getFullYear()} NexusAI. All rights reserved.
      </div>
    </footer>
  );
}
