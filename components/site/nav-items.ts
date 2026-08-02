export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/strategy", label: "Strategy" },
  { href: "/investments", label: "Investments" },
  { href: "/contact", label: "Contact" },
];
