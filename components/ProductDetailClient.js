"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { ColorOption, ProductCalculator } from "components";
import productStyles from "styles/product.module.css";

const ProductDetailClient = ({ productData, categoryData, subcategoryData }) => {
  const activeStyle = productData.activeStyle;
  const [activeSide, setActiveSide] = React.useState();

  // on style change
  // show same clicked-to side Image if possible
  React.useEffect(() => {
    const matchingSide = activeStyle.Sides.find(
      (side) => side.Side === activeSide?.Side
    );
    setActiveSide(matchingSide);
  }, [activeStyle, activeSide]);

  return (
    <>
      <div className={productStyles.breadcrumbs}>
        <Link href="/products">Products</Link>
        {!!categoryData && (
          <Link href={categoryData.href}>{categoryData.Name}</Link>
        )}
        {!!subcategoryData && (
          <Link href={subcategoryData.href}>{subcategoryData.Name}</Link>
        )}
      </div>
      <div className={productStyles.pageContainer}>
        <div className={productStyles.title}>
          <h1>{productData.Name}</h1>
          <h3>
            {productData.Manufacturer}{" "}
            <span className="highlight caps">
              {productData.ManufacturerSku}
            </span>
          </h3>
        </div>
        <div className={productStyles.gallery}>
          <ul className={productStyles.gallery__sides}>
            {activeStyle.Sides.map((side, sideIndex) => (
              <li
                key={sideIndex}
                className={productStyles.gallery__sides__item}
              >
                {side.hasImage ? (
                  <button onClick={() => setActiveSide(side)}>
                    <Image
                      src={side.imageUrl}
                      width={80}
                      height={80}
                      alt={`Sample of ${productData.Name} in ${activeStyle.Name} from side ${side.Side}`}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </button>
                ) : (
                  <p>Missing image for {side.Side}</p>
                )}
              </li>
            ))}
          </ul>
          {!!activeSide ? (
            <Image
              className={productStyles.gallery__main}
              src={activeSide.imageUrl}
              width={500}
              height={500}
              alt={`Sample of ${productData.Name} in ${activeStyle.Name} from side ${activeSide.Side}`}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          ) : activeStyle.hasMainImage ? (
            <Image
              priority
              className={productStyles.gallery__main}
              src={activeStyle.mainImageUrl}
              width={500}
              height={500}
              alt={`Sample of ${productData.Name} in ${activeStyle.Name} style`}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          ) : (
            <p className={productStyles.gallery__main}>Missing image!</p>
          )}
        </div>
        <div className={productStyles.details}>
          <div className={productStyles.detailsBox}>
            <div className="detailsBox__styles">
              <label className={productStyles.style__label}>
                Color Shown
                <span>{activeStyle.Name}</span>
              </label>
              <ul className={productStyles.colorOptions}>
                {productData.Styles.map((style) => (
                  <ColorOption
                    key={style.ID}
                    style={style}
                    isActive={style.ID == activeStyle.ID}
                    replace
                  />
                ))}
              </ul>
            </div>
          </div>
          <hr />
          <div className={productStyles.detailsBox}>
            <ProductCalculator productData={productData} />
          </div>
          {!!productData.LongDescription && (
            <>
              <hr />
              <div className={productStyles.detailsBox}>
                <h3>Product Information</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: productData.LongDescription,
                  }}
                ></p>
              </div>
            </>
          )}
          {process.env.NODE_ENV === "development" && (
            <>
              <hr />
              <details>
                <pre>{JSON.stringify(productData, null, 2)}</pre>
              </details>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailClient;
