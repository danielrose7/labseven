import { Suspense } from "react";
import { ProductsClient, ThreeDotLoader } from "components";
import {
  getAllProductCategories,
  getProductCategory,
  getAllProducts,
} from "lib/products";
import { paginate } from "lib/utils";

export const metadata = {
  title: "Shop our products",
};

// Revalidate cached pages after 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  const allCategories = await getAllProductCategories();
  return allCategories.map((category) => ({
    productCategoryCode: category.code,
  }));
}

const CategoryPage = async ({ params }) => {
  const { productCategoryCode } = await params;
  const allProductCategoryData = await getAllProductCategories();
  const categoryData = await getProductCategory(productCategoryCode);
  const allProducts = await getAllProducts();

  const categoryProductData = allProducts.filter((product) =>
    categoryData.ItemIds.includes(product.ID)
  );
  const [productData, pagination] = paginate(categoryProductData, 1, 16);

  return (
    <Suspense fallback={<ThreeDotLoader />}>
      <ProductsClient
        fallbackData={{ products: productData, pagination }}
        allProductCategoryData={allProductCategoryData}
        categoryData={categoryData}
        routeParams={{ productCategoryCode }}
      />
    </Suspense>
  );
};

export default CategoryPage;
