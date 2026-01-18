import * as React from "react";

import "styles/globals.css";

import { Montserrat } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

import ScrollWatcher from "./ScrollWatcher";
import Crisp from "./Crisp";
import AnalyticsTracker from "./AnalyticsTracker";
import { GTM_ID } from "../lib/googleAnalytics";

const montserrat = Montserrat({
  weights: [700],
  subsets: ["latin"],
  variable: "--montserrat",
});

const siteTitle =
  "Denver Screen Printing & Custom T-Shirt Printing | Lab Seven Screen Printing Co.";
const description =
  "Lab Seven Screen Printing Co. is the leader in Denver Screen Printing, Custom T-shirt Printing, Graphic Design, and Embroidery in Colorado. Design your own t-shirt in our design studio or work with one of our artists to bring your custom tee to life.";

export const metadata = {
  title: siteTitle,
  description,
  openGraph: {
    type: "website",
    title: siteTitle,
    description,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/shortcut_icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={montserrat.variable}
      style={{ "--navTop": "0px" }} // updated by ScrollWatcher
    >
      <head>
        {/* fonts tied to Justin's account */}
        <link rel="stylesheet" href="https://use.typekit.net/fqt7rom.css" />
      </head>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body>
        {children}
        <ScrollWatcher />
        <Crisp />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
