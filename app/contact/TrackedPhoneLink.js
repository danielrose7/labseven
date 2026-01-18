"use client";

import Link from "next/link";

import { trackEvent } from "lib/googleAnalytics";

const TrackedPhoneLink = ({ href, children, location }) => {
  return (
    <Link
      href={href}
      onClick={() =>
        trackEvent("phone_click", {
          location: location || "contact_page",
          phone: children,
        })
      }
    >
      {children}
    </Link>
  );
};

export default TrackedPhoneLink;
