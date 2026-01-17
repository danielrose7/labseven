import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout, LinkButton, RotatingLogo, ClipboardCopy, WaveCta } from "components";

import styles from "./Contact.module.css";
import ContactPhone from "./ContactPhone";
import HoursTable from "./HoursTable";

const ContactPage = ({ searchParams }) => {
  return (
    <Layout>
      <Head>
        <meta
          name="description"
          content="(303) 814-3389 | 3244 S Platte River Dr Englewood, CO 80110 | Contact our Local Team You Can Trust"
        />
      </Head>
      <div className={styles.ContactPage}>
        <div className={styles.leadWrap}>
          <RotatingLogo />
          <h1>
            We'd love to hear from you.
            <br />
            Get in touch{" "}
            <span role="img" aria-label="Waving hand">
              👋
            </span>
          </h1>
        </div>

        <div className={styles.contactMethods}>
          <p>
            Phone:{" "}
            <React.Suspense fallback={"Loading..."}>
              <ContactPhone locationSlug={searchParams.location} />
            </React.Suspense>
          </p>
          <p>
            Email: <Link href="mailto:info@labseven.co">info@labseven.co</Link>{" "}
            <ClipboardCopy value={"info@labseven.co"} />
          </p>
          <LinkButton href="/order/pick-products">Start Order</LinkButton>
        </div>

        <h2>Operating Hours</h2>
        <HoursTable />

        <p>After hours pickup by appointment available. Call to schedule!</p>
      </div>
      <WaveCta />
    </Layout>
  );
};

export default ContactPage;
