import Image from "next/image";
import { CtaForm, InstaReel, NewsletterForm } from "components";
import SectionDivider from "./SectionDivider";

import Consultation_Phone from "public/assets/Home/Consultation_Phone.svg";
import CTA_Namaste from "public/assets/Home/CTA_Namaste.png";

import styles from "styles/Home.module.css";

const WaveCta = () => (
  <div className={[styles.ctaWrap, styles.hasSectionDivider].join(" ")}>
    <SectionDivider />
    <div className={styles.cta__topSpacer}>
      <div className={styles.cta__header}>
        <h3 className={styles.cta__heading}>
          Stop wasting your marketing budget on throwaway apparel.
        </h3>
        <h3 className={styles.cta__heading}>
          Get t-shirts you'll <span className={styles.Underline5}>want</span> to
          wear.
        </h3>
      </div>
      <div className={styles.cta__namaste}>
        <Image
          src={CTA_Namaste}
          style={{ maxWidth: "100%", height: "auto" }}
          alt="Woman wearing yoga tShirt"
        />
      </div>
      <div className={styles.cta__form}>
        <div className={styles.cta__form__header}>
          <Image
            src={Consultation_Phone}
            alt="Sketch of happy customer on the phone"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <h4 className={styles.cta__form__heading}>
            Schedule Your Free
            <br />
            10 Minute Consultation
          </h4>
        </div>
        <CtaForm />
      </div>
    </div>
    <div className={styles.cta__footer}>
      <InstaReel />
      <div className={styles.newsletterWrap}>
        <NewsletterForm />
      </div>
    </div>
  </div>
);

export default WaveCta;
