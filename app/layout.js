// This is server-side rendered
// As of Nov '23 it's only being used by a subset of the site

import * as React from "react";

import "styles/globals.css";

import { Montserrat } from "next/font/google";

import ScrollWatcher from "./ScrollWatcher";
import GoogleAnalytics from "./GoogleAnalytics";
import Crisp from "./Crisp";

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
  "og:type": "website",
  "og:title": siteTitle,
  "og:description": description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={montserrat.variable}
      style={{ "--navTop": "0px" }} // updated by ScrollWatcher
    >
      <body>
        {children}
        <ScrollWatcher />
        <GoogleAnalytics />
        <Crisp />
      </body>
    </html>
  );
}
