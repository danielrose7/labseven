import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import useIntersectionObserver from "@react-hook/intersection-observer";

import {
  CallLink,
  CtaForm,
  InstaReel,
  Layout,
  LinkButton,
  NewsletterForm,
  RotatingLogo,
  ServicesReel,
  TestimonialsReel,
  ThreeDotLoader,
} from "components";

const DesignIFrame = dynamic(() => import("components/DesignIFrame"), {
  ssr: false,
  loading: () => <ThreeDotLoader />,
});

/* images */
/* - hero */
import Hero_CustomEmbroideryColorado from "public/assets/Home/Hero_CustomEmbroideryColorado.png";
import Hero_CustomEmbroideryDenver from "public/assets/Home/Hero_CustomEmbroideryDenver.png";
import Hero_CustomTShirtsDenver from "public/assets/Home/Hero_CustomTShirtsDenver.png";
import Hero_CustomTShirtsSpiritWear from "public/assets/Home/Hero_CustomTShirtsSpiritWear.png";
import Hero_ScreenPrintedHoodies_Colorado from "public/assets/Home/Hero_ScreenPrintedHoodies_Colorado.png";
import Hero_ScreenPrintingDenver from "public/assets/Home/Hero_ScreenPrintingDenver.png";
import Hero_SuziesMockup from "public/assets/Home/Hero_SuziesMockup.png";
import Hero_TShirtPrinterTankTops from "public/assets/Home/Hero_TShirtPrinterTankTops.png";

const HeroImages = [
  {
    src: Hero_ScreenPrintingDenver,
    alt: "Hero_ScreenPrintingDenver",
    width: 1146,
    height: 844,
  },
  {
    src: Hero_CustomEmbroideryColorado,
    alt: "Hero_CustomEmbroideryColorado",
    width: 1146,
    height: 392,
  },
  {
    src: Hero_CustomTShirtsSpiritWear,
    alt: "Hero_CustomTShirtsSpiritWear",
    width: 1146,
    height: 848,
  },
  {
    src: Hero_SuziesMockup,
    alt: "Hero_SuziesMockup",
    width: 1146,
    height: 518,
  },
  {
    src: Hero_CustomTShirtsDenver,
    alt: "Hero_CustomTShirtsDenver",
    width: 1146,
    height: 1023,
  },
  {
    src: Hero_CustomEmbroideryDenver,
    alt: "Hero_CustomEmbroideryDenver",
    width: 1146,
    height: 338,
  },
  {
    src: Hero_ScreenPrintedHoodies_Colorado,
    alt: "Hero_ScreenPrintedHoodies_Colorado",
    width: 1146,
    height: 1077,
  },
  {
    src: Hero_TShirtPrinterTankTops,
    alt: "Hero_TShirtPrinterTankTops",
    width: 1146,
    height: 852,
  },
].map(({ width, height, ...img }) => {
  const fixedWidth = 420;
  const fixedHeight = Math.round((fixedWidth / width) * height);

  return { ...img, width: fixedWidth, height: fixedHeight };
});

/* - welcome */
import Welcome_LibertyLadies from "public/assets/Home/Welcome_LibertyLadies.jpg";
import Welcome_Arrow from "public/assets/Home/Welcome_Arrow.svg";
/* - deserve */
import Deserve_Hats from "public/assets/Home/Deserve_Hats.jpg";
import Deserve_Hoodies from "public/assets/Home/Deserve_Hoodies.jpg";
import Deserve_Volunteers from "public/assets/Home/Deserve_Volunteers.jpg";
/* TODO: pick colors for each slider */
const DeserveImages = [
  {
    src: Deserve_Volunteers,
    alt: "Volunteers in branded gear at an event",
    objectPosition: "center",
    style: {
      minHeight: "90vh",
      backgroundColor: "#f5af21",
      background: "linearGradient(#f5c922, #f4951f)",
    },
  },
  {
    src: Deserve_Hoodies,
    alt: "Happy customer pointing towards button",
    objectPosition: "top",
    style: {
      minHeight: 630,
      backgroundColor: "#f5af21",
      background: "linearGradient(#f5c922, #f4951f)",
    },
  },
  {
    src: Deserve_Hats,
    alt: "Customer tipping custom hat",
    objectPosition: "center",
    style: {
      minHeight: "90vh",
      backgroundColor: "#f5af21",
      background: "linearGradient(#f5c922, #f4951f)",
    },
  },
];
const DeserveImage = DeserveImages[0]; // Math.floor(Math.random() * DeserveImages.length)];
/* - steps */
import Step1_Shirt from "public/assets/Home/Step1_Shirt.svg";
import Step2_Sizes from "public/assets/Home/Step2_Sizes.svg";
import Step3_Upload from "public/assets/Home/Step3_Upload.svg";
import ThatsIt_Hoodie from "public/assets/Home/ThatsIt_Hoodie.svg";
/* - services */
import Services_World from "public/assets/Home/Services_World.svg";
import Services_Handshake from "public/assets/Home/Services_Handshake.svg";
import Services_PiggyBank from "public/assets/Home/Services_PiggyBank.svg";
import Services_Star from "public/assets/Home/Services_Star.svg";
import UniformMan from "public/assets/Home/UniformMan.png";
/* - design */
import Design_Paint from "public/assets/Home/Design_Paint.svg";
import Design_BlueArrow from "public/assets/Home/Design_BlueArrow.svg";
import Design_Blob1 from "public/assets/Home/Design_Blob1.svg";
import Design_Blob2 from "public/assets/Home/Design_Blob2.svg";
/* - reviews */
import Reviews_Megaphone from "public/assets/Home/Reviews_Megaphone.svg";
import Reviews_Arrow from "public/assets/Home/Reviews_Arrow.svg";
/* - cta */
import Consultation_Phone from "public/assets/Home/Consultation_Phone.svg";
import CTA_Namaste from "public/assets/Home/CTA_Namaste.png";

