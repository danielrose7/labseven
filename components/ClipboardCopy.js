"use client";

import * as React from "react";

import { trackEvent } from "lib/googleAnalytics";
import utilStyles from "styles/utils.module.css";

const CheckIcon = () => {
  return (
    <svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      style={{ display: "inline-block", fill: "currentcolor" }}
    >
      <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
      <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
    </svg>
  );
};

const CopyIcon = () => {
  return (
    <svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      style={{ display: "inline-block", fill: "var(--primary)" }}
      className={utilStyles.tooltipped}
    >
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
    </svg>
  );
};

const ClipboardCopy = ({ value }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(true);

  React.useEffect(() => {
    setIsAvailable(Boolean(navigator.clipboard));
  }, []);

  const onCopy = () => {
    // Copy to clipboard
    navigator.clipboard.writeText(value);

    // Track the copy event
    trackEvent("copy_contact", { value });

    // Update the button text
    setIsCopied(true);
  };

  if (!isAvailable) {
    return (
      <span style={{ display: "inline-block", width: 16, height: 16 }}></span>
    );
  }

  return (
    <button
      aria-label={isCopied ? "Copied!" : "Copy"}
      data-copy-value={value}
      tabIndex="0"
      onClick={onCopy}
      onBlur={() => setIsCopied(false)}
      style={{ backgroundColor: "transparent", border: 0 }}
      className={utilStyles.tooltipped}
    >
      {isCopied ? <CopyIcon /> : <CheckIcon />}
    </button>
  );
};

export default ClipboardCopy;
