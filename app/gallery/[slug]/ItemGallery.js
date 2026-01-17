"use client";

import * as React from "react";
import Image from "next/image";

import productStyles from "styles/product.module.css";

// per demo at
function ImageMagnifier({ image }) {
  // settings
  const height = 400;
  const width = 600;
  const magnifierHeight = 200;
  const magnifierWidth = 200;
  const zoomLevel = 3;

  const [[x, y], setXY] = React.useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = React.useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = React.useState(false);
  return (
    <div
      style={{
        position: "relative",
        cursor: "zoom-in",
      }}
    >
      <Image
        priority
        src={image.url}
        className={productStyles.gallery__main}
        width={width}
        height={height}
        alt={image.alt}
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
          objectPosition: "center",
        }}
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false);
        }}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: "none",
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "2px solid var(--hr)",
          backgroundColor: "white",
          backgroundImage: `url('${image.url}')`,
          backgroundRepeat: "no-repeat",

          // calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          // calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}

function ItemGallery({ project }) {
  const images = [
    {
      name: "Primary",
      url: project.primary_blob_url,
      alt: `Primary image of our ${project.name} project`,
    },
    {
      name: "Secondary",
      url: project.secondary_blob_url,
      alt: `Detail image of ${project.name} project showing awesome details`,
    },
  ];
  const [activeImage, setActiveImage] = React.useState(images[0]);

  return (
    <div className={productStyles.gallery}>
      <ul className={productStyles.gallery__sides}>
        {images.map((image) => (
          <li key={image.name} className={productStyles.gallery__sides__item}>
            <button onClick={() => setActiveImage(image)}>
              <Image
                src={image.url}
                width={80}
                height={120}
                alt={image.alt}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </button>
          </li>
        ))}
      </ul>

      <ImageMagnifier image={activeImage} />
    </div>
  );
}

export default ItemGallery;