import styles from "styles/Home.module.css";

const ACTION_VERBS = ["Wear", "Share"];

export const SectionDivider = () => (
  <div className={styles.SectionDivider}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1728 180"
      aria-hidden="true"
    >
      <path
        style={{ fill: "var(--background)" }}
        d="m1727.46,0v108.35c-123.61,55.23-287.83,56.6-426.96,33.57-1.06-.18-2.12-.35-3.18-.53C1088.47,106.6,897.29,24.8,682.64,7.07c-117.45-9.7-229.84,1.15-342.55,36.38-60.86,19.03-118.02,46.94-178.34,67.28-13.02,4.39-94.7,27.54-161.75,40.32V0h1727.46Z"
      />
    </svg>
  </div>
);

export const WaveCta = () => (
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

export const HowToSteps = ({
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

const HomePage = () => {
  const [heroRef, setHeroRef] = React.useState();
  const { isIntersecting: heroIsVisible } = useIntersectionObserver(heroRef, {
    initialIsIntersecting: true, // for SSR
  });

  return (
    <Layout style={{ overflowX: "hidden" }}>
      <div className={styles.hero} ref={setHeroRef}>
        <div className={styles.hero__spacer}>
          <div className={styles.hero__text}>
            <h1>
              <div className={styles.verbsContainer}>
                <div className={styles.verbsContainer__reel}>
                  {ACTION_VERBS.map((verb) => (
                    <div
                      key={verb}
                      className={styles.verbsContainer__reel__item}
                    >
                      {verb}
                    </div>
                  ))}
                </div>
                <span>your brand proudly.</span>
              </div>
            </h1>
            <h2>Get Quality Custom Apparel in 7 Days.</h2>
            <div className={styles.linkContainer}>
              <LinkButton href="#your-plan" scroll={false}>
                Start Project
              </LinkButton>
              <LinkButton href="/products" className="LinkButtonAlternate">
                Instant Quote
              </LinkButton>
            </div>
          </div>
          <ul
            className={`${styles.hero__imageReel}${
              heroIsVisible ? "" : ` ${styles.hero__imageReel__pauseAnimation}`
            }`}
            style={{
              "--totalImageHeights":
                HeroImages.reduce((total, img) => (total += img.height), 0) +
                (HeroImages.length - 3) * 200 + // 200px margin between images
                "px",
            }}
          >
            {HeroImages.map((image, imageIndex) => (
              <li key={imageIndex} style={{ marginTop: 200 }}>
                <Image
                  aria-hidden={true}
                  priority={imageIndex < 2}
                  quality={50}
                  sizes={`${image.width}px`}
                  placeholder="blur"
                  {...image}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.welcomeWrap}>
        <Image
          src={Welcome_LibertyLadies}
          alt="Happy customers wearing sweatshirts"
          className={styles.welcome__image}
          sizes="(max-width: 928px) 100%, 928px"
          placeholder="empty" // avoid orange flash
          priority
        />
        <div className={styles.welcome}>
          <div className={styles.welcome__block}>
            <div className={styles.welcome__block__header}>
              <h3 className={styles.welcome__block__heading}>
                Welcome to Lab Seven.
              </h3>
              <RotatingLogo />
            </div>
            <p>
              Founded in 2006, now with 6 front-range locations – We've been
              helping local businesses, schools, and churches successfully
              market their brands in style for nearly 15 years.
            </p>
            <p>
              Like you, we understand the challenges of standing out in a busy
              and competitive market.
            </p>
            <p>
              <strong>That's why we believe:</strong>
            </p>
            <div className={styles.welcome__block__arrow}>
              <Image
                src={Welcome_Arrow}
                alt="Arrow pointing to next section"
                aria-hidden="true"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.youDeserve} style={DeserveImage.style}>
        <Image
          className={styles.youDeserve__bg}
          src={DeserveImage.src}
          alt={DeserveImage.alt}
          aria-hidden={true}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: DeserveImage.objectPosition,
          }}
        />
        <div className={styles.youDeserve__spacer}>
          <div className={styles.youDeserve__block}>
            <p>
              You deserve quality apparel that reflects the legitimacy of your
              brand.
            </p>
            <LinkButton href="/products">Get Started</LinkButton>
          </div>
        </div>
      </div>
      <HowToSteps />
      <div
        className={[styles.servicesWrap, styles.hasSectionDivider].join(" ")}
      >
        <SectionDivider />
        <div className={styles.services__spacer}>
          <h2 className={styles.services__heading}>
            <span className={styles.Underline3}>Real world</span>
            <div style={{ display: "inline-flex", margin: 10 }}>
              <Image
                src={Services_World}
                alt={"Sketch of globe"}
                aria-hidden={true}
                height={60}
                width={60}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <br />
            marketing solutions.
          </h2>

          <p className={styles.services__flyingText}>
            <strong>T-shirts aren't going out of style.</strong>
            {` Custom apparel is a tried-and-true business investment, and it's
            never been easier to order retail-quality apparel and promotional
            materials on a budget!`}
          </p>

          <div className={styles.services__uniformMan}>
            <Image
              src={UniformMan}
              alt="Man wearing branded polo shirt"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>

          <ul className={styles.services__points}>
            <li>
              <Image
                src={Services_PiggyBank}
                alt="Hand drawn sketch of piggy bank"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div>
                <h5>Monetize Your Brand</h5>
                <p>
                  Apparel sales offer your customers a fun and affordable way to
                  show their support, while creating a new source of income for
                  your business.
                </p>
              </div>
            </li>
            <li>
              <Image
                src={Services_Handshake}
                alt="Hand drawn sketch of handshake"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div>
                <h5>Connect With Your Crowd</h5>
                <p>
                  Build positive relationships with your most important team
                  members and clientele. One T-shirt at a time!
                </p>
              </div>
            </li>
            <li>
              <Image
                src={Services_Star}
                alt="Hand drawn sketch of star"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div className={styles.services__points__textWrap}>
                <h5>Outfit Employees in Style</h5>
                <p>
                  Affordable t-shirts no longer have to feel cheap. Outfitting
                  your team with trendy, retail-quality styles goes a long way
                  in representing your brand.
                </p>
              </div>
            </li>
          </ul>

          <div className={styles.services__reelPositioner}>
            <ServicesReel />
          </div>
        </div>
      </div>
      <div className={styles.designWrap} id="design">
        <Image
          src={Design_Paint}
          alt="Sketch of Artist's Color Palette"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div className={styles.design__header}>
          <div id={styles.design__arrow}>
            <Image
              src={Design_BlueArrow}
              alt="Arrow towards design studio"
              aria-hidden="true"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <h2 className={styles.design__heading}>Design Your Own Shirt</h2>
        </div>
        <div className={styles.design__container}>
          <div id={styles.design__blob1}>
            <Image
              src={Design_Blob1}
              alt="Decorative blue blob"
              aria-hidden="true"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <DesignIFrame id={styles.design__studio} />
          <div id={styles.design__blob2}>
            <Image
              src={Design_Blob2}
              alt="Decorative yellow blob"
              aria-hidden="true"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
      <div className={styles.testimonialsWrap}>
        <Image
          src={Reviews_Megaphone}
          alt="Sketch of happy customer with megaphone"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <h2 className={styles.testimonials__heading}>
          What Lab Seven Customers are Saying:
          <div className={styles.testimonials__arrow}>
            <Image
              src={Reviews_Arrow}
              alt="Arrow towards customer reviews"
              aria-hidden="true"
              style={{ maxWidth: "5rem", height: "auto" }}
            />
          </div>
        </h2>
        <TestimonialsReel />
      </div>
      <WaveCta />
    </Layout>
  );
};

export default HomePage;
