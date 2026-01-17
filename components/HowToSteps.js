import Image from "next/image";
import { CallLink, LinkButton } from "components";

import Step1_Shirt from "public/assets/Home/Step1_Shirt.svg";
import Step2_Sizes from "public/assets/Home/Step2_Sizes.svg";
import Step3_Upload from "public/assets/Home/Step3_Upload.svg";
import ThatsIt_Hoodie from "public/assets/Home/ThatsIt_Hoodie.svg";

import styles from "styles/Home.module.css";

const HowToSteps = ({
  title = "Your plan for awesome apparel:",
  titleAccent = "Your plan",
  noBottomOverlay = false,
}) => {
  const [titleBefore, titleAfter] = title.split(titleAccent);

  return (
    <div className={styles.howTo} id="your-plan">
      <h2 className={styles.howTo__heading}>
        {titleBefore}
        <span className={styles.Underline1}>{titleAccent}</span>
        {titleAfter}
      </h2>
      <ol className={styles.howTo__steps}>
        <li>
          <Image
            src={Step1_Shirt}
            alt="Hand drawn sketch of a t-shirt"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <h4>Pick your products</h4>
        </li>
        <li>
          <Image
            src={Step2_Sizes}
            alt="Hand drawn chart of sizes"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <h4>Fill out the size breakdown</h4>
        </li>
        <li>
          <Image
            src={Step3_Upload}
            alt="Upload logo to cloud"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <h4>Upload your logo idea</h4>
        </li>
      </ol>
      <div
        className={[
          styles.howTo__block,
          noBottomOverlay && styles.howTo__block__noBottomOverlay,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.howTo__block__text}>
          <h3 className={styles.howTo__block__heading}>
            <span className={styles.Underline2}>That's it!</span>
          </h3>
          <p>
            We'll send you a no-commitment proposal, complete with pricing,
            product recommendations, and digital mockups!
          </p>
          <div className={styles.linkContainer}>
            <LinkButton href="/order/pick-products">Ok, let's go!</LinkButton>
            <CallLink className="LinkButtonAlternate">
              Talk to a person
            </CallLink>
          </div>
        </div>
        <Image
          src={ThatsIt_Hoodie}
          width={200}
          alt="Cool hoodie and beanie"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default HowToSteps;
