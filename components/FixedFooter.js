"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { trackEvent } from "lib/googleAnalytics";
import styles from "./FixedFooter.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Our Work" },
  { href: "/contact", label: "Contact" },
];

const FixedFooter = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.Nav}>
      <ul>
        {LINKS.map(({ href, label }) => {
          const isActive =
            href.length === 1 ? pathname === href : pathname.startsWith(href);

          return (
            <li key={href} className={isActive ? styles.ActiveItem : ""}>
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
        <li className={styles.AccentItem}>
          <Link
            href="tel:+13038143389"
            onClick={() =>
              trackEvent("phone_click", {
                location: "fixed_footer",
                phone: "(303) 814-3389",
              })
            }
          >
            Call Now
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default FixedFooter;
