import Image from "next/image";

import { CallLink } from "components";

import ThatsIt_Hoodie from "public/assets/Home/ThatsIt_Hoodie.svg";

import styles from "styles/OrderForm.module.css";
import homeStyles from "styles/Home.module.css";

const OrderThankYou = () => {
  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <div className={styles.thankYouSideBySide}>
          <div className={styles.thankYouText}>
            <h1>
              <span className={homeStyles.Underline2}>Thank you!</span>
            </h1>
            <p>
              Our sales team will reach out with a no-commitment proposal,
              complete with pricing, product recommendations, and digital
              mockups!
            </p>
            <p>
              Thank you for giving us the opportunity to earn your business!
            </p>
            <p>
              <strong>We are excited to work with you!</strong>
            </p>
          </div>
          <Image
            src={ThatsIt_Hoodie}
            width={200}
            alt="Cool hoodie and beanie"
            style={{
              width: "100%",
              maxWidth: 260,
              height: "auto",
              margin: "auto",
            }}
          />
        </div>
        <div className={styles.thankYouFooter}>
          Questions or just can't wait? Give us a call!
          <CallLink>Call now</CallLink>
        </div>
      </div>
    </div>
  );
};

export default OrderThankYou;
