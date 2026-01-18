"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { trackEvent } from "lib/googleAnalytics";
import { SERVICE_SECTIONS } from "lib/services";
import styles from "./SiteNav.module.css";

/** passed as props in /products -> CategoryMenu */
const STATIC_CATEGORIES = [
  { code: "tShirts", href: "/products/tShirts", name: "T-Shirts" },
  {
    code: "hoodiesAndSweatshirts",
    href: "/products/hoodiesAndSweatshirts",
    name: "Hoodies and Sweatshirts",
  },
  { code: "longSleeve", href: "/products/longSleeve", name: "Long Sleeve" },
  { code: "tankTops", href: "/products/tankTops", name: "Tank Tops" },
  {
    code: "performanceDryFit",
    href: "/products/performanceDryFit",
    name: "Performance / Dry Fit",
  },
  {
    code: "sweatpantsAndShorts",
    href: "/products/sweatpantsAndShorts",
    name: "Sweatpants and Shorts",
  },
  { code: "poloShirts", href: "/products/poloShirts", name: "Polo Shirts" },
  {
    code: "bagsAndTotes",
    href: "/products/bagsAndTotes",
    name: "Bags and Totes",
  },
  { code: "headwear", href: "/products/headwear", name: "Headwear" },
];

const onMenuEnter = (e) =>
  e.currentTarget.children[0].setAttribute("aria-expanded", "true");
const FLYOUT_CLOSE_TIMEOUT = 150; // ms
const onMouseLeave = (e) => {
  const target = e.currentTarget.children[0];
  setTimeout(() => {
    target.setAttribute("aria-expanded", "false");
  }, FLYOUT_CLOSE_TIMEOUT);
};

const ArrowDown = ({ size = 10, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    {...rest}
  >
    <g
      style={{
        stroke: "none",
        strokeWidth: 0,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: 10,
        fill: "none",
        fillRule: "nonzero",
        opacity: 1,
      }}
      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
    >
      <path
        d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
        style={{
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "var(--fillColor)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform=" matrix(1 0 0 1 0 0) "
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const SiteNav = () => {
  // call now flyout
  const callContainerRef = React.useRef();
  const [isFlyoutOpen, setIsFlyoutOpen] = React.useState(false);

  return (
    <div className={styles.SiteNav}>
      <header className={styles.header}>
        <div className={styles.header__spacer}>
          <a className={styles.logo} href="//labseven.co">
            <img
              alt="Lab Seven Screen Printing Co. Logo"
              src="/assets/Lab-Seven-Logo.svg"
              height={40.5}
              width={220}
            />
          </a>
          <nav className={styles.links} aria-label="Main">
            <nav aria-label="Main">
              <ul className={styles.links__list}>
                <li
                  className={[
                    styles.links__list__item,
                    styles.links__list__itemWithSubmenu,
                  ].join(" ")}
                  onMouseEnter={onMenuEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <Link
                    href="/services"
                    aria-expanded="false"
                    onMouseEnter={(e) =>
                      e.currentTarget.setAttribute("aria-expanded", "true")
                    }
                  >
                    Services
                  </Link>
                  <ArrowDown alt={"Arrow down to expand options"} />
                  <ul className={styles.linkSubmenu}>
                    {SERVICE_SECTIONS.map(({ id, name }) => (
                      <li key={id}>
                        <Link href={`/services#${id}`}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li
                  className={[
                    styles.links__list__item,
                    styles.links__list__itemWithSubmenu,
                  ].join(" ")}
                  onMouseEnter={onMenuEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <Link href="/products" aria-expanded="false">
                    Products
                  </Link>
                  <ArrowDown alt={"Arrow down to expand options"} />
                  <ul className={styles.linkSubmenu}>
                    {STATIC_CATEGORIES.map(({ code, href, name }) => (
                      <li key={code}>
                        <Link href={href}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className={styles.links__list__item}>
                  <Link href="/gallery">Our Work</Link>
                </li>
                <li className={styles.links__list__item}>
                  <Link href="/contact">Contact</Link>
                </li>
                <li className={styles.links__list__item}>
                  <span aria-hidden="true" className={styles.navDivider}></span>
                </li>
                <li
                  className={[
                    styles.links__list__item,
                    styles.callNow,
                    isFlyoutOpen && styles.callNow__isFlyoutOpen,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  ref={callContainerRef}
                  onMouseLeave={() => setIsFlyoutOpen(false)}
                >
                  <button
                    className={styles.callNow__anchor}
                    onMouseEnter={() => setIsFlyoutOpen(true)}
                  >
                    Call Now
                  </button>
                  <div className={styles.callNow__flyout}>
                    <ul>
                      <li>
                        <Link
                          href="/locations/englewood"
                          className={styles.callNow__flyout__label}
                        >
                          Englewood
                          <sub
                            className={styles.callNow__flyout__label__accent}
                          >
                            HQ
                          </sub>
                        </Link>
                        <a
                          href="tel:+13038143389"
                          className={styles.callNow__flyout__number}
                          onClick={() =>
                            trackEvent("phone_click", {
                              location: "Englewood",
                              phone: "(303) 814-3389",
                            })
                          }
                        >
                          {`(303) 814-3389`}
                        </a>
                      </li>
                      {[
                        {
                          name: "Denver",
                          slug: "denver",
                          number: "(720) 708-6192",
                          telHref: "tel:+17207086192",
                        },
                        {
                          name: "Aurora",
                          slug: "aurora",
                          number: "(303) 529-6583",
                          telHref: "tel:+13035296583",
                        },
                        {
                          name: "Boulder",
                          slug: "boulder",
                          number: "(720) 780-1205",
                          telHref: "tel:+17207801205",
                        },
                        {
                          name: "Colorado Springs",
                          slug: "colorado-springs",
                          number: "(719) 283-3160",
                          telHref: "tel:+17192833160",
                        },
                        {
                          name: "Fort Collins",
                          slug: "fort-collins",
                          number: "(720) 730-5435",
                          telHref: "tel:+17207305435",
                        },
                      ].map((location) => (
                        <li key={location.name}>
                          <Link
                            href={`/locations/${location.slug}`}
                            className={styles.callNow__flyout__label}
                          >
                            {location.name}
                          </Link>
                          <a
                            href={location.telHref}
                            className={styles.callNow__flyout__number}
                            onClick={() =>
                              trackEvent("phone_click", {
                                location: location.name,
                                phone: location.number,
                              })
                            }
                          >
                            {location.number}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className={styles.links__list__item}>
                  <Link href="/products" className={styles.navAccentLink}>
                    Instant Quote
                  </Link>
                </li>
                {/* ^^ close call container */}
              </ul>
            </nav>
          </nav>
          {/* ^^ close links */}
        </div>
        {/* ^^ close header__spacer */}
        <div className={styles.locales}>
          <Image
            src="/assets/Colorado-Flag.svg"
            alt="Colorado Flag"
            height={20}
            width={30}
            className={styles.locales__colorado}
          />
          <Image
            src="/assets/USA-Flag.svg"
            alt="USA Flag"
            height={20}
            width={30}
            className={styles.locales__america}
          />
        </div>
      </header>
    </div>
  );
};

export default SiteNav;
