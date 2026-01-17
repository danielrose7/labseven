"use client";

import * as React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Button, LinkButton } from ".";
import { titleize, formatUSD } from "../lib/utils";
import { trackEvent } from "../lib/googleAnalytics";

import axios from "axios";
import { stringify } from "qs";

import calcStyles from "./ProductCalculator.module.css";
import { buildOptions } from "pages/order/pick-products";

// https://demo.inksoft.com/demo?Page=Api2#methods_GetQuote
const QUOTE_ENDPOINT =
  "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetQuote";

// see https://demo.inksoft.com/demo?Page=Api2#viewModels_PricedQuoteItem
const buildQuoteItem = (productData, values) => ({
  ProductId: productData.ID,
  ProductStyleId: productData.activeStyle.ID,
  ProductStyleSizeId: productData.activeStyle.Sizes[0].ID, // assume first
  Quantity: values.Quantity,
  Sides: values.Sides.filter(({ NumColors }) => NumColors > 0).map(
    ({ SideId, NumColors }) => ({
      SideId,
      NumColors,
      ArtIdentifier: `${SideId} - ${productData.ID}`,
      IsFullColor: false,
    })
  ),
});

const buildPayload = (productData, values) => {
  let formData = new FormData();

  formData.append(
    "QuoteItems",
    JSON.stringify([buildQuoteItem(productData, values)])
  );

  return formData;
};

const getQuote = async (productData, values) => {
  const payload = buildPayload(productData, values);

  const response = await axios.post(QUOTE_ENDPOINT, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset='utf-8'",
    },
  });

  return response.data;
};

const ITEM_COLOR_LIMITS = [
  { itemMin: 12, itemMax: 23, colors: 2 },
  { itemMin: 24, itemMax: 49, colors: 4 },
];

export const validateCalculator = (values) => {
  const errors = {};
  const Quantity = Number(values.Quantity);

  if (Quantity < 12) {
    errors.Quantity = "Minimum quantity of 12";
  }
  const sideValues = values.Sides || [];
  const sideCount = sideValues.length;
  if (Quantity * sideCount > 10000) {
    errors.Quantity = "For large orders, contact our shop!";
  }

  const colorLimit = ITEM_COLOR_LIMITS.find(
    (set) => Quantity >= set.itemMin && Quantity <= set.itemMax
  );

  const colorMax = colorLimit?.colors || 8;

  let sideErrors = [];
  let totalColors = 0;
  sideValues.forEach((side, sideIndex) => {
    const sideColors = Number(side.NumColors);
    totalColors += sideColors;
    if (sideColors < 0) {
      sideErrors[sideIndex] = `Cannot be negative`;
    } else if (sideColors > colorMax) {
      sideErrors[sideIndex] = colorLimit
        ? `We have a ${colorMax} color limit for orders between ${colorLimit.itemMin} and ${colorLimit.itemMax} items.`
        : `For quotes on more than ${colorMax} colors, contact our shop!`;
    }
  });
  if (totalColors === 0) {
    sideErrors[sideValues.length - 1] = "At least 1 side must have color";
  }
  if (sideErrors.length) {
    errors["Sides"] = sideErrors;
  }

  return errors;
};

export const SideLabel = ({ sideName }) => {
  if (sideName === "Sleeveleft") return "Left Sleeve";
  if (sideName === "Sleeveright") return "Right Sleeve";

  return sideName;
};

