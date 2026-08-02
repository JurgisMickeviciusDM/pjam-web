import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Height utility, e.g. "h-12". Width scales automatically. */
  sizeClass?: string;
  priority?: boolean;
}

/** Brand lockup — the real gold P&J emblem (gold on transparent). */
export function Logo({
  className,
  sizeClass = "h-11 md:h-12",
  priority = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="P&J Asset Management — home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/media/logo.png"
        alt="P&J Asset Management"
        width={2856}
        height={2067}
        priority={priority}
        className={cn("w-auto", sizeClass)}
      />
    </Link>
  );
}
