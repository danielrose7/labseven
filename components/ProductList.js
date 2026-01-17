import { useRouter } from "next/router";
import Image from "next/image";
import LegacyImage from "next/legacy/image";
import Link from "next/link";

import {
  CallLink,
  ColorOption,
  ErrorAlert,
  Pagination,
  ThreeDotLoader,
} from ".";
import ShirtlessGuy from "public/assets/Catalog/ShirtlessGuy.svg";

import styles from "./ProductList.module.css";
import homeStyles from "styles/Home.module.css";

const LOADING_ADJECTIVES = [
  "Awesome",
  "Beautiful",
  "Creative",
  "Delightful",
  "Exciting",
  "Favorite",
  "Glorious",
  "Honest",
  "Incredible",
  "Juicy",
  "Killer",
  "Legit",
  "Majestic",
  "Novel",
  "Optimal",
  "Prized",
  "Quality",
  "Rad",
  "Stunning",
  "Tantalizing",
  "Upbeat",
  "Valiant",
  "Worthwhile",
  "Yummy",
  "Zesty",
];
const ProductSkeleton = ({ productIndex }) => {
  const randomAdjective = LOADING_ADJECTIVES[productIndex];

  return (
    <div className={styles.ProductCard}>
      <div className={styles.ProductCard__frame} />
      <div className={styles.ProductCard__description}>
        <div className={styles.ProductSkeleton__image} />
        <div>
          <h4>
            {randomAdjective}
            <br />
            Product
          </h4>
          <p>Loading...</p>
          <ul className={styles.colorOptions} />
        </div>
      </div>
    </div>
  );
};

const NoContentMessage = () => (
  <div className={styles.NoContentMessage}>
    <Image
      aria-hidden={true}
      src={ShirtlessGuy}
      className={styles.NoContentMessage__image}
      alt="Fun, shirtless guy who is unable to find awesome product he is after"
      quality={100}
    />
    <div className={styles.NoContentMessage__blurb}>
      <h2 className={styles.NoContentMessage__blurb__disabledText}>
        No Matching Products.
      </h2>
      <p>
        <strong>Can't find what you're looking for?</strong>
      </p>
      <p
        className={[
          homeStyles.Underline2,
          styles.NoContentMessage__blurb__bigText,
        ].join(" ")}
      >
        We can still get it!
      </p>
      <p>
        Call to check availability.{" "}
        <CallLink
          className="LinkButtonAlternate"
          style={{ marginLeft: "1rem" }}
        >
          Call Now
        </CallLink>
      </p>
    </div>
  </div>
);

const ProductCard = ({ product, productIndex, navigateTo }) => {
  if (product.isLoading) return <ProductSkeleton productIndex={productIndex} />;

  const activeStyle = product.Styles[0];
  const showMoreStyles = product.Styles.length > 7;

  return (
    <div
      className={styles.ProductCard}
      onClick={() => navigateTo(product.defaultHref)}
    >
      <span className={styles.ProductCard__frame} />
      <div className={styles.ProductCard__description}>
        {activeStyle.hasMainImage ? (
          <LegacyImage
            src={activeStyle.mainImageUrl}
            objectFit="contain"
            objectPosition="center"
            width={290}
            height={320}
            alt={`Sample of ${product.Name} in ${activeStyle.Name} style`}
          />
        ) : (
          <p>Missing image!</p>
        )}
        <div>
          <h4>
            {product.Manufacturer} <br />
            <span className="caps">{product.ManufacturerSku}</span>
          </h4>
          <p>{product.Name}</p>

          {product.showPrice && (
            <p className="highlight">
              <strong>
                <span>{`$${product.UnitPrice.toFixed(2)} each`}</span>
              </strong>
            </p>
          )}

          {product.Styles.length > 1 && (
            <ul
              className={`${styles.colorOptions} ${
                showMoreStyles ? styles.colorOptions__ShowMore : ""
              }`}
            >
              {product.Styles.map((style, styleIndex) => {
                if (styleIndex > 6) return null;

                return (
                  <ColorOption
                    key={styleIndex}
                    style={style}
                    isActive={styleIndex === 0}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ error, products, isLoading, pagination }) => {
  const router = useRouter();

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!products.length) {
    return <NoContentMessage />;
  }

  return (
    <>
      <div
        className={`${styles.ProductList} ${
          isLoading ? styles.ProductListIsLoading : ""
        }`}
      >
        {products.map((product, productIndex) => (
          <ProductCard
            key={`${product.ID}-${productIndex}`}
            product={product}
            productIndex={productIndex}
            navigateTo={(path) => router.push(path)}
          />
        ))}
      </div>
      <div className={styles.PaginationContainer}>
        <Pagination pagination={pagination} />
        {isLoading && <ThreeDotLoader />}
      </div>
      <div className={styles.MissingRedirect}>
        <p>
          Can't find the product you're looking for?{" "}
          <strong>We can still get it!</strong>{" "}
          <Link href="/contact">Call to check availability.</Link>
        </p>
      </div>
    </>
  );
};

export default ProductList;