const ProductCalculator = ({ productData }) => {
  const [quote, setQuote] = React.useState();
  const [error, setError] = React.useState();

  const productQuote = (quote?.Data || []).find(
    (q) => q.ProductId === productData.ID
  );

  const allSides = productData.activeStyle.Sides;
  const defaultSide = allSides.find((s) => s.Side === "front") || allSides[0];
  const otherSides = allSides.filter((s) => s.Side !== defaultSide.Side);

  const initialValues = {
    Quantity: 50,
    Sides: [
      { SideId: defaultSide.Side, NumColors: 2 },
      ...otherSides.map((s) => ({ SideId: s.Side, NumColors: 0 })),
    ],
  };

  const productToAdd = {
    // for formRow
    categoryCode: productData.Categories[0].code,
    manufacturerCode: productData.manufacturerCode,
    manufacturerSkuCode: productData.manufacturerSkuCode,
    colorNameCode: productData.activeStyle.nameCode,

    // minimal context
    ...buildOptions(productData),
    Name: productData.Name,
    Categories: productData.Categories.map((cat) => ({ code: cat.code })),
    Styles: productData.Styles.map((style) => ({
      nameCode: style.nameCode,
      Name: style.Name,
      Sizes: style.Sizes.map((size) => ({ Name: size.Name })),
    })),
  };

  return (
    <div className={calcStyles.pageContainer}>
      <h3>Instant Quote</h3>

      <Formik
        initialValues={initialValues}
        validate={validateCalculator}
        onSubmit={async (values) => {
          setError(); // clear last error
          try {
            const res = await getQuote(productData, values);
            setQuote(res);
            trackEvent("form_submit", { form_name: "get_quote" });
          } catch (err) {
            setError(err);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={calcStyles.form}>
            <div className={calcStyles.formEl}>
              <div className={calcStyles.formSideGrid}>
                <label htmlFor="Quantity">Total Quantity</label>
                <div className={calcStyles.sideInputs}>
                  <button
                    type="button"
                    className={calcStyles.incrementButton}
                    onClick={() =>
                      setFieldValue("Quantity", Number(values["Quantity"]) - 1)
                    }
                  >
                    -
                  </button>
                  <Field
                    id="Quantity"
                    name="Quantity"
                    type="number"
                    step="1"
                    min="0"
                  />
                  <button
                    type="button"
                    className={calcStyles.incrementButton}
                    onClick={() =>
                      setFieldValue("Quantity", Number(values["Quantity"]) + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <ErrorMessage
                name="Quantity"
                component="div"
                className={calcStyles.errorMessage}
              />
            </div>
            <hr className={calcStyles.divider} />
            <FieldArray
              name="Sides"
              render={(_arrayHelpers) => (
                <div className={calcStyles.formEl}>
                  <h4>Number of Ink Colors</h4>
                  {values.Sides &&
                    values.Sides.length > 0 &&
                    values.Sides.map((side, sideIndex) => {
                      const fieldId = `Sides.${sideIndex}`;
                      const sideName = titleize(side.SideId);
                      const onValueChange = (event) => {
                        setFieldValue(fieldId, {
                          ...side,
                          NumColors: event.target.value,
                        });
                      };
                      const onButtonClick = (change) => {
                        setFieldValue(fieldId, {
                          ...side,
                          NumColors: Number(side.NumColors) + change,
                        });
                      };

                      return (
                        <React.Fragment key={sideIndex}>
                          <div className={calcStyles.formSideGrid}>
                            <label htmlFor={fieldId}>
                              <SideLabel sideName={sideName} />
                            </label>
                            <div className={calcStyles.sideInputs}>
                              <button
                                type="button"
                                className={calcStyles.incrementButton}
                                onClick={() => onButtonClick(-1)}
                              >
                                -
                              </button>
                              <Field
                                id={fieldId}
                                name={fieldId}
                                type="number"
                                step="1"
                                min="0"
                                value={side.NumColors}
                                onChange={onValueChange}
                              />
                              <button
                                type="button"
                                className={calcStyles.incrementButton}
                                onClick={() => onButtonClick(1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <ErrorMessage
                            name={fieldId}
                            component="div"
                            className={calcStyles.errorMessage}
                          />
                        </React.Fragment>
                      );
                    })}
                </div>
              )}
            />
            <div className={calcStyles.formActions}>
              <Button
                type="submit"
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
              >
                Get Quote
              </Button>
            </div>
            {!!error && (
              <div>
                <h5>
                  Oh no! An error occurred:{" "}
                  <span style={{ color: "var(--danger)" }}>
                    {error.message}
                  </span>
                </h5>
                <details>
                  <summary>Full Details</summary>
                  <pre>{JSON.stringify(error, null, 2)}</pre>
                </details>
              </div>
            )}
            {!!productQuote && (
              <div className={calcStyles.quoteGrid}>
                <ul className={calcStyles.quoteList}>
                  <li>{formatUSD(productQuote["EachProductTotal"])} each</li>
                  <hr style={{ margin: "0.5rem 0" }} />
                  <li>
                    {formatUSD(productQuote["ProductAndPrintingTotal"])} total
                  </li>
                </ul>
                <div className={calcStyles.incentiveIncrease}>
                  <p className={calcStyles.incentiveIncrease__text}>
                    Want a better price?
                  </p>
                  <Button
                    type="submit"
                    className="ButtonAlternate"
                    isSubmitting={isSubmitting}
                    onClick={() =>
                      setFieldValue("Quantity", Number(values["Quantity"]) + 10)
                    }
                  >
                    + 10 Pieces
                  </Button>
                </div>
                <LinkButton
                  href={`/order/add-to-cart?${stringify(productToAdd)}`}
                >
                  Start Order
                </LinkButton>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductCalculator;
