"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import useIntersectionObserver from "@react-hook/intersection-observer";

import {
  LinkButton,
  RotatingLogo,
  ServicesReel,
  TestimonialsReel,
  ThreeDotLoader,
  HowToSteps,
  WaveCta,
  SectionDivider,
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
import Deserve_Volunteers from "public/assets/Home/Deserve_Volunteers.jpg";
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

import styles from "styles/Home.module.css";

const ACTION_VERBS = ["Wear", "Share"];

const DeserveImage = {
  src: Deserve_Volunteers,
  alt: "Volunteers in branded gear at an event",
  objectPosition: "center",
  style: {
    minHeight: "90vh",
    backgroundColor: "#f5af21",
    background: "linearGradient(#f5c922, #f4951f)",
  },
};

const HomePage = () => {
  const [heroRef, setHeroRef] = React.useState();
  const { isIntersecting: heroIsVisible } = useIntersectionObserver(heroRef, {
    initialIsIntersecting: true, // for SSR
  });

  return (
    <div style={{ overflowX: "hidden" }}>
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
    </div>
  );
};

export default HomePage;
