import { NextResponse } from "next/server";
import {
  getProductCategory,
  getAllProducts,
  sortProducts,
  sortBrand,
  sortBrandZA,
  sortPriceHighLow,
  sortPriceLowHigh,
} from "lib/products";
import { paginate } from "lib/utils";
import { productMatchesColors, findMatchingStyleIndex } from "lib/colorFilter";

export const dynamic = "force-dynamic";

const sortCallback = {
  default: sortProducts,
  brandAZ: sortBrand,
  brandZA: sortBrandZA,
  priceHighLow: sortPriceHighLow,
  priceLowHigh: sortPriceLowHigh,
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const currentPage = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 16; /* 4 x 4 */
  const categoryCode = searchParams.get("productCategoryCode");
  const subCategoryCode = searchParams.get("subCategoryCode");
  const manufacturerCode = searchParams.get("manufacturerCode");
  const q = searchParams.get("q");
  const sort = searchParams.get("sort");

  let allProducts = await getAllProducts();

  // filter matches
  if (manufacturerCode) {
    // - by manufacturer
    allProducts = allProducts.filter(
      (product) => product.manufacturerCode === manufacturerCode
    );
  }

  if (categoryCode) {
    // - by category
    const categoryData = await getProductCategory(categoryCode);

    if (subCategoryCode) {
      // - by subcategory
      const subcategoryData = categoryData.SubCategories.find(
        (sub) => sub.code == subCategoryCode
      );
      allProducts = allProducts.filter((product) =>
        subcategoryData.ItemIds.includes(product.ID)
      );
    } else {
      allProducts = allProducts.filter((product) =>
        categoryData.ItemIds.includes(product.ID)
      );
    }
  }

  if (q) {
    // - by search term
    const searchTerm = q.toLowerCase();
    allProducts = allProducts.filter((product) => {
      return (
        product.SearchTerms &&
        product.SearchTerms.some((term) => term.includes(searchTerm))
      );
    });
  }

  const color = searchParams.get("color");
  if (color) {
    allProducts = allProducts
      .filter((p) => productMatchesColors(p, [color]))
      .map((p) => ({ ...p, activeStyleIndex: findMatchingStyleIndex(p, color) }));
  }

  if (sort) {
    const callback = sortCallback[sort];
    if (callback) {
      allProducts = allProducts.sort(callback);
    }
  }

  const [products, pagination] = paginate(
    allProducts,
    Number(currentPage),
    Number(perPage)
  );

  return NextResponse.json({ pagination, products });
}
