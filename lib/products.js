import { readFileSync } from "fs";
import { join } from "path";

// NOTE: requires `node ./loadProducts` to run
const loadCache = async (filename) => {
  const filepath = join(process.cwd(), "public", filename);
  let cachedData;

  try {
    cachedData = JSON.parse(readFileSync(filepath, "utf8"));
  } catch (error) {
    console.log(`${filename} not initialized`, error);
  }

  if (!cachedData) {
    console.error(`No cache found for ${filename}`);
  }

  return cachedData;
};

// START - products
// fetch all products and save in .gitignore'd JSON cache file
const PRODUCTS_CACHE_PATH = "products_cache.json";

export async function getAllProducts() {
  const allProducts = await loadCache(PRODUCTS_CACHE_PATH);
  // Hide products without categories + apply default sort
  return allProducts
    .filter((product) => !!product.Categories.length)
    .sort(sortProducts);
}

export async function getProductByStyle(manufacturerSkuCode, styleNameCode) {
  const products = await getAllProducts();

  // Try exact match first, then try URL-decoded version
  let product = products.find(
    (p) => p.manufacturerSkuCode === manufacturerSkuCode
  );

  if (!product) {
    // Handle URL encoding - decode %2B to + etc.
    const decodedSku = decodeURIComponent(manufacturerSkuCode);
    product = products.find((p) => p.manufacturerSkuCode === decodedSku);
  }

  if (!product) {
    return null;
  }

  const decodedStyle = decodeURIComponent(styleNameCode);
  const activeStyle = product.Styles?.find(
    (style) =>
      style.nameCode === styleNameCode || style.nameCode === decodedStyle
  );

  return {
    ...product,
    activeStyle,
    manufacturerSkuCode: product.manufacturerSkuCode,
    styleNameCode: activeStyle?.nameCode || styleNameCode,
  };
}
// END - products

// START - categories
const PRODUCT_CATEGORIES_CACHE_PATH = "product_categories_cache.json";

export function getAllProductCategories() {
  return loadCache(PRODUCT_CATEGORIES_CACHE_PATH);
}

export async function getProductCategory(productCategoryCode) {
  const productCategories = await getAllProductCategories();
  return productCategories.find((cat) => cat.code === productCategoryCode);
}

// END - categories

// START - sort products
export function sortProducts(a, b) {
  if (a.Featured && !b.Featured) return -1;
  if (!a.Featured && b.Featured) return 1;
  if (a.Featured && b.Featured) return a.FeaturedSort - b.FeaturedSort;

  return sortBrand(a, b);
}

export function sortBrand(a, b) {
  const manufacturerCompare = a.Manufacturer.localeCompare(b.Manufacturer);
  if (manufacturerCompare !== 0) return manufacturerCompare;

  const nameCompare = a.Name.localeCompare(b.Name);
  if (nameCompare !== 0) return nameCompare;

  return a.ManufacturerSku.localeCompare(b.ManufacturerSku);
}

export function sortBrandZA(a, b) {
  const manufacturerCompare = b.Manufacturer.localeCompare(a.Manufacturer);
  if (manufacturerCompare !== 0) return manufacturerCompare;

  const nameCompare = b.Name.localeCompare(a.Name);
  if (nameCompare !== 0) return nameCompare;

  return b.ManufacturerSku.localeCompare(a.ManufacturerSku);
}

export function sortPriceHighLow(a, b) {
  const priceGap = b.defaultPrice - a.defaultPrice;
  if (priceGap !== 0) return priceGap;

  return sortBrand(a, b);
}

export function sortPriceLowHigh(a, b) {
  const priceGap = a.defaultPrice - b.defaultPrice;
  if (priceGap !== 0) return priceGap;

  return sortBrand(a, b);
}
// END - sort products
