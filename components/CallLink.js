"use client";

import Link from "next/link";

import { trackEvent } from "lib/googleAnalytics";
import { isMobile } from "lib/utils";

import styles from "./LinkButton.module.css";

const contactLink = "/contact";

const CallLink = ({
  className = "LinkButton",
  telLink = "tel:+13038143389",
  locationSlug,
  ...props
}) => {
  const mobile = isMobile();
  let href = contactLink;
  if (mobile) {
    href = telLink;
  } else if (locationSlug) {
    href = `${contactLink}?location=${locationSlug}`;
  }

  const handleClick = () => {
    if (mobile) {
      trackEvent("phone_click", {
        location: locationSlug || "default",
        phone: telLink,
      });
    }
  };

  return (
    <Link className={styles[className]} href={href} onClick={handleClick} {...props}>
      {props.children || "Call Us"}
    </Link>
  );
};

export default CallLink;
