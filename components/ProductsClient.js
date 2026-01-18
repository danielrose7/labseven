"use client";

import * as React from "react";
import {
  CategoryMenu,
  ProductList,
  ProductsCalculator,
  SearchBar,
  ToggleMenu,
} from "components";
import { usePaginatedProducts } from "lib/customHooks";

import productsStyles from "styles/Products.module.css";

const ProductsClient = ({
  fallbackData,
  allProductCategoryData,
  categoryData,
  subcategoryData,
  routeParams = {},
}) => {
  const { data, error, isLoading, setQuote, query, setQuery } =
    usePaginatedProducts(fallbackData, routeParams);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className={productsStyles.grid}>
      <aside
        className={`${productsStyles.grid__aside} ${
          isMenuOpen ? productsStyles.grid__asideIsOpen : ""
        }`}
      >
        <ToggleMenu
          className={productsStyles.menuButton}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <CategoryMenu
          categories={allProductCategoryData}
          activeCategory={categoryData}
          activeSubCategory={subcategoryData}
        />
        <ProductsCalculator
          className={productsStyles.ProductsCalculator}
          products={data.products}
          setQuote={setQuote}
          isLoading={isLoading}
        />
      </aside>
      <main className={productsStyles.grid__main}>
        <SearchBar query={query} setQuery={setQuery} />
        {!categoryData && <hr />}
        <ProductList
          products={data.products}
          pagination={data.pagination}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default ProductsClient;
