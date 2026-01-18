"use client";

import * as React from "react";
import { Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import set from "lodash.set";

import { LinkButton, ThreeDotLoader } from "components";

import { useOrderForm, INITIAL_PRODUCT } from "lib/orderForm";

import StartArrow from "public/assets/Order/StartArrow.svg";
import Step1_Shirt from "public/assets/Home/Step1_Shirt.svg";

import styles from "styles/OrderForm.module.css";
import homeStyles from "styles/Home.module.css";
import isEqual from "react-fast-compare";

const AddToCartContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { hasLoaded, formik } = useOrderForm();
  const [hasAdded, setHasAdded] = React.useState(false);

  // move from URL to form state
  React.useEffect(() => {
    if (!hasLoaded) return; // wait for form state to load from localStorage
    if (hasAdded) return; // only add once

    try {
      const productParams = { quickAdd: true };
      for (const [key, value] of searchParams.entries()) {
        set(productParams, key, value);
      }
      const asFormRow = {
        categoryCode: productParams.categoryCode || "",
        manufacturerCode: productParams.manufacturerCode || "",
        manufacturerSkuCode: productParams.manufacturerSkuCode || "",
        colorNameCode: productParams.colorNameCode || "",
      };
      const prevValues = formik.values;
      const prevProducts = (prevValues.products || []).filter(
        (p) => !isEqual(p, INITIAL_PRODUCT)
      );
      const prevContext = prevValues.context || {};
      const nextContext =
        asFormRow.manufacturerSkuCode in prevContext
          ? prevContext // already there
          : { ...prevContext, [asFormRow.manufacturerSkuCode]: productParams };
      formik.setValues({
        context: nextContext,
        products: [...prevProducts, asFormRow],
      });
      setHasAdded(true);
    } catch (_err) {
      console.error("Error adding product to cart", _err);
    }
  }, [
    searchParams,
    hasLoaded,
    formik.values,
    formik.setValues,
    hasAdded,
    setHasAdded,
  ]);

  // redirect on write to localStorage
  React.useEffect(() => {
    const redirectOnStorage = () => {
      router.replace("/order/pick-products");
    };
    window.addEventListener("local-storage-form-update", redirectOnStorage);
    return () => {
      window.removeEventListener(
        "local-storage-form-update",
        redirectOnStorage
      );
    };
  }, [router]);

  return (
    <>
      <h2 className={styles.startHeader}>
        <Image
          src={StartArrow}
          alt={"Start Arrow"}
          className={styles.startArrow}
          aria-hidden={true}
        />
        Start your <span className={homeStyles.Underline1}>awesome</span>{" "}
        project:
      </h2>
      <div className={styles.formContainer}>
        <Image
          src={Step1_Shirt}
          alt="Hand drawn sketch of a t-shirt"
          style={{ maxWidth: "10rem", height: "auto" }}
        />
        <h1 className={styles.stepTitle}>0. Adding to cart...</h1>
        <div className={styles.form__body}>
          <p style={{ textAlign: "center", minHeight: "2rem" }}>
            You will be redirected momentarily.
          </p>
        </div>
        <div className={styles.form__actions}>
          <LinkButton href="/order/pick-products">
            Start cart manually
          </LinkButton>
        </div>
      </div>
    </>
  );
};

const AddToCart = () => {
  return (
    <div className={styles.background}>
      <Suspense fallback={<ThreeDotLoader />}>
        <AddToCartContent />
      </Suspense>
    </div>
  );
};

export default AddToCart;
