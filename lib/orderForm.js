import * as React from "react";
import { useFormik } from "formik";
import isEqual from "react-fast-compare";
import { useDebounceCallback } from "@react-hook/debounce";
import { useRouter } from "next/router";
import { trackEvent } from "./googleAnalytics";

export const INITIAL_PRODUCT = {
  categoryCode: "",
  manufacturerCode: "",
  manufacturerSkuCode: "",
  colorNameCode: "",
  sizeChart: {},
};

const FIELD_RESETS = {
  categoryCode: {
    manufacturerCode: "",
    manufacturerSkuCode: "",
    colorNameCode: "",
    sizeChart: {},
  },
  manufacturerCode: {
    manufacturerSkuCode: "",
    colorNameCode: "",
    sizeChart: {},
  },
  manufacturerSkuCode: { colorNameCode: "", sizeChart: {} },
  colorNameCode: { sizeChart: {} },
};

const FORM_STORAGE_KEY = "L7_OrderForm--2023-05-21"; // versioned to avoid errors w/ shape changes

export const useOrderForm = () => {
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const router = useRouter();

  // product options
  // - too heavy for server side props, loaded from api on demand
  // - options seen loaded in memory state map (ephemeral)
  // - options selected persisted to form state (persists)
  const [productCacheMap, setProductCacheMap] = React.useState(new Map());
  const updateProductCacheMap = (product) => {
    setProductCacheMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(product.manufacturerSkuCode, product);
      return newMap;
    });
  };
  const upsertProductContext = (selectedProduct) => {
    formik.setFieldValue(
      `context.${selectedProduct.manufacturerSkuCode}`,
      selectedProduct
    );
  };

  const formik = useFormik({
    initialValues: {
      products: [INITIAL_PRODUCT],
      context: {},
      name: "",
      email: "",
      phone: "",
      notes: "",
      attachments: [],
    },
    onSubmit: async (values, _formikBag) => {
      try {
        const params = formatToParams(values);
        const response = await fetch("/api/forms", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(params),
        });

        if (response.ok) {
          const totalQuantity = params.rows.reduce(
            (sum, row) => sum + (row.totalQty || 0),
            0
          );
          trackEvent("form_submit", {
            form_name: "order",
            items: params.rows.length,
            quantity: totalQuantity,
          });
          router.push("/order/thank-you");
          window.localStorage.removeItem(FORM_STORAGE_KEY);
        } else {
          console.warn(response);
          throw new Error("submit error");
        }
      } catch (submitError) {
        alert(
          "On no! something went wrong. Please refresh and try again. If this continues please let our team know!"
        );
        console.error(submitError);
      }
    },
  });
  const prevFormikValues = React.useRef();

  // persist values to local storage
  const persistForm = useDebounceCallback((data) => {
    try {
      window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("local-storage-form-update"));
    } catch (e) {
      console.error("write error", e);
    }
  });
  React.useEffect(() => {
    if (prevFormikValues.current) {
      // not first mount... subsequent changes
      // - debounced save to local storage onChange
      if (!isEqual(formik.values, prevFormikValues.current)) {
        persistForm(formik.values);
      }
    } else {
      // first mount
      // - load from localStorage
      prevFormikValues.current = formik; // set for next run
      const maybeState = window.localStorage.getItem(FORM_STORAGE_KEY);
      if (maybeState && maybeState !== null) {
        const storedValues = JSON.parse(maybeState);
        formik.setValues(storedValues);
        if (storedValues.context) {
          Object.values(storedValues.context).forEach((product) =>
            updateProductCacheMap(product)
          );
        }
      }
      setHasLoaded(true);
    }
  }, [formik.values, persistForm]);

  // product helpers
  const addProduct = (toAdd = INITIAL_PRODUCT) => {
    const prevProducts = formik.values.products;
    if (
      prevProducts.length === 1 &&
      isEqual(prevProducts[0], INITIAL_PRODUCT)
    ) {
      formik.setFieldValue("products", [toAdd]);
    } else {
      formik.setFieldValue("products", [...prevProducts, toAdd]);
    }
  };
  const cloneProduct = (index) => {
    const prevProducts = formik.values.products;
    formik.setFieldValue(
      "products",
      prevProducts.flatMap((p, pIndex) =>
        index === pIndex ? [p, { ...p, colorNameCode: "" }] : p
      )
    );
  };
  const removeProduct = (index) => {
    const prevProducts = formik.values.products;
    if (prevProducts.length === 1) {
      formik.setFieldValue("products", [INITIAL_PRODUCT]);
    } else {
      formik.setFieldValue(
        "products",
        prevProducts.filter((_p, pIndex) => index !== pIndex)
      );
    }
  };
  const updateProduct = (index, name, newValue) => {
    const prevProducts = formik.values.products;
    const dependentFieldResets = FIELD_RESETS[name];

    formik.setFieldValue(
      "products",
      prevProducts.map((product, pIndex) =>
        index === pIndex
          ? { ...product, ...dependentFieldResets, [name]: newValue }
          : product
      )
    );
  };

  return {
    formik,
    addProduct,
    cloneProduct,
    removeProduct,
    updateProduct,
    upsertProductContext,
    productCacheMap,
    updateProductCacheMap,
    hasLoaded,
  };
};

const TOP_SIZE_NAMES = [
  "XXS",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
  "6XL",
];

const formatSizeChart = (sizeChart = {}) => {
  const formattedSizeChart = {};
  const overflow = {};
  let totalQty = 0;

  for (const [size, quantity] of Object.entries(sizeChart)) {
    if (!quantity) continue;

    const qty = parseInt(quantity, 10); // safety first
    if (isNaN(qty)) continue;

    totalQty += qty;
    if (TOP_SIZE_NAMES.includes(size)) {
      formattedSizeChart[size] = qty;
    } else {
      overflow[size] = qty;
    }
  }

  if (Object.keys(overflow).length) {
    const overflowPairs = Object.entries(overflow).map((pair) =>
      pair.join(": ")
    );
    formattedSizeChart["Other"] = overflowPairs.join("\n");
  }

  return [totalQty, formattedSizeChart];
};

const formatToParams = (formValues) => {
  const attachments = formValues.attachments || [];
  const sharedFields = {
    name: formValues.name,
    email: formValues.email,
    phone: formValues.phone,
    notes: formValues.notes,
    attachmentCount: attachments.length,
    attachmentData: JSON.stringify(attachments, null, 2),
  };

  return {
    __title: "get_started", // matches google sheet name!
    rows: formValues.products.map((formRow, pIndex) => {
      const productNumber = pIndex + 1;
      const selectedProduct =
        formValues.context[formRow.manufacturerSkuCode] || {};
      const selectedStyle =
        selectedProduct.Styles?.find(
          (style) => style.nameCode === formRow.colorNameCode
        ) || {};
      const [totalQty, sizeChart] = formatSizeChart(formRow.sizeChart);

      return {
        ...sharedFields,
        productNumber,
        category: formRow.categoryCode,
        manufacturer: selectedProduct.Manufacturer,
        productName: selectedProduct.Name,
        sku: formRow.manufacturerSkuCode,
        color: selectedStyle.Name,
        totalQty: totalQty,
        ...sizeChart,
      };
    }),
  };
};
