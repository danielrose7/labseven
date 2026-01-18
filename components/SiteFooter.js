"use client";

import Image from "next/image";

import { trackEvent } from "lib/googleAnalytics";
import styles from "./SiteFooter.module.css";

const SiteFooter = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__top}>
        <div className={styles.Footer__top__title}>
          <h3>Colorado Proud since 2006</h3>
          <div className={styles.locales}>
            <Image
              src="/assets/Colorado-Flag.svg"
              alt="Colorado Flag"
              height={20}
              width={30}
            />
            <Image
              src="/assets/USA-Flag.svg"
              alt="USA Flag"
              height={20}
              width={30}
            />
          </div>
        </div>
        <div className={styles.Footer__locations}>
          <div className={styles.Footer__location}>
            <h4 className={styles.Footer__location__name}>Lab Seven</h4>
            <p>
              <a
                target="__blank"
                href="https://www.google.com/maps/dir//Lab+Seven+Screen+Printing+Co./@39.6570677,-105.0729178,12z/data=!3m1!4b1!4m9!4m8!1m1!4e2!1m5!1m1!1s0x876c7fd8cd38f017:0x2856413ac04a5c4d!2m2!1d-105.0028778!2d39.6570887"
              >
                3244 S Platte River Dr
                <br />
                Englewood, CO 80110
              </a>
            </p>
            <p>
              <strong>Monday - Thursday</strong>: <time>8:30AM</time> -{" "}
              <time>4:30PM</time>
              <br />
              <strong>Friday</strong>: <time>8:30AM</time> - <time>4:00PM</time>
              <br />
              <strong>Saturday - Sunday:</strong> CLOSED
            </p>
            <p>
              <strong>Phone</strong>:{" "}
              <a
                href="tel:3038143389"
                onClick={() =>
                  trackEvent("phone_click", {
                    location: "site_footer",
                    phone: "(303) 814-3389",
                  })
                }
              >
                (303) 814-3389
              </a>
            </p>
            <p>
              <strong>Email</strong>:{" "}
              <a href="mailto:info@labseven.co">info@labseven.co</a>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.Footer__bottom}>
        <a className={styles.Footer__logo} href="//labseven.co">
          <img
            alt="Lab Seven Screen Printing Co. Logo"
            src="/assets/Lab-Seven-Logo.svg"
            height={40.5}
            width={220}
          />
        </a>

        <h6 className={styles.copyright}>
          Copyright © {new Date().getFullYear()} Lab Seven. All Rights Reserved.
        </h6>

        <div className={styles.socialLinks}>
          <a target="__blank" href="https://www.instagram.com/labseven.co/">
            <Image
              alt="Lab Seven's Instagram"
              src="/assets/Instagram-Icon.svg"
              height={40}
              width={40}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </a>
          <a target="__blank" href="https://www.facebook.com/labseven.co">
            <Image
              alt="Lab Seven's Facebook"
              src="/assets/Facebook-Icon.svg"
              height={40}
              width={40}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
