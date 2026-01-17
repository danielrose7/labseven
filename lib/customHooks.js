"use client";

import * as React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
import { stringify } from "qs";
import isEqual from "react-fast-compare";

export const usePaginatedProducts = (fallbackData, delay = 350) => {
  const { query, params, replace } = useRouter();
  const [debouncedQuery, setDebouncedQuery] = React.useState(query);
  const { pagination: defaultPagination } = fallbackData;

  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [query, delay] // Only re-call effect if value or delay changes
  );

  const endpoint =
    "/api/products?" + stringify({ ...debouncedQuery, ...(params ?? {}) });
  const page = Number(debouncedQuery.page || 1);
  const isDefaultQuery =
    !debouncedQuery ||
    (page === 1 &&
      (!query.sort || query.sort === "default") && // default sort
      (!query.q || query.q === "")); // no search query

  const res = useSWR(endpoint, fetcher, {
    fallbackData: isDefaultQuery ? fallbackData : undefined,
    revalidateIfStale: !isDefaultQuery,
  });
  const [quote, setQuote] = React.useState();

  let products, pagination;

  if (res.data) {
    // use data from API
    products = res.data.products;
    pagination = res.data.pagination;
  } else {
    // show loader while fetching new page
    products = Array(defaultPagination.perPage)
      .fill()
      .map(() => ({ isLoading: true }));
    pagination = { ...defaultPagination, page: page };
  }

  // augment products w/ quote
  if (quote && quote.Data) {
    products = products.map((p) => {
      const productQuote = quote.Data.find((q) => q.ProductId === p.ID);
      return productQuote
        ? { ...p, showPrice: true, UnitPrice: productQuote.EachProductTotal }
        : p;
    });
  }

  const isLoading =
    res.isLoading && !(res.error || isEqual(res.data, fallbackData));

  const setQuery = (nextValue) =>
    // change url via router.replace
    replace({ query: { ...query, ...nextValue } }, undefined, {
      shallow: true,
    });

  return {
    isLoading,
    data: { products, pagination },
    setQuote,
    error: res.error,
    query,
    setQuery,
  };
};

import { serializeForm } from "./utils";
import { trackEvent } from "./googleAnalytics";

export const useSubmit = (defaultState = "idle") => {
  const [formState, setFormState] = React.useState(defaultState);

  const onSubmit = async (event) => {
    event.preventDefault();

    setFormState("submitting");
    try {
      const formData = serializeForm(event.target);
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState("submitted");
        // Track conversion event
        const formName = formData.__title || "unknown";
        trackEvent("form_submit", {
          form_name: formName,
          ...(formData.service && { service: formData.service }),
        });
      } else {
        console.warn(response);
        throw new Error("submit error");
      }
    } catch (_e) {
      setFormState("error");
    }
  };

  return [formState, onSubmit];
};
